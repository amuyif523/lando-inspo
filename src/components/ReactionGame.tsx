"use client";

import { useState, useRef } from "react";
import { Play, RotateCcw, Zap } from "lucide-react";

type GameState = "idle" | "waiting" | "ready" | "finished" | "early";

export default function ReactionGame() {
  const [gameState, setGameState] = useState<GameState>("idle");
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startGame = () => {
    setGameState("waiting");
    setReactionTime(null);
    
    // Random delay between 2 and 5 seconds
    const delay = Math.random() * 3000 + 2000;
    
    timeoutRef.current = setTimeout(() => {
      setGameState("ready");
      startTimeRef.current = Date.now();
    }, delay);
  };

  const handleClick = () => {
    if (gameState === "waiting") {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setGameState("early");
    } else if (gameState === "ready") {
      const endTime = Date.now();
      setReactionTime(endTime - startTimeRef.current);
      setGameState("finished");
    }
  };

  const resetGame = () => {
    setGameState("idle");
    setReactionTime(null);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-zinc-900 rounded-2xl border border-white/10 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-white/10 flex justify-between items-center">
        <h3 className="font-bold uppercase tracking-widest text-white flex items-center gap-2">
          <Zap size={16} className="text-cyan" />
          Reaction Test
        </h3>
        <div className="text-xs text-gray-500 font-mono">F1 DRIVER AVG: 200ms</div>
      </div>

      {/* Game Area */}
      <div 
        className={`h-64 flex flex-col items-center justify-center cursor-pointer transition-colors duration-100 ${
          gameState === "waiting" ? "bg-red-500/20" :
          gameState === "ready" ? "bg-green-500" :
          gameState === "early" ? "bg-yellow-500/20" :
          "bg-black"
        }`}
        onMouseDown={handleClick}
      >
        {gameState === "idle" && (
          <button 
            onClick={(e) => { e.stopPropagation(); startGame(); }}
            className="bg-white text-black px-8 py-3 font-bold uppercase rounded-full hover:scale-105 transition-transform flex items-center gap-2"
          >
            <Play size={16} fill="currentColor" />
            Start Test
          </button>
        )}

        {gameState === "waiting" && (
          <div className="text-center">
            <div className="flex gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-4 h-4 rounded-full bg-red-500 animate-pulse" />
              ))}
            </div>
            <p className="font-bold uppercase tracking-widest text-red-500">Wait for Green...</p>
          </div>
        )}

        {gameState === "ready" && (
          <p className="text-4xl font-black uppercase text-black">CLICK NOW!</p>
        )}

        {gameState === "finished" && (
          <div className="text-center">
            <p className="text-sm text-gray-400 uppercase tracking-widest mb-2">Reaction Time</p>
            <p className="text-6xl font-black text-white mb-6">{reactionTime}ms</p>
            <button 
              onClick={(e) => { e.stopPropagation(); resetGame(); }}
              className="bg-white/10 text-white px-6 py-2 font-bold uppercase rounded-full hover:bg-white/20 transition-colors flex items-center gap-2 mx-auto"
            >
              <RotateCcw size={16} />
              Try Again
            </button>
          </div>
        )}

        {gameState === "early" && (
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-500 mb-4">JUMP START!</p>
            <button 
              onClick={(e) => { e.stopPropagation(); resetGame(); }}
              className="bg-white/10 text-white px-6 py-2 font-bold uppercase rounded-full hover:bg-white/20 transition-colors flex items-center gap-2 mx-auto"
            >
              <RotateCcw size={16} />
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


