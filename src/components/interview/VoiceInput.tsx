"use client";

import { Mic, Square } from "lucide-react";
import useSpeechToText from "@/hooks/useSpeechToText";
import VoiceWave from "./VoiceWave";
import { useEffect } from "react";

export default function VoiceInput({ value, setValue }: any) {
  const {
    transcript,
    listening,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechToText();

  useEffect(() => {
    setValue(transcript);
  }, [transcript]);

  return (
    <div className="space-y-4">

      {/* 🔥 VISUAL WAVE (only when speaking) */}
      {listening && (
        <div className="flex justify-center">
          <VoiceWave />
        </div>
      )}

      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full h-40 p-4 rounded-xl bg-[#0E1320] border border-border"
        placeholder="Speak or type your answer..."
      />

      <div className="flex gap-3">
        <button
          onClick={startListening}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 rounded-lg"
        >
          <Mic size={16} /> Speak
        </button>

        <button
          onClick={stopListening}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 rounded-lg"
        >
          <Square size={16} /> Stop
        </button>

        <button
          onClick={() => {
            resetTranscript();
            setValue("");
          }}
          className="px-4 py-2 bg-gray-700 rounded-lg"
        >
          Clear
        </button>
      </div>

      {listening && (
        <p className="text-green-600 dark:text-green-400 text-sm animate-pulse text-center">
          🎤 Listening...
        </p>
      )}
    </div>
  );
}