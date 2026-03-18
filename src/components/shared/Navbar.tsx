"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { motion, AnimatePresence } from "motion/react";
import { MOTION } from "@/lib/motion";
import { Menu, X, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { NavItem } from "@/components/shared/NavItem";
import { NAV_ITEMS, useActiveSection } from "@/components/shared/useActiveSection";
import { siteConfig } from "@/config/site";

// ─── Component ────────────────────────────────────────────────────────────────
export function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();

  const { isScrolled, isActive } = useActiveSection(pathname);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // ── Close mobile on ESC ─────────────
  useEffect(() => {
    if (!isMobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMobileOpen]);

  // ── Lock body scroll when mobile open ─
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  const scrollToContact = useCallback(() => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <header
      role="banner"
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        isScrolled
          ? "border-b border-white/[0.06] bg-surface-nav/85 backdrop-blur-xl shadow-[0_1px_30px_rgb(0,0,0,0.5)]"
          : "bg-transparent"
      )}
    >
      {/* ── Desktop nav ───────────────────────────────────────────────────────── */}
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-10"
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label={`Home — ${siteConfig.name}`}
          className="cursor-target flex items-center gap-2 font-mono text-lg font-bold tracking-widest text-white transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/70 rounded"
        >
          <Terminal
            className="h-5 w-5 text-accent-primary shrink-0"
            aria-hidden="true"
          />
          <span className="bg-gradient-to-r from-accent-primary via-purple-400 to-green-400 bg-clip-text text-transparent">
            {siteConfig.displayName}
          </span>
          <span className="text-accent-primary/60 animate-pulse">_</span>
        </Link>

        {/* Desktop nav items */}
        <ul
          role="menubar"
          aria-label="Main menu"
          className="hidden md:flex items-center gap-3"
        >
          {NAV_ITEMS.map((item) => (
            <NavItem
              key={item.key}
              label={t(item.key)}
              href={item.href}
              isActive={isActive(item)}
            />
          ))}
        </ul>

        {/* Right area: locale + CTA */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language switcher */}
          <LanguageSwitcher />

          {/* Hire Me CTA */}
          <ShimmerButton
            shimmerColor="var(--accent-primary)"
            shimmerDuration="2.5s"
            background="rgba(var(--accent-primary-rgb), 0.07)"
            borderRadius="4px"
            className="font-mono text-sm tracking-[0.2em] uppercase text-accent-primary border-accent-primary/30 px-5 py-2.5 hover:border-accent-primary/60 transition-colors cursor-target"
            onClick={scrollToContact}
            aria-label="Hire me — navigate to contact section"
          >
            {t("hireMe")}
          </ShimmerButton>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsMobileOpen((v) => !v)}
          aria-label={isMobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileOpen}
          aria-controls="mobile-nav"
          className="md:hidden flex items-center justify-center w-9 h-9 rounded text-zinc-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/70"
        >
          <AnimatePresence mode="wait" initial={false}>
            {isMobileOpen ? (
              <motion.span
                key="close"
                {...MOTION.iconSwap(-1)}
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                {...MOTION.iconSwap(1)}
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </nav>

      {/* ── Mobile menu ───────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            {...MOTION.dropIn}
            className="md:hidden bg-surface-nav/96 backdrop-blur-2xl border-b border-white/[0.06]"
          >
            <ul
              role="menu"
              className="mx-auto max-w-7xl px-4 py-4 flex flex-col gap-1.5"
            >
              {NAV_ITEMS.map((item, i) => (
                <NavItem
                  key={item.key}
                  label={t(item.key)}
                  href={item.href}
                  isActive={isActive(item)}
                  onClick={() => setIsMobileOpen(false)}
                  mobile
                  index={i}
                />
              ))}

              {/* Locale + CTA */}
              <motion.li
                initial={MOTION.slideInLeft.hidden}
                animate={MOTION.slideInLeft.visible}
                transition={{
                  delay: NAV_ITEMS.length * 0.045,
                  duration: 0.18,
                  ease: "easeOut",
                }}
                className="mt-2 pt-3 border-t border-white/[0.05] flex items-center justify-between gap-3"
              >
                <div onClick={() => setIsMobileOpen(false)}>
                  <LanguageSwitcher />
                </div>

                <ShimmerButton
                  shimmerColor="var(--accent-primary)"
                  shimmerDuration="2.5s"
                  background="rgba(var(--accent-primary-rgb), 0.07)"
                  borderRadius="4px"
                  className="font-mono text-sm tracking-[0.2em] uppercase text-accent-primary border-accent-primary/30 px-5 py-2.5"
                  onClick={() => {
                    setIsMobileOpen(false);
                    setTimeout(() => {
                      document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                    }, 200);
                  }}
                >
                  {t("hireMe")}
                </ShimmerButton>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
