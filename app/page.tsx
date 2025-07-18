import { redirect } from "next/navigation";
import { Navbar } from "@/app/components/Navbar";
import { auth } from "@/app/lib/auth";
import { Hero } from "@/app/components/Hero";
import { Logos } from "@/app/components/Logos";
import { Features } from "@/app/components/Features";
import { Testimonials } from "@/app/components/Testimonials";
import { CTA } from "@/app/components/Cta";

export default async function Home() {
  const session = await auth();

  if (session?.user) return redirect("/dashboard");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Navbar />
      <Hero />
      <Logos />
      <Features />
      <Testimonials />
      <CTA />
    </div>
  );
}
