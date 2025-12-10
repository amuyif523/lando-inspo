"use client";

import clsx from "clsx";

interface StatCardProps {
  label: string;
  value: string | number;
  tone?: "cyan" | "purple" | "white";
  detail?: string;
}

export default function StatCard({ label, value, tone = "cyan", detail }: StatCardProps) {
  const toneClasses = {
    cyan: "text-cyan border-white/10",
    purple: "text-purple border-white/10",
    white: "text-white border-white/20",
  }[tone];

  return (
    <div className={clsx("card-surface border rounded-xl p-6", toneClasses)}>
      <div className="text-xs font-bold uppercase text-gray-500 mb-2 tracking-widest">{label}</div>
      <div className="text-3xl font-black">{value}</div>
      {detail && <div className="text-xs text-gray-500 mt-1">{detail}</div>}
    </div>
  );
}
