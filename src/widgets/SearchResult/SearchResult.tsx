'use client';
import React, { useEffect, useState } from "react";
import Link from "next/link";
import carbon from "@/shared/assets/img/carbon.svg";
import img from "@/shared/assets/img/searchResult/img1.png";
import img2 from "@/shared/assets/img/searchResult/img2.png";
import img3 from "@/shared/assets/img/searchResult/img3.png";
import img4 from "@/shared/assets/img/searchResult/img4.png";
import img5 from "@/shared/assets/img/searchResult/img5.png";
import img6 from "@/shared/assets/img/searchResult/img6.png";

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
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [visibleCount, setVisibleCount] = useState(5); 


  const imageMap: { [key: string]: string } = {
    "img1": img.src,
    "img2": img2.src,
    "img3": img3.src,
    "img4": img4.src,
    "img5": img5.src,
    "img6": img6.src,
  };
  useEffect(() => {
    Promise.all([
      fetch("http://localhost:5000/SearchResult").then(res => res.json()),
      fetch("http://localhost:5000/SearchResultFilters").then(res => res.json())
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

      {/* КНОПКА ОТКРЫТЬ ФИЛЬТР (МОБИЛКА) */}
      <button
        onClick={() => setIsFilterOpen(true)}
        className="block lg:hidden w-full bg-[#0096611A] text-[#009661] py-2 rounded font-semibold"
      >
        Открыть фильтр
      </button>

      <aside className={`
          fixed inset-y-0 left-0 z-50 w-full bg-white p-4 overflow-y-auto
          transition-transform duration-300
          ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:static lg:translate-x-0 lg:w-80 lg:rounded-xl lg:shadow lg:h-fit
        `}>


        {/* HEADER МОБИЛКИ */}
        <div className="flex justify-between items-center mb-4 lg:hidden">
          <span className="font-semibold text-lg">Фильтры</span>
          <button
            onClick={() => setIsFilterOpen(false)}
            className="text-[#009661] text-xl font-bold"
          >
            ✕
          </button>
        </div>
        {filters ? (
          <form>
            <div className="mb-5  " >
              <label htmlFor="price-range" className="block font-semibold mb-1">
                ___ Цена, €
              </label>

              <input
                type="range"
                id="price-range"
                min={filters.price.min}
                max={filters.price.max}
                className="w-full   accent-green-400"
              />
              <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Минимум</span>
                  <span>Максимум</span>
                </div>

                <div className="mt-1 flex justify-between font-semibold text-gray-900">
                  <span>{filters.price.min}</span>
                  <span>{filters.price.max}</span>
                </div>
              </div>

            </div>

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
        {vehicles.slice(0, visibleCount).map(vehicle => (

          <Link
            key={vehicle.id}
            href={`/Cart/${vehicle.id}`}
            className="bg-white rounded-lg shadow flex flex-col overflow-hidden group relative transition hover:shadow-lg"
          >
            <div className="w-full h-44 bg-gray-100 flex items-center justify-center">
              <img src={imageMap[vehicle.image] || vehicle.image} alt={vehicle.name} className="object-cover w-full h-full" />
            </div>
            <div className="p-4 flex flex-col flex-1">
              <div className="text-[20px] mb-1 border-b">{vehicle.name}</div>
              <div className="text-gray-600 text-sm mb-2 border-b ">
                {vehicle.year} | {vehicle.weight} кг | {vehicle.mileage} | км
              </div>
              <div className="text-[#252525] font-bold text-lg mb-2">{vehicle.price}€</div>
              <div className="text-[14px] text-gray-500 mt-auto flex items-center gap-2">
                <img src={carbon.src} alt="carbon" className="w-5 h-5 inline-block" />
                {vehicle.location}
              </div>
            </div>
            <div className="absolute left-1/2 text-[13px]  bottom-5 px-3 py-1 bg-[#4689661A] text-[#009661] rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition pointer-events-none">
              Больше информации
            </div>
          </Link>
        ))}
        {visibleCount < vehicles.length && (
          <div className="flex justify-center mt-6 col-span-full">
            <button
              onClick={() => setVisibleCount(prev => prev + 4)}
              className="bg-[#009661] text-white px-6 py-2 rounded-lg transition hover:bg-[#007f52]"
            >
              Загрузить ещё
            </button>
          </div>
        )}

      </main>
    </div>
  );
};


