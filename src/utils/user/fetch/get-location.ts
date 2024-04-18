import "server-only";

import { cache } from "react";
import { cookies } from "next/headers";

import { db } from "~/server/db";

const getLocation = cache(async () => {
  // Get the event log id from the cookies
  const eventLogId = cookies().get("event-log-id");

  if (!eventLogId) return null;

  // Get the event log
  const eventLog = await db.eventLog.findUnique({
    where: {
      id: eventLogId.value,
    },
    select: {
      formLocation: true,
    },
  });

  if (!eventLog) return null;

  return eventLog.formLocation;
});

export default getLocation;
