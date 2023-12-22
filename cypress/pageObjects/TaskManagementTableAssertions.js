/// <reference types="cypress" />

class TaskManagementTable
{
    assertColumn1TemplateName(locator, nname)
    {
        cy.get(locator)
          .should('exist')
          .and('not.be.disabled')
          .then((cName)=>{
            expect(cName.text().trim()).to.equal(nname)
          })
    }
    assertColumn2PartnerType(locator, nname)
    {
        cy.get(locator)
          .should('exist')
          .then((cName)=>{
            expect(cName.text().trim()).to.equal(nname)
          })
    }
    assertColumn3ServiceType(locator, nname)
    {
        cy.get(locator)
          .should('exist')
          .then((cName)=>{
            expect(cName.text().trim()).to.equal(nname)
          })
    }
    assertColumn4LastUpdated(locator, date)
    {
        cy.get(locator)
          .should('exist')
          .and('contain', date)
    }
    assertColumn5UpdatedBy(locator, initial, nname)
    {
        cy.get(locator)
          .should('exist')
          .within(()=>{
            cy.get(' > span')  //approver's name
              .should('exist')
              .and('have.text', nname)
            cy.get(' > div >div > span')  //the initial logo
              .should('exist')
              .and('have.text', initial)
              .and('have.css', 'color', 'rgb(255, 255, 255)')         //text color
              .and('have.css', 'background-color', 'rgb(0, 47, 93)')  //background color
              .and('have.css', 'border-radius', '9999px')             //the curve edge that form the background color like a circle
          })
    }
    assertColumn6Action(locator, enabled_disabled, buttonName)
    {
        cy.get(locator)
          .should('exist')
          .and(enabled_disabled)
          .and('have.css', 'font-weight', '700')                  //font bold
          .and('have.css', 'color','rgb(148, 148, 148)')          //text color
          .and('have.css', 'border-color', 'rgb(148, 148, 148)')  //the line that forms a square of a button
          .and('have.css', 'border-radius', '8px')               //the curve edge of the button
          .then((cName)=>{
            expect(cName.text().trim()).to.equal(buttonName)
          })
    }
}
export default TaskManagementTable