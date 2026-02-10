export function handlePing(_req: Request): Response {
  return new Response(JSON.stringify({ ok: true, pong: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
