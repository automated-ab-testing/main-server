"use client";

import { toast } from "react-toastify";
import { Button } from "@nextui-org/button";

import setSubmitted from "~/utils/user/action/set-submitted";

export default function SubmitPage() {
  return (
    <div className="flex max-w-xl flex-col items-center justify-center gap-8">
      <h1 className="text-8xl font-bold">Selesai!</h1>
      <p className="text-left">Terima kasih sudah bersedia menyelesaikan tes</p>
      <Button
        onClick={async () =>
          await setSubmitted().catch(() => toast.error("Something went wrong!"))
        }
      >
        Submit
      </Button>
    </div>
  );
}
