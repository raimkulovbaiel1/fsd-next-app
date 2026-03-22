import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { error } from 'console';


const schema = z.object({
  textName: z.string().min(1, "Введите название"),
});
type FormData = z.infer<typeof schema>;


export const CompanyDetails = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      textName: "",
    }
  });

  const onSubmit = (data: FormData) => {
    console.log("Данные формы:", data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-8 border-t pt-6">
        <h2 className="text-xl font-semibold mb-4">Изменить информацию о компании</h2>
        <p className="text-sm text-gray-600 mb-6 max-w-xl">
          Заполните или обновите основные данные о вашей компании.
        </p>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <div className="text-sm text-gray-600 mb-1">Название компании</div>
            <input
              {...register("textName")}
              type="text" className="w-full border rounded-lg px-4 py-2" />
            {errors.textName && (
              <p className="text-red-500">{errors.textName.message}</p>
            )}
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-1">Юридическое имя</div>
            <input {...register("textName")} type="text" className="w-full border rounded-lg px-4 py-2" />
            {errors.textName && (
              <p className="text-red-500">{errors.textName.message}</p>
            )}
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-1">ИНН / Регистрационный номер</div>
            <input  {...register("textName")} type="text" className="w-full border rounded-lg px-4 py-2" />
            {errors.textName && (
              <p className="text-red-500">{errors.textName.message}</p>
            )}
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-1">Тип компании</div>
            <input {...register("textName")} type="text" className="w-full border rounded-lg px-4 py-2" />
            {errors.textName && (
              <p className="text-red-500">{errors.textName.message}</p>
            )}
          </div>
          <div className="md:col-span-2">
            <div className="text-sm text-gray-600 mb-1">Описание компании</div>
            <textarea className="w-full border rounded-lg px-4 py-2 min-h-[100px] resize-none" />
            {errors.textName && (
              <p className="text-red-500">{errors.textName.message}</p>
            )}
          </div>
        </div>

        <button type="submit" className="px-8 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition">
          СОХРАНИТЬ ИЗМЕНЕНИЯ
        </button>
      </div>
    </form>
  );
};
