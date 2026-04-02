import { z } from "zod";

export const CompanyDetailsSchema = z.object({
  companyName: z.string().min(1, "Введите название компании"),
  legalName: z.string().min(1, "Введите юридическое имя"),
  inn: z.string().min(1, "Введите ИНН / регистрационный номер"),
  companyType: z.string().min(1, "Введите тип компании"),
  description: z.string().min(1, "Введите описание компании"),
});

export type CompanyDetailsFormData = z.infer<typeof CompanyDetailsSchema>;

export const defaultValues: CompanyDetailsFormData = {
  companyName: "",
  legalName: "",
  inn: "",
  companyType: "",
  description: "",
};