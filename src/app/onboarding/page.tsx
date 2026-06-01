"use client";
import { trackActivity } from "@/lib/activity";
import { validateRole, validateSkills, validateInterests, validateEducation } from "@/lib/validation";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Brain, Check, ArrowRight, Sparkles, X } from "lucide-react";
import { api } from "@/lib/api";

const steps = ["Basic Info", "Your Background", "Generating Roadmap"];

/* ===================== AUTOCOMPLETE DATA ===================== */
const SKILLS_LIST = [
  "Python","JavaScript","TypeScript","Java","C++","C","C#","Go","Rust","Ruby","PHP","Swift","Kotlin","Scala",
  "React","Next.js","Vue.js","Angular","Svelte","Node.js","Express","FastAPI","Django","Flask","Spring Boot",
  "SQL","MySQL","PostgreSQL","MongoDB","Redis","Elasticsearch","Firebase","Supabase",
  "TensorFlow","PyTorch","Scikit-learn","Pandas","NumPy","Matplotlib","Seaborn","OpenCV",
  "AWS","Azure","GCP","Docker","Kubernetes","Terraform","Ansible","Jenkins","GitHub Actions","CI/CD",
  "HTML","CSS","Tailwind CSS","SASS","Bootstrap","Figma","Sketch","Adobe XD",
  "Git","Linux","Bash","PowerShell","REST APIs","GraphQL","gRPC","WebSockets",
  "Excel","Power BI","Tableau","Google Analytics","Looker",
  "Machine Learning","Deep Learning","NLP","Computer Vision","Data Analysis","Data Engineering",
  "System Design","Microservices","DevOps","Agile","Scrum","JIRA","Confluence",
];

const INTERESTS_LIST = [
  "Web Development","Mobile Development","Artificial Intelligence","Machine Learning","Data Science",
  "Cloud Computing","DevOps","Cybersecurity","Blockchain","Game Development",
  "UI/UX Design","Product Management","Data Engineering","Full Stack Development",
  "Backend Development","Frontend Development","Embedded Systems","IoT","Robotics",
  "Natural Language Processing","Computer Vision","Data Analytics","Business Intelligence",
  "Software Architecture","Site Reliability Engineering","Quantum Computing",
  "AR/VR Development","API Development","Open Source","Research",
];

const EDUCATION_LIST = [
  // B.Tech / B.E.
  "B.Tech — Computer Science","B.Tech — Information Technology","B.Tech — Electronics & Communication",
  "B.Tech — Electrical Engineering","B.Tech — Mechanical Engineering","B.Tech — Civil Engineering",
  "B.Tech — Data Science","B.Tech — Artificial Intelligence","B.Tech — Biotechnology",
  "B.Tech — Chemical Engineering","B.Tech — Aerospace Engineering","B.Tech — Instrumentation Engineering",
  "B.E. — Computer Engineering","B.E. — Electronics & Telecommunication","B.E. — Mechanical Engineering",
  // B.Sc / B.Com / B.A.
  "B.Sc — Computer Science","B.Sc — Mathematics","B.Sc — Statistics","B.Sc — Physics",
  "B.Sc — Chemistry","B.Sc — Biotechnology","B.Sc — Data Science","B.Sc — Information Technology",
  "B.Com — Computer Applications","B.Com — Accounting","B.A. — Economics","B.A. — Psychology",
  "B.A. — English","B.A. — Journalism & Mass Communication","B.A. — Sociology",
  // BCA / MCA
  "BCA — Computer Applications","MCA — Computer Applications",
  // M.Tech / M.E.
  "M.Tech — Computer Science","M.Tech — Data Science","M.Tech — Artificial Intelligence",
  "M.Tech — Machine Learning","M.Tech — Software Engineering","M.Tech — Cybersecurity",
  "M.Tech — Electronics","M.Tech — VLSI Design","M.Tech — Embedded Systems",
  // M.Sc
  "M.Sc — Computer Science","M.Sc — Data Science","M.Sc — Statistics","M.Sc — Mathematics",
  "M.Sc — Artificial Intelligence","M.Sc — Information Technology",
  // MBA
  "MBA — Technology Management","MBA — Product Management","MBA — Business Analytics",
  "MBA — Finance","MBA — Marketing","MBA — Operations","MBA — Human Resources",
  "MBA — Entrepreneurship","MBA — Digital Marketing",
  // Other degrees
  "B.Design — UX/UI Design","B.Design — Graphic Design","B.Design — Product Design",
  "B.Arch — Architecture","B.Pharm — Pharmacy","MBBS — Medicine","BDS — Dentistry",
  "B.Ed — Education","LL.B — Law","CA — Chartered Accountancy","CFA — Finance",
  // Diploma / Certificate
  "Diploma — Computer Science","Diploma — Information Technology","Diploma — Electronics",
  "Diploma — Mechanical Engineering","Diploma — Civil Engineering","Diploma — Data Science",
  // Non-traditional
  "Self-Taught","Bootcamp Graduate","Online Courses","High School",
  "Associate Degree","Vocational Training","PG Diploma — Data Science",
  "PG Diploma — Business Analytics","PG Diploma — AI/ML",
];

