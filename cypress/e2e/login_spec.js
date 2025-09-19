/// <reference types="cypress" />

describe("Login page test", () => {
  const url = "https://www.saucedemo.com/";

  beforeEach(() => {
    cy.visit(url);
  });

  // Negative Test Cases
  it("Should show an error when logging in with an empty username", () => {
    cy.login(undefined, "secret_sauce").then(() =>
      cy.get("[data-test='error']").should("contain", "Username is required")
    );
  });

  it("Should show an error when logging in with an empty password", () => {
    cy.login("standard_user").then(() => {
      cy.get("[data-test='error']").should("contain", "Password is required");
    });
  });

  it("Should show an error when logging in with invalid username or password", () => {
    cy.login("invalid_user", "invalid_sauce").then(() => {
      cy.get("[data-test='error']").should(
        "contain",
        "Username and password do not match any user in this service"
      );
    });
  });

  // Positive Test Case
  it("Should log in successfully with valid credentials", () => {
    cy.login("standard_user", "secret_sauce").then(() => {
      cy.get(".title").should("contain", "Products");
    });
  });
});
