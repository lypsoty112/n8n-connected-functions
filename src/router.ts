export type RouteHandler = (req: Request) => Response | Promise<Response>;

const notFound = (): Response =>
  new Response(JSON.stringify({ error: "Not found" }), {
    status: 404,
    headers: { "Content-Type": "application/json" },
  });

export function createDispatcher(
  routes: Map<string, RouteHandler>
): (req: Request) => Response | Promise<Response> {
  return (req: Request) => {
    const url = new URL(req.url);
    const key = `${req.method} ${url.pathname}`;
    const handler = routes.get(key);
    return handler ? handler(req) : notFound();
  };
}
