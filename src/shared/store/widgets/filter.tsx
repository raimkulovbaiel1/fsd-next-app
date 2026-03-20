import { create } from "zustand";

export interface FilterItem {
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

export interface FilterOptions {
  categories: string[];
  allBrands: string[];
  models: Record<string, string[]>;
  countries: string[];
  years: string[];
  prices: string[];
  mileages: string[];
  weights: string[];
}

export interface FiltersState {
  category: string;
  brand: string;
  model: string;
  country: string;
  year: string;
  price: string;
  mileage: string;
  weight: string;
}

interface SearchResult {
  id?: number;
  category?: string;
  brand?: string;
  model?: string;
  country?: string;
  year?: string;
  price?: string;
  mileage?: string;
  weight?: string;
  image: string;
  location?: string;
  title: string;
  totalResults: number;
}

interface FilterStore {
  data: FilterItem[];
  options: FilterOptions | null;
  result: SearchResult | null;
  filters: FiltersState;
  loading: boolean;
  error: string | null;

  fetchFilterData: () => Promise<void>;
  setFilter: (name: keyof FiltersState, value: string) => void;
  handleSearch: () => void;
  resetFilters: () => void;
}

const initialFilters: FiltersState = {
  category: "",
  brand: "",
  model: "",
  country: "",
  year: "",
  price: "",
  mileage: "",
  weight: "",
};

export const useFilterStore = create<FilterStore>((set, get) => ({
  data: [],
  options: null,
  result: null,
  filters: initialFilters,
  loading: false,
  error: null,

  fetchFilterData: async () => {
    try {
      set({ loading: true, error: null });

      const [filterRes, optionsRes] = await Promise.all([
        fetch("http://localhost:5000/Filter"),
        fetch("http://localhost:5000/FilterOptions"),
      ]);

      if (!filterRes.ok || !optionsRes.ok) {
        throw new Error("Ошибка загрузки данных");
      }

      const filterData: FilterItem[] = await filterRes.json();
      const optionsData: FilterOptions = await optionsRes.json();

      set({
        data: filterData,
        options: optionsData,
        loading: false,
      });
    } catch (error) {
      set({
        error: "Не удалось загрузить данные",
        loading: false,
      });
      console.error("Ошибка загрузки данных", error);
    }
  },

  setFilter: (name, value) => {
    const currentFilters = get().filters;

    set({
      filters: {
        ...currentFilters,
        [name]: value,
        ...(name === "brand" ? { model: "" } : {}),
      },
    });
  },

  handleSearch: () => {
    const { data, filters } = get();

    const filtered = data.filter((item) => {
      return (
        (!filters.category || item.category === filters.category) &&
        (!filters.brand || item.brand === filters.brand) &&
        (!filters.model || item.model === filters.model) &&
        (!filters.country || item.country === filters.country) &&
        (!filters.year || item.year === filters.year) &&
        (!filters.price || Number(item.price) <= Number(filters.price)) &&
        (!filters.mileage || Number(item.mileage) <= Number(filters.mileage)) &&
        (!filters.weight || Number(item.weight) <= Number(filters.weight))
      );
    });

    const first = filtered[0];

    set({
      result: first
        ? {
            ...first,
            title: `${first.brand} ${first.model}`,
            totalResults: filtered.length,
          }
        : {
            title: "Товар не найден",
            image: "https://via.placeholder.com/400x300",
            totalResults: 0,
          },
    });
  },

  resetFilters: () => {
    set({
      filters: initialFilters,
      result: null,
    });
  },
}));