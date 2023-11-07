const z = require("zod");

const routePaths = ["/", "/new", "/view/:id", "/edit/:id", "*"];

const appPropsSchema = z.object({
  route: z.union(routePaths.map((s) => z.literal(s))),
  match: z.object({
    path: z.union(routePaths.map((s) => z.literal(s))),
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

appPropsSchema.parse({
  route: "/ff",
  match: {
    path: "/",
    params: {
      id: "foo",
    },
  },
  location: {
    pathname: "/",
    search: "?",
    hash: "",
  },
});
