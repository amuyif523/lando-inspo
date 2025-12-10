"use client";

import { Twitch } from "lucide-react";
import ReactionGame from "./ReactionGame";
import SocialWall from "./SocialWall";

export default function StreamerSection() {
  return (
    <section id="streamer" className="py-24 bg-black relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#9146FF]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-1 bg-[#9146FF]" />
              <span className="text-[#9146FF] font-bold uppercase tracking-widest">
                Off Track
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-white">
              Streamer <span className="text-transparent bg-clip-text bg-linear-to-r from-[#9146FF] to-white">Mode</span>
            </h2>
          </div>

          {/* Twitch Status */}
          <a 
            href="https://twitch.tv/landonorris" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-[#9146FF] hover:bg-[#7c2cf5] transition-colors px-6 py-3 rounded-full group"
          >
            <Twitch className="text-white" />
            <div className="text-left">
              <div className="text-xs font-bold text-white/80 uppercase tracking-wider">Twitch Status</div>
              <div className="text-white font-black uppercase flex items-center gap-2">
                Offline
                <span className="w-2 h-2 bg-red-500 rounded-full" />
              </div>
            </div>
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: Reaction Game */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-sm h-full">
              <h3 className="text-2xl font-black italic uppercase mb-2">Reflex Check</h3>
              <p className="text-gray-400 mb-8 text-sm">Can you beat an F1 driver&apos;s reaction time? (Avg: 0.20s)</p>
              <ReactionGame />
            </div>
          </div>

          {/* Right: Social Wall */}
          <div className="lg:col-span-2">
            <SocialWall />
          </div>
        </div>
      </div>
    </section>
  );
}