/* ===================== AUTOCOMPLETE COMPONENT ===================== */
function AutocompleteInput({
  value, onChange, placeholder, options, label, error, multiSelect = false,
}: {
  value: string; onChange: (v: string) => void; placeholder: string;
  options: string[]; label: string; error?: string; multiSelect?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const selected = multiSelect ? value.split(",").map(s => s.trim()).filter(Boolean) : [];

  const filtered = options.filter(o =>
    o.toLowerCase().includes(query.toLowerCase()) &&
    (multiSelect ? !selected.includes(o) : true)
  ).slice(0, 10);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        // When clicking outside, if there is a typed query in multiSelect mode, add it
        if (multiSelect && query.trim() && !selected.includes(query.trim())) {
          const newVal = [...selected, query.trim()].join(", ");
          onChange(newVal);
        }
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [query, selected, multiSelect, onChange]);

  const select = (item: string) => {
    if (multiSelect) {
      const newVal = [...selected, item].join(", ");
      onChange(newVal);
      setQuery("");
    } else {
      onChange(item);
      setQuery(item);
      setOpen(false);
    }
  };

  const removeTag = (tag: string) => {
    onChange(selected.filter(s => s !== tag).join(", "));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Enter or comma: add the typed value
    if ((e.key === "Enter" || e.key === ",") && query.trim()) {
      e.preventDefault();
      const val = query.trim().replace(/,$/, "");
      if (val && !selected.includes(val)) {
        if (multiSelect) {
          select(val);
        } else {
          onChange(val);
          setQuery(val);
          setOpen(false);
        }
      }
    }
    // Backspace: remove last tag if query is empty
    if (e.key === "Backspace" && !query && multiSelect && selected.length > 0) {
      removeTag(selected[selected.length - 1]);
    }
  };

  return (
    <div ref={ref} className="relative">
      <label className="mb-3 block text-sm text-gray-400">{label}</label>

      {multiSelect && selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {selected.map(tag => (
            <span key={tag} className="flex items-center gap-1 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs">
              {tag}
              <button type="button" onClick={() => removeTag(tag)} className="hover:text-white ml-1"><X size={10} /></button>
            </span>
          ))}
        </div>
      )}

      <input
        value={query || (!multiSelect ? value : "")}
        onChange={e => { setQuery(e.target.value); setOpen(true); if (!multiSelect) onChange(e.target.value); }}
        onFocus={() => setOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder={selected.length > 0 ? "Add more..." : placeholder}
        className={`h-14 w-full rounded-2xl bg-[#0B1120] px-5 text-white placeholder:text-gray-500 outline-none transition-all duration-300 ${error ? "border border-red-500" : "border border-white/10 focus:border-cyan-400"}`}
      />

      {error && <p className="mt-2 text-sm text-red-400">* {error}</p>}
      {multiSelect && <p className="mt-1 text-xs text-white/30">Press Enter or comma to add a custom value</p>}

      {open && (filtered.length > 0 || query.trim()) && (
        <div className="absolute z-50 mt-1 w-full rounded-2xl border border-white/10 bg-[#0B1120] shadow-2xl overflow-hidden max-h-60 overflow-y-auto">
          {filtered.map(item => (
            <button type="button" key={item} onMouseDown={(e) => { e.preventDefault(); select(item); }}
              className="w-full px-5 py-3 text-left text-sm text-gray-300 hover:bg-white/10 hover:text-white transition">
              {item}
            </button>
          ))}
          {query.trim() && !options.some(o => o.toLowerCase() === query.trim().toLowerCase()) && (
            <button type="button" onMouseDown={(e) => { e.preventDefault(); if (multiSelect) select(query.trim()); else { onChange(query.trim()); setQuery(query.trim()); setOpen(false); } }}
              className="w-full px-5 py-3 text-left text-sm text-cyan-400 hover:bg-cyan-500/10 transition border-t border-white/5">
              ＋ Add "{query.trim()}"
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/* ===================== MAIN ===================== */
export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [name, setName] = useState("");
  const [gmail, setGmail] = useState("");
  const [role, setRole] = useState("");
  const [interests, setInterests] = useState("");
  const [skills, setSkills] = useState("");
  const [education, setEducation] = useState("");
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    const savedName = localStorage.getItem("userName");
    const savedEmail = localStorage.getItem("userEmail");
    if (savedName) setName(savedName);
    if (savedEmail) setGmail(savedEmail);
  }, []);

  const nextStep = () => {
    const newErrors: any = {};

    if (step === 1) {
      if (!name.trim() || name.trim().length < 2) newErrors.name = "Enter your full name (min 2 characters)";
      if (!gmail.trim() || !gmail.includes("@") || !gmail.includes(".")) newErrors.gmail = "Enter a valid email address";
      const roleErr = validateRole(role);
      if (roleErr) newErrors.role = roleErr;
    }

    if (step === 2) {
      const interestsErr = validateInterests(interests);
      if (interestsErr) newErrors.interests = interestsErr;
      const skillsErr = validateSkills(skills);
      if (skillsErr) newErrors.skills = skillsErr;
      const educationErr = validateEducation(education);
      if (educationErr) newErrors.education = educationErr;
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    if (step < 2) {
      setStep(step + 1);
    } else {
      generateRoadmap();
    }
  };

  const generateRoadmap = async () => {
    localStorage.setItem("userName", name);
    localStorage.setItem("userGmail", gmail);
    localStorage.setItem("userRole", role);
    localStorage.setItem("userInterests", interests);
    localStorage.setItem("userSkills", skills);
    localStorage.setItem("userEducation", education);
    trackActivity();

    setLoading(true);

    try {
      const skillsList = skills.split(",").map((s: string) => s.trim()).filter(Boolean);
      const interestsList = interests.split(",").map((s: string) => s.trim()).filter(Boolean);
      const data = await api.onboard({
        name, skills: skillsList, interests: interestsList,
        education, experience_years: 0, preferred_work_style: "remote",
        email: gmail || localStorage.getItem("userEmail") || "",
        role,
      });
      if (data) {
        localStorage.setItem("aiProfile", JSON.stringify(data));
      }
    } catch {}

    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setProgress(current);
      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => { router.push("/dashboard"); }, 400);
      }
    }, 30);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] text-white flex items-center justify-center px-6 py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.2),transparent_55%)]" />
      <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[120px]" />

      <AnimatePresence mode="wait">
        {!loading ? (
          <motion.div key="form" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5 }}
            className="relative w-full max-w-2xl rounded-[32px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-10 shadow-2xl">

            {/* STEPS */}
            <div className="flex gap-2 mb-10">
              {steps.slice(0,2).map((s, i) => {
                const done = step > i + 1;
                const active = step === i + 1;
                return (
                  <div key={s} className="flex-1 flex flex-col gap-1">
                    <div className={`h-1 rounded-full transition-all duration-500 ${done || active ? "bg-gradient-to-r from-purple-500 to-cyan-400" : "bg-white/10"}`} />
                    <span className={`text-xs ${active ? "text-cyan-300" : done ? "text-white/60" : "text-white/30"}`}>{s}</span>
                  </div>
                );
              })}
            </div>

            {/* STEP 1 */}
            {step === 1 && (
              <>
                <h2 className="text-4xl font-black">Let's set up your profile</h2>
                <p className="mt-3 text-gray-400">Tell us about yourself to personalize your experience.</p>

                <div className="mt-10 space-y-6">
                  <div>
                    <label className="mb-3 block text-sm text-gray-400">Full Name</label>
                    <input value={name} onChange={e => { setName(e.target.value); setErrors((prev: any) => ({...prev, name: ""})); }}
                      placeholder="Your full name"
                      className={`h-14 w-full rounded-2xl bg-[#0B1120] px-5 text-white placeholder:text-gray-500 outline-none transition-all ${errors.name ? "border border-red-500" : "border border-white/10 focus:border-cyan-400"}`} />
                    {errors.name && <p className="mt-2 text-sm text-red-400">* {errors.name}</p>}
                  </div>

                  <div>
                    <label className="mb-3 block text-sm text-gray-400">Email Address</label>
                    <input type="email" value={gmail} onChange={e => { setGmail(e.target.value); setErrors((prev: any) => ({...prev, gmail: ""})); }}
                      placeholder="you@example.com"
                      className={`h-14 w-full rounded-2xl bg-[#0B1120] px-5 text-white placeholder:text-gray-500 outline-none transition-all ${errors.gmail ? "border border-red-500" : "border border-white/10 focus:border-cyan-400"}`} />
                    {errors.gmail && <p className="mt-2 text-sm text-red-400">* {errors.gmail}</p>}
                  </div>

                  <div>
                    <label className="mb-3 block text-sm text-gray-400">Target Career</label>
                    <input value={role} onChange={e => { setRole(e.target.value); setErrors((prev: any) => ({...prev, role: ""})); }}
                      placeholder="e.g. Software Engineer, Data Scientist"
                      className={`h-14 w-full rounded-2xl bg-[#0B1120] px-5 text-white placeholder:text-gray-500 outline-none transition-all ${errors.role ? "border border-red-500" : "border border-white/10 focus:border-cyan-400"}`} />
                    {errors.role && <p className="mt-2 text-sm text-red-400">* {errors.role}</p>}
                  </div>

                  <button onClick={nextStep}
                    className="mt-4 flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-semibold transition-all hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(34,211,238,0.35)]">
                    Next <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <>
                <h2 className="text-4xl font-black">Your background</h2>
                <p className="mt-3 text-gray-400">Help us tailor your roadmap and skill gap analysis.</p>

                <div className="mt-10 space-y-6">
                  <AutocompleteInput
                    label="Interests (select all that apply)"
                    value={interests} onChange={v => { setInterests(v); setErrors((prev: any) => ({...prev, interests: ""})); }}
                    placeholder="Search or type your interest..."
                    options={INTERESTS_LIST} error={errors.interests} multiSelect />

                  <AutocompleteInput
                    label="Skills (select all that apply)"
                    value={skills} onChange={v => { setSkills(v); setErrors((prev: any) => ({...prev, skills: ""})); }}
                    placeholder="Search or type a skill..."
                    options={SKILLS_LIST} error={errors.skills} multiSelect />

                  <AutocompleteInput
                    label="Education"
                    value={education} onChange={v => { setEducation(v); setErrors((prev: any) => ({...prev, education: ""})); }}
                    placeholder="Search or type your education..."
                    options={EDUCATION_LIST} error={errors.education} />

                  <button onClick={nextStep}
                    className="mt-4 flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-semibold transition-all hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(34,211,238,0.35)]">
                    Generate My Roadmap <Sparkles className="h-4 w-4" />
                  </button>
                </div>
              </>
            )}
          </motion.div>
        ) : (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="w-full max-w-2xl rounded-[32px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-12 text-center">
            <h2 className="text-4xl font-black">Generating your AI Roadmap</h2>
            <p className="mt-4 text-gray-400">This may take a few seconds...</p>

            <div className="relative mx-auto mt-14 h-56 w-56">
              <div className="absolute inset-0 rounded-full border-[14px] border-purple-500/20" />
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="absolute inset-0 rounded-full border-[14px] border-pink-500 border-t-fuchsia-300 shadow-[0_0_35px_rgba(236,72,153,0.35)]" />
              <div className="absolute inset-8 flex items-center justify-center rounded-full bg-[#050816] text-5xl font-black">
                {progress}%
              </div>
            </div>

            <div className="mx-auto mt-12 max-w-sm rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-left">
              {["Analyzing your profile","Matching best career path","Creating personalized roadmap","Almost done..."].map((item, index) => (
                <motion.div key={item} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.4 }} className="mb-4 flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-400" />
                  <span className="text-gray-300">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
