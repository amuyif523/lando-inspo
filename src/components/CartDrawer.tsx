"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Trash2 } from "lucide-react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  size: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: number) => void;
}

export default function CartDrawer({ isOpen, onClose, items, onRemoveItem }: CartDrawerProps) {
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-zinc-950 border-l border-white/10 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-xl font-black italic uppercase flex items-center gap-2">
                <ShoppingBag className="text-lando" />
                Your Cart <span className="text-gray-500 text-sm not-italic font-normal">({items.length})</span>
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500 gap-4">
                  <ShoppingBag size={48} className="opacity-20" />
                  <p className="uppercase tracking-widest text-sm">Your cart is empty</p>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    key={item.id}
                    className="flex gap-4 bg-white/5 p-4 rounded-xl border border-white/5"
                  >
                    <div className="w-20 h-20 bg-white/10 rounded-lg overflow-hidden relative flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold uppercase text-sm">{item.name}</h3>
                        <p className="text-xs text-gray-400">Size: {item.size}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-lando">£{item.price}</span>
                        <button 
                          onClick={() => onRemoveItem(item.id)}
                          className="text-gray-500 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 bg-zinc-900">
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-400 uppercase text-sm tracking-widest">Total</span>
                <span className="text-2xl font-black italic">£{total}</span>
              </div>
              <button 
                disabled={items.length === 0}
                className="w-full bg-lando text-black py-4 font-black uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Checkout
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
