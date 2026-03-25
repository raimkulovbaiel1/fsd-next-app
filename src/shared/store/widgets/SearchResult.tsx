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
    transportType?: string;
    brand?: string;
    gearbox?: string;
    adType?: string;
}

export interface Filters {
    price: {
        min: number;
        max: number;
    };
    types: string[];
    brands: string[];
    countries: string[];
    gearboxes: string[];
    adTypes: string[];
}

interface SelectedFilters {
    transportType: string;
    brands: string[];
    country: string;
    gearbox: string;
    adTypes: string[];
}

interface SearchStore {
    vehicles: Vehicle[];
    filters: Filters | null;
    loading: boolean;
    error: string | null;

    minPrice: number;
    maxPrice: number;

    selectedFilters: SelectedFilters;
    appliedFilters: SelectedFilters;

    fetchAll: () => Promise<void>;
    setMinPrice: (value: number) => void;
    setMaxPrice: (value: number) => void;
    setTransportType: (value: string) => void;
    setCountry: (value: string) => void;
    setGearbox: (value: string) => void;
    toggleBrand: (brand: string, checked: boolean) => void;
    toggleAdType: (adType: string, checked: boolean) => void;
    applyFilters: () => void;
    resetFilters: () => void;
    getFilteredVehicles: (search: string) => Vehicle[];
}

const initialSelectedFilters: SelectedFilters = {
    transportType: "",
    brands: [],
    country: "",
    gearbox: "",
    adTypes: [],
};

export const useSearchStore = create<SearchStore>((set, get) => ({
    vehicles: [],
    filters: null,
    loading: false,
    error: null,

    minPrice: 0,
    maxPrice: 0,

    selectedFilters: initialSelectedFilters,
    appliedFilters: initialSelectedFilters,

    fetchAll: async () => {
        try {
            set({ loading: true, error: null });

            const [vehiclesRes, filtersRes] = await Promise.all([
                fetch("http://localhost:5000/SearchResult"),
                fetch("http://localhost:5000/SearchResultFilters"),
            ]);

            if (!vehiclesRes.ok || !filtersRes.ok) {
                throw new Error("Ошибка загрузки данных");
            }

            const vehiclesData = await vehiclesRes.json();
            const filtersData = await filtersRes.json();

            set({
                vehicles: Array.isArray(vehiclesData) ? vehiclesData : [],
                filters: filtersData || null,
                minPrice: filtersData?.price?.min ?? 0,
                maxPrice: filtersData?.price?.max ?? 0,
                loading: false,
            });
        } catch (error) {
            console.error("Ошибка при загрузке данных:", error);
            set({
                error: "Не удалось загрузить данные",
                loading: false,
            });
        }
    },

    setMinPrice: (value) =>
        set((state) => ({
            minPrice: value > state.maxPrice ? state.maxPrice : value,
        })),

    setMaxPrice: (value) =>
        set((state) => ({
            maxPrice: value < state.minPrice ? state.minPrice : value,
        })),

    setTransportType: (value) =>
        set((state) => ({
            selectedFilters: {
                ...state.selectedFilters,
                transportType: value,
            },
        })),

    setCountry: (value) =>
        set((state) => ({
            selectedFilters: {
                ...state.selectedFilters,
                country: value,
            },
        })),

    setGearbox: (value) =>
        set((state) => ({
            selectedFilters: {
                ...state.selectedFilters,
                gearbox: value,
            },
        })),

    toggleBrand: (brand, checked) =>
        set((state) => ({
            selectedFilters: {
                ...state.selectedFilters,
                brands: checked
                    ? [...state.selectedFilters.brands, brand]
                    : state.selectedFilters.brands.filter((b) => b !== brand),
            },
        })),

    toggleAdType: (adType, checked) =>
        set((state) => ({
            selectedFilters: {
                ...state.selectedFilters,
                adTypes: checked
                    ? [...state.selectedFilters.adTypes, adType]
                    : state.selectedFilters.adTypes.filter((t) => t !== adType),
            },
        })),

    applyFilters: () =>
        set((state) => ({
            appliedFilters: state.selectedFilters,
        })),

    resetFilters: () => {
        const filters = get().filters;

        set({
            selectedFilters: initialSelectedFilters,
            appliedFilters: initialSelectedFilters,
            minPrice: filters?.price?.min ?? 0,
            maxPrice: filters?.price?.max ?? 0,
        });
    },

    getFilteredVehicles: (search: string) => {
        const { vehicles, minPrice, maxPrice, appliedFilters } = get();

        const query = search.toLowerCase().trim();

        return vehicles.filter((vehicle) => {
            const price = Number(vehicle.price);

            if (price < minPrice || price > maxPrice) return false;

            if (
                appliedFilters.transportType &&
                vehicle.transportType !== appliedFilters.transportType
            ) {
                return false;
            }

            if (
                appliedFilters.brands.length > 0 &&
                !appliedFilters.brands.includes(vehicle.brand || "")
            ) {
                return false;
            }

            if (
                appliedFilters.country &&
                vehicle.location !== appliedFilters.country
            ) {
                return false;
            }

            if (
                appliedFilters.gearbox &&
                vehicle.gearbox !== appliedFilters.gearbox
            ) {
                return false;
            }

            if (
                appliedFilters.adTypes.length > 0 &&
                !appliedFilters.adTypes.includes(vehicle.adType || "")
            ) {
                return false;
            }

            if (query) {
                const matchesSearch =
                    vehicle.name?.toLowerCase().includes(query) ||
                    vehicle.brand?.toLowerCase().includes(query) ||
                    vehicle.transportType?.toLowerCase().includes(query) ||
                    vehicle.location?.toLowerCase().includes(query);

                if (!matchesSearch) return false;
            }

            return true;
        });
    },
}));