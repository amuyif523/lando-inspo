"use client";

import clsx from "clsx";

interface StatCardProps {
  label: string;
  value: string | number;
  tone?: "cyan" | "purple" | "white";
  detail?: string;
}

export default function StatCard({ label, value, tone = "cyan", detail }: StatCardProps) {
  const accentText = {
    cyan: "text-[color:rgb(var(--glow-cyan-rgb))]",
    purple: "text-[color:rgb(var(--glow-purple-rgb))]",
    white: "text-white",
  }[tone];

  return (
    <div className="card-surface glow-card border rounded-xl p-6">
      <div className="text-xs font-bold uppercase text-white/60 mb-2 tracking-widest">{label}</div>
      <div className={clsx("text-3xl font-black leading-tight", accentText)}>{value}</div>
      {detail && <div className="text-xs text-white/50 mt-1">{detail}</div>}
    </div>
  );
}
