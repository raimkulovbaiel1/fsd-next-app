'use client';
import React, { useEffect, useState } from "react";
import Link from "next/link";
import carbon from "@/shared/assets/img/carbon.svg";
import { FiSearch } from "react-icons/fi";
import delta from "@/shared/assets/icons/delta.svg"
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

const SellerProfilePage = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filters, setFilters] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [, setIsFilterOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/profile")
      .then(res => res.json())
      .then(data => {
        setVehicles(Array.isArray(data) ? data : []);
        setFilters(null);
      })
      .catch(err => console.error("Ошибка при загрузке данных:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-center py-10">Загрузка...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-1 py-6 flex flex-col gap-1">
      <div className="flex flex-col lg:flex-row items-center gap-2  px-4 py-3 rounded shadow-md">
        <div className="relative w-full lg:flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Поиск объявления..."
            className="w-full pl-10 pr-3 py-2 border "
          />
        </div>
        <Link
          href="/seller/new-item"
          className="w-full lg:w-auto bg-[#0096611A] text-[#29a669] px-4 py-2 rounded-md font-semibold hover:bg-green-200 transition text-center"
        >
          Добавить объявление
        </Link>
      </div>

      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {vehicles.map(vehicle => (
          <div
            key={vehicle.id}
            className="bg-white shadow flex flex-col overflow-hidden group relative transition hover:shadow-lg"
          >
            <div className="w-full h-44 bg-gray-100 flex items-center justify-center">
              <img src={vehicle.image} alt={vehicle.name} className="object-cover w-full h-full" />
            </div>

            <div className="p-4 flex flex-col flex-1">
              <div className="text-[20px] mb-1 border-b">{vehicle.name}</div>
              <div className="text-gray-600 text-sm mb-2 border-b">
                {vehicle.year} | {vehicle.weight} кг | {vehicle.mileage} км
              </div>
              <div className="text-[#252525] font-bold text-lg mb-2">{vehicle.price}€</div>
              <div className="text-[14px] text-gray-500 mt-auto flex items-center gap-2">
                <img src={carbon.src} alt="carbon" className="w-5 h-5 inline-block" />
                {vehicle.location}
              </div>
            </div>

            <div className="absolute left-1/2 bottom-2 transform -translate-x-1/4 flex gap-2 text-[15px] px-3 py-2 text-[#009661] opacity-0 group-hover:opacity-100 transition pointer-events-auto">
              <a
                href={`/edit/${vehicle.id}`}
                className="px-3 py-1 bg-white text-[#009661] rounded-lg shadow"
              >
                Редактировать
              </a>
              <a
                href={`/delete/${vehicle.id}`}
                className="flex items-center gap-2 px-4 py-1 bg-[#EB57571A] text-[#EB5757] rounded-lg shadow"
              >
                <img src={delta.src} alt="logo" className="w-4 h-4" />
                Удалить
              </a>

            </div>
          </div>
        ))}

        <div className="flex justify-center mt-6 w-full">
          <button className="bg-[#009661] text-white px-4 py-2 rounded-lg transition hover:bg-green-700">
            Загрузить ещё
          </button>
        </div>
      </div>

    </div>
  );
};

export default SellerProfilePage;
