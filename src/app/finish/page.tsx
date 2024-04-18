import { redirect } from "next/navigation";

import { getServerAuthSession } from "~/server/auth";
import SubmitPage from "~/components/main/SubmitPage";

export default async function FinishPage() {
  // Get the server session
  const session = await getServerAuthSession();

  if (session !== null) redirect("/data");

  return (
    <main className="flex min-h-screen items-center justify-center">
      <SubmitPage />
    </main>
  );
}
