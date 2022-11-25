import { FC } from "react";
import { Navigate } from "react-router-dom";

type AuthProps = {
  isAuthenticated: boolean;
  children: JSX.Element;
  redirectPath: string;
};

const AuthRoute: FC<AuthProps> = ({
  isAuthenticated,
  redirectPath,
  children,
}) => {
  if (isAuthenticated) {
    return <Navigate to={redirectPath} />;
  }

  return children;
};

export default AuthRoute;
