import "server-only";

import { cache } from "react";
import { cookies } from "next/headers";

import { db } from "~/server/db";

const getHeardABTesting = cache(async () => {
  // Get the event log id from the cookies
  const eventLogId = cookies().get("event-log-id");

  if (!eventLogId) return false;

  // Get the event log
  const eventLog = await db.eventLog.findUnique({
    where: {
      id: eventLogId.value,
    },
    select: {
      heardAboutAB: true,
    },
  });

  if (!eventLog) return false;

  return eventLog.heardAboutAB;
});

export default getHeardABTesting;
