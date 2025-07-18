import prisma from "@/app/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RenderCalendar } from "@/app/components/bookingForm/RenderCalendar";
import { CalendarX2, Clock, VideoIcon } from "lucide-react";
import { notFound } from "next/navigation";
import { TimeTable } from "@/app/components/bookingForm/TimeTable";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/app/components/SubmitButtons";
import { CreateMeetingAction } from "@/app/actions";
import Image from "next/image";

const parseLocalDate = (dateStr: string) => {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
};

async function getData(eventUrl: string, userName: string) {
  const data = await prisma.eventType.findFirst({
    where: {
      User: {
        userName,
      },
      url: eventUrl,
      active: true,
    },
    select: {
      id: true,
      title: true,
      duration: true,
      description: true,
      videoCallSoftware: true,
      User: {
        select: {
          name: true,
          image: true,
          availability: {
            select: {
              day: true,
              isActive: true,
            },
          },
        },
      },
    },
  });

  if (!data) return notFound();

  return data;
}

export default async function BookingFormRoute(props: {
  params: Promise<{ username: string; eventUrl: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { username, eventUrl } = await props.params;
  const searchParams = await props.searchParams;

  const dateParam = Array.isArray(searchParams.date)
    ? searchParams.date[0]
    : searchParams.date;

  const selectedDate = dateParam ? parseLocalDate(dateParam) : new Date();

  const formattedDate = new Intl.DateTimeFormat("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(selectedDate);

  const data = await getData(eventUrl, username);

  const showForm = !!searchParams.date && !!searchParams.time;

  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      {showForm ? (
        <Card className="max-w-[600px] w-full">
          <CardContent className="p-5 md:grid md:grid-cols-[1fr_auto_1fr] gap-4">
            <div>
              <Image
                src={data.User?.image as string}
                alt={`Foto de perfil de ${data.User?.name}`}
                width={40}
                height={40}
                className="rounded-full"
              />
              <p className="text-sm font-medium text-muted-foreground mt-1">
                {data.User?.name}
              </p>
              <h1 className="text-xl font-semibold mt-2">{data.title}</h1>
              <p className="text-sm font-medium text-muted-foreground">
                {data.description}
              </p>

              <div className="mt-5 flex flex-col gap-y-3">
                <p className="flex items-center">
                  <CalendarX2 className="size-4 mr-2 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {formattedDate}
                  </span>
                </p>

                <p className="flex items-center">
                  <Clock className="size-4 mr-2 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {data.duration} Minutos
                  </span>
                </p>

                <p className="flex items-center">
                  <VideoIcon className="size-4 mr-2 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {data.videoCallSoftware}
                  </span>
                </p>
              </div>
            </div>

            <Separator orientation="vertical" className="h-full w-[1px]" />

            <form
              className="flex flex-col gap-y-4"
              action={CreateMeetingAction}
            >
              <input type="hidden" name="username" value={username} />
              <input type="hidden" name="eventTypeId" value={data.id} />
              <input type="hidden" name="fromTime" value={searchParams.time} />
              <input type="hidden" name="eventDate" value={searchParams.date} />
              <input type="hidden" name="meetingLength" value={data.duration} />
              <input
                type="hidden"
                name="provider"
                value={data.videoCallSoftware}
              />

              <div className="flex flex-col gap-y-2">
                <Label>Tu Nombre:</Label>
                <Input name="name" placeholder="John Doe" />
              </div>
              <div className="flex flex-col gap-y-2">
                <Label>Tu Email:</Label>
                <Input
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                />
              </div>
              <SubmitButton className="w-full mt-6" text="Programar reunión" />
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card className="max-w-[1000px] w-full mx-auto">
          <CardContent className="p-5 md:grid md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4">
            <div>
              <Image
                src={data.User?.image as string}
                alt={`Foto de perfil de ${data.User?.name}`}
                width={40}
                height={40}
                className="rounded-full"
              />
              <p className="text-sm font-medium text-muted-foreground mt-1">
                {data.User?.name}
              </p>
              <h1 className="text-xl font-semibold mt-2">{data.title}</h1>
              <p className="text-sm font-medium text-muted-foreground">
                {data.description}
              </p>

              <div className="mt-5 flex flex-col gap-y-3">
                <p className="flex items-center">
                  <CalendarX2 className="size-4 mr-2 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {formattedDate}
                  </span>
                </p>

                <p className="flex items-center">
                  <Clock className="size-4 mr-2 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {data.duration} Minutos
                  </span>
                </p>

                <p className="flex items-center">
                  <VideoIcon className="size-4 mr-2 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {data.videoCallSoftware}
                  </span>
                </p>
              </div>
            </div>

            <Separator orientation="vertical" className="h-full w-[1px]" />

            <RenderCalendar
              availability={
                data.User?.availability as { day: string; isActive: boolean }[]
              }
            />

            <Separator orientation="vertical" className="h-full w-[1px]" />

            <TimeTable
              userName={username}
              selectedDate={selectedDate}
              duration={data.duration}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
