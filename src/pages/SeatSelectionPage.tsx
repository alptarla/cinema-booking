import classNames from "classnames";
import { useEffect, useState } from "react";
import { Alert, Button, Card, Stack } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { SeatSelectionLoader } from "../components/loaders";
import SeatSelectionHeader from "../components/SeatSelectionHeader";
import { Salon } from "../services/salon-service";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getMovieById } from "../store/slices/movie-slice";
import { getSalons, saveSeats } from "../store/slices/salon-slice";

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
    reservedSeats,
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

  const handleSaveSeats = () => {
    setSelectedSeats([]);
    dispatch(saveSeats({ salonId: selectedSalon?.id!, seats: selectedSeats }));
    // TODO: and display an alert such as success message
  };

  const handleSalonChange = (salon: Salon) => {
    setSelectedSalon(salon);
    setSelectedSeats([]);
  };

  const checkIsAvailableSeat = (seat: Seat) => {
    return reservedSeats[selectedSalon?.id!]?.some((s) => {
      return s.key === seat.key && s.value === seat.value;
    });
  };

  const getSeatClassNames = (seat: Seat) =>
    classNames("w-100 text-white border-0 btn-sm btn-md-lg", [
      checkIsSeatSelected(seat) ? "bg-success" : "bg-secondary",
    ]);

  const seatsArr = selectedSalon?.seats.map((seat) => {
    const seatItem = Object.entries(seat)[0];
    return {
      key: seatItem[0],
      values: seatItem[1],
    };
  });

  const renderRow = (key: string, values: number[]) => {
    return values.map((value, i) => (
      <Button
        className={getSeatClassNames({ key, value })}
        key={i}
        disabled={i === 0 || !value || checkIsAvailableSeat({ key, value })}
        onClick={selectSeat({ key, value })}
      >
        {!value ? "" : i === 0 ? key : `${key}-${value}`}
      </Button>
    ));
  };

  if (salonStatus === "loading") return <SeatSelectionLoader />;
  if (salonStatus === "error") {
    return <Alert variant="warning">{salonError}</Alert>;
  }

  return (
    <div className="h-100 position-relative d-flex flex-column align-items-center justify-content-center page-container">
      <Button
        className="position-absolute top-0 end-0"
        size="sm"
        variant="success"
        disabled={!selectedSeats.length}
        onClick={handleSaveSeats}
      >
        {`Save Seats (${selectedSeats.length})`}
      </Button>
      <SeatSelectionHeader
        salons={salons}
        movieTitle={movie?.title!}
        onSalonChange={handleSalonChange}
        selectedSalon={selectedSalon!}
      />
      <Card className="mt-3 w-100">
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
