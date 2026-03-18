"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { BorderBeam } from "@/components/ui/border-beam";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

// ─── Types ────────────────────────────────────────────────────────────────────
interface NavItemDef {
  key: "home" | "about" | "skills" | "projects" | "contact";
  href: string;
  sectionId: string; // The DOM id to observe
}

interface NavItemProps {
  label: string;
  href: string;
  isActive: boolean;
  onClick?: () => void;
  mobile?: boolean;
  index?: number;
}

// ─── Config ───────────────────────────────────────────────────────────────────
const NAV_ITEMS: NavItemDef[] = [
  { key: "home",     href: "/",          sectionId: "home" },
  { key: "about",    href: "/#about",    sectionId: "about" },
  { key: "skills",   href: "/#skills",   sectionId: "skills" },
  { key: "projects", href: "/#projects", sectionId: "projects" },
  { key: "contact",  href: "/#contact",  sectionId: "contact" },
];

const SCROLL_THRESHOLD = 20;

// ─── NavItem ──────────────────────────────────────────────────────────────────
function NavItem({ label, href, isActive, onClick, mobile, index = 0 }: NavItemProps) {
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
          ? "border-cyan-400/60 text-cyan-300"
          : "border-cyan-400/15 text-zinc-400 hover:border-cyan-400/50 hover:text-cyan-300 transition-colors duration-200"
      )}
      animate={
        isActive
          ? {
              boxShadow: [
                "0 0 4px rgba(0,255,255,0.15), inset 0 0 6px rgba(0,255,255,0.05)",
                "0 0 16px rgba(0,255,255,0.55), inset 0 0 12px rgba(0,255,255,0.1)",
                "0 0 4px rgba(0,255,255,0.15), inset 0 0 6px rgba(0,255,255,0.05)",
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
          colorFrom="#22d3ee"
          colorTo="#818cf8"
          borderWidth={1}
        />
      )}

      {/* Scan line sweep */}
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/12 to-transparent pointer-events-none"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.38, ease: "linear" }}
        aria-hidden="true"
      />

      {/* Bracket-wrap label */}
      <span className="relative z-10 flex items-center gap-0">
        <span className="text-cyan-400/35 font-mono">[</span>
        <span className={cn(isActive ? "text-cyan-300" : "text-zinc-400")}>{label}</span>
        <span className="text-cyan-400/35 font-mono">]</span>
      </span>
    </motion.div>
  );

  if (mobile) {
    return (
      <motion.li
        initial={{ opacity: 0, x: -14 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.045, duration: 0.18, ease: "easeOut" }}
      >
        <a
          href={href}
          aria-current={isActive ? "page" : undefined}
          onClick={handleClick}
          className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/70 rounded-sm"
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
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/70 rounded-sm"
      >
        {inner}
      </a>
    </li>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // ── Scroll detection (header bg) + active section tracking ──
  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.sectionId);

    const detectActiveSection = () => {
      // Header background toggle
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);

      // At the very top → home
      if (window.scrollY < 100) {
        setActiveSection("home");
        return;
      }

      // Walk through sections in DOM order; pick the last one whose
      // top has scrolled past the navbar (80px offset).
      const OFFSET = 120; // px below viewport top to consider "entered"
      let current = "home";

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        // Section top is above the offset line → we're inside or past it
        if (rect.top <= OFFSET) {
          current = id;
        }
      }

      setActiveSection(current);
    };

    detectActiveSection();
    window.addEventListener("scroll", detectActiveSection, { passive: true });
    return () => window.removeEventListener("scroll", detectActiveSection);
  }, [pathname]);

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

  // ── Active detection ─────────────────
  const isActive = useCallback(
    (item: NavItemDef) => {
      return activeSection === item.sectionId;
    },
    [activeSection]
  );

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
          ? "border-b border-white/[0.06] bg-[#0a0a0a]/85 backdrop-blur-xl shadow-[0_1px_30px_rgb(0,0,0,0.5)]"
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
          aria-label="Home — Lê Hoàn"
          className="cursor-target flex items-center gap-2 font-mono text-lg font-bold tracking-widest text-white transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/70 rounded"
        >
          <Terminal
            className="h-5 w-5 text-cyan-400 shrink-0"
            aria-hidden="true"
          />
          <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
            LE HOAN
          </span>
          <span className="text-cyan-400/60 animate-pulse">_</span>
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
            shimmerColor="#22d3ee"
            shimmerDuration="2.5s"
            background="rgba(6, 182, 212, 0.07)"
            borderRadius="4px"
            className="font-mono text-sm tracking-[0.2em] uppercase text-cyan-300 border-cyan-500/30 px-5 py-2.5 hover:border-cyan-400/60 transition-colors cursor-target"
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
          className="md:hidden flex items-center justify-center w-9 h-9 rounded text-zinc-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/70"
        >
          <AnimatePresence mode="wait" initial={false}>
            {isMobileOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
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
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden bg-[#0a0a0a]/96 backdrop-blur-2xl border-b border-white/[0.06]"
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
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
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
                  shimmerColor="#22d3ee"
                  shimmerDuration="2.5s"
                  background="rgba(6, 182, 212, 0.07)"
                  borderRadius="4px"
                  className="font-mono text-sm tracking-[0.2em] uppercase text-cyan-300 border-cyan-500/30 px-5 py-2.5"
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
