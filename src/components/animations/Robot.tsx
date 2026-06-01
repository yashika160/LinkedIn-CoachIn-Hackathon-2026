"use client";

import { motion } from "framer-motion";
import { Bot } from "lucide-react";

export default function Robot() {
  return (
    <div className="relative flex items-center justify-center">
      {/* glow */}
      <div className="absolute w-[250px] h-[250px] bg-purple-500/30 blur-3xl rounded-full" />

      {/* floating robot */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] flex items-center justify-center"
      >
        <div className="relative w-52 h-52 md:w-72 md:h-72 rounded-full border border-purple-500/30 bg-black/5 dark:bg-black/5 dark:bg-white/5 backdrop-blur-xl flex items-center justify-center">
          <Bot className="w-28 h-28 md:w-40 md:h-40 text-purple-600 dark:text-purple-300" />
        </div>
      </motion.div>
    </div>
  );
}
