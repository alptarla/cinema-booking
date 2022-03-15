import { ReactChild } from "react";
import { Container } from "react-bootstrap";
import Footer from "./Footer";
import Header from "./Header";

type Props = {
  children: ReactChild;
};

function Layout({ children }: Props) {
  return (
    <Container fluid>
      <div id="layout">
        <Header />
        <main id="main">
          <Container className="h-100">{children}</Container>
        </main>
        <Footer />
      </div>
    </Container>
  );
}

export default Layout;
