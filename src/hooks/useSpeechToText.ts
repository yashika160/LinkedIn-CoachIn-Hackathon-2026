"use client";

import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

export default function useSpeechToText() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true });

  const stopListening = SpeechRecognition.stopListening;

  return {
    transcript,
    listening,
    resetTranscript,
    startListening,
    stopListening,
    browserSupportsSpeechRecognition,
  };
}