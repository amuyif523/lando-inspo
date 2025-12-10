"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import HelmetViewer from "./HelmetViewer";
import { ChevronRight } from "lucide-react";

const helmets = [
  {
    id: 1,
    name: "Season 2024",
    description: "The primary challenger. Neon yellow with carbon fiber accents.",
    color: "#D4F711",
    year: "2024",
  },
  {
    id: 2,
    name: "Miami Special",
    description: "Inspired by the beach vibes and basketball culture.",
    color: "#00A3E0",
    year: "2024",
  },
  {
    id: 3,
    name: "British GP",
    description: "Chrome finish reflecting the Silverstone heritage.",
    color: "#C0C0C0",
    year: "2023",
  },
  {
    id: 4,
    name: "Quadrant Glitch",
    description: "A chaotic mix of neon green and digital noise.",
    color: "#39FF14",
    year: "2023",
  },
];

export default function HelmetGallery() {
  const [selectedHelmet, setSelectedHelmet] = useState(helmets[0]);

  return (
    <section id="helmets" className="py-24 bg-zinc-950 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-1 bg-cyan" />
            <span className="text-cyan font-bold uppercase tracking-widest">
              The Collection
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-white">
            Helmet <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan to-white">Hall of Fame</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          {/* Left: 3D Viewer */}
          <div className="lg:col-span-2 relative">
            <div className="absolute inset-0 bg-linear-to-r from-cyan/5 to-transparent rounded-full blur-3xl" />
            <div className="relative z-10 bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-sm">
              <HelmetViewer color={selectedHelmet.color} />
              
              {/* Overlay Info */}
              <div className="absolute bottom-8 left-8 pointer-events-none">
                <motion.div
                  key={selectedHelmet.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-4xl font-black italic uppercase text-white mb-2">
                    {selectedHelmet.name}
                  </h3>
                  <p className="text-gray-400 max-w-md">
                    {selectedHelmet.description}
                  </p>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Right: Selector List */}
          <div className="flex flex-col gap-4 h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {helmets.map((helmet) => (
              <button
                key={helmet.id}
                onClick={() => setSelectedHelmet(helmet)}
                className={`group relative p-6 rounded-xl border text-left transition-all duration-300 ${
                  selectedHelmet.id === helmet.id
                    ? "bg-white/10 border-cyan"
                    : "bg-black/40 border-white/10 hover:border-white/30"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold uppercase text-gray-500 tracking-widest">
                    {helmet.year}
                  </span>
                  {selectedHelmet.id === helmet.id && (
                    <motion.div
                      layoutId="active-indicator"
                      className="w-2 h-2 rounded-full bg-cyan"
                    />
                  )}
                </div>
                <h4 className={`text-xl font-bold uppercase mb-1 ${
                  selectedHelmet.id === helmet.id ? "text-white" : "text-gray-400 group-hover:text-white"
                }`}>
                  {helmet.name}
                </h4>
                <div className="flex items-center gap-2 text-sm text-cyan opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>View Model</span>
                  <ChevronRight size={14} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


