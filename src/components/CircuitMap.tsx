"use client";

import { motion } from "framer-motion";

export default function CircuitMap({ circuitName }: { circuitName: string }) {
  return (
    <div className="relative w-full h-64 md:h-96 bg-white/5 rounded-xl border border-white/10 overflow-hidden flex items-center justify-center group">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 bg-[length:20px_20px]" />
      
      {/* Scanning Effect */}
      <motion.div
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-px bg-cyan shadow-[0_0_20px_rgba(212,247,17,0.5)] z-10"
      />

      {/* Placeholder Track (Abstract Shape) */}
      <svg viewBox="0 0 200 200" className="w-2/3 h-2/3 stroke-white/20 stroke-2 fill-none drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
        <path d="M40,100 C40,60 60,40 100,40 C140,40 160,60 160,100 C160,140 140,160 100,160 C60,160 40,140 40,100 Z" />
        <motion.path
          d="M40,100 C40,60 60,40 100,40 C140,40 160,60 160,100 C160,140 140,160 100,160 C60,160 40,140 40,100 Z"
          className="stroke-cyan stroke-3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>

      {/* Tech Overlay */}
      <div className="absolute top-4 left-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="text-xs font-mono text-cyan uppercase tracking-widest">Live Telemetry</span>
        </div>
        <h3 className="text-xl font-bold uppercase mt-1">{circuitName}</h3>
      </div>

      <div className="absolute bottom-4 right-4 text-right">
        <div className="text-xs font-mono text-gray-500">TRACK TEMP</div>
        <div className="text-lg font-bold">32°C</div>
      </div>
    </div>
  );
}


