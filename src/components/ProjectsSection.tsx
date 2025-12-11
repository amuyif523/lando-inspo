"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FolderPlus } from "lucide-react";
import ProjectBuilder from "./ProjectBuilder";
import { projects, type Project } from "@/content/projects";
import { contactChannels } from "@/content/profile";
import SectionHeader from "./SectionHeader";
import { holoSheenVariants, holoTileVariants } from "@/lib/motionTokens";
import { useMotionSettings } from "./MotionProvider";

export default function ProjectsSection() {
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [selectedProjects, setSelectedProjects] = useState<Project[]>([]);
  const [builderError, setBuilderError] = useState<string | null>(null);
  const { isReducedMotion } = useMotionSettings();

  const addToBuilder = (project: Project) => {
    if (!selectedProjects.find(p => p.id === project.id)) {
      setSelectedProjects([...selectedProjects, project]);
    }
    setIsBuilderOpen(true);
  };

  const removeFromBuilder = (id: number) => {
    setSelectedProjects(selectedProjects.filter((p) => p.id !== id));
  };

  const submitInquiry = async ({ email, message, modules }: { email: string; message: string; modules: string[] }) => {
    setBuilderError(null);
    const body = {
      name: email, // using email as identifier here; main form collects name separately
      email,
      message,
      modules,
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setBuilderError(data.error || "Unable to send inquiry. Please try again.");
      throw new Error(data.error || "Unable to send inquiry.");
    }
  };

  const hoverState = isReducedMotion ? undefined : "hover";
  const tapState = isReducedMotion ? undefined : { scale: 0.98 };

  return (
    <section id="projects" className="py-24 bg-zinc-950 relative">
      <ProjectBuilder
        isOpen={isBuilderOpen}
        onClose={() => setIsBuilderOpen(false)}
        projects={selectedProjects}
        onRemoveProject={removeFromBuilder}
        onSubmit={submitInquiry}
      />

      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <SectionHeader eyebrow="Arsenal" title="Project" highlight="Modules" accent="white" />

          <button
            onClick={() => setIsBuilderOpen(true)}
            className="relative bg-white/10 hover:bg-white/20 p-4 rounded-full transition-colors"
          >
            <FolderPlus className="text-white" />
            {selectedProjects.length > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-cyan rounded-full flex items-center justify-center text-[10px] font-bold text-black">
                {selectedProjects.length}
              </div>
            )}
          </button>
        </div>

        {builderError && (
          <div className="mb-6 text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg p-3">
            {builderError} — try the contact form or email {contactChannels[0].display}.
          </div>
        )}

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group relative bg-white/5 border border-white/10 rounded-xl p-6 transition-all duration-300 overflow-hidden"
              variants={isReducedMotion ? undefined : holoTileVariants}
              initial={isReducedMotion ? undefined : "hidden"}
              whileInView={isReducedMotion ? undefined : "visible"}
              viewport={isReducedMotion ? undefined : { once: true, amount: 0.3 }}
              custom={index}
              whileHover={hoverState}
              whileTap={tapState}
            >
              <motion.div
                className="absolute inset-0 bg-linear-to-r from-cyan/5 via-white/10 to-purple/10 opacity-0 pointer-events-none"
                variants={holoSheenVariants}
                initial="rest"
                animate="rest"
              />
              <div className="relative z-10">
                <div className="mb-4">
                  <span className="text-xs font-bold uppercase text-cyan tracking-widest border border-cyan/20 px-2 py-1 rounded">
                    {project.category}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan transition-colors">
                  {project.name}
                </h3>
                <p className="text-gray-400 text-sm mb-6">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t) => (
                    <span key={t} className="text-xs text-gray-500 bg-black/30 px-2 py-1 rounded">
                      {t}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => addToBuilder(project)}
                  className="w-full py-3 bg-white/10 hover:bg-cyan hover:text-black text-white font-bold uppercase tracking-wider rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FolderPlus size={18} />
                  Select Module
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

