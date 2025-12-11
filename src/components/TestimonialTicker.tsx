"use client";

import { useMemo } from "react";
import SectionHeader from "./SectionHeader";
import CyberCard from "./CyberCard";

const testimonials = [
  {
    quote: "They ship production-ready agents with observability baked in—no hand-holding required.",
    name: "Director of Data Platform, Series C AI",
  },
  {
    quote: "Our latency dropped below 150ms after their GPU batching and cache strategy overhaul.",
    name: "VP Engineering, E-commerce",
  },
  {
    quote: "The self-healing data quality agents cut incident escalations by more than half.",
    name: "Head of Analytics, Enterprise SaaS",
  },
  {
    quote: "Fast, clear communication, and proofs you can demo the same week.",
    name: "Founder, Stealth ML Ops",
  },
];

const logos = [
  "Apollo Labs",
  "QuantumSignal",
  "Northwind AI",
  "Summit Robotics",
  "Hyperion Health",
  "Orion Data",
];

export default function TestimonialTicker() {
  const doubledLogos = useMemo(() => [...logos, ...logos], []);

  return (
    <section className="py-20 bg-linear-to-r from-zinc-950 via-black to-zinc-950 border-y border-white/5">
      <div className="container mx-auto px-6 mb-10">
        <SectionHeader eyebrow="Proof" title="Signals" highlight="Trusted" accent="cyan" />
      </div>

      <div className="container mx-auto px-6 space-y-10">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="ticker">
            {[...testimonials, ...testimonials].map((item, idx) => (
              <CyberCard
                key={`${item.name}-${idx}`}
                className="shrink-0 w-[320px] md:w-[420px] mr-6 flex flex-col justify-between"
                hoverEffect
              >
                <p className="text-sm md:text-base text-gray-300 leading-relaxed italic">“{item.quote}”</p>
                <p className="mt-4 text-xs uppercase tracking-[0.18em] text-cyan font-bold">{item.name}</p>
              </CyberCard>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/60 p-4">
          <div className="logo-strip">
            {doubledLogos.map((logo, idx) => (
              <div key={`${logo}-${idx}`} className="shrink-0 px-6 py-3 text-sm md:text-base font-semibold text-white/80 tracking-wide border border-white/5 rounded-full bg-white/5 mx-3">
                {logo}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .ticker {
          display: flex;
          width: max-content;
          animation: marquee 28s linear infinite;
        }

        .logo-strip {
          display: flex;
          width: max-content;
          animation: marquee 24s linear infinite;
        }

        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
