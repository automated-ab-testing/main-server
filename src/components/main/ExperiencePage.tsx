"use client";

import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { Textarea } from "@nextui-org/react";
import { Button } from "@nextui-org/button";

import saveExperienceABTesting from "~/utils/user/action/save-experience-ab-testing";

const formSchema = z.object({
  formExperience: z
    .string()
    .min(1, {
      message: "Experience is required",
    })
    .max(1000, {
      message: "Experience is too long",
    }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ExperiencePage({
  defaultFormExperience,
}: {
  defaultFormExperience: string | undefined;
}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      formExperience: defaultFormExperience,
    },
    mode: "onBlur",
  });

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = form;

  const onSubmit: SubmitHandler<FormValues> = async (data) =>
    await saveExperienceABTesting(data).catch(() =>
      toast.error("Something went wrong!"),
    );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex max-w-xl flex-col items-center justify-center gap-8"
    >
      <h1 className="text-6xl font-bold">Pengalaman A/B Testing</h1>
      <div className="items-center justify-center gap-4">
        <p className="text-left">
          Atau kamu sendiri pernah menjadi subjek dari testing? Tolong ceritakan
          ya
        </p>
        <p className="text-left">
          Funfact Instagram sering banget loh menerapkan testing itu ke
          penggunanya!
        </p>
      </div>
      <Textarea
        {...register("formExperience")}
        label="Pengalaman A/B Testing"
        placeholder="Ceritakan pengalaman A/B testing kamu disini"
        isInvalid={errors.formExperience !== undefined}
        errorMessage={errors.formExperience?.message}
      />
      <Button type="submit">Next</Button>
    </form>
  );
}
