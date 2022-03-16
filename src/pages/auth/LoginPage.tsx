import { useEffect } from "react";
import { Alert, Card, Stack } from "react-bootstrap";
import { FiLogIn } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginForm } from "../../components/forms";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { resetError, signIn } from "../../store/slices/auth-slice";

function LoginPage() {
  const { status, error } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // ** cleanup auth errors when user leave to this page
  useEffect(() => {
    return () => {
      dispatch(resetError());
    };
  }, [dispatch]);

  const handleSubmit = (values: { email: string; password: string }) => {
    dispatch(signIn(values))
      .unwrap()
      .then(() => {
        toast.success(`Welcome to cinema booking app.`);
        navigate("/");
      });
  };

  return (
    <Card
      className="mx-auto"
      style={{ maxWidth: 600 }}
    >
      <Card.Header className="bg-transparent">
        <Stack direction="horizontal">
          <Card.Title>Login</Card.Title>
          <FiLogIn
            className="ms-auto"
            size={24}
          />
        </Stack>
      </Card.Header>
      <Card.Body>
        <LoginForm
          onSubmit={handleSubmit}
          isLoading={status === "loading"}
        />
        <Alert
          className="mt-3"
          variant="danger"
          show={status === "error"}
        >
          {error}
        </Alert>
      </Card.Body>
    </Card>
  );
}

export default LoginPage;
