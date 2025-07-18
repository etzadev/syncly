import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import VideoGif from "@/public/videoGif.gif";
import { CalendarCheck2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function OnboardingRouteTwo() {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <Card className="max-w-md w-full px-2 py-6">
        <CardHeader>
          <CardTitle>Solo un paso más para terminar tu registro</CardTitle>
          <CardDescription>
            Ahora tenemos que conectar tu calendario a tu cuenta.
          </CardDescription>
          <Image
            src={VideoGif}
            alt="Almost Finished gif"
            unoptimized
            priority
            className="w-full rounded-lg"
          />
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full text-white">
            <Link href="/api/auth">
              <CalendarCheck2 className="size-4 mr-2" />
              Conecta el calendario a tu cuenta
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
