import "server-only";

import { cache } from "react";
import { UserRole } from "@prisma/client";

import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";

const getAnalytics = cache(async (args: { testId: string }) => {
  // Get the server session
  const session = await getServerAuthSession();

  // If the user is not authenticated or not an admin, return empty data
  if (!session || !session.user || session.user.role !== UserRole.ADMIN)
    return {} as Record<string, Record<string, number>>;

  // Get the testId from the args
  const { testId } = args;

  // Get the analytics data
  const { versions, countImpressions, countClicks } = await db.$transaction(
    async (tx) => {
      // Get the label and id of all versions for the test
      const versions = await tx.version.findMany({
        where: { testId },
        select: { id: true, label: true },
      });

      // Get the count of impressions for each version
      const countImpressions = await tx.eventLog.groupBy({
        by: ["versionId"],
        where: {
          version: {
            testId,
          },
        },
        _count: {
          id: true,
        },
      });

      // Get the count of clicks for each version
      const countClicks = await tx.eventLog.groupBy({
        by: ["versionId"],
        where: {
          version: {
            testId,
          },
          isClicked: true,
        },
        _count: {
          id: true,
        },
      });

      return { versions, countImpressions, countClicks };
    },
  );

  const dataImpressions = versions.reduce(
    (acc, curr) => {
      // Find the count for the current versionId
      const count = countImpressions.find((c) => c.versionId === curr.id);

      // Add the count to the pivot object
      acc[curr.label] = count ? count._count.id : 0;

      // Return the pivot object
      return acc;
    },
    {} as Record<string, number>,
  );

  const dataClicks = versions.reduce(
    (acc, curr) => {
      // Find the count for the current versionId
      const count = countClicks.find((c) => c.versionId === curr.id);

      // Add the count to the pivot object
      acc[curr.label] = count ? count._count.id : 0;

      // Return the pivot object
      return acc;
    },
    {} as Record<string, number>,
  );

  return {
    impressions: dataImpressions,
    clicks: dataClicks,
  };
});

export default getAnalytics;
