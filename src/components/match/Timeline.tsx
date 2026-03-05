type TimelineSide = "home" | "away" | "center";
type TimelineType = "goal" | "yellow" | "red" | "sub" | "corner" | "info";

type TimelineEvent = {
  id: string;
  minuteLabel: string;
  side: TimelineSide;
  type: TimelineType;
  primary: string;
  secondary?: string;
};

function cn(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

function Icon({ type }: { type: TimelineType }) {
  if (type === "goal") return <span className="text-white/90">⚽</span>;
  if (type === "yellow") return <span className="text-[var(--yellow)]">■</span>;
  if (type === "red") return <span className="text-[var(--danger)]">■</span>;
  if (type === "sub") return <span className="text-[var(--accent)]">⇄</span>;
  if (type === "corner") return <span className="text-white/60">P</span>;
  return <span className="text-white/60">•</span>;
}

function MinutePill({ label, active }: { label: string; active?: boolean }) {
  return (
    <div
      className={cn(
        "w-[54px] rounded-full px-0 py-[6px] text-center text-xs font-bold",
        active
          ? "bg-[var(--accent)] text-[var(--textColor)]"
          : "bg-[#2A2F3E] text-white/75",
      )}
    >
      {label}
    </div>
  );
}

export default function TimelineRow({ e }: { e: TimelineEvent }) {
  const left = e.side === "home";
  const right = e.side === "away";

  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-6 py-3">
      <div className={cn("text-right", left ? "opacity-100" : "opacity-60")}>
        {left ? (
          <div className="space-y-1">
            <div className="text-sm font-semibold text-white/90">
              {e.primary}
            </div>
            {e.secondary ? (
              <div className="text-xs text-white/50">{e.secondary}</div>
            ) : null}
          </div>
        ) : (
          <div className="h-[1px]" />
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="w-4 text-center">
          <Icon type={e.type} />
        </div>
        <MinutePill label={e.minuteLabel} active={e.type === "sub"} />
      </div>

      <div className={cn("text-left", right ? "opacity-100" : "opacity-60")}>
        {right ? (
          <div className="space-y-1">
            <div className="text-sm font-semibold text-white/90">
              {e.primary}
            </div>
            {e.secondary ? (
              <div className="text-xs text-white/50">{e.secondary}</div>
            ) : null}
          </div>
        ) : (
          <div className="h-[1px]" />
        )}
      </div>
    </div>
  );
}
