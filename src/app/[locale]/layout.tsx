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

  return (
    <html lang={locale} className="dark scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased text-white min-h-screen`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
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
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
