/// <reference types="cypress" />

describe("Checkout page test scenarios", () => {
  const url = "https://www.saucedemo.com/";
  beforeEach(() => {
    cy.visit(url);
    cy.get("#user-name").type("standard_user");
    cy.get("#password").type("secret_sauce");
    cy.get("#login-button").click();
    cy.get(".title").should("contain", "Products");

    // add product to card
    cy.get("#add-to-cart-sauce-labs-backpack").click();
    cy.get(".shopping_cart_link").click();

    // go to checkout page
    cy.get("#checkout").click();
    cy.url().should("include", "/checkout-step-one.html");
  });

  it("Should display error when first name is blank", () => {
    cy.get("#last-name").type("Plankton");
    cy.get("#postal-code").type("12345");
    cy.get("#continue").click();
    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("contain", "First Name is required");
  });

  it("Should display error when Last Name is missing", () => {
    cy.get("#first-name").type("Sheldon");
    cy.get("#postal-code").type("12345");
    cy.get("#continue").click();

    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("contain", "Error: Last Name is required");
  });

  it("Should display error when Postal Code is missing", () => {
    cy.get("#first-name").type("Sheldon");
    cy.get("#last-name").type("J Plankton");
    cy.get("#continue").click();

    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("contain", "Error: Postal Code is required");
  });

  it("Should complete the checkout process successfully", () => {
    cy.get("#first-name").type("Sheldon");
    cy.get("#last-name").type("J Plankton");
    cy.get("#postal-code").type("12345");
    cy.get("#continue").click();

    cy.url().should("include", "/checkout-step-two.html");
    cy.contains("Checkout: Overview");
    cy.get(".cart_item").should("have.length", 1);

    // finish order
    cy.get("#finish").click();
    cy.url().should("include", "/checkout-complete.html");
    cy.get(".complete-header").should("contain", "Thank you for your order!");
  });
});
