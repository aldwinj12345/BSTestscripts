// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


import "cypress-real-events";
import 'cypress-file-upload';

//user login
Cypress.Commands.add('userlogin', (unlocator, pwlocator, submitbuttonlocator, username, password) => {
    cy.get(unlocator).type(username)
    cy.get(pwlocator).type(password)
    cy.get(submitbuttonlocator).click()
      .wait(5000)
})

//alert-messages popup on top right
Cypress.Commands.add('GETAlertMessagepopup', (locator, message) => {
  cy.get(locator)
    .should('exist')
    .and('contain', message)
})