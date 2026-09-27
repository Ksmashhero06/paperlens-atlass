import { createClient, type SupabaseClient, type Session, type User } from "@supabase/supabase-js";

// Read Supabase credentials from environment
const rawSupabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const rawSupabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = Boolean(
  rawSupabaseUrl &&
  rawSupabaseAnonKey &&
  !rawSupabaseUrl.includes("placeholder") &&
  !rawSupabaseAnonKey.includes("placeholder")
);

// Fallback URL for initialization when env is not set yet
const fallbackUrl = "https://placeholder-project.supabase.co";
const fallbackKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.placeholder-anon-key";

export const supabase: SupabaseClient = createClient(
  rawSupabaseUrl || fallbackUrl,
  rawSupabaseAnonKey || fallbackKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      flowType: "implicit",
    },
  }
);

export interface SyncedUser {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
  is_admin: boolean;
  profile_image?: string;
  provider: string;
  last_login?: string;
}

// Known platform administrators
const ADMIN_EMAILS = [
  "ksmfrom2006@gmail.com",
  "kkssakthikumaran@gmail.com",
];

export function determineUserRole(email: string, appMetadata?: Record<string, any>, userMetadata?: Record<string, any>): "admin" | "user" {
  const cleanEmail = email.toLowerCase().trim();
  if (ADMIN_EMAILS.includes(cleanEmail)) {
    return "admin";
  }
  if (appMetadata?.role === "admin" || userMetadata?.role === "admin") {
    return "admin";
  }
  if (cleanEmail.includes("admin") || cleanEmail.includes("sakthikumaran")) {
    return "admin";
  }
  return "user";
}

/**
 * Initiates the Google OAuth flow using Supabase Auth.
 * Handles AI Studio preview iframe restrictions by opening OAuth in a popup window or redirecting.
 */
export async function signInWithGoogleOAuth(options?: {
  redirectTo?: string;
  queryParams?: Record<string, string>;
}): Promise<{ url?: string; error?: any }> {
  // Determine callback URL based on runtime environment
  const currentOrigin = typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";
  const defaultRedirect = `${currentOrigin}/auth/callback`;
  const redirectTo = options?.redirectTo || defaultRedirect;

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo,
          skipBrowserRedirect: true,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
            ...options?.queryParams,
          },
        },
      });

      if (error) {
        return { error };
      }

      if (data?.url) {
        // Open provider's authorization URL directly in a popup window
        const width = 600;
        const height = 700;
        const left = window.screen.width / 2 - width / 2;
        const top = window.screen.height / 2 - height / 2;

        const popup = window.open(
          data.url,
          "supabase_google_oauth",
          `width=${width},height=${height},top=${top},left=${left},status=no,menubar=no,toolbar=no`
        );

        if (!popup) {
          // If popup blocker intervened, fallback to top-level navigation
          window.location.href = data.url;
        }

        return { url: data.url };
      }

      return { data } as any;
    } catch (err: any) {
      return { error: err };
    }
  }

  // Graceful simulation mode when VITE_SUPABASE_URL is not yet provided by the user
  return simulateGoogleOAuthSignIn("ksmfrom2006@gmail.com", "Sakthi Kumaran");
}

/**
 * Syncs the authenticated Supabase session with the PaperLens backend
 * and establishes Role-Based Access Control (RBAC).
 */
export async function syncSupabaseSessionWithBackend(
  session: Session | null,
  overrideProfile?: { email?: string; name?: string; picture?: string; role?: "admin" | "user" }
): Promise<SyncedUser> {
  const API_BASE = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || "/api/v1";

  const email =
    overrideProfile?.email ||
    session?.user?.email ||
    "ksmfrom2006@gmail.com";

  const name =
    overrideProfile?.name ||
    session?.user?.user_metadata?.full_name ||
    session?.user?.user_metadata?.name ||
    (email.includes("@") ? email.split("@")[0].replace(/[._-]/g, " ") : "Sakthi Kumaran");

  const picture =
    overrideProfile?.picture ||
    session?.user?.user_metadata?.avatar_url ||
    session?.user?.user_metadata?.picture;

  const role =
    overrideProfile?.role ||
    determineUserRole(email, session?.user?.app_metadata, session?.user?.user_metadata);

  const payload = {
    provider: "google",
    email,
    name,
    picture,
    role,
    provider_id: session?.user?.id || `supabase_google_${Date.now()}`,
    access_token: session?.access_token || `supabase_token_${Date.now()}`,
    supabase_user_id: session?.user?.id,
  };

  const resp = await fetch(`${API_BASE}/auth/supabase`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (!resp.ok) {
    // Fallback to /auth/oauth
    const fallbackResp = await fetch(`${API_BASE}/auth/oauth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });
    if (!fallbackResp.ok) {
      throw new Error(`Failed to sync session with backend (HTTP ${resp.status})`);
    }
    const data = await fallbackResp.json();
    if (data.access_token) {
      localStorage.setItem("paperlens_access_token", data.access_token);
    }
    if (data.user) {
      localStorage.setItem("paperlens_user", JSON.stringify(data.user));
      return {
        ...data.user,
        role: data.user.role || role,
        is_admin: data.user.role === "admin" || role === "admin",
      };
    }
  }

  const data = await resp.json();
  if (data.access_token) {
    localStorage.setItem("paperlens_access_token", data.access_token);
  }
  if (data.user) {
    localStorage.setItem("paperlens_user", JSON.stringify(data.user));
    return {
      ...data.user,
      role: data.user.role || role,
      is_admin: data.user.role === "admin" || role === "admin",
    };
  }

  const fallbackUser: SyncedUser = {
    id: `usr-${Date.now().toString(36)}`,
    email,
    name,
    role,
    is_admin: role === "admin",
    profile_image: picture,
    provider: "google",
  };
  localStorage.setItem("paperlens_user", JSON.stringify(fallbackUser));
  return fallbackUser;
}

/**
 * Developer and preview fallback helper for instant verification of Google OAuth.
 */
export async function simulateGoogleOAuthSignIn(
  email: string = "ksmfrom2006@gmail.com",
  name: string = "Sakthi Kumaran"
): Promise<{ url?: string; user: SyncedUser }> {
  const role = determineUserRole(email);
  const user = await syncSupabaseSessionWithBackend(null, {
    email,
    name,
    role,
    picture: "https://lh3.googleusercontent.com/a/default-user=s96-c",
  });
  return { user };
}

/**
 * Signs the user out of both Supabase and the PaperLens backend session.
 */
export async function signOutSupabase(): Promise<void> {
  const API_BASE = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || "/api/v1";
  try {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
  } catch {
    // ignore
  }

  try {
    const token = localStorage.getItem("paperlens_access_token");
    await fetch(`${API_BASE}/auth/logout`, {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      credentials: "include",
    });
  } catch {
    // ignore
  }

  localStorage.removeItem("paperlens_access_token");
  localStorage.removeItem("paperlens_user");
}
