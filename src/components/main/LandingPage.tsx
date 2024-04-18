import { Button } from "@nextui-org/button";

import createEventLog from "~/utils/user/create-event-log";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 py-2">
      <h1 className="font-bold">Halo!</h1>
      <p>
        Minta waktunya sebentar ya! Terdapat pilihan untuk mengosongkan tiap
        pertanyaan, jadi kalo tidak berkenan membagikan data dirinya, boleh
        dilewatkan pertanyaannya hingga akhir pengumpulan survey.
      </p>
      <Button onClick={() => void createEventLog()}>Next</Button>
    </div>
  );
}
