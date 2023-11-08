import { use, useEffect, useState } from "react";
import { createFromFetch } from "react-server-dom-webpack/client";
import { logger } from "../utils/logger";

export function Root({ flightTreePromise: initialFlightTreePromise }) {
  const [flightTreePromise, setFlightTreePromise] = useState(
    initialFlightTreePromise,
  );

  useEffect(() => {
    window.addEventListener(
      "trigger-rsc-refresh",
      ({ detail: props }) => {
        logger.info(
          "[root]",
          "[trigger-rsc-refresh]",
          "fetching React Flight App tree for props",
          props,
        );
        const refreshFlightTreePromise = createFromFetch(
          fetch(
            `/react-flight?props=${encodeURIComponent(JSON.stringify(props))}`,
          ),
        );

        setFlightTreePromise(refreshFlightTreePromise);
      },
      false,
    );
  }, []);

  logger.log("[root]", "rendering flight tree", { flightTreePromise });
  return use(flightTreePromise);
}
