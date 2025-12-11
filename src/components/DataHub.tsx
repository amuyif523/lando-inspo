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
      <div className="glow-grid-overlay" />
      <div className="glow-spot" data-color="cyan" data-strength="soft" style={{ top: "12%", left: "14%" }} />
      <div className="glow-spot" data-color="purple" data-strength="soft" style={{ bottom: "10%", right: "10%" }} />

      <div className="container mx-auto px-6 mb-16 relative z-10">
        <SectionHeader eyebrow="System Status" title="DATA COMMAND" highlight="CENTER" accent="cyan" />
      </div>

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Column: Info & Countdown */}
        <div className="space-y-12">
          {/* Stats Details */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4 text-xl md:text-2xl font-bold text-white/80">
              <GitGraph className="text-[color:rgb(var(--glow-cyan-rgb))]" />
              <span>
                {loading ? "Syncing commits..." : `${stats.commitsThisYear} Commits this year`}
              </span>
            </div>
            <div className="flex items-center gap-4 text-xl md:text-2xl font-bold text-white/80">
              <Cpu className="text-[color:rgb(var(--glow-cyan-rgb))]" />
              <span>{stats.uptime} System Uptime</span>
            </div>
            <div className="flex items-center gap-4 text-xl md:text-2xl font-bold text-white/80">
              <Database className="text-[color:rgb(var(--glow-cyan-rgb))]" />
              <span>{loading ? "Calculating repositories..." : `${stats.repositories} Repositories monitored`}</span>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="card-surface glow-card border rounded-2xl p-8">
            <h3 className="text-sm font-bold uppercase text-white/60 mb-6 tracking-widest">Next Project Launch</h3>
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


