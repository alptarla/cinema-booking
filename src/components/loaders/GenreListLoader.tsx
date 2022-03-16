import { Stack } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";

const SKELETON_COUNT = 15;

function GenreListLoader() {
  return (
    <Stack
      direction="horizontal"
      className="flex-wrap"
    >
      {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
        <Skeleton
          width={70}
          height={20}
          key={index}
          className="m-1"
        />
      ))}
    </Stack>
  );
}

export default GenreListLoader;
