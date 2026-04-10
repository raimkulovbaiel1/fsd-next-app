"use client";

import React, { useEffect, useMemo, useState, use } from "react";
import { Heart } from "lucide-react";
import Link from "next/link";
import { useVehicleStore } from "@/shared/store/app/usecart";

interface VehicleCardProps {
  params: Promise<{ id: string }>;
}

const VehicleCard = ({ params }: VehicleCardProps) => {
  const { id } = use(params);

  const {
    vehicle,
    topAd,
    loading,
    error,
    fetchVehicleById,
    fetchTopAdById,
    clearVehicle,
  } = useVehicleStore();

  const [mainImage, setMainImage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!id) return;

    fetchVehicleById(id);
    fetchTopAdById(id);

    return () => {
      clearVehicle();
    };
  }, [id, fetchVehicleById, fetchTopAdById, clearVehicle]);

  const currentData = vehicle || topAd;

  const gallery = useMemo(() => {
    if (!currentData) return [];
    return currentData.imagesURL && currentData.imagesURL.length > 0
      ? currentData.imagesURL
      : [currentData.image];
  }, [currentData]);

  const currentImage = useMemo(() => {
    if (!currentData) return "";
    return mainImage || currentData.imagesURL?.[0] || currentData.image;
  }, [mainImage, currentData]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const sendMessage = () => {
    if (!message.trim() || !currentData) return;

    const newMessage = {
      id: Date.now(),
      vehicleId: currentData.id,
      vehicleName: currentData.name,
      time: new Date().toLocaleTimeString().slice(0, 5),
      text: message,
      checked: false,
    };

    const oldMessages = JSON.parse(localStorage.getItem("messages") || "[]");

    localStorage.setItem(
      "messages",
      JSON.stringify([newMessage, ...oldMessages])
    );

    setMessage("");
    closeModal();
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-4 bg-gray-50 min-h-screen flex items-center justify-center">
        <div data-testid="loading-state"
          className="text-center py-10">Загрузка...</div>
      </div>
    );
  }

  if (error || !currentData) {
    return (
      <div className="max-w-6xl mx-auto p-4 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center py-10">
          <h2 className="text-xl font-bold mb-4">
            {error || "Автомобиль не найден"}
          </h2>
          <Link href="/searchResult" className="text-[#009661] hover:underline">
            Вернуться к списку
          </Link>
        </div>
      </div>
    );
  }

  const specs = [
    { label: "Категория", value: currentData.category || "Не указано" },
    { label: "Марка", value: currentData.brand || "Не указано" },
    { label: "Модель", value: currentData.model || currentData.name },
    { label: "Год", value: currentData.year },
    { label: "Пробег", value: `${currentData.mileage} км` },
    { label: "Страна", value: currentData.country || currentData.location },
    { label: "Вес", value: `${currentData.weight} кг` },
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 bg-gray-50 min-h-screen">
      <nav className="flex items-center space-x-2 text-[12px] md:text-sm text-gray-500 mb-1 overflow-x-auto whitespace-nowrap scrollbar-hide py-2">
        <Link href="/" className="hover:text-emerald-600 transition-colors">
          Главная
        </Link>
        <span className="mx-2 text-gray-300">/</span>
        <Link
          href="/searchResult"
          className="hover:text-emerald-600 transition-colors"
        >
          Транспортные средства
        </Link>
        <span className="mx-2 text-gray-300">/</span>
        <span>{currentData.name}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        <div className="lg:w-full">
          <div className="rounded-lg overflow-hidden bg-gray-200 w-64 sm:w-80 lg:w-full lg:h-[420px] aspect-[3/4]">
            <img
              src={currentImage}
              alt={currentData.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex justify-start mt-4 overflow-x-auto gap-2">
            {gallery.map((img, i) => (
              <button
                key={i}
                type="button"
                className="aspect-video w-20 overflow-hidden cursor-pointer hover:opacity-80 transition"
                onClick={() => setMainImage(img)}
              >
                <img
                  src={img}
                  alt={`${currentData.name} thumbnail ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="lg:w-1/3 bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-xl font-bold text-gray-800 leading-tight">
              {currentData.name}
            </h1>
            <Heart className="text-emerald-500 cursor-pointer" />
          </div>

          <p className="text-gray-400 text-sm mb-6">
            {currentData.category || "Транспортное средство"}
          </p>

          <div className="flex justify-between border-t border-b py-4 text-[14px]">
            <div>
              <p className="text-gray-400">Год выпуска</p>
              <p>{currentData.year}</p>
            </div>
            <div>
              <p className="text-gray-400">Пробег</p>
              <p>{currentData.mileage} км</p>
            </div>
            <div>
              <p className="text-gray-400">Цена брутто</p>
              <p>{currentData.price}</p>
            </div>
          </div>

          <Link
            href="/SellersPage"
            className="text-[#009661] text-sm hover:underline"
          >
            Смотреть все позиции продавца
          </Link>

          <div className="hidden lg:flex items-center gap-8 pt-4">
            <div className="text-[20px] font-bold text-[#009661] whitespace-nowrap">
              {currentData.price}
            </div>
            <button data-testid="contact-seller-button"
              onClick={openModal}
              className="bg-[#009661] hover:bg-green-700 text-white text-[14px] px-6 py-2 rounded-lg font-semibold"
            >
              Написать продавцу
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg p-6 w-90 md:w-96 relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl font-bold"
            >
              ✕
            </button>

            <h2 className="text-lg font-bold mb-4 text-gray-800">
              Написать продавцу
            </h2>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Введите сообщение..."
              className="w-full border border-gray-300 rounded-md p-2 mb-4 text-sm resize-none h-24 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />

            <button
              onClick={sendMessage}
              className="bg-[#009661] hover:bg-green-700 text-white w-full py-2 rounded-md font-semibold"
            >
              Отправить
            </button>
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 max-w-4xl">
        <h2 className="text-xl font-bold mb-6 text-gray-800">
          Обзор транспортного средства
        </h2>

        <div data-testid="specs-table"
          className="flex flex-col overflow-hidden rounded-lg">
          {specs.map((spec, index) => (
            <div
              key={index}
              className={`grid grid-cols-2 py-4 px-6 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
            >
              <span className="text-gray-400 font-normal">{spec.label}</span>
              <span className="text-gray-800 font-medium">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-[20px] mt-[20px] text-[#252525] mb-4">Описание</h3>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 max-w-full lg:max-w-[720px]">
          <div className="text-[15px] text-[#868686] leading-[1.6] space-y-4">
            <p>
              {currentData.description ||
                "Nissan Eco T100 Paardenvervoer — надёжный грузовой автомобиль, предназначенный для перевозки грузов и специального оборудования."}
            </p>
          </div>

          <Link href="/" className="text-[#009661] text-sm hover:underline">
            Показать больше
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;