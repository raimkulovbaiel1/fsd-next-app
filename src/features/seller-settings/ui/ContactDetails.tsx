import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactDetailsschema } from "@/features/model/ContactDetails";

type ContactDetailsFormData = z.infer<typeof ContactDetailsschema>;

export const ContactDetails = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactDetailsFormData>({
    resolver: zodResolver(ContactDetailsschema),
    defaultValues: {},
  });

  const onSubmit = (data: ContactDetailsFormData) => {
    console.log("Данные формы:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-8 border-t pt-6">
        <h2 className="text-xl font-semibold mb-4">
          Изменить контактную информацию
        </h2>

        <p className="text-sm text-gray-600 mb-6 max-w-xl">
          Тут вы можете поменять информацию про компанию, которую видят ваши
          клиенты
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <div className="text-sm text-gray-600 mb-1">Название компании</div>
            <input
              {...register("companyName")}
              type="text"
              className="w-full border rounded-lg px-4 py-2"
              placeholder="Тарас"
            />
            {errors.companyName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.companyName.message}
              </p>
            )}
          </div>

          <div>
            <div className="text-sm text-gray-600 mb-1">Страна</div>
            <input
              {...register("country")}
              type="text"
              className="w-full border rounded-lg px-4 py-2"
            />
            {errors.country && (
              <p className="text-red-500 text-sm mt-1">
                {errors.country.message}
              </p>
            )}
          </div>

          <div>
            <div className="text-sm text-gray-600 mb-1">Город</div>
            <input
              {...register("city")}
              type="text"
              className="w-full border rounded-lg px-4 py-2"
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
            )}
          </div>

          <div>
            <div className="text-sm text-gray-600 mb-1">Адрес</div>
            <input
              {...register("address")}
              type="text"
              className="w-full border rounded-lg px-4 py-2"
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </div>

          <div>
            <div className="text-sm text-gray-600 mb-1">Почтовый индекс</div>
            <input
              {...register("postalCode")}
              type="text"
              className="w-full border rounded-lg px-4 py-2"
            />
            {errors.postalCode && (
              <p className="text-red-500 text-sm mt-1">
                {errors.postalCode.message}
              </p>
            )}
          </div>

          <div>
            <div className="text-sm text-gray-600 mb-1">Мобильный телефон</div>
            <input
              {...register("phone")}
              type="tel"
              className="w-full border rounded-lg px-4 py-2"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <div className="text-sm text-gray-600 mb-1">Веб-сайт</div>
            <input
              {...register("website")}
              type="text"
              className="w-full border rounded-lg px-4 py-2"
            />
            {errors.website && (
              <p className="text-red-500 text-sm mt-1">
                {errors.website.message}
              </p>
            )}
          </div>

          <div>
            <div className="text-sm text-gray-600 mb-1">Время работы</div>
            <input
              {...register("workingHours")}
              type="text"
              className="w-full border rounded-lg px-4 py-2"
            />
            {errors.workingHours && (
              <p className="text-red-500 text-sm mt-1">
                {errors.workingHours.message}
              </p>
            )}
          </div>
        </div>

        <div className="mb-4 font-medium">Контактное лицо</div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <div className="text-sm text-gray-600 mb-1">ФИО</div>
            <input
              {...register("fullName")}
              type="text"
              className="w-full border rounded-lg px-4 py-2"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div>
            <div className="text-sm text-gray-600 mb-1">
              Мобильный телефон
            </div>
            <input
              {...register("contactPhone")}
              type="tel"
              className="w-full border rounded-lg px-4 py-2"
            />
            {errors.contactPhone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.contactPhone.message}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="px-8 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition"
        >
          СОХРАНИТЬ ИЗМЕНЕНИЯ
        </button>
      </div>
    </form>
  );
};
