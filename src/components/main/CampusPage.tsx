"use client";

import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

import saveCampus from "~/utils/user/action/save-campus";

const formSchema = z.object({
  formCampus: z
    .string()
    .min(1, {
      message: "Campus is required",
    })
    .max(255, {
      message: "Campus is too long",
    }),
});

type FormValues = z.infer<typeof formSchema>;

export default function CampusPage({
  defaultCampus,
}: {
  defaultCampus: string | undefined;
}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      formCampus: defaultCampus,
    },
    mode: "onBlur",
  });

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = form;

  const onSubmit: SubmitHandler<FormValues> = async (data) =>
    await saveCampus(data).catch(() => toast.error("Something went wrong!"));

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex max-w-xl flex-col items-center justify-center gap-8"
    >
      <h1 className="text-6xl font-bold">Kampus</h1>
      <p className="text-left">
        Kamu lagi sekolah/kuliah di mana? Jika berkenan sebut nama kampusnya ya!
      </p>
      <Input
        {...register("formCampus")}
        type="text"
        label="Campus"
        placeholder="Enter your campus"
        isInvalid={errors.formCampus !== undefined}
        errorMessage={errors.formCampus?.message}
      />
      <Button type="submit">Next</Button>
    </form>
  );
}
