"use client";

import { createContext, useContext, ReactNode } from "react";
import { useUser } from "@/hooks/useUser";

interface AuthContextType {
  user: any;
  loading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { user, loading, isAuthenticated } = useUser();

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
