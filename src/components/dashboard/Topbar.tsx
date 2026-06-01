"use client";

import { useEffect, useRef, useState } from "react";
import { Flame, Bell, Sparkles, Trophy, Brain, Code2, Target, FileText, X, Menu, Moon, Sun } from "lucide-react";
import { useStreakStore } from "@/store/streakStore";
import { useTheme } from "next-themes";

type Notification = {
  id: string;
  icon: any;
  color: string;
  title: string;
  desc: string;
  time: string;
  read: boolean;
};

function buildNotifications(): Notification[] {
  const notifs: Notification[] = [];
  const quizCount = JSON.parse(localStorage.getItem("quizAnswers") || "[]").length;
  const interviewsDone = Number(localStorage.getItem("interviewsDone") || "0");
  const resumeAnalyzed = Boolean(localStorage.getItem("resumeAnalyzed"));
  const codingDone = Boolean(localStorage.getItem("codingDone"));
  const skillGapDone = Boolean(localStorage.getItem("skillGapDone"));
  const streak = Number(localStorage.getItem("streakDays") || "1");
  const role = localStorage.getItem("userRole") || "";
  const read: string[] = JSON.parse(localStorage.getItem("readNotifs") || "[]");

  const add = (id: string, icon: any, color: string, title: string, desc: string, time: string) => {
    notifs.push({ id, icon, color, title, desc, time, read: read.includes(id) });
  };

  if (streak >= 1) add("streak", Flame, "text-orange-600 dark:text-orange-400", `🔥 ${streak}-Day Streak!`, "You've been active for " + streak + " consecutive day(s). Keep it up!", "Today");
  if (quizCount === 0) add("quiz-cta", Brain, "text-cyan-600 dark:text-cyan-400", "Take Your First Quiz", "Test your knowledge with AI-generated questions tailored to your career.", "Tip");
  if (quizCount >= 1) add("quiz-done", Brain, "text-cyan-600 dark:text-cyan-400", `Quiz Completed ×${quizCount}`, `You've completed ${quizCount} quiz session(s). Your knowledge is growing!`, "Activity");
  if (interviewsDone === 0) add("interview-cta", Trophy, "text-yellow-600 dark:text-yellow-400", "Try a Mock Interview", "Practice with AI-generated questions and get instant honest feedback.", "Tip");
  if (interviewsDone >= 1) add("interview-done", Trophy, "text-yellow-600 dark:text-yellow-400", `${interviewsDone} Interview(s) Done`, "Great practice! Review your scores in the AI Interview section.", "Activity");
  if (!resumeAnalyzed) add("resume-cta", FileText, "text-green-600 dark:text-green-400", "Analyze Your Resume", "Get your ATS score and find out which keywords you're missing.", "Tip");
  if (resumeAnalyzed) add("resume-done", FileText, "text-green-600 dark:text-green-400", "Resume Analyzed ✓", "Your resume has been analyzed. Check the improvements section.", "Activity");
  if (!codingDone) add("coding-cta", Code2, "text-purple-600 dark:text-purple-400", "Try a Coding Challenge", "AI-generated coding problems tailored to your role. Build real skills.", "Tip");
  if (!skillGapDone) add("skillgap-cta", Target, "text-pink-600 dark:text-pink-400", "Find Your Skill Gap", "Discover exactly what you need to learn to land your target role.", "Tip");
  if (role) add("role-tip", Sparkles, "text-purple-600 dark:text-purple-300", `${role} Career Tips`, `Your AI mentor has personalized tips for ${role} roles. Ask it anything!`, "AI");

  return notifs;
}

