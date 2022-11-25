import { ChangeEvent, FC, FormEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PulseLoader } from "react-spinners";

type LoginFormProps = {
  onSubmit: (values: { email: string; password: string }) => void;
  isLoading?: boolean;
};

const LoginForm: FC<LoginFormProps> = ({ onSubmit, isLoading = false }) => {
  const [fields, setFields] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (key: keyof typeof fields) => {
    return (e: ChangeEvent<HTMLInputElement>) => {
      setFields((prev) => {
        prev[key] = e.target.value;
        return { ...prev };
      });
    };
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(fields);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-2">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Email"
          value={fields.email}
          onChange={handleInputChange("email")}
          required
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={fields.password}
          onChange={handleInputChange("password")}
          required
        />
      </Form.Group>
      <div>
        <Button
          type="submit"
          className="me-1"
        >
          {isLoading ? (
            <PulseLoader
              color="white"
              size={8}
            />
          ) : (
            <span>Login</span>
          )}
        </Button>
        <div>
          <small>Don't you have an account?</small>
          <Link
            to="/register"
            className="ms-1"
          >
            <small>Register</small>
          </Link>
        </div>
      </div>
    </Form>
  );
};

export default LoginForm;
