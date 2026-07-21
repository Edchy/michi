const VISITED_BOOK_STOPS_KEY = "michi-codex-visited";

export function visitedBookStops(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const saved = JSON.parse(window.localStorage.getItem(VISITED_BOOK_STOPS_KEY) ?? "[]");
    return Array.isArray(saved) ? saved.filter((value): value is string => typeof value === "string") : [];
  } catch {
    return [];
  }
}

export function markBookStopVisited(id: string): string[] {
  const visited = new Set(visitedBookStops());
  visited.add(id);
  const next = [...visited];
  window.localStorage.setItem(VISITED_BOOK_STOPS_KEY, JSON.stringify(next));
  return next;
}
