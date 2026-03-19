import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { JetBrains_Mono, Inter } from "next/font/google";
import { Navbar } from "@/components/shared/Navbar";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { TargetCursorLoader } from "@/components/effects/TargetCursorLoader";
import { BackgroundNoise } from "@/components/effects/BackgroundNoise";
import { ScrollToTop } from "@/components/effects/ScrollToTop";
import ThemeProvider from "@/components/effects/ThemeProvider";
import BootLoader from "@/components/effects/BootLoader";
import AnalyticsProvider from "@/components/effects/AnalyticsProvider";
import { siteConfig } from "@/config/site";

// ─── Fonts ────────────────────────────────────────────────────────────────────
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

// ─── SEO Metadata ─────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  const baseUrl = siteConfig.domain;
  const title = t("title");
  const description = t("description");

  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        en: `${baseUrl}/en`,
        vi: `${baseUrl}/vi`,
      },
    },
    openGraph: {
      type: "website",
      url: `${baseUrl}/${locale}`,
      title,
      description,
      siteName: siteConfig.ogSiteName,
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}/og-image.png`],
      creator: siteConfig.twitterHandle,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: "/favicon.ico",
    },
  };
}

// ─── JSON-LD Structured Data ──────────────────────────────────────────────────
function buildJsonLd(locale: string) {
  const baseUrl = siteConfig.domain;
  const canonicalUrl = `${baseUrl}/${locale}`;

  const person = {
    "@type": "Person",
    name: siteConfig.name,
    url: canonicalUrl,
    jobTitle: siteConfig.jobTitle,
    ...(siteConfig.worksFor
      ? { worksFor: { "@type": "Organization", name: siteConfig.worksFor } }
      : {}),
    sameAs: siteConfig.socials
      .filter((s) => s.href.startsWith("http"))
      .map((s) => s.href),
  };

  const website = {
    "@type": "WebSite",
    name: siteConfig.ogSiteName,
    url: baseUrl,
    description: "",
  };

  return {
    "@context": "https://schema.org",
    "@graph": [person, website],
  };
}

// ─── Layout ───────────────────────────────────────────────────────────────────
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = (await import(`../../../messages/${locale}.json`)).default;

  const jsonLd = buildJsonLd(locale);

  return (
    <html lang={locale} className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        {/* JSON-LD structured data — Person + WebSite schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased text-white min-h-screen`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          {/* Boot loading screen — session-aware, shows once */}
          <BootLoader />
          {/* Theme accent color injector */}
          <ThemeProvider />
          {/* Global background noise overlay — CRT scanlines + film grain */}
          <BackgroundNoise />
          {/* Custom crosshair cursor — SSR false, mobile-safe */}
          <TargetCursorLoader />
          {/* Scroll-progress must be outside Navbar to avoid z-index conflicts */}
          <ScrollProgress />
          <Navbar />
          {/* Page content pushed below fixed navbar */}
          <main id="main-content" className="pt-14">
            {children}
          </main>
          {/* Floating scroll-to-top button with progress ring */}
          <ScrollToTop />
          {/* Analytics — GA4 / Plausible (opt-in via siteConfig.analytics) */}
          <AnalyticsProvider />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
