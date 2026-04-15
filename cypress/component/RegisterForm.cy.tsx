import { RegisterForm } from "@/features/auth/ui/RegisterForm";
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
        <RegisterForm />
      </SearchParamsContext.Provider>
    </AppRouterContext.Provider>,
  );
};

describe("RegisterForm Component", () => {
  it("рендерит форму", () => {
    mountWithNext("redirect=/profile");

    cy.get('input[name="name"]').should("exist");
    cy.get('input[name="surname"]').should("exist");
    cy.get('input[name="email"]').should("exist");
    cy.get('input[type="password"]').should("exist");
    cy.get('input[type="checkbox"]').should("exist");
    cy.get('button[type="submit"]').should("contain", "Продолжить");
    cy.get('a[href="/login?redirect=/profile"]').should("exist");
  });

  it("показывает ошибки при пустом submit", () => {
    mountWithNext();

    cy.get('button[type="submit"]').click();

    cy.get("p.text-red-500").should("have.length.greaterThan", 0);
  });

  it("показывает ошибку email при неверном формате", () => {
    mountWithNext();

    cy.get('input[name="name"]').type("Baiel");
    cy.get('input[name="surname"]').type("Raimkulov");
    cy.get('input[name="email"]').type("wrong-email");
    cy.get('input[type="password"]').type("12345678");
    cy.get('button[type="submit"]').click();

    cy.get("p.text-red-500").should("have.length.greaterThan", 0);
  });



  it("ссылка Войти содержит redirect", () => {
    mountWithNext("redirect=/profile");

    cy.get('a[href="/login?redirect=/profile"]')
      .should("exist")
      .and("contain", "Войти");
  });
});