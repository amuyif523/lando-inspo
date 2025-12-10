"use client";

import clsx from "clsx";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  highlight?: string;
  accent?: "cyan" | "purple" | "green" | "white";
  align?: "left" | "center";
}

export default function SectionHeader({ eyebrow, title, highlight, accent = "cyan", align = "left" }: SectionHeaderProps) {
  const accentColor = {
    cyan: "bg-cyan text-cyan",
    purple: "bg-purple text-purple",
    green: "bg-green-500 text-green-400",
    white: "bg-white text-white",
  }[accent];

  return (
    <div className={clsx("mb-12", align === "center" && "text-center")}>
      <div className={clsx("flex items-center gap-4 mb-4", align === "center" && "justify-center")}>
        <div className={clsx("w-12 h-1", accentColor?.split(" ")[0])} />
        <span className={clsx("font-bold uppercase tracking-widest", accentColor?.split(" ")[1])}>
          {eyebrow}
        </span>
      </div>
      <h2 className="text-5xl md:text-6xl font-black tracking-tighter display-font">
        {title}{" "}
        {highlight && (
          <span className="text-transparent bg-clip-text" style={{ backgroundImage: "var(--gradient-accent)" }}>
            {highlight}
          </span>
        )}
      </h2>
    </div>
  );
}
