"use server";

import { cookies } from "next/headers";

import { db } from "~/server/db";

const incrementClickCount = async () => {
  // Get the event log id from the cookies
  const eventLogId = cookies().get("event-log-id");

  if (!eventLogId) return;

  // Update the event log
  await db.eventLog.update({
    where: {
      id: eventLogId.value,
    },
    data: {
      isConsentClicked: true,
    },
  });
};

export default incrementClickCount;
