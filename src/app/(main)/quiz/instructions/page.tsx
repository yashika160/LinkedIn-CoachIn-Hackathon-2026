"use client";

import { useRouter } from "next/navigation";
import {
  Brain,
  Clock3,
  CheckCircle2,
} from "lucide-react";

export default function InstructionsPage() {

  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#070A12] text-white relative overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.30),transparent_45%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.12),transparent_40%)]" />

      <div className="relative z-10 max-w-4xl mx-auto px-10 py-20">

        <div className="
        rounded-[32px]
        border border-white/10
        bg-white/[0.03]
        backdrop-blur-xl
        p-12
        shadow-[0_0_60px_rgba(168,85,247,0.12)]
        ">

          <div className="flex items-center gap-4">

            <Brain className="text-purple-400" size={34} />

            <h1 className="text-5xl font-bold">
              Quiz Instructions
            </h1>

          </div>

          <p className="mt-6 text-white/60 text-lg">
            Read the instructions carefully before starting the quiz.
          </p>

          <div className="space-y-6 mt-12">

            {[
              "Total 10 Questions",
              "No negative marking",
              "Timer cannot be paused",
              "Review answers after submit",
              "Each question carries equal marks",
            ].map((item) => (

              <div
                key={item}
                className="flex items-center gap-4"
              >
                <CheckCircle2 className="text-green-400" />
                <p className="text-lg text-white/80">
                  {item}
                </p>
              </div>

            ))}

          </div>

          <button
            onClick={() => router.push("/quiz/play")}
            className="
            mt-14
            w-full
            py-5
            rounded-2xl
            font-semibold
            bg-gradient-to-r from-purple-600 to-cyan-500
            hover:scale-[1.01]
            transition-all duration-300
            "
          >
            Start Quiz
          </button>

        </div>

      </div>
    </div>
  );
}