/// <reference types="cypress" />

class InvoiceHistoryPageTable
{
    assertColumn1InvoiceNumber(locator, invoiceName)
    {
        cy.get(locator)
          .should('exist')
          .and('not.be.disabled')
          .and('contain', invoiceName)
    }
    assertColumn2Amount(locator, amount)
    {
        cy.get(locator)
          .should('exist')
          .then((value)=>{
            expect(value.text().replace(/\s+/g, ' ').trim()).to.equal(amount)
          })
          .find(' > span')
          .should('exist')
          .and('have.text', '$')
          .and('have.css', 'color', 'rgb(190, 190, 190)')  //text color
    }
    assertColumn3Balance(locator, amount)
    {
        cy.get(locator)
          .should('exist')
          .then((value)=>{
            expect(value.text().replace(/\s+/g, ' ').trim()).to.equal(amount)
          })
          .find(' > span')
          .should('exist')
          .and('have.text', '$')
          .and('have.css', 'color', 'rgb(190, 190, 190)')  //text color
    }
    assertColumn4Status(locator, sstatus, textColor, bColor)
    {
        cy.get(locator)
          .should('exist')
          .and('have.text', sstatus)
          .and('have.css', 'text-transform', 'capitalize')  //only the first letter is capitalize
          .and('have.css', 'color', textColor)   //text color
          .and('have.css', 'background-color', bColor)        // background color that form into capsule
          .and('have.css', 'border-radius', '9999px')         // edge curve that form into capsule
    }
    assertColumn5Date(locator, date)
    {
        cy.get(locator)
          .should('exist')
          .and('contain', date)
    }
    assertActionColumWith3Buttons(locator)
    {
        cy.get(locator)
          .should('exist')
          .find('button')
          .should('have.length', 3)
          .each($button => {
            cy.wrap($button)
              .should('exist')
              .and('not.be.disabled');
          })
    }
}
export default InvoiceHistoryPageTable