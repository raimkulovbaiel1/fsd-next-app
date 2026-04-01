"use client";

import { FC } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { 
registerSchema, 
registerDefaultValues,
type RegisterFormData,
} from "@/features/model/registerschema";


export const RegisterForm: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirect = searchParams?.get("redirect") || "/";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    console.log("Register data:", data);

    // тут API регистрация
    // await fetch("/api/register", {...})

    router.push(redirect);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

        <div className="flex flex-col gap-2">
          <label className="text-[12px] text-[#a0a0a0]">Имя</label>
          <input {...register("name")} className="h-11 border px-3" />
          {errors.name && <p className=" text-[13px] text-red-500  ">{errors.name.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[12px] text-[#a0a0a0]">Фамилия</label>
          <input {...register("surname")} className="h-11 border px-3" />
          {errors.surname && <p className=" text-[13px] text-red-500">{errors.surname.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[12px] text-[#a0a0a0]">Email</label>
          <input {...register("email")} className="h-11 border px-3" />
          {errors.email && <p className=" text-[13px] text-red-500">{errors.email.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[12px] text-[#a0a0a0]">Придумайте пароль</label>
          <input type="password" {...register("password")} className="h-11 border px-3" />
          {errors.password && <p className=" text-[13px] text-red-500">{errors.password.message}</p>}
        </div>

        <label className="flex items-start gap-2 text-[11px] sm:text-[12px] text-[#9a9a9a] leading-normal select-none">
          <input
            type="checkbox"
            defaultChecked
            className="mt-0.5 h-4 w-4 shrink-0 accent-[#009661] cursor-pointer"
          />
          <span>
            Авторизуясь, Вы принимаете{" "}
            <span className="text-[#009661]">
              Условия использования
            </span>{" "}
            и{" "}
            <span className="text-[#009661]">
              Заявление о конфиденциальности
            </span>{" "}
            NOVO
          </span>
        </label>
        {errors.termsAccepted && (
          <p className=" text-[13px] text-red-500">{errors.termsAccepted.message}</p>
        )}

        <button
          type="submit"
          className="mx-auto mt-3 h-11.5 sm:h-12 min-w-37.5 sm:min-w-42.5 rounded bg-[#009661] px-6 text-[13px] sm:text-[14px] font-semibold uppercase text-white transition hover:bg-[#007f52]"
        >
          {isSubmitting ? "Загрузка..." : "Продолжить"}
        </button>
      </form>

      <p className="mt-6 text-center">
        Уже есть аккаунт?{" "}
        <Link href={`/login?redirect=${redirect}`} className="text-[#009661]">
          Войти
        </Link>
      </p>
    </>
  );
};