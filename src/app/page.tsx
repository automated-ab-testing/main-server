import { Button } from "@nextui-org/react";

import { getServerAuthSession } from "~/server/auth";
import ServerComponentWrapper from "~/wrappers/ServerComponentWrapper";
import DisplayVersion from "~/components/main/DisplayVersion";
import ClientComponent from "~/components/main/ClientComponent";
import DataCard from "~/components/analytics/DataCard";

export default async function HomePage({
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

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 py-2">
      {session !== null ? (
        <DataCard test={test} />
      ) : (
        <>
          <DisplayVersion />
          <ServerComponentWrapper
            renderDefault={() => (
              <Button className="bg-green-500">Default Button</Button>
            )}
            renderTest={({ versionId, featureFlags }) => (
              <ClientComponent
                versionId={versionId}
                featureFlags={featureFlags}
              />
            )}
          />
        </>
      )}
    </main>
  );
}
