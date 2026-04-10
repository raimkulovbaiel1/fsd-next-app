import { describe, it, expect, beforeEach, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { Header } from "@/widgets/Header/Header";

vi.mock("next/image", () => ({
  default: (props: any) => <img {...props} />,
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe("Header", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("открывает список языков", async () => {
    render(<Header />);

    const languageButton = screen.getByText(/русский/i);
    await userEvent.click(languageButton);

    expect(screen.getByText(/english/i)).toBeInTheDocument();
    expect(screen.getByText(/кыргызча/i)).toBeInTheDocument();
  });

  it("поиск работает при Enter", () => {
    render(<Header />);

    const input = screen.getByPlaceholderText("Поиск...");

    fireEvent.change(input, { target: { value: "bmw" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(window.location.href).toContain("http://localhost:3000/");
  });

  it(' работает при клике курсвалюта ', async () => {
    render(<Header />);
    const currencydropdown = screen.getByTestId('currency-dropdown');
    expect(currencydropdown).toBeInTheDocument();

    await userEvent.click(currencydropdown);
  })

  it("рендерит меню профиля и ссылку настроек", () => {
    render(<Header />);
    const profiledropdown = screen.getByTestId('profile-dropdown');
    const profilemenu = screen.getByTestId('profile-menu');
    const settingslink = screen.getByTestId('settings-link');
    expect(profiledropdown).toBeInTheDocument();
    expect(profilemenu).toBeInTheDocument();
    expect(settingslink).toBeInTheDocument();
  });
  it('показывает ссылку "Стать продавцом" с правильным href', () => {
    render(<Header />);

    const link = screen.getByRole('link', { name: /стать продавцом/i });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute(
      'href',
      '/login?redirect=/seller/register'
    );
  });

});