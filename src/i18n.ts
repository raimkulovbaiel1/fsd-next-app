'use client'

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
  ru: {
    translation: {
      search: 'Поиск',
      profile: 'Мой профиль',
      becomeSeller: 'Стать продавцом',
    },
  },
  en: {
    translation: {
      search: 'Search',
      profile: 'My profile',
      becomeSeller: 'Become a seller',
    },
  },
  kg: {
    translation: {
      search: 'Издөө',
      profile: 'Менин профилим',
      becomeSeller: 'Сатуучу болуу',
    },
  },
}
,
    lng: typeof window !== 'undefined' ? localStorage.getItem('i18nextLng') || 'ru' : 'ru',
    fallbackLng: 'ru',
    interpolation: { escapeValue: false },
  });
}

export default i18n;
