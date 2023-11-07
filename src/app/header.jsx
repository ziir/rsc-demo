import { Button } from "./button";
import { Link } from "./link";

export function Header() {
  return (
    <header role="banner" className="Header">
      <h1>
        <Link to="/">
          <img src="/logo.svg" className="Header-logo" alt="" />
          RSC Notes App
        </Link>
      </h1>
      <Button as={Link} to="/new">
        New Note
      </Button>
    </header>
  );
}
