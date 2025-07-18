"use client";

import { EditEventTypeAction } from "@/app/actions";
import { SubmitButton } from "@/app/components/SubmitButtons";
import { eventTypeSchema } from "@/app/lib/zodSchemas";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/ButtonGroup";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import Link from "next/link";
import { useActionState, useState } from "react";

type VideoCallProvider = "Google Meet" | "Microsoft Teams";

interface IAppProps {
  id: string;
  title: string;
  duration: number;
  url: string;
  description: string;
  videoCallSoftware: string;
}

export function EditEventForm({
  id,
  title,
  duration,
  url,
  description,
  videoCallSoftware,
}: IAppProps) {
  const [activePlatform, setActivePlatform] = useState<VideoCallProvider>(
    videoCallSoftware as VideoCallProvider
  );

  const [lastResult, action] = useActionState(EditEventTypeAction, undefined);
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: eventTypeSchema,
      });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <div className="w-full h-full flex flex-1 items-center justify-center">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>Editar evento</CardTitle>
          <CardDescription>
            Actualiza los detalles de tu evento y asegúrate de que tus invitados
            tengan la mejor experiencia al agendar contigo.
          </CardDescription>
        </CardHeader>

        <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
          <input type="hidden" name="id" value={id} />
          <CardContent className="grid gap-y-5">
            <div className="flex flex-col gap-y-2">
              <Label>Titulo</Label>
              <Input
                name={fields.title.name}
                key={fields.title.key}
                defaultValue={title}
                placeholder="Reunión de 30 minutos"
              />
              <p className="text-red-500">{fields.title.errors}</p>
            </div>

            <div className="flex flex-col gap-y-2">
              <Label>URL Slug</Label>
              <div className="flex rounded-md">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-muted bg-muted text-sm text-muted-foreground">
                  etzadev.com/
                </span>
                <Input
                  name={fields.url.name}
                  key={fields.url.key}
                  defaultValue={url}
                  placeholder="reunion-url-1"
                  className="rounded-l-none"
                />
              </div>
              <p className="text-red-500">{fields.url.errors}</p>
            </div>

            <div className="flex flex-col gap-y-2">
              <Label>Descripción</Label>
              <Textarea
                name={fields.description.name}
                key={fields.description.key}
                defaultValue={description}
                placeholder="Nos vemos en esta reunión, será genial compartir contigo."
              />
              <p className="text-red-500">{fields.description.errors}</p>
            </div>

            <div className="flex flex-col gap-y-2">
              <Label>Duración</Label>
              <Select
                name={fields.duration.name}
                key={fields.duration.key}
                defaultValue={String(duration)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona una duración" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Duración</SelectLabel>
                    <SelectItem value="15">15 minutos</SelectItem>
                    <SelectItem value="30">30 minutos</SelectItem>
                    <SelectItem value="45">45 minutos</SelectItem>
                    <SelectItem value="60">1 hora</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <p className="text-red-500">{fields.duration.errors}</p>
            </div>

            <div className="grid gap-y-2">
              <Label>Servicio de videoconferencia</Label>
              <input
                type="hidden"
                name={fields.videoCallSoftware.name}
                value={activePlatform}
              />
              <ButtonGroup>
                <Button
                  key="meet"
                  type="button"
                  variant={
                    activePlatform === "Google Meet" ? "secondary" : "ghost"
                  }
                  className="grow cursor-pointer"
                  onClick={() => setActivePlatform("Google Meet")}
                >
                  Google Meet
                </Button>
                <Button
                  key="teams"
                  type="button"
                  variant={
                    activePlatform === "Microsoft Teams" ? "secondary" : "ghost"
                  }
                  className="grow cursor-pointer"
                  onClick={() => setActivePlatform("Microsoft Teams")}
                >
                  Microsoft Teams
                </Button>
              </ButtonGroup>
              <p className="text-red-500">{fields.videoCallSoftware.errors}</p>
            </div>
          </CardContent>

          <CardFooter className="w-full flex justify-between mt-6">
            <Button variant="destructive" asChild>
              <Link href="/dashboard">Cancelar</Link>
            </Button>
            <SubmitButton text="Guardar cambios" />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
