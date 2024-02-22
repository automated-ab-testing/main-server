import "server-only";

import { cache } from "react";
import { UserRole } from "@prisma/client";

import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";

const getTestNames = cache(async () => {
  // Get the server session
  const session = await getServerAuthSession();

  // If the user is not authenticated or not an admin, return empty data
  if (!session || !session.user || session.user.role !== UserRole.ADMIN)
    return [] as {
      id: string;
      name: string;
    }[];

  // Get all test names
  return await db.test.findMany({
    select: {
      id: true,
      name: true,
    },
  });
});

export default getTestNames;
