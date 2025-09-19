/// <reference types="cypress" />

describe("Logout Page Test Scenarios", () => {
  const url = "https://www.saucedemo.com/";

  beforeEach(() => {
    cy.visit(url);
    cy.login("standard_user", "secret_sauce");
    cy.get(".title").should("contain", "Products");
  });

  it("Should logout successfully", () => {
    cy.logout();

    // Verify redirect back to login page
    cy.url().should("eq", `${url}`);
  });

  it("Should verify that the session is cleared after logout", () => {
    cy.logout();

    // Try to access inventory directly after logout
    cy.visit(`${url}?/inventory.html`);
    cy.url().should("eq", `${url}`);
  });
});
