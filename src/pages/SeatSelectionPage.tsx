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

  if (salonStatus === "loading") return <div>loading...</div>;
  if (salonStatus === "error") return <div>{salonError}</div>;

  const checkIsSeatSelected = ({ key, value }: Seat) =>
    selectedSeats.some((item) => {
      return JSON.stringify(item) === JSON.stringify({ key, value });
    });

  const selectSeat = ({ key, value }: Seat) => {
    return () => {
      if (checkIsSeatSelected({ key, value })) {
        setSelectedSeats((prev) => {
          return prev.filter((seat) => {
            return !(seat.key === key && seat.value === value);
          });
        });
        return;
      }

      setSelectedSeats((prev) => [...prev, { key, value }]);
    };
  };

  const getSeatClassNames = (seat: Seat) =>
    classNames("w-100 text-white", [
      checkIsSeatSelected(seat) ? "bg-success" : "bg-secondary",
    ]);

  const renderRow = (row: any[]) => {
    return row.map((item, i) => (
      <Button
        size="sm"
        className={getSeatClassNames({ key: row[0], value: item })}
        key={i}
        disabled={i === 0 || !item}
        onClick={selectSeat({ key: row[0], value: item })}
      >
        {item}
      </Button>
    ));
  };

  return (
    <div className="h-100">
      <SeatSelectionHeader
        salons={salons}
        movieTitle={movie?.title!}
      />
      <Card className="mt-3">
        <Card.Body>
          {selectedSalon?.seats.map((seat) =>
            Object.entries(seat).map((item: any[], i) => (
              <Stack
                key={i}
                direction="horizontal"
                className="gap-2 mb-2 align-items-stretch"
              >
                {renderRow(item.flatMap((item) => item))}
              </Stack>
            ))
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default SeatSelectionPage;
