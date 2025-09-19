class ProductPage {
  addProductToCart(listOfBtnID) {
    listOfBtnID.forEach(($el) => {
      cy.get($el).click();
    });
    cy.get(".shopping_cart_link").click();
  }
  sortByName(option = "az") {
    let productNames = [];

    cy.get(".inventory_item_name")
      .each(($el) => {
        cy.log("product name:", $el.text());
        productNames.push($el.text());
      })
      .then(() => {
        const sortedProduct =
          option === "az"
            ? [...productNames].sort()
            : [...productNames].sort().reverse();

        cy.get(".product_sort_container").select(option);

        cy.get(".inventory_item_name").each(($el, index) => {
          expect($el.text()).to.equal(sortedProduct[index]);
        });
      });
  }
  sortByPrice(option = "lohi") {
    cy.get(".product_sort_container").select(option);
    cy.get(".inventory_item_price").then(($prices) => {
      const price = [...$prices].map((el) =>
        Number(el.innerText.replace("$", ""))
      );
      const sortedPrice = [...price].sort((a, b) =>
        option === "lohi" ? a - b : b - a
      );
      expect(price).to.deep.equal(sortedPrice);
    });
  }
}

export default ProductPage;
