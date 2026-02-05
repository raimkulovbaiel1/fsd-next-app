'use client';
import { useEffect, useState } from 'react';

interface EditingProductProps {
  vehicleId: string;
}

interface Vehicle {
  id: string;
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
      
      .then(data => setVehicle(data))
      .finally(() => setLoading(false));
  }, [vehicleId]);

  const handleSave = () => {
    if (!vehicle) return; 
    setSaving(true);
    setTimeout(() => {
      // тут можно сделать PUT запрос на сервер
      setSaving(false);
      alert('Товар успешно обновлён!');
    }, 2000);
  };

  if (loading) return <div>Загрузка...</div>;
  if (!vehicle) return <div>Товар не найден</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Редактировать товар</h1>
      <input
        type="text"
        value={vehicle.name}
        onChange={e => setVehicle({ ...vehicle, name: e.target.value })}
        className="border px-3 py-2 rounded mb-2 w-full"
      />
      <input
        type="text"
        value={vehicle.year}
        onChange={e => setVehicle({ ...vehicle, year: e.target.value })}
        className="border px-3 py-2 rounded mb-2 w-full"
      />
      <input
        type="text"
        value={vehicle.mileage}
        onChange={e => setVehicle({ ...vehicle, mileage: e.target.value })}
        className="border px-3 py-2 rounded mb-2 w-full"
      />
      <input
        type="text"
        value={vehicle.price}
        onChange={e => setVehicle({ ...vehicle, price: e.target.value })}
        className="border px-3 py-2 rounded mb-2 w-full"
      />
      <textarea
        value={vehicle.description}
        onChange={e => setVehicle({ ...vehicle, description: e.target.value })}
        className="border px-3 py-2 rounded mb-2 w-full"
        rows={5}
      />
      <button
        onClick={handleSave}
        disabled={saving}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
      >
        {saving ? 'Сохраняем...' : 'Сохранить'}
      </button>
    </div>
  );
}
