import "server-only";

import { cache } from "react";
import { UserRole } from "@prisma/client";

import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";

const getProbabilityDistribution = cache(
  async (args: { testId: string; limit: number }) => {
    // Get the server session
    const session = await getServerAuthSession();

    // If the user is not authenticated or not a user, return empty data
    if (!session || !session.user || session.user.role !== UserRole.USER)
      return [] as {
        version: {
          label: string;
        };
        isClicked: boolean;
      }[];

    // Get the testId from the args
    const { testId, limit } = args;

    // Get the count of event logs of the test
    const eventLogs = await db.eventLog.findMany({
      where: {
        version: {
          testId,
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
      select: {
        version: {
          select: {
            label: true,
          },
        },
        isClicked: true,
      },
      take: limit,
    });

    // Reverse the data
    eventLogs.reverse();

    return eventLogs;
  },
);

export default getProbabilityDistribution;
