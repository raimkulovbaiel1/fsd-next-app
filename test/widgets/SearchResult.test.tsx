import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SearchResult } from "@/widgets/SearchResult/SearchResult";
//import userEvent from "@testing-library/user-event";

const fetchAllMock = vi.fn();
const setMinPriceMock = vi.fn();
const setMaxPriceMock = vi.fn();
const setTransportTypeMock = vi.fn();
const setCountryMock = vi.fn();
const setGearboxMock = vi.fn();
const toggleBrandMock = vi.fn();
const toggleAdTypeMock = vi.fn();
const applyFiltersMock = vi.fn();
const resetFiltersMock = vi.fn();

vi.mock("next/navigation", () => ({
    useSearchParams: () => ({
        get: (key: string) => {
            if (key === "search") return "bmw";
            return null;
        },
    }),
}));

vi.mock("next/link", () => ({
    default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

vi.mock("@/shared/store/widgets/SearchResult", () => ({
    useSearchStore: () => ({
        vehicles: [
            {
                id: 1,
                name: "BMW Truck",
                year: "2020",
                weight: "5000",
                mileage: "100000",
                price: "25000",
                location: "Germany",
                image: "img1",
            },
        ],
        filters: {
            price: { min: 0, max: 100000 },
            types: ["Грузовик"],
            brands: ["BMW", "Volvo"],
            countries: ["Germany", "Turkey"],
            gearboxes: ["Автомат", "Механика"],
            adTypes: ["Продажа", "Лизинг"],
        },
        loading: false,
        error: null,
        minPrice: 0,
        maxPrice: 100000,
        selectedFilters: {
            transportType: "",
            brands: [],
            country: "",
            gearbox: "",
            adTypes: [],
        },
        appliedFilters: {},
        fetchAll: fetchAllMock,
        setMinPrice: setMinPriceMock,
        setMaxPrice: setMaxPriceMock,
        setTransportType: setTransportTypeMock,
        setCountry: setCountryMock,
        setGearbox: setGearboxMock,
        toggleBrand: toggleBrandMock,
        toggleAdType: toggleAdTypeMock,
        applyFilters: applyFiltersMock,
        resetFilters: resetFiltersMock,
        getFilteredVehicles: vi.fn(() => [
            {
                id: 1,
                name: "BMW Truck",
                year: "2020",
                weight: "5000",
                mileage: "100000",
                price: "25000",
                location: "Germany",
                image: "img1",
            },
        ]),
    }),
}));

describe("SearchResult", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("рендерит SearchResult", () => {
        render(<SearchResult />);
        expect(screen.getByTestId("min-price-input")).toBeInTheDocument();
        expect(screen.getByTestId("max-price-input")).toBeInTheDocument();
        expect(screen.getByTestId("transport-type-select")).toBeInTheDocument();
        expect(screen.getByTestId("country-select")).toBeInTheDocument();
    });

    it("показывает правильные атрибуты min/max/value", () => {
        render(<SearchResult />);

        const input = screen.getByTestId("min-price-input");
        expect(input).toHaveAttribute("min", "0");
        expect(input).toHaveAttribute("max", "100000");
        expect(input).toHaveValue(0);
    });

    it("вызывает fetchAll при монтировании", () => {
        render(<SearchResult />);
        expect(fetchAllMock).toHaveBeenCalled();
    });

    it("рендерит карточку товара", () => {
        render(<SearchResult />);
        expect(screen.getByText("BMW Truck")).toBeInTheDocument();
    });

    it('при нажати на кнопку "Применить" вызывает applyFilters', () => {
        render(<SearchResult />);
        const applyButton = screen.getByTestId("apply-filters-button");
        applyButton.click();
        expect(applyFiltersMock).toHaveBeenCalled();
        expect(applyButton).toHaveTextContent("Применить");

    });

    it('при нажати на кнопку "Сбросить" вызывает resetFilters', () => {
        render(<SearchResult />);
        const resetButton = screen.getByTestId("reset-filters-button");
        resetButton.click();
        expect(resetFiltersMock).toHaveBeenCalled();
        expect(resetButton).toHaveTextContent("Сбросить");
    });
    it("рендерит select типа транспорта", () => {
        render(<SearchResult />);
        expect(screen.getByTestId("transport-type-select")).toBeInTheDocument();
    });

    it("показывает дефолтный option", () => {
        render(<SearchResult />);
        expect(screen.getByRole("option", { name: "Тип транспорта" })).toBeInTheDocument();
    });

  



});