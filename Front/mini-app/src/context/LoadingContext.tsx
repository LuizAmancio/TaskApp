// src/context/LoadingContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { LoadingOverlay } from "@/components/LoadingOverlay";

const LoadingContext = createContext<{
  showLoading: boolean;
  setShowLoading: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  showLoading: false,
  setShowLoading: () => {},
});

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [showLoading, setShowLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ showLoading, setShowLoading }}>
      {children}
      <LoadingOverlay show={showLoading} />
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  return context;
}
