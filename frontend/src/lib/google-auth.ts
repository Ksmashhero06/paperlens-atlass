/**
 * Google Authentication & Authorization Service
 * 
 * Handles client-side Google Sign-In using Firebase Auth with GoogleAuthProvider
 * configured with the Google Drive AppData scope (https://www.googleapis.com/auth/drive.appdata).
 * 
 * Strict Security Rules:
 * 1. Tokens are cached strictly IN-MEMORY. Never written to localStorage/sessionStorage.
 * 2. Tokens are automatically cleared on sign-out or session end.
 * 3. Never logs or exposes raw tokens to UI or telemetry.
 */

import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut as firebaseSignOut,
  type User,
} from "firebase/auth";
import firebaseConfig from "../../../firebase-applet-config.json";

// Initialize Firebase App singleton
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Configure Google OAuth Provider with least-privilege AppData scope
export const googleDriveProvider = new GoogleAuthProvider();
googleDriveProvider.addScope("https://www.googleapis.com/auth/drive.appdata");
googleDriveProvider.addScope("email");
googleDriveProvider.addScope("profile");
googleDriveProvider.setCustomParameters({
  prompt: "select_account",
  access_type: "online",
});

// Strict in-memory access token cache
let cachedAccessToken: string | null = null;
let isSigningIn = false;

export interface GoogleAuthResult {
  user: User;
  accessToken: string;
}

/**
 * Sign in with Google and request Google Drive AppData authorization.
 * Must be triggered from an explicit user interaction (e.g., button click).
 */
export async function signInWithGoogleDrive(): Promise<GoogleAuthResult> {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, googleDriveProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);

    if (!credential?.accessToken) {
      throw new Error(
        "Google authentication succeeded, but Google Drive authorization was not granted. Please try again."
      );
    }

    cachedAccessToken = credential.accessToken;
    return {
      user: result.user,
      accessToken: cachedAccessToken,
    };
  } catch (error: any) {
    if (error.code === "auth/popup-closed-by-user") {
      throw new Error("Sign-in was cancelled before completion.");
    } else if (error.code === "auth/popup-blocked") {
      throw new Error("Sign-in popup was blocked by your browser. Please allow popups for PaperAtlas.");
    }
    throw error;
  } finally {
    isSigningIn = false;
  }
}

/**
 * Get the currently cached in-memory access token.
 */
export function getCachedDriveToken(): string | null {
  return cachedAccessToken;
}

/**
 * Update the in-memory access token (for example, after re-authentication).
 */
export function setCachedDriveToken(token: string | null): void {
  cachedAccessToken = token;
}

/**
 * Check if the current in-memory access token is valid and active.
 */
export function hasActiveDriveToken(): boolean {
  return Boolean(cachedAccessToken);
}

/**
 * Sign out the currently authenticated user and purge the in-memory token cache.
 */
export async function signOutGoogle(): Promise<void> {
  cachedAccessToken = null;
  await firebaseSignOut(auth);
}

/**
 * Listen to Firebase Auth state changes.
 * Automatically purges the cached in-memory token on user logout.
 */
export function onGoogleAuthStateChanged(
  onUserChanged: (user: User | null, token: string | null) => void
) {
  return onAuthStateChanged(auth, (user) => {
    if (!user) {
      cachedAccessToken = null;
    }
    onUserChanged(user, cachedAccessToken);
  });
}
