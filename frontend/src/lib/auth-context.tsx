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
  driveSyncStatus: "connected"; // Backwards compatibility for existing UI components
  driveError: null;
  updateProfile: (updates: Partial<LocalResearcherUser>) => void;
  signOut: () => Promise<void>;
  resetToDefault: () => void;
  signInWithGoogle: (email?: string, name?: string) => Promise<void>;
  signInWithAccount: (email: string, name: string) => Promise<void>;
  reconnectDrive: () => Promise<void>;
}

const DEFAULT_USER: LocalResearcherUser = {
  id: "researcher-local-01",
  name: "Kumaran Sathiyamoorthi",
  email: "kumaran.6373707@gmail.com",
  institution: "Computer Science & AI Institute",
  specialty: "Document Synthesis & NLP",
  role: "admin",
  last_active: "Active Now",
};

const LOCAL_USER_KEY = "paperatlas_researcher_profile";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<LocalResearcherUser>(DEFAULT_USER);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem(LOCAL_USER_KEY);
      if (cached) {
        try {
          setUser({ ...DEFAULT_USER, ...JSON.parse(cached) });
        } catch {
          // keep default
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
    toast.success("Researcher profile updated.");
  }, []);

  const resetToDefault = useCallback(() => {
    setUser(DEFAULT_USER);
    if (typeof window !== "undefined") {
      localStorage.removeItem(LOCAL_USER_KEY);
    }
    toast.success("Profile reset to default.");
  }, []);

  const signOut = useCallback(async () => {
    resetToDefault();
  }, [resetToDefault]);

  const signInWithGoogle = useCallback(async (customEmail?: string, customName?: string) => {
    setLoading(true);
    try {
      if (isSupabaseConfigured) {
        const res = await signInWithGoogleOAuth();
        if (res.error) throw res.error;
        return;
      }

      const targetEmail = (customEmail || "kumaran.6373707@gmail.com").trim();
      const targetName = customName || (targetEmail.includes("@") ? targetEmail.split("@")[0] : "Kumaran Sathiyamoorthi");
      const cleanEmail = targetEmail.toLowerCase();
      
      const isTargetAdmin =
        cleanEmail.includes("kumaran") ||
        cleanEmail.includes("sathiyamoorthi") ||
        cleanEmail.includes("sakthikumaran") ||
        cleanEmail.includes("ksmfrom2006") ||
        cleanEmail.includes("admin") ||
        cleanEmail === "kumaran.6373707@gmail.com" ||
        cleanEmail === "kkssathiyamoorthi@gmail.com";

      const newUser: LocalResearcherUser = {
        id: "usr-" + Math.abs(cleanEmail.split("").reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0)).toString(36),
        name: targetName,
        email: targetEmail,
        institution: "Computer Science & AI Institute",
        specialty: "Document Synthesis & NLP",
        role: isTargetAdmin ? "admin" : "researcher",
        last_active: "Active Now",
      };

      setUser(newUser);
      if (typeof window !== "undefined") {
        localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(newUser));
      }
      toast.success(`Signed in as ${targetName} (${targetEmail})`);
    } catch (err: any) {
      toast.error(err.message || "Failed to sign in with Google.");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const signInWithAccount = useCallback(async (email: string, name: string) => {
    return signInWithGoogle(email, name);
  }, [signInWithGoogle]);

  const reconnectDrive = useCallback(async () => {
    toast.info("Google Drive AppData Storage is active.");
  }, []);

  const cleanUserEmail = user?.email?.toLowerCase() || "";
  const isUserAdmin =
    user?.role === "admin" ||
    cleanUserEmail.includes("kumaran") ||
    cleanUserEmail.includes("sathiyamoorthi") ||
    cleanUserEmail.includes("sakthikumaran") ||
    cleanUserEmail.includes("ksmfrom2006") ||
    cleanUserEmail.includes("admin") ||
    cleanUserEmail === "kumaran.6373707@gmail.com" ||
    cleanUserEmail === "kkssathiyamoorthi@gmail.com";

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: true,
        loading,
        isAdmin: isUserAdmin,
        isResearcher: true,
        isConfigured: true,
        driveSyncStatus: "connected",
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
