"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "motion/react";

// ─── Syntax token types ──────────────────────────────────────────────────────
type TokenKind =
  | "keyword"
  | "type"
  | "string"
  | "prop"
  | "value"
  | "comment"
  | "plain"
  | "bracket"
  | "punctuation";

interface Token {
  text: string;
  kind: TokenKind;
}

type CodeLine = Token[];

// ─── Color map ───────────────────────────────────────────────────────────────
const COLOR: Record<TokenKind, string> = {
  keyword:     "text-blue-400",
  type:        "text-yellow-300",
  string:      "text-green-400",
  prop:        "text-cyan-300",
  value:       "text-orange-300",
  comment:     "text-zinc-500 italic",
  plain:       "text-zinc-300",
  bracket:     "text-zinc-400",
  punctuation: "text-zinc-500",
};

// ─── Code content ────────────────────────────────────────────────────────────
const CODE_LINES: CodeLine[] = [
  [{ text: "import", kind: "keyword" }, { text: " { Developer } ", kind: "plain" }, { text: "from", kind: "keyword" }, { text: " '@/types'", kind: "string" }],
  [],
  [{ text: "const ", kind: "keyword" }, { text: "leHoan", kind: "plain" }, { text: ": ", kind: "punctuation" }, { text: "Developer", kind: "type" }, { text: " = {", kind: "bracket" }],
  [{ text: "  name", kind: "prop" }, { text: ":       ", kind: "punctuation" }, { text: '"Lê Hoàn"', kind: "string" }, { text: ",", kind: "punctuation" }],
  [{ text: "  role", kind: "prop" }, { text: ":       ", kind: "punctuation" }, { text: '"Full-Stack Developer"', kind: "string" }, { text: ",", kind: "punctuation" }],
  [{ text: "  location", kind: "prop" }, { text: ":   ", kind: "punctuation" }, { text: '"Vietnam 🇻🇳"', kind: "string" }, { text: ",", kind: "punctuation" }],
  [{ text: "  experience", kind: "prop" }, { text: ": ", kind: "punctuation" }, { text: '"2yr freelance"', kind: "string" }, { text: ",", kind: "punctuation" }],
  [{ text: "  japanese", kind: "prop" }, { text: ":   ", kind: "punctuation" }, { text: '"JLPT N3 日本語"', kind: "string" }, { text: ",", kind: "punctuation" }],
  [{ text: "  stack", kind: "prop" }, { text: ": {", kind: "bracket" }],
  [{ text: "    frontend", kind: "prop" }, { text: ": ", kind: "punctuation" }, { text: '["Next.js","React","TS"]', kind: "string" }, { text: ",", kind: "punctuation" }],
  [{ text: "    backend", kind: "prop" }, { text: ":  ", kind: "punctuation" }, { text: '["Node.js","PostgreSQL"]', kind: "string" }, { text: ",", kind: "punctuation" }],
  [{ text: "    cloud", kind: "prop" }, { text: ":    ", kind: "punctuation" }, { text: '["AWS","Docker"]', kind: "string" }, { text: ",", kind: "punctuation" }],
  [{ text: "  },", kind: "bracket" }],
  [{ text: "  status", kind: "prop" }, { text: ":     ", kind: "punctuation" }, { text: '"available_for_hire"', kind: "string" }, { text: " ✓", kind: "value" }],
  [{ text: "}", kind: "bracket" }],
];

const TERMINAL_LINES = [
  { text: "$ node portfolio.ts",          color: "text-zinc-400" },
  { text: "> Loading profile...  100%",   color: "text-cyan-300" },
  { text: "> Status: ONLINE — Ready to build.", color: "text-green-400" },
];

// ─── Component ───────────────────────────────────────────────────────────────
export default function CodeEditorPanel() {
  const [terminalVisible, setTerminalVisible] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // 3D tilt motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-6, 6]);
  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 25 });
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 25 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  // Animate terminal lines in after 1.2s delay
  useEffect(() => {
    if (terminalVisible >= TERMINAL_LINES.length) return;
    const delay = terminalVisible === 0 ? 1200 : 500;
    const t = setTimeout(() => setTerminalVisible((v) => v + 1), delay);
    return () => clearTimeout(t);
  }, [terminalVisible]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.93, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 800,
      }}
      className="relative w-full max-w-[420px] rounded-xl overflow-hidden
                 border border-cyan-400/20
                 shadow-[0_0_32px_rgba(0,255,255,0.10),0_0_80px_rgba(0,255,255,0.05)]
                 cursor-default select-none"
      aria-label="VSCode-style developer profile"
    >
      {/* ── Background ── */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #0d1117 0%, #0a0f1a 60%, #060d14 100%)",
        }}
      />

      {/* ── Scanline overlay ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04] z-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,1) 3px)",
        }}
      />

      {/* ── Title bar ── */}
      <div className="relative z-20 flex items-center gap-2 px-4 py-2.5 border-b border-cyan-400/10 bg-black/40">
        {/* Traffic lights */}
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <span className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        {/* Tabs */}
        <div className="ml-3 flex items-center gap-1 text-[11px] font-mono">
          <span className="px-3 py-1 rounded-t bg-[#0d1117] text-cyan-400/80 border-t border-x border-cyan-400/20 -mb-[1px]">
            le-hoan.ts
            <span className="ml-1.5 w-1.5 h-1.5 rounded-full bg-orange-400 inline-block" />
          </span>
        </div>
        <span className="ml-auto text-[10px] font-mono text-cyan-400/40 tracking-widest uppercase">portfolio</span>
      </div>

      {/* ── Editor body ── */}
      <div className="relative z-20 flex">
        {/* Sidebar - file tree hint */}
        <div className="w-[36px] border-r border-cyan-400/10 bg-black/20 flex flex-col gap-0.5 py-2 px-1.5 shrink-0">
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
      <div className="relative z-20 border-t border-cyan-400/10 mx-0 px-3 py-1 bg-black/30 text-[9px] font-mono text-cyan-400/40 tracking-widest uppercase">
        ─── TERMINAL ──────────────────────────────
      </div>

      {/* ── Terminal output ── */}
      <div className="relative z-20 px-4 py-2.5 min-h-[72px] bg-black/20">
        {TERMINAL_LINES.slice(0, terminalVisible).map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
            className={`text-[11px] md:text-xs font-mono leading-relaxed ${line.color}`}
          >
            {line.text}
          </motion.div>
        ))}
        {terminalVisible < TERMINAL_LINES.length && (
          <span className="inline-block w-1.5 h-3.5 bg-cyan-400 animate-pulse opacity-80 align-middle" />
        )}
      </div>
    </motion.div>
  );
}
