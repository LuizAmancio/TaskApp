// src/components/LoadingOverlay.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";

export const LoadingOverlay = ({ show }: { show: boolean }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center"
        >
          <div className="flex flex-col items-center text-white">
            <div className="h-10 w-10 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
            <span className="mt-4 text-sm font-medium">Carregando...</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
