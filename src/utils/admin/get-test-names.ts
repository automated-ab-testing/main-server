import "server-only";

import { cache } from "react";

import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";

const getTestNames = cache(async () => {
  // Get the server session
  const session = await getServerAuthSession();

  // If the user is not authenticated, return empty data
  if (!session)
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
