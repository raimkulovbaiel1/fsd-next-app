'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import i18n from '@/i18n'

import search from '@/shared/assets/icons/search.svg'
import user from '@/shared/assets/icons/user.svg'

export const Header = () => {
  const [currentLang, setCurrentLang] = useState('ru')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLLIElement>(null)

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
          <div className="text-[#00A669] font-bold text-2xl tracking-tight">NOVO</div>

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
              <li className="flex items-center cursor-pointer hover:text-[#00A669] transition-colors">
                Евро
                <span className="ml-1 text-xs">▼</span>
              </li>

              {/* Поиск */}
              <li className="cursor-pointer hover:text-[#00A669] transition-colors">Поиск</li>
            </ul>
          </nav>
        </div>

        {/* Мобильные иконки */}
        <div className="flex gap-3 lg:hidden">
          <Image src={search} alt="search" width={24} height={24} />
          <Image src={user} alt="user" width={24} height={24} />
        </div>

        {/* Правая часть: Профиль + Стать продавцом */}
        <div className="hidden lg:flex items-center space-x-8">
          <Link href="/settings">
            <button className="text-[#00A669] font-semibold hover:opacity-80 transition-opacity">
              Мой профиль
            </button>
          </Link>

          <Link
            href="/SellerRegisterPage"
            className="bg-[#F6FBF9] text-[#00A669] px-6 py-3 rounded-md font-bold text-sm uppercase tracking-wide hover:bg-[#e8f5f0] transition-colors"
          >
            Стать продавцом
          </Link>
        </div>
      </div>
    </header>
  )
}
