"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen w-full flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-lando/20 via-black to-black" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-30 bg-[length:50px_50px]" />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-lando font-bold tracking-[0.5em] uppercase mb-6 text-sm md:text-base">
            McLaren Formula 1 Driver
          </h2>
          <h1 className="text-7xl md:text-[12rem] font-black italic tracking-tighter mb-8 leading-[0.8] mix-blend-difference">
            LANDO
            <br />
            <span className="text-transparent bg-clip-text bg-linear-to-b from-white to-gray-500">
              NORRIS
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-12 font-light"
        >
          Pushing the limits. Breaking the grid.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="flex flex-col md:flex-row gap-6 justify-center items-center"
        >
          <button className="group relative bg-lando text-black px-10 py-4 font-black uppercase text-lg skew-x-[-10deg] hover:bg-white transition-all duration-300 overflow-hidden">
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative block skew-x-[10deg]">View Stats</span>
          </button>
          <button className="group border border-white/20 bg-white/5 backdrop-blur-sm text-white px-10 py-4 font-black uppercase text-lg skew-x-[-10deg] hover:bg-white/10 transition-all duration-300">
            <span className="block skew-x-[10deg] group-hover:scale-110 transition-transform">Latest Merch</span>
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 animate-pulse">
          Scroll to Start
        </span>
        <div className="w-px h-16 bg-linear-to-b from-lando to-transparent opacity-50" />
      </motion.div>
    </section>
  );
}
