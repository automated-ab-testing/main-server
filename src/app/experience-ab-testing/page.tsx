import { redirect } from "next/navigation";

import { getServerAuthSession } from "~/server/auth";
import getExperienceABTesting from "~/utils/user/fetch/get-experience-ab-testing";
import ExperiencePage from "~/components/main/ExperiencePage";

export default async function FormPage() {
  // Get the server session
  const session = await getServerAuthSession();

  if (session !== null) redirect("/data");

  // Get the default experience-ab-testing
  const formExperience = await getExperienceABTesting();

  return (
    <main className="flex min-h-screen items-center justify-center">
      <ExperiencePage defaultFormExperience={formExperience ?? undefined} />
    </main>
  );
}
