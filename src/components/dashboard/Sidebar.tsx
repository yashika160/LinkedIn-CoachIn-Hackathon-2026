"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Map, Bot, FileText, Brain, MessageSquare, Code2,
  Settings, LogOut, Target, Wrench, X
} from "lucide-react";

const items = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Roadmap", href: "/roadmap", icon: Map },
  { label: "AI Mentor", href: "/mentor-chat", icon: Bot },
  { label: "Skill Gap", href: "/skill-gap", icon: Target },
  { label: "Career Tools", href: "/career-tools", icon: Wrench },
  { label: "Resume", href: "/resume-analyzer", icon: FileText },
  { label: "Quiz", href: "/quiz", icon: Brain },
  { label: "AI Interview", href: "/ai-interview", icon: MessageSquare },
  { label: "Coding", href: "/coding-challenge", icon: Code2 },
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <aside className="h-full flex flex-col bg-background/95 backdrop-blur-2xl border-r border-border">
      <div className="border-b border-border p-6 relative">
        <div className="flex items-center gap-3">
          <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-border bg-black/5 dark:bg-black/5 dark:bg-white/5 shadow-[0_0_25px_rgba(168,85,247,0.18)]">
            <Image src="/logo.png" alt="logo" fill priority sizes="56px" draggable={false} className="object-cover scale-[1.35]" />
          </div>
          <div>
            <h1 className="bg-gradient-to-r from-purple-300 via-pink-300 to-cyan-300 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent">
              AIVentra
            </h1>
            <p className="text-xs text-muted-foreground">Career Intelligence</p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/5 dark:bg-black/5 dark:bg-white/5 rounded-lg md:hidden">
            <X size={18} className="text-foreground" />
          </button>
        )}
      </div>

      <div className="flex-1 p-3 space-y-1 overflow-y-auto">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition relative
                ${active ? "bg-purple-500/20 text-foreground border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.25)]" : "text-muted-foreground hover:bg-black/5 dark:bg-black/5 dark:bg-white/5 hover:text-foreground"}`}>
              {active && <span className="absolute left-0 w-1 h-6 bg-purple-500 rounded-r-full shadow-[0_0_12px_rgba(168,85,247,0.8)]" />}
              <Icon size={18} />
              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-border">
        <button onClick={() => { localStorage.clear(); window.location.href = "/login"; }}
          className="flex items-center gap-2 text-red-600 dark:text-red-400 hover:text-red-300 transition text-sm">
          <LogOut size={16} /> Logout
        </button>
      </div>
    </aside>
  );
}
