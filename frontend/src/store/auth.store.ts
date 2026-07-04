import { create } from "zustand";

import {
  loginWithGoogle,
  logout as oauthLogout,
  subscribeToAuth,
  type AuthUser,
} from "@/services/oauth.service";

interface AuthState {
  user: AuthUser | null;
  /** True until the first auth-state event arrives (avoids UI flicker). */
  loading: boolean;
  error: string | null;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  /** Start listening to Firebase auth changes. Returns an unsubscribe fn. */
  init: () => () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  error: null,

  signInWithGoogle: async () => {
    set({ error: null });
    try {
      const user = await loginWithGoogle();
      set({ user });
    } catch (err) {
      set({ error: err instanceof Error ? err.message : "Sign-in failed" });
    }
  },

  signOut: async () => {
    try {
      await oauthLogout();
      set({ user: null });
    } catch (err) {
      set({ error: err instanceof Error ? err.message : "Sign-out failed" });
    }
  },

  init: () =>
    subscribeToAuth((user) => {
      set({ user, loading: false });
    }),
}));
