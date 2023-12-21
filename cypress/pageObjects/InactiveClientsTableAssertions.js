/// <reference types="cypress" />

class InactiveClientsTable
{
    assertColumn1ClientName(locator, clientname)
    {
        cy.get(locator)
          .should('exist')
          .and('not.be.disabled')
          .then((cName)=>{
            expect(cName.text().trim()).to.equal(clientname)
          })
    }
    assertColumn2Status(locator, status, textColor, bColor)
    {
        cy.get(locator)
          .should('exist')
          .and('have.text', status)
          .and('have.css', 'text-transform', 'capitalize')  //only the first letter is capitalize
          .and('have.css', 'color', textColor)   //text color
          .and('have.css', 'background-color', bColor)        // background color that form into capsule
          .and('have.css', 'border-radius', '40px')         // edge curve that form into capsule
    }
    assertColumn3ProjectManager(locator, initial, name)
    {
        cy.get(locator)
          .should('exist')
          .within(()=>{
            cy.get(' > span')  //account specialist name
              .should('exist')
              .and('have.text', name)
            cy.get(' > div > div > span')  //the initial logo
              .should('exist')
              .and('have.text', initial)
              .and('have.css', 'color', 'rgb(255, 255, 255)')         //text color
              .and('have.css', 'background-color', 'rgb(24, 121, 216)')  //background color
              .and('have.css', 'border-radius', '9999px')             //the curve edge that form the background color like a circle
          })
    }
    assertColumn4BrandStrategist(locator, initial, name)
    {
        cy.get(locator)
          .should('exist')
          .within(()=>{
            cy.get(' > span')  //account specialist name
              .should('exist')
              .and('have.text', name)
            cy.get(' > div > div > span')  //the initial logo
              .should('exist')
              .and('have.text', initial)
              .and('have.css', 'color', 'rgb(255, 255, 255)')         //text color
              .and('have.css', 'background-color', 'rgb(24, 121, 216)')  //background color
              .and('have.css', 'border-radius', '9999px')             //the curve edge that form the background color like a circle
          })
    }
    assertColumn5AccountSpecialist(locator, initial, name)
    {
        cy.get(locator)
          .should('exist')
          .within(()=>{
            cy.get(' > span')  //account specialist name
              .should('exist')
              .and('have.text', name)
            cy.get(' > div > div > span')  //the initial logo
              .should('exist')
              .and('have.text', initial)
              .and('have.css', 'color', 'rgb(255, 255, 255)')         //text color
              .and('have.css', 'background-color', 'rgb(24, 121, 216)')  //background color
              .and('have.css', 'border-radius', '9999px')             //the curve edge that form the background color like a circle
          })
    }
    assertColumn6ContractSigned(locator, date)
    {
        cy.get(locator)
          .should('exist')
          .and('contain', date)
    }
    assertColumn7TerminatedAt(locator, date)
    {
        cy.get(locator)
          .should('exist')
          .and('contain', date)
    }
    assertColumn8TerminationReason(locator, reason)
    {
        cy.get(locator)
          .should('exist')
          .then((cName)=>{
            expect(cName.text().trim()).to.equal(reason)
          })
    }
}
export default InactiveClientsTable