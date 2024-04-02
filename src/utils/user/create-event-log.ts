"use server";

import { cookies } from "next/headers";
import seedrandom from "seedrandom";

import { db } from "~/server/db";

const createEventLog = async () => {
  // If the user already has an event log id, return
  if (cookies().has("event-log-id")) return;

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

    // Randomly select one active test (deterministically using the seed)
    const randomTestIdx =
      ((rng.int32() % activeTests.length) + activeTests.length) %
      activeTests.length;
    const randomTest = activeTests[randomTestIdx];

    if (!randomTest) return null;

    // Get all versions in the active test
    const versions = await tx.version.findMany({
      where: {
        testId: randomTest.id,
      },
      select: {
        id: true,
      },
    });

    // If there are no versions in the active test, return empty data
    if (versions.length === 0) return null;

    // Randomly select one version in the active test (deterministically using the seed)
    // NOTE: Distribusi peluang dapat diubah dengan menggunakan HMM
    const randomVersionIdx =
      ((rng.int32() % versions.length) + versions.length) % versions.length;
    const randomVersion = versions[randomVersionIdx];

    if (!randomVersion) return null;

    // Create a new event log
    const newEventLog = await tx.eventLog.create({
      data: {
        versionId: randomVersion.id,
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
};

export default createEventLog;
