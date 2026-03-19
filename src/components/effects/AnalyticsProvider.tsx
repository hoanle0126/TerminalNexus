"use client";

import Script from "next/script";
import { siteConfig } from "@/config/site";

// ─── Analytics Provider ───────────────────────────────────────────────────────
// Config-driven analytics injection.
// To enable: set `siteConfig.analytics.ga4Id` and/or `siteConfig.analytics.plausibleDomain`.
// To disable: leave the corresponding field as an empty string "".
// ─────────────────────────────────────────────────────────────────────────────

export default function AnalyticsProvider() {
  const { ga4Id, plausibleDomain } = siteConfig.analytics;

  return (
    <>
      {/* ─── Google Analytics 4 ─────────────────────────────────────────── */}
      {ga4Id && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${ga4Id}', { page_path: window.location.pathname });
            `}
          </Script>
        </>
      )}

      {/* ─── Plausible Analytics ────────────────────────────────────────── */}
      {plausibleDomain && (
        <Script
          defer
          data-domain={plausibleDomain}
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      )}
    </>
  );
}
