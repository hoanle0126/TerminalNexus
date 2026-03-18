"use client";

import { motion } from "motion/react";
import { CENTER } from "./networkGraphTypes";
import { siteConfig } from "@/config/site";

export function CenterNode() {
  return (
    <motion.div
      className="absolute"
      style={{ left: `${CENTER.x}%`, top: `${CENTER.y}%`, zIndex: 20 }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        animate={{ y: [-2, 0, -2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="-translate-x-1/2 -translate-y-1/2"
      >
        {/* Outer ring */}
        <motion.div
           animate={{ boxShadow: [
            "0 0 20px 4px rgba(168,85,247,0.5), 0 0 40px 8px rgba(var(--accent-primary-rgb),0.15)",
            "0 0 30px 8px rgba(168,85,247,0.7), 0 0 60px 12px rgba(var(--accent-primary-rgb),0.25)",
            "0 0 20px 4px rgba(168,85,247,0.5), 0 0 40px 8px rgba(var(--accent-primary-rgb),0.15)",
          ]}}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-[100px] h-[100px] rounded-full border-2 border-purple-500 flex items-center justify-center"
          style={{ background: "rgba(5, 10, 25, 0.95)" }}
        >
          {/* Inner ring */}
          <div className="w-[82px] h-[82px] rounded-full border border-accent-primary/70 flex items-center justify-center">
            <span className="font-mono text-[11px] font-bold text-white tracking-widest text-center leading-tight">
              {siteConfig.shortName.split("\n").map((line, i) => (
                <span key={i}>{i > 0 && <br />}{line}</span>
              ))}
            </span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
