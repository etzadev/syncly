import Image from "next/image";
import NylasLogo from "@/public/nylas-logo.webp";
import NextjsLogo from "@/public/nextjs-logo.webp";
import VercelLogo from "@/public/vercel-logo.webp";
import MetaLogo from "@/public/meta-logo.webp";
import XLogo from "@/public/x-logo.webp";

export function Logos() {
  return (
    <div className="py-10">
      <h2 className="text-center text-lg font-semibold leading-7">
        Integración confiable, elegida por los mejores
      </h2>

      <div className="mt-10 grid max-w-lg mx-auto grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sn:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
        <Image
          src={NylasLogo}
          alt="Nylas Logo"
          className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 dark:invert"
        />
        <Image
          src={MetaLogo}
          alt="Meta Logo"
          className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 dark:invert"
        />
        <Image
          src={NextjsLogo}
          alt="Next.js Logo"
          className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 dark:invert"
        />
        <Image
          src={XLogo}
          alt="X Logo"
          className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 dark:invert"
        />
        <Image
          src={VercelLogo}
          alt="Vercel Logo"
          className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 dark:invert"
        />
      </div>
    </div>
  );
}
