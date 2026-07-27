"use client";

import React from "react";
import { Home, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, Variants } from "framer-motion";

/**
 * Sidebar — Fixed on desktop (≥ 1024px), collapsible burger drawer on mobile/tablet.
 */

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const drawerVariants: Variants = {
  hidden: { x: "-100%" },
  visible: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
  exit: { x: "-100%", transition: { duration: 0.2, ease: "easeIn" } },
};

export function Sidebar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      {/* ── Mobile burger button ── */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-5 left-4 z-30 w-10 h-10 rounded-xl bg-[#0F1428] text-white flex items-center justify-center shadow-lg hover:bg-[#1a2040] transition-colors"
        aria-label="Open sidebar"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* ── Mobile overlay + drawer ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="sidebar-overlay"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.aside
              key="sidebar-drawer"
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="lg:hidden fixed left-0 top-0 w-[280px] h-screen bg-[#0F1428] text-white flex flex-col justify-between overflow-hidden z-50"
            >
              {/* Close button inside drawer */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Close sidebar"
              >
                <X className="w-4 h-4" />
              </button>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── Desktop sidebar (always visible ≥ 1024px) ── */}
      <aside className="hidden lg:flex w-[280px] h-screen fixed left-0 top-0 bg-[#0F1428] text-white flex-col justify-between overflow-hidden z-20">
        <SidebarContent />
      </aside>
    </>
  );
}

/** Shared content rendered in both desktop sidebar and mobile drawer. */
function SidebarContent() {
  return (
    <>
      <div className="p-6">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-500/30">
            S
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight leading-tight">Softayan</h2>
            <p className="text-sm text-blue-200/60 font-medium">Attendance</p>
          </div>
        </div>

        {/* Navigation */}
        <nav>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-blue-600/90 text-white font-medium hover:bg-blue-600 transition-colors shadow-lg shadow-blue-900/20"
          >
            <Home className="w-5 h-5" />
            Dashboard
          </a>
        </nav>
      </div>

      {/* Bottom Wave Graphic */}
      <div className="relative h-48 w-full mt-auto opacity-80 pointer-events-none">
        <svg
          viewBox="0 0 280 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 w-full h-full object-cover"
          preserveAspectRatio="none"
        >
          <path d="M0 100 C 60 140, 120 60, 280 120 L 280 200 L 0 200 Z" fill="url(#paint0_linear)" opacity="0.3" />
          <path d="M0 130 C 80 180, 160 80, 280 150 L 280 200 L 0 200 Z" fill="url(#paint1_linear)" opacity="0.5" />
          <path d="M0 160 C 100 200, 180 120, 280 180 L 280 200 L 0 200 Z" fill="url(#paint2_linear)" opacity="0.8" />
          <defs>
            <linearGradient id="paint0_linear" x1="0" y1="100" x2="280" y2="200" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3B82F6" />
              <stop offset="1" stopColor="#1E1B4B" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="paint1_linear" x1="0" y1="130" x2="280" y2="200" gradientUnits="userSpaceOnUse">
              <stop stopColor="#4F46E5" />
              <stop offset="1" stopColor="#1E1B4B" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="paint2_linear" x1="0" y1="160" x2="280" y2="200" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2563EB" />
              <stop offset="1" stopColor="#0F1428" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  );
}
