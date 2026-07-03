import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  type User,
  type Unsubscribe,
} from "firebase/auth";

import { auth } from "@/lib/firebase";

const googleProvider = new GoogleAuthProvider();

/** Shape we expose to the rest of the app — a trimmed-down Firebase user. */
export interface AuthUser {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

function toAuthUser(user: User): AuthUser {
  return {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
  };
}

/**
 * Open the Google sign-in popup and resolve with the authenticated user.
 * Throws on failure so callers can surface an error to the UI.
 */
export async function loginWithGoogle(): Promise<AuthUser> {
  const result = await signInWithPopup(auth, googleProvider);
  return toAuthUser(result.user);
}

/** Sign the current user out. */
export async function logout(): Promise<void> {
  await signOut(auth);
}

/** Get the currently signed-in user, or null if none. */
export function getCurrentUser(): AuthUser | null {
  return auth.currentUser ? toAuthUser(auth.currentUser) : null;
}

/**
 * Subscribe to auth state changes. Fires immediately with the current user
 * (or null) and on every subsequent login/logout. Returns an unsubscribe fn.
 */
export function subscribeToAuth(
  callback: (user: AuthUser | null) => void
): Unsubscribe {
  return onAuthStateChanged(auth, (user) => {
    callback(user ? toAuthUser(user) : null);
  });
}
