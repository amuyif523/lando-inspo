"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, FolderPlus, Trash2, Send } from "lucide-react";

interface Project {
  id: number;
  name: string;
  description: string;
  tech: string[];
  category: string;
}

interface ProjectBuilderProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  onRemoveProject: (id: number) => void;
}

export default function ProjectBuilder({ isOpen, onClose, projects, onRemoveProject }: ProjectBuilderProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-zinc-950 border-l border-white/10 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-xl font-black italic uppercase flex items-center gap-2">
                <FolderPlus className="text-cyan" />
                Selected Modules <span className="text-gray-500 text-sm not-italic font-normal">({projects.length})</span>
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {projects.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500 gap-4">
                  <FolderPlus size={48} className="opacity-20" />
                  <p className="uppercase tracking-widest text-sm">No modules selected</p>
                </div>
              ) : (
                projects.map((project) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    key={project.id}
                    className="flex gap-4 bg-white/5 p-4 rounded-xl border border-white/5"
                  >
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold uppercase text-sm text-white">{project.name}</h3>
                        <p className="text-xs text-gray-400 mb-2">{project.category}</p>
                        <div className="flex flex-wrap gap-1">
                          {project.tech.map(t => (
                            <span key={t} className="text-[10px] bg-black/50 px-1.5 py-0.5 rounded text-gray-500">{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => onRemoveProject(project.id)}
                      className="text-gray-500 hover:text-red-500 transition-colors self-start"
                    >
                      <Trash2 size={16} />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 bg-zinc-900">
              <button className="w-full py-4 bg-cyan text-black font-black uppercase tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-2">
                <Send size={18} />
                Initiate Inquiry
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}


