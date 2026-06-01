"use client";
import { trackActivity } from "@/lib/activity";

import { useEffect, useState } from "react";
import { Loader2, CheckCircle2, RefreshCw, Star } from "lucide-react";
import { api } from "@/lib/api";
import { validateRole } from "@/lib/validation";

export default function AIInterviewPage() {
  const [role, setRole] = useState("");
  const [level, setLevel] = useState("Fresher");
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [evaluations, setEvaluations] = useState<any[]>([]);
  const [loadingQ, setLoadingQ] = useState(false);
  const [loadingEval, setLoadingEval] = useState(false);

  useEffect(() => {
    const savedRole = localStorage.getItem("userRole");
    if (savedRole) setRole(savedRole);
  }, []);

  const startInterview = async () => {
    const roleErr = validateRole(role);
    if (roleErr) { alert(roleErr); return; }
    if (!level) { alert("Please select an experience level"); return; }
    setLoadingQ(true);
    try {
      const res = await api.interview({ career: role, level });
      setQuestions(res.questions || []);
      setStarted(true);
      setIndex(0);
      setEvaluations([]);
    } catch { alert("Failed to load questions. Is the backend running?"); }
    finally { setLoadingQ(false); }
  };

  const submitAnswer = async () => {
    if (!answer.trim()) { alert("Please provide an answer"); return; }
    setLoadingEval(true);
    try {
      const q = questions[index];
      const evalRes = await api.evaluate({ question: q.question, user_answer: answer, career: role });
      const newEvals = [...evaluations, { question: q.question, answer, eval: evalRes }];
      setEvaluations(newEvals);
      setAnswer("");
      if (index < questions.length - 1) {
        setIndex(i => i + 1);
      } else {
        setCompleted(true);
        trackActivity("interview"); // Only fires once, at the end
      }
    } catch { alert("Failed to evaluate. Try again."); }
    finally { setLoadingEval(false); }
  };

  const restart = () => { setStarted(false); setCompleted(false); setIndex(0); setAnswer(""); setQuestions([]); setEvaluations([]); };

  const avgScore = evaluations.length ? Math.round(evaluations.reduce((s, e) => s + (e.eval?.score || 0), 0) / evaluations.length * 10) : 0;

  return (
    <main className="min-h-screen bg-[#070A12] text-white px-6 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.25),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.15),transparent_60%)]" />

      <div className="relative max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-300 mb-6">
            ⚡ AI Interview System
          </div>
          <h1 className="text-6xl font-black tracking-tight">AI <span className="text-cyan-400">Interview</span> Simulator</h1>
          <p className="mt-5 text-xl text-white/60 max-w-2xl mx-auto">Real AI-generated questions + instant evaluation with scores</p>
        </div>

        {!started ? (
          <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl space-y-6">
            <div>
              <label className="text-white/60 text-sm">Role / Career</label>
              <input value={role} onChange={e => setRole(e.target.value)}
                placeholder="e.g. Data Scientist, Frontend Developer"
                className="w-full mt-2 p-3 rounded-xl bg-black/30 border border-white/10 text-white outline-none focus:border-purple-500/50" />
            </div>
            <div>
              <label className="text-white/60 text-sm">Experience Level</label>
              <div className="flex gap-3 mt-2">
                {["Fresher","Junior","Mid","Senior"].map(l => (
                  <button key={l} onClick={() => setLevel(l)}
                    className={`flex-1 py-3 rounded-xl border font-medium transition ${level === l ? "border-purple-500 bg-purple-500/20 text-purple-300" : "border-white/10 text-white/50 hover:border-white/30"}`}>
                    {l}
                  </button>
                ))}
              </div>
            </div>
            <button onClick={startInterview} disabled={loadingQ}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 font-bold text-lg flex items-center justify-center gap-2 disabled:opacity-40">
              {loadingQ ? <><Loader2 className="animate-spin w-5 h-5" /> Generating Questions...</> : "Start AI Interview"}
            </button>
          </div>
        ) : !completed ? (
          <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-sm text-white/50">Question {index + 1} of {questions.length}</span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${questions[index]?.type === "Technical" ? "bg-purple-500/20 text-purple-300" : "bg-cyan-500/20 text-cyan-300"}`}>
                {questions[index]?.type}
              </span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-1.5">
              <div className="bg-gradient-to-r from-purple-500 to-cyan-500 h-1.5 rounded-full transition-all" style={{ width: `${((index + 1) / questions.length) * 100}%` }} />
            </div>
            <h2 className="text-xl font-semibold leading-relaxed">{questions[index]?.question}</h2>
            {questions[index]?.follow_up && <p className="text-sm text-white/40 italic">Follow-up: {questions[index].follow_up}</p>}
            <textarea value={answer} onChange={e => setAnswer(e.target.value)} rows={6}
              placeholder="Type your answer here..."
              className="w-full p-4 rounded-xl bg-black/30 border border-white/10 text-white resize-none outline-none focus:border-purple-500/50 text-sm" />
            <button onClick={submitAnswer} disabled={loadingEval}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 font-bold flex items-center justify-center gap-2 disabled:opacity-40">
              {loadingEval ? <><Loader2 className="animate-spin w-4 h-4" /> Evaluating...</> : index < questions.length - 1 ? "Submit & Next" : "Submit & Finish"}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.03] text-center">
              <CheckCircle2 className="mx-auto mb-3 text-green-400 w-12 h-12" />
              <h2 className="text-4xl font-black">Interview Complete!</h2>
              <p className="text-6xl font-black text-purple-400 mt-4">{avgScore}%</p>
              <p className="text-white/50 mt-2">Average Score across {evaluations.length} answers</p>
            </div>

            {evaluations.map((ev, i) => (
              <div key={i} className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] space-y-3">
                <div className="flex justify-between items-start gap-4">
                  <p className="font-semibold text-sm">{ev.question}</p>
                  <span className="flex items-center gap-1 text-yellow-400 font-bold text-sm flex-shrink-0">
                    <Star size={14} /> {ev.eval?.score}/{ev.eval?.max_score}
                  </span>
                </div>
                <p className="text-xs text-white/50 italic">Your answer: {ev.answer.slice(0, 120)}...</p>
                {ev.eval?.good?.length > 0 && (
                  <div><p className="text-green-400 text-xs font-bold mb-1">✓ Good:</p>
                    {ev.eval.good.map((g: string, j: number) => <p key={j} className="text-xs text-white/60">• {g}</p>)}
                  </div>
                )}
                {ev.eval?.missing?.length > 0 && (
                  <div><p className="text-red-400 text-xs font-bold mb-1">✗ Missing:</p>
                    {ev.eval.missing.map((m: string, j: number) => <p key={j} className="text-xs text-white/60">• {m}</p>)}
                  </div>
                )}
                {ev.eval?.tip && <p className="text-xs text-purple-300 italic">💡 {ev.eval.tip}</p>}
              </div>
            ))}

            <button onClick={restart} className="w-full py-4 rounded-xl border border-white/10 hover:bg-white/5 transition flex items-center justify-center gap-2">
              <RefreshCw size={16} /> Start New Interview
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
