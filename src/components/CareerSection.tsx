"use client";

import { motion } from "framer-motion";
import { careerMilestones } from "@/content/profile";
import SectionHeader from "./SectionHeader";

export default function CareerSection() {
  return (
    <section id="career" className="py-24 bg-black relative overflow-hidden">
      <div className="container mx-auto px-6">
        <SectionHeader eyebrow="Trajectory" title="Career" highlight="Signals" accent="purple" />
        <p className="text-gray-400 mt-[-8px] mb-8 max-w-2xl">
          A timeline of roles focused on shipping intelligent, data-rich products.
        </p>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-white/10" />
          <div className="space-y-8">
            {careerMilestones.map((item, idx) => (
              <motion.div
                key={`${item.year}-${item.role}`}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="relative pl-16"
              >
                <div className="absolute left-6 top-1.5 w-4 h-4 rounded-full bg-gradient-to-r from-cyan to-purple shadow-[0_0_20px_rgba(0,240,255,0.3)]" />
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono uppercase tracking-widest text-gray-500">{item.year}</span>
                  <h3 className="text-2xl font-bold text-white">{item.role}</h3>
                </div>
                <p className="text-gray-400 mt-2 max-w-2xl">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
