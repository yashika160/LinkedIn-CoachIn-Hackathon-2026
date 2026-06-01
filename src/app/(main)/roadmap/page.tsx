"use client";

import { useEffect, useState } from "react";
import ReactFlow, { Background, MarkerType } from "reactflow";
import "reactflow/dist/style.css";
import { Sparkles, Trophy, CheckCircle2, PlayCircle, Lock, ChevronDown, ChevronUp, ArrowUpRight, Loader2 } from "lucide-react";
import RoadmapNode from "@/components/roadmap/RoadmapNode";
import { api } from "@/lib/api";

const nodeTypes = { roadmap: RoadmapNode };
const proOptions = { hideAttribution: true };

// Static roadmaps for known roles
const staticRoadmaps: any = {
  "software engineer": [
    { title: "DSA", link: "https://www.geeksforgeeks.org/dsa/", lessons: ["Arrays", "Linked Lists", "Stacks", "Queues", "Trees"] },
    { title: "Git & GitHub", link: "https://www.geeksforgeeks.org/blogs/ultimate-guide-git-github/", lessons: ["Git Basics", "Branches", "GitHub Workflow"] },
    { title: "HTML/CSS/JS", link: "https://www.geeksforgeeks.org/javascript/", lessons: ["HTML Basics", "CSS Flexbox", "JavaScript DOM"] },
    { title: "React + Tailwind", link: "https://react.dev", lessons: ["React Basics", "Hooks", "Tailwind UI"] },
    { title: "Node.js", link: "https://www.geeksforgeeks.org/node-js/", lessons: ["Express", "REST APIs", "Authentication"] },
    { title: "Databases", link: "https://www.geeksforgeeks.org/dbms/", lessons: ["SQL", "MongoDB"] },
    { title: "Docker", link: "https://www.geeksforgeeks.org/devops/docker-tutorial/", lessons: ["Containers", "Docker Compose"] },
  ],
  "ai/ml engineer": [
    { title: "Python", link: "https://www.geeksforgeeks.org/python/", lessons: ["Basics", "OOP", "File I/O"] },
    { title: "Math for ML", link: "https://www.khanacademy.org/math/linear-algebra", lessons: ["Linear Algebra", "Probability", "Statistics"] },
    { title: "ML Fundamentals", link: "https://www.coursera.org/learn/machine-learning", lessons: ["Regression", "Classification", "Clustering"] },
    { title: "Deep Learning", link: "https://www.deeplearning.ai", lessons: ["Neural Nets", "CNNs", "RNNs"] },
    { title: "Frameworks", link: "https://pytorch.org", lessons: ["PyTorch", "TensorFlow", "Scikit-learn"] },
    { title: "MLOps", link: "https://mlops.community", lessons: ["Model Deployment", "Docker", "CI/CD"] },
  ],
  "data analyst": [
    { title: "Excel", link: "https://www.coursera.org/learn/excel-basics-data-analysis-ibm", lessons: ["Formulas", "Pivot Tables", "Charts"] },
    { title: "SQL", link: "https://www.geeksforgeeks.org/sql/", lessons: ["SELECT", "JOINs", "Aggregations"] },
    { title: "Python for Data", link: "https://www.geeksforgeeks.org/python/", lessons: ["Pandas", "NumPy", "Matplotlib"] },
    { title: "Power BI / Tableau", link: "https://www.tableau.com/learn/training", lessons: ["Dashboards", "Charts", "KPIs"] },
    { title: "Statistics", link: "https://www.khanacademy.org/math/statistics-probability", lessons: ["Descriptive Stats", "Hypothesis Testing"] },
  ],
  "frontend developer": [
    { title: "HTML & CSS", link: "https://developer.mozilla.org/en-US/docs/Learn/HTML", lessons: ["Semantic HTML", "Flexbox", "Grid", "Responsive Design"] },
    { title: "JavaScript", link: "https://javascript.info", lessons: ["DOM", "Events", "Async/Await", "ES6+"] },
    { title: "React", link: "https://react.dev", lessons: ["Components", "Hooks", "State Management"] },
    { title: "Tailwind CSS", link: "https://tailwindcss.com/docs", lessons: ["Utility Classes", "Dark Mode", "Animations"] },
    { title: "Next.js", link: "https://nextjs.org/docs", lessons: ["App Router", "SSR", "API Routes"] },
    { title: "Testing", link: "https://jestjs.io", lessons: ["Unit Tests", "React Testing Library"] },
  ],
  "backend developer": [
    { title: "Python / Node.js", link: "https://www.geeksforgeeks.org/node-js/", lessons: ["Basics", "Modules", "Async"] },
    { title: "REST APIs", link: "https://www.geeksforgeeks.org/rest-api-introduction/", lessons: ["HTTP Methods", "Status Codes", "Auth"] },
    { title: "Databases", link: "https://www.geeksforgeeks.org/dbms/", lessons: ["SQL", "NoSQL", "ORM"] },
    { title: "Docker", link: "https://docs.docker.com", lessons: ["Containers", "Compose", "Volumes"] },
    { title: "System Design", link: "https://www.geeksforgeeks.org/system-design-tutorial/", lessons: ["Scalability", "Caching", "Load Balancing"] },
  ],
  "data scientist": [
    { title: "Python", link: "https://www.geeksforgeeks.org/python/", lessons: ["Pandas", "NumPy", "Scipy"] },
    { title: "Statistics", link: "https://www.khanacademy.org/math/statistics-probability", lessons: ["Probability", "Distributions", "Inference"] },
    { title: "Machine Learning", link: "https://scikit-learn.org/stable/", lessons: ["Supervised", "Unsupervised", "Model Evaluation"] },
    { title: "Data Visualization", link: "https://matplotlib.org", lessons: ["Matplotlib", "Seaborn", "Plotly"] },
    { title: "Deep Learning", link: "https://www.deeplearning.ai", lessons: ["PyTorch", "Neural Nets", "Transfer Learning"] },
    { title: "Kaggle Projects", link: "https://www.kaggle.com", lessons: ["EDA", "Feature Engineering", "Competitions"] },
  ],
  "devops engineer": [
    { title: "Linux & Bash", link: "https://www.geeksforgeeks.org/linux/", lessons: ["Shell Scripting", "File System", "Permissions"] },
    { title: "Docker", link: "https://docs.docker.com", lessons: ["Images", "Containers", "Volumes", "Networks"] },
    { title: "Kubernetes", link: "https://kubernetes.io/docs/home/", lessons: ["Pods", "Services", "Deployments"] },
    { title: "CI/CD", link: "https://www.geeksforgeeks.org/ci-cd-pipeline/", lessons: ["GitHub Actions", "Jenkins", "Pipelines"] },
    { title: "Cloud (AWS/GCP)", link: "https://aws.amazon.com/training/", lessons: ["EC2", "S3", "IAM", "VPC"] },
  ],
  "product manager": [
    { title: "PM Fundamentals", link: "https://www.coursera.org/professional-certificates/google-project-management", lessons: ["Roadmapping", "Prioritization", "Stakeholders"] },
    { title: "User Research", link: "https://www.nngroup.com/articles/", lessons: ["User Interviews", "Surveys", "Personas"] },
    { title: "Data & Analytics", link: "https://www.geeksforgeeks.org/sql/", lessons: ["SQL", "Google Analytics", "A/B Testing"] },
    { title: "Product Strategy", link: "https://www.productplan.com/learn/", lessons: ["Market Analysis", "GTM", "OKRs"] },
    { title: "Design Thinking", link: "https://www.interaction-design.org", lessons: ["Wireframes", "Figma", "Prototyping"] },
  ],
};

