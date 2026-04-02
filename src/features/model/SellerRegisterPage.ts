import { z } from "zod";

export const SellerRegisterSchema = z.object({
  companyName: z.string().min(2, "Введите название компании"),
  email: z.string().email("Введите правильный email"),
  password: z.string().min(6, "Пароль должен быть минимум 6 символов"),
  country: z.string().min(2, "Введите страну"),
  city: z.string().min(2, "Введите город"),
  address: z.string().min(2, "Введите адрес"),
  phone: z.string().min(6, "Введите номер телефона"),
  inn: z.string().min(3, "Введите ИНН / БИН"),
});

export type SellerRegisterFormData = z.infer<typeof SellerRegisterSchema>;

export const defaultValues: SellerRegisterFormData = {
  companyName: "",
  email: "",
  password: "",
  country: "",
  city: "",
  address: "",
  phone: "",
  inn: "",
};