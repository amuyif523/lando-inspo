"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";

type MotionMode = "standard" | "reduced";

interface MotionSettings {
  mode: MotionMode;
  isReducedMotion: boolean;
  toggleMotionMode: () => void;
  setMotionMode: (mode: MotionMode) => void;
}

const MotionContext = createContext<MotionSettings | undefined>(undefined);

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const systemPrefersReduced = useReducedMotion();
  const [mode, setMode] = useState<MotionMode>("standard");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const saved = typeof window !== "undefined"
      ? (localStorage.getItem("motion-mode") as MotionMode | null)
      : null;

    const nextMode = saved ?? (systemPrefersReduced ? "reduced" : "standard");

    // Local preference sync is a deliberate state update from an external source.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMode((prev) => (prev === nextMode ? prev : nextMode));
  }, [systemPrefersReduced]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    localStorage.setItem("motion-mode", mode);
    document.documentElement.dataset.motionMode = mode;
  }, [mode]);

  const value = useMemo(
    () => ({
      mode,
      isReducedMotion: mode === "reduced",
      toggleMotionMode: () => setMode(prev => (prev === "standard" ? "reduced" : "standard")),
      setMotionMode: setMode,
    }),
    [mode],
  );

  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
}

export function useMotionSettings() {
  const context = useContext(MotionContext);

  if (!context) {
    throw new Error("useMotionSettings must be used within MotionProvider");
  }

  return context;
}
