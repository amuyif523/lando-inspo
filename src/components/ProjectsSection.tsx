"use client";

import { useState } from "react";
import { FolderPlus, FileText, ShieldCheck, Sparkles, ArrowUpRight } from "lucide-react";
import ProjectBuilder from "./ProjectBuilder";
import { projects, type Project } from "@/content/projects";
import { contactChannels } from "@/content/profile";
import SectionHeader from "./SectionHeader";
import CyberCard from "./CyberCard";

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
              <CyberCard
                key={project.id}
                hoverEffect
                delay={idx * 0.05}
                className="flex flex-col justify-between"
              >
                <div>
                  <div className="mb-4 flex justify-between items-start">
                    <span className="text-xs font-bold uppercase tracking-widest text-cyan border border-cyan/40 px-2 py-1 rounded bg-cyan/5">
                      {project.category}
                    </span>
                    <ArrowUpRight className="text-white/20 group-hover:text-cyan transition-colors" size={20} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 font-display group-hover:text-cyan transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t) => (
                      <span key={t} className="text-xs text-gray-400 bg-black/40 px-2 py-1 rounded border border-white/10">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => addToBuilder(project)}
                  className="w-full py-3 bg-cyan/10 hover:bg-cyan hover:text-black text-cyan font-bold uppercase tracking-wider rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                >
                  <FolderPlus size={18} className="group-hover/btn:scale-110 transition-transform" />
                  Select Module
              </button>
            </CyberCard>
          ))}
        </div>
      </div>
    </section>
  );
}

