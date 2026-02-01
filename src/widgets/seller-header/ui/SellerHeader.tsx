"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const menu = [
  { href: "/seller/register", label: "Регистрация продавца" },
  { href: "/seller/profile", label: "Мой профиль" },
  { href: "/seller/settings", label: "Настройки" },
  { href: "/seller/new-item", label: "Новый айтем" },
  { href: "/seller/subscription", label: "Управление подпиской" },
];

export const SellerHeader = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b bg-white relative">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Заголовок */}
        <span className="text-sm font-semibold">Панель продавца</span>

        {/* Бургер (mobile) */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1"
          aria-label="Открыть меню"
        >
          <span className="w-5 h-[2px] bg-black" />
          <span className="w-5 h-[2px] bg-black" />
          <span className="w-5 h-[2px] bg-black" />
        </button>

        {/* Меню desktop */}
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`pb-2 transition-colors ${
                pathname === item.href
                  ? "text-[#00A669] border-b-2 border-[#00A669]"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Меню mobile */}
      {open && (
        <nav className="md:hidden border-t bg-white">
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`block px-4 py-3 text-sm transition-colors ${
                pathname === item.href
                  ? "bg-green-50 text-[#00A669]"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};
