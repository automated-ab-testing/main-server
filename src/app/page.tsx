import { redirect } from "next/navigation";

import LandingPage from "~/components/main/LandingPage";
import { getServerAuthSession } from "~/server/auth";

export default async function HomePage() {
  // Get the server session
  const session = await getServerAuthSession();

  if (session !== null) redirect("/data");

  return (
    <main className="flex min-h-screen items-center justify-center">
      <LandingPage />
    </main>
  );
}
