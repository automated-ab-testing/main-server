import { redirect } from "next/navigation";

import { getServerAuthSession } from "~/server/auth";
import getJurusan from "~/utils/user/fetch/get-jurusan";
import JurusanPage from "~/components/main/JurusanPage";

export default async function FormPage() {
  // Get the server session
  const session = await getServerAuthSession();

  if (session !== null) redirect("/data");

  // Get the default jurusan
  const jurusan = await getJurusan();

  return (
    <main className="flex min-h-screen items-center justify-center">
      <JurusanPage defaultJurusan={jurusan ?? undefined} />
    </main>
  );
}
