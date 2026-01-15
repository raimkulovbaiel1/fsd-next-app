"use client";

import carbon from "@/shared/assets/img/carbon.svg";
import { useEffect, useState } from "react";
import Link from "next/link";

interface FavoriteItem {
  title: string | undefined;
  id: number;
  name: string;
  year: number;
  weight: string;
  mileage: string;
  price: string;
  location: string;
  image: string;
}

interface FavoritesProps {
  favorites?: FavoriteItem[];
  loading?: boolean;
}

export const Favorites = ({ favorites: externalFavorites, loading: externalLoading }: FavoritesProps) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (externalFavorites !== undefined) {
      setFavorites(externalFavorites);
      setLoading(false);
      return;
    }

    const apiUrl = process.env.NEXT_PUBLIC_WISHLIST_API;

    if (apiUrl) {
      fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
          setFavorites(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [externalFavorites]);

  const isLoading = externalLoading !== undefined ? externalLoading : loading;
  const displayFavorites = externalFavorites || favorites;

  if (isLoading) {
    return <div className="px-4 text-gray-500">Загрузка избранного...</div>;
  }

  return (
    <>
      <div className="w-full mb-6">
        <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-4 h-10">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m1.1-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Поиск по объявлениям"
            className="flex-1 h-full outline-none text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 p-3 md:p-4">
        {displayFavorites.map((item) => (
          <div
            className="bg-white rounded-lg shadow flex flex-col overflow-hidden group relative transition"
            key={item.id}
          >
            <div className="w-full h-44 bg-gray-100 flex items-center justify-center">
              <img
                src={item.image}
                alt={item.title}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-1 flex flex-col flex-2">
              <div className="text-[20px] mb-1">{item.name}</div>
              <div className="text-gray-600 text-sm mb-2">
                {item.year} • {item.weight} • {item.mileage}
              </div>
              <div className="text-[#252525] font-bold text-lg mb-2">
                {item.price}
              </div>
              <div className="text-[14px] text-gray-500 mt-auto flex items-center gap-2">
                <img src={carbon.src} alt="carbon" className="w-5 h-5 inline-block" />
                {item.location}
              </div>
            </div>

            <Link href={`/product/${item.id}`}>
              <div
                className="absolute left-1/2 bottom-5 -translate-x-1/2
                  px-4 py-1 text-sm
                  bg-[#13fd841a] text-[#009661]
                  rounded-lg shadow
                  opacity-0 group-hover:opacity-100 transition"
              >
                Больше информации
              </div>
            </Link>

          </div>
        ))}
      </div>
    </>
  );
};


