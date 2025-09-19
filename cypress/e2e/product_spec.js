/// <reference types="cypress" />
import ProductPage from "../support/pageObject/ProductPage";

describe("Product Page Test Scenarios", () => {
  const url = "https://www.saucedemo.com/";

  beforeEach(function () {
    cy.visit(url);
    cy.login("standard_user", "secret_sauce");
    cy.get(".title").should("contain", "Products");

    this.productPage = new ProductPage();
  });

  it("Should show all products", () => {
    cy.get(".inventory_item").should("have.length.at.least", 6);
  });

  it("Should sort products by product name A-Z", function () {
    this.productPage.sortByName("az");
  });

  it("Should sort products by product name Z-A", function () {
    this.productPage.sortByName("za");
  });

  it("Should sort products by price low - high", function () {
    this.productPage.sortByPrice("lohi");
  });

  it("Should sort products by price high to low", function () {
    this.productPage.sortByPrice("hilo");
  });

  it("Should allow user to view product details", () => {
    cy.get(
      '[data-test="item-0-title-link"] > [data-test="inventory-item-name"]'
    ).click();
    cy.url().should("include", "/inventory-item.html?id=0");
    cy.get(".inventory_details_desc_container")
      .should("be.visible")
      .and("contain", "Sauce Labs Bike Light");
    cy.get("#back-to-products").click();
    cy.url().should("include", "/inventory.html");
  });

  it("Should add a product to the cart", () => {
    const addToCartButton = cy.get("#add-to-cart-sauce-labs-backpack");
    if (!addToCartButton) {
      cy.get("#remove-sauce-labs-backpack").click();
    }
    cy.get("#add-to-cart-sauce-labs-backpack").click();
    cy.get(".shopping_cart_badge").should("contain", "1");
  });
});
