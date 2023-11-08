"use client";
import { Button } from "./button";
import { useRouter } from "./router";

import { logger } from "../utils/logger";

export function RscRefreshButton() {
  logger.info(
    "[rsc-refresh-button]",
    "rendering RscRefreshButton client component",
  );
  const { location, route, match } = useRouter();

  return (
    <p>
      <Button
        type="button"
        className="Button-danger"
        onClick={() => {
          const props = { location, route, match };
          logger.info(
            "[rsc-refresh-button]",
            "triggering 'trigger-rsc-refresh' event with props",
            props,
          );
          window.dispatchEvent(
            new CustomEvent("trigger-rsc-refresh", {
              detail: props,
            }),
          );
        }}
      >
        RSC Refresh
      </Button>
    </p>
  );
}