function getRoleKey(role: string): string {
  const r = role.toLowerCase().trim();
  if (!r || r.length < 4) return ""; // Too short to be a real career

  // Direct exact match
  if (staticRoadmaps[r]) return r;

  const keys = Object.keys(staticRoadmaps);
  for (const key of keys) {
    // Only match if the user's role CONTAINS the full key as a substring
    // e.g. "senior software engineer" matches "software engineer"
    // but "sof" does NOT match "software engineer"
    if (r.includes(key)) return key;

    // Or the key contains the full user role (exact containment, not partial chars)
    if (key.includes(r) && r.length >= key.length * 0.7) return key;

    // Word-level match: EVERY word in user role must be at least 5 chars AND
    // must fully appear as a complete word in the key (not a prefix match)
    const userWords = r.split(/\s+/).filter(w => w.length >= 5);
    const keyWords = key.split(/\s+/);
    if (userWords.length > 0 && userWords.every(uw => keyWords.some(kw => kw === uw))) return key;
  }
  return "";
}

function isValidCareer(role: string): boolean {
  if (!role || role.trim().length < 4) return false;
  // Must have at least one word with 4+ characters (not just "abc", "sof", etc.)
  const words = role.trim().split(/\s+/);
  return words.some(w => w.length >= 4);
}

