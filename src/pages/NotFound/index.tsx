import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="page-container">
      <Alert variant="warning">
        <span>Page Not Found!</span>
        <Link
          className="ms-2 text-primary"
          to="/"
        >
          Go homepage
        </Link>
      </Alert>
    </div>
  );
};

export default NotFoundPage;
