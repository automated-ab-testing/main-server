"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { db } from "~/server/db";

const saveAge = async (args: { formAge: number }) => {
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
      formAge: args.formAge,
    },
  });

  // Redirect to the next page
  redirect("/location");
};

export default saveAge;
