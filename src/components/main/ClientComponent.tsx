"use client";

import { Button } from "@nextui-org/react";

import ClientComponentWrapper from "~/wrappers/ClientComponentWrapper";

export default function ClientComponent({
  versionId,
  featureFlags,
}: {
  versionId: string;
  featureFlags: Record<string, boolean>;
}) {
  return (
    <ClientComponentWrapper
      versionId={versionId}
      featureFlags={featureFlags}
      renderClient={({ getDisplayStatus, emitWin }) => (
        <>
          {getDisplayStatus("first-button") && (
            <Button className="bg-red-500" onClick={emitWin}>
              First Button
            </Button>
          )}
          {getDisplayStatus("second-button") && (
            <Button className="bg-purple-500" onClick={emitWin}>
              Second Button
            </Button>
          )}
        </>
      )}
    />
  );
}
