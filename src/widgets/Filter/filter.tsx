import { filterInput } from '@/shared/ui';

import React from 'react';

export const Filter = () => {
  return (
    <section className="bg-[#F8F9FA] py-4 px-4 font-sans md:py-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm flex-1">
          <div className="grid grid-cols-2 gap-2 mb-6 md:flex md:border-b md:gap-0 md:overflow-x-auto">
            <button className="bg-[#00A669] text-white px-4 py-3 rounded-md md:rounded-none md:rounded-t-lg font-medium text-sm">
              Транспорт
            </button>
            <button className="px-4 py-3 text-gray-700 bg-white border border-transparent hover:text-black text-sm text-center md:border-none">
              Строительство
            </button>
            <button className="px-4 py-3 text-gray-700 bg-white border border-transparent hover:text-black text-sm text-center md:border-none">
              Сельское хозяйство
            </button>
            <button className="px-4 py-3 text-gray-700 bg-white border border-transparent hover:text-black text-sm text-center md:border-none leading-tight">
              Погрузочное оборудование
            </button>
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-2">
            <FilterInput label="Категория" placeholder="Грузовики" isSelect />
            <FilterInput label="Страна" placeholder="Франция; " isAdd />
            <FilterInput label="Марка" placeholder="Renault" isSelect />
            <FilterInput label="Модель" placeholder="Premium 420HP" />
            <FilterInput label="Год (начиная с)" placeholder="2011" isSelect />
            <FilterInput label="Цена до (EUR)" placeholder="15000" isSelect />
            <FilterInput label="Пробег до (km)" placeholder="210000" isSelect />
            <FilterInput label="Вес до (kg)" placeholder="8000" isSelect />
          </div>

          <button className="w-full mt-6 bg-[#00A669] text-white py-4 rounded-md font-bold uppercase tracking-wider hover:bg-[#008f5a] transition-all">
            ПОИСК (3451)
          </button>
        </div>
        <div className="w-full md:w-80 bg-white rounded-lg shadow-md overflow-hidden relative self-start">
          <div className="absolute top-4 right-0 bg-[#EE5D50] text-white text-[12px] px-3 py-1.5 rounded-l-sm font-bold z-10 shadow-sm">
            Предложение дня!
          </div>
          <img
            src="https://via.placeholder.com/400x300"
            alt="Opel COMBO"
            className="w-full h-56 object-cover"
          />

          <div className="p-4">
            <h3 className="font-bold text-gray-800 text-base leading-tight">
              Opel COMBO Airco Elct Ramen Stuurbediening
            </h3>
            <p className="text-gray-400 text-sm mt-1">Закрытые грузопассажирские автомобили</p>
            <div className="mt-4 pt-4 border-t flex items-center justify-between bg-gray-50 -mx-4 px-4 py-3">
              <div className="flex items-center text-gray-500 text-xs">
                <span className="mr-1">📍</span>
                <span className="leading-none">Garage van Nierop,<br />Netherlands</span>
              </div>
              <div className="text-[#00A669] font-bold text-xl">1 500€</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface FilterInputProps {
  label: string;
  placeholder: string;
  isSelect?: boolean;
  isAdd?: boolean;
}
const FilterInput: React.FC<FilterInputProps> = ({ label, placeholder, isSelect, isAdd }) => (
  <div className="flex flex-col mb-2">
    <label className="text-[10px] text-gray-400 mb-1 ml-1 truncate">{label}</label>
    <div className="flex items-center justify-between border border-gray-200 rounded-sm p-2.5 bg-white cursor-pointer h-[44px]">
      <span className="text-xs text-gray-800 font-medium truncate">{placeholder}</span>
      {isSelect && (
        <svg className="w-2.5 h-2.5 text-gray-400 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      )}
      {isAdd && <span className="text-lg text-gray-300 font-light">+</span>}
    </div>
  </div>
);
