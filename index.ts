import { createDispatcher } from "./src/router.ts";
import { routes } from "./src/routes/index.ts";

const port = Number(process.env.PORT) || 3000;
const dispatch = createDispatcher(routes);

Bun.serve({
  port,
  fetch: dispatch,
});

console.log(`API listening on http://localhost:${port}`);