import { redirect } from "next/navigation";

import { getServerAuthSession } from "~/server/auth";
import getCampus from "~/utils/user/fetch/get-campus";
import CampusPage from "~/components/main/CampusPage";

export default async function FormPage() {
  // Get the server session
  const session = await getServerAuthSession();

  if (session !== null) redirect("/data");

  // Get the default campus
  const campus = await getCampus();

  return (
    <main className="flex min-h-screen items-center justify-center">
      <CampusPage defaultCampus={campus ?? undefined} />
    </main>
  );
}
