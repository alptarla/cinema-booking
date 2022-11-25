import RegisterForm from "@components/forms/RegisterForm";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { resetError, signUp } from "@store/slices/auth-slice";
import { useEffect } from "react";
import { Alert, Card, Stack } from "react-bootstrap";
import { FiLogIn } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface IFormFields {
  email: string;
  password: string;
}

const Register = () => {
  const { status, error } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      dispatch(resetError());
    };
  }, [dispatch]);

  const handleSubmit = async (values: IFormFields) => {
    dispatch(signUp(values))
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
          <Card.Title>Register</Card.Title>
          <FiLogIn
            className="ms-auto"
            size={24}
          />
        </Stack>
      </Card.Header>
      <Card.Body>
        <RegisterForm
          onSubmit={handleSubmit}
          isLoading={status === "loading"}
        />
        <Alert
          show={status === "error"}
          className="mt-3"
          variant="danger"
        >
          {error}
        </Alert>
      </Card.Body>
    </Card>
  );
};

export default Register;
