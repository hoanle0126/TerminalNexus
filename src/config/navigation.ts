// ─── Navigation Configuration ────────────────────────────────────────────────
// Section IDs, nav items, and footer quick links.
// Template buyers: add/remove/reorder sections here.
// ─────────────────────────────────────────────────────────────────────────────

export interface NavItem {
  /** Translation key — looked up via `t('nav.<key>')` */
  key: string;
  /** Anchor href — must match the section `id` attribute */
  href: string;
}

/** Primary navigation items — used in Navbar + Footer quick links */
export const NAV_ITEMS: NavItem[] = [
  { key: "home", href: "#home" },
  { key: "about", href: "#about" },
  { key: "skills", href: "#skills" },
  { key: "projects", href: "#projects" },
  { key: "contact", href: "#contact" },
];

/** Section IDs tracked by the useActiveSection hook */
export const SECTION_IDS = NAV_ITEMS.map((item) => item.href.replace("#", ""));
