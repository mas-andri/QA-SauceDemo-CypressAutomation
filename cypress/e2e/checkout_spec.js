/// <reference types="cypress" />
import ProductPage from "../support/pageObject/ProductPage";
import CheckoutPage from "../support/pageObject/CheckoutPage";

describe("Test Scenarios for the Checkout Page", () => {
  const url = "https://www.saucedemo.com/";
  beforeEach(function () {
    cy.visit(url);
    cy.login("standard_user", "secret_sauce");

    // add product to card
    const productPage = new ProductPage();
    productPage.addProductToCart(["#add-to-cart-sauce-labs-backpack"]);

    // go to checkout page
    cy.get("#checkout").click();
    cy.url().should("include", "/checkout-step-one.html");

    this.checkoutPage = new CheckoutPage();
  });

  it("Should display an error when the first name is blank", function () {
    this.checkoutPage.checkoutForm(undefined, "Plankton", "123321");
    this.checkoutPage.formErrorMessage("First Name is required");
  });

  it("Should display an error when the last name is missing", function () {
    this.checkoutPage.checkoutForm("Sheldon", undefined, "123321");
    this.checkoutPage.formErrorMessage("Last Name is required");
  });

  it("Should display an error when the postal code is missing", function () {
    this.checkoutPage.checkoutForm("Sheldon", "Plankton");
    this.checkoutPage.formErrorMessage("Postal Code is required");
  });

  it("Should successfully complete the checkout process", function () {
    this.checkoutPage.checkoutForm("Sheldon", "Plankton", "123456");

    cy.url().should("include", "/checkout-step-two.html");
    cy.contains("Checkout: Overview");
    cy.get(".cart_item").should("have.length", 1);

    // finish order
    cy.get("#finish").click();
    cy.url().should("include", "/checkout-complete.html");
    cy.get(".complete-header").should("contain", "Thank you for your order!");
  });
});
