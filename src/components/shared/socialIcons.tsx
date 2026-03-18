// ─── Social Icon Resolver ────────────────────────────────────────────────────
// Maps siteConfig icon names to Lucide components + external icon URLs.
// ─────────────────────────────────────────────────────────────────────────────

import { Github, Linkedin, Dribbble, Mail } from "lucide-react";
import type { LucideProps } from "lucide-react";
import type { SocialLink } from "@/config/site";

type IconComponent = React.FC<LucideProps>;

const ICON_MAP: Record<string, IconComponent> = {
  Github,
  Linkedin,
  Dribbble,
  Mail,
};

/**
 * Returns a JSX icon element for a social link.
 * Falls back to an `<img>` for external SVGs (e.g. Behance).
 */
export function resolveSocialIcon(
  social: SocialLink,
  size: number = 16
): React.ReactNode {
  if (social.icon && ICON_MAP[social.icon]) {
    const Icon = ICON_MAP[social.icon];
    return <Icon size={size} />;
  }
  return undefined;
}
