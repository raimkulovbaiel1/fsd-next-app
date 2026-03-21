import { create } from "zustand";

export interface Vehicle {
  id: string;
  name: string;
  year: string;
  weight: string;
  mileage: string;
  price: string;
  location: string;
  image: string;
}

interface ProfileState {
  vehicles: Vehicle[];
  loading: boolean;
  error: string | null;
  fetchVehicles: () => Promise<void>;
  addVehicle: (vehicle: Vehicle) => void;
  removeVehicle: (id: string) => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  vehicles: [],
  loading: false,
  error: null,

  fetchVehicles: async () => {
    try {
      set({ loading: true, error: null });

      const res = await fetch("http://localhost:5000/profile");

      if (!res.ok) {
        throw new Error("Ошибка при загрузке профиля");
      }

      const data = await res.json();

      set({
        vehicles: Array.isArray(data) ? data : [],
        loading: false,
      });
    } catch (error) {
      set({
        error: "Не удалось загрузить данные",
        loading: false,
      });
      console.error("Ошибка при загрузке данных:", error);
    }
  },

  addVehicle: (vehicle) =>
    set((state) => ({
      vehicles: [...state.vehicles, vehicle],
    })),

  removeVehicle: (id) =>
    set((state) => ({
      vehicles: state.vehicles.filter((vehicle) => vehicle.id !== id),
    })),
}));