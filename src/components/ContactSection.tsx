"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { contactChannels, profile } from "@/content/profile";
import { useState } from "react";
import { Check } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { useContactPrefetch } from "@/lib/contactPrefetch";

type FormState = "idle" | "submitting" | "success" | "error";

const missionBriefs = [
  {
    title: "MLOps Audit",
    description: "Harden pipelines, shore up observability, and reduce model drift.",
    template:
      "We need an MLOps audit to harden pipelines, reduce drift, and improve delivery speed. Current stack includes feature store and CI/CD but lacks monitoring.",
  },
  {
    title: "GenAI Prototype",
    description: "Ship a narrow-scope assistant with evals, safety, and guardrails.",
    template:
      "Looking to prototype a GenAI assistant with retrieval, eval harnesses, and strong safety guardrails. Help define scope and success metrics.",
  },
  {
    title: "Data Activation Sprint",
    description: "Lightweight modeling + interfaces to unblock business workflows.",
    template:
      "We want a data activation sprint to unlock a specific workflow. Need lightweight modeling plus a simple UI/API surface to ship value fast.",
  },
];

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [modules, setModules] = useState<string[]>([]);
  const [formState, setFormState] = useState<FormState>("idle");
  const [error, setError] = useState<string | null>(null);
  const prefetchContact = useContactPrefetch();

  const statusCopy: Record<FormState, string> = {
    idle: "Neural uplink idle. Awaiting transmission.",
    submitting: "Synchronizing signal… establishing uplink.",
    success: "Neural uplink stable. Transmission received.",
    error: error || "Signal interference detected. Retry the transmission.",
  };
  const statusTone =
    formState === "error" ? "text-red-400" : formState === "success" ? "text-green-400" : "text-gray-200";

  const handlePresetSelect = (title: string, template: string) => {
    setMessage(template);
    setModules([title]);
    setFormState("idle");
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    setFormState("submitting");

    try {
      prefetchContact();
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, modules }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Unable to submit. Please try again.");
      }

      setFormState("success");
      setName("");
      setEmail("");
      setMessage("");
      setModules([]);
    } catch (err) {
      setFormState("error");
      setError(err instanceof Error ? err.message : "Unable to submit. Please try again.");
    }
  };

  return (
    <section id="contact" className="py-24 bg-black relative overflow-hidden">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left: Intro + Channels */}
        <div className="space-y-6">
          <SectionHeader eyebrow="Contact" title="Let’s build" highlight="what’s next." accent="cyan" />
          <p className="text-gray-400 max-w-xl">
            {profile.availability} Reach out with a short brief or a link to your product, and we&apos;ll plan the right intelligence layer together.
          </p>

          <div className="space-y-3">
            {contactChannels.map((channel) => (
              <Link
                key={channel.label}
                href={channel.href}
                className="flex items-center justify-between bg-white/5 border border-white/10 hover:border-cyan/50 transition-colors rounded-xl px-4 py-3"
                onMouseEnter={prefetchContact}
                onFocus={prefetchContact}
              >
                <span className="text-sm uppercase tracking-widest text-gray-400">{channel.label}</span>
                <span className="text-white font-semibold">{channel.display}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Right: Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between mb-4 gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Project Intake</p>
              <h3 className="text-2xl font-bold text-white">Discovery Form</h3>
            </div>
            <span className="text-[10px] px-2 py-1 rounded-full bg-cyan/20 text-cyan uppercase tracking-widest">
              Live
            </span>
          </div>

          <div className="mb-3 flex items-center justify-between rounded-lg bg-black/40 border border-white/10 px-3 py-2">
            <p className="text-[10px] uppercase tracking-[0.25em] text-gray-500">Status</p>
            <p
              className={`text-xs text-right ${statusTone}`}
              aria-live="polite"
            >
              {statusCopy[formState]}
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex gap-4">
              <label className="flex-1 text-sm text-gray-300">
                Name
                <input
                  aria-label="Your name"
                  type="text"
                  placeholder="Amanuel Fikremariam"
                  className="mt-1 w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:border-cyan outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>
              <label className="flex-1 text-sm text-gray-300">
                Email
                <input
                  aria-label="Your email"
                  type="email"
                  placeholder="you@example.com"
                  className="mt-1 w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:border-cyan outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-gray-400 mb-2">Mission Brief Presets</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {missionBriefs.map((brief) => {
                  const isActive = modules.includes(brief.title);
                  return (
                    <button
                      type="button"
                      key={brief.title}
                      onClick={() => handlePresetSelect(brief.title, brief.template)}
                      className={`text-left h-full bg-black/40 border rounded-xl px-4 py-3 transition-colors hover:border-cyan/50 ${isActive ? "border-cyan/70 shadow-[0_0_24px_rgba(34,211,238,0.25)]" : "border-white/10"}`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-white">{brief.title}</span>
                        {isActive && <Check size={14} className="text-cyan" />}
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed">{brief.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>
            <label className="block text-sm text-gray-300">
              Project Snapshot
              <textarea
                aria-label="Project summary"
                placeholder="What do you want to build?"
                className="mt-1 w-full bg-black/40 border border-white/10 rounded-lg px-3 py-3 text-white placeholder-gray-500 focus:border-cyan outline-none min-h-[120px]"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </label>
            {error && <p className="text-xs text-red-400">{error}</p>}
            <div className="flex gap-3">
              <Link
                href={contactChannels[0].href}
                className="flex-1 text-center bg-cyan text-black font-bold uppercase tracking-wider py-3 rounded-lg hover:bg-white transition-colors"
                onMouseEnter={prefetchContact}
                onFocus={prefetchContact}
              >
                Email Amanuel
              </Link>
              <button
                type="submit"
                className="flex-1 text-center border border-white/20 bg-white/5 text-white font-bold uppercase tracking-wider py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={formState === "submitting"}
                onMouseEnter={prefetchContact}
                onFocus={prefetchContact}
              >
                {formState === "submitting" ? "Transmitting…" : "Submit Mission Brief"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
