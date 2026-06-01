"use client";

import { useEffect, useState } from "react";

export default function Heatmap() {
  const [weeks, setWeeks] = useState<number[][]>([]);

  useEffect(() => {
    const activityLog: string[] = JSON.parse(localStorage.getItem("activityLog") || "[]");
    const activitySet = new Set(activityLog);

    // Build last 364 days
    const today = new Date();
    const data: number[] = [];
    for (let i = 363; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const key = d.toISOString().split("T")[0];
      // Score: 0-4 based on number of events that day
      const count = activityLog.filter(k => k === key).length;
      data.push(Math.min(count, 4));
    }

    // Always mark today as active (score 2 minimum if logged in)
    data[data.length - 1] = Math.max(data[data.length - 1], 2);

    const w: number[][] = [];
    for (let i = 0; i < data.length; i += 7) w.push(data.slice(i, i + 7));
    setWeeks(w);
  }, []);

  return (
    <div className="panel overflow-x-auto">
      <h2 className="text-xl font-semibold mb-1">Learning Consistency</h2>
      <p className="text-xs text-muted-foreground mb-4">Your real activity over the last 12 months</p>
      {weeks.length === 0 ? (
        <p className="text-muted-foreground text-sm">No activity yet — use any AI feature to start tracking!</p>
      ) : (
        <div className="flex gap-1 min-w-[900px]">
          {weeks.map((week, i) => (
            <div key={i} className="flex flex-col gap-1">
              {week.map((v, j) => (
                <div key={j} className={`w-3 h-3 rounded-sm ${
                  v === 0 ? "bg-black/5 dark:bg-black/5 dark:bg-white/5"
                  : v === 1 ? "bg-indigo-900/40"
                  : v === 2 ? "bg-indigo-600/60"
                  : v === 3 ? "bg-indigo-400/70"
                  : "bg-indigo-300/90"
                }`} />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
