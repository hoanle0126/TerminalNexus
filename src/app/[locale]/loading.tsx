import BootLoader from "@/components/effects/BootLoader";

// ─── Route Segment Loading ────────────────────────────────────────────────────
// Shown by Next.js while the page segment is loading (Suspense boundary).
// Reuses the BootLoader component to maintain visual consistency.
// ─────────────────────────────────────────────────────────────────────────────

export default function Loading() {
  return <BootLoader />;
}
