import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SellerProfilePage from "@/pages/Seller/profile";

describe("SellerProfilePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => [],
      })
    );
  });

  vi.mock("@/shared/store/pages/Profile", () => ({
    useProfileStore: () => ({
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
        },
      ],
      loading: false,
      error: null,
      fetchVehicles: vi.fn(),
      removeVehicle: vi.fn(),
    }),
  }));

  it("should render the seller profile section", async () => {
    render(<SellerProfilePage />);
    const sellerProfileSection = await screen.findByPlaceholderText(
      "Поиск объявления..."
    );
    expect(sellerProfileSection).toBeInTheDocument();
  });


  it('показывает ссылку "Добавить объявление"', async () => {
    render(<SellerProfilePage />);

    const addLink = await screen.findByRole("link", {
      name: /Добавить объявление/i,
    });

    expect(addLink).toBeInTheDocument();
    expect(addLink).toHaveAttribute("href", "/seller/new-item");
  });



  it("проверка price", async () => {
    render(<SellerProfilePage />);

    const priceElement = await screen.findByTestId("price");

    expect(priceElement).toBeInTheDocument();

    expect(priceElement.textContent).toContain("€");
  });


  it('проверяем link "Редактировать"', async () => {
    render(<SellerProfilePage />);
    const editLink = await screen.findByRole("link", {
      name: /Редактировать/i,
    });
    expect(editLink).toBeInTheDocument();

    expect(editLink).toHaveAttribute("href", "/seller/edit/1");
  });


  it('проверка кпопку удалить', async () => {
    render(<SellerProfilePage />);
    const delateButton = await screen.findByTestId("deleteButton");
    expect(delateButton).toBeInTheDocument();
  }); 
   
  it("проверка списка объявлений", async () => {
    render(<SellerProfilePage />);
    const vehicleList = await screen.findByTestId("vehicleList");
    expect(vehicleList).toBeInTheDocument();
  });

});
