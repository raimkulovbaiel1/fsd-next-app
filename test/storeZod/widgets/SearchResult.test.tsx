import { describe, it, expect, beforeEach, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useSearchStore } from "@/shared/store/widgets/SearchResult";

describe("useSearchStore", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        global.fetch = vi.fn();

        useSearchStore.setState({
            vehicles: [],
            filters: null,
            loading: false,
            error: null,
            minPrice: 0,
            maxPrice: 0,
            selectedFilters: {
                transportType: "",
                brands: [],
                country: "",
                gearbox: "",
                adTypes: [],
            },
            appliedFilters: {
                transportType: "",
                brands: [],
                country: "",
                gearbox: "",
                adTypes: [],
            },
        });
    });

    it("fetchAll - успешный запрос", async () => {
        const mockVehicles = [
            {
                id: "1",
                name: "BMW X5",
                year: "2020",
                weight: "2000",
                mileage: "100000",
                price: "1500",
                location: "Bishkek",
                image: "/test.jpg",
                transportType: "SUV",
                brand: "BMW",
                gearbox: "Автомат",
                adType: "Продажа",
            },
        ];

        const mockFilters = {
            price: { min: 1000, max: 5000 },
            types: ["SUV"],
            brands: ["BMW"],
            countries: ["Bishkek"],
            gearboxes: ["Автомат"],
            adTypes: ["Продажа"],
        };

        (global.fetch as any)
            .mockResolvedValueOnce(
                new Response(JSON.stringify(mockVehicles), {
                    status: 200,
                    headers: { "Content-Type": "application/json" },
                })
            )
            .mockResolvedValueOnce(
                new Response(JSON.stringify(mockFilters), {
                    status: 200,
                    headers: { "Content-Type": "application/json" },
                })
            );

        const { result } = renderHook(() => useSearchStore());

        await act(async () => {
            await result.current.fetchAll();
        });

        expect(result.current.vehicles).toEqual(mockVehicles);
        expect(result.current.filters).toEqual(mockFilters);
        expect(result.current.minPrice).toBe(1000);
        expect(result.current.maxPrice).toBe(5000);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeNull();
        expect(global.fetch).toHaveBeenCalledTimes(2);
    });

    it("fetchAll - ошибка запроса", async () => {
        const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => { });

        (global.fetch as any)
            .mockResolvedValueOnce(new Response(null, { status: 500 }))
            .mockResolvedValueOnce(new Response(null, { status: 500 }));

        const { result } = renderHook(() => useSearchStore());

        await act(async () => {
            await result.current.fetchAll();
        });

        expect(result.current.error).toBe("Не удалось загрузить данные");
        expect(result.current.loading).toBe(false);

        consoleSpy.mockRestore();
    });

    it("setMinPrice - устанавливает минимальную цену", () => {
        useSearchStore.setState({
            minPrice: 0,
            maxPrice: 1000,
        });

        useSearchStore.getState().setMinPrice(500);

        expect(useSearchStore.getState().minPrice).toBe(500);
    });

    it("setMinPrice - не должен быть больше maxPrice", () => {
        useSearchStore.setState({
            minPrice: 0,
            maxPrice: 300,
        });

        useSearchStore.getState().setMinPrice(500);

        expect(useSearchStore.getState().minPrice).toBe(300);
    });

    it("setMaxPrice - устанавливает максимальную цену", () => {
        useSearchStore.setState({
            minPrice: 200,
            maxPrice: 0,
        });

        useSearchStore.getState().setMaxPrice(1000);

        expect(useSearchStore.getState().maxPrice).toBe(1000);
    });

    it("setMaxPrice - не должен быть меньше minPrice", () => {
        useSearchStore.setState({
            minPrice: 500,
            maxPrice: 1000,
        });

        useSearchStore.getState().setMaxPrice(200);

        expect(useSearchStore.getState().maxPrice).toBe(500);
    });

    it("setTransportType - устанавливает тип транспорта", () => {
        useSearchStore.getState().setTransportType("SUV");

        expect(useSearchStore.getState().selectedFilters.transportType).toBe("SUV");
    });

    it("setCountry - устанавливает страну", () => {
        useSearchStore.getState().setCountry("Germany");

        expect(useSearchStore.getState().selectedFilters.country).toBe("Germany");
    });

    it("setGearbox - устанавливает коробку передач", () => {
        useSearchStore.getState().setGearbox("Автомат");

        expect(useSearchStore.getState().selectedFilters.gearbox).toBe("Автомат");
    });

    it("toggleBrand - добавляет бренд", () => {
        useSearchStore.getState().toggleBrand("BMW", true);

        expect(useSearchStore.getState().selectedFilters.brands).toEqual(["BMW"]);
    });

    it("toggleBrand - удаляет бренд", () => {
        useSearchStore.setState({
            selectedFilters: {
                transportType: "",
                brands: ["BMW"],
                country: "",
                gearbox: "",
                adTypes: [],
            },
        });

        useSearchStore.getState().toggleBrand("BMW", false);

        expect(useSearchStore.getState().selectedFilters.brands).toEqual([]);
    });

    it("toggleAdType - добавляет и удаляет тип объявления", () => {
        useSearchStore.getState().toggleAdType("Продажа", true);
        expect(useSearchStore.getState().selectedFilters.adTypes).toEqual(["Продажа"]);

        useSearchStore.getState().toggleAdType("Продажа", false);
        expect(useSearchStore.getState().selectedFilters.adTypes).toEqual([]);
    });

    it("applyFilters - копирует selectedFilters в appliedFilters", () => {
        useSearchStore.getState().setTransportType("SUV");
        useSearchStore.getState().toggleBrand("BMW", true);

        useSearchStore.getState().applyFilters();

        expect(useSearchStore.getState().appliedFilters).toEqual({
            transportType: "SUV",
            brands: ["BMW"],
            country: "",
            gearbox: "",
            adTypes: [],
        });
    });

    it("resetFilters - сбрасывает фильтры и цену", () => {
        useSearchStore.setState({
            filters: {
                price: { min: 1000, max: 5000 },
                types: [],
                brands: [],
                countries: [],
                gearboxes: [],
                adTypes: [],
            },
            minPrice: 2000,
            maxPrice: 4000,
            selectedFilters: {
                transportType: "SUV",
                brands: ["BMW"],
                country: "Germany",
                gearbox: "Автомат",
                adTypes: ["Продажа"],
            },
            appliedFilters: {
                transportType: "SUV",
                brands: ["BMW"],
                country: "Germany",
                gearbox: "Автомат",
                adTypes: ["Продажа"],
            },
        });

        useSearchStore.getState().resetFilters();

        expect(useSearchStore.getState().selectedFilters).toEqual({
            transportType: "",
            brands: [],
            country: "",
            gearbox: "",
            adTypes: [],
        });

        expect(useSearchStore.getState().appliedFilters).toEqual({
            transportType: "",
            brands: [],
            country: "",
            gearbox: "",
            adTypes: [],
        });

        expect(useSearchStore.getState().minPrice).toBe(1000);
        expect(useSearchStore.getState().maxPrice).toBe(5000);
    });

    it("getFilteredVehicles - фильтрует по цене", () => {
        useSearchStore.setState({
            vehicles: [
                {
                    id: "1",
                    name: "BMW X5",
                    year: "2020",
                    weight: "2000",
                    mileage: "100000",
                    price: "1500",
                    location: "Bishkek",
                    image: "/test.jpg",
                    transportType: "SUV",
                    brand: "BMW",
                    gearbox: "Автомат",
                    adType: "Продажа",
                },
                {
                    id: "2",
                    name: "Audi A6",
                    year: "2019",
                    weight: "1800",
                    mileage: "90000",
                    price: "5000",
                    location: "Osh",
                    image: "/audi.jpg",
                    transportType: "Sedan",
                    brand: "Audi",
                    gearbox: "Механика",
                    adType: "Лизинг",
                },
            ],
            minPrice: 2000,
            maxPrice: 6000,
            appliedFilters: {
                transportType: "",
                brands: [],
                country: "",
                gearbox: "",
                adTypes: [],
            },
        });

        const filteredVehicles = useSearchStore.getState().getFilteredVehicles("");

        expect(filteredVehicles).toHaveLength(1);
        expect(filteredVehicles[0].name).toBe("Audi A6");
    });

    it("getFilteredVehicles - фильтрует по бренду", () => {
        useSearchStore.setState({
            vehicles: [
                {
                    id: "1",
                    name: "BMW X5",
                    year: "2020",
                    weight: "2000",
                    mileage: "100000",
                    price: "3000",
                    location: "Bishkek",
                    image: "/test.jpg",
                    transportType: "SUV",
                    brand: "BMW",
                    gearbox: "Автомат",
                    adType: "Продажа",
                },
                {
                    id: "2",
                    name: "Audi A6",
                    year: "2019",
                    weight: "1800",
                    mileage: "90000",
                    price: "3500",
                    location: "Osh",
                    image: "/audi.jpg",
                    transportType: "Sedan",
                    brand: "Audi",
                    gearbox: "Механика",
                    adType: "Лизинг",
                },
            ],
            minPrice: 0,
            maxPrice: 10000,
            appliedFilters: {
                transportType: "",
                brands: ["BMW"],
                country: "",
                gearbox: "",
                adTypes: [],
            },
        });

        const filteredVehicles = useSearchStore.getState().getFilteredVehicles("");

        expect(filteredVehicles).toHaveLength(1);
        expect(filteredVehicles[0].brand).toBe("BMW");
    });

    it("getFilteredVehicles - ищет по имени", () => {
        useSearchStore.setState({
            vehicles: [
                {
                    id: "1",
                    name: "BMW X5",
                    year: "2020",
                    weight: "2000",
                    mileage: "100000",
                    price: "3000",
                    location: "Bishkek",
                    image: "/test.jpg",
                    transportType: "SUV",
                    brand: "BMW",
                    gearbox: "Автомат",
                    adType: "Продажа",
                },
            ],
            minPrice: 0,
            maxPrice: 10000,
            appliedFilters: {
                transportType: "",
                brands: [],
                country: "",
                gearbox: "",
                adTypes: [],
            },
        });

        const filteredVehicles = useSearchStore.getState().getFilteredVehicles("bmw");

        expect(filteredVehicles).toHaveLength(1);
        expect(filteredVehicles[0].name).toBe("BMW X5");
    });
});