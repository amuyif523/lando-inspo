"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function CyberpunkProfile() {
  return (
    <div 
      className="relative w-full max-w-lg aspect-square md:aspect-4/5 group"
    >
      {/* 1. Back Glow */}
      <div className="absolute inset-0 bg-linear-to-tr from-cyan/30 to-purple/30 rounded-xl blur-2xl -z-10 transition-opacity duration-500 opacity-50 group-hover:opacity-80" />

      {/* 2. Main Container with Tech Border */}
      <div className="relative w-full h-full bg-black/80 rounded-xl overflow-hidden border border-white/10 backdrop-blur-sm">
        
        {/* Image Layer */}
        <div className="relative w-full h-full transition-all duration-700 filter grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100">
          <Image 
            src="/amanuel.png" 
            alt="Amanuel Fikremariam" 
            fill
            className="object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700"
            priority
          />
          
          {/* Color Tint Overlay (Cyan/Purple) - Fades out on hover */}
          <div className="absolute inset-0 bg-linear-to-tr from-cyan/20 to-purple/20 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-0" />
        </div>

        {/* 3. Scanline Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 bg-size-[100%_4px,6px_100%] pointer-events-none opacity-60" />

        {/* 4. HUD Elements */}
        {/* Scanning Line */}
        <motion.div 
          animate={{ top: ["0%", "100%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-px bg-cyan/50 shadow-[0_0_10px_rgba(0,240,255,0.8)] z-30 pointer-events-none"
        />

        {/* Corner Brackets */}
        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-cyan z-30" />
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-cyan z-30" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-cyan z-30" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-cyan z-30" />

        {/* Data Tags */}
        <div className="absolute bottom-8 left-8 z-30 font-mono text-xs text-cyan/80 tracking-widest">
          <div className="flex flex-col gap-1">
            <span className="bg-cyan/10 px-2 py-1">ID: AF-2025</span>
            <span className="bg-cyan/10 px-2 py-1">ROLE: ARCHITECT</span>
          </div>
        </div>

        <div className="absolute top-8 right-8 z-30 font-mono text-xs text-purple/80 tracking-widest text-right">
           <span className="bg-purple/10 px-2 py-1 animate-pulse">SYSTEM: ONLINE</span>
        </div>

        {/* Glitch Overlay (Optional - subtle noise) */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-40 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>
    </div>
  );
}