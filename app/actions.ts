"use server";

import prisma from "@/app/lib/db";
import { requireUser } from "@/app/lib/hooks";
import { parseWithZod } from "@conform-to/zod";
import {
  eventTypeSchema,
  onboardingSchemaValidation,
  settingsSchema,
} from "@/app/lib/zodSchemas";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { nylas } from "@/app/lib/nylas";

export async function OnboardingAction(prevState: unknown, formData: FormData) {
  const session = await requireUser();

  const submission = await parseWithZod(formData, {
    schema: onboardingSchemaValidation({
      async isUsernameUnique() {
        const existingUsername = await prisma.user.findUnique({
          where: {
            userName: formData.get("userName") as string,
          },
        });

        return !existingUsername;
      },
    }),

    async: true,
  });

  if (submission.status !== "success") return submission.reply();

  await prisma.user.update({
    where: {
      id: session.user?.id,
    },
    data: {
      name: submission.value.fullName,
      userName: submission.value.userName,
      availability: {
        createMany: {
          data: [
            {
              day: "Monday",
              fromTime: "08:00",
              tillTime: "16:00",
            },
            {
              day: "Tuesday",
              fromTime: "08:00",
              tillTime: "16:00",
            },
            {
              day: "Wednesday",
              fromTime: "08:00",
              tillTime: "16:00",
            },
            {
              day: "Thursday",
              fromTime: "08:00",
              tillTime: "16:00",
            },
            {
              day: "Friday",
              fromTime: "08:00",
              tillTime: "16:00",
            },
            {
              day: "Saturday",
              fromTime: "08:00",
              tillTime: "16:00",
            },
            {
              day: "Sunday",
              fromTime: "08:00",
              tillTime: "16:00",
            },
          ],
        },
      },
    },
  });

  return redirect("/onboarding/grant-id");
}

export async function SettingsAction(prevState: unknown, formData: FormData) {
  const session = await requireUser();

  const submission = parseWithZod(formData, {
    schema: settingsSchema,
  });

  if (submission.status !== "success") return submission.reply();

  await prisma.user.update({
    where: {
      id: session.user?.id,
    },
    data: {
      name: submission.value.fullName,
      image: submission.value.profileImage,
    },
  });

  return redirect("/dashboard");
}

export async function UpdateAvailabilityAction(formData: FormData) {
  const session = await requireUser();

  const rawData = Object.fromEntries(formData.entries());
  const availabilityData = Object.keys(rawData)
    .filter((key) => key.startsWith("id-"))
    .map((key) => {
      const id = key.replace("id-", "");

      return {
        id,
        isActive: rawData[`isActive-${id}`] === "on",
        fromTime: rawData[`fromTime-${id}`] as string,
        tillTime: rawData[`tillTime-${id}`] as string,
      };
    });

  try {
    await prisma.$transaction(
      availabilityData.map((item) =>
        prisma.availability.update({
          where: {
            id: item.id,
            userId: session.user?.id,
          },
          data: {
            isActive: item.isActive,
            fromTime: item.fromTime,
            tillTime: item.tillTime,
          },
        })
      )
    );

    revalidatePath("/dashboard/availability");
  } catch (error) {
    console.error("Error updating availability:", error);
    throw new Error("Error al actualizar la disponibilidad");
  }
}

export async function CreateEventTypeAction(
  prevState: unknown,
  formData: FormData
) {
  const session = await requireUser();

  const submission = parseWithZod(formData, {
    schema: eventTypeSchema,
  });

  if (submission.status !== "success") return submission.reply();

  await prisma.eventType.create({
    data: {
      title: submission.value.title,
      url: submission.value.url,
      description: submission.value.description,
      duration: submission.value.duration,
      videoCallSoftware: submission.value.videoCallSoftware,
      userId: session.user?.id,
    },
  });

  return redirect("/dashboard");
}

export async function EditEventTypeAction(
  prevState: unknown,
  formData: FormData
) {
  const session = await requireUser();

  const submission = parseWithZod(formData, {
    schema: eventTypeSchema,
  });

  if (submission.status !== "success") return submission.reply();

  await prisma.eventType.update({
    where: {
      id: formData.get("id") as string,
      userId: session.user?.id,
    },
    data: {
      title: submission.value.title,
      duration: submission.value.duration,
      url: submission.value.url,
      description: submission.value.description,
      videoCallSoftware: submission.value.videoCallSoftware,
    },
  });

  return redirect("/dashboard");
}

export async function UpdateEventTypeStatusAction(
  prevState: unknown,
  {
    eventTypeId,
    isChecked,
  }: {
    eventTypeId: string;
    isChecked: boolean;
  }
) {
  try {
    const session = await requireUser();

    await prisma.eventType.update({
      where: {
        id: eventTypeId,
        userId: session.user?.id,
      },
      data: {
        active: isChecked,
      },
    });

    revalidatePath("/dashboard");

    return {
      status: "success",
      message: "Evento actualizado exitosamente",
    };
  } catch (error) {
    return {
      status: "error",
      message: `Error al actualizar el evento ${error}`,
    };
  }
}

export async function DeleteEventTypeAction(formData: FormData) {
  const session = await requireUser();

  await prisma.eventType.delete({
    where: {
      id: formData.get("id") as string,
      userId: session.user?.id,
    },
  });

  return redirect("/dashboard");
}

export async function CreateMeetingAction(formData: FormData) {
  const getUserData = await prisma.user.findUnique({
    where: {
      userName: formData.get("username") as string,
    },
    select: {
      grantID: true,
      grantEmail: true,
    },
  });

  if (!getUserData) throw new Error("Usuario no encontrado");

  const eventTypeData = await prisma.eventType.findUnique({
    where: {
      id: formData.get("eventTypeId") as string,
    },
    select: {
      title: true,
      description: true,
    },
  });

  const fromTime = formData.get("fromTime") as string;
  const eventDate = formData.get("eventDate") as string;
  const meetingLength = Number(formData.get("meetingLength"));
  const provider = formData.get("provider");

  const startDateTime = new Date(`${eventDate}T${fromTime}:00`);
  const endDateTime = new Date(startDateTime.getTime() + meetingLength * 60000);

  await nylas.events.create({
    identifier: getUserData.grantID as string,
    requestBody: {
      title: eventTypeData?.title,
      description: eventTypeData?.description,
      when: {
        startTime: Math.floor(startDateTime.getTime() / 1000),
        endTime: Math.floor(endDateTime.getTime() / 1000),
      },
      conferencing: {
        provider: provider as any,
        autocreate: {},
      },
      participants: [
        {
          name: formData.get("name") as string,
          email: formData.get("email") as string,
          status: "yes",
        },
      ],
    },
    queryParams: {
      calendarId: "primary",
      notifyParticipants: true,
    },
  });

  return redirect("/success");
}

export async function CancelMeetingAction(formData: FormData) {
  const session = await requireUser();

  const userData = await prisma.user.findUnique({
    where: {
      id: session.user?.id,
    },
    select: {
      grantID: true,
      grantEmail: true,
    },
  });

  if (!userData) throw new Error("Usuario no encontrado");

  await nylas.events.destroy({
    eventId: formData.get("eventId") as string,
    identifier: userData.grantID as string,
    queryParams: {
      calendarId: "primary",
    },
  });

  revalidatePath("/dashboard/meetings");
}
