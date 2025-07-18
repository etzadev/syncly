"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OnboardingAction } from "@/app/actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { onboardingSchema } from "@/app/lib/zodSchemas";
import { SubmitButton } from "@/app/components/SubmitButtons";
import { useActionState } from "react";

export default function OnboardingRoute() {
  const [lastResult, action] = useActionState(OnboardingAction, undefined);

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: onboardingSchema,
      });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <Card className="max-w-md w-full px-2 py-6">
        <CardHeader>
          <CardTitle>
            Bienvenido a <span className="font-extrabold">Syn</span>cly
          </CardTitle>
          <CardDescription>
            Necesitamos la siguiente información para configurar tu perfil
          </CardDescription>
        </CardHeader>
        <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
          <CardContent className="flex flex-col gap-y-5">
            <div className="grid gap-y-2">
              <Label>Nombre Completo:</Label>
              <Input
                name={fields.fullName.name}
                defaultValue={fields.fullName.initialValue}
                key={fields.fullName.key}
                placeholder="John Doe"
              />
              <p className="text-red-400 text-sm">{fields.fullName.errors}</p>
            </div>

            <div className="grid gap-y-2">
              <Label>Nombre de Usuario:</Label>
              <div className="flex rounded-md">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-muted bg-muted text-sm text-muted-foreground">
                  etzadev.com/
                </span>
                <Input
                  name={fields.userName.name}
                  defaultValue={fields.userName.initialValue}
                  key={fields.userName.key}
                  placeholder="usuario"
                  className="rounded-l-none"
                />
              </div>
              <p className="text-red-400 text-sm">{fields.userName.errors}</p>
            </div>
          </CardContent>
          <CardFooter className="mt-6">
            <SubmitButton
              text="Enviar"
              className="w-full cursor-pointer text-white"
            />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
