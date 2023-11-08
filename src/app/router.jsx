"use client";
import { createContext, startTransition, useContext, useState } from "react";
import { app as router } from "a-route";

import { logger } from "../utils/logger";
import { routes, routePaths } from "../routes";

const INITIAL_CONTEXT = {
  navigate: null,
  route: null,
  match: null,
  location: null,
};

export const RouterContext = createContext(INITIAL_CONTEXT);
RouterContext.displayName = "RouterContext";

export const useRouter = () => useContext(RouterContext);

function routeHandler(route, setContext, match) {
  const { pathname, search, hash } = window.location;
  const next = {
    route,
    match,
    location: {
      pathname,
      search,
      hash,
    },
  };
  startTransition(() => {
    setContext((prev) => {
      const context = {
        ...prev,
        ...next,
      };

      logger.debug(
        "[debug]",
        "[router]",
        "[routeHandler]",
        "updating router context",
        context,
      );

      return context;
    });
  });
}

export function RouterContextProvider({
  children,
  location = INITIAL_CONTEXT.location,
}) {
  logger.debug(
    "[router]",
    "[RouterContextProvider]",
    "rendering RouterContextProvider client component",
  );
  const [context, setContext] = useState(INITIAL_CONTEXT);

  if (context === INITIAL_CONTEXT && routePaths.length > 0) {
    setContext((prev) => ({
      ...prev,
      location,
      navigate: router.navigate.bind(router),
    }));

    for (const route of routePaths) {
      logger.info(
        "[router]",
        "[RouterContextProvider]",
        "attaching route handler",
        route,
      );
      router.get(route, routeHandler.bind(null, route, setContext));
    }

    const { pathname, search, hash } = new URL(window.location);
    router.navigate(pathname + search + hash, "replace");
  }

  const Route = routes[context.route];

  return (
    <RouterContext.Provider value={context}>
      {children}
      {Route && (
        <section>
          <Route />
        </section>
      )}
    </RouterContext.Provider>
  );
}
