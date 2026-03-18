"use client";

import React, { useCallback } from "react";
import { motion } from "motion/react";
import { MOTION } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { BorderBeam } from "@/components/ui/border-beam";

// ─── Types ──────────────────────────────────────────────────────────────────────

export interface NavItemProps {
  label: string;
  href: string;
  isActive: boolean;
  onClick?: () => void;
  mobile?: boolean;
  index?: number;
}

// ─── Component ──────────────────────────────────────────────────────────────────

export function NavItem({ label, href, isActive, onClick, mobile, index = 0 }: NavItemProps) {
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      // Extract the hash from the href (e.g. "/#about" → "#about")
      const hash = href.includes("#") ? `#${href.split("#")[1]}` : "";
      if (hash) {
        e.preventDefault();
        const target = document.querySelector(hash);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
          // Update browser URL without triggering navigation
          window.history.pushState(null, "", `${window.location.pathname}${hash}`);
        }
      } else {
        // For "/" (home), scroll to top
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        window.history.pushState(null, "", window.location.pathname);
      }
      onClick?.();
    },
    [href, onClick]
  );

  const inner = (
    <motion.div
      role="menuitem"
      className={cn(
        "relative overflow-hidden px-4 py-2 rounded-sm cursor-pointer select-none cursor-target",
        "border font-mono text-sm tracking-wider",
        mobile && "w-full px-4 py-2.5 text-sm",
        isActive
          ? "border-accent-primary/60 text-accent-primary"
          : "border-accent-primary/15 text-zinc-400 hover:border-accent-primary/50 hover:text-accent-primary transition-colors duration-200"
      )}
      animate={
        isActive
          ? {
              boxShadow: [
                "0 0 4px rgba(var(--accent-primary-rgb),0.15), inset 0 0 6px rgba(var(--accent-primary-rgb),0.05)",
                "0 0 16px rgba(var(--accent-primary-rgb),0.55), inset 0 0 12px rgba(var(--accent-primary-rgb),0.1)",
                "0 0 4px rgba(var(--accent-primary-rgb),0.15), inset 0 0 6px rgba(var(--accent-primary-rgb),0.05)",
              ],
            }
          : { boxShadow: "none" }
      }
      transition={
        isActive
          ? { duration: 2, repeat: Infinity, ease: "easeInOut" }
          : { duration: 0.2 }
      }
    >
      {/* Border-beam traveling light for active item */}
      {isActive && (
        <BorderBeam
          size={60}
          duration={2.5}
          colorFrom="var(--accent-primary)"
          colorTo="#818cf8"
          borderWidth={1}
        />
      )}

      {/* Scan line sweep */}
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-primary/12 to-transparent pointer-events-none"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.38, ease: "linear" }}
        aria-hidden="true"
      />

      {/* Bracket-wrap label */}
      <span className="relative z-10 flex items-center gap-0">
        <span className="text-accent-primary/35 font-mono">[</span>
        <span className={cn(isActive ? "text-accent-primary" : "text-zinc-400")}>{label}</span>
        <span className="text-accent-primary/35 font-mono">]</span>
      </span>
    </motion.div>
  );

  if (mobile) {
    return (
      <motion.li
        initial={MOTION.slideInLeft.hidden}
        animate={MOTION.slideInLeft.visible}
        transition={{ delay: index * 0.045, duration: 0.18, ease: "easeOut" }}
      >
        <a
          href={href}
          aria-current={isActive ? "page" : undefined}
          onClick={handleClick}
          className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/70 rounded-sm"
        >
          {inner}
        </a>
      </motion.li>
    );
  }

  return (
    <li>
      <a
        href={href}
        aria-current={isActive ? "page" : undefined}
        onClick={handleClick}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/70 rounded-sm"
      >
        {inner}
      </a>
    </li>
  );
}
