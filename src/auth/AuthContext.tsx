import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { User } from "oidc-client-ts";
import { userManager } from "./auth";

type AuthContextValue = {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    userManager.startSilentRenew();
    userManager
      .getUser()
      .then((loaded) => {
        if (!alive) return;
        setUser(loaded);
        setLoading(false);
      })
      .catch(() => {
        if (!alive) return;
        setUser(null);
        setLoading(false);
      });

    const onUserLoaded = (loaded: User) => setUser(loaded);
    const onUserUnloaded = () => setUser(null);

    userManager.events.addUserLoaded(onUserLoaded);
    userManager.events.addUserUnloaded(onUserUnloaded);

    return () => {
      alive = false;
      userManager.stopSilentRenew();
      userManager.events.removeUserLoaded(onUserLoaded);
      userManager.events.removeUserUnloaded(onUserUnloaded);
    };
  }, []);

  const login = () => {
    void userManager.signinRedirect();
  };

  const logout = () => {
    void userManager.signoutRedirect();
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      accessToken: user?.access_token ?? null,
      loading,
      login,
      logout,
    }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
