"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  SellerRegisterSchema,
  defaultValues,
  type SellerRegisterFormData,
} from "@/features/model/SellerRegisterPage";
const SellerRegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SellerRegisterFormData>({
    resolver: zodResolver(SellerRegisterSchema),
    defaultValues,
  });

  const onSubmit = (data: SellerRegisterFormData) => {
    console.log("Данные формы:", data);
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-2xl bg-white shadow-lg p-7">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-2">
          Регистрация продавца
        </h1>

        <p className="text-sm text-gray-500 text-center mb-6">
          Создайте аккаунт и начните размещать объявления
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-700">E-mail</label>
            <input
              {...register("email")}
              type="email"
              placeholder="E-mail"
              className="h-13 px-4 pt-2 text-sm border border-gray-300 focus:outline-none focus:border-green-500 placeholder:text-gray-400"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-700">Пароль</label>
            <input
              {...register("password")}
              type="password"
              placeholder="Пароль"
              className="h-13 px-4 pt-2 text-sm border border-gray-300 focus:outline-none focus:border-green-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div className="col-span-1 md:col-span-2 text-[17px] font-medium mt-2">
            Про компаниn
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-700">Название компании</label>
            <input
              {...register("companyName")}
              type="text"
              placeholder="Название компании"
              className="h-13 px-4 pt-2 text-sm border border-gray-300 focus:outline-none focus:border-green-500"
            />
            {errors.companyName && (
              <p className="text-red-500 text-sm">{errors.companyName.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-700">Страна</label>
            <input
              {...register("country")}
              type="text"
              placeholder="Страна"
              className="h-13 px-4 pt-2 text-sm border border-gray-300 focus:outline-none focus:border-green-500"
            />
            {errors.country && (
              <p className="text-red-500 text-sm">{errors.country.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-700">Город</label>
            <input
              {...register("city")}
              type="text"
              placeholder="Город"
              className="h-13 px-4 pt-2 text-sm border border-gray-300 focus:outline-none focus:border-green-500"
            />
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-700">Адрес</label>
            <input
              {...register("address")}
              type="text"
              placeholder="Адрес"
              className="h-13 px-4 pt-2 text-sm border border-gray-300 focus:outline-none focus:border-green-500"
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-700">Номер телефона</label>
            <input
              {...register("phone")}
              type="text"
              placeholder="Номер телефона"
              className="h-13 px-4 pt-2 text-sm border border-gray-300 focus:outline-none focus:border-green-500"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-700">ИНН / БИН</label>
            <input
              {...register("inn")}
              type="text"
              placeholder="ИНН / БИН"
              className="h-13 px-4 pt-2 text-sm border border-gray-300 focus:outline-none focus:border-green-500"
            />
            {errors.inn && (
              <p className="text-red-500 text-sm">{errors.inn.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="col-span-1 md:col-span-2 h-12 mt-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
          >
            Зарегистрироваться
          </button>
          <p className="text-sm flex justify-end text-gray-500 mt-4">
            Уже есть аккаунт?{" "}
            <span className="text-green-600 cursor-pointer hover:underline">
              Войти
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SellerRegisterPage;