"use client";

import { useRouter } from "./router";
import { Debug } from "./debug";
import { logger } from "../utils/logger";

export function ClientDebug() {
  logger.debug("[debug]", "rendering ClientDebug client component");
  const router = useRouter();

  return <Debug {...router} title="Client Debug" />;
}
