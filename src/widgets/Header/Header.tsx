import Link from 'next/link';
import Image from "next/image"; 

import search from '@/shared/assents/icons/search.svg'
import user from '@/shared/assents/icons/user.svg'
export const Header = () => {
  return (
    <header className="bg-white py-4 px-6 border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Левая часть: Логотип и Основная навигация */}
        <div className="flex items-center space-x-12">
          <div className="text-[#00A669] font-bold text-2xl tracking-tight">
            NOVO
          </div>

          <nav>
            <ul className="hidden lg:flex items-center space-x-8 text-[#252525] font-medium">
              <li className="flex items-center cursor-pointer hover:text-[#00A669] transition-colors">
                Русский
                <span className="ml-1 text-xs">▼</span>
              </li>

              <li className="flex items-center cursor-pointer hover:text-[#00A669] transition-colors">
                Евро
                <span className="ml-1 text-xs">▼</span>
              </li>

              <li className="cursor-pointer hover:text-[#00A669] transition-colors">
                Поиск
              </li>
            </ul>

          </nav>
        </div>
        <div className="flex gap-3 lg:hidden">
          <img src={search.src} alt="icon" />
          <img src={user.src} alt="icon" />
        </div>
        {/* Правая часть: Профиль и Кнопка */}
        <div className="hidden lg:flex items-center space-x-8">
          <button className="text-[#00A669] font-semibold hover:opacity-80 transition-opacity">
            Мой профиль
          </button>

          <button className="bg-[#F6FBF9] text-[#00A669] px-6 py-3 rounded-md font-bold text-sm uppercase tracking-wide hover:bg-[#e8f5f0] transition-colors">
            Стать продавцом
          </button>
        </div>

      </div>
    </header>
  );
};