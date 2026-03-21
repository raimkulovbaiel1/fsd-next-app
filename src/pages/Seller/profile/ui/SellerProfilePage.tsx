"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import carbon from "@/shared/assets/img/carbon.svg";
import { FiSearch } from "react-icons/fi";
import delta from "@/shared/assets/icons/delta.svg";
import { useProfileStore } from "@/shared/store/pages/Profile";

const SellerProfilePage = () => {
  const [search, setSearch] = useState("");

  const { vehicles, loading, error, fetchVehicles, removeVehicle } =
    useProfileStore();

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      const value = search.toLowerCase();

      return (
        vehicle.name.toLowerCase().includes(value) ||
        vehicle.location.toLowerCase().includes(value) ||
        vehicle.year.toLowerCase().includes(value)
      );
    });
  }, [vehicles, search]);

  if (loading) {
    return <div className="text-center py-10">Загрузка......</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-1 py-6 flex flex-col gap-4">
      <div className="flex flex-col lg:flex-row items-center gap-2 px-4 py-3 rounded shadow-md">
        <div className="relative w-full lg:flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Поиск объявления..."
            className="w-full pl-10 pr-3 py-2 border rounded-md"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Link
          href="/seller/new-item"
          className="w-full lg:w-auto bg-[#0096611A] text-[#29a669] px-4 py-2 rounded-md font-semibold hover:bg-green-200 transition text-center"
        >
          Добавить объявление
        </Link>
      </div>

      <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-3 gap-5 items-start">
        {filteredVehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className="bg-white shadow flex flex-col overflow-hidden group transition hover:shadow-lg rounded-xl"
          >
            <div className="w-full h-44 bg-gray-100">
              <img
                src={vehicle.image}
                alt={vehicle.name}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="p-4 flex flex-col flex-1">
              <div className="text-[20px] mb-1 border-b">{vehicle.name}</div>

              <div className="text-gray-600 text-sm mb-2 border-b">
                {vehicle.year} | {vehicle.weight} кг | {vehicle.mileage} км
              </div>

              <div className="text-[#252525] font-bold text-lg mb-2">
                {vehicle.price}€
              </div>

              <div className="text-[14px] text-gray-500 mt-auto flex items-center gap-2">
                <img src={carbon.src} alt="carbon" className="w-5 h-5" />
                {vehicle.location}
              </div>

              <div
                className="
                  overflow-hidden
                  opacity-0
                  group-hover:max-h-16
                  group-hover:opacity-100
                  transition-all
                  duration-300
                  mt-3
                  border-t
                  pt-3
                "
              >
                <div className="flex gap-2">
                  <Link
                    href={`/seller/edit/${vehicle.id}`}
                    className="px-3 py-1 bg-[#0096611A] text-[#009661] rounded-lg shadow hover:bg-green-100"
                  >
                    Редактировать
                  </Link>

                  <button
                    onClick={() => removeVehicle(vehicle.id)}
                    className="flex items-center gap-2 px-4 py-1 bg-[#EB57571A] text-[#EB5757] rounded-lg shadow hover:bg-[#EB575733]"
                  >
                    <img src={delta.src} alt="delete" className="w-4 h-4" />
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredVehicles.length === 0 && (
          <div className="col-span-full text-center text-gray-500 py-10">
            Ничего не найдено
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerProfilePage;