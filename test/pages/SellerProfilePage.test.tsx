import { describe, it, expect, beforeEach, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SellerProfilePage from "@/pages/Seller/profile";

const fetchVehiclesMock = vi.fn();
const removeVehicleMock = vi.fn();

const mockStoreState = {
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
    {
      id: "2",
      name: "Volvo FH",
      year: "2019",
      weight: "8000",
      mileage: "90000",
      price: "2300",
      location: "Berlin",
      image: "/test2.jpg",
    },
  ],
  loading: false,
  error: null as string | null,
  fetchVehicles: fetchVehiclesMock,
  removeVehicle: removeVehicleMock,
};

vi.mock("@/shared/store/pages/Profile", () => ({
  useProfileStore: () => mockStoreState,
}));

describe("SellerProfilePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockStoreState.vehicles = [
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
      {
        id: "2",
        name: "Volvo FH",
        year: "2019",
        weight: "8000",
        mileage: "90000",
        price: "2300",
        location: "Berlin",
        image: "/test2.jpg",
      },
    ];
    mockStoreState.loading = false;
    mockStoreState.error = null;
  });

  it("calls fetchVehicles on mount", () => {
    render(<SellerProfilePage />);
    expect(fetchVehiclesMock).toHaveBeenCalledTimes(1);
  });

  it('показывает ссылку "Добавить объявление"', async () => {
    render(<SellerProfilePage />);

    const addLink = await screen.findByRole("link", {
      name: /Добавить объявление/i,
    });

    expect(addLink).toBeInTheDocument();
    expect(addLink).toHaveAttribute("href", "/seller/new-item");
  });



  it("показывает цену в евро", async () => {
    render(<SellerProfilePage />);

    const priceElements = await screen.findAllByTestId("price");
    expect(priceElements[0].textContent).toContain("€");
  });





  it("вызывает removeVehicle при клике удалить", async () => {
    render(<SellerProfilePage />);
    const deleteButtons = await screen.findAllByTestId("deleteButton");
    fireEvent.click(deleteButtons[0]);
    expect(removeVehicleMock).toHaveBeenCalledWith("1");
  });

  it("фильтрует карточки по поиску", async () => {
    render(<SellerProfilePage />);

    const input = await screen.findByPlaceholderText("Поиск объявления...");
    fireEvent.change(input, { target: { value: "Volvo" } });

    expect(screen.getByText("Volvo FH")).toBeInTheDocument();
    expect(screen.queryByText("BMW X5")).not.toBeInTheDocument();
  });

  it("показывает состояние загрузки", () => {
    mockStoreState.loading = true;
    render(<SellerProfilePage />);
    expect(screen.getByText("Загрузка...")).toBeInTheDocument();
  });

  it("показывает состояние ошибки", () => {
    mockStoreState.error = "Не удалось загрузить данные";
    render(<SellerProfilePage />);
    expect(screen.getByText("Не удалось загрузить данные")).toBeInTheDocument();
  });
});
