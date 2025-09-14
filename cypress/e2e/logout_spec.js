/// <reference types="cypress" />

describe("Checkout page test scenarios", () => {
  const url = "https://www.saucedemo.com/";

  beforeEach(() => {
    cy.visit(url);
    cy.get("#user-name").type("standard_user");
    cy.get("#password").type("secret_sauce");
    cy.get("#login-button").click();
    cy.get(".title").should("contain", "Products");
  });

  it("Should logout successfully", () => {
    // Open menu and logout
    cy.get("#react-burger-menu-btn").click();
    cy.get("#logout_sidebar_link").click();

    // Verify redirect back to login page
    cy.url().should("eq", `${url}`);
    cy.get("#login-button").should("be.visible");
  });

  it("Should verify session cleared after logout", () => {
    // Logout
    cy.get("#react-burger-menu-btn").click();
    cy.get("#logout_sidebar_link").click();

    // Try to access inventory directly after logout
    cy.visit(`${url}?/inventory.html`);
    cy.url().should("eq", `${url}`);
    cy.get("#login-button").should("be.visible");
  });
});
