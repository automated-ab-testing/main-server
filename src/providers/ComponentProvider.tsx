"use client";

import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function ComponentProvider({
  children,
}: React.PropsWithChildren) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={void router.push}>{children}</NextUIProvider>
  );
}
