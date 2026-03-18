"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { CLUSTERS } from "./skillsData";

// Defer heavy canvas/svg work to avoid SSR issues
const NetworkGraph = dynamic(() => import("./NetworkGraph"), { ssr: false });

export default function SkillsGraph() {
  const t = useTranslations("skills");

  return (
    <section
      id="skills"
      className="relative w-full overflow-hidden py-24"
      style={{ background: "#040d1a" }}
    >
      {/* ── Background decoration ──────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(168,85,247,0.06) 0%, rgba(0,255,255,0.03) 40%, transparent 70%)",
        }}
      />

      {/* ── Content ────────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">

        {/* Section heading */}
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <p className="mb-2 font-mono text-sm tracking-widest text-purple-400/60">
            {"// 03. SKILLS"}
          </p>
          <h2 className="text-4xl font-bold font-mono tracking-tight text-white md:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-3 font-mono text-sm text-gray-500">
            {t("subtitle")}
          </p>
          <div className="mx-auto mt-5 h-px w-24 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
        </motion.div>

        {/* Network graph */}
        <NetworkGraph />

        {/* Cluster legend */}
        <motion.div
          className="mt-10 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {CLUSTERS.map((cluster) => (
            <div key={cluster.id} className="flex items-center gap-2">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: cluster.color, boxShadow: `0 0 6px ${cluster.color}80` }}
              />
              <span className="font-mono text-xs text-gray-400">
                {cluster.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
