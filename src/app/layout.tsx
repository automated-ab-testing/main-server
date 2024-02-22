import Providers from "~/providers";

import "~/styles/globals.css";

export const metadata = {
  title: "Automated A/B Testing",
  description: "Automated A/B Testing for Next.js",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
