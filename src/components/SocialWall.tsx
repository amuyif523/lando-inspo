"use client";

import { motion } from "framer-motion";
import { Instagram, Twitter, Twitch } from "lucide-react";
import Image from "next/image";

const posts = [
  {
    id: 1,
    type: "instagram",
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=800&auto=format&fit=crop",
    caption: "P2 in Silverstone! What a race. Thanks to all the fans 🇬🇧",
    likes: "450K",
  },
  {
    id: 2,
    type: "twitter",
    content: "Streaming Warzone tonight with Max. Be there or be square. 🎮",
    date: "2h ago",
  },
  {
    id: 3,
    type: "instagram",
    image: "https://images.unsplash.com/photo-1535139262971-c51845709a48?q=80&w=800&auto=format&fit=crop",
    caption: "New Quadrant drop is live. Don't miss out.",
    likes: "120K",
  },
  {
    id: 4,
    type: "twitch",
    title: "LIVE: F1 24 Career Mode - Part 1",
    viewers: "25K",
    thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop",
  },
];

export default function SocialWall() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {posts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-zinc-900 rounded-2xl overflow-hidden border border-white/5 hover:border-lando/50 transition-colors group"
        >
          {post.type === "instagram" && (
            <div className="relative aspect-square">
              <Image 
                src={post.image!} 
                alt="Instagram Post" 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md p-2 rounded-full">
                <Instagram size={16} className="text-white" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                <p className="text-sm text-white line-clamp-2">{post.caption}</p>
                <p className="text-xs text-gray-400 mt-1">❤️ {post.likes}</p>
              </div>
            </div>
          )}

          {post.type === "twitter" && (
            <div className="p-6 h-full flex flex-col justify-between min-h-[200px]">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-700 rounded-full" />
                    <div>
                      <div className="font-bold text-sm">Lando Norris</div>
                      <div className="text-xs text-gray-500">@LandoNorris</div>
                    </div>
                  </div>
                  <Twitter size={16} className="text-[#1DA1F2]" />
                </div>
                <p className="text-lg font-medium">{post.content}</p>
              </div>
              <div className="text-xs text-gray-500 mt-4">{post.date}</div>
            </div>
          )}

          {post.type === "twitch" && (
            <div className="relative aspect-video md:aspect-auto md:h-full">
              <Image 
                src={post.thumbnail!} 
                alt="Twitch Stream" 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
              <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded uppercase animate-pulse">
                Live
              </div>
              <div className="absolute top-4 right-4 bg-[#9146FF] p-2 rounded-full">
                <Twitch size={16} className="text-white" />
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <p className="font-bold text-white truncate">{post.title}</p>
                <p className="text-xs text-gray-300">{post.viewers} watching</p>
              </div>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
