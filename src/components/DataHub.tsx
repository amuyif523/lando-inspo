"use client";

import { useEffect, useState } from "react";
import Countdown from "./Countdown";
import ContributionHeatmap from "./ContributionHeatmap";
import { GitGraph, Cpu, Database } from "lucide-react";
import { fetchActivityStats } from "@/lib/data";
import { fallbackActivityStats } from "@/content/stats";

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
      {/* Section Header */}
      <div className="container mx-auto px-6 mb-16">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-1 bg-cyan" />
          <span className="text-cyan font-bold uppercase tracking-widest">System Status</span>
        </div>
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter">
          DATA COMMAND <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan to-purple">CENTER</span>
        </h2>
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
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
              <div className="text-xs font-bold uppercase text-gray-500 mb-2">Current Streak</div>
              <div className="text-3xl font-black text-cyan">
                {loading ? "…" : `${stats.currentStreak} Days`}
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
              <div className="text-xs font-bold uppercase text-gray-500 mb-2">Total Repos</div>
              <div className="text-3xl font-black text-purple">
                {loading ? "…" : stats.repositories}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


