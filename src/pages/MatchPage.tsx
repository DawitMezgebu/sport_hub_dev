import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useMatchDetails } from "../hooks/useMatchDetails";
import TopNav from "../components/TopBar";
import { normalizeMatchEvents, type TimelineEvent } from "../utils/normalize";
import TimelineRow from "../components/match/Timeline";
import MatchTabs from "../components/match/MatchTabs";
import { ArrowLeft } from "lucide-react";
import { FALLBACK_TIMELINE } from "../mock/timeline.fallback";

export default function MatchPage() {
  const { eventId } = useParams();
  const { data, isLoading, isError, error } = useMatchDetails(eventId!);

  const event = useMemo(() => {
    const list = data?.events ?? [];
    return Array.isArray(list) ? list[0] : null;
  }, [data]);

  const home = event?.strHomeTeam ?? "Home";
  const away = event?.strAwayTeam ?? "Away";

  const hs = event?.intHomeScore ?? "";
  const as = event?.intAwayScore ?? "";

  const league = event?.strLeague ?? "League";

  const dateLabel = event?.dateEvent
    ? new Date(event.dateEvent)
        .toLocaleDateString(undefined, {
          day: "2-digit",
          month: "short",
        })
        .toUpperCase()
    : "";

  const timeline: TimelineEvent[] = useMemo(() => {
    if (!event) return FALLBACK_TIMELINE;

    const normalized = normalizeMatchEvents(event) as TimelineEvent[];

    if (!normalized || normalized.length === 0) return FALLBACK_TIMELINE;

    const scoreText =
      hs !== "" && as !== "" ? `Fulltime ${hs} - ${as}` : "Fulltime";
    const kickoffText = event?.strTime
      ? `Kick Off - ${String(event.strTime).slice(0, 5)}`
      : "Kick Off";

    return [
      {
        id: "center-ft",
        minuteLabel: scoreText,
        side: "center",
        type: "info",
        primary: "",
      },
      ...normalized,
      {
        id: "center-ht",
        minuteLabel: "Halftime",
        side: "center",
        type: "info",
        primary: "",
      },
      {
        id: "center-ko",
        minuteLabel: kickoffText,
        side: "center",
        type: "info",
        primary: "",
      },
    ];
  }, [event, hs, as]);

  function CardCountBadges({
    yellow,
    red,
    align = "left",
  }: {
    yellow: number;
    red: number;
    align?: "left" | "right";
  }) {
    const hasAny = yellow > 0 || red > 0;

    if (!hasAny) return null;

    return (
      <div
        className={`absolute top-0 ${
          align === "left" ? "right-[-24px]" : "left-[-34px]"
        } flex items-center gap-1`}
      >
        {red > 0 && (
          <span className="min-w-[14px] rounded-[2px] bg-[var(--danger)] px-1 py-[2px] text-center text-[10px] font-bold leading-none text-[var(--textColor)]">
            {red}
          </span>
        )}

        {yellow > 0 && (
          <span className="min-w-[14px] rounded-[2px] bg-[var(--yellow)] px-1 py-[2px] text-center text-[10px] font-bold leading-none text-[var(--textColor)]">
            {yellow}
          </span>
        )}
      </div>
    );
  }

  const cardCounts = useMemo(() => {
    return timeline.reduce(
      (acc, item) => {
        if (item.side === "home") {
          if (item.type === "yellow") acc.homeYellow += 1;
          if (item.type === "red") acc.homeRed += 1;
        }

        if (item.side === "away") {
          if (item.type === "yellow") acc.awayYellow += 1;
          if (item.type === "red") acc.awayRed += 1;
        }

        return acc;
      },
      {
        homeYellow: 0,
        homeRed: 0,
        awayYellow: 0,
        awayRed: 0,
      },
    );
  }, [timeline]);

  return (
    <div className="min-h-screen w-full bg-[var(--bg)] text-white">
      <TopNav />

      <div className="mx-auto w-full px-6 pb-24">
        <div className="pt-8">
          <div className="mx-auto w-full max-w-[760px] rounded-2xl bg-[var(--card)] px-8 py-7 shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
            <div className="flex items-center space-x-3">
              <Link
                to="/"
                className="grid h-10 w-10 place-items-center rounded-xl  "
                aria-label="Back"
              >
                <ArrowLeft className="h-4 w-auto" />
              </Link>

              <div className="text-sm text-white/70">{league}</div>
            </div>

            {isLoading ? (
              <div className="mt-6 h-[110px] rounded-xl bg-white/5" />
            ) : isError ? (
              <div className="mt-6 rounded-xl bg-white/5 p-4 text-sm text-white/70">
                Failed to load match:{" "}
                {String((error as any)?.message ?? "Unknown error")}
              </div>
            ) : (
              <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-8">
                <div className="text-center">
                  <div className="relative mx-auto h-12 w-12 rounded-full ">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Liverpool_FC.svg/250px-Liverpool_FC.svg.png"
                      alt="club a"
                    />
                    <CardCountBadges
                      yellow={cardCounts.homeYellow}
                      red={cardCounts.homeRed}
                      align="left"
                    />
                  </div>
                  <div className="mt-6 text-[14px] font-medium ">{home}</div>
                </div>

                <div className="text-center">
                  <div className="text-xs text-white/60">
                    {dateLabel || "—"}
                  </div>
                  <div className="mt-1 text-3xl font-extrabold tracking-tight">
                    {hs} <span className="text-white/50">-</span> {as}
                  </div>
                  <div className="mt-2 inline-flex rounded-md bg-[var(--danger)] px-3 py-1 text-xs font-bold text-white">
                    Finished
                  </div>
                </div>

                <div className="text-center">
                  <div className="relative mx-auto h-12 w-12 rounded-full ">
                    <img
                      src="https://static.vecteezy.com/system/resources/previews/027/011/152/non_2x/swansea-city-club-logo-black-symbol-premier-league-football-abstract-design-illustration-free-vector.jpg"
                      alt="club b"
                      className="mx-auto h-16 w-auto rounded-full "
                    />
                    <CardCountBadges
                      yellow={cardCounts.awayYellow}
                      red={cardCounts.awayRed}
                      align="right"
                    />
                  </div>
                  <div className="mt-6 text-[14px] font-medium">{away}</div>
                </div>
              </div>
            )}

            <MatchTabs />
          </div>
          <div className="mx-auto mt-6 w-full max-w-[760px] rounded-2xl bg-[var(--card)] px-7 py-6 shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
            <div className="text-sm font-semibold text-white/90">Events</div>

            <div className="mt-4 pt-5">
              <div className="relative">
                <div className="space-y-2">
                  {timeline.map((e) => {
                    if (e.side === "center") {
                      return (
                        <div
                          key={e.id}
                          className="flex items-center gap-3 py-3 text-xs text-white/50"
                        >
                          <div className="flex-1 border-t border-white/10"></div>

                          <span className="px-2 tracking-wide">
                            {e.minuteLabel}
                          </span>

                          <div className="flex-1 border-t border-white/10"></div>
                        </div>
                      );
                    }
                    return <TimelineRow key={e.id} e={e} />;
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="h-16" />
        </div>
      </div>
    </div>
  );
}
