"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Link2 } from "lucide-react";
import { toast } from "sonner";

export function CopyLinkMenu({ meetingUrl }: { meetingUrl: string }) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(meetingUrl);
      toast.success("Enlace copiado al portapapeles");
    } catch (error) {
      console.error("Error al copiar el enlace:", error);
      toast.error("Error al copiar el enlace");
    }
  };

  return (
    <DropdownMenuItem className="cursor-pointer" onSelect={handleCopy}>
      <Link2 className="mr-2 size-4" />
      Copiar
    </DropdownMenuItem>
  );
}
