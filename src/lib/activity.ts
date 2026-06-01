/**
 * Call this whenever a user completes an AI action.
 * It logs today's date, updates streak, and tracks badge counts.
 */
export function trackActivity(type?: "quiz" | "interview" | "resume" | "coding" | "skillgap") {
  if (typeof window === "undefined") return;

  const today = new Date().toISOString().split("T")[0];

  // Activity log (array of date strings, duplicates allowed for heat intensity)
  const log: string[] = JSON.parse(localStorage.getItem("activityLog") || "[]");
  log.push(today);
  // Keep last 400 entries max
  if (log.length > 400) log.splice(0, log.length - 400);
  localStorage.setItem("activityLog", JSON.stringify(log));

  // Streak calculation
  const lastActive = localStorage.getItem("lastActiveDate");
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];
  let streak = Number(localStorage.getItem("streakDays") || "0");

  if (lastActive === today) {
    // Already tracked today, streak unchanged
  } else if (lastActive === yesterdayStr) {
    streak += 1; // Consecutive day
  } else {
    streak = 1; // Reset
  }

  localStorage.setItem("streakDays", String(streak));
  localStorage.setItem("lastActiveDate", today);

  // Badge counters
  if (type === "quiz") {
    const q = JSON.parse(localStorage.getItem("quizAnswers") || "[]");
    q.push({ date: today });
    localStorage.setItem("quizAnswers", JSON.stringify(q));
  }
  if (type === "interview") {
    const n = Number(localStorage.getItem("interviewsDone") || "0");
    localStorage.setItem("interviewsDone", String(n + 1));
  }
  if (type === "resume") localStorage.setItem("resumeAnalyzed", "true");
  if (type === "coding") localStorage.setItem("codingDone", "true");
  if (type === "skillgap") localStorage.setItem("skillGapDone", "true");
}
