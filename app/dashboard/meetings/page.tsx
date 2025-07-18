import { CancelMeetingAction } from "@/app/actions";
import { EmptyState } from "@/app/components/EmptyState";
import { SubmitButton } from "@/app/components/SubmitButtons";
import prisma from "@/app/lib/db";
import { requireUser } from "@/app/lib/hooks";
import { nylas } from "@/app/lib/nylas";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format, fromUnixTime } from "date-fns";
import { Video } from "lucide-react";

async function getData(userId: string) {
  const userData = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      grantID: true,
      grantEmail: true,
    },
  });

  if (!userData) throw new Error("Usuario no encontrado");

  const data = await nylas.events.list({
    identifier: userData.grantID as string,
    queryParams: {
      calendarId: "primary",
    },
  });

  return data;
}

export default async function MeetingsRoute() {
  const session = await requireUser();
  const data = await getData(session.user?.id as string);

  return (
    <>
      {data.data.length < 1 ? (
        <EmptyState
          title="No se encontraron reuniones"
          description="Aún no tienes ninguna reunión."
          buttonText="Crear un nuevo tipo de evento"
          href="/dashboard/new"
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Tus próximos encuentros</CardTitle>
            <CardDescription>
              Consulte su próximo evento reservado y acceda al enlace
              correspondiente al tipo de reunión.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {data.data.map((item) => (
              <form action={CancelMeetingAction} key={item.id}>
                <input type="hidden" name="eventId" value={item.id} />
                <div className="grid grid-cols-3 justify-between items-center">
                  <div>
                    <p className="text-muted-foreground text-sm">
                      {/* @ts-ignore */}
                      {format(fromUnixTime(item.when.startTime), "EEE, dd MMM")}
                    </p>
                    <p className="text-muted-foreground text-xs pt-1">
                      {
                        /* @ts-ignore */ format(
                          fromUnixTime(item.when.startTime),
                          "hh:mm a"
                        )
                      }{" "}
                      - {/* @ts-ignore */}
                      {format(fromUnixTime(item.when.endTime), "hh:mm a")}
                    </p>

                    <div className="flex items-center mt-1">
                      <Video className="size-4 mr-2 text-primary" />
                      <a
                        className="text-xs text-primary underline underline-offset-4"
                        // @ts-ignore
                        href={item.conferencing.details.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Unirse a la reunión
                      </a>
                    </div>
                  </div>

                  <div className="flex flex-col items-start">
                    <h2 className="text-sm font-medium">{item.title}</h2>
                    <p className="text-sm text-muted-foreground">{`Tú y ${item.participants[0].name}`}</p>
                  </div>

                  <SubmitButton
                    text="Cancelar evento"
                    variant="destructive"
                    className="flex ml-auto w-auto"
                  />
                </div>

                <Separator className="my-4" />
              </form>
            ))}
          </CardContent>
        </Card>
      )}
    </>
  );
}

// TODO: 11:21:30
