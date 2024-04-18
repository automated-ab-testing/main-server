import { redirect } from "next/navigation";

import { getServerAuthSession } from "~/server/auth";
import getConsentClicked from "~/utils/user/fetch/get-consent-clicked";
import ConsentPage from "~/components/consent/ConsentPage";

export default async function FormPage() {
  // Get the server session
  const session = await getServerAuthSession();

  if (session !== null) redirect("/data");

  // Get the default consent clicked
  const consentClicked = await getConsentClicked();

  return (
    <main className="flex min-h-screen items-center justify-center">
      <ConsentPage defaultConsentClicked={consentClicked} />
    </main>
  );
}