export default function RoadmapPage() {
  const [role, setRole] = useState("");
  const [roadmap, setRoadmap] = useState<any[]>([]);
  const [completedLessons, setCompletedLessons] = useState<any>({});
  const [expandedModule, setExpandedModule] = useState<number | null>(0);
  const [loading, setLoading] = useState(true);
  const [isAIGenerated, setIsAIGenerated] = useState(false);

  useEffect(() => {
    const userRole = localStorage.getItem("userRole") || "";
    setRole(userRole);
    const saved = JSON.parse(localStorage.getItem("completedLessons") || "{}");
    setCompletedLessons(saved);

    if (!userRole) { setLoading(false); return; }

    // Validate the career name is meaningful before generating roadmap
    if (!isValidCareer(userRole)) {
      setLoading(false);
      setRoadmap([]);
      return;
    }

    const userSkills = (localStorage.getItem("userSkills") || "")
      .split(",").map((s: string) => s.trim()).filter(Boolean);

    // Cache key includes skills fingerprint so skill changes regenerate
    const skillsKey = userSkills.slice(0, 5).join("|").toLowerCase();
    const cacheKey = `roadmap_v2_${userRole.toLowerCase()}_${skillsKey}`;
    const cached = localStorage.getItem(cacheKey);

    if (cached) {
      setRoadmap(JSON.parse(cached));
      setIsAIGenerated(true);
      setLoading(false);
    } else {
      setLoading(true);
      api.roadmap({ career: userRole, skills: userSkills })
        .then(res => {
          const steps = res.steps || res.roadmap || res.modules || [];
          const normalized = steps.map((s: any) => ({
            title: s.title || s.topic || s.name,
            link: s.resource_link || s.link || `https://www.google.com/search?q=${encodeURIComponent(s.title || s.topic)}+tutorial`,
            lessons: s.subtopics || s.lessons || s.topics || [],
          }));
          if (normalized.length > 0) {
            setRoadmap(normalized);
            setIsAIGenerated(true);
            localStorage.setItem(cacheKey, JSON.stringify(normalized));
          } else {
            // AI returned empty — fall back to static only for known valid roles
            const key = getRoleKey(userRole);
            if (key) { setRoadmap(staticRoadmaps[key]); setIsAIGenerated(false); }
            else { setRoadmap([]); }
          }
        })
        .catch(() => {
          // Backend offline: fall back to static roadmap ONLY for known roles
          const key = getRoleKey(userRole);
          if (key) {
            setRoadmap(staticRoadmaps[key]);
            setIsAIGenerated(false);
          } else {
            // Unknown role with backend offline — show empty state, don't guess
            setRoadmap([]);
          }
        })
        .finally(() => setLoading(false));
    }
  }, []);

  const toggleLesson = (moduleIndex: number, lessonIndex: number) => {
    const key = `${moduleIndex}-${lessonIndex}`;
    const updated = { ...completedLessons, [key]: !completedLessons[key] };
    setCompletedLessons(updated);
    localStorage.setItem("completedLessons", JSON.stringify(updated));
  };

  const completedCount = Object.values(completedLessons).filter(Boolean).length;
  const totalLessons = roadmap.reduce((s: number, m: any) => s + (m.lessons?.length || 0), 0);
  const progress = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  // Build ReactFlow nodes
  const nodes = roadmap.map((mod: any, i: number) => ({
    id: String(i),
    type: "roadmap",
    position: { x: i % 2 === 0 ? 100 : 500, y: i * 160 },
    data: {
      title: mod.title,
      index: i,
      total: roadmap.length,
      completed: mod.lessons?.every((_: any, li: number) => completedLessons[`${i}-${li}`]),
    },
  }));

  const edges = roadmap.slice(1).map((_: any, i: number) => ({
    id: `e${i}-${i + 1}`,
    source: String(i),
    target: String(i + 1),
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: "rgba(168,85,247,0.4)" },
  }));

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070A12] flex items-center justify-center flex-col gap-4">
        <Loader2 className="animate-spin w-10 h-10 text-purple-400" />
        <p className="text-white/50">Generating your personalized roadmap for <span className="text-purple-300">{role}</span>...</p>
      </div>
    );
  }

  if (!role || (!isValidCareer(role) && roadmap.length === 0)) {
    return (
      <div className="min-h-screen bg-[#070A12] flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <div className="text-5xl mb-4">🚫</div>
          <h2 className="text-2xl font-bold text-white mb-3">
            {role ? `"${role}" is not a recognized career` : "No career role set"}
          </h2>
          <p className="text-white/50 mb-6">
            {role
              ? "Please set a valid career goal (e.g. &quot;Software Engineer&quot;, &quot;Data Scientist&quot;) to generate a roadmap."
              : "Please complete onboarding or update your settings to set a career goal."}
          </p>
          <div className="flex gap-3 justify-center">
            <a href="/onboarding" className="px-6 py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition">
              Redo Onboarding
            </a>
            <a href="/settings" className="px-6 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 transition">
              Update Settings
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#070A12] text-white px-6 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.2),transparent_55%)]" />
      <div className="relative max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-300 mb-6">
            <Sparkles size={14} />
            {isAIGenerated ? "AI-Generated Roadmap" : "Curated Roadmap"}
          </div>
          <h1 className="text-5xl font-black capitalize">
            {role} <span className="text-purple-400">Roadmap</span>
          </h1>
          <p className="mt-3 text-white/50">{roadmap.length} modules · {totalLessons} lessons</p>
        </div>

        {/* PROGRESS */}
        <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] mb-10">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <Trophy className="text-yellow-400 w-5 h-5" />
              <span className="font-semibold">Your Progress</span>
            </div>
            <span className="text-2xl font-black text-purple-400">{progress}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-3">
            <div className="bg-gradient-to-r from-purple-500 to-cyan-500 h-3 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-white/40 text-xs mt-2">{completedCount} of {totalLessons} lessons completed</p>
        </div>

        {/* TWO COLUMNS: MODULE LIST + FLOW */}
        <div className="grid xl:grid-cols-2 gap-8">

          {/* MODULE LIST */}
          <div className="space-y-4">
            {roadmap.map((mod: any, i: number) => {
              const lessonCount = mod.lessons?.length || 0;
              const doneCount = mod.lessons?.filter((_: any, li: number) => completedLessons[`${i}-${li}`]).length || 0;
              const allDone = doneCount === lessonCount && lessonCount > 0;
              const expanded = expandedModule === i;

              return (
                <div key={i} className={`rounded-2xl border transition ${allDone ? "border-green-500/30 bg-green-500/5" : "border-white/10 bg-white/[0.03]"}`}>
                  <button
                    className="w-full flex items-center justify-between p-5 text-left"
                    onClick={() => setExpandedModule(expanded ? null : i)}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 ${allDone ? "bg-green-500/20 text-green-400" : i === 0 ? "bg-purple-500/20 text-purple-300" : "bg-white/10 text-white/50"}`}>
                        {allDone ? <CheckCircle2 size={18} /> : i < completedCount / Math.max(lessonCount, 1) ? <PlayCircle size={18} /> : <Lock size={16} />}
                      </div>
                      <div>
                        <p className="font-semibold">{mod.title}</p>
                        <p className="text-xs text-white/40">{doneCount}/{lessonCount} done</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-20 bg-white/10 rounded-full h-1.5">
                        <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: `${lessonCount ? (doneCount / lessonCount) * 100 : 0}%` }} />
                      </div>
                      {expanded ? <ChevronUp size={16} className="text-white/40" /> : <ChevronDown size={16} className="text-white/40" />}
                    </div>
                  </button>

                  {expanded && (
                    <div className="px-5 pb-5 space-y-2 border-t border-white/10 pt-4">
                      {mod.lessons?.map((lesson: string, li: number) => {
                        const done = completedLessons[`${i}-${li}`];
                        return (
                          <div key={li} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition">
                            <label className="flex items-center gap-3 cursor-pointer flex-1">
                              <input type="checkbox" checked={!!done} onChange={() => toggleLesson(i, li)} className="accent-purple-500 w-4 h-4" />
                              <span className={`text-sm ${done ? "line-through text-white/30" : "text-white/80"}`}>{lesson}</span>
                            </label>
                            <a href={mod.link} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition ml-2">
                              <ArrowUpRight size={14} />
                            </a>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* FLOW DIAGRAM */}
          <div className="rounded-2xl border border-white/10 overflow-hidden" style={{ height: "600px" }}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              fitView
              proOptions={proOptions}
            >
              <Background color="rgba(255,255,255,0.03)" gap={24} />
            </ReactFlow>
          </div>

        </div>
      </div>
    </main>
  );
}
