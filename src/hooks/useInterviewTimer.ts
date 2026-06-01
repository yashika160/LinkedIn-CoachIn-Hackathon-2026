"use client";

import { useEffect, useState } from "react";

export default function useInterviewTimer(active: boolean) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (!active) return;

    const interval = setInterval(() => {
      setTime((t) => t + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [active]);

  const reset = () => setTime(0);

  return { time, reset };
}