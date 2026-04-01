"use client";

import { FC } from "react";
import Link from "next/link";

export const RegisterForm: FC = () => {
  return (
    <>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="name"
            className="text-[12px] sm:text-[13px] text-[#a0a0a0]"
          >
            Имя
          </label>
          <input
            id="name"
            type="text"
            className="h-11 sm:h-12 w-full border border-[#d9d9d9] bg-white px-3 text-[14px] outline-none transition focus:border-[#009661]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="surname"
            className="text-[12px] sm:text-[13px] text-[#a0a0a0]"
          >
            Фамилия
          </label>
          <input
            id="surname"
            type="text"
            className="h-11 sm:h-12 w-full border border-[#d9d9d9] bg-white px-3 text-[14px] outline-none transition focus:border-[#009661]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="text-[12px] sm:text-[13px] text-[#a0a0a0]"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            className="h-11 sm:h-12 w-full border border-[#d9d9d9] bg-white px-3 text-[14px] outline-none transition focus:border-[#009661]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="text-[12px] sm:text-[13px] text-[#a0a0a0]"
          >
            Придумайте пароль
          </label>
          <input
            id="password"
            type="password"
            className="h-11 sm:h-12 w-full border border-[#d9d9d9] bg-white px-3 text-[14px] outline-none transition focus:border-[#009661]"
          />
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

        <button
          type="submit"
          className="mx-auto mt-3 h-11.5 sm:h-12 min-w-37.5 sm:min-w-42.5 rounded bg-[#009661] px-6 text-[13px] sm:text-[14px] font-semibold uppercase text-white transition hover:bg-[#007f52]"
        >
          Продолжить
        </button>
      </form>

      <p className="mt-6 sm:mt-7 text-center text-[14px] text-[#252525]">
        Уже есть аккаунт?{" "}
        <Link
          href="/login"
          className="font-medium uppercase text-[#009661] transition hover:underline"
        >
          ВОЙТИ
        </Link>
      </p>
    </>
  );
};