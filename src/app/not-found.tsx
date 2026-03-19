// ─── Root-level 404 ───────────────────────────────────────────────────────────
// Triggers for ALL unmatched routes (any URL that doesn't match any route).
// Must include <html>/<body> — the root layout is NOT applied here.
// For locale-aware 404s triggered by notFound() inside [locale], see
// src/app/[locale]/not-found.tsx instead.
// ─────────────────────────────────────────────────────────────────────────────

export default function RootNotFound() {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: "'JetBrains Mono', monospace",
          background: "#0a0a0f",
          color: "#e2e8f0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        {/* Ghosted error code */}
        <div
          style={{
            fontSize: "clamp(6rem, 20vw, 10rem)",
            fontWeight: 700,
            color: "rgba(0,255,136,0.1)",
            lineHeight: 1,
            userSelect: "none",
            marginBottom: "1rem",
          }}
          aria-hidden="true"
        >
          404
        </div>

        <h1
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "1.5rem",
            letterSpacing: "0.2em",
            color: "#00ff88",
            textTransform: "uppercase",
            marginBottom: "1.5rem",
          }}
        >
          SIGNAL_LOST
        </h1>

        {/* Terminal block */}
        <div
          style={{
            width: "100%",
            maxWidth: "480px",
            borderRadius: "0.5rem",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.03)",
            padding: "1rem",
            marginBottom: "1.5rem",
            textAlign: "left",
          }}
        >
          <p style={{ color: "#00ff88", marginBottom: "0.5rem" }}>
            $ locate page --path /this/route
          </p>
          <p style={{ color: "#f56565", marginBottom: "0.5rem" }}>
            ERROR: No matching routes found.
          </p>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.875rem" }}>
            ▊
          </p>
        </div>

        <p
          style={{
            color: "rgba(226,232,240,0.5)",
            maxWidth: "28rem",
            lineHeight: 1.6,
            marginBottom: "2rem",
            fontSize: "0.875rem",
          }}
        >
          The page you&#39;re looking for has gone offline or never existed.
        </p>

        <a
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            borderRadius: "0.25rem",
            border: "1px solid #00ff88",
            padding: "0.75rem 1.5rem",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.875rem",
            fontWeight: 600,
            color: "#00ff88",
            textDecoration: "none",
          }}
          aria-label="Return to homepage"
        >
          → RETURN TO BASE
        </a>
      </body>
    </html>
  );
}
