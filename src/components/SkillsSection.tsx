"use client";

import { motion } from "framer-motion";
import { skillGroups, profile } from "@/content/profile";
import SectionHeader from "./SectionHeader";
import CyberCard from "./CyberCard";

export default function SkillsSection() {
  return (
    <section id="skills" className="py-24 bg-black relative overflow-hidden">
      <div className="container mx-auto px-6">
        <SectionHeader eyebrow="Capabilities" title="Skills" highlight="& Systems" accent="cyan" />
        <p className="text-gray-400 mt-[-8px] mb-8 max-w-2xl">
          {profile.tagline}
        </p>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillGroups.map((group, idx) => (
            <CyberCard
              key={group.name}
              hoverEffect
              delay={idx * 0.05}
              className="h-full flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold uppercase text-white font-display">{group.name}</h3>
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
            </CyberCard>
          ))}
        </div>
      </div>
    </section>
  );
}
