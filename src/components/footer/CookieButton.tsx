"use client";

import { Button } from "@nextui-org/react";

import createEventLog from "~/utils/user/create-event-log";

export default function CookieButton() {
  return (
    <Button
      onClick={async () => {
        await createEventLog();
      }}
    >
      Set Event Log
    </Button>
  );
}
