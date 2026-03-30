import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  type User,
} from 'firebase/auth';
import { auth } from '../firebase/config';
import type { AuthActionResult, AuthUser } from '../types';
import {
  isAuthError,
  messageForGoogleError,
  messageForLoginError,
  messageForSignupError,
} from '../lib/authErrors';
import { normalizeEmail } from '../lib/authValidation';

function toAuthUser(firebaseUser: User, displayNameFallback: string): AuthUser {
  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName: firebaseUser.displayName || displayNameFallback,
  };
}

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
  login: (email: string, password: string) => Promise<AuthActionResult>;
  signup: (email: string, password: string, name: string) => Promise<AuthActionResult>;
  loginWithGoogle: () => Promise<AuthActionResult>;
  sendPasswordReset: (email: string) => Promise<AuthActionResult>;
  logout: () => Promise<void>;
  setUser: (user: AuthUser | null) => void;
  setLoading: (loading: boolean) => void;
  clearError: () => void;
  initAuth: () => () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loading: false,
      error: null,
      initialized: false,

      login: async (email: string, password: string) => {
        set({ loading: true, error: null });
        try {
          const cred = await signInWithEmailAndPassword(
            auth,
            normalizeEmail(email),
            password
          );
          const fallback = normalizeEmail(email).split('@')[0] || 'User';
          set({
            user: toAuthUser(cred.user, fallback),
            loading: false,
            initialized: true,
          });
          return { ok: true };
        } catch (err: unknown) {
          const code = isAuthError(err) ? err.code : undefined;
          const msg = messageForLoginError(code);
          set({ error: msg, loading: false });
          return { ok: false, error: msg };
        }
      },

      signup: async (email: string, password: string, name: string) => {
        set({ loading: true, error: null });
        try {
          const normalized = normalizeEmail(email);
          const cred = await createUserWithEmailAndPassword(
            auth,
            normalized,
            password
          );
          const displayName = name.trim() || normalized.split('@')[0] || 'User';
          try {
            await updateProfile(cred.user, { displayName });
            await cred.user.reload();
          } catch {
            /* account exists; display name can be set later */
          }
          const refreshed = auth.currentUser;
          const user = refreshed
            ? toAuthUser(refreshed, displayName)
            : toAuthUser(cred.user, displayName);
          set({ user, loading: false, initialized: true });
          return { ok: true };
        } catch (err: unknown) {
          const code = isAuthError(err) ? err.code : undefined;
          const msg = messageForSignupError(code);
          set({ error: msg, loading: false });
          return { ok: false, error: msg };
        }
      },

      loginWithGoogle: async () => {
        set({ loading: true, error: null });
        try {
          const provider = new GoogleAuthProvider();
          provider.setCustomParameters({ prompt: 'select_account' });
          const cred = await signInWithPopup(auth, provider);
          const fallback =
            cred.user.displayName ||
            cred.user.email?.split('@')[0] ||
            'User';
          set({
            user: toAuthUser(cred.user, fallback),
            loading: false,
            initialized: true,
          });
          return { ok: true };
        } catch (err: unknown) {
          const code = isAuthError(err) ? err.code : undefined;
          const mapped = messageForGoogleError(code);
          if (mapped === null) {
            set({ error: null, loading: false });
            return { ok: false };
          }
          set({ error: mapped, loading: false });
          return { ok: false, error: mapped };
        }
      },

      sendPasswordReset: async (email: string) => {
        try {
          await sendPasswordResetEmail(auth, normalizeEmail(email));
          return { ok: true };
        } catch (err: unknown) {
          const code = isAuthError(err) ? err.code : undefined;
          const msg =
            code === 'auth/user-not-found'
              ? 'If an account exists for this email, you will receive reset instructions.'
              : code === 'auth/invalid-email'
                ? 'Enter a valid email address.'
                : code === 'auth/network-request-failed'
                  ? 'Network error. Check your connection and try again.'
                  : 'Could not send reset email. Try again later.';
          return { ok: false, error: msg };
        }
      },

      logout: async () => {
        await signOut(auth);
        set({ user: null, error: null });
      },

      setUser: (user) => set({ user }),
      setLoading: (loading) => set({ loading }),
      clearError: () => set({ error: null }),

      initAuth: () => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser: User | null) => {
          if (firebaseUser) {
            set({
              user: {
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                displayName:
                  firebaseUser.displayName ||
                  firebaseUser.email?.split('@')[0] ||
                  'User',
              },
              initialized: true,
            });
          } else {
            set({ user: null, initialized: true });
          }
        });
        return unsubscribe;
      },
    }),
    {
      name: 'medicore-auth',
      partialize: (state) => ({ user: state.user }),
    }
  )
);
