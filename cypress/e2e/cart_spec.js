/// <reference types="cypress" />

describe("Cart page test scenarios", () => {
  const url = "https://www.saucedemo.com/";
  beforeEach(() => {
    cy.visit(url);
    cy.get("#user-name").type("standard_user");
    cy.get("#password").type("secret_sauce");
    cy.get("#login-button").click();
    cy.get(".title").should("contain", "Products");
  });

  it("Should display product in cart after adding from product page", () => {
    cy.get("#add-to-cart-sauce-labs-backpack").click();
    cy.get(".shopping_cart_link").click();
    cy.get(".cart_item").should("have.length", 1);
    cy.get(".inventory_item_name").should("contain", "Sauce Labs Backpack");
  });

  it("Should allow removing a product from the cart", () => {
    cy.get("#add-to-cart-sauce-labs-backpack").click();
    cy.get(".shopping_cart_link").click();

    cy.get("#remove-sauce-labs-backpack").click();
    cy.get(".cart_item").should("not.exist");
  });

  it("Should allow multiple products in cart", () => {
    cy.get("#add-to-cart-sauce-labs-backpack").click();
    cy.get("#add-to-cart-sauce-labs-bike-light").click();
    cy.get(".shopping_cart_link").click();

    cy.get(".cart_item").should("have.length", 2);
  });

  it("Should navigate back to product page from cart", () => {
    cy.get("#add-to-cart-sauce-labs-backpack").click();
    cy.get(".shopping_cart_link").click();

    cy.get("#continue-shopping").click();
    cy.url().should("include", "/inventory.html");
  });
});
