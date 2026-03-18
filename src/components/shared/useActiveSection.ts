import { useState, useEffect, useCallback } from "react";

// ─── Types ──────────────────────────────────────────────────────────────────────

export interface NavItemDef {
  key: "home" | "about" | "skills" | "projects" | "contact";
  href: string;
  sectionId: string; // The DOM id to observe
}

// ─── Config ─────────────────────────────────────────────────────────────────────

export const NAV_ITEMS: NavItemDef[] = [
  { key: "home",     href: "/",          sectionId: "home" },
  { key: "about",    href: "/#about",    sectionId: "about" },
  { key: "skills",   href: "/#skills",   sectionId: "skills" },
  { key: "projects", href: "/#projects", sectionId: "projects" },
  { key: "contact",  href: "/#contact",  sectionId: "contact" },
];

const SCROLL_THRESHOLD = 20;

// ─── Hook ───────────────────────────────────────────────────────────────────────

export function useActiveSection(pathname: string) {
  const [isScrolled, setIsScrolled] = useState(false);
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

  const isActive = useCallback(
    (item: NavItemDef) => activeSection === item.sectionId,
    [activeSection]
  );

  return { isScrolled, isActive };
}
