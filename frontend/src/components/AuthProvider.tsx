"use client";

import { useEffect } from "react";

import { useAuthStore } from "@/store/auth.store";

/**
 * Starts the Firebase auth listener once on mount so the store stays in sync
 * with the signed-in user. Wrap the app with this in the root layout.
 */
export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const init = useAuthStore((s) => s.init);

  useEffect(() => {
    const unsubscribe = init();
    return unsubscribe;
  }, [init]);

  return <>{children}</>;
}
