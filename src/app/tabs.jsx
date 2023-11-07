"use client";

import { useState } from "react";
import { Button } from "./button";

import { logger } from "../utils/logger";

export function Tabs({ tabs }) {
  logger.log("[tabs]", "rendering Tabs client component");
  const [activeTabId, setActiveTabId] = useState(tabs[0].id);
  const activeTab = tabs.find(({ id }) => id === activeTabId);

  return (
    <div className="Tabs">
      <div className="Tabs-header">
        {tabs.map((tab) => {
          const active = activeTabId === tab.id;

          const props = {
            className: ["Tab-button", active && "Button-active"]
              .filter(Boolean)
              .join(" "),
            children: tab.label,
            ...(active
              ? { disabled: true }
              : { onClick: () => setActiveTabId(tab.id) }),
          };

          return <Button key={tab.id} {...props} />;
        })}
      </div>
      <div className="Tabs-content">{activeTab.content}</div>
    </div>
  );
}
