"use client";

import { useEffect, useState } from "react";
import Countdown from "./Countdown";
import ContributionHeatmap from "./ContributionHeatmap";
import { GitGraph, Cpu, Database, TrendingUp, Sparkles } from "lucide-react";
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

  const outcomeStories = [
    {
      title: "Pipeline Reliability",
      before: "82% on-time jobs",
      after: "99.3% on-time",
      impact: "+17.3% SLA adherence",
      detail: "Airflow DAG retries, observability, and runbook automation stabilized nightly loads.",
    },
    {
      title: "Model Latency",
      before: "410ms median",
      after: "115ms median",
      impact: "3.5x faster",
      detail: "GPU batching, quantization, and cache priming cut p50 and improved p95 by 62%.",
    },
    {
      title: "Data Trust",
      before: "9 blocking incidents/quarter",
      after: "1 minor alert",
      impact: "-88% incident volume",
      detail: "Great Expectations coverage, lineage alerts, and self-healing playbooks reduced toil.",
    },
  ];

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

          {/* Outcome Stories */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-cyan">
              <Sparkles size={16} />
              Outcome Stories
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {outcomeStories.map((story) => (
                <div key={story.title} className="p-4 rounded-xl bg-black/50 border border-white/10">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <p className="text-xs uppercase text-gray-500 tracking-[0.16em]">Before/After</p>
                      <h4 className="text-lg font-semibold text-white">{story.title}</h4>
                    </div>
                    <TrendingUp className="text-cyan shrink-0" size={18} />
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-2 text-sm">
                    <div className="bg-white/5 rounded-lg p-3">
                      <p className="text-[11px] uppercase text-gray-500 tracking-[0.12em]">Before</p>
                      <p className="font-semibold text-amber-200">{story.before}</p>
                    </div>
                    <div className="bg-cyan/10 border border-cyan/30 rounded-lg p-3">
                      <p className="text-[11px] uppercase text-cyan tracking-[0.12em]">After</p>
                      <p className="font-semibold text-white">{story.after}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-300 mb-2">{story.detail}</p>
                  <p className="text-sm font-semibold text-cyan">{story.impact}</p>
                </div>
              ))}
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


