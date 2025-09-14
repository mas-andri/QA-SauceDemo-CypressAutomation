/// <reference types="cypress" />

describe("Login page test", () => {
  const url = "https://www.saucedemo.com/";

  beforeEach(() => {
    cy.visit(url);
    cy.get("#user-name").type("standard_user");
    cy.get("#password").type("secret_sauce");
    cy.get("#login-button").click();
    cy.get(".title").should("contain", "Products");
  });

  it("Should display all products", () => {
    cy.get(".inventory_item").should("have.length.at.least", 6);
  });

  it("Should sort products by product name A-Z", () => {
    // get initial product name
    let productNames = [];

    cy.get(".inventory_item_name")
      .each(($el) => {
        cy.log("product name:", $el.text());
        productNames.push($el.text());
      })
      .then(() => {
        // sort intial product name A-Z
        const sortedProduct = [...productNames].sort();
        // filter by product name A-Z
        cy.get(".product_sort_container").select("az");
        // verify product name sorted from A - Z
        cy.get(".inventory_item_name").each(($el, index) => {
          expect($el.text()).to.equal(sortedProduct[index]);
        });
      });
  });

  it("Should sort products by product name Z-A", () => {
    // get initial product name
    let productNames = [];

    cy.get(".inventory_item_name")
      .each(($el) => {
        cy.log("product name:", $el.text());
        productNames.push($el.text());
      })
      .then(() => {
        // sort intial product name Z-A
        const sortedProduct = [...productNames].sort().reverse();
        cy.get(".product_sort_container").select("za");
        // verify product name sorted from Z - A
        cy.get(".inventory_item_name").each(($el, index) => {
          expect($el.text()).to.equal(sortedProduct[index]);
        });
      });
  });

  it("Should sort products by price low - high", () => {
    cy.get(".product_sort_container").select("lohi");
    cy.get(".inventory_item_price").then((prices) => {
      const priceValues = [...prices].map(($el) =>
        Number($el.innerText.replace("$", ""))
      );
      const sortedValues = [...priceValues].sort((a, b) => a - b);
      expect(priceValues).to.deep.equal(sortedValues);
    });
  });

  it("Should sort products by price high to low", () => {
    cy.get(".product_sort_container").select("hilo");
    cy.get(".inventory_item_price").then((prices) => {
      const priceValues = [...prices].map(($el) =>
        Number($el.innerText.replace("$", ""))
      );
      const sortedValues = [...priceValues].sort((a, b) => b - a);
      expect(priceValues).to.deep.equal(sortedValues);
    });
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
    if (addToCartButton) {
      cy.get("#add-to-cart-sauce-labs-backpack").click();
      cy.get(".shopping_cart_badge").should("contain", "1");
    } else {
      cy.get("#remove-sauce-labs-backpack").click();
      cy.get("#add-to-cart-sauce-labs-backpack").click();
      cy.get(".shopping_cart_badge").should("contain", "1");
    }
  });
});
