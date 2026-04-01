"use client";

import { FC } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Введите e-mail")
    .email("Введите корректный e-mail"),
  password: z
    .string()
    .min(1, "Введите пароль")
    .min(6, "Пароль должен содержать минимум 6 символов"),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginForm: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirect = searchParams?.get("redirect") || "/";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    console.log("Login data:", data);

    // тут можешь сделать запрос на API
    // например:
    // const res = await fetch("/api/login", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data),
    // });

    // если логин успешный
    router.push(redirect);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 sm:gap-5"
      >
        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="text-[12px] sm:text-[13px] text-[#a0a0a0]"
          >
            E-mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="google@gmail.com"
            {...register("email")}
            className="h-11 sm:h-12 w-full border border-[#d9d9d9] bg-white px-3 text-[14px] outline-none transition focus:border-[#009661]"
          />
          {errors.email && (
            <p className="text-[13px] text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="text-[12px] sm:text-[13px] text-[#a0a0a0]"
          >
            Пароль
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            className="h-11 sm:h-12 w-full border border-[#d9d9d9] bg-white px-3 text-[14px] outline-none transition focus:border-[#009661]"
          />
          {errors.password && (
            <p className="text-[13px] text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <label className="flex items-center gap-2 text-[12px] sm:text-[13px] text-[#b0b0b0] select-none">
          <input
            type="checkbox"
            {...register("rememberMe")}
            className="h-4 w-4 accent-[#009661] cursor-pointer"
          />
          Не выходить из системы
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mx-auto mt-3 sm:mt-4 h-11.5 sm:h-12 min-w-37.5 sm:min-w-42.5 rounded bg-[#009661] px-6 text-[13px] sm:text-[14px] font-semibold uppercase text-white transition hover:bg-[#007f52] disabled:opacity-50"
        >
          {isSubmitting ? "Загрузка..." : "Продолжить"}
        </button>
      </form>

      <p className="mt-6 sm:mt-7 text-center text-[14px] text-[#252525]">
        Нет аккаунта?{" "}
        <Link
          href={`/Register?redirect=${redirect}`}
          className="font-medium uppercase text-[#009661] transition hover:underline"
        >
          РЕГИСТРАЦИЯ
        </Link>
      </p>
    </>
  );
};