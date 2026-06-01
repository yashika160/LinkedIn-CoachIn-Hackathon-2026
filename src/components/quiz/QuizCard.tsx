"use client"

import { useEffect, useState } from "react"

type Question = {
  q: string
  options: string[]
  answer: string
}

const bank: Record<string, Question[]> = {
  React: [
    {
      q: "What is React?",
      options: ["Library", "Framework", "Language", "DB"],
      answer: "Library",
    },
    {
      q: "useState is used for?",
      options: ["Routing", "State management", "Styling", "API"],
      answer: "State management",
    },
  ],
  JavaScript: [
    {
      q: "Closure is?",
      options: [
        "Function + Lexical Scope",
        "Loop",
        "Array",
        "Object",
      ],
      answer: "Function + Lexical Scope",
    },
  ],
  DSA: [
    {
      q: "Binary search complexity?",
      options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"],
      answer: "O(log n)",
    },
  ],
  DBMS: [
    {
      q: "Primary key is?",
      options: [
        "Unique identifier",
        "Index",
        "Query",
        "Column",
      ],
      answer: "Unique identifier",
    },
  ],
}

/* ---------------- AI RESULT ENGINE ---------------- */
const getPerformanceMessage = (score: number, total: number) => {
  const percent = (score / total) * 100

  if (percent >= 80) {
    return {
      title: "🔥 Excellent Performance",
      msg: "You are job-ready in this domain. Strong understanding detected.",
      color: "text-green-300",
    }
  }

  if (percent >= 50) {
    return {
      title: "⚡ Good Progress",
      msg: "You are close. Focus on weak areas to improve faster.",
      color: "text-yellow-300",
    }
  }

  return {
    title: "🧠 Needs Improvement",
    msg: "Revise fundamentals before advancing further.",
    color: "text-red-300",
  }
}

export default function QuizCard({ subject }: { subject: string }) {
  const questions = bank[subject] || []
  const TOTAL = 10

  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)

  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<any[]>([])

  const [finished, setFinished] = useState(false)
  const [review, setReview] = useState(false)

  const [time, setTime] = useState(0)

  const current = questions[index % questions.length]

  /* TIMER */
  useEffect(() => {
    if (finished) return

    const t = setInterval(() => setTime((p) => p + 1), 1000)
    return () => clearInterval(t)
  }, [finished])

  /* NEXT */
  const next = () => {
    if (!selected) return

    const isCorrect = selected === current.answer

    if (isCorrect) setScore((s) => s + 1)

    setAnswers((prev) => [
      ...prev,
      {
        q: current.q,
        selected,
        correct: current.answer,
        isCorrect,
      },
    ])

    setSelected(null)

    if (index + 1 === TOTAL) {
      setFinished(true)
    } else {
      setIndex(index + 1)
    }
  }

  /* REVIEW SCREEN */
  if (finished && review) {
    return (
      <div className="max-w-3xl mx-auto p-6 space-y-4">

        <h1 className="text-2xl font-bold">🧠 AI Review Analysis</h1>

        {answers.map((a, i) => (
          <div
            key={i}
            className="
              p-4 rounded-xl
              bg-black/5 dark:bg-black/5 dark:bg-white/5 backdrop-blur-xl
              border border-border
              hover:scale-[1.01] transition
              shadow-[0_0_20px_rgba(168,85,247,0.1)]
            "
          >

            <p className="font-semibold">{a.q}</p>

            <p className={a.isCorrect ? "text-green-300" : "text-red-300"}>
              Your Answer: {a.selected}
            </p>

            <p className="text-gray-400">
              Correct: {a.correct}
            </p>

            <p className="text-xs text-purple-600 dark:text-purple-300 mt-2">
              {a.isCorrect
                ? "✔ Correct understanding"
                : "⚠ Revise this topic"}
            </p>

          </div>
        ))}

      </div>
    )
  }

  /* RESULT SCREEN */
  if (finished) {
    const result = getPerformanceMessage(score, TOTAL)

    return (
      <div className="text-center p-10 space-y-6">

        <h1 className="text-4xl font-bold">🎉 Quiz Completed</h1>

        <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
          {score} / {TOTAL}
        </div>

        <div className={`p-4 rounded-xl bg-black/5 dark:bg-black/5 dark:bg-white/5 border border-border ${result.color}`}>
          <h2 className="text-xl font-semibold">{result.title}</h2>
          <p className="text-gray-300 mt-2">{result.msg}</p>
        </div>

        <p className="text-gray-400">⏱ Time Taken: {time}s</p>

        <div className="flex justify-center gap-4">

          <button
            onClick={() => setReview(true)}
            className="
              px-6 py-3 rounded-xl
              bg-gradient-to-r from-purple-600 to-blue-600
              hover:scale-105 transition
              shadow-[0_0_25px_rgba(168,85,247,0.4)]
            "
          >
            Review Answers
          </button>

          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-black/10 dark:bg-white/10 rounded-xl hover:scale-105 transition"
          >
            Retry
          </button>

        </div>

      </div>
    )
  }

  /* QUIZ UI */
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">

      {/* TOP BAR */}
      <div className="flex justify-between text-sm">

        <div className="px-3 py-1 rounded-xl bg-black/10 dark:bg-white/10 border border-border backdrop-blur-xl">
          Question {index + 1} / {TOTAL}
        </div>

        <div className="px-3 py-1 rounded-xl bg-purple-500/20 text-purple-600 dark:text-purple-300 animate-pulse">
          ⏱ {time}s
        </div>

      </div>

      {/* QUESTION */}
      <div className="
        p-6 rounded-2xl
        bg-black/10 dark:bg-white/10 backdrop-blur-xl
        border border-border
        shadow-[0_0_30px_rgba(168,85,247,0.15)]
      ">
        <h2 className="text-xl font-semibold">{current.q}</h2>
      </div>

      {/* OPTIONS */}
      <div className="grid gap-3">
        {current.options.map((opt) => (
          <button
            key={opt}
            onClick={() => setSelected(opt)}
            className={`
              p-3 rounded-xl border transition
              ${
                selected === opt
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 border-purple-400 scale-[1.02]"
                  : "bg-black/5 dark:bg-black/5 dark:bg-white/5 border-border hover:bg-black/10 dark:bg-white/10 hover:scale-[1.01]"
              }
            `}
          >
            {opt}
          </button>
        ))}
      </div>

      {/* BUTTON */}
      <div className="flex justify-end">
        <button
          onClick={next}
          disabled={!selected}
          className={`
            px-6 py-3 rounded-xl font-semibold transition
            ${
              selected
                ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:scale-110 shadow-[0_0_25px_rgba(168,85,247,0.4)]"
                : "bg-gray-700 opacity-50 cursor-not-allowed"
            }
          `}
        >
          {index + 1 === TOTAL ? "Submit" : "Next"}
        </button>
      </div>

    </div>
  )
}