import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import Logo from "@/public/logo.webp";
import { signIn } from "@/app/lib/auth";
import {
  GitHubAuthButton,
  GoogleAuthButton,
} from "@/app/components/SubmitButtons";

export function AuthModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">Probar Gratis</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[360px]">
        <DialogTitle />
        <DialogHeader className="flex flex-row justify-center items-center gap-2">
          <Image src={Logo} alt="Syncly logo" className="size-10" />
          <h4 className="text-3xl font-semibold">
            <span className="text-primary">Syn</span>cly
          </h4>
        </DialogHeader>
        <div className="flex flex-col mt-5 gap-3">
          <form
            action={async () => {
              "use server";

              await signIn("google");
            }}
            className="w-full"
          >
            <GoogleAuthButton />
          </form>

          <form
            action={async () => {
              "use server";

              await signIn("github");
            }}
            className="w-full"
          >
            <GitHubAuthButton />
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
