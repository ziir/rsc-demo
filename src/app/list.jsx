import { ListItem } from "./list-item";
import { logger } from "../utils/logger";

export async function List({ itemsPromise, emptyCallToAction, activeItemId }) {
  logger.log("[list]", "rendering List server component", { activeItemId });
  const items = await itemsPromise;

  if (!items) {
    return null;
  }

  if (!items.length) {
    return emptyCallToAction;
  }

  return (
    <ul className="List">
      {items.map((item) => (
        <ListItem
          key={item.id}
          id={item.id}
          title={item.title}
          active={item.id === activeItemId}
        />
      ))}
    </ul>
  );
}
