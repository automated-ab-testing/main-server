"use server";

import { db } from "~/server/db";

const incrementViewCount = async (args: { versionId: string }) => {
  // Get the versionId from the args
  const { versionId } = args;

  await db.$transaction(async (tx) => {
    // Check if the user has already viewed the component
    const prevEventLog = await tx.eventLog.findUnique({
      where: {
        deviceId: "bf993b57-db0e-451c-9616-d3525932c4bf",
      },
    });

    // If the user has already viewed the component, return
    if (!!prevEventLog) return;

    // Else, create a new event log
    await tx.eventLog.create({
      data: {
        versionId,
        deviceId: "bf993b57-db0e-451c-9616-d3525932c4bf",
      },
    });
  });
};

export default incrementViewCount;
