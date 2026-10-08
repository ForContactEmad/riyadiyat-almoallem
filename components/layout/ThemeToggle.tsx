"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./useTheme";
import { iconButtonClass } from "./styles";

type ThemeToggleProps = { toDarkLabel: string; toLightLabel: string };

export default function ThemeToggle({ toDarkLabel, toLightLabel }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const label = isDark ? toLightLabel : toDarkLabel;
  const Icon = isDark ? Sun : Moon;

  return (
    <button onClick={toggleTheme} aria-label={label} title={label} className={iconButtonClass}>
      <Icon size={20} aria-hidden />
    </button>
  );
}
