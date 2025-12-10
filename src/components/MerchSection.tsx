"use client";

import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import ProductCard from "./ProductCard";
import CartDrawer from "./CartDrawer";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface CartItem extends Product {
  size: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "LN4 Core Hoodie",
    price: 65,
    category: "Apparel",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Neon Track Tee",
    price: 35,
    category: "T-Shirts",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Quadrant Cap",
    price: 30,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Race Day Jacket",
    price: 120,
    category: "Outerwear",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop",
  },
];

export default function MerchSection() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCartItems([...cartItems, { ...product, size: "M" }]); // Default size for demo
    setIsCartOpen(true);
  };

  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <section id="merch" className="py-24 bg-zinc-950 relative">
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems}
        onRemoveItem={removeFromCart}
      />

      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex justify-between items-end mb-16">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-1 bg-white" />
              <span className="text-white font-bold uppercase tracking-widest">
                Shop
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-white">
              Latest <span className="text-transparent bg-clip-text bg-linear-to-r from-lando to-white">Drop</span>
            </h2>
          </div>

          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative bg-white/10 hover:bg-white/20 p-4 rounded-full transition-colors"
          >
            <ShoppingBag className="text-white" />
            {cartItems.length > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-lando rounded-full flex items-center justify-center text-[10px] font-bold text-black">
                {cartItems.length}
              </div>
            )}
          </button>
        </div>

        {/* Lookbook Video Banner */}
        <div className="relative w-full h-[400px] md:h-[600px] rounded-3xl overflow-hidden mb-16 group">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <Image 
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2000&auto=format&fit=crop" 
            alt="Lookbook"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center">
            <h3 className="text-4xl md:text-6xl font-black italic uppercase text-white mb-6">
              Season 04
            </h3>
            <button className="bg-white text-black px-8 py-3 font-bold uppercase rounded-full hover:bg-lando transition-colors">
              View Lookbook
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={addToCart} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
