import { filterInput } from '@/shared/ui';

import React from 'react';

export const Filter = () => {
return (
  // Добавляем обертку с центрированием
  <section className="bg-[#F8F9FA] py-8 px-4 font-sans">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
      
      {/* ЛЕВАЯ ЧАСТЬ: ФИЛЬТРЫ */}
      <div className="bg-white p-6 rounded-lg shadow-sm flex-1">
        {/* ... твой код табов ... */}
        <div className="flex border-b mb-6 overflow-x-auto whitespace-nowrap">
          <button className="bg-[#00A669] text-white px-6 py-3 rounded-t-lg font-medium">Транспорт</button>
          <button className="px-6 py-3 text-gray-500 hover:text-black">Сельское хозяйство</button>
          <button className="px-6 py-3 text-gray-500 hover:text-black">Строительство</button>
          <button className="px-6 py-3 text-gray-500 hover:text-black text-sm">Погрузочное оборудование</button>
        </div>

      {/* Сетка инпутов */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FilterInput label="Категория" placeholder="Грузовики" isSelect />  
        <FilterInput label="Страна" placeholder="Франция; Италия" isAdd />
        <FilterInput label="Марка" placeholder="Renault" isSelect />
        
        <div className="relative">
          <FilterInput label="Модель" placeholder="Premium 420HP" isOpen />
          {/* Выпадающий список */}
          <div className="absolute z-10 w-full bg-white border rounded-b-md shadow-lg -mt-0.5">
            <div className="p-2 text-gray-400 text-sm hover:bg-gray-50 cursor-pointer">Kangoo Z.E.</div>
            <div className="p-2 bg-gray-100 font-medium cursor-pointer">Dokker van</div>
            <div className="p-2 text-gray-400 text-sm hover:bg-gray-50 cursor-pointer">Traffic</div>
            <div className="p-2 text-gray-400 text-sm hover:bg-gray-50 cursor-pointer">New Master</div>
          </div>
        </div>

        <FilterInput label="Год (начиная с)" placeholder="2011" isSelect />
        <FilterInput label="Цена до (€)" placeholder="8000" isSelect />
        <FilterInput label="Пробег до (km)" placeholder="210000" isSelect />
      </div>

      <button className="w-full mt-8 bg-[#00A669] text-white py-4 rounded-md font-bold uppercase tracking-wider hover:bg-[#008f5a] transition-all">
        Поиск (3451 результатов)
      </button>
    </div>

    {/* ПРАВАЯ ЧАСТЬ: КАРТОЧКА */}
    <div className="w-full md:w-80 bg-white rounded-lg shadow-md overflow-hidden relative self-start">
      {/* ... код карточки ... */}
      <div className="absolute top-0 right-0 bg-[#EE5D50] text-white text-[10px] px-2 py-1 m-2 rounded-sm font-bold z-10">
        Предложение дня!
      </div>
      <img src="https://via.placeholder.com/400x300" alt="Car" className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-bold text-lg leading-tight">Opel COMBO Airco Elct Ramen</h3>
        <div className="mt-4 flex items-center justify-between border-t pt-4">
          <span className="text-xs text-gray-500">📍 Netherlands</span>
          <div className="text-[#00A669] font-bold text-xl">1 500€</div>
        </div>
      </div>
    </div>

  </div>  
</section>
  );
};

// Вспомогательный компонент для полей
interface FilterInputProps {
  label: string;
  placeholder: string;
  isSelect?: boolean;
  isAdd?: boolean;
  isOpen?: boolean;
}

const FilterInput: React.FC<FilterInputProps> = ({ label, placeholder, isSelect, isAdd, isOpen }) => (
  <div className="flex flex-col mb-4">
    <label className="text-[10px] uppercase font-bold text-gray-400 mb-1 ml-1">{label}</label>
    <div className={`flex items-center justify-between border ${isOpen ? 'rounded-t-md' : 'rounded-md'} p-3 bg-white cursor-pointer`}>
      <span className="text-sm text-gray-800">{placeholder}</span>
      {isSelect && <span className="text-[10px] text-gray-400">▼</span>}
      {isAdd && <span className="text-lg text-gray-400">+</span>}
      {isOpen && <span className="text-[10px] text-gray-400">▲</span>}
    </div>
  </div>
);
