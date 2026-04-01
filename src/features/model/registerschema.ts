import {z} from "zod"; 

export const registerSchema = z.object({ 
 name: z.string().min(2, "Имя минимум 2 символа"),
  surname: z.string().min(2, "Фамилия минимум 2 символа"),
  email: z.string().email("Введите корректный email"),
  password: z.string().min(6, "Минимум 6 символов"),
  termsAccepted: z.literal(true, {
    message: "Примите условия",
  }),
}) 

type RegisterFormData = z.infer<typeof registerSchema>;  

export type { RegisterFormData };
 
export const registerDefaultValues: RegisterFormData = { 
    name: "", 
    surname: "",
    email: "",
    password: "",
    termsAccepted: true, 
};

