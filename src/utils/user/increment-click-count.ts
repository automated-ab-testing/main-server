"use server";

import { UserRole } from "@prisma/client";

import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";

const incrementClickCount = async () => {
  // Get the server session
  const session = await getServerAuthSession();

  // If the user is not authenticated or not a user, return
  if (!session || !session.user || session.user.role !== UserRole.USER) return;

  // Update the event log
  await db.eventLog.update({
    where: {
      userId: session.user.id,
    },
    data: {
      isClicked: true,
    },
  });
};

export default incrementClickCount;
