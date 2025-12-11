"use client";

import clsx from "clsx";
import CyberCard from "./CyberCard";

interface StatCardProps {
  label: string;
  value: string | number;
  tone?: "cyan" | "purple" | "white";
  detail?: string;
}

export default function StatCard({ label, value, tone = "cyan", detail }: StatCardProps) {
  const accentText = {
    cyan: "text-cyan",
    purple: "text-purple",
    white: "text-white",
  }[tone];

  return (
    <CyberCard hoverEffect className="flex flex-col justify-center">
      <div className="text-xs font-bold uppercase text-gray-400 mb-2 tracking-widest">{label}</div>
      <div className={clsx("text-3xl font-black leading-tight font-display", accentText)}>{value}</div>
      {detail && <div className="text-xs text-gray-500 mt-1">{detail}</div>}
    </CyberCard>
  );
}
