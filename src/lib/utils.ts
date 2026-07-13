import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

/** Format an ISO date string as a relative time (e.g. "2 ชม.ที่แล้ว"). */
export function timeFromNow(iso?: string): string {
  if (!iso) return "";
  return dayjs(iso).fromNow();
}

/** Format an ISO date string to a readable Thai-style date. */
export function formatDate(iso?: string): string {
  if (!iso) return "";
  return dayjs(iso).format("D MMM YYYY");
}

/** Pick a Mantine color for an Ong Match Score ring. */
export function scoreColor(score: number): string {
  if (score >= 80) return "green";
  if (score >= 60) return "teal";
  if (score >= 40) return "yellow";
  return "gray";
}

/** Derive initials from a display name (for avatar fallback). */
export function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
