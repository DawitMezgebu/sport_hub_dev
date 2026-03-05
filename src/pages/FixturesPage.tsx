import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFixtures } from "../hooks/useFixtures";
import TopNav from "../components/TopBar";
import MatchRow from "../components/fixtures/MatchRow";
import DateBar from "../components/fixtures/DateStrip";
import FilterPill from "../components/fixtures/FiltersRow";
import LeagueSection from "../components/fixtures/LeagueSection";
import { Heart, Radio } from "lucide-react";

const PREMIER_LEAGUE_ID = "133602";

type FilterKey = "all" | "live" | "favorites";

function safeNum(v: unknown) {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function isLiveStatus(status?: string | null) {
  if (!status) return false;
  const s = status.toLowerCase();
  return (
    s.includes("live") ||
    s.includes("1h") ||
    s.includes("2h") ||
    s.includes("ht")
  );
}

function isFinishedStatus(status?: string | null) {
  if (!status) return false;
  const s = status.toLowerCase();
  return s.includes("ft") || s.includes("finished") || s.includes("full");
}

function fmtKickoffTime(time?: string | null) {
  if (time && time.length >= 4) return time.slice(0, 5);
  return "—";
}

export default function FixturesPage() {
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useFixtures(PREMIER_LEAGUE_ID);

  const [filter, setFilter] = useState<FilterKey>("all");
  const [favorites] = useState<Record<string, boolean>>({});

  const events = useMemo(() => {
    const list = (data as any)?.events ?? (data as any)?.event ?? [];
    return Array.isArray(list) ? list : [];
  }, [data]);

  const enriched = useMemo(() => {
    return events.map((e: any) => {
      const id = String(e?.idEvent ?? "");
      const home = String(e?.strHomeTeam ?? "Home");
      const away = String(e?.strAwayTeam ?? "Away");
      const league = String(e?.strLeague ?? "Matches");
      const status = String(e?.strStatus ?? e?.strProgress ?? "").trim();
      const hs = safeNum(e?.intHomeScore);
      const as = safeNum(e?.intAwayScore);
      const homeBadge = String(e?.strHomeTeamBadge ?? "");
      const awayBadge = String(e?.strAwayTeamBadge ?? "");

      const live = isLiveStatus(status);
      const finished = isFinishedStatus(status);

      const statusLabel = finished
        ? "FT"
        : live
          ? status.toUpperCase().includes("HT")
            ? "HT"
            : "63'"
          : fmtKickoffTime(e?.strTime);

      const statusColor: "red" | "green" | "gray" = finished
        ? "red"
        : live
          ? "green"
          : "gray";

      return {
        id,
        league,
        home,
        away,
        status,
        live,
        finished,
        statusLabel,
        statusColor,
        homeBadge,
        awayBadge,
        homeScore: hs === null ? "" : String(hs),
        awayScore: as === null ? "" : String(as),
        kickoff: fmtKickoffTime(e?.strTime),
      };
    });
  }, [events]);

  const filtered = useMemo(() => {
    if (filter === "live") return enriched.filter((m) => m.live);
    if (filter === "favorites") return enriched.filter((m) => favorites[m.id]);
    return enriched;
  }, [enriched, filter, favorites]);

  const groups = useMemo(() => {
    const map = new Map<string, typeof filtered>();
    for (const m of filtered) {
      const arr = map.get(m.league) ?? [];
      arr.push(m);
      map.set(m.league, arr);
    }
    return Array.from(map.entries());
  }, [filtered]);

  const allCount = enriched.length;
  const liveCount = enriched.filter((m) => m.live).length;
  const favCount = enriched.filter((m) => favorites[m.id]).length;

  return (
    <div className="min-h-screen  bg-[#141824] text-white">
      <TopNav />

      <div className="mx-auto max-w-[1180px] px-6 pb-16">
        <div className="pt-8">
          <div className="text-xl font-bold text-white/95">Matches</div>

          <DateBar />

          <div className="mt-4 flex items-center gap-3 overflow-x-auto">
            <FilterPill
              active={filter === "all"}
              label="All"
              count={allCount}
              onClick={() => setFilter("all")}
            />
            <FilterPill
              active={filter === "live"}
              label="Live"
              count={liveCount}
              onClick={() => setFilter("live")}
              icon={
                <span className="text-xs">
                  <Radio />
                </span>
              }
            />
            <FilterPill
              active={filter === "favorites"}
              label="Favorites"
              count={favCount}
              onClick={() => setFilter("favorites")}
              icon={
                <span className="text-xs">
                  <Heart />
                </span>
              }
            />
          </div>

          {isLoading ? (
            <div className="mt-6 space-y-4">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="h-[160px] rounded-2xl bg-white/5" />
              ))}
            </div>
          ) : isError ? (
            <div className="mt-6 rounded-2xl bg-[#1D1E2B] p-6 text-white/80">
              <div className="text-lg font-semibold text-white">
                Failed to load matches
              </div>
              <div className="mt-2 text-sm text-white/60">
                {String((error as any)?.message ?? "Unknown error")}
              </div>
            </div>
          ) : (
            <div className="mt-3  divide-x-2 divide-[#2A2E3B] rounded-lg ">
              {groups.map(([league, matches]) => (
                <LeagueSection key={league} title={league}>
                  {matches.map((m) => (
                    <MatchRow
                      key={m.id}
                      statusLabel={
                        m.live ? m.statusLabel : m.finished ? "FT" : m.kickoff
                      }
                      statusColor={m.statusColor}
                      homeName={m.home}
                      awayName={m.away}
                      homeScore={m.homeScore}
                      awayScore={m.awayScore}
                      homeBadge={m.homeBadge}
                      awayBadge={m.awayBadge}
                      isLive={m.live}
                      onClick={() => navigate(`/match/${m.id}`)}
                    />
                  ))}
                </LeagueSection>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
