"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { contactChannels, profile } from "@/content/profile";
import { useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name || !email || !message) {
      setError("All fields are required.");
      return;
    }

    setFormState("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, modules: [] }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Unable to submit. Please try again.");
      }

      setFormState("success");
      setName("");
      setEmail("");
      setMessage("");
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
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-1 bg-cyan" />
            <span className="text-cyan font-bold uppercase tracking-widest">
              Contact
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter display-font">
            Let&apos;s build what&apos;s next.
          </h2>
          <p className="text-gray-400 max-w-xl">
            {profile.availability} Reach out with a short brief or a link to your product, and we&apos;ll plan the right intelligence layer together.
          </p>

          <div className="space-y-3">
            {contactChannels.map((channel) => (
              <Link
                key={channel.label}
                href={channel.href}
                className="flex items-center justify-between bg-white/5 border border-white/10 hover:border-cyan/50 transition-colors rounded-xl px-4 py-3"
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
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Project Intake</p>
              <h3 className="text-2xl font-bold text-white">Discovery Form</h3>
            </div>
            <span className="text-[10px] px-2 py-1 rounded-full bg-cyan/20 text-cyan uppercase tracking-widest">
              Live
            </span>
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
            {formState === "success" && (
              <p className="text-xs text-green-400">Message sent. I will get back to you shortly.</p>
            )}
            <div className="flex gap-3">
              <Link
                href={contactChannels[0].href}
                className="flex-1 text-center bg-cyan text-black font-bold uppercase tracking-wider py-3 rounded-lg hover:bg-white transition-colors"
              >
                Email Amanuel
              </Link>
              <button
                type="submit"
                className="flex-1 text-center border border-white/20 bg-white/5 text-white font-bold uppercase tracking-wider py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={formState === "submitting"}
              >
                {formState === "submitting" ? "Submitting..." : "Submit Brief"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
