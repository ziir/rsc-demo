import { RouterContext } from "./router";
import { Button } from "./button";
import { Link } from "./link";
import { logger } from "../utils/logger";

export function ClientListItem({ id, title }) {
  logger.debug("[list-item]", "rendering ClientListItem client component", {
    id,
    title,
  });

  return (
    <li className="ListItem">
      <RouterContext.Consumer>
        {({ match: { params } }) => {
          const active = params.id === id;
          return (
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
          );
        }}
      </RouterContext.Consumer>
    </li>
  );
}
