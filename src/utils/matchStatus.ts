export type MatchBucket = "LIVE" | "FINISHED" | "UPCOMING";

export function getBucket(e: any): MatchBucket {
  const status = String(e?.strStatus ?? "").toLowerCase();
  const hs = e?.intHomeScore;
  const as = e?.intAwayScore;

  if (
    status.includes("live") ||
    status === "1h" ||
    status === "2h" ||
    status === "ht"
  ) {
    return "LIVE";
  }

  if (
    status === "ft" ||
    status.includes("finished") ||
    status.includes("ended")
  ) {
    return "FINISHED";
  }

  const dateStr = e?.dateEvent
    ? `${e.dateEvent}T${e.strTime ?? "00:00:00"}`
    : "";
  const eventTime = dateStr ? new Date(dateStr).getTime() : NaN;
  const now = Date.now();

  if (
    hs !== null &&
    hs !== "" &&
    as !== null &&
    as !== "" &&
    !Number.isNaN(eventTime) &&
    eventTime < now
  ) {
    return "FINISHED";
  }

  return "UPCOMING";
}
