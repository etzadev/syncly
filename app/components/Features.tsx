import {
  CalendarClock,
  MessageSquare,
  LayoutDashboard,
  Sparkle,
} from "lucide-react";

const features = [
  {
    name: "Agendamiento instantáneo",
    description:
      "Permite a tus clientes reservar reuniones contigo en segundos, sin correos ni complicaciones.",
    icon: CalendarClock,
  },
  {
    name: "Confirmaciones automatizadas",
    description:
      "Envía recordatorios y mensajes de confirmación de forma automática, sin intervención manual.",
    icon: MessageSquare,
  },
  {
    name: "Panel de control centralizado",
    description:
      "Administra eventos, disponibilidad y solicitudes desde una vista clara y sin obstáculos.",
    icon: LayoutDashboard,
  },
  {
    name: "Experiencia optimizada",
    description:
      "Diseño enfocado en la simplicidad para que agendar sea rápido, cómodo y visualmente intuitivo.",
    icon: Sparkle,
  },
];

export function Features() {
  return (
    <div className="py-24">
      <div className="max-w-2xl mx-auto lg:text-center">
        <p className="font-semibold leading-7 text-primary">
          Agendamiento instantáneo
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          ¡Agenda reuniones en minutos!
        </h1>
        <p className="mt-6 text-base leading-snug text-muted-foreground">
          Con Syncly, agendar reuniones es rápido, fácil y sin complicaciones.
          Tus clientes reservan contigo en minutos, sin fricción ni esperas.
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <div className="grid max-w-xl gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
          {features.map((feature) => (
            <div key={feature.name} className="relative pl-16">
              <div className="text-base font-medium leading-7">
                <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-full bg-primary">
                  <feature.icon className="size-6 text-white" />
                </div>
                {feature.name}
              </div>
              <p className="mt-2 text-sm text-muted-foreground leading-snug">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
