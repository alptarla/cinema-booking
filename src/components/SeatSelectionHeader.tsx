import { Badge, Card, Stack } from "react-bootstrap";
import { Salon } from "../services/salon-service";

interface Props {
  movieTitle: string;
  salons: Salon[];
}

function SeatSelectionHeader({ movieTitle, salons }: Props) {
  return (
    <Card>
      <Card.Body>
        <Card.Title className="text-center">{movieTitle}</Card.Title>
        <Stack
          direction="horizontal"
          className="gap-2 justify-content-center"
        >
          {salons.map((salon) => (
            <Badge
              className="bg-light text-dark p-2"
              role="button"
              key={salon.id}
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
