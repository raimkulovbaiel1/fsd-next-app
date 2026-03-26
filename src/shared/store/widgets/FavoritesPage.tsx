import { create } from "zustand";

interface LeasingItem {
  id: number;
  title: string;
  year: number;
  weight: string;
  mileage: string;
  price: string;
  location: string;
  image: string;
}

interface Filters {
  price: { min: number; max: number };
  transportTypes: string[];
  manufacturers: string[];
  adTypes: string[];
  countries: string[];
}

interface LeasingState {
  items: LeasingItem[];
  filters: Filters | null;
  loading: boolean;
  isFilterOpen: boolean;

  fetchLeasing: () => Promise<void>;
  fetchFilters: () => Promise<void>;

  setFilterOpen: (value: boolean) => void;
}

export const useLeasingStore = create<LeasingState>((set) => ({
  items: [],
  filters: null,
  loading: false,
  isFilterOpen: false,

  fetchLeasing: async () => {
    try {
      set({ loading: true });

      const apiUrl = process.env.NEXT_PUBLIC_LEASING_API;
      const res = await fetch(apiUrl!);
      const data = await res.json();

      set({ items: data[0].Leasing, loading: false });
    } catch (e) {
      console.error(e);
      set({ loading: false });
    }
  },

  fetchFilters: async () => {
    try {
      const res = await fetch("http://localhost:5000/filters");
      const data = await res.json(); 
       console.log("filters data:", data);

      set({ filters: data });
    } catch (e) {
      console.error(e);
    }
  },

  setFilterOpen: (value) => set({ isFilterOpen: value }),
}));