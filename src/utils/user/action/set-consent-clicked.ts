"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { db } from "~/server/db";

const setConsentClicked = async (args: { formConsent: boolean }) => {
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
      isConsentClicked: args.formConsent,
    },
  });

  // If the form consent is false, redirect to the finish page
  if (!args.formConsent) redirect("/finish");

  // Else, redirect to the heard AB testing page
  redirect("/heard-ab-testing");
};

export default setConsentClicked;
