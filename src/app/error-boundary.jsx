import { Component } from "react";
import { logger } from "../utils/logger";

export class ErrorBoundary extends Component {
  state = {
    error: null,
  };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    logger.error("[error-boundary] unexpected exception caught");
    logger.error("[error-boundary] error", error);
    logger.error("[error-boundary] info", info);
  }

  render() {
    const { error } = this.state;
    if (error && (error instanceof Error || typeof error === "object")) {
      return (
        <div className="ErrorBoundary">
          <h3>{error.name || "Unexpected Error"}</h3>
          {error.message && <p>{error.message}</p>}
          <pre>{error.stack || JSON.stringify(error, null, 2)}</pre>
        </div>
      );
    }

    return this.props.children;
  }
}

export function withErrorBoundary(Component) {
  return (props) => (
    <ErrorBoundary>
      <Component {...props} />
    </ErrorBoundary>
  );
}
