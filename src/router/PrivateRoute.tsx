import { Navigate } from "react-router-dom";

type Props = {
  isAuthenticated: boolean;
  redirectPath: string;
  children: JSX.Element;
};

function PrivateRoute({ isAuthenticated, redirectPath, children }: Props) {
  if (isAuthenticated) {
    return children;
  }

  return <Navigate to={redirectPath} />;
}

export default PrivateRoute;
