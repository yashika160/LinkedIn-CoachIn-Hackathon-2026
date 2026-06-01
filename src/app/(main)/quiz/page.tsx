"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuizStore } from "@/store/quizStore";
import { Brain, Sparkles, Loader2, Zap, X } from "lucide-react";
import { api } from "@/lib/api";
import { validateRole } from "@/lib/validation";

/* Career → Topics mapping */
const CAREER_TOPICS: Record<string, string[]> = {
  "Software Engineer": ["Data Structures","Algorithms","System Design","OOP Concepts","Databases","Git & Version Control","Operating Systems","Networking","Design Patterns"],
  "Frontend Developer": ["JavaScript","React","HTML & CSS","TypeScript","Browser APIs","Web Performance","Accessibility","Testing","Next.js"],
  "Backend Developer": ["Node.js","REST APIs","Databases","SQL","System Design","Authentication","Caching","Microservices","Docker"],
  "Full Stack Developer": ["JavaScript","React","Node.js","Databases","REST APIs","System Design","TypeScript","Docker","CI/CD"],
  "Data Scientist": ["Python","Machine Learning","Statistics","Pandas & NumPy","Data Visualization","SQL","Deep Learning","Feature Engineering","Model Evaluation"],
  "Data Analyst": ["SQL","Excel","Statistics","Python","Data Visualization","Power BI","Tableau","Business Intelligence","Data Cleaning"],
  "Machine Learning Engineer": ["Machine Learning","Deep Learning","Python","MLOps","Statistics","PyTorch/TensorFlow","Feature Engineering","Model Deployment","NLP"],
  "AI Engineer": ["Large Language Models","Prompt Engineering","Neural Networks","Python","NLP","Computer Vision","MLOps","Transformers","RAG Systems"],
  "Data Engineer": ["SQL","Python","Apache Spark","Data Pipelines","Kafka","Airflow","Cloud Platforms","Data Warehousing","ETL"],
  "DevOps Engineer": ["Docker","Kubernetes","CI/CD","Linux","Cloud (AWS/GCP)","Terraform","Monitoring","Bash Scripting","Security"],
  "Cloud Engineer": ["AWS","GCP","Azure","Cloud Architecture","Networking","Security","Infrastructure as Code","Docker","Kubernetes"],
  "Cybersecurity Engineer": ["Network Security","Ethical Hacking","Cryptography","Linux","Web Security","Penetration Testing","SIEM","Incident Response","Compliance"],
  "Product Manager": ["Product Strategy","User Research","Data Analysis","Roadmapping","Agile/Scrum","A/B Testing","Stakeholder Management","OKRs","Prioritization"],
  "Mobile Developer": ["React Native","Flutter","iOS/Swift","Android/Kotlin","Mobile UI","APIs","State Management","Performance","App Store"],
  "Game Developer": ["C++","Unity","Game Physics","3D Math","Rendering","Optimization","AI for Games","Shaders","Networking"],
};

function getTopicsForCareer(career: string): string[] {
  const key = Object.keys(CAREER_TOPICS).find(k => k.toLowerCase() === career.toLowerCase().trim());
  if (key) return CAREER_TOPICS[key];
  // Fuzzy match
  const fuzzy = Object.keys(CAREER_TOPICS).find(k => career.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(career.toLowerCase()));
  if (fuzzy) return CAREER_TOPICS[fuzzy];
  // Generic fallback topics
  return ["Python Basics","JavaScript","Data Structures","Algorithms","SQL","System Design","OOP Concepts","Databases","Statistics","Cloud Computing"];
}

