/**
 * Dates for the illustrations, derived rather than written down.
 *
 * Every role stores how many days ago it landed on the board, not a date
 * string, so nothing on this page can go stale into "added Aug 2026" a
 * year from now. The page renders with `revalidate` set, which is what
 * keeps a static build's idea of "today" current.
 *
 * `now` is measured once on the server and handed down, so the board and
 * the record it opens agree, and so a client component can't compute a
 * different "today" at hydration than the HTML it is hydrating.
 *
 * Formatting is pinned to one locale and zone for the same reason: the
 * hero record renders on the server and the same record renders again in
 * the browser when a card is clicked, and the two have to read
 * identically. The zone is New York because the persona whose board this
 * is lives in Brooklyn — and because a US evening in UTC is already
 * tomorrow, which would date a card "Today" and stamp it with tomorrow's
 * date in the same view.
 */

const DAY = 86_400_000;

/**
 * The clock reading the page dates itself from, awaited by the page
 * rather than read inline in a component body: reading a clock during
 * render is impure, and the value belongs to the render pass anyway.
 */
export async function boardNow(): Promise<number> {
  return Date.now();
}

const DATE_FORMAT = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "America/New_York",
});

/** What a board card shows: how long the role has sat there. */
export function relativeAge(daysAgo: number): string {
  if (daysAgo <= 0) return "Today";
  if (daysAgo === 1) return "Yesterday";
  if (daysAgo < 7) return `${daysAgo}d`;
  const weeks = Math.floor(daysAgo / 7);
  if (weeks === 1) return "Last week";
  if (weeks < 5) return `${weeks} weeks`;
  const months = Math.floor(daysAgo / 30);
  return months === 1 ? "Last month" : `${months} months`;
}

/**
 * What the record's Date added property shows. Records hired wrote during
 * a run carry the clock time it wrote them; older ones are just a date,
 * which is how Notion renders a date property with no time on it.
 */
export function dateAdded(daysAgo: number, now: number, time?: string): string {
  const date = DATE_FORMAT.format(new Date(now - daysAgo * DAY));
  return time ? `${date} · ${time}` : date;
}
