"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Activity,
  FolderKey,
  BarChart3,
  Video,
  Medal,
} from "lucide-react";

const FEATURES = [
  {
    Icon: Sparkles,
    title: "Smart Match AI",
    desc: "Recommends best-fit internships & candidates.",
  },
  {
    Icon: Activity,
    title: "Real-Time Tracker",
    desc: "Live status badges—Pending → Accepted.",
  },
  {
    Icon: FolderKey,
    title: "One-Click Vault",
    desc: "Drag-and-drop docs; secure share links.",
  },
  {
    Icon: BarChart3,
    title: "360° Analytics",
    desc: "Instant insights on reports & companies.",
  },
  {
    Icon: Video,
    title: "Video & Screen-Share",
    desc: "HD calls for report reviews & guidance.",
  },
  {
    Icon: Medal,
    title: "Gamified PRO Badge",
    desc: "Earn badges after 3‑month internships.",
  },
];

/* infinite gentle float for icons (unchanged) */
const floatIcon = {
  animate: {
    y: [-5, 5, -5],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
};

/* tri‑direction helper ─ returns variant per index */
const slideVariant = (idx) => {
  const col = idx % 3; // 0 = left, 1 = middle, 2 = right
  const offset = col === 0 ? -60 : col === 2 ? 60 : 0;
  const yStart = col === 1 ? 60 : 0;
  return {
    hidden: { opacity: 0, x: offset, y: yStart },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.45, ease: "easeOut" },
    },
  };
};

export default function KeyFeatures() {
  return (
    <section id="features" className="py-16 bg-white text-center">
      <h2 className="text-4xl font-bold mb-10 text-black">Key Features</h2>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 px-6"
      >
        {FEATURES.map(({ Icon, title, desc }, idx) => (
          <motion.div key={title} variants={slideVariant(idx)}>
            {/* gradient wrapper with hover scale‑pop */}
            <div
              className="group rounded-lg p-[2px] bg-gradient-to-r from-[#EC1024] to-[#FF6F1B]
                         transition-transform duration-300 ease-out hover:scale-105"
            >
              <div className="p-6 rounded-lg bg-white group-hover:shadow-xl">
                <motion.div variants={floatIcon} animate="animate">
                  <Icon className="mx-auto h-10 w-10 text-[#EC1024]" />
                </motion.div>

                <h3 className="mt-4 text-xl font-semibold text-black">
                  {title}
                </h3>
                <p className="mt-2 text-gray-700">{desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
