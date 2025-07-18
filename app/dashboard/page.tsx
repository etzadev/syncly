import React from "react";
import Link from "next/link";
import prisma from "@/app/lib/db";
import { requireUser } from "@/app/lib/hooks";
import { notFound } from "next/navigation";
import { EmptyState } from "@/app/components/EmptyState";
import { Button } from "@/components/ui/button";
import { ExternalLink, Pen, Settings, Trash, Users2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CopyLinkMenu } from "@/app/components/CopyLinkMenu";
import { MenuActiveSwitch } from "@/app/components/EventTypeSwitcher";

async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      userName: true,
      eventType: {
        select: {
          id: true,
          active: true,
          title: true,
          url: true,
          duration: true,
        },
      },
    },
  });

  if (!data) return notFound();

  return data;
}

export default async function DashboardPage() {
  const session = await requireUser();
  const data = await getData(session.user?.id as string);

  return (
    <>
      {data.eventType.length === 0 ? (
        <EmptyState
          title="No tienes ningún tipo de encuentro registrado"
          description="Puedes crear tu primer tipo de encuentro haciendo clic en el botón de abajo"
          buttonText="Crear categoría de encuentro"
          href="/dashboard/new"
        />
      ) : (
        <>
          <div className="flex items-center justify-between px-2">
            <div className="hidden sm:grid gap-y-1">
              <h1 className="text-3xl md:text-4xl font-semibold">
                Categorías de encuentros
              </h1>
              <p className="text-muted-foreground">
                Crea y gestiona tus categorías de encuentros aquí mismo.
              </p>
            </div>

            <Button className="cursor-pointer" asChild>
              <Link href="/dashboard/new">Crear categoría de encuentro</Link>
            </Button>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mt-6 ">
            {data.eventType.map((item) => (
              <div
                className="overflow-hidden shadow rounded-lg border relative"
                key={item.id}
              >
                <div className="absolute top-2 right-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        className="cursor-pointer"
                        variant="outline"
                        size="icon"
                      >
                        <Settings className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Reunión</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem asChild className="cursor-pointer">
                          <Link href={`/${data.userName}/${item.url}`}>
                            <ExternalLink className="mr-2 size-4" />
                            Previsualizar
                          </Link>
                        </DropdownMenuItem>
                        <CopyLinkMenu
                          meetingUrl={`${process.env.NEXT_PUBLIC_URL}/${data.userName}/${item.url}`}
                        />
                        <DropdownMenuItem asChild className="cursor-pointer">
                          <Link href={`/dashboard/event/${item.id}`}>
                            <Pen className="mr-2 size-4" />
                            Editar
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        asChild
                        className="cursor-pointer text-red-400"
                      >
                        <Link href={`/dashboard/event/${item.id}/delete`}>
                          <Trash className="mr-2 size-4 text-red-400" />
                          Eliminar
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <Link href="/" className="flex items-center p-5">
                  <div className="flex shrink-0">
                    <Users2 className="size-6" />
                  </div>

                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-muted-foreground">
                        Reunión de {item.duration} minutos
                      </dt>
                      <dd className="text-lg font-medium">{item.title}</dd>
                    </dl>
                  </div>
                </Link>

                <div className="bg-muted px-5 py-3 flex justify-between items-center">
                  <MenuActiveSwitch
                    initialChecked={item.active}
                    eventTypeId={item.id}
                  />
                  <Button className="cursor-pointer" asChild>
                    <Link href={`/dashboard/event/${item.id}`}>
                      Editar Evento
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
