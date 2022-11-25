import Skeleton from "react-loading-skeleton";

const MovieDetailLoader = () => {
  return (
    <div
      style={{ maxWidth: 1100 }}
      className="overflow-hidden mx-auto h-100 d-flex flex-column align-items-center justify-content-center"
    >
      <Skeleton
        width={1100}
        height={600}
      />
    </div>
  );
};

export default MovieDetailLoader;
