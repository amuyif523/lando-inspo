"use client";

import { useCallback, useRef } from "react";
import { useRouter } from "next/navigation";

export function useContactPrefetch() {
  const router = useRouter();
  const warmed = useRef(false);

  return useCallback(() => {
    if (warmed.current) return;
    warmed.current = true;
    try {
      router.prefetch("/#contact");
    } catch (error) {
      console.warn("Contact route prefetch skipped", error);
    }
    fetch("/api/contact", { method: "HEAD" }).catch(() => {
      // Silent failure: endpoint only handles POST but warming the connection is best-effort.
    });
  }, [router]);
}
