"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";

// Crie o contexto
export const FormErrorContext = createContext<{
  hasError: boolean;
  message: string;
  setHasError: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}>({
  hasError: false,
  message: "",
  setHasError: () => {},
  setMessage: () => {},
});

export default function FormErrorProvider({ children }: { children: ReactNode }) {
  const [hasError, setHasError] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (message) {
      setHasError(true);
    }else {
      setHasError(false);
    }
  }, [message]);

  return (
    <FormErrorContext.Provider value={{ hasError, setHasError, message, setMessage }}>
      {children}
    </FormErrorContext.Provider>
  );
}