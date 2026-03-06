import {
  BriefcaseMedical,
  FlagTriangleRight,
  MoveDown,
  MoveUp,
  Volleyball,
} from "lucide-react";

type TimelineSide = "home" | "away" | "center";
type TimelineType =
  | "goal"
  | "yellow"
  | "red"
  | "sub"
  | "corner"
  | "injury"
  | "shoot"
  | "info";

type TimelineEvent = {
  id: string;
  minuteLabel: string;
  side: TimelineSide;
  type: TimelineType;
  primary: string;
  secondary?: string;
  goalScorer?: string;
};

function cn(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

function Icon({ type }: { type: TimelineType }) {
  if (type === "sub")
    return (
      <span className="text-white/90">
        <Volleyball className="h-4 w-auto text-[var(--accent)]" />
      </span>
    );
  if (type === "yellow") return <span className="text-[var(--yellow)]">■</span>;
  if (type === "red") return <span className="text-[var(--danger)]">■</span>;
  if (type === "shoot")
    return (
      <span className="text-[var(--danger)]">
        <img
          src="
https://cdn-icons-png.flaticon.com/512/18164/18164650.png
  "
          className=""
        />
      </span>
    );
  if (type === "injury")
    return (
      <span className=" ">
        <BriefcaseMedical className="text-white/50 h-4 w-auto " />
      </span>
    );
  if (type === "corner")
    return (
      <span className="text-white/60">
        <FlagTriangleRight className="h-4 w-auto" />
      </span>
    );

  if (type === "goal")
    return (
      <span className="flex ">
        <MoveUp className="text-[var(--danger)] h-7 w-auto" />
        <MoveDown className="text-[var(--accent)] h-7 w-auto" />
      </span>
    );

  return (
    <span className="flex ">
      <MoveUp className="text-[var(--danger)] h-7 w-auto" />
      <MoveDown className="text-[var(--accent)] h-7 w-auto" />
    </span>
  );
  return <span className="text-white/60"></span>;
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
  const center = e.side === "center";

  if (center) {
    return (
      <div className="flex items-center gap-3 py-3 text-xs text-white/50">
        <div className="flex-1 border-t border-white/10" />
        <span className="px-2 tracking-wide whitespace-nowrap">
          {e.minuteLabel}
        </span>
        <div className="flex-1 border-t border-white/10" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[1fr_80px_1fr] items-center py-3">
      {/* LEFT (Home) */}
      <div
        className={cn("flex justify-end", left ? "opacity-100" : "opacity-60")}
      >
        {left ? (
          <div className="flex items-center gap-2">
            <div className="space-y-1 text-right">
              <div className="text-sm font-semibold text-white/90">
                {e.primary}
              </div>
              {e.secondary ? (
                <div className="text-xs text-white/50">{e.secondary}</div>
              ) : null}
            </div>

            <div className="w-6 ">
              <Icon type={e.type} />
            </div>

            <div className="h-[2px] w-4 rounded-full bg-white/10" />
          </div>
        ) : (
          <div className="h-[1px]" />
        )}
      </div>

      {/* CENTER (Minute) */}
      <div className="flex items-center justify-center">
        <MinutePill label={e.minuteLabel} active={e.type === "sub"} />
      </div>

      {/* RIGHT (Away) */}
      <div
        className={cn(
          "flex justify-start",
          right ? "opacity-100" : "opacity-60",
        )}
      >
        {right ? (
          <div className="flex items-center gap-2">
            {/* connector line */}
            <div className="h-[2px] w-4 rounded-full bg-white/10" />

            <div className="w-6 ">
              <Icon type={e.type} />
            </div>

            <div className="space-y-1 text-left">
              <div className="text-sm font-semibold text-white/90">
                {e.primary}
              </div>
              {e.secondary ? (
                <div className="text-xs text-white/50">{e.secondary}</div>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="h-[1px]" />
        )}
      </div>
    </div>
  );
}
