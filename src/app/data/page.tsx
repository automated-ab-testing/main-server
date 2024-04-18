import { redirect } from "next/navigation";

import DataCard from "~/components/analytics/DataCard";
import { getServerAuthSession } from "~/server/auth";

export default async function DataPage({
  searchParams,
}: {
  searchParams: {
    test?: string;
  };
}) {
  // Get the test and version from the searchParams
  const { test } = searchParams;

  // Get the server session
  const session = await getServerAuthSession();

  if (session === null) redirect("/");

  return (
    <main className="flex min-h-screen items-center justify-center">
      <DataCard test={test} />
    </main>
  );
}
