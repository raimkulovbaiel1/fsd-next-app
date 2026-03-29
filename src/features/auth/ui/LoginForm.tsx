"use client";

import { FC } from "react";
import Link from "next/link";

export const LoginForm: FC = () => {
  return (
    <>
      <form className="flex flex-col gap-4 sm:gap-5">
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
            className="h-11 sm:h-12 w-full border border-[#d9d9d9] bg-white px-3 text-[14px] outline-none transition focus:border-[#009661]"
          />
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
            className="h-11 sm:h-12 w-full border border-[#d9d9d9] bg-white px-3 text-[14px] outline-none transition focus:border-[#009661]"
          />
        </div>

        <label className="flex items-center gap-2 text-[12px] sm:text-[13px] text-[#b0b0b0] select-none">
          <input
            type="checkbox"
            defaultChecked
            className="h-4 w-4 accent-[#009661] cursor-pointer"
          />
          Не выходить из системы
        </label>

        <button
          type="submit"
          className="mx-auto mt-3 sm:mt-4 h-[46px] sm:h-[48px] min-w-[150px] sm:min-w-[170px] rounded bg-[#009661] px-6 text-[13px] sm:text-[14px] font-semibold uppercase text-white transition hover:bg-[#007f52]"
        >
          Продолжить
        </button>
      </form>

      <p className="mt-6 sm:mt-7 text-center text-[14px] text-[#252525]">
        Нет аккаунта?{" "}
        <Link
          href="/Register"
          className="font-medium uppercase text-[#009661] transition hover:underline"
        >
          РЕГИСТРАЦИЯ
        </Link>
      </p>
    </>
  );
};