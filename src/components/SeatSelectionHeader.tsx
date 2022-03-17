import classNames from "classnames";
import { Badge, Card, Stack } from "react-bootstrap";
import { Salon } from "../services/salon-service";

interface Props {
  movieTitle: string;
  salons: Salon[];
  selectedSalon: Salon;
  onSalonChange: (salon: Salon) => void;
}

function SeatSelectionHeader({
  movieTitle,
  salons,
  selectedSalon,
  onSalonChange,
}: Props) {
  const selectSalon = (salon: Salon) => {
    return () => {
      onSalonChange(salon);
    };
  };

  const getBadgeClassNames = (salonId: string) =>
    classNames("p-2 bg-light text-dark border border-2", {
      "border-success": salonId === selectedSalon?.id,
    });

  return (
    <Card className="w-100">
      <Card.Body>
        <Card.Title className="text-center">{movieTitle}</Card.Title>
        <Stack
          direction="horizontal"
          className="gap-2 justify-content-center"
        >
          {salons.map((salon) => (
            <Badge
              className={getBadgeClassNames(salon.id)}
              role="button"
              key={salon.id}
              onClick={selectSalon(salon)}
            >
              {salon.name}
            </Badge>
          ))}
        </Stack>
      </Card.Body>
    </Card>
  );
}

export default SeatSelectionHeader;
