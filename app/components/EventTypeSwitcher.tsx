"use client";

import { Switch } from "@/components/ui/switch";
import { UpdateEventTypeStatusAction } from "@/app/actions";
import { useActionState, useEffect, useTransition } from "react";
import { toast } from "sonner";

export function MenuActiveSwitch({
  initialChecked,
  eventTypeId,
}: {
  initialChecked: boolean;
  eventTypeId: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [state, action] = useActionState(
    UpdateEventTypeStatusAction,
    undefined
  );

  useEffect(() => {
    if (state?.status === "success") {
      toast.success(state.message);
    } else if (state?.status === "error") {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <Switch
      disabled={isPending}
      defaultChecked={initialChecked}
      onCheckedChange={(isChecked) => {
        startTransition(() => {
          action({
            eventTypeId,
            isChecked,
          });
        });
      }}
      className="cursor-pointer"
    />
  );
}
