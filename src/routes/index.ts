import type { RouteHandler } from "../router.ts";
import { handlePing } from "./ping.ts";

const routes = new Map<string, RouteHandler>();
routes.set("GET /ping", handlePing);

export { routes };
