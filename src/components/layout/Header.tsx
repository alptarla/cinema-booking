import { Container, Stack } from "react-bootstrap";
import { BiMovie } from "react-icons/bi";

function Header() {
  return (
    <header className="py-3 border-bottom bg-light text-dark">
      <Container>
        <Stack direction="horizontal">
          <BiMovie
            size={32}
            className="me-1"
          />
          <h4 className="m-0">Cinema Booking</h4>
        </Stack>
      </Container>
    </header>
  );
}

export default Header;
