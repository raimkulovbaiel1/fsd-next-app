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
        <span className="text-sm font-semibold">Панель продавца</span>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden relative w-6 h-6"
          aria-label="Открыть меню"
        >
          <span
            className={`absolute left-0 top-1 w-6 h-0.5 bg-black transition-all duration-300 ${open ? "rotate-45 top-3" : ""
              }`}
          />
          <span
            className={`absolute left-0 top-3 w-6 h-0.5 bg-black transition-all duration-300 ${open ? "opacity-0" : ""
              }`}
          />
          <span
            className={`absolute left-0 top-5 w-6 h-0.5 bg-black transition-all duration-300 ${open ? "-rotate-45 top-3" : ""
              }`}
          />
        </button>
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`pb-2 transition-colors ${pathname === item.href
                ? "text-[#00A669] border-b-2 border-[#00A669]"
                : "text-gray-600 hover:text-black"
                }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <nav
        className={`
    md:hidden 
    absolute top-full left-0 w-full z-50 bg-white shadow-md
    overflow-hidden
    transition-all duration-300 ease-in-out
    ${open ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2"}
  `}
      >
        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className={`block px-4 py-3 text-sm transition-colors ${pathname === item.href
              ? "bg-green-50 text-[#00A669]"
              : "text-gray-700 hover:bg-gray-100"
              }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>


    </header>
  );
};
