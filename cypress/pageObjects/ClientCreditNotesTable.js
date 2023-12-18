/// <reference types="cypress" />

class CreditNotesTable
{
    assertColumn1CreditNoteRequestName(locator, nname)
    {
        cy.get(locator)
          .should('exist')
          .then((cName)=>{
            expect(cName.text().trim()).to.equal(nname)
          })
    }
    assertColumn2Date(locator, date)
    {
        cy.get(locator)
          .should('exist')
          .and('contain', date)
    }
    assertColumn3Amount(locator, amount)
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
    assertColumn5Submittedby(locator, initial, nname)
    {
        cy.get(locator)
          .should('exist')
          .within(()=>{
            cy.get(' > span')  //submitter name
              .should('exist')
              .and('have.text', nname)
            cy.get(' > div > div > span')  //the initial logo of the submitter
              .should('exist')
              .and('have.text', initial)
              .and('have.css', 'color', 'rgb(255, 255, 255)')         //text color
              .and('have.css', 'background-color', 'rgb(0, 47, 93)')  //background color
              .and('have.css', 'border-radius', '9999px')             //the curve edge that form the background color like a circle
        })
    }
    assertColumn6UpdatedbyExpectedDASH(locator, nname)
    {
        cy.get(locator)
          .should('exist')
          .and('have.text', nname)
          .and('have.css', 'color', 'rgb(107, 114, 128)')  //text color
    }
    assertColumn6UpdatedbyExpectedName(locator, initial, nname)
    {
        cy.get(locator)
          .should('exist')
          .within(()=>{
            cy.get(' > span')  //approver's name
              .should('exist')
              .and('have.text', nname)
            cy.get(' > div > div > span')  //the initial logo
              .should('exist')
              .and('have.text', initial)
              .and('have.css', 'color', 'rgb(255, 255, 255)')         //text color
              .and('have.css', 'background-color', 'rgb(0, 47, 93)')  //background color
              .and('have.css', 'border-radius', '9999px')             //the curve edge that form the background color like a circle
        })
    }
    assertColumn7Action(locator, enabled_disabled, buttonName)
    {
        cy.get(locator)
          .should('exist')
          .and(enabled_disabled)
          .and('have.css', 'font-weight', '700')                  //font bold
          .and('have.css', 'color','rgb(148, 148, 148)')          //text color
          .and('have.css', 'border-color', 'rgb(148, 148, 148)')  //the line that forms a square of a button
          .and('have.css', 'border-radius', '12px')               //the curve edge of the button
          .then((cName)=>{
            expect(cName.text().trim()).to.equal(buttonName)
          })
    }
}
export default CreditNotesTable;