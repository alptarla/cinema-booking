import { Route, Routes } from "react-router-dom";
import {
  ErrorPage,
  HomePage,
  LoginPage,
  MovieDetailPage,
  NotFoundPage,
  ProfilePage,
  RegisterPage,
  SeatSelectionPage,
} from "../pages";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/movie/:id" element={<MovieDetailPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/seat" element={<SeatSelectionPage />} />
      <Route path="/error/:msg" element={<ErrorPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default Router;
