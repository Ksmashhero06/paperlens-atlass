import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { toast } from "sonner";

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
}

const DEFAULT_USER: LocalResearcherUser = {
  id: "researcher-local-01",
  name: "Lead Researcher",
  email: "researcher@local.vault",
  institution: "Computer Science & AI Institute",
  specialty: "Document Synthesis & NLP",
  role: "lead_researcher",
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
    toast.success("Researcher profile updated locally.");
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

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: true,
        loading,
        isAdmin: true,
        isResearcher: true,
        isConfigured: true,
        driveSyncStatus: "connected",
        driveError: null,
        updateProfile,
        signOut,
        resetToDefault,
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
