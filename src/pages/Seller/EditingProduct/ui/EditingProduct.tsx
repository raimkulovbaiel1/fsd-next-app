'use client';

import { useEffect, useState } from 'react';

interface EditingProductProps {
  vehicleId: string;
}

interface Vehicle {
  id: string;
  images: string[];
  name: string;
  year: string;
  mileage: string;
  price: string;
  description: string;
}

export default function EditingProduct({ vehicleId }: EditingProductProps) {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/profile/${vehicleId}`)
      .then(res => res.json())
      .then(data => {
        setVehicle({
          id: data.id,
          name: data.name ?? '',
          year: data.year ?? '',
          mileage: data.mileage ?? '',
          price: data.price ?? '',
          description: data.description ?? '',
          images: data.images ?? (data.image ? [data.image] : []),
        });
      })
      .finally(() => setLoading(false));
  }, [vehicleId]);

  const handleSave = () => {
    if (!vehicle) return;
    setSaving(true);

    setTimeout(() => {
      setSaving(false);
      alert('Товар сохранён ✅');
    }, 2000);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px] text-gray-500">
        Загрузка...
      </div>
    );
  }

  if (!vehicle) {
    return <div className="text-center text-red-500">Товар не найден</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold dark:text-white">
          Редактирование товара
        </h1>
        <p className="text-sm text-gray-500">
          Обновите информацию о транспортном средстве
        </p>
      </div>

      <div className="bg-white dark:bg-gray-100 rounded-2xl border dark:border-gray-700 p-5 space-y-6 shadow-sm">
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="relative rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-video">
              {vehicle.images[0] ? (
                <img
                  src={vehicle.images[0]}
                  className="w-full h-full object-cover"
                  alt=""
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  Нет фото
                </div>
              )}

              <label className="absolute inset-0 flex items-center justify-center
                bg-black/40 opacity-0 hover:opacity-100 transition cursor-pointer">
                <span className="text-white text-sm bg-black/60 px-4 py-2 rounded-lg">
                  📤 Загрузить фото
                </span>
                <input type="file" className="hidden" />
              </label>
            </div>

            <div className="flex gap-3 overflow-x-auto">
              {vehicle.images.map((img, index) => (
                <div
                  key={index}
                  className="relative group w-24 h-16 rounded-xl overflow-hidden border dark:border-gray-700"
                >
                  <img
                    src={img}
                    className="w-full h-full object-cover"
                    alt=""
                  />

                  <button
                    onClick={() =>
                      setVehicle(v =>
                        v
                          ? {
                              ...v,
                              images: v.images.filter((_, i) => i !== index),
                            }
                          : v
                      )
                    }
                    className="absolute top-1 right-1 bg-black/60 text-white
                    text-xs px-2 py-0.5 rounded opacity-0 group-hover:opacity-100"
                  >
                    🧹
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {[
              { label: 'Название', key: 'name' },
              { label: 'Год выпуска', key: 'year' },
              { label: 'Пробег', key: 'mileage' },
              { label: 'Цена', key: 'price' },
            ].map(field => (
              <div key={field.key}>
                <label className="block text-sm text-gray-500 mb-1">
                  {field.label}
                </label>
                <input
                  value={(vehicle as any)[field.key]}
                  onChange={e =>
                    setVehicle({
                      ...vehicle,
                      [field.key]: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border dark:border-gray-700
                  bg-white dark:bg-gray-100 px-4 py-2
                  focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-900 mb-1">
            Описание
          </label>
          <textarea
            rows={4}
            value={vehicle.description}
            onChange={e =>
              setVehicle({ ...vehicle, description: e.target.value })
            }
            className="w-full rounded-xl border dark:border-gray-700
            bg-white dark:bg-gray-100 px-4 py-3 resize-none
            focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        <div className="flex justify-end gap-3 border-t dark:border-gray-700 pt-4">
          <button className="px-6 py-2 rounded-xl border dark:border-gray-600
            text-gray-600 dark:text-gray-900 ">
            Отмена
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="px-8 py-2 rounded-xl bg-green-600 text-white
            hover:bg-green-700 disabled:opacity-50"
          >
            {saving ? 'Сохраняем...' : 'Сохранить'}
          </button>
        </div>
      </div>
    </div>
  );
}
