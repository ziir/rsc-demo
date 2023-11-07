import { Create } from "./app/create";
import { Edit } from "./app/edit";
import { Viewer } from "./app/viewer";
import { NotFound } from "./app/not-found";

export const routes = {
  "/": null,
  "/new": Create,
  "/view/:id": Viewer,
  "/edit/:id": Edit,
  "*": NotFound,
};

export const routePaths = Object.keys(routes);
