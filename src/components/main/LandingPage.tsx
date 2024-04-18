"use client";

import { toast } from "react-toastify";
import { Button } from "@nextui-org/button";

import createEventLog from "~/utils/user/action/create-event-log";

export default function LandingPage() {
  return (
    <div className="flex max-w-xl flex-col items-center justify-center gap-8">
      <h1 className="text-8xl font-bold">Halo!</h1>
      <p className="text-left">
        Minta waktunya sebentar ya! Terdapat pilihan untuk mengosongkan tiap
        pertanyaan, jadi kalo tidak berkenan membagikan data dirinya, boleh
        dilewatkan pertanyaannya hingga akhir pengumpulan survey.
      </p>
      <Button
        onClick={async () =>
          await createEventLog().catch(() =>
            toast.error("Something went wrong!"),
          )
        }
      >
        Next
      </Button>
    </div>
  );
}
