"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function ContributionHeatmap() {
  // Generate dummy data for the heatmap (52 weeks x 7 days)
  const [contributions, setContributions] = useState<number[]>([]);
  const weeks = 52;
  const days = 7;

  useEffect(() => {
    setContributions(Array.from({ length: weeks * days }, () => Math.floor(Math.random() * 5)));
  }, []);

  const getColor = (level: number) => {
    switch (level) {
      case 0: return "bg-white/5";
      case 1: return "bg-cyan/20";
      case 2: return "bg-cyan/40";
      case 3: return "bg-cyan/60";
      case 4: return "bg-cyan";
      default: return "bg-white/5";
    }
  };

  return (
    <div className="relative w-full h-64 md:h-96 bg-black/50 rounded-xl border border-white/10 overflow-hidden flex flex-col items-center justify-center p-6 group">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 bg-[length:20px_20px]" />
      
      {/* Scanning Effect */}
      <motion.div
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-px bg-cyan shadow-[0_0_20px_rgba(0,240,255,0.5)] z-10 pointer-events-none"
      />

      {/* Heatmap Grid */}
      <div className="flex gap-1 transform -skew-x-12 scale-90 md:scale-100">
        {Array.from({ length: weeks }).map((_, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1">
            {Array.from({ length: days }).map((_, dayIndex) => {
              const level = contributions[weekIndex * days + dayIndex];
              return (
                <motion.div
                  key={dayIndex}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: (weekIndex * 0.01) + (dayIndex * 0.01) }}
                  className={`w-2 h-2 md:w-3 md:h-3 rounded-sm ${getColor(level)}`}
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* Tech Overlay */}
      <div className="absolute top-4 left-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs font-mono text-cyan uppercase tracking-widest">System Activity</span>
        </div>
        <h3 className="text-xl font-bold uppercase mt-1">Contribution Graph</h3>
      </div>

      <div className="absolute bottom-4 right-4 text-right">
        <div className="text-xs font-mono text-gray-500">TOTAL COMMITS</div>
        <div className="text-lg font-bold text-cyan">1,248</div>
      </div>
    </div>
  );
}
