"use client";

import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { Checkbox } from "@nextui-org/checkbox";
import { Button } from "@nextui-org/button";

import setConsentClicked from "~/utils/user/action/set-consent-clicked";

const formSchema = z.object({
  formConsent: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

export default function SecondConsentVersion({
  defaultConsentClicked,
}: {
  defaultConsentClicked: boolean;
}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      formConsent: defaultConsentClicked,
    },
    mode: "onBlur",
  });

  const { handleSubmit, control } = form;

  const onSubmit: SubmitHandler<FormValues> = async (data) =>
    await setConsentClicked(data).catch(() =>
      toast.error("Something went wrong!"),
    );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex max-w-xl flex-col items-center justify-center gap-8"
    >
      <h1 className="text-6xl font-bold">Consent</h1>
      <p className="text-center">
        Apakah Anda bersedia apabila data Anda digunakan untuk keperluan Tugas
        Akhir ini?
      </p>
      <Controller
        control={control}
        name="formConsent"
        render={({ field: { onChange, value } }) => (
          <Checkbox onChange={onChange} isSelected={value}>
            Bersedia
          </Checkbox>
        )}
      />
      <Button type="submit">Next</Button>
    </form>
  );
}
