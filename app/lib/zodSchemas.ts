import { conformZodMessage } from "@conform-to/zod";
import { z } from "zod";

export const onboardingSchema = z.object({
  fullName: z
    .string()
    .min(3, {
      message: "El nombre debe tener al menos 3 caracteres.",
    })
    .max(150),
  userName: z
    .string()
    .min(3, {
      message: "El nombre de usuario debe tener al menos 3 caracteres.",
    })
    .max(150)
    .regex(/^[a-zA-Z0-9-]+$/, {
      message: "El nombre de usuario, solo permite letras, números y guiones.",
    }),
});

export function onboardingSchemaValidation(options?: {
  isUsernameUnique: () => Promise<boolean>;
}) {
  return z.object({
    userName: z
      .string()
      .min(3, {
        message: "El nombre de usuario debe tener al menos 3 caracteres.",
      })
      .max(150)
      .regex(/^[a-zA-Z0-9-]+$/, {
        message:
          "El nombre de usuario, solo permite letras, números y guiones.",
      })
      .pipe(
        z.string().superRefine((_, ctx) => {
          if (typeof options?.isUsernameUnique !== "function") {
            ctx.addIssue({
              code: "custom",
              message: conformZodMessage.VALIDATION_UNDEFINED,
              fatal: true,
            });

            return;
          }

          return options.isUsernameUnique().then((isUnique) => {
            if (!isUnique) {
              ctx.addIssue({
                code: "custom",
                message: "El nombre de usuario ya está en uso.",
              });
            }
          });
        })
      ),
    fullName: z
      .string()
      .min(3, {
        message: "El nombre debe tener al menos 3 caracteres.",
      })
      .max(150),
  });
}

export const settingsSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: "El nombre debe tener al menos 3 caracteres." })
    .max(150),
  profileImage: z.string(),
});

export const eventTypeSchema = z.object({
  title: z.string().min(3).max(150),
  url: z.string().min(3).max(150),
  description: z.string().min(3).max(300),
  duration: z.number().min(15).max(60),
  videoCallSoftware: z.string().min(3),
});
