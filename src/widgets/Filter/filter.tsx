"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { FilterInput } from "@/shared/ui";
import filter from "@/shared/assets/icons/filter.svg";
import { useFilterStore } from "@/shared/store/widgets/filter";

const schema = z.object({
  category: z.string().optional(),
  brand: z.string().optional(),
  model: z.string().optional(),
  country: z.string().optional(),
  year: z.string().optional(),
  price: z.string().optional(),
  mileage: z.string().optional(),
  weight: z.string().optional(),
});

type FilterFormData = z.infer<typeof schema>;

export const Filter = () => {
  const {
    options,
    result,
    filters,
    loading,
    error,
    fetchFilterData,
    setFilter,
    handleSearch,
  } = useFilterStore();

  const { control, handleSubmit, watch, setValue } = useForm<FilterFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      category: filters.category,
      brand: filters.brand,
      model: filters.model,
      country: filters.country,
      year: filters.year,
      price: filters.price,
      mileage: filters.mileage,
      weight: filters.weight,
    },
  });

  useEffect(() => {
    fetchFilterData();
  }, [fetchFilterData]);

  const selectedBrand = watch("brand");

  const onSubmit = (data: FilterFormData) => {
    Object.entries(data).forEach(([key, value]) => {
      setFilter(key as keyof typeof filters, value || "");
    });

    handleSearch();
  };

  if (loading) {
    return <div className="p-1 text-center font-bold text-[17px]">Загрузка</div>;
  }

  if (error) {
    return <div className="p-1 text-center font-bold text-red-500">{error}</div>;
  }

  if (!options || !options.categories) {
    return <div className="p-1 text-center font-bold text-[17px]">Нет данных</div>;
  }

  const filterInputs = [
    { label: "Категория", key: "category", options: options.categories },
    { label: "Марка", key: "brand", options: options.allBrands },
    {
      label: "Модель",
      key: "model",
      options: options.models?.[selectedBrand || ""] ?? [],
    },
    { label: "Страна", key: "country", options: options.countries },
    { label: "Год (с)", key: "year", options: options.years },
    { label: "Цена до (€)", key: "price", options: options.prices },
    { label: "Пробег до", key: "mileage", options: options.mileages },
    { label: "Вес до", key: "weight", options: options.weights },
  ] as const;

  return (
    <section className="bg-[#F8F9FA] py-6 px-4">
      <div data-testid="filter-component" 
       className="max-w-7xl mx-auto grid md:grid-cols-[1fr_320px] gap-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-6 rounded-lg shadow"
        >
          <div data-testid="filter-inputs"
           className="grid grid-cols-2 gap-3">
            {filterInputs.map(({ label, key, options }) => (
              <Controller
                key={key}
                name={key}
                control={control}
                render={({ field }) => (
                  <FilterInput
                    label={label}
                    isSelect
                    options={options}
                    value={field.value || ""}
                    onChange={(value) => {
                      field.onChange(value);

                      if (key === "brand") {
                        setValue("model", "");
                      }
                    }}
                  />
                )}
              />
            ))}
          </div>

          <button data-testid="filter-submit"
            type="submit"
            className="w-full mt-6 bg-[#00A669] text-white py-4 rounded font-bold"
          >
            ПОИСК ({result?.totalResults ?? 0})
          </button>
        </form>

        {result && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <img
              src={result.image}
              alt={result.title}
              className="h-56 w-full object-cover"
            />

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

                <span className="text-green-600 text-lg font-normal">
                  {result.price} €
                </span>
              </div>
            </div>

            {result.id && (
              <Link
                href={`/product/${result.id}`}
                className="block text-center text-[#00A669] py-3 font-bold"
              >
                Подробнее
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
};