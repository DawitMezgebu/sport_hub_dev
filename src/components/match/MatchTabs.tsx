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
    <>
      <div className="mt-8 flex items-center justify-center gap-6  overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "lg:px-3 py-2 text-[12px] font-normal rounded-none transition",
              activeTab === tab
                ? "border-b-2 border-[#00FFA5] text-white "
                : " text-white/80 hover:text-white",
            )}
          >
            {tab}
          </button>
        ))}
      </div>
    </>
  );
}
