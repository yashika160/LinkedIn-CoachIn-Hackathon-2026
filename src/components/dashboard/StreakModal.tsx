"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStreakStore } from "@/store/streakStore";

export default function StreakModal() {
  const { open, closeCalendar } = useStreakStore();
  const [days, setDays] = useState<boolean[]>([]);
  const [streakCount, setStreakCount] = useState(1);

  useEffect(() => {
    // Build real activity log from localStorage
    const activityLog: string[] = JSON.parse(localStorage.getItem("activityLog") || "[]");
    const streakDays = Number(localStorage.getItem("streakDays") || "1");
    setStreakCount(streakDays);

    // Build 35-day grid: mark today and days in activityLog
    const today = new Date();
    const grid: boolean[] = [];
    for (let i = 34; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const key = d.toISOString().split("T")[0];
      grid.push(activityLog.includes(key));
    }
    setDays(grid);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-[999]"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={closeCalendar}
        >
          <motion.div
            className="w-[600px] p-6 rounded-2xl bg-card border border-border"
            initial={{ scale: 0.8, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.8, y: 30 }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">🔥 Streak Activity Calendar</h2>
              <span className="text-orange-600 dark:text-orange-400 font-black text-2xl">{streakCount} day{streakCount !== 1 ? "s" : ""}</span>
            </div>
            <p className="text-xs text-muted-foreground mb-4">Last 35 days of activity</p>
            <div className="grid grid-cols-7 gap-2">
              {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d => (
                <p key={d} className="text-xs text-muted-foreground text-center">{d}</p>
              ))}
              {days.map((active, i) => (
                <div key={i} className={`h-6 rounded ${active ? "bg-orange-400" : "bg-black/10 dark:bg-white/10"}`} title={active ? "Active" : "No activity"} />
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-4">Activity is tracked each time you use AI features</p>
            <div className="flex justify-end mt-4">
              <button onClick={closeCalendar} className="px-4 py-2 rounded-lg bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:bg-white/20 transition text-sm">
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
