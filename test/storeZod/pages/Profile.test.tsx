import { describe, it, expect, beforeEach, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useProfileStore } from "@/shared/store/pages/Profile";

describe("useProfileStore", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();

    useProfileStore.setState({
      vehicles: [],
      loading: false,
      error: null,
    });
  });

  it("fetchVehicles - успешный запрос", async () => {
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
      },
    ];

    global.fetch = vi.fn(() =>
      Promise.resolve(
        new Response(JSON.stringify(mockVehicles), {
          headers: { "Content-Type": "application/json" },
          status: 200,
        })
      )
    ) as any;

    const { result } = renderHook(() => useProfileStore());

    await act(async () => {
      await result.current.fetchVehicles();
    });

    expect(result.current.vehicles).toEqual(mockVehicles);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("должен добавить новую машину в vehicles", () => {
    const newVehicle = {
      id: "1",
      name: "BMW X5",
      year: "2020",
      weight: "2000",
      mileage: "100000",
      price: "25000",
      location: "Bishkek",
      image: "/test.jpg",
    };

    useProfileStore.getState().addVehicle(newVehicle);

    const { vehicles } = useProfileStore.getState();

    expect(vehicles).toHaveLength(1);
    expect(vehicles[0]).toEqual(newVehicle);
  });

  it("должен удалить машину по id", () => {
    const newVehicle = {
      id: "1",
      name: "BMW X5",
      year: "2020",
      weight: "2000",
      mileage: "100000",
      price: "25000",
      location: "Bishkek",
      image: "/test.jpg",
    };

    useProfileStore.getState().addVehicle(newVehicle);
    expect(useProfileStore.getState().vehicles).toHaveLength(1);
    useProfileStore.getState().removeVehicle(newVehicle.id);
    const { vehicles } = useProfileStore.getState();
    expect(vehicles).toHaveLength(0);
  });

});