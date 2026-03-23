import { create } from "zustand";

export interface FavoriteItem {
  id: number;
  name: string;
  year: number;
  weight: string;
  mileage: string;
  price: string;
  location: string;
  image: string;
}

interface FavoritesState {
  favorites: FavoriteItem[];
  loading: boolean;
  error: string | null;
  fetchFavorites: () => Promise<void>;
}

export const useFavoritesStore = create<FavoritesState>((set) => ({
  favorites: [],
  loading: false,
  error: null,

  fetchFavorites: async () => {
    try {
      set({ loading: true, error: null });

      const res = await fetch(process.env.NEXT_PUBLIC_WISHLIST_API!);

      if (!res.ok) {
        throw new Error("Ошибка при загрузке избранного");
      }

      const data = await res.json();

      set({
        favorites: Array.isArray(data) ? data : [],
        loading: false,
      });
    } catch (error) {
      set({
        error: "Не удалось загрузить данные",
        loading: false,
      });

      console.error("Ошибка:", error);
    }
  },
}));