export default function Topbar({ onOpenMenu }: { onOpenMenu?: () => void }) {
  const [userName, setUserName] = useState("User");
  const [streak, setStreak] = useState(1);
  const [showNotifs, setShowNotifs] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const openCalendar = useStreakStore((s) => s.openCalendar);
  const dropRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const name = localStorage.getItem("userName");
    if (name) setUserName(name);
    setStreak(Number(localStorage.getItem("streakDays") || "1"));
    setNotifications(buildNotifications());
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setShowNotifs(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    const ids = notifications.map(n => n.id);
    localStorage.setItem("readNotifs", JSON.stringify(ids));
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markRead = (id: string) => {
    const read: string[] = JSON.parse(localStorage.getItem("readNotifs") || "[]");
    if (!read.includes(id)) {
      read.push(id);
      localStorage.setItem("readNotifs", JSON.stringify(read));
    }
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <div className="sticky top-0 z-50 h-[82px] w-full flex items-center justify-between px-4 md:px-6 border-b border-border bg-background/85 backdrop-blur-2xl">

      {/* LEFT */}
      <div className="flex items-center gap-3">
        {onOpenMenu && (
          <button onClick={onOpenMenu} className="p-2 -ml-2 rounded-xl md:hidden hover:bg-black/5 dark:hover:bg-black/5 dark:bg-white/5 transition">
            <Menu size={20} className="text-foreground" />
          </button>
        )}
        <div className="flex flex-col justify-center">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight leading-tight">
            Welcome{" "}
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              {userName}
            </span>
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground leading-tight mt-1 hidden sm:block">AI-powered career dashboard</p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2 md:gap-3 h-full">

        {/* THEME TOGGLE */}
        {mounted && (
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-black/5 dark:bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition cursor-pointer"
          >
            {theme === 'dark' ? (
              <Sun size={18} className="text-foreground/70" />
            ) : (
              <Moon size={18} className="text-foreground/70" />
            )}
          </button>
        )}

        {/* NOTIFICATION BELL */}
        <div className="relative" ref={dropRef}>
          <button
            onClick={() => { setShowNotifs(v => !v); if (!showNotifs) setNotifications(buildNotifications()); }}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-black/5 dark:bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:bg-white/10 transition cursor-pointer"
          >
            <Bell size={18} className="text-foreground/70" />
            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-red-500 text-[10px] font-bold flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* DROPDOWN */}
          {showNotifs && (
            <div className="absolute right-0 top-12 w-80 rounded-2xl border border-border bg-card backdrop-blur-2xl shadow-2xl z-[100] overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <p className="font-semibold text-sm">Notifications</p>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <button onClick={markAllRead} className="text-xs text-purple-600 dark:text-purple-400 hover:text-purple-600 dark:text-purple-300 transition">
                      Mark all read
                    </button>
                  )}
                  <button onClick={() => setShowNotifs(false)}>
                    <X size={14} className="text-muted-foreground hover:text-foreground transition" />
                  </button>
                </div>
              </div>

              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="text-center text-muted-foreground text-sm py-8">No notifications</p>
                ) : (
                  notifications.map(n => {
                    const Icon = n.icon;
                    return (
                      <div
                        key={n.id}
                        onClick={() => markRead(n.id)}
                        className={`flex gap-3 px-4 py-3 border-b border-border hover:bg-black/5 dark:bg-black/5 dark:bg-white/5 transition cursor-pointer ${!n.read ? "bg-card" : ""}`}
                      >
                        <div className={`flex-shrink-0 w-8 h-8 rounded-lg bg-black/5 dark:bg-black/5 dark:bg-white/5 flex items-center justify-center mt-0.5`}>
                          <Icon size={14} className={n.color} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm font-medium leading-tight">{n.title}</p>
                            {!n.read && <span className="w-2 h-2 rounded-full bg-purple-400 flex-shrink-0 mt-1" />}
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{n.desc}</p>
                          <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>

        {/* STREAK CARD */}
        <div
          onClick={openCalendar}
          className="flex items-center gap-3 rounded-2xl border border-border bg-black/5 dark:bg-black/5 dark:bg-white/5 px-4 py-2 backdrop-blur-xl hover:bg-black/10 dark:bg-white/10 transition cursor-pointer"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/10">
            <Flame size={18} className="text-orange-600 dark:text-orange-400" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[11px] text-muted-foreground">Active Streak</span>
            <span className="text-lg font-bold text-orange-600 dark:text-orange-400">
              {streak} Day{streak !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* AI STATUS */}
        <div className="hidden xl:flex items-center gap-2 rounded-2xl border border-border bg-black/5 dark:bg-black/5 dark:bg-white/5 px-4 py-2">
          <Sparkles size={16} className="text-pink-600 dark:text-pink-400" />
          <span className="text-sm text-foreground/70">AI Active</span>
        </div>

      </div>
    </div>
  );
}
