/// <reference types="cypress" />
import ProductPage from "../support/pageObject/ProductPage";

describe("Test Scenarios for the Cart Page", () => {
  const url = "https://www.saucedemo.com/";
  beforeEach(function () {
    cy.visit(url);
    cy.login("standard_user", "secret_sauce");

    this.btnIdSelector = ["#add-to-cart-sauce-labs-backpack"];
    this.productPage = new ProductPage();
  });

  it("Should display the product in the cart after adding it from the product page", function () {
    this.productPage.addProductToCart(this.btnIdSelector);

    cy.get(".cart_item").should("have.length", 1);
    cy.get(".inventory_item_name").should("contain", "Sauce Labs Backpack");
  });

  it("Should allow the user to remove a product from the cart", function () {
    this.productPage.addProductToCart(this.btnIdSelector);

    cy.get("#remove-sauce-labs-backpack").click();
    cy.get(".cart_item").should("not.exist");
  });

  it("Should allow multiple products in the cart", function () {
    this.btnIdSelector.push("#add-to-cart-sauce-labs-bike-light");
    this.productPage.addProductToCart(this.btnIdSelector);

    cy.get(".cart_item").should("have.length", 2);
  });

  it("Should return to product page when Continue Shopping is clicked", function () {
    this.productPage.addProductToCart(this.btnIdSelector);

    cy.get("#continue-shopping").click();
    cy.url().should("include", "/inventory.html");
  });
});
