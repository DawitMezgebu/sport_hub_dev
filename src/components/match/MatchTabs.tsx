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
    <div className="mt-8 flex items-center justify-center gap-4 overflow-x-auto no-scrollbar w-full no-scrollbar">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={cn(
            "px-3 py-2 text-[12px] transition ",
            activeTab === tab
              ? "border-b-2 border-[var(--accent)] text-[var(--accent)] font-semibold"
              : "text-white/70 hover:text-white",
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
