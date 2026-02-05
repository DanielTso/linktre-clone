"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed right-4 top-4 z-50 rounded-full p-3 transition-all duration-300 glass-card glow-hover"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5 text-theme-secondary" />
      ) : (
        <Sun className="h-5 w-5 text-theme-secondary" />
      )}
    </button>
  );
}
