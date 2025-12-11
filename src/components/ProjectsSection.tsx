"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FolderPlus, FileText, ShieldCheck, Sparkles } from "lucide-react";
import ProjectBuilder from "./ProjectBuilder";
import { projects, type Project } from "@/content/projects";
import { contactChannels } from "@/content/profile";
import SectionHeader from "./SectionHeader";

export default function ProjectsSection() {
  const trustSignals = [
    {
      label: "ICML Paper",
      color: "text-cyan",
      detail: "Evaluated retrieval robustness across 3B+ tokens; cited for safety baselines.",
      icon: <FileText size={16} />,
    },
    {
      label: "USPTO Patent",
      color: "text-amber-300",
      detail: "Filed adaptive orchestration for AI agents that self-verify outputs in production.",
      icon: <ShieldCheck size={16} />,
    },
    {
      label: "NeurIPS Talk",
      color: "text-purple-300",
      detail: "Shared autonomous data quality agents; 1.2k attendees and follow-on collaborations.",
      icon: <Sparkles size={16} />,
    },
  ];

  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [selectedProjects, setSelectedProjects] = useState<Project[]>([]);
  const [builderError, setBuilderError] = useState<string | null>(null);

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

  return (
    <section id="projects" className="py-24 bg-zinc-950 relative overflow-hidden">
      <div className="glow-grid-overlay" />
      <div className="glow-spot" data-color="cyan" data-strength="soft" style={{ top: "15%", right: "16%" }} />
      <div className="glow-spot" data-color="purple" data-strength="soft" style={{ bottom: "12%", left: "12%" }} />
      <ProjectBuilder
        isOpen={isBuilderOpen}
        onClose={() => setIsBuilderOpen(false)}
        projects={selectedProjects}
        onRemoveProject={removeFromBuilder}
        onSubmit={submitInquiry}
      />

      <div className="container mx-auto px-6 relative z-10">
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

        <div className="flex flex-wrap items-center gap-3 mb-10">
          {trustSignals.map((signal) => (
            <div
              key={signal.label}
              className="group relative px-4 py-3 border border-white/10 rounded-full bg-white/5 text-sm flex items-center gap-2"
            >
              <span className={`${signal.color} drop-shadow-md`}>{signal.icon}</span>
              <span className="font-semibold text-white">{signal.label}</span>
              <div className="absolute left-0 right-0 translate-y-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-y-3 transition-all duration-200">
                <div className="text-xs text-gray-300 bg-black/90 border border-white/10 rounded-xl p-3 shadow-xl">
                  {signal.detail}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {projects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20, rotateX: -3 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                className="group relative card-surface glow-card border rounded-xl p-6 hover:border-[color:rgb(var(--glow-cyan-rgb))] transition-all duration-300 hover:shadow-[0_0_40px_rgba(var(--glow-cyan-rgb),0.16)]"
              >
                <div className="mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-[color:rgb(var(--glow-cyan-rgb))] border border-[color:rgb(var(--glow-cyan-rgb)/0.4)] px-2 py-1 rounded bg-[color:rgb(var(--glow-cyan-rgb)/0.05)]">
                    {project.category}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[color:rgb(var(--glow-cyan-rgb))] transition-colors">
                  {project.name}
                </h3>
                <p className="text-white/70 text-sm mb-6">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t) => (
                    <span key={t} className="text-xs text-white/60 bg-white/5 px-2 py-1 rounded border border-white/10">
                      {t}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => addToBuilder(project)}
                  className="w-full py-3 bg-[color:rgb(var(--glow-cyan-rgb)/0.12)] hover:bg-[color:rgb(var(--glow-cyan-rgb))] hover:text-black text-white font-bold uppercase tracking-wider rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FolderPlus size={18} />
                  Select Module
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

