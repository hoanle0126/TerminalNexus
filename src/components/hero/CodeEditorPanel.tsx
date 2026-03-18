"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { MOTION } from "@/lib/motion";
import dec from "@/components/effects/decorative.module.css";
import { siteConfig } from "@/config/site";
import { CODE_LINES, TERMINAL_LINES, type CodeToken } from "@/config/hero";

// ─── Color map ───────────────────────────────────────────────────────────────
const COLOR: Record<CodeToken["kind"], string> = {
  keyword:     "text-blue-400",
  type:        "text-yellow-300",
  string:      "text-green-400",
  prop:        "text-accent-primary",
  value:       "text-orange-300",
  comment:     "text-zinc-500 italic",
  plain:       "text-zinc-300",
  bracket:     "text-zinc-400",
  punctuation: "text-zinc-500",
};

// ─── Component ───────────────────────────────────────────────────────────────
export default function CodeEditorPanel() {
  const [terminalVisible, setTerminalVisible] = useState(0);

  // Animate terminal lines in after 300ms delay (starts when mounted = revealed)
  useEffect(() => {
    if (terminalVisible >= TERMINAL_LINES.length) return;
    const delay = terminalVisible === 0 ? 300 : 500;
    const t = setTimeout(() => setTerminalVisible((v) => v + 1), delay);
    return () => clearTimeout(t);
  }, [terminalVisible]);

  return (
    <div
      className="relative w-full h-full rounded-xl overflow-hidden
                 border border-accent-primary/20
                 shadow-[0_0_32px_rgba(var(--accent-primary-rgb),0.10),0_0_80px_rgba(var(--accent-primary-rgb),0.05)]
                 cursor-default select-none"
      aria-label="VSCode-style developer profile"
    >
      {/* ── Background ── */}
      <div className={`absolute inset-0 ${dec.editorBg}`} />

      {/* ── Scanline overlay ── */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 opacity-[0.04] z-10 ${dec.scanlinesCyan}`}
      />

      {/* ── Title bar ── */}
      <div className="relative z-20 flex items-center gap-2 px-4 py-2.5 border-b border-accent-primary/10 bg-black/40">
        {/* Traffic lights */}
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <span className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        {/* Tabs */}
        <div className="ml-3 flex items-center gap-1 text-[11px] font-mono">
          <span className="px-3 py-1 rounded-t bg-surface-editor text-accent-primary/80 border-t border-x border-accent-primary/20 -mb-[1px]">
            {siteConfig.editorTabName}
            <span className="ml-1.5 w-1.5 h-1.5 rounded-full bg-orange-400 inline-block" />
          </span>
        </div>
        <span className="ml-auto text-[10px] font-mono text-accent-primary/40 tracking-widest uppercase">portfolio</span>
      </div>

      {/* ── Editor body ── */}
      <div className="relative z-20 flex">
        {/* Sidebar - file tree hint */}
        <div className="w-[36px] border-r border-accent-primary/10 bg-black/20 flex flex-col gap-0.5 py-2 px-1.5 shrink-0">
          {CODE_LINES.map((_, i) => (
            <span key={i} className="text-[10px] font-mono text-zinc-700 text-right leading-[1.6] select-none">
              {i + 1}
            </span>
          ))}
        </div>

        {/* Code content */}
        <div className="flex-1 p-3 overflow-hidden">
          {CODE_LINES.map((tokens, lineIdx) => (
            <div key={lineIdx} className="text-[11px] md:text-xs font-mono leading-[1.6] whitespace-pre min-h-[1.6em]">
              {tokens.map((token, ti) => (
                <span key={ti} className={COLOR[token.kind]}>
                  {token.text}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="relative z-20 border-t border-accent-primary/10 mx-0 px-3 py-1 bg-black/30 text-[9px] font-mono text-accent-primary/40 tracking-widest uppercase">
        ─── TERMINAL ──────────────────────────────
      </div>

      {/* ── Terminal output ── */}
      <div className="relative z-20 px-4 py-2.5 min-h-[72px] bg-black/20">
        {TERMINAL_LINES.slice(0, terminalVisible).map((line, i) => (
          <motion.div
            key={i}
            initial={MOTION.slideInSmallLeft.hidden}
            animate={MOTION.slideInSmallLeft.visible}
            className={`text-[11px] md:text-xs font-mono leading-relaxed ${line.color}`}
          >
            {line.text}
          </motion.div>
        ))}
        {terminalVisible < TERMINAL_LINES.length && (
          <span className="inline-block w-1.5 h-3.5 bg-accent-primary animate-pulse opacity-80 align-middle" />
        )}
      </div>
    </div>
  );
}
