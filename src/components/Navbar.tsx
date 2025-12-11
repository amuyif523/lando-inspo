"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useMotionSettings } from "./MotionProvider";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Data", href: "#data-hub" },
  { name: "Neural Core", href: "#neural-core" },
  { name: "Terminal", href: "#terminal" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Career", href: "#career" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { mode, toggleMotionMode } = useMotionSettings();
  const motionLabel = mode === "reduced" ? "Reduced" : "Full FX";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-black tracking-tighter">
          AF<span className="text-cyan">.</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-bold uppercase tracking-widest hover:text-cyan transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <button
            onClick={toggleMotionMode}
            className="border border-white/10 bg-white/5 hover:bg-white/10 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors"
            aria-label="Toggle motion mode"
          >
            Motion: {motionLabel}
          </button>
          <button className="bg-cyan text-black px-6 py-2 font-bold uppercase text-sm hover:bg-white transition-colors">
            <span className="block">Initialize</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-20 left-0 right-0 bg-black border-b border-white/10 p-6 flex flex-col gap-6"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-xl font-bold uppercase tracking-widest hover:text-cyan"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <button
            onClick={() => {
              toggleMotionMode();
              setIsOpen(false);
            }}
            className="border border-white/10 bg-white/5 hover:bg-white/10 rounded-full px-4 py-3 text-sm font-bold uppercase tracking-widest transition-colors"
            aria-label="Toggle motion mode"
          >
            Motion: {motionLabel}
          </button>
        </motion.div>
      )}
    </nav>
  );
}


