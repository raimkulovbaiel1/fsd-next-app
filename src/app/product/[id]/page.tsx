"use client";

import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useProductStore } from "@/shared/store/app/useProductStore";

export default function ProductPage() {
  const params = useParams();
  const id = params?.id as string;

  const { product: item, loading, error, fetchProductById, clearProduct } =
    useProductStore();

  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    if (!id) return;

    fetchProductById(id);

    return () => {
      clearProduct();
    };
  }, [id, fetchProductById, clearProduct]);

  const gallery = useMemo(() => {
    if (!item) return [];

    return item.imagesURL && item.imagesURL.length > 0
      ? item.imagesURL
      : [item.image, item.image, item.image, item.image];
  }, [item]);

  const currentImage = useMemo(() => {
    return mainImage || item?.imagesURL?.[0] || item?.image || "";
  }, [mainImage, item]);

  if (loading) {
    return <div className="p-10 text-center">Загрузка...</div>;
  }

  if (error || !item) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-semibold mb-4">
          {error || "Товар не найден"}
        </h2>
        <Link href="/" className="text-[#009661] underline">
          Вернуться назад
        </Link>
      </div>
    );
  }

  const specs = [
    { label: "Категория", value: item.category || "Грузовики" },
    { label: "Марка", value: item.brand || "Nissan" },
    { label: "Модель", value: item.model || item.name },
    { label: "Год (начиная с)", value: item.year },
    { label: "Пробег", value: item.mileage },
    { label: "Страна", value: item.country || "Ukraine" },
    { label: "Вес", value: item.weight },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 bg-[#f7f7f7] min-h-screen">
      <nav className="flex flex-wrap items-center gap-2 text-xs text-gray-400 mb-4">
        <Link href="/" className="hover:text-[#009661]">
          Главная
        </Link>
        <span>›</span>
        <Link href="/searchResult" className="hover:text-[#009661]">
          Транспортные средства
        </Link>
        <span>›</span>
        <Link href="/searchResult" className="hover:text-[#009661]">
          Грузовики
        </Link>
        <span>›</span>
        <span className="text-gray-500">{item.brand || "Nissan"}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <div className="bg-white rounded-lg overflow-hidden">
            <img
              src={currentImage}
              alt={item.name}
              className="w-full h-[260px] sm:h-[360px] md:h-[420px] object-cover"
            />
          </div>

          <div className="flex gap-2 mt-3 overflow-x-auto">
            {gallery.slice(0, 5).map((img, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setMainImage(img)}
                className="min-w-[90px] h-[70px] rounded overflow-hidden border border-gray-200 bg-white"
              >
                <img
                  src={img}
                  alt={`preview-${index}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}

            <div className="min-w-[90px] h-[70px] rounded overflow-hidden bg-black/70 text-white flex items-center justify-center text-xs px-2 text-center">
              Больше фото
            </div>
          </div>
        </div>

        <aside className="w-full lg:w-[360px] bg-white rounded-lg p-6 h-fit">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-[22px] leading-8 font-semibold text-[#252525]">
              {item.name}
            </h1>
            <button className="text-[#009661]">
              <Heart fill="currentColor" size={22} />
            </button>
          </div>

          <p className="text-sm text-gray-400 mt-2">
            Закрытые грузовые автомобили
          </p>

          <div className="border-t border-b mt-5 py-4 grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-400 mb-1">Год выпуска</p>
              <p className="text-[#252525] font-medium">{item.year} год</p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">Пробег</p>
              <p className="text-[#252525] font-medium">{item.mileage}</p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">Цена брутто</p>
              <p className="text-[#252525] font-medium">{item.price}</p>
            </div>
          </div>

          <Link
            href="/SellersPage"
            className="inline-block mt-5 text-[14px] text-[#009661] hover:underline"
          >
            Смотреть все позиции продавца {item.sellerName || "OTP Leasing"}
          </Link>

          <div className="mt-6 flex items-center justify-between gap-4">
            <div className="text-[38px] font-bold text-[#009661] leading-none">
              {item.price}
            </div>

            <button className="bg-[#009661] hover:bg-[#007a52] text-white px-6 py-3 rounded-md text-[12px] font-semibold transition">
              НАПИСАТЬ ПРОДАВЦУ
            </button>
          </div>
        </aside>
      </div>

      <section className="mt-10 max-w-3xl">
        <h2 className="text-[32px] leading-tight font-semibold text-[#252525] mb-6">
          Обзор транспортного средства
        </h2>

        <div className="rounded-lg overflow-hidden">
          {specs.map((spec, index) => (
            <div
              key={spec.label}
              className={`grid grid-cols-2 px-5 py-4 text-sm ${
                index % 2 === 0 ? "bg-[#f4f4f4]" : "bg-white"
              }`}
            >
              <span className="text-gray-400">{spec.label}</span>
              <span className="text-[#252525] font-medium">{spec.value}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 max-w-3xl">
        <h3 className="text-[28px] font-semibold text-[#252525] mb-4">
          Описание
        </h3>

        <div className="bg-white rounded-lg p-5 text-[15px] leading-7 text-gray-500">
          {item.description ||
            "Nissan Eco T100 Paardenvervoer — надёжный грузовой автомобиль, предназначенный для перевозки грузов и специального оборудования."}
        </div>
      </section>
    </div>
  );
}