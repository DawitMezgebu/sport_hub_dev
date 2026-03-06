import { useState } from "react";

function cn(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

type Tab = "Details" | "Odds" | "Lineups" | "Events" | "Stats" | "Standings";

export default function MatchTabs() {
  const tabs: Tab[] = [
    "Details",
    "Odds",
    "Lineups",
    "Events",
    "Stats",
    "Standings",
  ];

  const [activeTab, setActiveTab] = useState<Tab>("Events");

  return (
    <div className="mt-8 w-full overflow-x-auto no-scrollbar">
      <div className="flex min-w-max items-center justify-start gap-4 px-1 sm:justify-center">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "shrink-0 whitespace-nowrap px-3 py-2 text-[12px] transition",
              activeTab === tab
                ? "border-b-2 border-[var(--accent)] text-[var(--accent)] font-semibold"
                : "text-white/70 hover:text-white",
            )}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
