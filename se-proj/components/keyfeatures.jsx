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
    desc: "Earn badges after 3-month internships.",
  },
];

/* infinite gentle float for icons */
const floatIcon = {
  animate: {
    y: [-5, 5, -5],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
};

export default function KeyFeatures() {
  return (
    <section id="features" className="py-16 bg-white text-center">
      <h2 className="text-4xl font-bold mb-10 text-black">Key Features</h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 px-6">
        {FEATURES.map(({ Icon, title, desc }) => (
          /* gradient wrapper now handles the scale-pop */
          <div
            key={title}
            className="group rounded-lg p-[2px] bg-gradient-to-r from-[#EC1024] to-[#FF6F1B]
               transition-transform duration-300 ease-out
               hover:scale-105"
          >
            {/* inner card no longer scales, but still gets a lifted shadow */}
            <div className="p-6 rounded-lg bg-white group-hover:shadow-xl">
              <motion.div variants={floatIcon} animate="animate">
                <Icon className="mx-auto h-10 w-10 text-[#EC1024]" />
              </motion.div>

              <h3 className="mt-4 text-xl font-semibold text-black">{title}</h3>
              <p className="mt-2 text-gray-700">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
