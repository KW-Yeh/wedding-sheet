const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

function buildCalendarDays(year: number, month: number): (number | null)[] {
  const firstDayOfWeek = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();

  const days: (number | null)[] = Array(firstDayOfWeek).fill(null);
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(d);
  }
  while (days.length % 7 !== 0) {
    days.push(null);
  }
  return days;
}

export default function Calendar({
  year,
  month,
  date,
}: {
  year?: number;
  month?: number;
  date?: number;
}) {
  const days = buildCalendarDays(
    year ?? new Date().getFullYear(),
    month ?? new Date().getMonth() + 1,
  );

  return (
    <div className="w-full px-2">
      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-1">
        {WEEKDAYS.map((wd) => (
          <div
            key={wd}
            className="py-2 text-center text-sm font-semibold tracking-widest text-black"
          >
            {wd}
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-black mb-1" />

      {/* Day grid */}
      <div className="grid grid-cols-7">
        {days.map((day, idx) => {
          const isWedding = day === date;

          return (
            <div
              key={idx}
              className="relative flex items-center justify-center h-16"
            >
              {day !== null && (
                <>
                  {isWedding && (
                    <span className="absolute inset-[30%] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-8 rounded-full aspect-square border-2 border-red-400" />
                  )}
                  <span className="z-10 text-xl font-bold text-black">
                    {day}
                  </span>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
