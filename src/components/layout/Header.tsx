import { Button, Container, Stack } from "react-bootstrap";
import { BiLogOut, BiMovie } from "react-icons/bi";
import { Link } from "react-router-dom";

type Props = {
  onLogout: () => void;
  isAuthenticated: boolean;
};

function Header({ onLogout, isAuthenticated }: Props) {
  return (
    <header className="py-3 border-bottom bg-light text-dark">
      <Container>
        <Stack
          direction="horizontal"
          as={Link}
          to="/"
        >
          <Stack direction="horizontal">
            <BiMovie
              size={32}
              className="me-1"
            />
            <h4 className="m-0">Cinema Booking</h4>
          </Stack>
          {isAuthenticated ? (
            <Button
              className="ms-auto"
              variant="text"
              onClick={onLogout}
            >
              <Stack direction="horizontal">
                <span>Logout</span>
                <BiLogOut
                  size={24}
                  className="ms-1"
                />
              </Stack>
            </Button>
          ) : null}
        </Stack>
      </Container>
    </header>
  );
}

export default Header;
