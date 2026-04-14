'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react' 
import { useRouter } from 'next/navigation'
import i18n from '@/i18n'
import { useTranslation } from 'react-i18next'
import nova from '@/shared/assets/icons/logoDrive.webp'

import search from '@/shared/assets/icons/search.svg'
import user from '@/shared/assets/icons/user.svg'
import prodi from '@/shared/assets/icons/icons8-продавец-64.png'

export const Header = () => {
  const [currentLang, setCurrentLang] = useState('ru')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLLIElement>(null)
  const { t } = useTranslation()
  const [open, setOpen] = useState(false); 
  const router = useRouter()


  useEffect(() => {
    const savedLang = localStorage.getItem('i18nextLng') || 'ru'
    setCurrentLang(savedLang)
  }, [])

  const changeLang = (lang: string) => {
    i18n.changeLanguage(lang)
    setCurrentLang(lang)
    localStorage.setItem('i18nextLng', lang)
    setDropdownOpen(false)
  }

  // Закрытие меню при клике вне
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const getLangLabel = (lang: string) => {
    switch (lang) {
      case 'ru': return 'Русский'
      case 'en': return 'English'
      case 'kg': return 'Кыргызча'
      default: return 'Русский'
    }
  }

  return (
    <header className="bg-white py-4 px-6 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Левая часть: Логотип + Навигация */}
        <div className="flex items-center space-x-12">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <img
                src={nova.src}
                alt="NOVO logo"
                className="w-10 h-10 object-contain rounded-xl"
              />
            </div>


          </Link>

          <nav>
            <ul className="hidden lg:flex items-center space-x-8 text-[#252525] font-medium">

              {/* Языковой селектор */}
              <li
                ref={dropdownRef}
                className="relative flex items-center cursor-pointer hover:text-[#00A669] transition-colors"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span>{getLangLabel(currentLang)}</span>
                <span className="ml-1 text-xs">▼</span>

                {/* Выпадающее меню */}
                {dropdownOpen && (
                  <ul className="absolute top-full left-0 mt-2 bg-white border rounded-md shadow-lg w-32 z-50">
                    <li className="px-4 py-2 hover:bg-gray-100" onClick={() => changeLang('ru')}>Русский</li>
                    <li className="px-4 py-2 hover:bg-gray-100" onClick={() => changeLang('en')}>English</li>
                    <li className="px-4 py-2 hover:bg-gray-100" onClick={() => changeLang('kg')}>Кыргызча</li>
                  </ul>
                )}
              </li>

              {/* Валюта */}
              <li data-testid="currency-dropdown"
                className="relative">
                <button
                  onClick={() => setOpen(!open)}
                  className="flex items-center cursor-pointer hover:text-[#00A669] transition-colors"
                >
                  {t('€')}
                  <span className="ml-1 text-xs">▼</span>
                </button>

                {open && (
                  <ul className="absolute right-0 mt-1 w-15 bg-white shadow-lg rounded-lg border z-50">
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">EUR</li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">EUR</li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">USD</li>
                  </ul>
                )}
              </li>

              {/* Поиск */}
              <li className="flex items-center gap-2 cursor-pointer hover:text-[#00A669] transition-colors">
                {t("search")}
                <input
                  type="text"
                  placeholder="Поиск..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const value = (e.target as HTMLInputElement).value.trim();
                      if (!value) return;

                      router.push(`/searchResult?search=${encodeURIComponent(value)}`);
                    }
                  }}
                  className="border border-gray-400 px-2 py-1 rounded-md outline-none text-black"
                />
              </li>
            </ul>
          </nav>
        </div>

        {/* Мобильные иконки */}
        <div className="flex gap-3 lg:hidden">
          <Link href="/login?redirect=/seller/register">
            <Image
              src={prodi}
              alt="search"
              width={24}
              height={24}
              className="cursor-pointer"
            />
          </Link>
          <Link href="/settings">
            <Image
              src={user}
              alt="user"
              className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 cursor-pointer"
            />
          </Link>

        </div>

        {/* Правая часть: Профиль + Стать продавцом */}
        <div className="hidden lg:flex items-center space-x-8">
          <div data-testid="profile-dropdown"
            className="relative group">
            {/* Кнопка профиля */}
            <button className="text-[#00A669] cursor-pointer font-semibold hover:opacity-80 transition-opacity">
              Профиль
            </button>

            {/* Выпадающее меню */}
            <div
              className="
               absolute -ml-7.5 mt-2 w-38
               bg-white shadow-lg rounded-xl
               opacity-0 invisible
               group-hover:opacity-100 group-hover:visible
               transition-all duration-200
               z-50
             ">
              <ul data-testid="profile-menu"
                className="py-2">
                <li>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    👤 Профиль
                  </Link>
                </li>

                <li>
                  <Link
                    href="/messages"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    💬 Сообщения
                  </Link>
                </li>

                <li data-testid="settings-link">
                  <Link
                    href="/settings"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    ⚙️ Настройки
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <Link
            href="/login?redirect=/seller/register"
            className="bg-[#F6FBF9] text-[#00A669] px-6 py-3 rounded-md font-bold text-sm uppercase tracking-wide hover:bg-[#e8f5f0] transition-colors"
          >
            {t('becomeSeller')}
          </Link>
        </div>
      </div>
    </header>
  )
}
