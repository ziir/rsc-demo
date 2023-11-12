"use strict";

const path = require("node:path");
const stream = require("node:stream");
const { readFileSync } = require("node:fs");
const { finished } = require("node:stream/promises");

const Fastify = require("fastify");
const fastifyStaticPlugin = require("@fastify/static");

const React = require("react");
const { renderToPipeableStream } = require("react-server-dom-webpack/server");

const { z } = require("zod");

const MANIFEST = readFileSync(
  path.resolve(__dirname, "../dist/react-client-manifest.json"),
  "utf8",
);
const MODULE_MAP = JSON.parse(MANIFEST);

const HTML_SHELL = readFileSync(
  path.resolve(__dirname, "../dist/index.html"),
  "utf8",
);

function renderReactTree(writable, component, props) {
  const { pipe } = renderToPipeableStream(
    React.createElement(component, props),
    MODULE_MAP,
  );
  pipe(writable);
}

const HTTP_HOST = process.env.HOST ?? "0.0.0.0";
const HTTP_PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const NODE_ENV = process.env.NODE_ENV || "development";

const LOGGER_OPTIONS = {
  development: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss.l Z",
      },
    },
    serializers: {
      req(request) {
        return {
          method: request.method,
          url: request.url,
        };
      },
    },
    level: "debug",
  },
  production: true,
};

const fastify = Fastify({
  logger: LOGGER_OPTIONS[NODE_ENV] ?? false,
});

for (const method of ["debug", "log", "info", "warn", "error"]) {
  console[method] = (...args) =>
    (method === "log" ? fastify.log.info : fastify.log[method]).call(
      fastify.log,
      args,
    );
}

fastify.register(fastifyStaticPlugin, {
  root: path.join(__dirname, "../dist"),
  prefix: "/assets/",
  logLevel: "warn",
});

fastify.register(fastifyStaticPlugin, {
  root: path.join(__dirname, "../public"),
  decorateReply: false,
  logLevel: "warn",
});

// Register application route handlers
function registerAppRouteHandlers() {
  const { routePaths } = require("../src/routes.js");
  const { App } = require("../src/app/app.jsx");
  for (const route of routePaths) {
    const setRouteHandler =
      route === "*"
        ? fastify.setNotFoundHandler.bind(fastify)
        : fastify.get.bind(fastify, route);

    /**
     * Note we're serving the HTML application shell alongside the
     * awaited React Flight / Server Components tree in a <script> tag
     * to be "hydrated" by the client.
     * This is super sub-optimal, but slightly more interesting than just
     * rendering the HTML application shell.
     * Ideally we would stream the React Flight tree response
     * with its surrounding shell as HTML but this proves quite challenging.
     *
     * For each defined application route, define a matching HTTP handler:
     * - compute routing props from the request object
     * - render the React Flight tree to a writable stream
     * - accumulate the React Flight Response
     * - wait for the React Flight tree stream to be finished
     * - inject the React Flight Response to a <script> tag to be picked
     *   up by the client
     */
    setRouteHandler(async function routeHandler(request, reply) {
      const { search, pathname } = new URL(
        request.url,
        `http://${HTTP_HOST}:${HTTP_PORT}`,
      );

      const props = {
        route,
        match: {
          path: route,
          params: request.params,
        },
        location: {
          pathname,
          search,
          hash: "",
        },
      };

      let flightResponse = "";
      const flightStream = new stream.Writable({
        write: (chunk, encoding, next) => {
          request.log.debug("accumulating React Flight chunk");
          request.log.debug(String(chunk));
          flightResponse += chunk;
          next();
        },
      });
      renderReactTree(flightStream, App, props);

      await finished(flightStream);

      request.log.info("accumulated React Flight Response.");
      request.log.info(
        "serving HTML shell with injected inline Flight response ...",
      );

      reply.header("Content-Type", "text/html");
      return HTML_SHELL.replace(
        "<!--FLIGHT-->",
        JSON.stringify(flightResponse),
      );
    });
  }
}

// somewhat validate 'props' provided by the client before passing them to
// the <App /> server component.
const appPropsSchema = z.object({
  route: z.string(),
  match: z.object({
    path: z.string(),
    params: z.object({
      id: z.string().optional(),
    }),
  }),
  location: z.object({
    pathname: z.string(),
    search: z.string(),
    hash: z.string(),
  }),
});

/**
 * React Flight HTTP endpoint.
 * Queried by the client to refresh the <App /> server-components tree.
 * The App server-components tree is streamed back to the client in the
 * the React Flight serialization format.
 *
 * We pass additional routing 'props', following the same shape as the ones
 * used in the client-side router, although they're not really used besides
 * debugging in our use case.
 * Note that 'props' passed to server components should be validated at runtime.
 */
function registerReactFlightRouteHandler() {
  const { App } = require("../src/app/app.jsx");
  fastify.get("/react-flight", function reactFlightHandler(request, reply) {
    try {
      if (!request.query.props) {
        throw new Error("Missing expected 'props' querystring parameter");
      }

      const props = JSON.parse(request.query.props);
      request.log.debug(
        "incoming /react-flight request with props, validating ...",
        { props },
      );
      appPropsSchema.parse(props);

      reply.header("Content-Type", "application/octet-stream");
      renderReactTree(reply.raw, App, props);
    } catch (err) {
      if (err instanceof z.ZodError) {
        request.log.error(err.issues);
      }
      throw err;
    }
  });
}

module.exports = async function start() {
  try {
    registerAppRouteHandlers();
    registerReactFlightRouteHandler();
    await fastify.listen({ host: HTTP_HOST, port: HTTP_PORT });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
