import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TopAdsSection } from "@/widgets/TopAdsSection/TopAdsSection";

// mock next/navigation
vi.mock("next/navigation", () => ({
    useRouter: () => ({
        push: vi.fn(),
    }),
}));

const fetchVehiclesMock = vi.fn();
const mockAdStoreState = {
  ads: [
    { id: "1", title: "Ad 1", price: "1000€", image: "img2", location: "Germany, Berlin" },
    { id: "2", title: "Ad 2", price: "2000€", image: "img3", location: "France, Paris" },
    { id: "3", title: "Ad 3", price: "3000€", image: "img4", location: "Italy, Rome" },
    { id: "4", title: "Ad 4", price: "4000€", image: "img5", location: "Spain, Madrid" },
    { id: "5", title: "Ad 5", price: "5000€", image: "img6", location: "Turkey, Ankara" },
    { id: "6", title: "Ad 6", price: "6000€", image: "img7", location: "Netherlands, Amsterdam" },
    { id: "7", title: "Ad 7", price: "7000€", image: "img8", location: "Belgium, Brussels" },
    { id: "8", title: "Ad 8", price: "8000€", image: "img9", location: "Germany, Munich" },
  ],
  loading: false,
  error: null as string | null,
  fetchVehicles: fetchVehiclesMock,
};

vi.mock("@/shared/store/widgets/TopAdsSection", () => ({
  useAdStore: () => mockAdStoreState,
}));


describe("TopAdsSection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockAdStoreState.loading = false;
    mockAdStoreState.error = null;
  });

  it("вызывает fetchVehicles при монтировании", () => {
    render(<TopAdsSection />);
    expect(fetchVehiclesMock).toHaveBeenCalledTimes(1);
  });

  it("рендерит карточки объявлений", () => {
    render(<TopAdsSection />);
    expect(screen.getByText("Ad 1")).toBeInTheDocument();
    expect(screen.getByText("Ad 8")).toBeInTheDocument();
  });

  it("показывает loading состояние", () => {
    mockAdStoreState.loading = true;
    render(<TopAdsSection />);
    expect(screen.getByText("Загрузка...")).toBeInTheDocument();
  });

  it("показывает состояние ошибки", () => {
    mockAdStoreState.error = "Не удалось загрузить данные";
    render(<TopAdsSection />);
    expect(screen.getByText("Не удалось загрузить данные")).toBeInTheDocument();
  });

  it("рендерит title и price для всех карточек", async () => {
    render(<TopAdsSection />);
    const titles = await screen.findAllByTestId("title");
    const prices = await screen.findAllByTestId("price");
    expect(titles).toHaveLength(8);
    expect(prices).toHaveLength(8);
    expect(prices[0]).toHaveTextContent("1000€");
  });
});