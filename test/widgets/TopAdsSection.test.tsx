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

vi.mock("@/shared/store/widgets/TopAdsSection", () => ({
    useAdStore: () => ({
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
        error: null,
        fetchVehicles: vi.fn(),
        removeVehicle: vi.fn(),
    }),
}));


describe("TopAdsSection", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("рендерит TopAdsSection", () => {
        render(<TopAdsSection />);
        const ad1 = screen.getByText("Ad 1");
        const ad2 = screen.getByText("Ad 2");
        const ad3 = screen.getByText("Ad 3");
        const ad4 = screen.getByText("Ad 4");
        const ad5 = screen.getByText("Ad 5");
        const ad6 = screen.getByText("Ad 6");
        const ad7 = screen.getByText("Ad 7");
        const ad8 = screen.getByText("Ad 8");

        expect(ad1).toBeInTheDocument();
        expect(ad2).toBeInTheDocument();
        expect(ad3).toBeInTheDocument();
        expect(ad4).toBeInTheDocument();
        expect(ad5).toBeInTheDocument();
        expect(ad6).toBeInTheDocument();
        expect(ad7).toBeInTheDocument();
        expect(ad8).toBeInTheDocument();
    });


    it("тест на price и title", async () => {
        render(<TopAdsSection />);

        const titles = await screen.findAllByTestId("title");
        const prices = await screen.findAllByTestId("price");

        expect(titles).toHaveLength(8);
        expect(prices).toHaveLength(8);

        expect(titles[0]).toHaveTextContent("Ad 1");
        expect(prices[0]).toHaveTextContent("1000€");
    });
});