"use client";

import Link from "next/link";

export default function ProfileSettingsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <nav className="text-sm text-gray-400  mb-4">
        <ol className="flex flex-wrap items-center gap-15">
          <li>
            <Link href="/" className="hover:text-black">
              Главная
            </Link>
          </li>
          <span>›</span>
          <li>
            <Link href="/cabinet" className="hover:text-black">
              Мой кабинет
            </Link>
          </li>
          <span>›</span>
          <li className="text-black font-medium text-[24px]">
            Настройки профиля
          </li>
        </ol>
      </nav>

      <h1 className="text-3xl sm:text-3xl font-bold mb-6">
        Настройки профиля
      </h1>

      <div className="flex gap-6 border-b mb-8 text-sm">
        <button className="pb-3 text-gray-500 hover:text-black">
          Избранное
        </button>

        <button className="pb-3 text-gray-500 hover:text-black">
          Сообщения <span className="text-[#009661]">(4 новых)</span>
        </button>

        <button className="pb-3 border-b-2 border-green-600 text-black font-medium flex items-center gap-2">
          ⚙ Настройки профиля
        </button>
      </div>

      <div className="mb-6 mt-[20px] ">
        <p className="text-base font-medium mt-1.5">
          Профиль <span className="text-gray-500">mail@gmail.com</span>
        </p>

        <button className="text-sm text-[#009661] hover:underline mt-1">
          Выйти из аккаунта
        </button>
      </div>

      <div className="space-y-4">
        <Accordion title="Настройки аккаунта" />
        <Accordion title="Изменить контактную информацию" />
      </div>
    </div>
  );
}


function Accordion({ title }: { title: string }) {
  return (
    <div className="bg-white rounded-xl border px-4 py-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition">
      <span className="text-sm font-medium">{title}</span>
      <span className="text-green-600 text-xl">⌄</span>
    </div>
  );
}
