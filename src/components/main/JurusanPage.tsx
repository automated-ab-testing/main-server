"use client";

import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

import saveJurusan from "~/utils/user/action/save-jurusan";

const formSchema = z.object({
  formJurusan: z
    .string()
    .min(1, {
      message: "Jurusan is required",
    })
    .max(255, {
      message: "Jurusan is too long",
    }),
});

type FormValues = z.infer<typeof formSchema>;

export default function JurusanPage({
  defaultJurusan,
}: {
  defaultJurusan: string | undefined;
}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      formJurusan: defaultJurusan,
    },
    mode: "onBlur",
  });

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = form;

  const onSubmit: SubmitHandler<FormValues> = async (data) =>
    await saveJurusan(data).catch(() => toast.error("Something went wrong!"));

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex max-w-xl flex-col items-center justify-center gap-8"
    >
      <h1 className="text-6xl font-bold">Jurusan</h1>
      <p className="text-left">Sekarang kamu lagi ambil jurusan apanih?</p>
      <Input
        {...register("formJurusan")}
        label="Jurusan"
        placeholder="Jurusan"
        isInvalid={errors.formJurusan !== undefined}
        errorMessage={errors.formJurusan?.message}
      />
      <Button type="submit">Next</Button>
    </form>
  );
}
