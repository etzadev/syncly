"use client";

import React from "react";
import { Calendar, Clock, ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-secondary flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <div className="relative mb-8">
          <div className="absolute -top-4 -left-4 animate-bounce delay-100">
            <Calendar className="w-8 h-8 text-primary opacity-70" />
          </div>
          <div className="absolute -top-8 right-8 animate-bounce delay-300">
            <Clock className="w-6 h-6 text-accent-foreground opacity-60" />
          </div>
          <div className="absolute top-4 -right-2 animate-bounce delay-500">
            <Calendar className="w-4 h-4 text-muted-foreground opacity-50" />
          </div>

          <div className="text-8xl md:text-9xl font-bold text-transparent bg-gradient-to-r from-primary via-accent-foreground to-primary bg-clip-text mb-4 animate-pulse">
            404
          </div>
        </div>

        <div className="space-y-6 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            ¡Oops! Esta cita no existe
          </h1>

          <div className="max-w-md mx-auto">
            <p className="text-muted-foreground text-lg leading-relaxed">
              Parece que la página que buscas se perdió en el tiempo.
              <span className="block mt-2 text-primary font-medium">
                ¡Pero no te preocupes, podemos reagendar esto!
              </span>
            </p>
          </div>

          <div className="flex justify-center my-8">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center animate-[spin_3s_linear_infinite]">
                <div className="w-20 h-20 bg-card rounded-full flex items-center justify-center shadow-lg border border-border">
                  <Calendar className="w-10 h-10 text-primary" />
                </div>
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-destructive rounded-full animate-ping opacity-75"></div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button className="group inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 hover:from-primary/90 hover:to-primary/70 cursor-pointer">
              <Home className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
              Volver al inicio
            </Button>
          </Link>
          <Button
            onClick={() => window.history.back()}
            variant="outline"
            className="group inline-flex items-center px-6 py-3 bg-card text-card-foreground font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border border-border hover:bg-accent cursor-pointer hover:text-accent-foreground"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Página anterior
          </Button>
        </div>

        <div className="mt-8 p-4 bg-secondary rounded-lg border border-border max-w-md mx-auto">
          <p className="text-sm text-secondary-foreground">
            <strong>Consejo:</strong> Verifica que la URL sea correcta o busca
            tu evento en el calendario principal.
          </p>
        </div>
      </div>

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-secondary rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-accent rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-muted rounded-full opacity-20 animate-pulse delay-500"></div>
      </div>
    </div>
  );
}
