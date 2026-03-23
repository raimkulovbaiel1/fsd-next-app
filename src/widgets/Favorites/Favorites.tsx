'use client';

import { useEffect, useMemo } from "react";
import { useFavoritesStore } from "@/shared/store/widgets/Favorites";
import carbon from "@/shared/assets/img/carbon.svg";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  text: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export const Favorites = () => {
  const { favorites, fetchFavorites, loading, error } = useFavoritesStore();

  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      text: "",
    },
  });
  const search = watch("text") || "";

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const filteredFavorites = useMemo(() => {
    if (!search.trim()) return favorites;

    const q = search.toLowerCase();

    return favorites.filter((item) =>
      item.name.toLowerCase().includes(q) ||
      item.location.toLowerCase().includes(q)
    );
  }, [favorites, search]);

  if (loading) {
    return <div className="px-4 text-gray-500">Загрузка тавара ...</div>;
  }

  if (error) {
    return <div className="px-4 text-red-500">{error}</div>;
  }

  return (
    <>
      <div className="w-full mb-6">
        <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-4 h-10">
          <img src="" alt="logo-search" />
          <input
            {...register("text")}
            type="text"
            placeholder="Поиск по объявлениям"
            className="flex-1 h-full outline-none text-sm"
          />
        </div>

        {errors.text && (
          <p className="mt-1 text-sm text-red-500">{errors.text.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 p-3 md:p-4">
        {filteredFavorites.map((item) => (
          <div key={item.id} className="bg-white p-3 rounded shadow">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-40 object-cover"
            />
            <div>{item.name}</div>
            <div>{item.price}</div>
            <div className="flex gap-2">
              <img src={carbon.src} alt="location" className="w-4 h-4" />
              {item.location}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};