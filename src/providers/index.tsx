"use client";

import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/navigation";

export default function Providers({ children }: React.PropsWithChildren) {
  const router = useRouter();

  return (
    <SessionProvider>
      <NextUIProvider navigate={void router.push}>
        <NextThemesProvider attribute="class">{children}</NextThemesProvider>
      </NextUIProvider>
    </SessionProvider>
  );
}
