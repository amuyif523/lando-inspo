"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Cpu, Network, Zap, Database } from "lucide-react";

const BrainViewer = dynamic(() => import("./BrainViewer"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] md:h-[600px] rounded-2xl border border-white/5 bg-gradient-to-br from-cyan/10 to-purple/10 animate-pulse" />
  ),
});

const systems = [
  {
    id: 1,
    name: "Neural Processing",
    description: "Advanced cognitive modeling and pattern recognition algorithms.",
    icon: <Cpu className="w-6 h-6 text-cyan" />,
  },
  {
    id: 2,
    name: "Data Synthesis",
    description: "Real-time data aggregation and visualization pipelines.",
    icon: <Database className="w-6 h-6 text-purple-500" />,
  },
  {
    id: 3,
    name: "Network Security",
    description: "Encrypted communication channels and intrusion detection.",
    icon: <Network className="w-6 h-6 text-cyan" />,
  },
  {
    id: 4,
    name: "System Optimization",
    description: "High-performance computing and resource management.",
    icon: <Zap className="w-6 h-6 text-purple-500" />,
  },
];

export default function NeuralNetwork() {
  return (
    <section id="neural-core" className="py-24 bg-black relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-1 bg-cyan" />
            <span className="text-cyan font-bold uppercase tracking-widest">
              System Architecture
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-white">
            Neural <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan to-purple-600">Core</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          {/* Left: 3D Viewer */}
          <div className="lg:col-span-2 relative">
            <div className="absolute inset-0 bg-linear-to-r from-cyan/10 to-purple-600/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <BrainViewer />
              
              {/* Overlay Info */}
              <div className="absolute bottom-8 left-8 pointer-events-none">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-4xl font-black italic uppercase text-white mb-2">
                    Active Nodes
                  </h3>
                  <p className="text-gray-400 max-w-md">
                    Visualizing real-time connection density and system load.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Right: System List */}
          <div className="flex flex-col gap-4">
            {systems.map((system, index) => (
              <motion.div
                key={system.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative p-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-cyan/50 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-black/50 border border-white/10 group-hover:border-cyan/50 transition-colors">
                    {system.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white uppercase mb-1 group-hover:text-cyan transition-colors">
                      {system.name}
                    </h4>
                    <p className="text-sm text-gray-400">
                      {system.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


