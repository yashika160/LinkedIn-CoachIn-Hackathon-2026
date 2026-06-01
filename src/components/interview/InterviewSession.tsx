"use client";

import { useEffect, useRef, useState } from "react";
import { Mic, MicOff, Timer } from "lucide-react";
import AIAvatar from "./AIAvatar";
import VoiceWave from "./VoiceWave";

export default function InterviewSession({
  question,
  current,
  total,
  answer,
  setAnswer,
  nextQuestion,
  duration,
}: any) {

  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  const recognitionRef = useRef<any>(null);
  const finalTranscriptRef = useRef("");

  const [time, setTime] = useState(duration * 60);

  // ⏱ TIMER (FIXED - runs once)
  useEffect(() => {
    const t = setInterval(() => {
      setTime((p) => (p > 0 ? p - 1 : 0));
    }, 1000);

    return () => clearInterval(t);
  }, []);

  const format = (s: number) =>
    `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  // 🔊 TEXT TO SPEECH (AI ASKING QUESTION)
  useEffect(() => {
    speechSynthesis.cancel();

    const u = new SpeechSynthesisUtterance(question);
    u.rate = 1;

    u.onstart = () => setSpeaking(true);
    u.onend = () => setSpeaking(false);

    speechSynthesis.speak(u);

    return () => speechSynthesis.cancel();
  }, [question]);

  // 🎤 START RECORDING (FIXED STABLE VERSION)
  const start = () => {
    const SR =
      (window as any).webkitSpeechRecognition ||
      (window as any).SpeechRecognition;

    if (!SR) return alert("Speech Recognition not supported");

    const rec = new SR();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = "en-US";

    finalTranscriptRef.current = "";

    rec.onresult = (event: any) => {
      let interim = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          finalTranscriptRef.current += transcript + " ";
        } else {
          interim += transcript;
        }
      }

      setAnswer(finalTranscriptRef.current + interim);
    };

    rec.onerror = () => setListening(false);
    rec.onend = () => setListening(false);

    rec.start();
    recognitionRef.current = rec;
    setListening(true);
  };

  // 🛑 STOP RECORDING
  const stop = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

  // 🚀 SUBMIT ANSWER (LOCK ANSWER PER QUESTION)
  const submit = () => {
    stop();

    if (!answer.trim()) {
      alert("Please give an answer");
      return;
    }

    nextQuestion();
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">

      {/* LEFT PANEL */}
      <div className="bg-black/5 dark:bg-black/5 dark:bg-white/5 p-8 rounded-3xl border border-border">

        {/* TOP BAR */}
        <div className="flex justify-between">
          <h2 className="text-xl font-bold">AI Interviewer</h2>

          <div className="flex gap-3">
            <div className="px-3 py-1 bg-red-500/10 rounded-full flex items-center gap-2">
              <Timer className="w-4 h-4" />
              {format(time)}
            </div>

            <div className="px-3 py-1 bg-purple-500/10 rounded-full">
              {current}/{total}
            </div>
          </div>
        </div>

        {/* AI AVATAR */}
        <div className="mt-6 flex justify-center">
          <AIAvatar />
        </div>

        {/* 🔥 VoiceWave ONLY when speaking or listening */}
        <div className="mt-6 flex justify-center">
          {(listening || speaking) && <VoiceWave />}
        </div>

        <p className="text-center mt-3 text-cyan-600 dark:text-cyan-300">
          {speaking ? "AI is speaking..." : listening ? "Listening..." : "Ready"}
        </p>

        {/* QUESTION */}
        <div className="mt-6 p-4 bg-black/5 dark:bg-black/5 dark:bg-white/5 rounded-xl">
          {question}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="bg-black/5 dark:bg-black/5 dark:bg-white/5 p-8 rounded-3xl border border-border">

        <textarea
          className="w-full h-64 p-4 bg-black/5 dark:bg-black/30 rounded-xl outline-none"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Speak or type your answer..."
        />

        <div className="flex gap-3 mt-4">

          {!listening ? (
            <button
              onClick={start}
              className="px-4 py-2 bg-purple-600 rounded-xl flex items-center gap-2"
            >
              <Mic size={18} /> Record
            </button>
          ) : (
            <button
              onClick={stop}
              className="px-4 py-2 bg-red-600 rounded-xl flex items-center gap-2"
            >
              <MicOff size={18} /> Stop
            </button>
          )}

          <button
            onClick={submit}
            className="px-4 py-2 bg-cyan-600 rounded-xl"
          >
            Submit
          </button>

        </div>
      </div>
    </div>
  );
}