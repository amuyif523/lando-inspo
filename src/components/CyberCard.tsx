"use client";

import { ReactNode } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";

interface CyberCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  delay?: number;
}

export default function CyberCard({ children, className, hoverEffect = false, delay = 0 }: CyberCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className={clsx(
        "relative overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6",
        hoverEffect && "group hover:border-cyan/50 hover:bg-white/10 transition-all duration-300",
        className
      )}
    >
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 group-hover:border-cyan/50 transition-colors" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 group-hover:border-cyan/50 transition-colors" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 group-hover:border-cyan/50 transition-colors" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 group-hover:border-cyan/50 transition-colors" />

      {/* Scanline (Optional, only on hover) */}
      {hoverEffect && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan/5 to-transparent opacity-0 group-hover:opacity-100 translate-y-[-100%] group-hover:translate-y-[100%] transition-all duration-1000 pointer-events-none" />
      )}

      {children}
    </motion.div>
  );
}
