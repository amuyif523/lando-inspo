"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface CountdownProps {
  targetDate: string; // ISO string
}

export default function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex gap-4 md:gap-8 text-center">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="flex flex-col items-center">
          <div className="relative">
            <motion.span
              key={value}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              className="text-4xl md:text-6xl font-black tabular-nums tracking-tighter"
            >
              {value.toString().padStart(2, "0")}
            </motion.span>
          </div>
          <span className="text-xs md:text-sm font-bold uppercase text-gray-500 tracking-widest">
            {unit}
          </span>
        </div>
      ))}
    </div>
  );
}
