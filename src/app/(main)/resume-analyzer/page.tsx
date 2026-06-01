"use client";
import { trackActivity } from "@/lib/activity";
import { useRef, useState, useEffect } from "react";
import { FileText, Sparkles, Brain, TrendingUp, AlertTriangle, CheckCircle2, Upload, Loader2, X } from "lucide-react";
import { api } from "@/lib/api";

declare global {
  interface Window { pdfjsLib: any; mammoth: any; }
}

export default function ResumeAnalyzerPage() {
  const [resumeText, setResumeText] = useState("");
  const [role, setRole] = useState("Software Engineer");
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const [extracting, setExtracting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedRole = localStorage.getItem("userRole");
    if (savedRole) setRole(savedRole);
  }, []);

  const extractTextFromPDF = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const { pdfjsLib } = window;
          if (!pdfjsLib) { reject(new Error("PDF.js not loaded")); return; }
          const typedArray = new Uint8Array(e.target?.result as ArrayBuffer);
          const pdf = await pdfjsLib.getDocument(typedArray).promise;
          let text = "";
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            text += content.items.map((item: any) => item.str).join(" ") + "\n";
          }
          resolve(text);
        } catch (err) { reject(err); }
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const extractTextFromDOCX = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          // Use mammoth.js via CDN if available, else fallback to basic extraction
          if (window.mammoth) {
            const result = await window.mammoth.extractRawText({ arrayBuffer: e.target?.result });
            resolve(result.value);
          } else {
            // mammoth.js failed to load — ask user to paste manually
            resolve("");
          }
        } catch (err) { reject(err); }
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setExtracting(true);
    setError("");
    try {
      const ext = file.name.split(".").pop()?.toLowerCase();
      if (ext === "txt" || ext === "md") {
        const reader = new FileReader();
        reader.onload = (ev) => { setResumeText(ev.target?.result as string || ""); setExtracting(false); };
        reader.readAsText(file);
        return;
      }
      if (ext === "pdf") {
        // Load PDF.js dynamically
        if (!window.pdfjsLib) {
          await new Promise<void>((res, rej) => {
            const s = document.createElement("script");
            s.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
            s.onload = () => {
              window.pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
              res();
            };
            s.onerror = rej;
            document.head.appendChild(s);
          });
        }
        const text = await extractTextFromPDF(file);
        // Basic sanity check: if extracted text looks like binary garbage, warn user
        const alphanumRatio = (text.match(/[a-zA-Z0-9 ]/g) || []).length / Math.max(text.length, 1);
        if (text.trim().length < 50 || alphanumRatio < 0.3) {
          setError("Could not extract readable text from this PDF. It may be a scanned image. Please paste your resume text manually.");
          setFileName("");
          setExtracting(false);
          return;
        }
        setResumeText(text);
        setExtracting(false);
        return;
      }
      if (ext === "docx") {
        // Load mammoth.js dynamically
        if (!window.mammoth) {
          await new Promise<void>((res, rej) => {
            const s = document.createElement("script");
            s.src = "https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js";
            s.onload = () => res();
            s.onerror = rej;
            document.head.appendChild(s);
          });
        }
        const text = await extractTextFromDOCX(file);
        if (!text || text.trim().length < 50) {
          setError("Could not extract text from this DOCX file. Please paste your resume text manually.");
          setFileName("");
          setExtracting(false);
          return;
        }
        setResumeText(text);
        setExtracting(false);
        return;
      }
      setError("Unsupported file type. Please upload .txt, .pdf, or .docx");
    } catch {
      setError("Failed to extract text from file. Please paste your resume text manually.");
    }
    setExtracting(false);
  };

  const handleAnalyze = async () => {
    if (!resumeText.trim()) { setError("Please upload or paste your resume text."); return; }
    setError("");
    setLoading(true);
    try {
      const res = await api.resume({ resume_text: resumeText, target_career: role });
      if (res.error) { setError(res.message || "The uploaded content does not appear to be a resume."); setLoading(false); return; }
      setAnalysis(res);
      trackActivity("resume");
      localStorage.setItem("resumeAnalyzed", "true");
    } catch { setError("Failed to analyze. Make sure the backend is running."); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#070A12] text-white px-6 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.35),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.12),transparent_45%)]" />

      <div className="relative max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/10">
            <Sparkles className="w-4 h-4 text-purple-300" />
            <span className="text-sm text-purple-200">AI Resume Intelligence Engine</span>
          </div>
          <h1 className="text-5xl font-black mt-4">Resume <span className="text-purple-400">Analyzer</span></h1>
          <p className="text-white/60 mt-3">Upload PDF, DOCX, or paste resume → Select role → Get AI ATS score & insights</p>
        </div>

        <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl space-y-5">
          <div>
            <label className="text-white/60 text-sm">Target Role</label>
            <input value={role} onChange={e => setRole(e.target.value)}
              placeholder="e.g. Software Engineer, Data Scientist"
              className="w-full mt-2 p-3 rounded-xl bg-black/30 border border-white/10 text-white outline-none focus:border-purple-500/50" />
          </div>

          <div>
            <label className="text-white/60 text-sm">Upload Resume</label>
            <div className="border-2 border-dashed border-white/10 rounded-xl p-6 mt-2 text-center cursor-pointer hover:border-purple-500/40 transition"
              onClick={() => fileRef.current?.click()}>
              {extracting ? (
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="animate-spin text-purple-400 w-6 h-6" />
                  <p className="text-sm text-white/50">Extracting text from {fileName}...</p>
                </div>
              ) : fileName ? (
                <div className="flex items-center justify-center gap-3">
                  <FileText className="text-green-400 w-5 h-5" />
                  <span className="text-sm text-green-300">{fileName} — text extracted</span>
                  <button onClick={(e) => { e.stopPropagation(); setFileName(""); setResumeText(""); }}
                    className="text-white/30 hover:text-white"><X size={14} /></button>
                </div>
              ) : (
                <>
                  <Upload className="mx-auto mb-2 text-purple-400" />
                  <p className="text-sm text-white/50">Click to upload</p>
                  <p className="text-xs text-white/30 mt-1">Supports .pdf, .docx, .txt, .md</p>
                </>
              )}
              <input ref={fileRef} type="file" accept=".txt,.md,.pdf,.docx" onChange={handleFile} className="hidden" />
            </div>
          </div>

          <div>
            <label className="text-white/60 text-sm">Or paste resume text</label>
            <textarea value={resumeText} onChange={(e) => setResumeText(e.target.value)}
              rows={8} placeholder="Paste your resume text here..."
              className="w-full mt-2 p-3 rounded-xl bg-black/30 border border-white/10 text-white text-sm resize-none outline-none focus:border-purple-500/50" />
          </div>

          {error && <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">{error}</p>}

          <button onClick={handleAnalyze} disabled={loading || extracting}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 font-semibold disabled:opacity-40 flex items-center justify-center gap-2">
            {loading ? <><Loader2 className="animate-spin w-4 h-4" /> Analyzing...</> : "Analyze Resume with AI"}
          </button>
        </div>

        {analysis && (
          <div className="mt-10 space-y-6">
            <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.03] text-center">
              <Brain className="mx-auto text-purple-400 w-10 h-10 mb-2" />
              <h2 className="text-5xl font-black text-purple-400">{analysis.overall_score}%</h2>
              <p className="text-white/60 mt-1">ATS Score — Grade: {analysis.grade}</p>
              <p className="text-sm text-white/40 mt-1">ATS Keyword Score: {analysis.ats_score}%</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl border border-green-500/20 bg-green-500/10">
                <div className="flex items-center gap-2 mb-3"><CheckCircle2 className="text-green-400" /><h3 className="font-bold text-green-300">Strengths</h3></div>
                {analysis.strengths?.map((p: string, i: number) => <p key={i} className="text-white/70 text-sm">• {p}</p>)}
              </div>
              <div className="p-6 rounded-2xl border border-red-500/20 bg-red-500/10">
                <div className="flex items-center gap-2 mb-3"><AlertTriangle className="text-red-400" /><h3 className="font-bold text-red-300">Improvements</h3></div>
                {analysis.improvements?.map((c: any, i: number) => <p key={i} className="text-white/70 text-sm">• {typeof c === "string" ? c : c.issue}</p>)}
              </div>
              <div className="p-6 rounded-2xl border border-yellow-500/20 bg-yellow-500/10">
                <div className="flex items-center gap-2 mb-3"><TrendingUp className="text-yellow-300" /><h3 className="font-bold text-yellow-300">Missing Keywords</h3></div>
                {analysis.keywords_missing?.map((m: string, i: number) => <p key={i} className="text-white/70 text-sm">• {m}</p>)}
              </div>
            </div>
            {analysis.ats_keywords_to_add?.length > 0 && (
              <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.03]">
                <h3 className="text-purple-300 font-bold mb-3">🚀 Keywords to Add for Better ATS</h3>
                <div className="flex flex-wrap gap-2">
                  {analysis.ats_keywords_to_add.map((kw: string, i: number) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs">{kw}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
