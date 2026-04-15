import React from "react";
import { SearchResult } from "@/widgets/SearchResult/SearchResult";
import {
  AppRouterContext,
  type AppRouterInstance,
} from "next/dist/shared/lib/app-router-context.shared-runtime";
import { SearchParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";

const createMockRouter = (): AppRouterInstance => ({
  back: cy.stub(),
  forward: cy.stub(),
  push: cy.stub(),
  refresh: cy.stub(),
  replace: cy.stub(),
  prefetch: cy.stub().resolves(),
});

const mountWithNext = (search = "") => {
  const router = createMockRouter();
  const searchParams = new URLSearchParams(search);

  cy.mount(
    <AppRouterContext.Provider value={router}>
      <SearchParamsContext.Provider value={searchParams}>
        <SearchResult />
      </SearchParamsContext.Provider>
    </AppRouterContext.Provider>,
  );
};

describe("SearchResult Component", () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:5000/SearchResult", {
      statusCode: 200,
      body: [
        {
          id: 1,
          name: "BMW X5",
          year: 2020,
          weight: 2100,
          mileage: 10000,
          price: 20000,
          location: "Germany",
          image: "img1",
          brand: "BMW",
          transportType: "SUV",
          country: "Germany",
          gearbox: "Автомат",
          adType: "Продажа",
        },
        {
          id: 2,
          name: "Audi Q7",
          year: 2021,
          weight: 2300,
          mileage: 15000,
          price: 25000,
          location: "Germany",
          image: "img2",
          brand: "Audi",
          transportType: "SUV",
          country: "Germany",
          gearbox: "Автомат",
          adType: "Лизинг",
        },
      ],
    }).as("getVehicles");

    cy.intercept("GET", "http://localhost:5000/SearchResultFilters", {
      statusCode: 200,
      body: {
        price: { min: 0, max: 50000 },
        brands: ["BMW", "Audi", "BMW"],
        types: ["SUV", "Truck"],
        countries: ["Germany", "France"],
        gearboxes: ["Автомат", "Механика"],
        adTypes: ["Продажа", "Лизинг"],
      },
    }).as("getFilters");
  });

  it("показывает загрузку и потом список карточек", () => {
    mountWithNext();

    cy.contains("Загрузка...").should("exist");

    cy.wait("@getVehicles");
    cy.wait("@getFilters");

    cy.contains("Результаты поиска: все товары").should("exist");
    cy.contains("BMW X5").should("exist");
    cy.contains("Audi Q7").should("exist");
  });

  it("открывает мобильный фильтр", () => {
    mountWithNext();

    cy.wait("@getVehicles");
    cy.wait("@getFilters");

    cy.get('[data-testid="open-filter-button"]').should("exist").click();
    cy.contains("Фильтры").should("exist");
  });

  it("меняет min и max price", () => {
    mountWithNext();

    cy.wait("@getVehicles");
    cy.wait("@getFilters");

    cy.get('[data-testid="min-price-input"]').clear().type("1000");
    cy.get('[data-testid="max-price-input"]').clear().type("30000");
  });

  it("выбирает тип транспорта и страну", () => {
    mountWithNext();

    cy.wait("@getVehicles");
    cy.wait("@getFilters");

    cy.get('[data-testid="transport-type-select"]').select("SUV");
    cy.get('[data-testid="country-select"]').select("Germany");
  });

  it("нажимает применить фильтры", () => {
    mountWithNext();

    cy.wait("@getVehicles");
    cy.wait("@getFilters");

    cy.get('[data-testid="transport-type-select"]').select("SUV");
    cy.get('[data-testid="apply-filters-button"]').click();

    cy.contains("BMW X5").should("exist");
  });

  it("сбрасывает фильтры", () => {
    mountWithNext();

    cy.wait("@getVehicles");
    cy.wait("@getFilters");

    cy.get('[data-testid="min-price-input"]').clear().type("5000");
    cy.get('[data-testid="reset-filters-button"]').click();

    cy.contains("BMW X5").should("exist");
    cy.contains("Audi Q7").should("exist");
  });

  it("показывает пустой результат поиска", () => {
    mountWithNext("search=Mercedes");

    cy.wait("@getVehicles");
    cy.wait("@getFilters");

    cy.contains("Ничего не найдено по запросу:").should("exist");
    cy.contains("mercedes").should("exist");
  });

  it("фильтрует по search query", () => {
    mountWithNext("search=bmw");

    cy.wait("@getVehicles");
    cy.wait("@getFilters");

    cy.contains("BMW X5").should("exist");
    cy.contains("Audi Q7").should("not.exist");
  });
});