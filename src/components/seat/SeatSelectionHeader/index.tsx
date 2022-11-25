import { Salon } from "@services/salon-service";
import classNames from "classnames";
import { Badge, Card, Stack } from "react-bootstrap";

import { FC } from "react";

type SeatSelectionHeaderProps = {
  movieTitle: string;
  salons: Salon[];
  selectedSalon: Salon;
  onSalonChange: (salon: Salon) => void;
};

const SeatSelectionHeader: FC<SeatSelectionHeaderProps> = ({
  movieTitle,
  salons = [],
  selectedSalon,
  onSalonChange,
}) => {
  const handleSelectSalon = (salon: Salon) => {
    return () => onSalonChange(salon);
  };

  const getBadgeClassNames = (salonId: string) => {
    return classNames("p-2 bg-light text-dark border border-2", {
      "border-success": salonId === selectedSalon?.id,
    });
  };

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
              onClick={handleSelectSalon(salon)}
            >
              {salon.name}
            </Badge>
          ))}
        </Stack>
      </Card.Body>
    </Card>
  );
};

export default SeatSelectionHeader;
