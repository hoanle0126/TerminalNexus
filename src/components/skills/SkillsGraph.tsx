"use client";

import { motion } from "motion/react";
import { MOTION } from "@/lib/motion";
import dec from "@/components/effects/decorative.module.css";
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
      className="relative w-full overflow-hidden py-24 bg-surface-deep"
    >
      {/* ── Background decoration ──────────────────────────────────── */}
      <div className={`pointer-events-none absolute inset-0 opacity-[0.025] ${dec.gridCyan}`} />
      <div className={`pointer-events-none absolute inset-0 ${dec.glowSkills}`} />

      {/* ── Content ────────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">

        {/* Section heading */}
        <motion.div
          className="mb-14 text-center"
          initial={MOTION.fadeInDown.hidden}
          whileInView={MOTION.fadeInDown.visible}
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
          initial={MOTION.fadeInUpSmall.hidden}
          whileInView={MOTION.fadeInUpSmall.visible}
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
