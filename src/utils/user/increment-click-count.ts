"use server";

import { db } from "~/server/db";

const incrementClickCount = async () => {
  // Update the event log
  await db.eventLog.update({
    where: {
      deviceId: "bf993b57-db0e-451c-9616-d3525932c4bf",
    },
    data: {
      isClicked: true,
    },
  });
};

export default incrementClickCount;
