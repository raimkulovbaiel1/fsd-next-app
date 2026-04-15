import React from "react";
import { Header } from "@/widgets/Header/Header";

describe("Header Component", () => {
  let pushMock: sinon.SinonStub;

  beforeEach(() => {
    pushMock = cy.stub();

    cy.stub(require("next/navigation"), "useRouter").returns({
      push: pushMock,
    });

    cy.stub(require("react-i18next"), "useTranslation").returns({
      t: (key: string) => key,
    });

    cy.mount(<Header />);
  });

  it("рендерит основные элементы", () => {
    cy.get('[data-testid="link-img"]').should("exist");
    cy.get('input[placeholder="Поиск..."]').should("exist");
    cy.get('[data-testid="currency-dropdown"]').should("exist");
    cy.get('[data-testid="profile-dropdown"]').should("exist");
  });

  it("выполняет поиск по Enter", () => {
    cy.get('input[placeholder="Поиск..."]').type("BMW{enter}");
    cy.wrap(pushMock).should("have.been.calledWith", "/searchResult?search=BMW");
  });

  it("не выполняет поиск при пустом вводе", () => {
    cy.get('input[placeholder="Поиск..."]').type("{enter}");
    cy.wrap(pushMock).should("not.have.been.called");
  });

  it("открывает валютный dropdown", () => {
    cy.get('[data-testid="currency-dropdown"]').click();
    cy.contains("USD").should("exist");
  });

  it("открывает языковое меню", () => {
    cy.contains("Русский").click();
    cy.contains("English").should("exist");
    cy.contains("Кыргызча").should("exist");
  });

  it("показывает профиль меню при hover", () => {
    cy.get('[data-testid="profile-dropdown"]').trigger("mouseover");
    cy.get('[data-testid="profile-menu"]').should("be.visible");
  });
});