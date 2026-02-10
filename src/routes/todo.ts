import { join } from "node:path";

export interface TodoItem {
  text: string;
  items?: string[];
}

function parseTodoMarkdown(content: string): TodoItem[] {
  const items: TodoItem[] = [];
  const lines = content.split(/\n/);

  for (const line of lines) {
    const match = line.match(/^(\s*)-\s+(.+)$/);
    if (!match) continue;
    const indent = match[1].length;
    const text = match[2].trim();
    if (indent === 0) {
      items.push({ text, items: [] });
    } else if (items.length > 0) {
      const last = items[items.length - 1];
      if (!last.items) last.items = [];
      last.items.push(text);
    }
  }
  return items.map(({ text, items: sub }) =>
    sub?.length ? { text, items: sub } : { text }
  );
}

export async function handleToDo(_req: Request): Promise<Response> {
  const path = join(import.meta.dir, "../../todo.md");
  const content = await Bun.file(path).text();
  const items = parseTodoMarkdown(content);
  return new Response(JSON.stringify({ items }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
