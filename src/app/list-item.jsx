import { Button } from "./button";
import { Link } from "./link";
import { logger } from "../utils/logger";

export function ListItem({ id, title, active }) {
  logger.debug("[list-item]", "rendering ListItem server component", {
    id,
    title,
  });

  return (
    <li className="ListItem">
      <Button
        as={Link}
        to={`/view/${id}`}
        disabled={active}
        className={["ListItem-link", active && "Button-active"]
          .filter(Boolean)
          .join(" ")}
      >
        {title}
      </Button>
    </li>
  );
}
