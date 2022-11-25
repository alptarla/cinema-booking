import { FC } from "react";
import { Navigate } from "react-router-dom";

type PrivateRouteProps = {
  isAuthenticated: boolean;
  redirectPath: string;
  children: JSX.Element;
};

const PrivateRoute: FC<PrivateRouteProps> = ({
  isAuthenticated,
  redirectPath,
  children,
}) => {
  if (isAuthenticated) {
    return children;
  }

  return <Navigate to={redirectPath} />;
};

export default PrivateRoute;
