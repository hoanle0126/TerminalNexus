"use client";

import dynamic from "next/dynamic";

// Dynamic import with ssr: false is only valid inside a Client Component
const TargetCursor = dynamic(
  () =>
    import("@/components/TargetCursor").then((m) => ({
      default: m.TargetCursor,
    })),
  { ssr: false }
);

export function TargetCursorLoader() {
  return <TargetCursor targetSelector=".cursor-target" />;
}
