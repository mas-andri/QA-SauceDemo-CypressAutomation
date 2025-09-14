/// <reference types="cypress" />

describe("Login page test", () => {
  const url = "https://www.saucedemo.com/";

  beforeEach(() => {
    cy.visit(url);
  });

  // Negative Test Cases
  it("Should show an error with empty username", () => {
    cy.get("#password").type("secret_sauce");
    cy.get("#login-button").click();
    cy.get("[data-test='error']").should("contain", "Username is required");
  });

  it("Should show an error with empty password", () => {
    cy.get("#user-name").type("standard_user");
    cy.get("#login-button").click();
    cy.get("[data-test='error']").should("contain", "Password is required");
  });

  it("Should show an error with invalid username or password", () => {
    cy.get("#user-name").type("invalid_user");
    cy.get("#password").type("invalid_sauce");
    cy.get("#login-button").click();
    cy.get("[data-test='error']").should(
      "contain",
      "Username and password do not match any user in this service"
    );
  });

  // Positive Test Case
  it("Should login successfully with valid credentials", () => {
    cy.get("#user-name").type("standard_user");
    cy.get("#password").type("secret_sauce");
    cy.get("#login-button").click();
    cy.get(".title").should("contain", "Products");
  });
});
