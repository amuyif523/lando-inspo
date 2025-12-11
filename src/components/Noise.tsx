"use client";

import { useMotionSettings } from "./MotionProvider";

export default function Noise() {
  const { isReducedMotion } = useMotionSettings();

  if (isReducedMotion) {
    return (
      <div className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.02] bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-white/5 via-transparent to-black" />
    );
  }

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.03] mix-blend-overlay">
      <svg className="w-full h-full">
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
}
