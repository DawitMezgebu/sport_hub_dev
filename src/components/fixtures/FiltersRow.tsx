function cn(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

export default function FilterPill({
  active,
  label,
  count,
  onClick,
  icon,
}: {
  active: boolean;
  label: string;
  count: number;
  onClick: () => void;
  icon?: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium ",
        active
          ? "bg-[#00FFB3] text-[#0B0F17]"
          : "bg-[#1E2230] text-white/80 hover:text-white",
      )}
    >
      {icon ? (
        <span className={cn(active ? "" : "opacity-80")}>{icon}</span>
      ) : null}
      {label}
      <span
        className={cn(
          "ml-1 grid h-6 min-w-[24px] place-items-center rounded-lg px-2 text-xs",
          active ? "bg-black/10" : "bg-white/10",
        )}
      >
        {count}
      </span>
    </button>
  );
}
