"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { BorderBeam } from "@/components/ui/border-beam";

// ─── Types ────────────────────────────────────────────────────────────────────
interface NavItemDef {
  key: "home" | "about" | "skills" | "projects" | "contact";
  href: string;
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
  { key: "home",     href: "/" },
  { key: "about",    href: "/#about" },
  { key: "skills",   href: "/#skills" },
  { key: "projects", href: "/#projects" },
  { key: "contact",  href: "/#contact" },
];

const SCROLL_THRESHOLD = 20;

// ─── NavItem ──────────────────────────────────────────────────────────────────
function NavItem({ label, href, isActive, onClick, mobile, index = 0 }: NavItemProps) {
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
      // Active: breathing glow via boxShadow animation (Framer Motion fallback)
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

      {/* Scan line sweep: horizontal gradient, clips inside overflow-hidden parent */}
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
        <Link
          href={href}
          aria-current={isActive ? "page" : undefined}
          onClick={onClick}
          className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/70 rounded-sm"
        >
          {inner}
        </Link>
      </motion.li>
    );
  }

  return (
    <li>
      <Link
        href={href}
        aria-current={isActive ? "page" : undefined}
        onClick={onClick}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/70 rounded-sm"
      >
        {inner}
      </Link>
    </li>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();

  const locale = (params.locale as string) ?? "en";
  const otherLocale = locale === "en" ? "vi" : "en";

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");

  // ── Scroll detection ────────────────
  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Hash tracking for active nav ────
  useEffect(() => {
    const onHashChange = () => setActiveHash(window.location.hash);
    onHashChange();
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
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
    (href: string) => {
      if (href === "/") return pathname === "/" && !activeHash;
      return activeHash === href.replace("/", "");
    },
    [pathname, activeHash]
  );

  const handleLocaleSwitch = useCallback(() => {
    router.replace(pathname, { locale: otherLocale });
  }, [router, pathname, otherLocale]);

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
          className="flex items-center gap-2 font-mono text-lg font-bold tracking-widest text-white transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/70 rounded"
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
          {NAV_ITEMS.map(({ key, href }) => (
            <NavItem
              key={key}
              label={t(key)}
              href={href}
              isActive={isActive(href)}
            />
          ))}
        </ul>

        {/* Right area: locale + CTA */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language toggle — styled as bracket item */}
          <motion.button
            onClick={handleLocaleSwitch}
            aria-label={`Switch to ${otherLocale === "vi" ? "Vietnamese" : "English"}`}
            className={cn(
              "relative overflow-hidden px-4 py-2 rounded-sm cursor-pointer cursor-target",
              "border font-mono text-sm tracking-wider",
              "border-cyan-400/15 text-zinc-500 hover:border-cyan-400/40 hover:text-cyan-400",
              "transition-colors duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/70"
            )}
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent pointer-events-none"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.38, ease: "linear" }}
              aria-hidden="true"
            />
            <span className="relative z-10">
              <span className="text-cyan-400/30">[</span>
              {otherLocale.toUpperCase()}
              <span className="text-cyan-400/30">]</span>
            </span>
          </motion.button>

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
              {NAV_ITEMS.map(({ key, href }, i) => (
                <NavItem
                  key={key}
                  label={t(key)}
                  href={href}
                  isActive={isActive(href)}
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
                <button
                  onClick={() => {
                    handleLocaleSwitch();
                    setIsMobileOpen(false);
                  }}
                  className="relative overflow-hidden px-4 py-2 rounded-sm border border-cyan-400/15 font-mono text-sm uppercase tracking-wider text-zinc-500 hover:text-cyan-400 hover:border-cyan-400/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/70"
                >
                  <span className="text-cyan-400/30">[</span>
                  {otherLocale.toUpperCase()}
                  <span className="text-cyan-400/30">]</span>
                </button>

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
