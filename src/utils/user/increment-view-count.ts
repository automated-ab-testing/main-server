"use server";

import { UserRole } from "@prisma/client";

import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";

const incrementViewCount = async (args: { versionId: string }) => {
  // Get the server session
  const session = await getServerAuthSession();

  // If the user is not authenticated or not a user, return
  if (!session || !session.user || session.user.role !== UserRole.USER) return;

  // Get the versionId from the args
  const { versionId } = args;

  await db.$transaction(async (tx) => {
    // Check if the user has already viewed the component
    const prevEventLog = await tx.eventLog.findUnique({
      where: {
        userId: session.user.id,
      },
    });

    // If the user has already viewed the component, return
    if (!!prevEventLog) return;

    // Else, create a new event log
    await tx.eventLog.create({
      data: {
        versionId,
        userId: session.user.id,
      },
    });
  });
};

export default incrementViewCount;
