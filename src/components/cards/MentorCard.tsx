"use client";

import { useEffect, useRef, useState } from "react";
import {
  Bot, Send, User, Sparkles, BrainCircuit, Rocket, Briefcase, ChevronRight,
} from "lucide-react";
import { api } from "@/lib/api";

type Message = { role: "user" | "ai"; text: string };

export default function MentorCard() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", text: "Hey 👋 I'm your AI Mentor. Ask me anything about DSA, AI/ML, placements, projects, interviews, or career roadmaps." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const quickActions = [
    { title: "DSA Roadmap", desc: "Master problem solving", icon: BrainCircuit },
    { title: "AI/ML Path", desc: "Become ML engineer", icon: Sparkles },
    { title: "Projects", desc: "Build standout resume", icon: Rocket },
    { title: "Interview Prep", desc: "Ace product companies", icon: Briefcase },
    { title: "Resume Review", desc: "Improve ATS score", icon: Sparkles },
    { title: "Frontend Path", desc: "React & Next.js", icon: Rocket },
    { title: "Backend Engineering", desc: "Node.js roadmap", icon: BrainCircuit },
    { title: "Placement Strategy", desc: "Company preparation", icon: Briefcase },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setLoading(true);
    try {
      const userName = localStorage.getItem("userName") || "User";
      const careerGoal = localStorage.getItem("userRole") || "Software Engineer";
      const res = await api.chat({ message: text, career_goal: careerGoal, history, user_name: userName });
      setHistory(res.history || []);
      setMessages((prev) => [...prev, { role: "ai", text: res.reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: "ai", text: "Sorry, I couldn't reach the server. Please make sure the backend is running." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[340px_1fr] gap-6">
      {/* LEFT PANEL */}
      <div className="space-y-4">
        <div className="rounded-2xl border border-border bg-card backdrop-blur-xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
              <Bot size={18} />
            </div>
            <div>
              <p className="font-bold text-sm">Personal AI</p>
              <p className="text-xs text-muted-foreground">Career Mentor</p>
            </div>
            <div className="ml-auto flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-green-600 dark:text-green-400">Online</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Your personalized AI mentor — powered by real AI for coding, DSA, placements, and career guidance.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="text-xs text-muted-foreground mb-3 uppercase tracking-widest">Quick Actions</p>
          <div className="space-y-2">
            {quickActions.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.title}
                  onClick={() => sendMessage(item.title)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-black/5 dark:bg-black/5 dark:bg-white/5 transition text-left group"
                >
                  <Icon size={16} className="text-purple-600 dark:text-purple-400" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{item.desc}</p>
                  </div>
                  <ChevronRight size={14} className="text-muted-foreground group-hover:text-muted-foreground transition" />
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-purple-500/20 bg-purple-500/5 p-5">
          <p className="text-xs text-purple-600 dark:text-purple-300 font-semibold mb-1">AI Recommendation</p>
          <p className="text-xs text-muted-foreground">Focus on DSA + real projects + weekly interviews for fastest career growth 🚀</p>
        </div>
      </div>

      {/* RIGHT PANEL - CHAT */}
      <div className="rounded-2xl border border-border bg-card backdrop-blur-xl flex flex-col" style={{ height: "75vh" }}>
        <div className="p-4 border-b border-border flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
            <Bot size={14} />
          </div>
          <div>
            <p className="text-sm font-semibold">AI Mentor Assistant</p>
            <p className="text-xs text-muted-foreground">Always here to help</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${msg.role === "ai" ? "bg-purple-500/20" : "bg-cyan-500/20"}`}>
                {msg.role === "ai" ? <Bot size={14} className="text-purple-600 dark:text-purple-400" /> : <User size={14} className="text-cyan-600 dark:text-cyan-400" />}
              </div>
              <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.role === "ai" ? "bg-white/[0.05] text-foreground/90" : "bg-purple-500/20 text-foreground"}`}>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Bot size={14} className="text-purple-600 dark:text-purple-400" />
              </div>
              <div className="bg-white/[0.05] rounded-2xl px-4 py-3 flex items-center gap-1">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-border flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !loading && sendMessage(input)}
            placeholder="Ask your AI mentor anything..."
            className="flex-1 bg-black/5 dark:bg-black/5 dark:bg-white/5 border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-purple-500/50 transition"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={loading || !input.trim()}
            className="px-4 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 disabled:opacity-40 transition"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
