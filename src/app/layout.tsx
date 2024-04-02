import { getServerAuthSession } from "~/server/auth";
import AuthProvider from "~/providers/AuthProvider";
import ComponentProvider from "~/providers/ComponentProvider";

import "~/styles/globals.css";
import ThemeProvider from "~/providers/ThemeProvider";

export const metadata = {
  title: "Automated A/B Testing",
  description: "Automated A/B Testing for Next.js",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider session={session}>
          <ComponentProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </ComponentProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
