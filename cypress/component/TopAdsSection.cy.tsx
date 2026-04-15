import { TopAdsSection } from "@/widgets/TopAdsSection/TopAdsSection";

describe("TopAdsSection", () => {
  it("должен отображать список объявлений после загрузки", () => {
    cy.intercept("GET", "http://localhost:5000/topAds", {
      statusCode: 200,
      body: [
        { id: 1, title: "Продам гараж", price: 1000, image: "img2", location: "Бишкек, Кыргызстан" },
        { id: 2, title: "Куплю слона", price: 5000, image: "img3", location: "Ош, Кыргызстан" },
        { id: 3, title: "Продам дом", price: 10000, image: "img4", location: "Нарын, Кыргызстан" },
        { id: 4, title: "Куплю машину", price: 5000, image: "img5", location: "Талас, Кыргызстан" },
        { id: 5, title: "Продам квартиру", price: 15000, image: "img6", location: "Баткен, Кыргызстан" },
        { id: 6, title: "Куплю книгу", price: 100, image: "img7", location: "Чуй, Кыргызстан" },
        { id: 7, title: "Продам одежду", price: 200, image: "img8", location: "Каракол, Кыргызстан" },
        { id: 8, title: "Куплю еду", price: 50, image: "img2", location: "Токмок, Кыргызстан" },
      ],
    }).as("getAds");

    cy.mount(<TopAdsSection />);
    cy.wait("@getAds");

    cy.get('[data-testid="title"]').should("have.length", 8);
    cy.get('[data-testid="price"]').should("have.length", 8);

    cy.contains("Продам гараж").should("exist");
    cy.contains("Продам дом").should("exist");
  });

  it("должен показывать лоадер во время загрузки", () => {
    cy.intercept("GET", "http://localhost:5000/topAds", {
      delay: 1000,
      statusCode: 200,
      body: [],
    }).as("getAdsDelayed");

    cy.mount(<TopAdsSection />);

    cy.contains("Загрузка...").should("exist");
    cy.wait("@getAdsDelayed");
  });

 
});