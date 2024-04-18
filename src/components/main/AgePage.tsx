"use client";

import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

import saveAge from "~/utils/user/action/save-age";

const formSchema = z.object({
  formAge: z
    .number()
    .int({
      message: "Age must be an integer",
    })
    .nonnegative({
      message: "Age must be positive",
    }),
});

type FormValues = z.infer<typeof formSchema>;

export default function AgePage({
  defaultAge,
}: {
  defaultAge: number | undefined;
}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      formAge: defaultAge,
    },
    mode: "onBlur",
  });

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = form;

  const onSubmit: SubmitHandler<FormValues> = async (data) =>
    await saveAge(data).catch(() => toast.error("Something went wrong!"));

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex max-w-xl flex-col items-center justify-center gap-8"
    >
      <h1 className="text-6xl font-bold">Usia</h1>
      <p className="text-left">Usiamu berapa?</p>
      <Input
        {...register("formAge", {
          valueAsNumber: true,
        })}
        type="number"
        label="Age"
        placeholder="Enter your age"
        errorMessage={errors.formAge?.message}
      />
      <Button type="submit">Next</Button>
    </form>
  );
}
