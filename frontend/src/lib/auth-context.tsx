import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { signInWithGoogleOAuth, isSupabaseConfigured } from "./supabase";

export interface LocalResearcherUser {
  id: string;
  name: string;
  email: string;
  institution: string;
  specialty: string;
  role: "lead_researcher" | "researcher" | "admin";
  profile_image?: string;
  last_active: string;
}

export type StorageVaultStatus = "ready" | "saved" | "syncing" | "offline";

interface AuthContextType {
  user: LocalResearcherUser;
  isAuthenticated: boolean;
  loading: boolean;
  isAdmin: boolean;
  isResearcher: boolean;
  isConfigured: boolean;
  driveSyncStatus: "connected" | "disconnected";
  driveError: null;
  updateProfile: (updates: Partial<LocalResearcherUser>) => void;
  signOut: () => Promise<void>;
  resetToDefault: () => void;
  signInWithGoogle: (email?: string, name?: string) => Promise<void>;
  signInWithAccount: (email: string, password?: string, name?: string) => Promise<void>;
  reconnectDrive: () => Promise<void>;
}

const GUEST_USER: LocalResearcherUser = {
  id: "guest-researcher",
  name: "Guest Researcher",
  email: "",
  institution: "Local Research Vault",
  specialty: "Document Search & Synthesis",
  role: "researcher",
  last_active: "Active Now",
};

const LOCAL_USER_KEY = "paperatlas_researcher_profile";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<LocalResearcherUser>(GUEST_USER);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem(LOCAL_USER_KEY);
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (parsed && typeof parsed === "object" && parsed.email) {
            setUser({ ...GUEST_USER, ...parsed });
            setIsAuthenticated(true);
          }
        } catch {
          // keep default guest
        }
      }
    }
  }, []);

  const updateProfile = useCallback((updates: Partial<LocalResearcherUser>) => {
    setUser((prev) => {
      const updated = { ...prev, ...updates };
      if (typeof window !== "undefined") {
        localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(updated));
      }
      return updated;
    });
    if (updates.email) {
      setIsAuthenticated(true);
    }
    toast.success("Researcher profile updated.");
  }, []);

  const signOut = useCallback(async () => {
    setUser(GUEST_USER);
    setIsAuthenticated(false);
    if (typeof window !== "undefined") {
      localStorage.removeItem(LOCAL_USER_KEY);
      localStorage.removeItem("paperlens_access_token");
      localStorage.removeItem("paperlens_user");
      localStorage.removeItem("paperatlas_google_token");
    }
    toast.success("Signed out successfully.");
  }, []);

  const resetToDefault = useCallback(() => {
    signOut();
  }, [signOut]);

  // Google Sign-In: defaults to USER (Researcher) privileges
  const signInWithGoogle = useCallback(async (customEmail?: string, customName?: string) => {
    setLoading(true);
    try {
      if (isSupabaseConfigured) {
        const res = await signInWithGoogleOAuth();
        if (res.error) throw res.error;
        return;
      }

      const targetEmail = (customEmail || "researcher@gmail.com").trim();
      const targetName = customName || (targetEmail.includes("@") ? targetEmail.split("@")[0] : "Google Researcher");
      const cleanEmail = targetEmail.toLowerCase();

      // Google Sign-In accounts get USER / Researcher privileges as default
      const newUser: LocalResearcherUser = {
        id: "usr-" + Math.abs(cleanEmail.split("").reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0)).toString(36),
        name: targetName,
        email: targetEmail,
        institution: "Academic Research Workspace",
        specialty: "Document Synthesis & Evidence Q&A",
        role: "researcher", // Default privilege for Google Sign-In
        last_active: "Active Now",
      };

      setUser(newUser);
      setIsAuthenticated(true);
      if (typeof window !== "undefined") {
        localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(newUser));
        localStorage.setItem("paperlens_user", JSON.stringify(newUser));
      }
      toast.success(`Signed in with Google Account (${targetEmail}) as Researcher`);
    } catch (err: any) {
      toast.error(err.message || "Failed to sign in with Google.");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Manual Sign In: checks for admin password Sakthi@2004 for admin privileges
  const signInWithAccount = useCallback(async (email: string, password?: string, name?: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const isTargetAdmin =
      (cleanEmail === "kumaran.6373707@gmail.com" ||
        cleanEmail === "kkssathiyamoorthi@gmail.com" ||
        cleanEmail === "ksmfrom2006@gmail.com") &&
      password === "Sakthi@2004";

    const targetName = name || (cleanEmail.includes("@") ? cleanEmail.split("@")[0] : "Administrator");

    const newUser: LocalResearcherUser = {
      id: "usr-" + Math.abs(cleanEmail.split("").reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0)).toString(36),
      name: targetName,
      email: cleanEmail,
      institution: "Computer Science & AI Institute",
      specialty: "Document Synthesis & Platform Administration",
      role: isTargetAdmin ? "admin" : "researcher",
      last_active: "Active Now",
    };

    setUser(newUser);
    setIsAuthenticated(true);
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(newUser));
      localStorage.setItem("paperlens_user", JSON.stringify(newUser));
    }

    if (isTargetAdmin) {
      toast.success("Administrator session authenticated with full control panel access!");
    } else {
      toast.success(`Signed in as ${targetName}`);
    }
  }, []);

  const reconnectDrive = useCallback(async () => {
    toast.info("Google Drive AppData Storage is active.");
  }, []);

  const isUserAdmin = isAuthenticated && user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        isAdmin: isUserAdmin,
        isResearcher: true,
        isConfigured: true,
        driveSyncStatus: isAuthenticated ? "connected" : "disconnected",
        driveError: null,
        updateProfile,
        signOut,
        resetToDefault,
        signInWithGoogle,
        signInWithAccount,
        reconnectDrive,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
