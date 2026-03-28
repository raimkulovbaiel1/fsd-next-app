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
    imagesURL?: string[];
    category?: string;
    brand?: string;
    model?: string;
    country?: string;
    description?: string;
}

interface VehicleStore {
    vehicle: Vehicle | null;
    topAd: Vehicle | null;
    loading: boolean;
    topAdLoading: boolean;
    error: string | null;

    fetchVehicleById: (id: string) => Promise<void>;
    fetchTopAdById: (id: string) => Promise<void>;
    clearVehicle: () => void;
}

export const useVehicleStore = create<VehicleStore>((set) => ({
    vehicle: null,
    topAd: null,
    loading: false,
    topAdLoading: false,
    error: null,

    fetchVehicleById: async (id: string) => {
        try {
            set({
                vehicle: null,
                loading: true,
                error: null,
            });

            const response = await fetch(`http://localhost:5000/SearchResult/${id}`);
            let data: Vehicle | null = response.ok ? await response.json() : null;

            if (!data) {
                const allResponse = await fetch("http://localhost:5000/SearchResult");
                const allVehicles: Vehicle[] = await allResponse.json();

                data = Array.isArray(allVehicles)
                    ? allVehicles.find((v) => String(v.id) === id) || null
                    : null;
            }

            if (!data) {
                throw new Error("Автомобиль не найден");
            }

            set({
                vehicle: data,
                loading: false,
                error: null,
            });
        } catch (error) {
            set({
                vehicle: null,
                loading: false,
                error:
                    error instanceof Error ? error.message : "Ошибка загрузки автомобиля",
            });
        }
    },

    fetchTopAdById: async (id: string) => {
        try {
            set({ topAdLoading: true });

            const response = await fetch(`http://localhost:5000/topAds/${id}`);

            if (!response.ok) {
                set({ topAd: null, topAdLoading: false });
                return;
            }

            const data: Vehicle = await response.json();

            set({
                topAd: data,
                topAdLoading: false,
            });
        } catch {
            set({
                topAd: null,
                topAdLoading: false,
            });
        }
    },

    clearVehicle: () =>
        set({
            vehicle: null,
            topAd: null,
            loading: false,
            topAdLoading: false,
            error: null,
        }),
}));