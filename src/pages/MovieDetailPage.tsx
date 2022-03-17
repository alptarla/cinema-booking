import { useParams } from "react-router-dom";

function MovieDetailPage() {
  const params = useParams();

  return (
    <div className="h-100 d-flex align-items-center justify-content-center">
      <h1>Details for {params.id}</h1>
    </div>
  );
}

export default MovieDetailPage;
