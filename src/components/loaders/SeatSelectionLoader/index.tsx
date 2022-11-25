import { Stack } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";

const SEAT_COUNT = 96;

const SeatSelectionLoader = () => {
  return (
    <div className="page-container h-100 d-flex flex-column align-items-center justify-content-center">
      <div className="w-100">
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
    </div>
  );
};

export default SeatSelectionLoader;
