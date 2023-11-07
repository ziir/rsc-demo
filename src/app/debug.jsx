import { logger } from "../utils/logger";

export function Debug({ title, ...props }) {
  logger.debug("[debug]", "rendering Debug shared component");

  return (
    <div className="Debug">
      <h4 className="Debug-title">{title}</h4>
      <div className="Debug-content">
        <pre>{JSON.stringify(props, null, 2)}</pre>
      </div>
    </div>
  );
}
