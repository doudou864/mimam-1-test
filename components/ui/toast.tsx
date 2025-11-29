"use client";

import { useEffect } from "react";

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export function Toast({ message, isVisible, onClose }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div 
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-in-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(-50%, 0)' : 'translate(-50%, -20px)',
      }}
    >
      <div className="bg-background border border-border rounded-lg shadow-lg px-6 py-4 flex items-center gap-2 min-w-[200px]">
        <span className="text-lg">🎉</span>
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
}
