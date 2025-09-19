class CheckoutPage {
  checkoutForm(firstName, lastName, postalCode) {
    if (firstName) cy.get("#first-name").type(firstName);
    if (lastName) cy.get("#last-name").type(lastName);
    if (postalCode) cy.get("#postal-code").type(postalCode);

    cy.get("#continue").click();
  }
  formErrorMessage(message) {
    cy.get('[data-test="error"]').should("be.visible").and("contain", message);
  }
}

export default CheckoutPage;
