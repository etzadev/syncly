"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import LogoGoogle from "@/public/google.svg";
import LogoGithub from "@/public/github.svg";
import { cn } from "@/lib/utils";

interface iAppProps {
  text: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
  className?: string;
}

export function SubmitButton({ text, variant, className }: iAppProps) {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled variant="outline">
          <Loader2 className="size-4 mr-2 animate-spin" /> Por favor espere...
        </Button>
      ) : (
        <Button
          type="submit"
          variant={variant}
          className={cn("w-fit cursor-pointer", className)}
        >
          {text}
        </Button>
      )}
    </>
  );
}

export function GoogleAuthButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled variant="outline" className="w-full cursor-pointer">
          <Loader2 className="size-4 mr-2 animate-spin" /> Por favor espere...
        </Button>
      ) : (
        <Button variant="outline" className="w-full cursor-pointer">
          <Image src={LogoGoogle} alt="Google Logo" className="size-4 mr-2" />
          Iniciar sesión con Google
        </Button>
      )}
    </>
  );
}

export function GitHubAuthButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled variant="outline" className="w-full cursor-pointer">
          <Loader2 className="size-4 mr-2 animate-spin" /> Por favor espere...
        </Button>
      ) : (
        <Button variant="outline" className="w-full cursor-pointer">
          <Image src={LogoGithub} alt="GitHub Logo" className="size-4 mr-2" />
          Iniciar sesión con GitHub
        </Button>
      )}
    </>
  );
}