export default function QuizPage() {
  const router = useRouter();
  const { setSubject, setQuestions, setDuration, setStartTime } = useQuizStore();
  const [career, setCareer] = useState("Software Engineer");
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [numQ, setNumQ] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [topics, setTopics] = useState<string[]>([]);

  useEffect(() => {
    const r = localStorage.getItem("userRole");
    if (r) setCareer(r);
  }, []);

  useEffect(() => {
    const newTopics = getTopicsForCareer(career);
    setTopics(newTopics);
    setTopic(""); // reset topic when career changes
  }, [career]);

  const startQuiz = async () => {
    const roleErr = validateRole(career);
    if (roleErr) { setError(roleErr); return; }
    if (!topic) { setError("Please select a topic"); return; }
    setError("");
    setLoading(true);
    try {
      const res = await api.quiz({ topic, career, difficulty, num_questions: numQ });
      const questions = (res.questions || []).map((q: any) => ({
        ...q,
        options: Object.entries(q.options || {}).map(([k, v]) => `${k}) ${v}`),
        correctOption: q.correct,
      }));
      setSubject(topic);
      setQuestions(questions);
      setDuration(10);
      setStartTime(Date.now());
      router.push("/quiz/play");
    } catch { setError("Failed to generate quiz. Is the backend running?"); }
    finally { setLoading(false); }
  };

  return (
    <main className="min-h-screen bg-[#070A12] text-white px-6 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.3),transparent_60%)]" />

      <div className="relative max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-300 mb-6">
            <Brain size={14} /> AI Quiz Engine
          </div>
          <h1 className="text-6xl font-black">AI-Generated <span className="text-cyan-400">Quiz</span></h1>
          <p className="mt-4 text-xl text-white/60">Real questions generated fresh by AI for your career</p>
        </div>

        <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl space-y-6">
          {/* CAREER */}
          <div>
            <label className="text-white/50 text-xs uppercase tracking-widest">Career Focus</label>
            <input value={career} onChange={e => setCareer(e.target.value)}
              className="w-full mt-2 p-3 rounded-xl bg-black/30 border border-white/10 text-white outline-none focus:border-purple-500/50"
              placeholder="e.g. Data Scientist, Frontend Developer" />
            <p className="text-xs text-white/30 mt-1">Type your career to see relevant topics below</p>
          </div>

          {/* TOPICS (dynamic per career) */}
          <div>
            <label className="text-white/50 text-xs uppercase tracking-widest mb-3 block">
              Select Topic <span className="text-white/30 normal-case ml-1">(for {career || "your career"})</span>
            </label>
            {topics.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {topics.map(t => (
                  <button key={t} onClick={() => setTopic(t)}
                    className={`px-4 py-2 rounded-xl border text-sm transition ${topic === t ? "border-purple-500 bg-purple-500/20 text-purple-300" : "border-white/10 text-white/50 hover:border-white/30"}`}>
                    {t}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-white/30 text-sm">Enter a career above to see topics</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-white/50 text-xs uppercase tracking-widest">Difficulty</label>
              <div className="flex gap-2 mt-2">
                {["Easy","Medium","Hard"].map(d => (
                  <button key={d} onClick={() => setDifficulty(d)}
                    className={`flex-1 py-2 rounded-xl border text-sm transition ${difficulty === d ? "border-purple-500 bg-purple-500/20 text-purple-300" : "border-white/10 text-white/40"}`}>
                    {d}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-white/50 text-xs uppercase tracking-widest">Questions</label>
              <div className="flex gap-2 mt-2">
                {[5, 10, 15].map(n => (
                  <button key={n} onClick={() => setNumQ(n)}
                    className={`flex-1 py-2 rounded-xl border text-sm transition ${numQ === n ? "border-purple-500 bg-purple-500/20 text-purple-300" : "border-white/10 text-white/40"}`}>
                    {n}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button onClick={startQuiz} disabled={loading || !topic}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 font-bold text-lg flex items-center justify-center gap-2 disabled:opacity-40">
            {loading ? <><Loader2 className="animate-spin w-5 h-5" /> Generating Quiz...</> : <><Zap size={18} /> Start AI Quiz</>}
          </button>
        </div>
      </div>
    </main>
  );
}
