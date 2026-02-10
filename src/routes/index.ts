import type { RouteHandler } from "../router.ts";
import { handlePing } from "./ping.ts";
import { handleToDo } from "./todo.ts";

const routes = new Map<string, RouteHandler>();
routes.set("GET /ping", handlePing);
routes.set("GET /to-do", handleToDo);

export { routes };
