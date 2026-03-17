"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// ─── Config — add new languages here ─────────────────────────────────────────
const LANGUAGES = [
  { code: "en", label: "English",    flag: "🇺🇸" },
  { code: "vi", label: "Tiếng Việt", flag: "🇻🇳" },
] as const;

type LanguageCode = (typeof LANGUAGES)[number]["code"];

// ─── Component ────────────────────────────────────────────────────────────────
export function LanguageSwitcher() {
  const locale = useLocale() as LanguageCode;
  const router = useRouter();
  const pathname = usePathname();

  const current = LANGUAGES.find((l) => l.code === locale) ?? LANGUAGES[0];

  function handleSelect(code: LanguageCode) {
    if (code === locale) return;
    router.replace(pathname, { locale: code });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label={`Language: ${current.label}. Click to change.`}
          className={cn(
            "relative overflow-hidden px-3 py-1.5 rounded-sm cursor-pointer cursor-target",
            "border font-mono text-sm tracking-wider",
            "border-cyan-400/60 text-cyan-300",
            "bg-cyan-400/10 hover:bg-cyan-400/20",
            "hover:border-cyan-400 hover:text-cyan-400",
            "transition-all duration-200",
            "flex items-center gap-1.5",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/70"
          )}
        >
          <span aria-hidden="true">{current.flag}</span>
          <span>{current.code.toUpperCase()}</span>
          <ChevronDown className="w-3 h-3 opacity-60 shrink-0" aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="bg-[#080c14] border border-cyan-400/30 rounded-sm min-w-[150px] p-1"
      >
        {LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleSelect(lang.code)}
            className={cn(
              "font-mono text-sm cursor-pointer rounded-sm px-3 py-2",
              "flex items-center gap-2",
              "focus:bg-cyan-400/10 focus:text-cyan-400",
              "hover:bg-cyan-400/10 hover:text-cyan-400",
              locale === lang.code
                ? "text-cyan-400 bg-cyan-400/5"
                : "text-zinc-400"
            )}
          >
            <span aria-hidden="true">{lang.flag}</span>
            <span className="flex-1">{lang.label}</span>
            {locale === lang.code && (
              <span className="text-cyan-400 text-xs ml-auto" aria-label="Active">
                ✓
              </span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
