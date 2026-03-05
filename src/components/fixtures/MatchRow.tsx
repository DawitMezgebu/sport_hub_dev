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
  const isFinished = statusColor === "red";

  const borderStyle = isLive
    ? "border-l-[#00FFA5] "
    : isFinished
      ? "border-l-[#FF4D4D]"
      : "border-l-white/15";

  const livePanel =
    isLive &&
    "bg-[linear-gradient(90deg,rgba(0,255,165,0.2)_0%,rgba(0,255,165,0.1)_6%,rgba(0,0,0,0)_16%)] hover:animate-pulse z-0";

  return (
    <>
      <button
        onClick={onClick}
        className={cn(
          "group relative flex w-full items-stretch gap-4 px-3 h-[70px] text-left rounded-none  z-10 bg-[#1D1E2B]",
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
                ? "font-bold text-[#00FFB3]"
                : "font-semibold text-white/80",
            )}
          >
            {statusLabel}
          </div>

          {isLive && (
            <div className="mt-2 h-0.5 w-5  bg-[#00FFB3] animate__animated  animate__slideOutRight animate__delay-5s	5s animate__infinite	 "></div>
          )}
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
              <div className=" font-normal text-[12px] text-white/95">
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
              <div className="font-normal text-[12px] text-white/95">
                {awayName}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className=" text-[12px] font-normal text-white">
                {homeScore}
              </div>
              <div className="mt-3 text-[12px] font-normal   text-white">
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
