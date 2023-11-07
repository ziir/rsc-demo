"use client";
import { ClientListItem } from "./client-list-item";

import { useItems } from "./items";

import { logger } from "../utils/logger";

export function ClientList({ emptyCallToAction }) {
  const items = useItems();
  logger.log("[client-list]", "rendering ClientList client component", {
    items,
  });

  if (!items) {
    return null;
  }

  if (!items.length) {
    return emptyCallToAction;
  }

  return (
    <ul className="List">
      {items.map((item) => (
        <ClientListItem key={item.id} id={item.id} title={item.title} />
      ))}
    </ul>
  );
}
