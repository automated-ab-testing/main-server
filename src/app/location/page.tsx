import { redirect } from "next/navigation";

import { getServerAuthSession } from "~/server/auth";
import getLocation from "~/utils/user/fetch/get-location";
import LocationPage from "~/components/main/LocationPage";

export default async function FormPage() {
  // Get the server session
  const session = await getServerAuthSession();

  if (session !== null) redirect("/data");

  // Get the default location
  const location = await getLocation();

  return (
    <main className="flex min-h-screen items-center justify-center">
      <LocationPage defaultLocation={location ?? undefined} />
    </main>
  );
}
