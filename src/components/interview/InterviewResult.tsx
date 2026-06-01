"use client";

import { useEffect, useState } from "react";
import {
  Brain,
  TrendingUp,
  MessageSquare,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";

export default function InterviewResult({ onRestart }: any) {
  const [score, setScore] = useState(0);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i += 2;
      setScore(i);
      if (i >= 86) clearInterval(interval);
    }, 30);
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-8">

      {/* HEADER */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold">
          Interview <span className="text-purple-600 dark:text-purple-400">Report</span>
        </h1>
        <p className="text-gray-400">
          AI-generated performance analysis
        </p>
      </div>

      {/* SCORE CIRCLE */}
      <div className="flex justify-center">
        <div className="relative w-40 h-40 rounded-full border-8 border-purple-500 flex items-center justify-center">
          <div className="text-3xl font-bold">{score}%</div>
        </div>
      </div>

      {/* CARDS GRID */}
      <div className="grid md:grid-cols-3 gap-4">

        <div className="p-5 bg-black/5 dark:bg-black/5 dark:bg-white/5 border border-border rounded-2xl">
          <Brain className="text-purple-600 dark:text-purple-400 mb-2" />
          <h3 className="font-semibold">Technical Skills</h3>
          <p className="text-gray-400 text-sm">Strong fundamentals, needs depth in system design.</p>
        </div>

        <div className="p-5 bg-black/5 dark:bg-black/5 dark:bg-white/5 border border-border rounded-2xl">
          <MessageSquare className="text-cyan-600 dark:text-cyan-400 mb-2" />
          <h3 className="font-semibold">Communication</h3>
          <p className="text-gray-400 text-sm">Clear explanations with minor hesitation.</p>
        </div>

        <div className="p-5 bg-black/5 dark:bg-black/5 dark:bg-white/5 border border-border rounded-2xl">
          <ShieldCheck className="text-green-600 dark:text-green-400 mb-2" />
          <h3 className="font-semibold">Confidence</h3>
          <p className="text-gray-400 text-sm">Good presence, slightly improves under pressure.</p>
        </div>
      </div>

      {/* FEEDBACK BOX */}
      <div className="p-6 bg-black/5 dark:bg-black/5 dark:bg-white/5 border border-border rounded-2xl">
        <h3 className="text-lg font-semibold mb-3">AI Feedback</h3>

        <ul className="space-y-2 text-gray-300 text-sm">
          <li>• Use structured answers (STAR method)</li>
          <li>• Add more real project examples</li>
          <li>• Improve system design explanations</li>
          <li>• Good logical clarity overall</li>
        </ul>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-4 justify-center">

        <button
          onClick={onRestart}
          className="px-6 py-3 bg-purple-600 rounded-xl flex items-center gap-2"
        >
          <RotateCcw size={18} /> Restart Interview
        </button>

      
      </div>
    </div>
  );
}