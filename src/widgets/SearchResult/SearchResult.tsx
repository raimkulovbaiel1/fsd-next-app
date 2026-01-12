 'use client';
 import React, { useEffect, useState } from "react";
import carbon from "@/shared/assets/img/carbon.svg";

interface Vehicle {
  id: string;
  name: string;
  year: string;
  weight: string;
  mileage: string;
  price: string;
  location: string;
  image: string;
}

export const SearchResult = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filters, setFilters] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Получаем и товары, и фильтры параллельно
    Promise.all([
      fetch("http://localhost:4091/SearchResult").then(res => res.json()),
      fetch("http://localhost:4091/SearchResultFilters").then(res => res.json())
    ])
      .then(([vehiclesData, filtersData]) => {
        setVehicles(Array.isArray(vehiclesData) ? vehiclesData : []);
        setFilters(filtersData || null);
      })
      .catch(err => console.error("Ошибка при загрузке данных:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-center py-10">Загрузка...</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 px-2 py-4 lg:py-8 max-w-7xl mx-auto">
      {/* Фильтры */}
      <button className="block lg:hidden w-full bg-[#0096611A] text-[#009661] py-2 rounded font-semibold">
        Открыть фильтр
      </button>

    <aside className="hidden lg:block w-full lg:w-80 bg-white rounded-xl shadow p-4 h-fit mb-4 lg:mb-0">
  {filters ? (
    <form>
      {/* Цена */}
      <div className="mb-5">
        <label htmlFor="price-range" className="block font-semibold mb-1">
          ___ Цена, €
        </label>

        <input
          type="range"
          id="price-range"
          min={filters.price.min}
          max={filters.price.max}
          className="w-full accent-green-400"
        />

        <div className="flex justify-between text-sm text-gray-500">
          <span>{filters.price.min}</span>
          <span>{filters.price.max}</span>
        </div>
      </div>

      {/* Тип транспорта */}
      <div className="mb-5">
        <label className="block font-[16px] text-[#252525] mb-2">
          - Тип транспорта
        </label>

        <select className="w-full border text-[#8B959E] text-[14px] rounded px-2 py-1">
          {filters.transportTypes?.map((type: string) => (
            <option key={type}>{type}</option>
          ))}
        </select>
      </div>
       
      {/* Производитель */}
      <div className="mb-5">
        <label className="block font-[16px] text-[#252525] mb-4">
          — Производитель
        </label>

        <div className="space-y-2 text-[14px] max-h-40 overflow-y-auto pr-2">
          {filters.brands?.map((brand: string) => (
            <label
              key={brand}
              className="flex items-center gap-3 cursor-pointer select-none"
            >
              <input type="checkbox" className="peer sr-only" />

              <span
                className="
                  w-5 h-5
                  border-2 border-[#9CA3AF]
                  rounded-md
                  flex items-center justify-center
                  transition
                  peer-checked:border-[#009661]
                  peer-checked:bg-[#009661]
                "
              >
                <svg
                  className="
                    w-3 h-3
                    text-white
                    opacity-0
                    peer-checked:opacity-100
                    transition
                  "
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-7.364 7.364a1 1 0 01-1.414 0L3.293 9.707a1 1 0 011.414-1.414l3.222 3.222 6.657-6.657a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>

              <span className="text-[#8B959E] peer-checked:text-[#009661] transition">
                {brand}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Страна */}
      <div className="mb-5">
        <label className="block font-[16px] text-[#252525] mb-2">
          - Страна местонахождения
        </label>

        <select className="w-full border text-[14px] rounded px-2 py-2">
          {filters.countries?.map((country: string) => (
            <option key={country}>{country}</option>
          ))}
        </select>
      </div>

      {/* Коробка передач */}
      <div className="mb-5">
        <label className="block font-[16px] text-[#252525] mb-2">
          - Тип коробки передач
        </label>

        <select className="w-full border text-[14px] rounded px-2 py-2">
          {filters.gearboxes?.map((gearbox: string) => (
            <option key={gearbox}>{gearbox}</option>
          ))}
        </select>
      </div>

      {/* Тип объявления */}
      <div className="mb-6">
        <label className="block font-[16px] text-[#252525] mb-4">
          - Тип объявления
        </label>

        <div className="space-y-2 text-[14px]">
          {filters.adTypes?.map((adType: string) => (
            <label
              key={adType}
              className="flex items-center gap-3 cursor-pointer select-none"
            >
              <input type="checkbox" className="peer sr-only" />

              <span
                className="
                  w-5 h-5
                  border-2 border-[#9CA3AF]
                  rounded-md
                  flex items-center justify-center
                  transition
                  peer-checked:border-[#009661]
                  peer-checked:bg-[#009661]
                "
              >
                <svg
                  className="
                    w-3 h-3
                    text-white
                    opacity-0
                    peer-checked:opacity-100
                    transition
                  "
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-7.364 7.364a1 1 0 01-1.414 0L3.293 9.707a1 1 0 011.414-1.414l3.222 3.222 6.657-6.657a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>

              <span className="text-[#8B959E] peer-checked:text-[#009661] transition">
                {adType}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Кнопка */}
      <button className="w-full bg-[#009661] text-white py-2 rounded font-semibold">
        Применить фильтры
      </button>
    </form>
  ) : (
    <div>Фильтры недоступны</div>
  )}
</aside>

      {/* Список машин */}
      <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-5">
        {vehicles.map(vehicle => (
          <div
            key={vehicle.id}
            className="bg-white rounded-lg shadow flex flex-col overflow-hidden group relative transition"
          >
            <div className="w-full h-44 bg-gray-100 flex items-center justify-center">
              <img src={vehicle.image} alt={vehicle.name} className="object-cover w-full h-full" />
            </div>
            <div className="p-4 flex flex-col flex-1">
              <div className="text-[20px] mb-1">{vehicle.name}</div>
              <div className="text-gray-600 text-sm mb-2">
                {vehicle.year} • {vehicle.weight} кг • {vehicle.mileage} км
              </div>
              <div className="text-[#252525] font-bold text-lg mb-2">{vehicle.price}€</div>
              <div className="text-[14px] text-gray-500 mt-auto flex items-center gap-2">
                <img src={carbon.src} alt="carbon" className="w-5 h-5 inline-block" />
                {vehicle.location}
              </div>
            </div>
            <button className="absolute left-1/2 bottom-5 px-1 py-1 bg-[#4689661A] text-[#009661] rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition pointer-events-none group-hover:pointer-events-auto">
              Больше информации
            </button>
          </div>
        ))}
      </main>
    </div>
  );
};


