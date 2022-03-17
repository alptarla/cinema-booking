import { Stack } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";

const SEAT_COUNT = 96;

function SeatSelectionLoader() {
  return (
    <div className="page-container">
      <Skeleton height={150} />
      <Stack
        direction="horizontal"
        className="flex-wrap gap-2 mt-3"
      >
        {Array.from({ length: SEAT_COUNT }).map((_, i) => (
          <Skeleton
            key={i}
            width={50}
            height={30}
          />
        ))}
      </Stack>
    </div>
  );
}
export default SeatSelectionLoader;
