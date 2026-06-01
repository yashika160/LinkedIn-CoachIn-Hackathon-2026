"use client";

import { useState } from "react";

export default function ChatWindow() {
  const [messages] = useState([
    { role: "ai", text: "Hello! I’m your AI Mentor. What do you want to learn today?" },
    { role: "user", text: "I want to become a Full Stack Developer." },
    { role: "ai", text: "Great! Focus on React, Node.js, and System Design." },
  ]);

  return (
    <div className="glass flex flex-col rounded-3xl p-6 h-[600px]">

      <div className="flex-1 space-y-4 overflow-y-auto">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[80%] rounded-2xl p-4 ${
              msg.role === "user"
                ? "ml-auto bg-purple-600"
                : "bg-black/10 dark:bg-white/10"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-3">
        <input
          placeholder="Ask your AI mentor..."
          className="flex-1 rounded-2xl bg-black/5 dark:bg-black/5 dark:bg-white/5 px-4 py-3 outline-none"
        />

        <button className="rounded-2xl bg-cyan-500 px-6 font-semibold text-black">
          Send
        </button>
      </div>
    </div>
  );
}