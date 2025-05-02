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

/* gentle icon float */
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
          <div
            key={title}
            className="group"
            style={{ perspective: "1000px" }} /* depth for tilt */
          >
            {/* single card with 3-D hover transform */}
            <div
              className="
                p-6 rounded-lg bg-black text-white
                transition-transform duration-300 ease-out
                [transform-style:preserve-3d]
                group-hover:[transform:rotateX(6deg)_rotateY(-6deg)_scale(1.04)]
                group-hover:shadow-2xl
              "
            >
              <motion.div variants={floatIcon} animate="animate">
                <Icon className="mx-auto h-10 w-10 text-white" />
              </motion.div>

              <h3 className="mt-4 text-xl font-semibold text-white">
                <span
                  className="
      px-1
      bg-[linear-gradient(90deg,#EC1024,#FF6F1B)]
      bg-[length:100%_3em]   /* 0.4 em-tall marker */
      bg-left-bottom bg-no-repeat
      bg-opacity-60            /* see-through ink */
    "
                >
                  {title}
                </span>
              </h3>

              <p className="mt-2">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
