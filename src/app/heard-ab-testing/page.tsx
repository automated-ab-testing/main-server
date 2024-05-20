import { redirect } from "next/navigation";

import { getServerAuthSession } from "~/server/auth";
import getHeardABTesting from "~/utils/user/fetch/get-heard-ab-testing";
import HeardPage from "~/components/main/HeardPage";

export default async function FormPage() {
  // Get the server session
  const session = await getServerAuthSession();

  if (session !== null) redirect("/data");

  // Get default is heard
  const heard = await getHeardABTesting();

  return (
    <main className="flex min-h-screen items-center justify-center">
      <HeardPage defaultFormHeard={heard} />
    </main>
  );
}
