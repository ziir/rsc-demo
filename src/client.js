import { createElement } from "react";
import { createRoot } from "react-dom/client";
import { createFromReadableStream } from "react-server-dom-webpack/client";

import { withErrorBoundary } from "./app/error-boundary";
import { Root } from "./app/root";
import { logger } from "./utils/logger";

logger.log("[client]", "start");
const flightEl = document.getElementById("react-flight");
const flightResponseText = JSON.parse(flightEl.textContent);

logger.debug("[client]", "[flight]", "parsed flight response");
for (const flightResponseChunk of flightResponseText
  .split("\n")
  .filter(Boolean)) {
  logger.debug("[client]", "[flight]", flightResponseChunk);
}

const flightTreePromise = createFromReadableStream(
  new Response(flightResponseText).body,
);

const root = createRoot(document.getElementById("root"));

logger.debug("[client]", "rendering root", flightTreePromise);
root.render(createElement(withErrorBoundary(Root), { flightTreePromise }));
