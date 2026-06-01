"use client";

import { useMemo, useState, useEffect } from "react";
import { useQuizStore } from "@/store/quizStore";
import {
  Trophy,
  Brain,
  Clock3,
  Target,
  CheckCircle2,
  XCircle,
  Sparkles,
} from "lucide-react";

export default function QuizResultPage() {
  const { answers, subject, startTime } = useQuizStore();

  const [review, setReview] = useState(false);

  const score = answers.filter(
    (a: any) => a.selected === a.correct
  ).length;

  const accuracy = answers.length > 0 ? Math.round((score / answers.length) * 100) : 0;

  const wrongAnswers = answers.filter(
    (a: any) => a.selected !== a.correct
  );

  const minutes = Math.floor((Date.now() - startTime) / 1000 / 60);
  const seconds = Math.floor(
    ((Date.now() - startTime) / 1000) % 60
  );

  const aiFeedback = useMemo(() => {
    if (score === 0) {
      return {
        strengths: [],
        improvements: [
          `You scored 0/${answers.length} on ${subject} — the fundamentals need work`,
          "Start from the basics: read the topic overview before attempting questions",
          "Use the Review Questions section below to study the correct answers",
          "Retake this quiz after studying to measure your improvement",
        ],
      };
    }
    if (accuracy >= 80) {
      return {
        strengths: [
          `Strong ${subject} knowledge — scored ${score}/${answers.length}`,
          "High accuracy shows solid conceptual understanding",
          accuracy === 100 ? "Perfect score! You've mastered this topic" : "Close to mastery — a few more practice rounds will get you there",
        ],
        improvements: [
          "Try a harder difficulty level next",
          "Explore advanced edge cases in this topic",
        ],
      };
    }
    if (accuracy >= 50) {
      return {
        strengths: [
          `Scored ${score}/${answers.length} — you have a partial understanding of ${subject}`,
          "You got the easier questions right — build on that foundation",
        ],
        improvements: [
          "Review the questions you got wrong using the section below",
          "Revise the core concepts you're unclear on before retrying",
          "Practice topic-wise to isolate weak areas",
        ],
      };
    }
    return {
      strengths: [
        `Scored ${score}/${answers.length} — you have some basic familiarity`,
      ],
      improvements: [
        `${subject} fundamentals need significant revision`,
        "Study the correct answers in the Review section below",
        "Watch a beginner tutorial on this topic before retrying",
        "Break the topic into smaller subtopics and study one at a time",
      ],
    };
  }, [accuracy, score, answers.length, subject]);

  const weakAreas = wrongAnswers
    .slice(0, 3)
    .map((a: any) => a.question);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070A12] text-white px-6 py-12">

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.25),transparent_60%)]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.15),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-300 mb-6">
            <Sparkles size={16} />
            Quiz Completed
          </div>

          <h1 className="text-6xl font-black">
            Quiz <span className="text-purple-400">Results</span>
          </h1>

          <p className="text-white/60 text-lg mt-4">
            AI-powered performance analytics
          </p>
        </div>

        {/* TOP STATS */}
        <div className="grid lg:grid-cols-4 gap-6 mb-10">

          {/* SCORE */}
          <div className="rounded-3xl border border-purple-500/20 bg-white/[0.04] p-8 flex flex-col items-center justify-center">

            <div className="relative w-44 h-44 rounded-full bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center shadow-[0_0_60px_rgba(168,85,247,0.4)]">

              <div className="w-36 h-36 rounded-full bg-[#070A12] flex flex-col items-center justify-center">

                <span className="text-5xl font-black text-purple-400">
                  {score}
                </span>

                <span className="text-white/50">
                  / {answers.length}
                </span>

              </div>

            </div>

            <p className="mt-6 text-white/60">
              Final Score
            </p>

          </div>

          {/* ACCURACY */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">

            <div className="flex items-center gap-3">
              <Target className="text-cyan-300" />
              <h2 className="text-xl font-bold">
                Accuracy
              </h2>
            </div>

            <div className="mt-6 text-5xl font-black text-cyan-300">
              {accuracy}%
            </div>

            <div className="mt-5 w-full h-3 rounded-full bg-white/10 overflow-hidden">

              <div
                className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-1000"
                style={{ width: `${accuracy}%` }}
              />

            </div>

          </div>

          {/* TIME */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">

            <div className="flex items-center gap-3">
              <Clock3 className="text-green-300" />
              <h2 className="text-xl font-bold">
                Time Taken
              </h2>
            </div>

            <div className="mt-6 text-5xl font-black text-green-300">
              {minutes}m
            </div>

            <p className="text-white/50 mt-2">
              {seconds}s
            </p>

          </div>

          {/* SUBJECT */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">

            <div className="flex items-center gap-3">
              <Brain className="text-yellow-300" />
              <h2 className="text-xl font-bold">
                {score === 0 ? "Topic" : "Strongest Subject"}
              </h2>
            </div>

            <div className="mt-6 text-3xl font-black text-yellow-300">
              {subject}
            </div>

            {score === 0 && (
              <p className="text-xs text-white/40 mt-2">Score 0 — study this topic and retry</p>
            )}

          </div>

        </div>

        {/* AI FEEDBACK */}
        <div className="grid lg:grid-cols-2 gap-8 mb-10">

          {/* STRENGTHS */}
          <div className="rounded-3xl border border-green-500/20 bg-green-500/10 p-8">

            <div className="flex items-center gap-3 mb-6">
              <CheckCircle2 className="text-green-300" />
              <h2 className="text-2xl font-bold text-green-300">
                Strengths
              </h2>
            </div>

            <div className="space-y-4">

              {aiFeedback.strengths.length === 0 ? (
                <div className="p-4 rounded-2xl bg-black/20 border border-white/5 text-white/40">
                  No strengths to report — you scored 0/{answers.length}. Study the correct answers below and try again.
                </div>
              ) : (
                aiFeedback.strengths.map((item, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-black/20 border border-white/5"
                  >
                    ✔ {item}
                  </div>
                ))
              )}

            </div>

          </div>

          {/* IMPROVEMENTS */}
          <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-8">

            <div className="flex items-center gap-3 mb-6">
              <XCircle className="text-red-300" />
              <h2 className="text-2xl font-bold text-red-300">
                Improvements
              </h2>
            </div>

            <div className="space-y-4">

              {aiFeedback.improvements.map((item, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-black/20 border border-white/5"
                >
                  • {item}
                </div>
              ))}

            </div>

          </div>

        </div>

        {/* WEAK AREAS */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 mb-10">

          <h2 className="text-3xl font-bold mb-6">
            Weak Areas
          </h2>

          <div className="space-y-4">

            {weakAreas.length > 0 ? (
              weakAreas.map((q: string, i: number) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-red-500/10 border border-red-500/20 text-white/80"
                >
                  {q}
                </div>
              ))
            ) : (
              <p className="text-green-300">
                Excellent performance. No major weak areas detected.
              </p>
            )}

          </div>

        </div>

        {/* REVIEW BUTTON */}
        <div className="text-center">

          <button
            onClick={() => setReview(!review)}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 font-bold text-lg hover:scale-[1.03] transition-all"
          >
            {review ? "Hide Review" : "Review Questions"}
          </button>

        </div>

        {/* REVIEW SECTION */}
        {review && (
          <div className="mt-12 space-y-6">

            {answers.map((a: any, i: number) => {
              const correct = a.selected === a.correct;

              return (
                <div
                  key={i}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] p-8"
                >

                  <div className="flex justify-between items-start gap-4">

                    <div>
                      <p className="text-purple-300 font-semibold">
                        Question {i + 1}
                      </p>

                      <h2 className="text-xl font-bold mt-2">
                        {a.question}
                      </h2>
                    </div>

                    <div
                      className={`px-4 py-2 rounded-xl text-sm font-semibold
                        ${
                          correct
                            ? "bg-green-500/20 text-green-300"
                            : "bg-red-500/20 text-red-300"
                        }`}
                    >
                      {correct ? "Correct" : "Wrong"}
                    </div>

                  </div>

                  <div className="mt-6 space-y-3">

                    {a.options.map((opt: string, idx: number) => {

                      const isCorrect =
                        opt === a.correct;

                      const isSelected =
                        opt === a.selected;

                      return (
                        <div
                          key={idx}
                          className={`p-4 rounded-2xl border
                          ${
                            isCorrect
                              ? "border-green-500 bg-green-500/10"
                              : isSelected
                              ? "border-red-500 bg-red-500/10"
                              : "border-white/10 bg-white/[0.03]"
                          }`}
                        >
                          {opt}
                        </div>
                      );
                    })}

                  </div>

                  <div className="mt-6 p-5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20">

                    <p className="text-cyan-300 font-semibold">
                      Explanation
                    </p>

                    <p className="text-white/70 mt-2">
                      {a.explanation}
                    </p>

                  </div>

                </div>
              );
            })}

          </div>
        )}

      </div>
    </main>
  );
}