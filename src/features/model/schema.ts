import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Введите e-mail")
    .email("Введите корректный e-mail"),
  password: z
    .string()
    .min(1, "Введите пароль")
    .min(6, "Пароль должен содержать минимум 6 символов"),
  rememberMe: z.boolean().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const loginDefaultValues: LoginFormData = {
  email: "",
  password: "",
  rememberMe: true,
};