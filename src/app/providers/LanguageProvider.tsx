'use client'

import { useState, useEffect, createContext, useContext, ReactNode } from 'react'
import i18n from '@/i18n'

type LanguageContextType = {
  lang: string
  changeLang: (lang: string) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState('ru')

  useEffect(() => {
    const savedLang = localStorage.getItem('i18nextLng') || 'ru'
    i18n.changeLanguage(savedLang)
    setLang(savedLang)
  }, [])

  const changeLang = (newLang: string) => {
    i18n.changeLanguage(newLang)
    setLang(newLang)
    localStorage.setItem('i18nextLng', newLang)
  }

  return (
    <LanguageContext.Provider value={{ lang, changeLang }}>
      {children}
    </LanguageContext.Provider>
  )
}


export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within LanguageProvider')
  return context
}
