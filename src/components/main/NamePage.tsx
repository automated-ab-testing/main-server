"use client";

import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

import saveName from "~/utils/user/action/save-name";

const formSchema = z.object({
  formName: z
    .string()
    .min(1, {
      message: "Name is required",
    })
    .max(255, {
      message: "Name is too long",
    }),
});

type FormValues = z.infer<typeof formSchema>;

export default function NamePage({
  defaultName,
}: {
  defaultName: string | undefined;
}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      formName: defaultName,
    },
    mode: "onBlur",
  });

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = form;

  const onSubmit: SubmitHandler<FormValues> = async (data) =>
    await saveName(data).catch(() => toast.error("Something went wrong!"));

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex max-w-xl flex-col items-center justify-center gap-8"
    >
      <h1 className="text-6xl font-bold">Nama</h1>
      <p className="text-left">Boleh nama asli maupun samaran</p>
      <Input
        {...register("formName")}
        label="Name"
        placeholder="Your name"
        errorMessage={errors.formName?.message}
      />
      <Button type="submit">Next</Button>
    </form>
  );
}
