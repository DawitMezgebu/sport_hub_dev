import { CalendarDays } from "lucide-react";
import { useRef, useState } from "react";

export default function DateBar() {
  const [date, setDate] = useState(new Date());
  const inputRef = useRef<HTMLInputElement>(null);

  function formatDate(d: Date) {
    return d.toLocaleDateString(undefined, {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  }

  function changeDay(offset: number) {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + offset);
    setDate(newDate);
  }

  return (
    <div className="mt-4 flex w-full items-center justify-between rounded-xl bg-[var(--card)] px-4 py-3 text-white/85">
      <button
        onClick={() => changeDay(-1)}
        className="text-xl leading-none hover:text-white"
      >
        ‹
      </button>

      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => inputRef.current?.showPicker()}
      >
        <div className="h-9 w-9 rounded-lg bg-white/5 grid place-items-center hover:bg-white/10">
          <CalendarDays size={18} />
        </div>

        <div className="text-sm font-semibold">{formatDate(date)}</div>

        <input
          ref={inputRef}
          type="date"
          className="hidden"
          onChange={(e) => setDate(new Date(e.target.value))}
        />
      </div>

      <button
        onClick={() => changeDay(1)}
        className="text-xl leading-none hover:text-white"
      >
        ›
      </button>
    </div>
  );
}
