import { redirect } from "next/navigation";

import { getServerAuthSession } from "~/server/auth";
import getName from "~/utils/user/fetch/get-name";
import NamePage from "~/components/main/NamePage";

export default async function FormPage() {
  // Get the server session
  const session = await getServerAuthSession();

  if (session !== null) redirect("/data");

  // Get the default name
  const name = await getName();

  return (
    <main className="flex min-h-screen items-center justify-center">
      <NamePage defaultName={name ?? undefined} />
    </main>
  );
}
