"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const tabs = [
  {
    label: "Избранное",
    href: "/Wishlist",
    activeBorderClass: "border-black",
    activeTextClass: "text-black",
  },
  {
    label: "Сообщения",
    href: "/messages",
    count: 4,
    activeBorderClass: "border-emerald-500",
    activeTextClass: "text-gray-900",
  },
  {
    label: "Настройки профиля",
    href: "/settings",
    activeBorderClass: "border-black",
    activeTextClass: "text-black",
  },
];

export const ProfileTabs = () => {
  const pathname = usePathname();

  return (
    <nav className="mb-6 flex items-center gap-8 border-b border-gray-200">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={clsx(
              "inline-flex items-center gap-1 pb-3 text-[15px] leading-none font-medium border-b-2 transition-all",
              isActive
                ? clsx(tab.activeTextClass, tab.activeBorderClass)
                : "text-gray-500 border-transparent hover:text-black"
            )}
          >
            <span>{tab.label}</span>

            {typeof tab.count === "number" && (
              <span
                className="text-emerald-500 text-[15px] leading-none"
              >
                ({tab.count} новых)
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
};