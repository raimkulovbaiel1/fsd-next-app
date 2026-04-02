import { z } from 'zod';

export const SellerNewItemSchema = z.object({
  category: z.string().min(1, 'Введите категорию'),
  yearFrom: z.coerce.number().min(1900, 'Введите корректный год'),
  brand: z.string().min(1, 'Введите марку'),
  mileage: z.coerce.number().min(0, 'Введите пробег'),
  model: z.string().min(1, 'Введите модель'),
  country: z.string().min(1, 'Введите страну'),
  price: z.coerce.number().min(1, 'Введите цену'),
  weight: z.string().optional(),
  description: z.string().min(1, 'Введите описание'),
});

export type SellerFormInput = z.input<typeof SellerNewItemSchema>;
export type SellerFormValues = z.output<typeof SellerNewItemSchema>;

export const defaultValues: SellerFormInput = {
  category: '',
  yearFrom: '',
  brand: '',
  mileage: '',
  model: '',
  country: '',
  price: '',
  weight: '',
  description: '',
};