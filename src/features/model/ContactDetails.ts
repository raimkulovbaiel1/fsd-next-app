import {z} from "zod"; 
 
const ContactDetailsschema = z.object({
  companyName: z.string().min(1, "Введите название компании"),
  country: z.string().min(1, "Введите страну"),
  city: z.string().min(1, "Введите город"),
  address: z.string().min(1, "Введите адрес"),
  postalCode: z.string().min(1, "Введите почтовый индекс"),
  phone: z.string().min(1, "Введите мобильный телефон"),
  website: z.string().min(1, "Введите веб-сайт"),
  workingHours: z.string().min(1, "Введите время работы"),
  fullName: z.string().min(1, "Введите ФИО"),
  contactPhone: z.string().min(1, "Введите телефон контактного лица"),
});

type FormData = z.infer<typeof ContactDetailsschema>; 

export {ContactDetailsschema, type FormData}; 
 
export const defaultFormData: FormData = {
  companyName: "",
  country: "",
  city: "",
  address: "",
  postalCode: "",
  phone: "",
  website: "",
  workingHours: "",
  fullName: "",
  contactPhone: "",
};