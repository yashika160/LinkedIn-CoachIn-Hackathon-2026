"use client";

import { Brain } from "lucide-react";

export default function AIChatPanel({
  logs,
  score,
  result,
  testProgress,
}: any) {
  return (
    <div className="h-full bg-black/5 dark:bg-black/5 dark:bg-white/5 border border-border rounded-2xl p-4 flex flex-col">

      <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-300 mb-4">
        <Brain />
        AI Evaluation Engine
      </div>

      {/* TEST PROGRESS */}
      <div className="text-sm text-foreground/70 mb-3">
        Hidden Tests: {testProgress}/5
      </div>

      {/* LOGS */}
      <div className="flex-1 space-y-2 text-sm overflow-auto">
        {logs.map((l: string, i: number) => (
          <div key={i} className="text-muted-foreground">
            {l}
          </div>
        ))}
      </div>

      {/* RESULT */}
      <div className="mt-4 border-t border-border pt-3">
        <p className="text-purple-600 dark:text-purple-300 font-bold">Score: {score}</p>
        <p className="text-foreground/70">{result}</p>
      </div>
    </div>
  );
}