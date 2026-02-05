'use client';

import { useParams, } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
interface Vehicle {
  id: string;
  name: string; 
  title: string; 
  brand: string;
  model: string;
  year: string;
  weight: string;
  mileage: string;
  price: string; 
  location: string;
  image: string;
}
export default function EditPage() {
  const params = useParams();
  const id = params?.id as string | undefined;
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:5000/profile/${id}`)
      .then(res => res.json())
      .then(data => setVehicle(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="p-6">Загрузка...</div>;
  }

  if (!vehicle) {
    return <div className="p-6">Товар не найден</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 bg-white min-h-screen">

      <div className="flex items-center justify-between mb-4">
        <Link href="/" className="text-sm text-gray-400 hover:underline">
          ← Назад
        </Link>

        <div className="flex gap-2">
          <button className="px-3 py-1 text-xs rounded bg-green-100 text-green-700">
            Редактировать объявление
          </button>
          <button className="px-3 py-1 text-xs rounded bg-red-100 text-red-600">
            Удалить
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <img
            src={vehicle.image}
            alt={vehicle.name}
            className="rounded-lg w-160.5 h-92.5 object-cover"
          />

          <div className="flex gap-3 mt-4">
            {[1, 2, 4].map((i) => (
              <div
                key={i}
                className="w-18 h-20 rounded overflow-hidden bg-gray-200"
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

        <div className="bg-white">

          <h1 className="text-2xl font-bold border-b pb-1 mb-6">
             {vehicle.name}
          </h1>
          <p className="text-[15px] text-gray-400 mb-4">
            Закрытые грузовые автомобили
          </p>

          <div className="grid grid-cols-3 text-sm gap-y-3 mb-6">
            <div>
              <p className="text-gray-400 text-xs">Год выпуска</p>
              {vehicle.year} Год
            </div>
            <div>
              <p className="text-gray-400 text-xs">Пробег</p>
              {vehicle.mileage} км
            </div>
            <div>
              <p className="text-gray-400 text-xs">Цена</p>
              <p className="font-semibold">{vehicle.price} €</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-4">
          Обзор транспортного средства
        </h2>

        <div className="bg-gray-50 rounded-lg overflow-hidden text-sm">
          {[
            ['Категория', 'Грузовики'],
            ['Марка', `${vehicle.title}`],
            ['Модель', `${vehicle.brand} ${vehicle.model}`],
            ['Год (начиная с)', `${vehicle.year}`],
            ['Пробег', `${vehicle.mileage} км`],
            ['Страна', `${vehicle.location}`],
            ['Вес', `${vehicle.weight} кг`],
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
