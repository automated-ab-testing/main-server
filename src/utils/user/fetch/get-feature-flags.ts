import "server-only";

import { cache } from "react";
import { cookies } from "next/headers";

import { db } from "~/server/db";

const getFeatureFlags = cache(async () => {
  // Get the event log id from the cookies
  const eventLogId = cookies().get("event-log-id");

  if (!eventLogId) return {} as Record<string, boolean>;

  const featureFlags = await db.$transaction(async (tx) => {
    const eventLog = await tx.eventLog.findUnique({
      where: {
        id: eventLogId.value,
      },
      select: {
        versionId: true,
      },
    });

    if (!eventLog) return null;

    const featureFlags = await tx.featureFlag.findMany({
      where: {
        versionId: eventLog.versionId,
      },
      select: {
        isActive: true,
        component: {
          select: {
            domId: true,
          },
        },
      },
    });

    return featureFlags;
  });

  if (!featureFlags) return {} as Record<string, boolean>;

  // Pivot the feature flag
  const pivot = featureFlags.reduce(
    (acc, curr) => {
      const { component, isActive } = curr;
      const { domId } = component;

      acc[domId] = isActive;

      return acc;
    },
    {} as Record<string, boolean>,
  );

  return pivot;
});

export default getFeatureFlags;
