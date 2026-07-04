"use client";

import { useAuthStore } from "@/store/auth.store";

/**
 * Drop-in Google sign-in / sign-out control backed by the auth store.
 * Shows the signed-in user's name once authenticated.
 */
export default function GoogleSignInButton() {
  const user = useAuthStore((s) => s.user);
  const loading = useAuthStore((s) => s.loading);
  const error = useAuthStore((s) => s.error);
  const signInWithGoogle = useAuthStore((s) => s.signInWithGoogle);
  const signOut = useAuthStore((s) => s.signOut);

  if (loading) {
    return <span className="text-sm text-zinc-500">Loading…</span>;
  }

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm">
          Signed in as <strong>{user.displayName ?? user.email}</strong>
        </span>
        <button
          onClick={signOut}
          className="rounded-full border border-black/[.08] px-4 py-2 text-sm transition-colors hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={signInWithGoogle}
        className="flex h-12 items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
      >
        Continue with Google
      </button>
      {error ? <span className="text-sm text-red-500">{error}</span> : null}
    </div>
  );
}
