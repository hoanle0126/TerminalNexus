"use client";

import { motion } from "motion/react";
import { MOTION } from "@/lib/motion";
import type { ExperienceItem } from "./experienceData";

export function MobileTimeline({ items }: { items: ExperienceItem[] }) {
  return (
    <ol className="relative ml-4 border-l border-accent-primary/25">
      {items.map((item, i) => (
        <motion.li
          key={item.id}
          className="mb-10 ml-8"
          initial={MOTION.slideInLeft.hidden}
          whileInView={MOTION.slideInLeft.visible}
          transition={{ ...MOTION.timelineItem(i).transition }}
          viewport={{ once: true, margin: "-60px" }}
        >
          <span className="absolute -left-[9px] flex h-4 w-4 items-center justify-center rounded-full border-2 border-accent-primary bg-surface-deep">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-primary" />
          </span>
          <p className="mb-1 font-mono text-xs uppercase tracking-widest text-accent-primary/70">
            {item.period}
          </p>
          <h3 className="text-base font-bold text-white">{item.role}</h3>
          <p className="mb-2 text-sm text-slate-400">
            {item.company} · {item.location}
          </p>
          <p className="mb-3 text-sm leading-relaxed text-slate-500">{item.description}</p>
          <div className="mb-3 rounded-lg border border-accent-primary/20 bg-accent-primary/5 px-3 py-2">
            <p className="font-mono text-xs text-accent-primary">
              <span className="mr-2 text-accent-primary">{">"}  </span>
              {item.highlight}
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {item.stack.map((tech) => (
              <span
                key={tech}
                className="rounded border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-slate-400"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.li>
      ))}
    </ol>
  );
}
