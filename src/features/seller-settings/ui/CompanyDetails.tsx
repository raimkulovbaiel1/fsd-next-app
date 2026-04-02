import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  CompanyDetailsSchema,
  defaultValues,
  type CompanyDetailsFormData,
} from '@/features/model/CompanyDetails';

export const CompanyDetails = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyDetailsFormData>({
    resolver: zodResolver(CompanyDetailsSchema),
    defaultValues,
  });

  const onSubmit = (data: CompanyDetailsFormData) => {
    console.log('Данные формы:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-8 border-t pt-6">
        <h2 className="mb-4 text-xl font-semibold">
          Изменить информацию о компании
        </h2>

        <p className="mb-6 max-w-xl text-sm text-gray-600">
          Заполните или обновите основные данные о вашей компании.
        </p>

        <div className="mb-8 grid gap-6 md:grid-cols-2">
          <div>
            <div className="mb-1 text-sm text-gray-600">Название компании</div>
            <input
              {...register('companyName')}
              type="text"
              className="w-full rounded-lg border px-4 py-2"
            />
            {errors.companyName && (
              <p className="text-red-500">{errors.companyName.message}</p>
            )}
          </div>

          <div>
            <div className="mb-1 text-sm text-gray-600">Юридическое имя</div>
            <input
              {...register('legalName')}
              type="text"
              className="w-full rounded-lg border px-4 py-2"
            />
            {errors.legalName && (
              <p className="text-red-500">{errors.legalName.message}</p>
            )}
          </div>

          <div>
            <div className="mb-1 text-sm text-gray-600">
              ИНН / Регистрационный номер
            </div>
            <input
              {...register('inn')}
              type="text"
              className="w-full rounded-lg border px-4 py-2"
            />
            {errors.inn && (
              <p className="text-red-500">{errors.inn.message}</p>
            )}
          </div>

          <div>
            <div className="mb-1 text-sm text-gray-600">Тип компании</div>
            <input
              {...register('companyType')}
              type="text"
              className="w-full rounded-lg border px-4 py-2"
            />
            {errors.companyType && (
              <p className="text-red-500">{errors.companyType.message}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <div className="mb-1 text-sm text-gray-600">Описание компании</div>
            <textarea
              {...register('description')}
              className="min-h-[100px] w-full resize-none rounded-lg border px-4 py-2"
            />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="rounded-lg bg-green-600 px-8 py-2 font-medium text-white transition hover:bg-green-700"
        >
          СОХРАНИТЬ ИЗМЕНЕНИЯ
        </button>
      </div>
    </form>
  );
};