"use client";

import { useState, useEffect } from "react";
import { Switch } from "@nextui-org/react";
import { useTheme } from "next-themes";

import SunIcon from "~/svg/SunIcon";
import MoonIcon from "~/svg/MoonIcon";

export default function ThemeSwitcher() {
  // Get the theme
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <Switch
      isSelected={resolvedTheme === "light"}
      onValueChange={() =>
        setTheme(resolvedTheme === "light" ? "dark" : "light")
      }
      color="default"
      size="lg"
      startContent={<SunIcon />}
      endContent={<MoonIcon />}
    />
  );
}
