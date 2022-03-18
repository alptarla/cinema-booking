import { Route, Routes } from "react-router-dom";
import {
  HomePage,
  LoginPage,
  MovieDetailPage,
  NotFoundPage,
  RegisterPage,
  SeatSelectionPage,
} from "../pages";
import { useAppSelector } from "../store/hooks";
import AuthRoute from "./AuthRoute";
import PrivateRoute from "./PrivateRoute";

function Router() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute
            isAuthenticated={user !== null}
            redirectPath="/login"
          >
            <HomePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/login"
        element={
          <AuthRoute
            isAuthenticated={user !== null}
            redirectPath="/"
          >
            <LoginPage />
          </AuthRoute>
        }
      />
      <Route
        path="/register"
        element={
          <AuthRoute
            isAuthenticated={user !== null}
            redirectPath="/"
          >
            <RegisterPage />
          </AuthRoute>
        }
      />
      <Route
        path="/movie/:id"
        element={
          <PrivateRoute
            isAuthenticated={user !== null}
            redirectPath="/login"
          >
            <MovieDetailPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/seat-selection/:id"
        element={
          <PrivateRoute
            isAuthenticated={user !== null}
            redirectPath="/login"
          >
            <SeatSelectionPage />
          </PrivateRoute>
        }
      />
      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
  );
}

export default Router;
