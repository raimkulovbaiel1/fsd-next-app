import { create } from 'zustand';

export interface Ad {
    id: number;
    title: string;
    price: string;
    location: string;
    image: string;
}

interface AdState {
    ads: Ad[];
    loading: boolean;
    error: string | null;
    setAds: (ads: Ad[]) => void;
    fetchVehicles: () => Promise<void>;
}

export const useAdStore = create<AdState>((set) => ({
    ads: [],
    loading: false,
    error: null,

    setAds: (ads) => set({ ads }),

    fetchVehicles: async () => {
        try {
            set({ loading: true, error: null });

            const res = await fetch('http://localhost:5000/topAds');

            if (!res.ok) {
                throw new Error('Ошибка при загрузке объявлений');
            }

            const data = await res.json();

            set({
                ads: Array.isArray(data) ? data : [],
                loading: false,
            });
        } catch (error) {
            set({
                error: 'Не удалось загрузить данные',
                loading: false,
            });
            console.error('Ошибка при загрузке данных:', error);
        }
    },
}));