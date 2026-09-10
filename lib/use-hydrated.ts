"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** Keep browser-only actions disabled until their event handlers are available. */
export function useHydrated() {
  return useSyncExternalStore(subscribe, () => true, () => false);
}
