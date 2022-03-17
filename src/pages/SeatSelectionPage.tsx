import classNames from "classnames";
import { useEffect, useState } from "react";
import { Button, Card, Stack } from "react-bootstrap";
import { useParams } from "react-router-dom";
import SeatSelectionHeader from "../components/SeatSelectionHeader";
import { Salon } from "../services/salon-service";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getMovieById } from "../store/slices/movie-slice";
import { getSalons } from "../store/slices/salon-slice";

type Seat = {
  key: string;
  value: number;
};

function SeatSelectionPage() {
  const [selectedSalon, setSelectedSalon] = useState<Salon>();
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

  const {
    status: salonStatus,
    salons,
    error: salonError,
  } = useAppSelector((state) => state.salon);
  const { selectedMovie: movie } = useAppSelector((state) => state.movie);

  const dispatch = useAppDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(getSalons())
      .unwrap()
      .then((res) => {
        setSelectedSalon(res[0]);
      });
  }, [dispatch]);

  useEffect(() => {
    dispatch(getMovieById({ id: parseInt(params.id!) }));
  }, [params.id, dispatch]);

  const checkIsSeatSelected = (seat: Seat) =>
    selectedSeats.some((item) => {
      return JSON.stringify(item) === JSON.stringify(seat);
    });

  const selectSeat = (seat: Seat) => {
    return () => {
      if (!checkIsSeatSelected(seat)) {
        setSelectedSeats((prev) => [...prev, seat]);
        return;
      }

      setSelectedSeats((prev) => {
        return prev.filter((s) => {
          return !(s.key === seat.key && s.value === seat.value);
        });
      });
    };
  };

  const getSeatClassNames = (seat: Seat) =>
    classNames("w-100 text-white border-0", [
      checkIsSeatSelected(seat) ? "bg-success" : "bg-secondary",
    ]);

  const renderRow = (key: string, values: number[]) => {
    return values.map((val, i) => (
      <Button
        size="sm"
        className={getSeatClassNames({ key, value: val })}
        key={i}
        disabled={i === 0 || !val}
        onClick={selectSeat({ key, value: val })}
      >
        {i === 0 ? key : val}
      </Button>
    ));
  };

  const seatsArr = selectedSalon?.seats.map((seat) => {
    const seatItem = Object.entries(seat)[0];
    return {
      key: seatItem[0],
      values: seatItem[1],
    };
  });

  if (salonStatus === "loading") return <div>loading...</div>;
  if (salonStatus === "error") return <div>{salonError}</div>;

  return (
    <div className="h-100">
      <SeatSelectionHeader
        salons={salons}
        movieTitle={movie?.title!}
      />
      <Card className="mt-3">
        <Card.Body>
          {seatsArr?.map((seat, i) => (
            <Stack
              key={i}
              direction="horizontal"
              className="gap-2 mb-2 align-items-stretch"
            >
              {renderRow(seat.key, seat.values as number[])}
            </Stack>
          ))}
        </Card.Body>
      </Card>
    </div>
  );
}

export default SeatSelectionPage;
