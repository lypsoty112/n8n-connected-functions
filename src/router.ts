export type RouteHandler = (req: Request) => Response | Promise<Response>;

const notFound = (): Response =>
  new Response(JSON.stringify({ error: "Not found" }), {
    status: 404,
    headers: { "Content-Type": "application/json" },
  });

const unauthorized = (): Response =>
  new Response(JSON.stringify({ error: "Unauthorized" }), {
    status: 401,
    headers: { "Content-Type": "application/json" },
  });

export function createDispatcher(
  routes: Map<string, RouteHandler>
): (req: Request) => Response | Promise<Response> {
  return (req: Request) => {
    const apiKey = process.env.API_KEY;
    if (apiKey) {
      const provided =
        req.headers.get("x-api-key") ??
        req.headers.get("authorization")?.replace(/^Bearer\s+/i, "").trim();
      if (provided !== apiKey) {
        return unauthorized();
      }
    }
    const url = new URL(req.url);
    const key = `${req.method} ${url.pathname}`;
    const handler = routes.get(key);
    return handler ? handler(req) : notFound();
  };
}
