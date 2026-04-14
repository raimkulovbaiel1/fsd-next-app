import { describe, it, expect, beforeEach, vi } from "vitest";
import { useAdStore } from "@/shared/store/widgets/TopAdsSection";

describe("useAdStore", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();

    useAdStore.setState({
      ads: [],
      loading: false,
      error: null,
    });
  });

  it("fetches and sets ads correctly", async () => {
    const mockAds = [
      { id: "1", name: "Ad 1" },
      { id: "2", name: "Ad 2" },
    ];

    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => mockAds,
    });

    await useAdStore.getState().fetchVehicles();

    const state = useAdStore.getState();

    expect(global.fetch).toHaveBeenCalledWith("http://localhost:5000/topAds");
    expect(state.ads).toEqual(mockAds);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it("sets error when response is not ok", async () => {
    (global.fetch as any).mockResolvedValue({
      ok: false,
      json: async () => [],
    });

    await useAdStore.getState().fetchVehicles();

    const state = useAdStore.getState();

    expect(state.ads).toEqual([]);
    expect(state.loading).toBe(false);
    expect(state.error).toBe("Не удалось загрузить данные");
  });

  it("sets error when fetch throws", async () => {
    (global.fetch as any).mockRejectedValue(new Error("Network error"));

    await useAdStore.getState().fetchVehicles();

    const state = useAdStore.getState();

    expect(state.ads).toEqual([]);
    expect(state.loading).toBe(false);
    expect(state.error).toBe("Не удалось загрузить данные");
  });
});