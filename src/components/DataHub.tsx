"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Countdown from "./Countdown";
import ContributionHeatmap from "./ContributionHeatmap";
import { GitGraph, Cpu, Database } from "lucide-react";
import { fetchActivityStats } from "@/lib/data";
import { fallbackActivityStats } from "@/content/stats";
import SectionHeader from "./SectionHeader";
import StatCard from "./StatCard";
import { dataCardVariants } from "@/lib/motionTokens";
import { useMotionSettings } from "./MotionProvider";

export default function DataHub() {
  const nextLaunchDate = new Date();
  nextLaunchDate.setDate(nextLaunchDate.getDate() + 14);

  const [stats, setStats] = useState(fallbackActivityStats);
  const [loading, setLoading] = useState(true);
  const { isReducedMotion } = useMotionSettings();
  const variantProps = isReducedMotion
    ? {}
    : {
        variants: dataCardVariants,
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: true, amount: 0.25 },
      };

  useEffect(() => {
    let mounted = true;
    fetchActivityStats().then((result) => {
      if (mounted) {
        setStats(result);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const hoverMotion = isReducedMotion
    ? undefined
    : {
        rotateX: -4,
        rotateY: 4,
        scale: 1.02,
      };

  return (
    <motion.section
      id="data-hub"
      className="py-24 bg-black relative overflow-hidden"
      {...variantProps}
    >
      <div className="container mx-auto px-6 mb-16">
        <SectionHeader eyebrow="System Status" title="DATA COMMAND" highlight="CENTER" accent="cyan" />
      </div>

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column: Info & Countdown */}
        <div className="space-y-12">
          {/* Stats Details */}
          <div className="flex flex-col gap-6">
            {[{
              icon: <GitGraph className="text-cyan" />,
              label: loading ? "Syncing commits..." : `${stats.commitsThisYear} Commits this year`,
            },
            {
              icon: <Cpu className="text-cyan" />,
              label: `${stats.uptime} System Uptime`,
            },
            {
              icon: <Database className="text-cyan" />,
              label: loading ? "Calculating repositories..." : `${stats.repositories} Repositories monitored`,
            }].map((item, index) => (
              <motion.div
                key={item.label}
                className="flex items-center gap-4 text-xl md:text-2xl font-bold text-gray-300"
                variants={isReducedMotion ? undefined : dataCardVariants}
                custom={index}
                whileHover={hoverMotion}
                whileTap={hoverMotion}
              >
                {item.icon}
                <span>{item.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Countdown Timer */}
          <motion.div
            className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm"
            variants={isReducedMotion ? undefined : dataCardVariants}
            custom={1}
            whileHover={hoverMotion}
            whileTap={hoverMotion}
          >
            <h3 className="text-sm font-bold uppercase text-gray-500 mb-6 tracking-widest">Next Project Launch</h3>
            <Countdown targetDate={nextLaunchDate.toISOString()} />
          </motion.div>
        </div>

        {/* Right Column: Heatmap */}
        <div>
          <motion.div
            variants={isReducedMotion ? undefined : dataCardVariants}
            custom={2}
            whileHover={hoverMotion}
            whileTap={hoverMotion}
          >
            <ContributionHeatmap />
          </motion.div>

          {/* Stats Grid (Mini Bento) */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            {[{ label: "Current Streak", value: loading ? "…" : `${stats.currentStreak} Days`, tone: "cyan" },
              { label: "Total Repos", value: loading ? "…" : stats.repositories, tone: "purple" }].map((card, index) => (
              <motion.div
                key={card.label}
                variants={isReducedMotion ? undefined : dataCardVariants}
                custom={index + 3}
                whileHover={hoverMotion}
                whileTap={hoverMotion}
              >
                <StatCard
                  label={card.label}
                  value={card.value}
                  tone={card.tone as "cyan" | "purple"}
                  className="h-full"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

