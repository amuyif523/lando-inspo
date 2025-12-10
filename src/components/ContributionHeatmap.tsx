"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState, useEffect } from "react";
import { fetchContributionData, type ContributionHeatmap as ContributionData } from "@/lib/data";

export default function ContributionHeatmap() {
  const weeks = 52;
  const days = 7;
  const [data, setData] = useState<ContributionData | null>(null);
  const [loading, setLoading] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    let mounted = true;
    fetchContributionData().then((result) => {
      if (mounted) {
        setData(result);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
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
      {!prefersReducedMotion && (
        <motion.div
          animate={{ top: ["0%", "100%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-px bg-cyan shadow-[0_0_20px_rgba(0,240,255,0.5)] z-10 pointer-events-none"
        />
      )}

      {/* Heatmap Grid */}
      <div className="flex gap-1 transform -skew-x-12 scale-90 md:scale-100">
        {Array.from({ length: weeks }).map((_, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1">
            {Array.from({ length: days }).map((_, dayIndex) => {
              const level = data?.days[weekIndex * days + dayIndex] ?? 0;
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
        {loading ? (
          <p className="text-xs text-gray-500 mt-2">Loading contributions...</p>
        ) : (
          <p className="text-xs text-gray-500 mt-2">
            Streak: <span className="text-cyan font-semibold">{data?.streak ?? 0} days</span>
          </p>
        )}
      </div>

      <div className="absolute bottom-4 right-4 text-right">
        <div className="text-xs font-mono text-gray-500">TOTAL COMMITS</div>
        <div className="text-lg font-bold text-cyan">
          {loading ? "…" : data?.total ?? "—"}
        </div>
      </div>
    </div>
  );
}
