'use client';
import React, { useEffect, useState, use } from 'react';
import { Heart } from 'lucide-react';
import Link from 'next/link';

interface Vehicle {
  id: string;
  name: string;
  year: string;
  weight: string;
  mileage: string;
  price: string;
  location: string;
  image: string;
  category?: string;
  brand?: string;
  model?: string;
  country?: string;
  description?: string;
}

interface VehicleCardProps {
  params: Promise<{
    id: string;
  }>;
}

const VehicleCard = ({ params }: VehicleCardProps) => {
  const { id } = use(params);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await fetch(`http://localhost:5000/SearchResult/${id}`);
        if (response.ok) {
          const data = await response.json();
          setVehicle(data);
        } else {
       
          const allResponse = await fetch('http://localhost:5000/SearchResult');
          if (allResponse.ok) {
            const allVehicles = await allResponse.json();
            const foundVehicle = Array.isArray(allVehicles)
              ? allVehicles.find((v: Vehicle) => String(v.id) === id)
              : null;
            setVehicle(foundVehicle || null);
          }
        }
      } catch (error) {
        console.error('Ошибка при загрузке данных автомобиля:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchVehicle();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-4 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center py-10">Загрузка...</div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="max-w-6xl mx-auto p-4 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center py-10">
          <h2 className="text-xl font-bold mb-4">Автомобиль не найден</h2>
          <Link href="/searchResult" className="text-[#009661] hover:underline">
            Вернуться к списку
          </Link>
        </div>
      </div>
    );
  }

  const specs = [
    { label: "Категория", value: vehicle.category || "Не указано" },
    { label: "Марка", value: vehicle.brand || "Не указано" },
    { label: "Модель", value: vehicle.model || vehicle.name },
    { label: "Год", value: vehicle.year },
    { label: "Пробег", value: `${vehicle.mileage} км` },
    { label: "Страна", value: vehicle.country || vehicle.location },
    { label: "Вес", value: `${vehicle.weight} кг` },
  ];

  const links = [
    { name: 'Главная', href: '/' },
    { name: 'Транспортные средства', href: '/searchResult' },
    { name: vehicle.name, href: `/Cart/${vehicle.id}` },
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
      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        <div className="lg:w-full">
          <div className="rounded-lg overflow-hidden bg-gray-200 w-64 sm:w-80 lg:w-26 aspect-3/4">
            <img
              src={vehicle.image}
              alt={vehicle.name}
              className="w-10 h-full object-cover"
            />
          </div>
          <div className="flex justify-start gap-3 mt-4 overflow-x-auto">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-video w-10 bg-gray-300 rounded overflow-hidden cursor-pointer hover:opacity-80 transition"
              >
                <img
                  src={vehicle.image}
                  alt={`${vehicle.name} thumbnail ${i}`}
                  className="w-15 h-10 object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="lg:w-1/3 bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-xl font-bold text-gray-800 leading-tight">
              {vehicle.name}
            </h1>
            <Heart className="text-emerald-500 cursor-pointer" />
          </div>

          <p className="text-gray-400 text-sm mb-6">{vehicle.category || "Транспортное средство"}</p>
          <div className="flex justify-between border-t border-b py-4 text-[14px]">
            <div>
              <p className="text-gray-400">Год выпуска</p>
              <p>{vehicle.year}</p>
            </div>
            <div>
              <p className="text-gray-400">Пробег</p>
              <p>{vehicle.mileage} км</p>
            </div>
            <div>
              <p className="text-gray-400">Цена брутто</p>
              <p>{vehicle.price}</p>
            </div>
          </div>
          <Link href="/" className="text-[#009661] text-sm  hover:underline">
            Смотреть все позиции продавца
          </Link>
          <div className="hidden lg:flex items-center gap-8 pt-4">
            <div className="text-[20px] font-bold text-[#009661] whitespace-nowrap">
              {vehicle.price}
            </div>
            <button className="bg-[#009661] hover:bg-green-700 text-white text-[14px] px-6 py-2 rounded-lg font-semibold">
              НАПИСАТЬ ПРОДАВЦУ
            </button>
          </div>
        </div>
      </div>

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