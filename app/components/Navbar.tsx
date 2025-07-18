import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.webp";
import { AuthModal } from "@/app/components/AuthModal";
import { ThemeToggle } from "@/app/components/ThemeToggle";

export function Navbar() {
  return (
    <nav className="flex py-5 items-center justify-between">
      <Link href="/" className="flex items-center gap-2">
        <Image src={Logo} alt="Syncly Logo" className="size-10 hide-logo-xs" />
        <h4 className="text-3xl font-semibold">
          <span className="text-primary">Syn</span>cly
        </h4>
      </Link>

      <div className="flex justify-end space-x-4 md:flex md:justify-end md:space-x-4">
        <ThemeToggle />
        <AuthModal />
      </div>
    </nav>
  );
}
