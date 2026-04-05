import { useState } from "react";
import { ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { format, addDays, startOfWeek } from "date-fns";

const classes = [
  {
    id: 1,
    time: "9:30—10:30 AM",
    name: "Ballet Basics",
    instructor: "JOHN DOE",
    type: ["In Studio"],
    image: "https://images.unsplash.com/photo-1758670331632-47c8bc00f705?w=500&q=80",
  },
  {
    id: 2,
    time: "11:00—12:00 PM",
    name: "Tap Rhythm",
    instructor: "SARITA ALLEN",
    type: ["In Studio"],
    image: "https://images.unsplash.com/photo-1643758344142-7933a8c07796?w=500&q=80",
  },
  {
    id: 3,
    time: "1:00—2:00 PM",
    name: "Jazz Performance",
    instructor: "EMMA WILSON",
    type: ["In Studio", "Open"],
    image: "https://images.unsplash.com/photo-1765278543368-6e89f3e080bf?w=500&q=80",
  },
  {
    id: 4,
    time: "4:00—5:00 PM",
    name: "Hip Hop Kids",
    instructor: "JANE SMITH",
    type: ["In Studio"],
    image: "https://images.unsplash.com/photo-1621976360623-004223992275?w=500&q=80",
  },
];

export function Classes() {
  const [currentDate] = useState(new Date());
  const [view, setView] = useState<"Day" | "Month">("Day");

  const startDate = startOfWeek(currentDate);
  const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(startDate, i));

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Class Schedule</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Find your perfect class and book your spot. We offer a variety of classes for all ages and skill levels.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4 mb-8">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium border border-slate-300 rounded-md text-slate-700 bg-white hover:bg-slate-50 flex items-center gap-2"
          >
            <Filter className="w-4 h-4" /> Filters
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex bg-slate-100 p-1 rounded-md">
            <button
              type="button"
              onClick={() => setView("Day")}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                view === "Day" ? "bg-white shadow-sm text-slate-900" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Day
            </button>
            <button
              type="button"
              onClick={() => setView("Month")}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                view === "Month" ? "bg-white shadow-sm text-slate-900" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Month
            </button>
          </div>
        </div>
      </div>

      {view === "Day" && (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <button type="button" className="p-2 hover:bg-slate-100 rounded-full" aria-label="Previous week">
              <ChevronLeft className="w-6 h-6 text-slate-600" />
            </button>
            <div className="flex flex-1 justify-between px-8">
              {weekDays.map((day, i) => {
                const isToday = format(day, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");
                return (
                  <div key={i} className="text-center flex flex-col items-center">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                      {format(day, "MMM dd")}
                    </span>
                    <span
                      className={`text-3xl font-light ${
                        isToday ? "text-purple-600 font-medium border-b-2 border-purple-600 pb-1" : "text-slate-400"
                      }`}
                    >
                      {format(day, "EEE")}
                    </span>
                  </div>
                );
              })}
            </div>
            <button type="button" className="p-2 hover:bg-slate-100 rounded-full" aria-label="Next week">
              <ChevronRight className="w-6 h-6 text-slate-600" />
            </button>
          </div>

          <div className="space-y-6">
            {classes.map((cls) => (
              <div
                key={cls.id}
                className="flex flex-col md:flex-row gap-6 p-6 border border-slate-200 rounded-xl hover:shadow-md transition-shadow bg-white items-center"
              >
                <div className="w-full md:w-64 h-40 bg-slate-100 rounded-lg overflow-hidden shrink-0 relative group">
                  <img
                    src={cls.image}
                    alt={cls.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="flex-1 w-full">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-light text-slate-900">{cls.name}</h3>
                    <span className="text-xl font-light text-slate-900">{cls.time}</span>
                  </div>
                  <div className="flex gap-2 mb-6">
                    {cls.type.map((t, j) => (
                      <span
                        key={j}
                        className={`text-xs px-2 py-1 border rounded-md ${
                          t === "Online"
                            ? "bg-purple-100 text-purple-800 border-purple-200"
                            : "border-slate-300 text-slate-600"
                        }`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="text-xs font-bold tracking-wider text-slate-500 flex gap-4">
                      <span>{cls.instructor}</span>
                      <span>|</span>
                      <span>LOCATION</span>
                    </div>
                    <button
                      type="button"
                      className="bg-black hover:bg-slate-800 text-white px-6 py-2 rounded-md font-bold text-sm transition-colors"
                    >
                      SIGN UP
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === "Month" && (
        <div className="text-center py-20 border border-slate-200 rounded-xl bg-slate-50">
          <p className="text-slate-500">Month view calendar would be implemented here.</p>
        </div>
      )}
    </div>
  );
}
