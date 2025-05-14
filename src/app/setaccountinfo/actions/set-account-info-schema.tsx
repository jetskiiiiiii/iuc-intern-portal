import { isMobilePhone } from "validator";
import { z } from "zod"

const firstNameSchema = z
  .string()
  .min(2, { message: "First name must be at least 2 letters." })

const lastNameSchema = z
  .string()
  .min(2, { message: "Last name must be at least 2 letters." })

// Regex from https://colinhacks.com/essays/reasonable-email-regex
const emailSchema = z
  .string()
  .regex(/^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_'+\-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i, {
    message: "Invalid email format (name@domain.com).",
  })

const phoneNumberSchema = z
  .string()
  .refine(isMobilePhone, { message: "Invalid phone number format (XXX-XXX-XXXX or XXXXXXXXXX)." })

// Client side password validation
const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long." })
  .superRefine((val, ctx) => {
    if (!/[A-Z]/.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password must contain at least one uppercase letter.",
      });
    }
    if (!/[a-z]/.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password must contain at least one lowercase letter.",
      });
    }
    if (!/[0-9]/.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password must contain at least one number.",
      });
    }
    if (!/[^a-zA-Z0-9]/.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password must contain at least one special character.",
      });
    }
  });

export const accountInfoFormSchema = z.object({
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  email: emailSchema,
  phoneNumber: phoneNumberSchema,
  password: passwordSchema,
})

export const accountInfoFormSchemaPartial = accountInfoFormSchema.partial()

export type FieldSchema = z.infer<typeof accountInfoFormSchema>
