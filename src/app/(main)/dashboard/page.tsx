"use client";

import StatsCards from "@/components/dashboard/StatsCards";
import Heatmap from "@/components/dashboard/Heatmap";
import ActivityPanel from "@/components/dashboard/ActivityPanel";
import AIInsights from "@/components/dashboard/AIInsights";
import CareerRing from "@/components/dashboard/CareerRing";
import BadgeWall from "@/components/dashboard/BadgeWall";
import StreakModal from "@/components/dashboard/StreakModal";

export default function DashboardPage() {
  return (
    <div className="space-y-10 fade-in pb-10">

      <div className="fixed inset-0 -z-10">
        <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-purple-500/10 blur-[140px]" />
        <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-cyan-500/10 blur-[140px]" />
      </div>

      {/* HERO SECTION */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-stretch">
        <div className="xl:col-span-2 relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5" />
          <div className="relative"><CareerRing size={280} /></div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm text-white/60">Achievements</h3>
            <span className="text-xs text-white/30">Live</span>
          </div>
          <BadgeWall compact />
        </div>
      </div>

      {/* STATS */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-2">
        <StatsCards />
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-6">
          <ActivityPanel />
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-6">
          <AIInsights />
        </div>
      </div>

      {/* HEATMAP */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-6">
        <Heatmap />
      </div>

      <StreakModal />
    </div>
  );
}
