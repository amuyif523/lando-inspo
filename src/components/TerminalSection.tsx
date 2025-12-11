"use client";

import { useState, useRef, useEffect } from "react";
import { Terminal, Send } from "lucide-react";
import { motion } from "framer-motion";

type LogEntry = {
  type: "input" | "output" | "error" | "system";
  content: string;
};

const INITIAL_LOGS: LogEntry[] = [
  { type: "system", content: "Initializing Neural Interface v2.0..." },
  { type: "system", content: "Connection established." },
  { type: "output", content: "Welcome, User. Type 'help' to view available commands." },
];

const COMMANDS = {
  help: "Available commands: about, skills, projects, contact, clear",
  about: "Amanuel Fikremariam. AI Architect & Data Engineer. Building the future of intelligence.",
  skills: "Core Systems: Python, TensorFlow, PyTorch, Next.js, React, TypeScript.",
  projects: "Access denied. Please visit the 'Projects' section for visual clearance.",
  contact: "Initiate communication protocol via email: hello@amanuel.dev or submit the contact form at #contact.",
  clear: "Clearing buffer...",
};

export default function TerminalSection() {
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState<LogEntry[]>(INITIAL_LOGS);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    const newLogs: LogEntry[] = [...logs, { type: "input", content: input }];

    if (cmd === "clear") {
      setLogs(INITIAL_LOGS);
      setInput("");
      return;
    }

    if (cmd in COMMANDS) {
      newLogs.push({ type: "output", content: COMMANDS[cmd as keyof typeof COMMANDS] });
    } else {
      newLogs.push({ type: "error", content: `Command not found: '${cmd}'. Type 'help' for assistance.` });
    }

    setLogs(newLogs);
    setInput("");
  };

  return (
    <section id="terminal" className="py-24 bg-black relative overflow-hidden font-mono">
      <div className="glow-grid-overlay" />
      <div className="glow-spot" data-color="cyan" data-strength="soft" style={{ top: "10%", right: "12%" }} />
      <div className="glow-spot" data-color="purple" data-strength="soft" style={{ bottom: "8%", left: "14%" }} />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-1 bg-[color:rgb(var(--glow-cyan-rgb))]" />
            <span className="text-[color:rgb(var(--glow-cyan-rgb))] font-bold uppercase tracking-widest">
              Command Line Interface
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-white">
            System
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[color:rgb(var(--glow-cyan-rgb))] to-[color:rgb(var(--glow-purple-rgb))]"> Terminal</span>
          </h2>
        </div>

        {/* Terminal Window */}
        <div className="w-full max-w-4xl mx-auto card-surface glow-card rounded-2xl overflow-hidden border">
          {/* Title Bar */}
          <div className="bg-[color:rgb(var(--glow-cyan-rgb)/0.08)] border-b border-[color:rgb(var(--glow-cyan-rgb)/0.32)] p-3 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
            <div className="w-3 h-3 rounded-full bg-[color:rgb(var(--glow-cyan-rgb)/0.7)]" />
            <div className="ml-4 text-xs text-[color:rgb(var(--glow-cyan-rgb))] flex items-center gap-2">
              <Terminal className="w-3 h-3" />
              guest@amanuel-portfolio:~
            </div>
          </div>

          {/* Console Area */}
          <div 
            ref={scrollRef}
            className="h-[400px] overflow-y-auto p-6 font-mono text-sm md:text-base custom-scrollbar"
          >
            {logs.map((log, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-2"
              >
                {log.type === "input" && (
                  <div className="flex gap-2 text-white">
                    <span className="text-[color:rgb(var(--glow-cyan-rgb))]">➜</span>
                    <span className="text-cyan">~</span>
                    <span>{log.content}</span>
                  </div>
                )}
                {log.type === "output" && (
                  <div className="text-[color:rgb(var(--glow-green-rgb))] ml-6">{log.content}</div>
                )}
                {log.type === "error" && (
                  <div className="text-red-400 ml-6">{log.content}</div>
                )}
                {log.type === "system" && (
                  <div className="text-gray-500 italic ml-6"># {log.content}</div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Input Area */}
          <form
            onSubmit={handleCommand}
            className="border-t border-[color:rgb(var(--glow-cyan-rgb)/0.32)] p-4 bg-[color:rgb(var(--glow-cyan-rgb)/0.06)] flex gap-2"
          >
            <span className="text-[color:rgb(var(--glow-cyan-rgb))] pt-1">➜</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-white font-mono placeholder-[color:rgb(var(--glow-cyan-rgb)/0.4)]"
              placeholder="Enter command..."
              aria-label="Terminal command input"
              autoFocus
            />
            <button type="submit" className="text-[color:rgb(var(--glow-cyan-rgb))] hover:text-white">
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}


