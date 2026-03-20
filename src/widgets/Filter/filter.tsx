'use client';

import { FilterInput } from '@/shared/ui';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import filter from '@/shared/assets/icons/filter.svg'
interface FilterItem {
  id: number;
  category: string;
  brand: string;
  model: string;
  country: string;
  year: string;
  price: string;
  mileage: string;
  weight: string;
  image: string;
  location: string;
}

interface FilterOptions {
  categories: string[];
  allBrands: string[];
  models: Record<string, string[]>;
  countries: string[];
  years: string[];
  prices: string[];
  mileages: string[];
  weights: string[];
}

export const Filter = () => {
  const [data, setData] = useState<FilterItem[]>([]);
  const [options, setOptions] = useState<FilterOptions | null>(null);
  const [result, setResult] = useState<any | null>(null);

  const [filters, setFilters] = useState({
    category: '',
    brand: '',
    model: '',
    country: '',
    year: '',
    price: '',
    mileage: '',
    weight: '',
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [filterRes, optionsRes] = await Promise.all([
          fetch('http://localhost:5000/Filter'),
          fetch('http://localhost:5000/FilterOptions'),
        ]);

        setData(await filterRes.json());
        setOptions(await optionsRes.json());
      } catch (e) {
        console.error('Ошибка загрузки данных', e);
      }
    };

    loadData();
  }, []);


  const handleInputChange = (name: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'brand' ? { model: '' } : {}),
    }));
  };


  const handleSearch = () => {
    const filtered = data.filter((item) => (
      (!filters.category || item.category === filters.category) &&
      (!filters.brand || item.brand === filters.brand) &&
      (!filters.model || item.model === filters.model) &&
      (!filters.country || item.country === filters.country) &&
      (!filters.year || item.year === filters.year) &&
      (!filters.price || Number(item.price) <= Number(filters.price)) &&
      (!filters.mileage || Number(item.mileage) <= Number(filters.mileage)) &&
      (!filters.weight || Number(item.weight) <= Number(filters.weight))
    ));

    const first = filtered[0];

    setResult(
      first
        ? {
          ...first,
          title: `${first.brand} ${first.model}`,
          totalResults: filtered.length,
        }
        : {
          title: 'Товар не найден',
          image: 'https://via.placeholder.com/400x300',
          totalResults: 0,
        }
    );
  };

  if (!options || !options.categories) {
    return <div className="p-1 text-center font-bold text-[17px] ">Загрузка</div>;
  }

  const filterInputs = [
    { label: 'Категория', key: 'category', options: options.categories },
    { label: 'Марка', key: 'brand', options: options.allBrands },
    {
      label: 'Модель',
      key: 'model',
      options: options.models?.[filters.brand] ?? [],
    },
    { label: 'Страна', key: 'country', options: options.countries },
    { label: 'Год (с)', key: 'year', options: options.years },
    { label: 'Цена до (€)', key: 'price', options: options.prices },
    { label: 'Пробег до', key: 'mileage', options: options.mileages },
    { label: 'Вес до', key: 'weight', options: options.weights },
  ];

  return (
    <section className="bg-[#F8F9FA] py-6 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-[1fr_320px] gap-6">

        {/* ФИЛЬТРЫ */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="grid grid-cols-2 gap-3">
            {filterInputs.map(({ label, key, options }) => (
              <FilterInput
                key={key}
                label={label}
                isSelect
                options={options}
                value={filters[key as keyof typeof filters]}
                onChange={(v) => handleInputChange(key, v)}
              />
            ))}
          </div>

          <button
            onClick={handleSearch}
            className="w-full mt-6 bg-[#00A669] text-white py-4 rounded font-bold"
          >
            ПОИСК ({result?.totalResults ?? 0})
          </button>
        </div>

        {/* РЕЗУЛЬТАТ */}
        {result && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <img src={result.image} className="h-56 w-full object-cover" />
            <div className="p-4">
              <h3 className="font-bold">{result.title}</h3>
              <p className="text-sm text-gray-400">{result.category}</p>
              <div className="flex justify-between mt-4 bg-[#f3f4f5] rounded-lg p-3">
                <span className="flex items-center gap-2 text-sm">
                  <img
                    src={filter.src}
                    alt="logo"
                    className="w-4 h-4 object-contain"
                  />
                  {result.location}
                </span>

                <span className="text-green-600 text-lg font-normal ">
                  {result.price} €
                </span>
              </div>


            </div>

            {result.id && (
              <Link
                href={`/product/${result.id}`}
                className="block text-center text-[#00A669] py-3 font-bold"
              >
                Подробнееo
              </Link>
            )}
          </div>
        )}

      </div>
    </section>
  );
};
