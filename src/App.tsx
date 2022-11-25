import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import { auth } from "./config/firebase";
import Router from "./router";
import { useAppDispatch } from "./store/hooks";
import { setUser } from "./store/slices/auth-slice";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      let userObj = null;

      if (currentUser) {
        userObj = {
          id: currentUser.uid,
          email: currentUser.email as string,
        };
      }

      dispatch(setUser(userObj));
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

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
        <Header />
        <main id="main">
          <Container className="h-100">
            <Router />
          </Container>
        </main>
        <Footer />
      </div>
    </Container>
  );
};

export default App;
