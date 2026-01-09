import React from 'react';
import { Mail, Heart } from 'lucide-react'; // Иконки для красоты 
import { ChevronRight } from 'lucide-react'; // Необязательно, можно использовать "/"
import img from "@/shared/assets/img/CartDetail/img.png";
import Link from 'next/link';
const VehicleCard = () => {
  const specs = [
    { label: "Категория", value: "Грузовики" },
    { label: "Марка", value: "Nissan" },
    { label: "Модель", value: "Eco T 100 Paardenvervoer" },
    { label: "Год", value: "1996" },
    { label: "Пробег", value: "225 650 км" },
    { label: "Страна", value: "Ukraine" },
    { label: "Вес", value: "15 000 кг" },
  ]; 
  const links = [
    { name: 'Главная', href: '/' },
    { name: 'Транспортные средства', href: '/vehicles' },
    { name: 'Грузовики', href: '/vehicles/trucks' },
    { name: 'Грузовые фургоны', href: '/vehicles/trucks/vans' },
    { name: 'Nissan', href: '/vehicles/trucks/vans/nissan' },
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 bg-gray-50 min-h-screen"> 
    <nav className="flex items-center space-x-2 text-[12px] md:text-sm text-gray-500 mb-1 overflow-x-auto whitespace-nowrap scrollbar-hide py-2">
      {links.map((link, index) => (
        <div key={index} className="flex items-center shrink-0">
          <Link href={link.href} className="hover:text-emerald-600 transition-colors">
            {link.name}
          </Link>
          {index < links.length - 1 && (
            <span className="mx-2 text-gray-300">/</span>
          )}
        </div>
      ))}
    </nav>
      {/* Верхняя часть: Галерея и основная инфо */}
      <div className="flex flex-col lg:flex-row gap-6 mb-8">
            
        {/* Левая колонка: Изображения */}
        <div className="lg:w-2/3">
          <div className="rounded-lg overflow-hidden bg-gray-200 aspect-video">
            <img
              src={img.src}
              alt="Nissan Eco T 100"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex justify-baseline gap-15 mt-6 overflow-x-auto ">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-video bg-gray-300 rounded overflow-hidden cursor-pointer hover:opacity-80 transition">
                <img src={`/thumb-${i}.jpg`} alt="thumbnail" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Правая колонка: Заголовок и Цена */}
        <div className="lg:w-1/3 bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-xl font-bold text-gray-800 leading-tight">
              Nissan Eco T 100 Paardenvervoer / BJ: 1995 ledig gewicht
            </h1>
            <Heart className="text-emerald-500 cursor-pointer" />
          </div>

          <p className="text-gray-400 text-sm mb-6">Закрытые грузовые автомобили</p>

          <div className="flex justify-between border-t border-b py-4 text-[14px]">
            <div>
              <p className="text-gray-400">Год выпуска</p>
              <p>1996 год</p>
            </div>

            <div>
              <p className="text-gray-400">Пробег</p>
              <p>360 000 km</p>
            </div>

            <div>
              <p className="text-gray-400">Цена брутто</p>
              <p>3 751 €</p>
            </div>
          </div>
          <Link href="/" className="text-[#009661] text-sm  hover:underline">
            Смотреть все позиции продавца OTP Leasing
          </Link>
          <div className="hidden lg:flex items-center gap-8 pt-4">
            <div className="text-[20px] font-bold text-[#009661] whitespace-nowrap">
              3100€
            </div>

            <button className="bg-[#009661] hover:bg-green-700 text-white text-[14px] px-6 py-2 rounded-lg font-semibold">
              НАПИСАТЬ ПРОДАВЦУ
            </button>
          </div>



        </div>
      </div>

      {/* Нижняя часть: Характеристики */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 max-w-4xl">
        <h2 className="text-xl font-bold mb-6 text-gray-800">Обзор транспортного средства</h2>

        <div className="flex flex-col overflow-hidden rounded-lg">
          {specs.map((spec, index) => (
            <div
              key={index}
              className={`grid grid-cols-2 py-4 px-6 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                }`}
            >
              {/* Левая колонка: Название (светлее) */}
              <span className="text-gray-400 font-normal">
                {spec.label}
              </span>

              {/* Правая колонка: Значение (темнее и всегда с одной линии) */}
              <span className="text-gray-800 font-medium">
                {spec.value}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* ===== ОПИСАНИЕ ===== */}
      <div className="mt-10">
        <h3 className="text-[20px] mt-[20px] text-[#252525] mb-4">
          Описание
        </h3>

        <div className="bgrounded-lg border border-gray-200 bg-gray-50 p-4 max-w-full lg:max-w-180">
          <div className="text-[15px] text-[#868686] leading-[1.6] space-y-4">
            <p>
              Nissan Eco T100 Paardenvervoer — надёжный грузовой автомобиль,
              предназначенный для перевозки грузов и специального оборудования.
            </p>

            <h4 className="text-[17px] font-semibold text-[#252525]">
              Ну и еще пример текста
            </h4>

            <p>
              Предварительные выводы неутешительны: перспективное планирование
              в значительной степени обусловливает важность укрепления
              моральных ценностей.
            </p>
          </div> 
            <Link href="/" className="text-[#009661] text-sm  hover:underline">
            Показать больше
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard; 