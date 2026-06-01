"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-full flex overflow-hidden bg-[#050816]">

      {/* SIDEBAR */}
      <aside className="w-[260px] flex-shrink-0">
        <Sidebar />
      </aside>

      {/* MAIN */}
      <div className="flex flex-col flex-1 overflow-hidden">

        {/* TOPBAR */}
        <div className="h-[64px] flex-shrink-0">
          <Topbar />
        </div>

        {/* CONTENT */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>

      </div>
    </div>
  );
}