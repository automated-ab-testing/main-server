"use client";

import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { Switch } from "@nextui-org/switch";
import { Button } from "@nextui-org/button";

import setHeardABTesting from "~/utils/user/action/save-heard-ab-testing";

const formSchema = z.object({
  formHeard: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

export default function HeardPage({
  defaultFormHeard,
}: {
  defaultFormHeard: boolean;
}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      formHeard: defaultFormHeard,
    },
    mode: "onBlur",
  });

  const { handleSubmit, control } = form;

  const onSubmit: SubmitHandler<FormValues> = async (data) =>
    await setHeardABTesting(data).catch(() =>
      toast.error("Something went wrong!"),
    );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex max-w-xl flex-col items-center justify-center gap-8"
    >
      <h1 className="text-6xl font-bold">A/B Testing</h1>
      <p className="text-center">
        Apakah Anda pernah mendengar tentang A/B Testing sebelumnya?
      </p>
      <Controller
        control={control}
        name="formHeard"
        render={({ field: { onChange, value } }) => (
          <Switch onChange={onChange} isSelected={value}>
            Pernah
          </Switch>
        )}
      />
      <Button type="submit">Next</Button>
    </form>
  );
}
