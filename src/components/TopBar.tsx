import { ChevronDown, Menu } from "lucide-react";
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

const FALLBACK_LEAGUES: LeagueOption[] = [
  { id: "133602", label: "Premier League" },
];
const FALLBACK_SEASONS: SeasonOption[] = [
  { id: "2023-24", label: "2023/24" },
  { id: "2024-25", label: "2024/25" },
];

const NAV_ITEMS: NavKey[] = [
  "Live",
  "Matches",
  "Standings",
  "Teams",
  "Comparison",
  "Statistics",
  "Venues",
];

type Props = {
  active?: NavKey;
  onChangeActive?: (key: NavKey) => void;

  leagues?: LeagueOption[];
  leagueId?: string;
  onChangeLeague?: (id: string) => void;

  seasons?: SeasonOption[];
  seasonId?: string;
  onChangeSeason?: (id: string) => void;
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
}: Props) {
  const location = useLocation();

  const inferredActive: NavKey = useMemo(() => {
    if (active) return active;

    const hit = Object.entries(NAV_TO_PATH).find(
      ([, path]) => path === location.pathname,
    );
    return (hit?.[0] as NavKey) ?? "Matches";
  }, [active, location.pathname]);

  const leagueLabel =
    leagues?.find((l) => l.id === leagueId)?.label ?? "Premier League";
  const seasonLabel =
    seasons?.find((s) => s.id === seasonId)?.label ?? "2024/25";

  const [mobileOpen, setMobileOpen] = useState(false);
  const [leagueOpen, setLeagueOpen] = useState(false);
  const [seasonOpen, setSeasonOpen] = useState(false);

  const leagueRef = useRef<HTMLDivElement | null>(null);
  const seasonRef = useRef<HTMLDivElement | null>(null);

  const closeAllPopovers = () => {
    setLeagueOpen(false);
    setSeasonOpen(false);
  };

  const closeAll = () => {
    setMobileOpen(false);
    closeAllPopovers();
  };

  const selectNav = (k: NavKey) => {
    onChangeActive?.(k);
    closeAll();
  };

  useEffect(() => {
    function onDown(e: MouseEvent) {
      const target = e.target as Node;

      const clickedLeague = leagueRef.current?.contains(target);
      const clickedSeason = seasonRef.current?.contains(target);

      if (clickedLeague || clickedSeason) return;

      closeAllPopovers();
    }

    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const desktopNavLink = (k: NavKey) => {
    const isActive = k === inferredActive;

    return (
      <Link
        key={k}
        to={NAV_TO_PATH[k]}
        onClick={() => selectNav(k)}
        className={cn(
          "pb-[6px] font-normal hover:text-white hover:border-b-2 hover:border-[var(--accent)]",
          isActive
            ? "border-b-2 border-[var(--accent)] text-[var(--accent)] font-bold"
            : "text-white/85",
        )}
      >
        {k}
      </Link>
    );
  };

  const mobileNavLink = (k: NavKey) => {
    const isActive = k === inferredActive;

    return (
      <Link
        key={k}
        to={NAV_TO_PATH[k]}
        onClick={() => selectNav(k)}
        className={cn(
          "rounded-xl px-3 py-2 text-left text-sm font-semibold",
          isActive
            ? "bg-[var(--accent)] text-[var(--textColor)]"
            : "bg-white/10 text-white/90 hover:bg-white/15",
        )}
      >
        {k}
      </Link>
    );
  };

  const leagueList = leagues?.length ? leagues : FALLBACK_LEAGUES;
  const seasonList = seasons?.length ? seasons : FALLBACK_SEASONS;

  return (
    <header className="w-full bg-[var(--navbarbg)]">
      <div className="mx-auto flex h-[64px] w-full max-w-[1440px] items-center justify-between px-3 sm:px-4 lg:px-6">
        <div className="flex min-w-0 items-center gap-3 lg:gap-10">
          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className="shrink-0"
          >
            <img
              src={logo}
              alt="logo"
              className="h-8 w-auto select-none sm:h-9"
            />
          </Link>

          <nav className="hidden items-center gap-7 text-[15px] text-white/85 lg:flex">
            {NAV_ITEMS.map(desktopNavLink)}
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            className="grid lg:h-[40px] lg:w-[40px] h-[24px] w-[24px]  place-items-center rounded-full bg-[#1d1e2b] bg-opacity-15  hover:bg-white/20"
            aria-label="Language"
          >
              <span className="lg:text-2xl">🌍</span> 
          </button>

          <button
            type="button"
            className="grid lg:h-[40px] lg:w-[40px] h-[24px] w-[24px] place-items-center rounded-full bg-[#1d1e2b] bg-opacity-15 hover:bg-white/20"
            aria-label="Sport"
          >
           <span className="lg:text-2xl">⚽</span> 
          </button>

          <div className="relative hidden lg:block" ref={leagueRef}>
            <button
              type="button"
              onClick={() => {
                setLeagueOpen((v) => !v);
                setSeasonOpen(false);
              }}
              className="flex h-9 items-center gap-2 rounded-full bg-[#1d1e2b] bg-opacity-15  px-3 text-sm text-white/90 hover:bg-white/20"
            >
              <img
                src="https://play-lh.googleusercontent.com/gvlKi4GfJUgLh6HaVbM1wz_55NVngbs1Icn4t9oDzXIyxSLiT3401TrjAJNpeJs7mKtg1Tm2yTDFv_-mkWxh"
                alt="UK Flag"
                className="h-6 w-auto rounded-full"
              />

              <span className="max-w-[180px] truncate">{leagueLabel}</span>
              <ChevronDown className="h-4 w-auto" />
            </button>

            {leagueOpen && (
              <div className="absolute right-0 top-[44px] z-50 w-[240px] overflow-hidden rounded-xl border border-white/10 bg-[var(--card)] shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
                <div className="px-3 py-2 text-xs font-semibold text-white/60">
                  League
                </div>

                <div className="max-h-[260px] overflow-auto">
                  {leagueList.map((l) => (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() => {
                        onChangeLeague?.(l.id);
                        setLeagueOpen(false);
                      }}
                      className={cn(
                        "w-full px-3 py-2 text-left text-sm hover:bg-white/5",
                        l.id === leagueId
                          ? "text-[var(--accent)]"
                          : "text-white/90",
                      )}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="relative" ref={seasonRef}>
            <button
              type="button"
              onClick={() => {
                setSeasonOpen((v) => !v);
                setLeagueOpen(false);
              }}
              className={cn(
                "flex h-9 items-center gap-2 rounded-full bg-[#1d1e2b] bg-opacity-15  px-3 text-xs text-white/90 hover:bg-white/20 sm:text-sm",
                "max-w-[120px] sm:max-w-[160px]",
              )}
            >
              <span className="truncate">{seasonLabel}</span>
              <ChevronDown className="h-4 w-auto" />
            </button>

            {seasonOpen && (
              <div className="absolute right-0 top-[44px] z-50 w-[170px] overflow-hidden rounded-xl border border-white/10 bg-[var(--card)] shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
                <div className="px-3 py-2 text-xs font-semibold text-white/60">
                  Season
                </div>

                {seasonList.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      onChangeSeason?.(s.id);
                      setSeasonOpen(false);
                    }}
                    className={cn(
                      "w-full px-3 py-2 text-left text-sm hover:bg-white/5",
                      s.id === seasonId
                        ? "text-[var(--accent)]"
                        : "text-white/90",
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
            className="grid h-9 w-9 place-items-center rounded-full bg-[#1d1e2b] bg-opacity-15  hover:bg-white/20"
            aria-label="Region"
          >
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/007/910/760/small/united-kingdom-flag-rounded-icon-uk-flag-union-jack-vector.jpg"
              className="h-6 w-auto rounded-full"
            />
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-full  hover:bg-white/20 lg:hidden"
            aria-label="Menu"
          >
            <Menu size={18} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-[var(--card)] lg:hidden">
          <div className="mx-auto w-full max-w-[1440px] px-3 py-3 sm:px-4">
            <div className="grid grid-cols-2 gap-2">
              {NAV_ITEMS.map(mobileNavLink)}
            </div>

            <div className="mt-3 rounded-xl bg-white/10 p-2">
              <div className="px-2 py-1 text-xs font-semibold text-white/70">
                League
              </div>

              <div className="max-h-[220px] overflow-auto">
                {leagueList.map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => {
                      onChangeLeague?.(l.id);
                      setMobileOpen(false);
                    }}
                    className={cn(
                      "w-full rounded-lg px-2 py-2 text-left text-sm hover:bg-white/10",
                      l.id === leagueId
                        ? "text-[var(--accent)]"
                        : "text-white/90",
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
