import { ReactChild } from "react";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { signOut } from "../../store/slices/auth-slice";
import Footer from "./Footer";
import Header from "./Header";

type Props = {
  children: ReactChild;
};

function Layout({ children }: Props) {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(signOut());
  };

  return (
    <Container
      fluid
      className="px-0"
    >
      <ToastContainer
        hideProgressBar
        autoClose={2000}
      />
      <div id="layout">
        <Header
          onLogout={handleLogout}
          isAuthenticated={user !== null}
        />
        <main id="main">
          <Container className="h-100">{children}</Container>
        </main>
        <Footer />
      </div>
    </Container>
  );
}

export default Layout;
