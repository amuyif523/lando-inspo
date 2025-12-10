"use client";

import { motion } from "framer-motion";
import { skillGroups, profile } from "@/content/profile";

export default function SkillsSection() {
  return (
    <section id="skills" className="py-24 bg-black relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-1 bg-cyan" />
            <span className="text-cyan font-bold uppercase tracking-widest">
              Capabilities
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter display-font bg-clip-text text-transparent bg-[var(--gradient-accent)]">
            Skills & Systems
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl">
            {profile.tagline}
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillGroups.map((group, idx) => (
            <motion.div
              key={group.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white/5 border border-white/10 rounded-xl p-6 h-full flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold uppercase text-white">{group.name}</h3>
                <span className="text-xs text-cyan/80 border border-cyan/20 px-2 py-1 rounded-full">
                  {group.items.length} items
                </span>
              </div>
              <p className="text-gray-400 text-sm">{group.summary}</p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="text-xs bg-black/40 border border-white/10 px-2 py-1 rounded text-gray-300">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
