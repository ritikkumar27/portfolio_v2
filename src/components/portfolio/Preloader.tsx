"use client";

import { useState, useEffect } from "react";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-[999999] flex items-center justify-center transition-opacity duration-500 ${
        isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ backgroundColor: "var(--color-bg-deep)" }}
    >
      {/* Animated logo / spinner */}
      <div className="flex flex-col items-center gap-4">
        <div className="text-4xl font-normal text-white tracking-wider">
          <span className="purple">R</span>K
        </div>
        <div className="flex gap-1">
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: "var(--color-accent-200)", animationDelay: "0ms" }}
          />
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: "var(--color-accent-400)", animationDelay: "150ms" }}
          />
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: "var(--color-accent-600)", animationDelay: "300ms" }}
          />
        </div>
      </div>
    </div>
  );
}
