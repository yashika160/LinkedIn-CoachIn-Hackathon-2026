"use client";

import { useEffect, useState } from "react";
import { Flame, Trophy, CheckCircle2, Target } from "lucide-react";

export default function ProgressPage() {
  const [streakDays, setStreakDays] = useState(0);
  const [achievements, setAchievements] = useState(0);
  const [courseCompletion, setCourseCompletion] = useState(0);
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [recentAchievements, setRecentAchievements] = useState<string[]>([]);
  const [weeklyGoal, setWeeklyGoal] = useState({ done: 0, total: 7 });

  useEffect(() => {
    const streak = Number(localStorage.getItem("streakDays") || "0");
    setStreakDays(streak);

    const quizAnswers = JSON.parse(localStorage.getItem("quizAnswers") || "[]");
    const interviewsDone = Number(localStorage.getItem("interviewsDone") || "0");
    const resumeAnalyzed = Boolean(localStorage.getItem("resumeAnalyzed"));
    const codingDone = Boolean(localStorage.getItem("codingDone"));
    const skillGapDone = Boolean(localStorage.getItem("skillGapDone"));

    // Count real achievements
    let achCount = 0;
    if (streak >= 1) achCount++;
    if (quizAnswers.length >= 1) achCount++;
    if (interviewsDone >= 1) achCount++;
    if (resumeAnalyzed) achCount++;
    if (codingDone) achCount++;
    if (skillGapDone) achCount++;
    setAchievements(achCount);

    // Roadmap completion
    const completedLessons = JSON.parse(localStorage.getItem("completedLessons") || "{}");
    const doneCount = Object.values(completedLessons).filter(Boolean).length;

    // Estimate total from roadmap cache
    const role = (localStorage.getItem("userRole") || "").toLowerCase();
    const skillsKey = (localStorage.getItem("userSkills") || "")
      .split(",").slice(0, 5).map((s: string) => s.trim()).join("|").toLowerCase();
    const cacheKey = `roadmap_v2_${role}_${skillsKey}`;
    const cached = localStorage.getItem(cacheKey);
    let totalLessons = 0;
    if (cached) {
      try {
        const roadmap = JSON.parse(cached);
        totalLessons = roadmap.reduce((s: number, m: any) => s + (m.lessons?.length || 0), 0);
      } catch {}
    }
    const completion = totalLessons > 0 ? Math.round((doneCount / totalLessons) * 100) : 0;
    setCourseCompletion(completion);

    // Completed modules from roadmap
    if (cached) {
      try {
        const roadmap = JSON.parse(cached);
        const done = roadmap
          .map((mod: any, i: number) => ({
            title: mod.title,
            allDone: mod.lessons?.every((_: any, li: number) => completedLessons[`${i}-${li}`]),
          }))
          .filter((m: any) => m.allDone)
          .map((m: any) => m.title);
        setCompletedModules(done);
      } catch {}
    }

    // Recent achievements
    const achieved: string[] = [];
    if (streak >= 1) achieved.push(`Maintained ${streak}-day streak`);
    if (quizAnswers.length >= 5) achieved.push(`Completed ${quizAnswers.length} quizzes in a row`);
    if (interviewsDone >= 1) achieved.push(`Completed ${interviewsDone} mock interview${interviewsDone > 1 ? "s" : ""}`);
    if (resumeAnalyzed) achieved.push("Resume analyzed successfully");
    if (codingDone) achieved.push("Solved first coding challenge");
    if (skillGapDone) achieved.push("Completed skill gap analysis");
    setRecentAchievements(achieved.slice(0, 4));

    // Weekly goal based on activity log
    const activityLog: string[] = JSON.parse(localStorage.getItem("activityLog") || "[]");
    const today = new Date();
    const weekDays = new Set<string>();
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const key = d.toISOString().split("T")[0];
      if (activityLog.includes(key)) weekDays.add(key);
    }
    setWeeklyGoal({ done: weekDays.size, total: 7 });
  }, []);

  return (
    <>
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <h1 className="text-5xl font-bold">
            Learning <span className="gradient-text">Progress</span>
          </h1>
          <p className="mt-5 text-lg text-gray-400">
            Track consistency, achievements, and learning milestones.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-4">
          <div className="glass rounded-3xl p-8">
            <Flame className="text-orange-400" size={40} />
            <h2 className="mt-6 text-4xl font-bold">
              {streakDays}
            </h2>
            <p className="mt-2 text-gray-400">Day Streak</p>
          </div>

          <div className="glass rounded-3xl p-8">
            <Trophy className="text-yellow-400" size={40} />
            <h2 className="mt-6 text-4xl font-bold">
              {achievements}
            </h2>
            <p className="mt-2 text-gray-400">Achievements</p>
          </div>

          <div className="glass rounded-3xl p-8">
            <CheckCircle2 className="text-green-400" size={40} />
            <h2 className="mt-6 text-4xl font-bold">
              {courseCompletion > 0 ? `${courseCompletion}%` : "—"}
            </h2>
            <p className="mt-2 text-gray-400">Course Completion</p>
          </div>

          <div className="glass rounded-3xl p-8">
            <Target className="text-cyan-400" size={40} />
            <h2 className="mt-6 text-4xl font-bold">
              {weeklyGoal.done}/{weeklyGoal.total}
            </h2>
            <p className="mt-2 text-gray-400">Weekly Goals</p>
          </div>
        </div>

        <div className="mt-10 grid gap-8 xl:grid-cols-2">
          <div className="glass rounded-3xl p-8">
            <h2 className="text-2xl font-bold">Completed Modules</h2>
            <div className="mt-8 space-y-5">
              {completedModules.length === 0 ? (
                <p className="text-gray-500 text-sm">No modules completed yet. Start your roadmap to track progress!</p>
              ) : (
                completedModules.map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between rounded-2xl bg-white/5 p-5"
                  >
                    <span>{item}</span>
                    <span className="text-green-400">Completed</span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="glass rounded-3xl p-8">
            <h2 className="text-2xl font-bold">Recent Achievements</h2>
            <div className="mt-8 space-y-5">
              {recentAchievements.length === 0 ? (
                <p className="text-gray-500 text-sm">No achievements yet. Complete quizzes, interviews, and roadmap modules to earn them!</p>
              ) : (
                recentAchievements.map((achievement) => (
                  <div
                    key={achievement}
                    className="rounded-2xl bg-purple-600/10 p-5"
                  >
                    {achievement}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
