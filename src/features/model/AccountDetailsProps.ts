import { z } from "zod";

export const AccountDetailsschema = z.object({
  email: z.string().email("Введите корректный email"),
  password: z
    .string()
    .min(6, "Минимум 6 символов")
    .optional()
    .or(z.literal("")),
});

export type FormData = z.infer<typeof AccountDetailsschema>;

export interface AccountDetailsFormData extends FormData {}

export interface AccountDetailsProps {
  email: AccountDetailsFormData["email"];
  password: AccountDetailsFormData["password"];
}
