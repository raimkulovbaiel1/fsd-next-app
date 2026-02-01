// widgets/seller-header/ui/SellerHeader.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { href: "/seller/register", label: "Регистрация продавца" },
  { href: "/seller/profile", label: "Мой профиль" },
  { href: "/seller/settings", label: "Настройки" },
  { href: "/seller/new-item", label: "Новый айтем" },
  { href: "/seller/subscription", label: "Управление подпиской" },
];

export const SellerHeader = () => {
  const pathname = usePathname();

  return (
    <header className="border-b bg-white">
      <nav className="flex gap-6 p-4 text-sm font-medium">
        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`transition-colors ${
              pathname === item.href
                ? "text-[#00A669]"
                : "text-gray-600 hover:text-black"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
};
