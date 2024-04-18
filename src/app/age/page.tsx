import { redirect } from "next/navigation";

import { getServerAuthSession } from "~/server/auth";
import getAge from "~/utils/user/fetch/get-age";
import AgePage from "~/components/main/AgePage";

export default async function FormPage() {
  // Get the server session
  const session = await getServerAuthSession();

  if (session !== null) redirect("/data");

  // Get the default age
  const age = await getAge();

  return (
    <main className="flex min-h-screen items-center justify-center">
      <AgePage defaultAge={age ?? undefined} />
    </main>
  );
}
