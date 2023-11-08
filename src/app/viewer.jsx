import snarkdown from "snarkdown";

import { Button } from "./button";
import { StatusAlert } from "./status-alert";
import { Link } from "./link";
import { useRouter } from "./router";
import { useItem } from "./items";
import { logger } from "../utils/logger";

export function Viewer() {
  const {
    match: { params },
  } = useRouter();
  const clientItem = useItem(params.id);

  logger.log(
    "[viewer]",
    "rendering Viewer client component",
    { params },
    { clientItem },
  );

  if (!clientItem) {
    return <StatusAlert>Note not found.</StatusAlert>;
  }

  return (
    <div className="Viewer">
      <article className="Viewer-inner">
        <h2 className="Viewer-title">{clientItem.title}</h2>
        <div
          className="Viewer-content markdown-container"
          dangerouslySetInnerHTML={{ __html: snarkdown(clientItem.content) }}
        />
      </article>
      <Button
        as={Link}
        className="Viewer-edit-link"
        to={`/edit/${clientItem.id}`}
      >
        Edit
      </Button>
    </div>
  );
}
