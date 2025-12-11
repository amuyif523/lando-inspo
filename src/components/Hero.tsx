"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import BootSequence from "./BootSequence";
import CyberpunkProfile from "./CyberpunkProfile";
import { useMotionSettings } from "./MotionProvider";

const ParticleBackground = dynamic(() => import("./ParticleBackground"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-purple/5 via-black to-black" />,
});

export default function Hero() {
  const ref = useRef(null);
  const [isBooting, setIsBooting] = useState(false);
  const { isReducedMotion } = useMotionSettings();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden pt-20"
    >
      <AnimatePresence>
        {isBooting && <BootSequence onComplete={() => setIsBooting(false)} />}
      </AnimatePresence>

      {/* Background Elements */}
      <motion.div style={isReducedMotion ? undefined : { y, opacity }} className="absolute inset-0 z-0">
        {!isReducedMotion && <ParticleBackground />}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-purple/10 via-black to-black pointer-events-none" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 bg-size-[50px_50px] pointer-events-none" />
        {/* Cyberpunk Glow */}
        {!isReducedMotion && (
          <>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan/20 rounded-full blur-[128px] mix-blend-screen animate-pulse pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple/20 rounded-full blur-[128px] mix-blend-screen animate-pulse delay-1000 pointer-events-none" />
          </>
        )}
      </motion.div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">

        {/* Text Content */}
        <div className="flex-1 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-cyan font-mono font-bold tracking-widest uppercase mb-6 text-sm md:text-base">
              &lt;System.Initialize /&gt;
            </h2>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 leading-[0.9]">
              AMANUEL
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan via-white to-purple">
                FIKREMARIAM
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-400 max-w-xl mb-10 font-light leading-relaxed"
          >
            AI Architect. Machine Learning Engineer. <br/>
            <span className="text-white font-medium">Building the brain of tomorrow.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex flex-col md:flex-row gap-6 justify-center md:justify-start items-center"
          >
            <button
              onClick={() => setIsBooting(true)}
              className="group relative bg-cyan text-black px-8 py-4 font-bold uppercase text-lg hover:bg-white transition-all duration-300 overflow-hidden clip-path-slant"
            >
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative block">Initialize System</span>
            </button>
            <Link
              href="#projects"
              className="group border border-white/20 bg-white/5 backdrop-blur-sm text-white px-8 py-4 font-bold uppercase text-lg hover:bg-white/10 transition-all duration-300"
            >
              <span className="block group-hover:translate-x-2 transition-transform">View Projects &rarr;</span>
            </Link>
          </motion.div>
        </div>

        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ delay: 0.2, duration: 1.2 }}
          className="flex-1 flex justify-center md:justify-end"
        >
          <CyberpunkProfile />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gray-500 animate-pulse">
          Scroll to Access Data
        </span>
        <div className="w-px h-16 bg-linear-to-b from-cyan to-transparent opacity-50" />
      </motion.div>
    </section>
  );
}

