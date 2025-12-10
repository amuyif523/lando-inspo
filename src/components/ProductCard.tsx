"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <div className="aspect-3/4 bg-zinc-900 rounded-2xl overflow-hidden relative mb-4">
        <Image 
          src={product.image} 
          alt={product.name} 
          fill 
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Quick Add Button */}
        <button 
          onClick={() => onAddToCart(product)}
          className="absolute bottom-4 right-4 bg-white text-black p-3 rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-cyan"
        >
          <Plus size={20} />
        </button>

        {/* Category Tag */}
        <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full">
          <span className="text-xs font-bold uppercase text-white tracking-widest">{product.category}</span>
        </div>
      </div>

      <h3 className="text-lg font-bold uppercase leading-tight mb-1">{product.name}</h3>
      <p className="text-gray-400 font-mono">£{product.price}</p>
    </motion.div>
  );
}


