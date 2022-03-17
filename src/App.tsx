import { useEffect } from "react";
import { Layout } from "./components/layout";
import { auth } from "./config/firebase";
import Router from "./router";
import { useAppDispatch } from "./store/hooks";
import { setUser } from "./store/slices/auth-slice";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        dispatch(setUser(null));
        return;
      }
      dispatch(setUser({ id: user.uid, email: user.email! }));
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <Layout>
      <Router />
    </Layout>
  );
}

export default App;
