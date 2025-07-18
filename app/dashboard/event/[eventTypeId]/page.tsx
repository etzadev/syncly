import { EditEventForm } from "@/app/components/EditEventTypeForm";
import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";

async function getData(eventTypeId: string) {
  const data = await prisma.eventType.findUnique({
    where: {
      id: eventTypeId,
    },
    select: {
      id: true,
      title: true,
      duration: true,
      url: true,
      description: true,
      videoCallSoftware: true,
    },
  });

  if (!data) return notFound();

  return data;
}

export default async function EditRoute(props: {
  params: Promise<{ eventTypeId: string }>;
}) {
  const { eventTypeId } = await props.params;
  const data = await getData(eventTypeId);

  return (
    <EditEventForm
      id={data.id}
      title={data.title}
      duration={data.duration}
      url={data.url}
      description={data.description}
      videoCallSoftware={data.videoCallSoftware}
    />
  );
}
