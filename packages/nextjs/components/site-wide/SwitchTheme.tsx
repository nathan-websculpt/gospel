"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

export const SwitchTheme = ({ className }: { className?: string }) => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const isDarkMode = resolvedTheme === "dark";

  const handleToggle = () => {
    if (isDarkMode) {
      setTheme("light");
      return;
    }
    setTheme("dark");
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={`flex space-x-2 h-8 items-center justify-center text-sm ${className}`}>
      <input
        id="theme-toggle"
        type="checkbox"
        className="toggle toggle-primary bg-primary hover:bg-primary border-primary"
        onChange={handleToggle}
        checked={isDarkMode}
        aria-label="toggle dark-mode"
      />
      <label htmlFor="theme-toggle" className={`swap swap-rotate ${!isDarkMode ? "swap-active" : ""}`}>
        <SunIcon className="w-5 h-5 swap-on" />
        <MoonIcon className="w-5 h-5 swap-off" />
      </label>
    </div>
  );
};
