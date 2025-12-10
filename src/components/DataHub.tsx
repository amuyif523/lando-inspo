"use client";

import { useEffect, useState } from "react";
import Countdown from "./Countdown";
import ContributionHeatmap from "./ContributionHeatmap";
import { GitGraph, Cpu, Database } from "lucide-react";
import { fetchActivityStats } from "@/lib/data";
import { fallbackActivityStats } from "@/content/stats";
import SectionHeader from "./SectionHeader";
import StatCard from "./StatCard";

export default function DataHub() {
  const nextLaunchDate = new Date();
  nextLaunchDate.setDate(nextLaunchDate.getDate() + 14);

  const [stats, setStats] = useState(fallbackActivityStats);
  const [loading, setLoading] = useState(true);

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

  return (
    <section id="data-hub" className="py-24 bg-black relative overflow-hidden">
      <div className="container mx-auto px-6 mb-16">
        <SectionHeader eyebrow="System Status" title="DATA COMMAND" highlight="CENTER" accent="cyan" />
      </div>

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column: Info & Countdown */}
        <div className="space-y-12">
          {/* Stats Details */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4 text-xl md:text-2xl font-bold text-gray-300">
              <GitGraph className="text-cyan" />
              <span>
                {loading ? "Syncing commits..." : `${stats.commitsThisYear} Commits this year`}
              </span>
            </div>
            <div className="flex items-center gap-4 text-xl md:text-2xl font-bold text-gray-300">
              <Cpu className="text-cyan" />
              <span>{stats.uptime} System Uptime</span>
            </div>
            <div className="flex items-center gap-4 text-xl md:text-2xl font-bold text-gray-300">
              <Database className="text-cyan" />
              <span>{loading ? "Calculating repositories..." : `${stats.repositories} Repositories monitored`}</span>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm">
            <h3 className="text-sm font-bold uppercase text-gray-500 mb-6 tracking-widest">Next Project Launch</h3>
            <Countdown targetDate={nextLaunchDate.toISOString()} />
          </div>
        </div>

        {/* Right Column: Heatmap */}
        <div>
          <ContributionHeatmap />
          
          {/* Stats Grid (Mini Bento) */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <StatCard
              label="Current Streak"
              value={loading ? "…" : `${stats.currentStreak} Days`}
              tone="cyan"
            />
            <StatCard
              label="Total Repos"
              value={loading ? "…" : stats.repositories}
              tone="purple"
            />
          </div>
        </div>
      </div>
    </section>
  );
}


