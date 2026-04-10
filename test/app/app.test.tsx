import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// мок react ДО импорта компонента
vi.mock("react", async () => {
    const actual = await vi.importActual<typeof import("react")>("react");

    return {
        ...actual,
        use: vi.fn(() => ({ id: "1" })),
    };
});

import Cart from "@/app/Cart/[id]/page";

const fetchVehicleByIdMock = vi.fn();
const fetchTopAdByIdMock = vi.fn();
const clearVehicleMock = vi.fn();

vi.mock("next/link", () => ({
    default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

vi.mock("@/shared/store/app/usecart", () => ({
    useVehicleStore: () => ({
        vehicle: {
            id: "1",
            name: "BMW X5",
            year: "2020",
            weight: "2000",
            mileage: "100000",
            price: "1500",
            location: "Bishkek",
            image: "/test.jpg",
            imagesURL: ["/test.jpg"],
            category: "SUV",
            brand: "BMW",
            model: "X5",
            country: "Kyrgyzstan",
            description: "Test description",
        },
        topAd: null,
        loading: false,
        error: null,
        fetchVehicleById: fetchVehicleByIdMock,
        fetchTopAdById: fetchTopAdByIdMock,
        clearVehicle: clearVehicleMock,
    }),
}));

describe("Cart page", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("calls fetch functions on mount", () => {
        render(<Cart params={Promise.resolve({ id: "1" })} />);
        expect(fetchVehicleByIdMock).toHaveBeenCalledWith("1");
        expect(fetchTopAdByIdMock).toHaveBeenCalledWith("1");
    });

    it("renders correct number of specs rows", () => {
        render(<Cart params={Promise.resolve({ id: "1" })} />);
        const table = screen.getByTestId("specs-table");
        const rows = table.children;
        expect(rows.length).toBe(7);
    });

    it("calls clearVehicle on unmount", () => {
        const { unmount } = render(<Cart params={Promise.resolve({ id: "1" })} />);
        unmount();
        expect(clearVehicleMock).toHaveBeenCalled();
    }); 

    it('renders contact seller button', () => {
        render(<Cart params={Promise.resolve({ id: "1" })} />);
        const button = screen.getByTestId('contact-seller-button');
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent("Написать продавцу");
    });
});