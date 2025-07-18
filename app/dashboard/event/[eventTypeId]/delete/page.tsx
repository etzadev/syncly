import { DeleteEventTypeAction } from "@/app/actions";
import { SubmitButton } from "@/app/components/SubmitButtons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default async function DeleteEventType({
  params,
}: {
  params: Promise<{ eventTypeId: string }>;
}) {
  const { eventTypeId } = await params;

  return (
    <div className="flex flex-1 items-center justify-center">
      <Card className="max-w-[450px] w-full">
        <CardHeader>
          <CardTitle>Eliminar Evento</CardTitle>
          <CardDescription>
            ¿Estás seguro que deseas eliminar este evento?
          </CardDescription>
        </CardHeader>
        <CardFooter className="w-full flex justify-between">
          <Button variant="secondary" asChild className="cursor-pointer">
            <Link href="/dashboard">Cancelar</Link>
          </Button>
          <form action={DeleteEventTypeAction}>
            <input type="hidden" name="id" value={eventTypeId} />
            <SubmitButton text="Eliminar" variant="destructive" />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
