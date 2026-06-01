"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  FileText,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  BarChart3,
} from "lucide-react";

export default function ResumeAnalyzerCard() {
  const [file, setFile] = useState<File | null>(null);
  const [analyzed, setAnalyzed] = useState(false);
  const [loading, setLoading] = useState(false);

  const result = {
    score: 84,
    ats: 79,
    strengths: [
      "Strong DSA knowledge",
      "Good Python & ML basics",
      "Multiple projects present",
    ],
    weaknesses: [
      "Missing cloud skills (AWS/GCP)",
      "Weak system design depth",
      "Low ATS keyword density",
    ],
  };

  const handleAnalyze = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setAnalyzed(true);
    }, 1200);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      {/* LEFT - UPLOAD */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="bg-black/5 dark:bg-black/5 dark:bg-white/5 border border-border backdrop-blur-xl rounded-2xl p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Upload className="text-purple-600 dark:text-purple-400" size={18} />
          <h2 className="font-semibold">Upload Resume</h2>
        </div>

        <div className="border border-dashed border-white/20 rounded-xl p-6 text-center">

          <FileText className="mx-auto text-muted-foreground mb-3" />

          <p className="text-sm text-muted-foreground">
            Drag & drop or select PDF file
          </p>

          <input
            type="file"
            className="mt-4 text-sm"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                setFile(e.target.files[0]);
              }
            }}
          />

          {file && (
            <p className="mt-3 text-xs text-green-600 dark:text-green-400">
              Selected: {file.name}
            </p>
          )}

          <button
            onClick={handleAnalyze}
            disabled={!file || loading}
            className="mt-5 w-full px-4 py-2 rounded-xl bg-purple-500/20 border border-purple-500/30 hover:bg-purple-500/30 transition disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Analyze Resume"}
          </button>
        </div>
      </motion.div>

      {/* CENTER - SCORE */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="bg-black/5 dark:bg-black/5 dark:bg-white/5 border border-border backdrop-blur-xl rounded-2xl p-6 flex flex-col items-center justify-center"
      >
        <Sparkles className="text-purple-600 dark:text-purple-400 mb-3" />

        <h2 className="text-lg font-semibold mb-4">ATS Score</h2>

        <div className="relative w-36 h-36 rounded-full border-4 border-purple-500/30 flex items-center justify-center shadow-[0_0_25px_rgba(168,85,247,0.2)]">

          <span className="text-4xl font-bold">
            {analyzed ? result.score : "--"}
          </span>

          <span className="absolute bottom-3 text-xs text-muted-foreground">
            /100
          </span>
        </div>

        <p className="text-sm text-muted-foreground mt-4 text-center">
          AI evaluates structure, keywords & ATS compatibility
        </p>
      </motion.div>

      {/* RIGHT - INSIGHTS */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="bg-black/5 dark:bg-black/5 dark:bg-white/5 border border-border backdrop-blur-xl rounded-2xl p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="text-purple-600 dark:text-purple-400" size={18} />
          <h2 className="font-semibold">AI Insights</h2>
        </div>

        {!analyzed ? (
          <p className="text-muted-foreground text-sm">
            Upload and analyze your resume to get AI feedback.
          </p>
        ) : (
          <>
            {/* ATS */}
            <div className="mb-4 text-sm text-muted-foreground">
              ATS Match:{" "}
              <span className="text-purple-600 dark:text-purple-300">{result.ats}%</span>
            </div>

            {/* STRENGTHS */}
            <div className="mb-5">
              <h3 className="text-green-600 dark:text-green-400 flex items-center gap-1 mb-2">
                <CheckCircle2 size={16} /> Strengths
              </h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                {result.strengths.map((s, i) => (
                  <li key={i}>• {s}</li>
                ))}
              </ul>
            </div>

            {/* WEAKNESSES */}
            <div>
              <h3 className="text-red-600 dark:text-red-400 flex items-center gap-1 mb-2">
                <AlertCircle size={16} /> Improvements
              </h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                {result.weaknesses.map((w, i) => (
                  <li key={i}>• {w}</li>
                ))}
              </ul>
            </div>
          </>
        )}
      </motion.div>

    </div>
  );
}