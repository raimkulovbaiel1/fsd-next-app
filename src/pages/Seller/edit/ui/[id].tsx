'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function EditPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  return (
    <div className="max-w-6xl mx-auto p-4 bg-white min-h-screen">

      {/* TOP BAR */}
      <div className="flex items-center justify-between mb-4">
        <Link href="/seller/profile" className="text-sm text-gray-400 hover:underline">
          ← Назад
        </Link>

        <div className="flex gap-2">
          <Link
            href={`/seller/EditingProduct/${id}`}
            className="px-3 py-1 text-xs rounded bg-green-100 text-green-700 hover:bg-green-200 transition"
          >
            Редактировать объявление
          </Link>

          <button className="px-3 py-1 text-xs rounded bg-red-100 text-red-600">
            Удалить
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT */}
        <div className="lg:col-span-2">
          <img
            src="https://im.mashina.kg/tachka/images//6/8/c/68c1531dc157e268707cad27b4df5e88_240x180.jpg"
            alt="vehicle"
            className="rounded-lg w-full object-cover"
          />

          {/* thumbnails */}
          <div className="flex gap-3 mt-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-28 h-20 rounded overflow-hidden bg-gray-200"
              >
                <img
                  src="/car.jpg"
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>
            ))}

            <div className="w-28 h-20 rounded bg-gray-800 text-white text-xs flex items-center justify-center">
              Больше фото
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-white">
          <h1 className="text-lg font-semibold mb-1">
            Nissan Eco T100 Paardenvervoer
          </h1>

          <p className="text-sm text-gray-500 mb-4">
            / BJ: 1995 ledig gewicht
          </p>

          <p className="text-xs text-gray-400 mb-4">
            Закрытые грузовые автомобили
          </p>

          <div className="grid grid-cols-3 text-sm gap-y-3 mb-6">
            <div>
              <p className="text-gray-400 text-xs">Год выпуска</p>
              <p>1996 год</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs">Пробег</p>
              <p>360 000 km</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs">Цена</p>
              <p className="font-semibold">3 100 €</p>
            </div>
          </div>
        </div>
      </div>

      {/* SPECS */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-4">
          Обзор транспортного средства
        </h2>

        <div className="bg-gray-50 rounded-lg overflow-hidden text-sm">
          {[
            ['Категория', 'Грузовики'],
            ['Марка', 'Nissan'],
            ['Модель', 'Eco T100 Paardenvervoer'],
            ['Год (начиная с)', '1996'],
            ['Пробег', '225 650 km'],
            ['Страна', 'Ukraine'],
            ['Вес', '15 000kg'],
          ].map(([label, value], i) => (
            <div
              key={i}
              className="grid grid-cols-2 px-4 py-3 border-b last:border-none"
            >
              <span className="text-gray-400">{label}</span>
              <span>{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="mt-10 max-w-4xl">
        <h2 className="text-lg font-semibold mb-3">Описание</h2>

        <div className="text-sm text-gray-600 space-y-4">
          <p>
            Быстроразъёмное соединение. А также диаграммы связей
            являются только методом политического участия и
            ограничены исключительно образом мышления.
          </p>

          <p>
            Ну и ещё пример текста. Предварительные выводы
            неутешительны: перспективное планирование в
            значительной степени обусловливает важность
            укрепления моральных ценностей.
          </p>
        </div>
      </div>

    </div>
  );
}
