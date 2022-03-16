import { Navigate } from "react-router-dom";

type Props = {
  isAuthenticated: boolean;
  children: JSX.Element;
  redirectPath: string;
};

function AuthRoute({ isAuthenticated, redirectPath, children }: Props) {
  if (isAuthenticated) {
    return <Navigate to={redirectPath} />;
  }

  return children;
}

export default AuthRoute;
