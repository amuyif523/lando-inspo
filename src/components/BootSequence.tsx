"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface BootSequenceProps {
  onComplete: () => void;
}

const BOOT_SEQUENCE = [
  "INITIALIZING KERNEL...",
  "LOADING NEURAL MODULES...",
  "CONNECTING TO MAIN FRAME...",
  "OPTIMIZING NEURAL PATHWAYS...",
  "ACCESS GRANTED.",
  "WELCOME, AMANUEL.",
];

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    let delay = 0;
    let mounted = true;

    const timeouts: NodeJS.Timeout[] = [];

    BOOT_SEQUENCE.forEach((line, index) => {
      delay += Math.random() * 400 + 100;
      const timeout = setTimeout(() => {
        if (mounted) {
          setLines(prev => [...prev, line]);
          if (index === BOOT_SEQUENCE.length - 1) {
            setTimeout(onComplete, 1000);
          }
        }
      }, delay);
      timeouts.push(timeout);
    });

    return () => {
      mounted = false;
      timeouts.forEach(clearTimeout);
    };
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center font-mono text-cyan"
    >
      <div className="w-full max-w-md p-6 border border-cyan/20 rounded-lg bg-black/90 backdrop-blur-xl shadow-[0_0_50px_rgba(0,240,255,0.1)]">
        <div className="flex items-center justify-between mb-4 border-b border-cyan/20 pb-2">
          <span className="text-xs text-gray-500">TERMINAL v2.0.4</span>
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/20" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
            <div className="w-3 h-3 rounded-full bg-green-500/20" />
          </div>
        </div>
        <div className="h-64 overflow-y-auto font-mono text-sm">
          {lines.map((line, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-2"
            >
              <span className="text-purple mr-2">➜</span>
              {line}
            </motion.div>
          ))}
          <motion.div 
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="inline-block w-2 h-4 bg-cyan ml-2 align-middle"
          />
        </div>
      </div>
    </motion.div>
  );
}
