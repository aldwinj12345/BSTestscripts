/// <reference types="cypress" />

class CreditNotesTableList
{
    assertColumn1CreditNoteRequestName(locator, nname)
    {
        cy.get(locator)
          .should('exist')
          .and('not.be.disabled')
          .then((cName)=>{
            expect(cName.text().trim()).to.equal(nname)
          })
    }
    assertColumn2ClientName(locator, clientname)
    {
        cy.get(locator)
          .should('exist')
          .and('not.be.disabled')
          .then((cName)=>{
            expect(cName.text().trim()).to.equal(clientname)
          })
    }
    assertColumn3Amount(locator, amount)
    {
        cy.get(locator)
          .should('exist')
          .then((el) => {
            expect(el.text().replace(/\s+/g, ' ').trim()).to.equal(amount)
          })
          .find(' > span')
          .should('exist')
          .and('have.text', '$')
          .and('have.css', 'color', 'rgb(190, 190, 190)')  //text color
    }
    assertColumn3CN(locator, cnnumber){
      {
        cy.get(locator)
          .should('exist')
          .and('contain', cnnumber)
    }
    }
    assertColumn4Status(locator, status, textColor, bColor)
    {
        cy.get(locator)
          .should('exist')
          .and('have.text', status)
          .and('have.css', 'text-transform', 'capitalize')  //only the first letter is capitalize
          .and('have.css', 'color', textColor)   //text color
          .and('have.css', 'background-color', bColor)        // background color that form into capsule
          .and('have.css', 'border-radius', '9999px')         // edge curve that form into capsule
          .then(($el) => {
            const computedStyle       = getComputedStyle($el[0]);
            const customPropertyValue = computedStyle.getPropertyValue('--tw-text-opacity').trim();
            expect(customPropertyValue).to.equal('1')
          })
    }
    assertColumn5Status(locator, status, textColor, bColor)
    {
        cy.get(locator)
          .should('exist')
          .and('have.text', status)
          .and('have.css', 'text-transform', 'capitalize')  //only the first letter is capitalize
          .and('have.css', 'color', textColor)   //text color
          .and('have.css', 'background-color', bColor)        // background color that form into capsule
          .and('have.css', 'border-radius', '9999px')         // edge curve that form into capsule
          .then(($el) => {
            const computedStyle       = getComputedStyle($el[0]);
            const customPropertyValue = computedStyle.getPropertyValue('--tw-text-opacity').trim();
            expect(customPropertyValue).to.equal('1')
          })
    }
    assertColumn5RequestDate(locator, date)
    {
        cy.get(locator)
          .should('exist')
          .and('contain', date)
    }
    assertColumn6Submittedby(locator, initial, name)
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
              .and('have.css', 'background-color', 'rgb(0, 47, 93)')  //background color
              .and('have.css', 'border-radius', '9999px')             //the curve edge that form the background color like a circle
              .and('have.css', 'width', '36px')
              .and('have.css', 'height', '36px')
          })
    }
    assertColumn7Submittedby(locator, initial, name)
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
              .and('have.css', 'background-color', 'rgb(0, 47, 93)')  //background color
              .and('have.css', 'border-radius', '9999px')             //the curve edge that form the background color like a circle
              .and('have.css', 'width', '36px')
              .and('have.css', 'height', '36px')
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
          .then((txt)=>{
            expect(txt.text().replace(/\s+/g, ' ').trim()).to.equal(buttonName)
          })
    }
    assertColumn7UpdatedbyExpectedName(locator, initial, nname)
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
    assertColumn8Action(locator, enabled_disabled, buttonName)
    {
        cy.get(locator)
          .should('exist')
          .and(enabled_disabled)
          .and('have.css', 'font-weight', '700')                  //font bold
          .and('have.css', 'color','rgb(148, 148, 148)')          //text color
          .and('have.css', 'border-color', 'rgb(148, 148, 148)')  //the line that forms a square of a button
          .and('have.css', 'border-radius', '12px')               //the curve edge of the button
          .then((txt)=>{
            expect(txt.text().replace(/\s+/g, ' ').trim()).to.equal(buttonName)
          })
    }
    assertColumn9Action(locator, enabled_disabled, buttonName)
    {
        cy.get(locator)
          .should('exist')
          .and(enabled_disabled)
          .and('have.css', 'font-weight', '700')                  //font bold
          .and('have.css', 'color','rgb(148, 148, 148)')          //text color
          .and('have.css', 'border-color', 'rgb(148, 148, 148)')  //the line that forms a square of a button
          .and('have.css', 'border-radius', '12px')               //the curve edge of the button
          .then((txt)=>{
            expect(txt.text().replace(/\s+/g, ' ').trim()).to.equal(buttonName)
          })
    }
}
export default CreditNotesTableList;