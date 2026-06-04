"use client";
import { useEffect, useState } from "react";
import { Icon } from "@/components/icons";

/** Switches between the default (light) palette and the alternate (deep teal)
 *  palette. Persists the choice; the inline head script applies it pre-paint. */
export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const current =
      (document.documentElement.getAttribute("data-theme") as
        | "light"
        | "dark") || "light";
    setTheme(current);
    setMounted(true);
  }, []);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("scma-theme", next);
    } catch {
      /* ignore */
    }
  };

  return (
    <button
      className="theme-toggle"
      onClick={toggle}
      aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
      type="button"
    >
      {mounted && <Icon name={theme === "light" ? "moon" : "sun"} />}
    </button>
  );
}
