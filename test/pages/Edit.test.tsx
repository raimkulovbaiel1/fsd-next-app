import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import EditPage from "@/pages/Seller/edit/ui/[id]";

// mock next/navigation
vi.mock("next/navigation", () => ({
    useParams: () => ({ id: "1" }),
    useRouter: () => ({
        push: vi.fn(),
    }),
}));

// mock zustand store
vi.mock("@/shared/store/pages/Profile", () => ({
    useProfileStore: () => ({
        vehicle: {
            id: "1",
            name: "BMW X5",
            year: "2020",
            weight: "2000",
            mileage: "100000",
            price: "1500",
            location: "Bishkek",
            image: "/test.jpg",
        },
        loading: false,
        error: null,
        fetchVehicleById: vi.fn(),
        updateVehicle: vi.fn(),
        removeVehicle: vi.fn(),
    }),
}));

describe("EditPage", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('проверка на наличие блока с data-testid="actions"', async () => {
        render(<EditPage />);

        const actionsBlock = await screen.findByTestId("actions");
        expect(actionsBlock).toBeInTheDocument();
    });


    it("рендерит preview картинки", async () => {
        render(<EditPage />);

        const images = await screen.findAllByTestId("preview-image");

        expect(images.length).toBe(3); //  [1,2,4]
    });

    it('показывает кнопку "Больше фото"', async () => {
        render(<EditPage />);

        const morePhotos = await screen.findByTestId("more-photos");

        expect(morePhotos).toBeInTheDocument();
        expect(morePhotos).toHaveTextContent("Больше фото");
    });
    it("рендерит контейнер превью", async () => {
        render(<EditPage />);
        const container = await screen.findByTestId("preview-container");
        expect(container).toBeInTheDocument();
    });

    it('проверяем наличие блока с данными', async () => {
        render(<EditPage />);
        const detailsBlock = await screen.findByTestId("details");
        expect(detailsBlock).toBeInTheDocument();
        const detalisItems = await screen.findAllByTestId("detail-item");
        expect(detalisItems.length).toBe(6);
    });

    it('проверка на наличие заголовка "Описание"', async () => {
        render(<EditPage />);
        const descriptionTitle = await screen.findByTestId("description-title");
        expect(descriptionTitle).toBeInTheDocument();
        expect(descriptionTitle).toHaveTextContent("Описание");
    });

});