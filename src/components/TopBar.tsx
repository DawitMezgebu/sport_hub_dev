import { Menu } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

type NavKey =
  | "Live"
  | "Matches"
  | "Standings"
  | "Teams"
  | "Comparison"
  | "Statistics"
  | "Venues";

type LeagueOption = { id: string; label: string };
type SeasonOption = { id: string; label: string };

function cn(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

const NAV_TO_PATH: Record<NavKey, string> = {
  Live: "/live",
  Matches: "/",
  Standings: "/standings",
  Teams: "/teams",
  Comparison: "/comparison",
  Statistics: "/statistics",
  Venues: "/venues",
};

export default function TopNav({
  active,
  onChangeActive,
  leagues,
  leagueId,
  onChangeLeague,
  seasons,
  seasonId,
  onChangeSeason,
}: {
  active?: NavKey;
  onChangeActive?: (key: NavKey) => void;

  leagues?: LeagueOption[];
  leagueId?: string;
  onChangeLeague?: (id: string) => void;

  seasons?: SeasonOption[];
  seasonId?: string;
  onChangeSeason?: (id: string) => void;
}) {
  const navItems: NavKey[] = useMemo(
    () => [
      "Live",
      "Matches",
      "Standings",
      "Teams",
      "Comparison",
      "Statistics",
      "Venues",
    ],
    [],
  );

  const location = useLocation();

  const inferredActive: NavKey =
    active ??
    (Object.entries(NAV_TO_PATH).find(
      ([, path]) => path === location.pathname,
    )?.[0] as NavKey) ??
    "Matches";

  const leagueLabel =
    leagues?.find((l) => l.id === leagueId)?.label ?? "Premier League";
  const seasonLabel =
    seasons?.find((s) => s.id === seasonId)?.label ?? "2024/25";

  const [mobileOpen, setMobileOpen] = useState(false);
  const [leagueOpen, setLeagueOpen] = useState(false);
  const [seasonOpen, setSeasonOpen] = useState(false);

  const leagueRef = useRef<HTMLDivElement | null>(null);
  const seasonRef = useRef<HTMLDivElement | null>(null);

  function closeAllPopovers() {
    setLeagueOpen(false);
    setSeasonOpen(false);
  }

  function selectNav(k: NavKey) {
    onChangeActive?.(k);
    setMobileOpen(false);
    closeAllPopovers();
  }

  // close dropdowns on outside click
  useEffect(() => {
    function onDown(e: MouseEvent) {
      const t = e.target as Node;
      if (leagueRef.current && leagueRef.current.contains(t)) return;
      if (seasonRef.current && seasonRef.current.contains(t)) return;
      closeAllPopovers();
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  return (
    <header className="w-full bg-[#6D00FF]">
      <div className="mx-auto flex h-[64px] w-full max-w-[1440px] items-center justify-between px-3 sm:px-4 lg:px-6">
        {/* LEFT */}
        <div className="flex min-w-0 items-center gap-3 lg:gap-10">
          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className="shrink-0"
          >
            <img
              src={logo}
              alt="logo"
              className="h-8 w-auto sm:h-9 select-none"
            />
          </Link>

          {/* Desktop nav only */}
          <nav className="hidden lg:flex items-center gap-7 text-[15px] text-white/85">
            {navItems.map((k) => {
              const isActive = k === inferredActive;
              return (
                <Link
                  key={k}
                  to={NAV_TO_PATH[k]}
                  onClick={() => selectNav(k)}
                  className={cn(
                    "pb-[6px] font-normal hover:text-white hover:border-b-2 hover:border-[#00FFA5]",
                    isActive
                      ? "border-b-2 border-[#00FFA5] text-[#00FFA5] font-bold"
                      : "text-white/85",
                  )}
                >
                  {k}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* icons always visible */}
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-full bg-white/15 hover:bg-white/20"
            aria-label="Language"
          >
            🌍
          </button>

          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-full bg-white/15 hover:bg-white/20"
            aria-label="Sport"
          >
            ⚽
          </button>

          {/* League dropdown: desktop only (keeps mobile clean like your screenshot) */}
          <div className="relative hidden lg:block" ref={leagueRef}>
            <button
              type="button"
              onClick={() => {
                setLeagueOpen((v) => !v);
                setSeasonOpen(false);
              }}
              className="flex h-9 items-center gap-2 rounded-full bg-white/15 px-3 text-sm text-white/90 hover:bg-white/20"
            >
              <span className="grid h-4 w-4 place-items-center">🏴󠁧󠁢󠁥󠁮󠁧󠁿</span>
              <span className="max-w-[180px] truncate">{leagueLabel}</span>
              <span className="ml-1 text-white/70">▾</span>
            </button>

            {leagueOpen && (
              <div className="absolute right-0 top-[44px] z-50 w-[240px] overflow-hidden rounded-xl border border-white/10 bg-[#1B1F2B] shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
                <div className="px-3 py-2 text-xs font-semibold text-white/60">
                  League
                </div>
                <div className="max-h-[260px] overflow-auto">
                  {(leagues?.length
                    ? leagues
                    : [{ id: "133602", label: "Premier League" }]
                  ).map((l) => (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() => {
                        onChangeLeague?.(l.id);
                        setLeagueOpen(false);
                      }}
                      className={cn(
                        "w-full px-3 py-2 text-left text-sm hover:bg-white/5",
                        l.id === leagueId ? "text-[#00FFB3]" : "text-white/90",
                      )}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Season pill: visible on mobile + desktop (like your screenshot) */}
          <div className="relative" ref={seasonRef}>
            <button
              type="button"
              onClick={() => {
                setSeasonOpen((v) => !v);
                setLeagueOpen(false);
              }}
              className={cn(
                "flex h-9 items-center gap-2 rounded-full bg-white/15 px-3 text-xs sm:text-sm text-white/90 hover:bg-white/20",
                "max-w-[120px] sm:max-w-[160px]",
              )}
            >
              <span className="truncate">{seasonLabel}</span>
              <span className="text-white/70">▾</span>
            </button>

            {seasonOpen && (
              <div className="absolute right-0 top-[44px] z-50 w-[170px] overflow-hidden rounded-xl border border-white/10 bg-[#1B1F2B] shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
                <div className="px-3 py-2 text-xs font-semibold text-white/60">
                  Season
                </div>
                {(seasons?.length
                  ? seasons
                  : [
                      { id: "2023-24", label: "2023/24" },
                      { id: "2024-25", label: "2024/25" },
                    ]
                ).map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      onChangeSeason?.(s.id);
                      setSeasonOpen(false);
                    }}
                    className={cn(
                      "w-full px-3 py-2 text-left text-sm hover:bg-white/5",
                      s.id === seasonId ? "text-[#00FFB3]" : "text-white/90",
                    )}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-full bg-white/15 hover:bg-white/20"
            aria-label="Sport"
          >
            🏴󠁧󠁢󠁥󠁮󠁧󠁿
          </button>

          {/* Hamburger: mobile only */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-full bg-white/15 hover:bg-white/20 lg:hidden"
            aria-label="Menu"
          >
            <Menu size={18} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#1D1E2B]">
          <div className="mx-auto w-full max-w-[1440px] px-3 sm:px-4 py-3">
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((k) => {
                const isActive = k === inferredActive;
                return (
                  <Link
                    key={k}
                    to={NAV_TO_PATH[k]}
                    onClick={() => selectNav(k)}
                    className={cn(
                      "rounded-xl px-3 py-2 text-left text-sm font-semibold",
                      isActive
                        ? "bg-[#00FFB3] text-[#0B0F17]"
                        : "bg-white/10 text-white/90 hover:bg-white/15",
                    )}
                  >
                    {k}
                  </Link>
                );
              })}
            </div>

            {/* Optional: show league dropdown inside mobile drawer */}
            <div className="mt-3 rounded-xl bg-white/10 p-2">
              <div className="text-xs font-semibold text-white/70 px-2 py-1">
                League
              </div>
              <div className="max-h-[220px] overflow-auto">
                {(leagues?.length
                  ? leagues
                  : [{ id: "133602", label: "Premier League" }]
                ).map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => {
                      onChangeLeague?.(l.id);
                      setMobileOpen(false);
                    }}
                    className={cn(
                      "w-full px-2 py-2 text-left text-sm rounded-lg hover:bg-white/10",
                      l.id === leagueId ? "text-[#00FFB3]" : "text-white/90",
                    )}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
