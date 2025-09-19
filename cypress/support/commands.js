Cypress.Commands.add("login", (username, password) => {
  if (username) cy.get("#user-name").type(username);
  if (password) cy.get("#password").type(password);

  cy.get("#login-button").click();
  // cy.get(".title").should("contain", "Products");
});

Cypress.Commands.add("logout", () => {
  // Open menu and logout
  cy.get("#react-burger-menu-btn").click();
  cy.get("#logout_sidebar_link").click();

  cy.get("#login-button").should("be.visible");
});
