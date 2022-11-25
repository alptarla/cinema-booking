import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import MovieDetail from "../pages/MovieDetail";
import NotFoundPage from "../pages/NotFound";
import Register from "../pages/Register";
import SeatSelection from "../pages/SeatSelection";
import { useAppSelector } from "../store/hooks";
import AuthRoute from "./AuthRoute";
import PrivateRoute from "./PrivateRoute";

const Router = () => {
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
            <Home />
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
            <Login />
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
            <Register />
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
            <MovieDetail />
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
            <SeatSelection />
          </PrivateRoute>
        }
      />
      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
  );
};

export default Router;
