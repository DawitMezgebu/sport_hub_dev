export default function LeagueSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="mt-5 rounded-2xl bg-[#1D1E2B] p-4 shadow-[0_10px_30px_rgba(0,0,0,0.25)] ">
        <div className="flex items-center justify-between pb-3 ">
          <div className="text-sm font-semibold text-white/90">{title}</div>
          <div className="grid h-9 w-9 place-items-center rounded-lg hover:bg-white/10">
            <span className="text-lg text-white/70">›</span>
          </div>
        </div>

        <div className="space-y-4 ">{children}</div>
      </div>
    </>
  );
}
