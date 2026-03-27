import { create } from "zustand";

export interface ProductItem {
    id: number;
    name: string;
    year: number;
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
    sellerName?: string;
}

interface ProductStore {
    product: ProductItem | null;
    loading: boolean;
    error: string | null;
    fetchProductById: (id: string) => Promise<void>;
    clearProduct: () => void;
}

export const useProductStore = create<ProductStore>((set) => ({
    product: null,
    loading: false,
    error: null,

    fetchProductById: async (id: string) => {
        try {
            set({ loading: true, error: null, product: null });

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_WISHLIST_API}/${id}`
            );

            if (!res.ok) {
                throw new Error("Товар не найден");
            }

            const data: ProductItem = await res.json();

            set({
                product: data,
                loading: false,
            });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : "Ошибка загрузки",
                loading: false,
                product: null,
            });
        }
    },

    clearProduct: () => set({ product: null, error: null, loading: false }),
}));