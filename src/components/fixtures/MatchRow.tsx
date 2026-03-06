import { useEffect, useState } from "react";

function cn(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

export default function MatchRow({
  statusLabel,
  statusColor,
  homeName,
  awayName,
  homeBadge,
  awayBadge,
  homeScore,
  awayScore,
  onClick,
  isLive,
}: {
  statusLabel: string;
  statusColor: "red" | "green" | "gray";
  homeName: string;
  awayName: string;
  homeBadge: string;
  awayBadge: string;
  homeScore: string;
  awayScore: string;
  onClick: () => void;
  isLive: boolean;
}) {
  const [minute, setMinute] = useState(32);

  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setMinute((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 1;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isLive]);
  const isFinished = statusColor === "red";
  function LiveIndicator() {
    return (
      <div className=" flex mt-2 items-center">
        <div className=" left-[3px]  h-[2px] w-6 -translate-y-1/2">
          <div className="h-full w-full rounded-full bg-[var(--accent)] animate-live-sweep" />
        </div>
      </div>
    );
  }
  const borderStyle = isLive
    ? "border-l-[var(--accent)] "
    : isFinished
      ? "border-l-[var(--danger)] "
      : "border-l-white/15";

  const livePanel =
    isLive &&
    "bg-[linear-gradient(90deg,rgba(0,255,165,0.2)_0%,rgba(0,255,165,0.1)_6%,rgba(0,0,0,0)_16%)] hover:animate-pulse z-0";

  return (
    <>
      <button
        onClick={onClick}
        className={cn(
          "group relative flex w-full items-stretch gap-4 px-3 h-[70px] text-left rounded-none  z-10 bg-[var(--card)]",
          "border-l-4",
          borderStyle,
          livePanel,
          "hover:bg-white/[0.03]",
        )}
      >
        <div className="w-[64px] shrink-0 py-4 flex flex-col items-center justify-center ">
          <div
            className={cn(
              "text-[12px] leading-none",
              isLive
                ? "font-bold text-[var(--accent)]"
                : "font-semibold text-white/80",
            )}
          >
            {isLive ? `${minute}'` : statusLabel}
          </div>

          {isLive && <LiveIndicator />}
        </div>

        <div className="flex w-full items-center justify-between gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <img
                src={homeBadge || "/placeholder-team.png"}
                alt={homeName}
                className="h-6 w-6 rounded-full object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "/placeholder-team.png";
                }}
              />
              <div className=" font-medium text-[12px] text-white">
                {homeName}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <img
                src={awayBadge || "/placeholder-team.png"}
                alt={awayName}
                className="h-6 w-6 rounded-full object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "/placeholder-team.png";
                }}
              />
              <div className="font-medium text-[12px] text-white">
                {awayName}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className=" text-[12px] font-medium text-white">
                {homeScore}
              </div>
              <div className="mt-3 text-[12px] font-medium   text-white">
                {awayScore}
              </div>
            </div>

            <div className="grid h-10 w-10 place-items-center rounded-lg text-white/60 group-hover:bg-white/5">
              <span className="text-2xl leading-none">⋮</span>
            </div>
          </div>
        </div>
      </button>
    </>
  );
}
