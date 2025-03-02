"use client";

import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ThemeProvider = ({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) => {
  const { setTheme } = useTheme();

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    if (!localTheme) {
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    } else if (localTheme) {
      setTheme(localTheme);
    }
  }, []);

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};
