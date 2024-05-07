"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import seedrandom from "seedrandom";

import { db } from "~/server/db";

const createEventLog = async () => {
  // If the user already has an event log id, redirect to the next page
  if (cookies().has("event-log-id")) redirect("/name");

  const eventLog = await db.$transaction(async (tx) => {
    // Define the seed for the random number generator
    const rng = seedrandom();

    // Get all active tests
    const activeTests = await tx.test.findMany({
      where: {
        isActive: true,
      },
      select: {
        id: true,
      },
    });

    // If there are no active tests, return empty data
    if (activeTests.length === 0) return null;

    // Randomly select one active test
    const randomTestIdx =
      ((rng.int32() % activeTests.length) + activeTests.length) %
      activeTests.length;
    const randomTest = activeTests[randomTestIdx];

    if (!randomTest) return null;

    // Get all versions in the active test
    const versionA = await tx.version.findUnique({
      where: {
        testId_isPreferred: {
          testId: randomTest.id,
          isPreferred: true,
        },
      },
      select: {
        id: true,
      },
    });

    if (!versionA) return null;

    const versionB = await tx.version.findUnique({
      where: {
        testId_isPreferred: {
          testId: randomTest.id,
          isPreferred: false,
        },
      },
      select: {
        id: true,
      },
    });

    if (!versionB) return null;

    // Fetch the latest fifty submitted event logs for version A and version B
    const submittedEventLogs = await tx.eventLog.findMany({
      select: {
        versionId: true,
        isConsentClicked: true,
      },
      where: {
        versionId: {
          in: [versionA.id, versionB.id],
        },
        isFormSubmitted: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 50, // This is hardcoded for simplicity
    });

    // Count the number of submitted event logs
    const submittedCount = submittedEventLogs.length;

    // Get the event logs for the consent clicked
    const consentClickedEventLogs = submittedEventLogs.filter(
      (eventLog) => eventLog.isConsentClicked,
    );

    // Count the number of clicked event logs for each version
    const clickedVersionACount = consentClickedEventLogs.filter(
      (eventLog) => eventLog.versionId === versionA.id,
    ).length;

    const clickedVersionBCount = consentClickedEventLogs.filter(
      (eventLog) => eventLog.versionId === versionB.id,
    ).length;

    // Randomly select the version using HMM
    const hmmVersion =
      clickedVersionACount >= clickedVersionBCount
        ? rng.quick() < 0.5 // HMM is not activated
          ? versionA
          : versionB
        : rng.quick() <
            0.5 +
              (0.5 * (clickedVersionBCount - clickedVersionACount)) /
                submittedCount // HMM is activated
          ? versionA
          : versionB;

    // Create a new event log with the selected version
    const newEventLog = await tx.eventLog.create({
      data: {
        versionId: hmmVersion.id,
      },
      select: {
        id: true,
        versionId: true,
      },
    });

    return newEventLog;
  });

  // If there is a new event log, set the event log id
  if (eventLog) cookies().set("event-log-id", eventLog.id);

  // Redirect to the next page
  redirect("/name");
};

export default createEventLog;
