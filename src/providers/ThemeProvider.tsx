"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function ThemeProvider({ children }: React.PropsWithChildren) {
  return <NextThemesProvider attribute="class">{children}</NextThemesProvider>;
}
