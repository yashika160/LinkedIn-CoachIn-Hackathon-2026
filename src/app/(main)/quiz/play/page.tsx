"use client";
import { trackActivity } from "@/lib/activity";
import { useEffect, useState } from "react";
import { useQuizStore } from "@/store/quizStore";
import { useRouter } from "next/navigation";
import { Clock3, Brain } from "lucide-react";

export default function QuizPlayPage() {
  const router = useRouter();
  const { questions, currentIndex, nextQuestion, addAnswer, duration, answers } = useQuizStore();
  const [selected, setSelected] = useState("");
  const [timeLeft, setTimeLeft] = useState(duration * 60);

  const current = questions[currentIndex];
  const answeredCount = answers?.length || 0;

  if (!current) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#070A12] text-white">
        Loading Questions...
      </div>
    );
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          trackActivity("quiz");
          router.push("/quiz/result");
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const progress = questions.length === 0 ? 0 : Math.round((answeredCount / questions.length) * 100);

  /* Normalize correct answer: backend sends "A", options are "A) Text"
     We compare by the leading letter prefix to be robust. */
  const getCorrectOption = () => {
    const raw = current.correctOption || current.correct || "";
    // If correct is just a letter like "A", find matching option
    if (raw.length <= 2) {
      const match = (current.options as string[]).find((o: string) =>
        o.toUpperCase().startsWith(raw.toUpperCase())
      );
      return match || raw;
    }
    return raw;
  };

  const next = () => {
    if (!selected) return;
    const correctOption = getCorrectOption();
    addAnswer({
      question: current.question,
      selected,
      correct: correctOption,
      options: current.options,
      explanation: current.explanation || "",
    });
    setSelected("");
    if (currentIndex + 1 >= questions.length) {
      trackActivity("quiz");
      router.push("/quiz/result");
    } else {
      nextQuestion();
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-[#070A12] text-white flex flex-col relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.25),transparent_45%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.10),transparent_40%)]" />

      <div className="relative z-10 flex flex-col h-full max-w-6xl mx-auto w-full px-6 py-6">
        {/* PROGRESS */}
        <div className="flex-shrink-0">
          <div className="flex justify-between mb-2 text-sm text-white/50">
            <p>Progress</p>
            <p>{progress}% Complete</p>
          </div>
          <div className="h-2 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* NAV + TIMER */}
        <div className="flex items-center gap-2 mt-4 flex-wrap flex-shrink-0">
          {questions.map((_: any, i: number) => {
            const answered = i < answeredCount;
            const currentQ = i === currentIndex;
            return (
              <div key={i}
                className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold border transition
                  ${currentQ ? "bg-purple-600 border-purple-400" : answered ? "bg-green-500/20 border-green-500 text-green-300" : "bg-white/[0.03] border-white/10 text-white/50"}`}>
                {i + 1}
              </div>
            );
          })}
          <div className="ml-auto flex items-center gap-2 px-4 py-2 rounded-xl border border-cyan-500/20 bg-cyan-500/10">
            <Clock3 className="text-cyan-300 w-4 h-4" />
            <p className="text-cyan-300 font-bold">{Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}</p>
          </div>
        </div>

        {/* QUESTION */}
        <div className="flex-1 flex items-center justify-center mt-4">
          <div className="w-full max-h-full rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 shadow-[0_0_60px_rgba(168,85,247,0.10)] flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="text-purple-300 w-5 h-5" />
              <p className="text-purple-300 text-sm font-semibold">Question {currentIndex + 1} of {questions.length}</p>
            </div>
            <h2 className="text-3xl font-bold leading-snug">{current.question}</h2>
            <div className="mt-6 space-y-3">
              {current.options.map((o: string) => (
                <button key={o} onClick={() => setSelected(o)}
                  className={`w-full p-4 rounded-xl text-left border transition
                    ${selected === o ? "border-purple-500 bg-purple-500/20" : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"}`}>
                  {o}
                </button>
              ))}
            </div>
            <button disabled={!selected} onClick={next}
              className="mt-auto px-6 py-4 rounded-xl font-semibold bg-gradient-to-r from-purple-600 to-cyan-500 disabled:opacity-40">
              {currentIndex + 1 === questions.length ? "Submit Quiz" : "Next Question"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
