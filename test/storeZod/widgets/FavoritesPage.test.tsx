import { describe, it, expect, beforeEach, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useLeasingStore } from "@/shared/store/widgets/FavoritesPage";

describe("useLeasingStore", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();

    useLeasingStore.setState({
      items: [],
      filters: null,
      loading: false,
      isFilterOpen: false,
    });
  });

  it("fetchLeasing - успешный запрос", async () => {
    const mockItems = [
      {
        id: 1,
        title: "BMW X5",
        year: 2020,
        weight: "2000",
        mileage: "100000",
        price: "25000",
        location: "Bishkek",
        image: "/bmw.jpg",
      },
    ];

    global.fetch = vi.fn(() =>
      Promise.resolve(
        new Response(
          JSON.stringify([
            {
              Leasing: mockItems,
            },
          ]),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }
        )
      )
    ) as any;

    const { result } = renderHook(() => useLeasingStore());

    await act(async () => {
      await result.current.fetchLeasing();
    });

    expect(result.current.items).toEqual(mockItems);
    expect(result.current.loading).toBe(false);
  });

  it("fetchLeasing - ошибка запроса", async () => {
    global.fetch = vi.fn(() => Promise.reject(new Error("Ошибка сети"))) as any;

    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const { result } = renderHook(() => useLeasingStore());

    await act(async () => {
      await result.current.fetchLeasing();
    });

    expect(result.current.items).toEqual([]);
    expect(result.current.loading).toBe(false);

    consoleSpy.mockRestore();
  });

  it("fetchFilters - успешный запрос", async () => {
    const mockFilters = {
      price: { min: 1000, max: 50000 },
      transportTypes: ["SUV", "Truck"],
      manufacturers: ["BMW", "Audi"],
      adTypes: ["Лизинг", "Продажа"],
      countries: ["Germany", "Japan"],
    };

    global.fetch = vi.fn(() =>
      Promise.resolve(
        new Response(JSON.stringify(mockFilters), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        })
      )
    ) as any;

    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    const { result } = renderHook(() => useLeasingStore());

    await act(async () => {
      await result.current.fetchFilters();
    });

    expect(result.current.filters).toEqual(mockFilters);

    consoleSpy.mockRestore();
  });

  it("setFilterOpen - должен открывать и закрывать фильтр", () => {
    useLeasingStore.getState().setFilterOpen(true);
    expect(useLeasingStore.getState().isFilterOpen).toBe(true);

    useLeasingStore.getState().setFilterOpen(false);
    expect(useLeasingStore.getState().isFilterOpen).toBe(false);
  });
});