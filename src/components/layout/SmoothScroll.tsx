"use client";

import { ReactLenis } from "@studio-freight/react-lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  // Lenis removed: falling back to perfectly optimized native browser scrolling
  // as emulated scroll can cause massive lag on certain devices/trackpads.
  return <>{children}</>;
}
