import { redirect } from "next/navigation";

import { getServerAuthSession } from "~/server/auth";
import getSubmitted from "~/utils/user/fetch/get-submitted";
import LandingPage from "~/components/main/LandingPage";

export default async function HomePage() {
  // Get the server session
  const session = await getServerAuthSession();

  if (session !== null) redirect("/data");

  // Check if the user has already submitted the form
  const isFormSubmitted = await getSubmitted();

  return (
    <main className="flex min-h-screen items-center justify-center">
      {isFormSubmitted ? (
        <p>Thank you for your submission!</p>
      ) : (
        <LandingPage />
      )}
    </main>
  );
}
