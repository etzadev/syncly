"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/app/components/SubmitButtons";
import { SettingsAction } from "@/app/actions";
import { parseWithZod } from "@conform-to/zod";
import { settingsSchema } from "@/app/lib/zodSchemas";
import { useForm } from "@conform-to/react";
import { useActionState, useState } from "react";
import { X } from "lucide-react";
import { UploadDropzone } from "@/app/lib/uploadthing";
import { toast } from "sonner";
import Image from "next/image";

interface iAppProps {
  fullName: string;
  email: string;
  profileImage: string;
}

export function SettingsForm({ fullName, email, profileImage }: iAppProps) {
  const [lastResult, action] = useActionState(SettingsAction, undefined);
  const [currentProfileImage, setCurrentProfileImage] = useState(profileImage);
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: settingsSchema,
      });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const handleDeleteImage = () => setCurrentProfileImage("");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Ajustes</CardTitle>
        <CardDescription>
          Administra la configuración de tu cuenta
        </CardDescription>
      </CardHeader>

      <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
        <CardContent className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-2">
            <Label>Nombre</Label>
            <Input
              name={fields.fullName.name}
              key={fields.fullName.key}
              defaultValue={fullName}
              placeholder="Johan García Trejo"
            />
            <p className="text-red-500 text-sm">{fields.fullName.errors}</p>
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Correo electrónico</Label>
            <Input defaultValue={email} placeholder="test@test.com" disabled />
          </div>

          <div className="grid gap-y-5">
            <Label>Imagen de perfil</Label>
            <input
              type="hidden"
              name={fields.profileImage.name}
              key={fields.profileImage.key}
              value={currentProfileImage}
            />

            {currentProfileImage ? (
              <div className="relative size-16">
                <Image
                  src={currentProfileImage}
                  alt="Profile Image"
                  width={64}
                  height={64}
                  className="rounded-lg"
                />

                <Button
                  onClick={handleDeleteImage}
                  variant="destructive"
                  size="icon"
                  type="button"
                  className="absolute -top-3 -right-3 cursor-pointer hover:scale-110 transition-transform"
                >
                  <X className="size-4" />
                </Button>
              </div>
            ) : (
              <UploadDropzone
                onClientUploadComplete={(res) => {
                  setCurrentProfileImage(res[0].ufsUrl);
                  toast.success("Imagen subida correctamente");
                }}
                onUploadError={(error: Error) => {
                  console.error("Upload failed", error);
                  toast.error(`Error al subir la imagen: ${error.message}`);
                }}
                endpoint="imageUploader"
              />
            )}
            <p className="text-red-500 text-sm">{fields.profileImage.errors}</p>
          </div>
        </CardContent>

        <CardFooter>
          <SubmitButton
            text="Guardar Cambios"
            className="mt-5 cursor-pointer"
          />
        </CardFooter>
      </form>
    </Card>
  );
}
