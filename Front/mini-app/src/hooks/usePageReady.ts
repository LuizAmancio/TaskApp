"use client";
import { useEffect, useState } from "react";

export function usePageReady() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const handleLoad = () => setReady(true);
    if (document.readyState === "complete") setReady(true);
    else window.addEventListener("load", handleLoad);
    return () => window.removeEventListener("load", handleLoad);
  }, []);

  return ready;
}
