"use client";

import { useState } from "react";
import { FolderPlus } from "lucide-react";
import ProjectBuilder from "./ProjectBuilder";
import { projects, type Project } from "@/content/projects";

export default function ProjectsSection() {
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [selectedProjects, setSelectedProjects] = useState<Project[]>([]);

  const addToBuilder = (project: Project) => {
    if (!selectedProjects.find(p => p.id === project.id)) {
      setSelectedProjects([...selectedProjects, project]);
    }
    setIsBuilderOpen(true);
  };

  const removeFromBuilder = (id: number) => {
    setSelectedProjects(selectedProjects.filter((p) => p.id !== id));
  };

  return (
    <section id="projects" className="py-24 bg-zinc-950 relative">
      <ProjectBuilder 
        isOpen={isBuilderOpen} 
        onClose={() => setIsBuilderOpen(false)} 
        projects={selectedProjects}
        onRemoveProject={removeFromBuilder}
      />

      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex justify-between items-end mb-16">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-1 bg-white" />
              <span className="text-white font-bold uppercase tracking-widest">
                Arsenal
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-white">
              Project <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan to-white">Modules</span>
            </h2>
          </div>

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

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="group relative bg-white/5 border border-white/10 rounded-xl p-6 hover:border-cyan/50 transition-all duration-300">
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
          ))}
        </div>
      </div>
    </section>
  );
}


