import { describe, it, expect, beforeEach, vi } from "vitest";
import { useSearchStore } from "@/shared/store/widgets/SearchResult";

describe("useSearchStore", () => {
  beforeEach(() => {
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

    vi.restoreAllMocks();
  });

  it("успешно загружает данные через fetchAll", async () => {
    vi.stubGlobal("fetch", vi.fn((url) => {
      if (url === "http://localhost:5000/SearchResult") {
        return Promise.resolve({
          ok: true,
          json: async () => [
            {
              id: "1",
              name: "BMW X5",
              year: "2020",
              weight: "2000",
              mileage: "100000",
              price: "1500",
              location: "Bishkek",
              image: "/bmw.jpg",
              transportType: "SUV",
              brand: "BMW",
              gearbox: "Автомат",
              adType: "Продажа",
            },
          ],
        });
      }

      if (url === "http://localhost:5000/SearchResultFilters") {
        return Promise.resolve({
          ok: true,
          json: async () => ({
            price: { min: 1000, max: 5000 },
            types: ["SUV", "Sedan"],
            brands: ["BMW", "Audi"],
            countries: ["Bishkek", "Osh"],
            gearboxes: ["Автомат", "Механика"],
            adTypes: ["Продажа", "Аренда"],
          }),
        });
      }

      return Promise.reject(new Error("Unknown url"));
    }));

    await useSearchStore.getState().fetchAll();

    const state = useSearchStore.getState();

    expect(state.vehicles).toHaveLength(1);
    expect(state.filters).not.toBeNull();
    expect(state.minPrice).toBe(1000);
    expect(state.maxPrice).toBe(5000);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it("ставит ошибку если fetchAll упал", async () => {
    vi.stubGlobal("fetch", vi.fn(() =>
      Promise.resolve({
        ok: false,
        json: async () => ({}),
      })
    ));

    await useSearchStore.getState().fetchAll();

    const state = useSearchStore.getState();

    expect(state.error).toBe("Не удалось загрузить данные");
    expect(state.loading).toBe(false);
  });

  it("setMinPrice не дает поставить значение больше maxPrice", () => {
    useSearchStore.setState({ minPrice: 0, maxPrice: 5000 });

    useSearchStore.getState().setMinPrice(7000);

    expect(useSearchStore.getState().minPrice).toBe(5000);
  });

  it("setMaxPrice не дает поставить значение меньше minPrice", () => {
    useSearchStore.setState({ minPrice: 3000, maxPrice: 5000 });

    useSearchStore.getState().setMaxPrice(1000);

    expect(useSearchStore.getState().maxPrice).toBe(3000);
  });

  it("toggleBrand добавляет и удаляет бренд", () => {
    useSearchStore.getState().toggleBrand("BMW", true);
    expect(useSearchStore.getState().selectedFilters.brands).toContain("BMW");

    useSearchStore.getState().toggleBrand("BMW", false);
    expect(useSearchStore.getState().selectedFilters.brands).not.toContain("BMW");
  });

  it("toggleAdType добавляет и удаляет тип объявления", () => {
    useSearchStore.getState().toggleAdType("Продажа", true);
    expect(useSearchStore.getState().selectedFilters.adTypes).toContain("Продажа");

    useSearchStore.getState().toggleAdType("Продажа", false);
    expect(useSearchStore.getState().selectedFilters.adTypes).not.toContain("Продажа");
  });

  it("applyFilters копирует selectedFilters в appliedFilters", () => {
    useSearchStore.getState().setTransportType("SUV");
    useSearchStore.getState().setCountry("Bishkek");
    useSearchStore.getState().applyFilters();

    const state = useSearchStore.getState();

    expect(state.appliedFilters.transportType).toBe("SUV");
    expect(state.appliedFilters.country).toBe("Bishkek");
  });

  it("resetFilters сбрасывает фильтры и цену", () => {
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
      maxPrice: 3000,
      selectedFilters: {
        transportType: "SUV",
        brands: ["BMW"],
        country: "Bishkek",
        gearbox: "Автомат",
        adTypes: ["Продажа"],
      },
      appliedFilters: {
        transportType: "SUV",
        brands: ["BMW"],
        country: "Bishkek",
        gearbox: "Автомат",
        adTypes: ["Продажа"],
      },
    });

    useSearchStore.getState().resetFilters();

    const state = useSearchStore.getState();

    expect(state.minPrice).toBe(1000);
    expect(state.maxPrice).toBe(5000);
    expect(state.selectedFilters).toEqual({
      transportType: "",
      brands: [],
      country: "",
      gearbox: "",
      adTypes: [],
    });
    expect(state.appliedFilters).toEqual({
      transportType: "",
      brands: [],
      country: "",
      gearbox: "",
      adTypes: [],
    });
  });

  it("getFilteredVehicles фильтрует по поиску", () => {
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
          image: "/bmw.jpg",
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
          price: "2500",
          location: "Osh",
          image: "/audi.jpg",
          transportType: "Sedan",
          brand: "Audi",
          gearbox: "Механика",
          adType: "Аренда",
        },
      ],
      minPrice: 1000,
      maxPrice: 3000,
      appliedFilters: {
        transportType: "",
        brands: [],
        country: "",
        gearbox: "",
        adTypes: [],
      },
    });

    const result = useSearchStore.getState().getFilteredVehicles("bmw");

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("BMW X5");
  });

  it("getFilteredVehicles фильтрует по brand и transportType", () => {
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
          image: "/bmw.jpg",
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
          price: "2500",
          location: "Osh",
          image: "/audi.jpg",
          transportType: "Sedan",
          brand: "Audi",
          gearbox: "Механика",
          adType: "Аренда",
        },
      ],
      minPrice: 1000,
      maxPrice: 3000,
      appliedFilters: {
        transportType: "SUV",
        brands: ["BMW"],
        country: "",
        gearbox: "",
        adTypes: [],
      },
    });

    const result = useSearchStore.getState().getFilteredVehicles("");

    expect(result).toHaveLength(1);
    expect(result[0].brand).toBe("BMW");
  });
});