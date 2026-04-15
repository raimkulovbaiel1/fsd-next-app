import React from "react";
import { LoginForm } from "@/features/auth/ui/LoginForm";
import {
  AppRouterContext,
  type AppRouterInstance,
} from "next/dist/shared/lib/app-router-context.shared-runtime";
import { SearchParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";

const createMockRouter = (
  push = cy.stub().as("pushMock"),
): AppRouterInstance =>
  ({
    back: cy.stub(),
    forward: cy.stub(),
    refresh: cy.stub(),
    push,
    replace: cy.stub(),
    prefetch: cy.stub().resolves(),
  }) as unknown as AppRouterInstance;

const mountWithNext = (search = "", push = cy.stub().as("pushMock")) => {
  const router = createMockRouter(push);
  const searchParams = new URLSearchParams(search);

  cy.mount(
    <AppRouterContext.Provider value={router}>
      <SearchParamsContext.Provider value={searchParams}>
        <LoginForm />
      </SearchParamsContext.Provider>
    </AppRouterContext.Provider>,
  );
};

describe("LoginForm Component", () => {
  it("рендерит форму", () => {
    mountWithNext("redirect=/seller/register");

    cy.get('input[type="email"]').should("exist");
    cy.get('input[type="password"]').should("exist");
    cy.get('input[type="checkbox"]').should("exist");
    cy.get('button[type="submit"]').should("contain", "Продолжить");
    cy.get('a[href="/Register?redirect=/seller/register"]').should("exist");
  });



it("показывает ошибку для невалидного email", () => {
  mountWithNext();

  cy.get('input[type="email"]').type("invalid-email");
  cy.get('input[type="password"]').type("123456789");
  cy.get('button[type="submit"]').click();

  
});

  it("отправляет форму и делает redirect из search params", () => {
    const pushMock = cy.stub().as("pushMock");
    mountWithNext("redirect=/seller/register", pushMock);

    cy.get('input[type="email"]').type("test@gmail.com");
    cy.get('input[type="password"]').type("12345678");
    cy.get('input[type="checkbox"]').check();
    cy.get('button[type="submit"]').click();

    cy.get("@pushMock").should("have.been.calledWith", "/seller/register");
  });

  it("делает redirect на главную если redirect отсутствует", () => {
    const pushMock = cy.stub().as("pushMock");
    mountWithNext("", pushMock);

    cy.get('input[type="email"]').type("test@gmail.com");
    cy.get('input[type="password"]').type("12345678");
    cy.get('button[type="submit"]').click();

    cy.get("@pushMock").should("have.been.calledWith", "/");
  });

  it("ссылка регистрации содержит redirect", () => {
    mountWithNext("redirect=/profile");

    cy.get('a[href="/Register?redirect=/profile"]')
      .should("exist")
      .and("contain", "РЕГИСТРАЦИЯ");
  });
});