"use client";

import { Button } from "@nextui-org/button";

import ClientComponentWrapper from "~/wrappers/ClientComponentWrapper";

export default function ClientComponent({
  featureFlags,
}: {
  featureFlags: Record<string, boolean>;
}) {
  return (
    <ClientComponentWrapper
      featureFlags={featureFlags}
      renderClient={({ getDisplayStatus, emitWin }) => (
        <>
          {getDisplayStatus("first-button") && (
            <Button
              className="bg-red-500"
              onClick={async () => await emitWin()}
            >
              First Button
            </Button>
          )}
          {getDisplayStatus("second-button") && (
            <Button
              className="bg-purple-500"
              onClick={async () => await emitWin()}
            >
              Second Button
            </Button>
          )}
        </>
      )}
    />
  );
}
