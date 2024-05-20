"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { db } from "~/server/db";

const setHeardABTesting = async (args: { formHeard: boolean }) => {
  // Get the event log id from the cookies
  const eventLogId = cookies().get("event-log-id");

  // If the event log id is not found, redirect to the first page
  if (!eventLogId) redirect("/");

  // Update the event log
  await db.eventLog.update({
    where: {
      id: eventLogId.value,
    },
    data: {
      heardAboutAB: args.formHeard,
    },
  });

  // If the form heard is false, redirect to the finish page
  if (!args.formHeard) redirect("/finish");

  // Else, redirect to the experience AB testing page
  redirect("/experience-ab-testing");
};

export default setHeardABTesting;
