import React from "react";
import { Filter } from "@/widgets/Filter";

describe("Filter Component", () => {
  it("показывает загрузку", () => {
    cy.intercept("GET", "http://localhost:5000/Filter", {
      delay: 1000,
      statusCode: 200,
      body: {
        totalResults: 0,
      },
    }).as("getFilter");

    cy.intercept("GET", "http://localhost:5000/FilterOptions", {
      delay: 1000,
      statusCode: 200,
      body: {
        categories: ["SUV"],
        allBrands: ["BMW"],
        models: { BMW: ["X5"] },
        countries: ["Germany"],
        years: ["2020"],
        prices: ["10000"],
        mileages: ["50000"],
        weights: ["2000"],
      },
    }).as("getOptions");

    cy.mount(<Filter />);

    cy.contains("Загрузка").should("exist");

    cy.wait("@getFilter");
    cy.wait("@getOptions");
  });

 

  it("показывает нет данных", () => {
    cy.intercept("GET", "http://localhost:5000/Filter", {
      statusCode: 200,
      body: {
        totalResults: 0,
      },
    }).as("getFilter");

    cy.intercept("GET", "http://localhost:5000/FilterOptions", {
      statusCode: 200,
      body: {},
    }).as("getOptionsEmpty");

    cy.mount(<Filter />);

    cy.wait("@getFilter");
    cy.wait("@getOptionsEmpty");

    cy.contains("Нет данных").should("exist");
  });

  it("рендерит форму фильтра", () => {
    cy.intercept("GET", "http://localhost:5000/Filter", {
      statusCode: 200,
      body: {
        totalResults: 12,
      },
    }).as("getFilter");

    cy.intercept("GET", "http://localhost:5000/FilterOptions", {
      statusCode: 200,
      body: {
        categories: ["SUV", "Truck"],
        allBrands: ["BMW", "Audi"],
        models: {
          BMW: ["X5", "X6"],
          Audi: ["Q7"],
        },
        countries: ["Germany", "France"],
        years: ["2020", "2021"],
        prices: ["10000", "20000"],
        mileages: ["50000", "100000"],
        weights: ["2000", "3000"],
      },
    }).as("getOptions");

    cy.mount(<Filter />);

    cy.wait("@getFilter");
    cy.wait("@getOptions");

    cy.get('[data-testid="filter-component"]').should("exist");
    cy.get('[data-testid="filter-inputs"]').should("exist");
    cy.get('[data-testid="filter-submit"]').should("exist");
    cy.contains("ПОИСК").should("exist");
  });


});