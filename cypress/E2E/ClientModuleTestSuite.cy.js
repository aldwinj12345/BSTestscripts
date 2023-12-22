/// <reference types="cypress" />

import UpsellTablelist from "../pageObjects/ClientUpsellTableAssertions.js"
import BillingUpsellTablelist from "../pageObjects/BillingUpsellsTableAssertions.js"
import AdditionalServicesTable from "../pageObjects/ClientPartnerPage_AdditionalServicesTable.js"
import ClientCreditNoteTable from "../pageObjects/ClientCreditNotesTable.js"
import BillingCreditNoteTable from "../pageObjects/BillingCreditNotesTableAssertions.js"
import ClientBillingInvoiceHistoryTable from "../pageObjects/ClientBillingInvoiceHistoryPageTable.js"
import ForTerminationTable from "../pageObjects/ForTerminationTable.js"
import InactiveClientsTableList from "../pageObjects/InactiveClientsTableAssertions.js"
import TaskManagementTable from "../pageObjects/TaskManagementTableAssertions.js"
import GetDate from "../pageObjects/callingDateVariations.js"


let testdata;
let loginmodule;
let alertmessagepopup;
let modulebutton;
let linktextfolder;
let clientmodulelocator;
let billingmodulelocator;
let clientpartnerpage;
let ratingdashboardlocators;
let complaintslocators;
let forterminationlocators;
let adminmodulelocator;


before('Connecting to Different Json Files at Fixture',()=>{

    //calling testData.json
    cy.fixture('testData').then((data)=>{
        testdata = data;
    })
    //calling LoginModuleLocators
    cy.fixture('LoginModuleLocators').then((data)=>{
        loginmodule = data;
    })
    //calling alertmessages
    cy.fixture('alertmessages').then((data)=>{
        alertmessagepopup = data;
    })
    //calling modulenavigationbuttons
    cy.fixture('modulenavigationbuttons').then((data)=>{
        modulebutton = data
    })
    //calling linktextfolders
    cy.fixture('linktextfolders').then((data)=>{
        linktextfolder = data
    })
    //calling clientmodulelocators
    cy.fixture('clientmodulelocators').then((data)=>{
        clientmodulelocator = data
    })
    //calling billingmodulelocators
    cy.fixture('billingmodulelocators').then((data)=>{
        billingmodulelocator = data
    })
    //calling ClientPartnerPage
    cy.fixture('ClientPartnerPage').then((data)=>{
      clientpartnerpage = data;
    })
    //calling ClientRatingDashboardLocators
    cy.fixture('ClientRatingDashboardLocators').then((data)=>{
      ratingdashboardlocators = data;
    })
    //calling ClientsComplaintsLocators
    cy.fixture('ClientsComplaintsLocators').then((data)=>{
      complaintslocators = data;
    })
    //calling ClientForTerminationLocators
    cy.fixture('ClientForTerminationLocators').then((data)=>{
      forterminationlocators = data;
    })
    //calling AdminModuleLocators
    cy.fixture('AdminModuleLocators').then((data)=>{
      adminmodulelocator = data;
    })
})


beforeEach('Launch BS Login Page',()=>{

    cy.visit(testdata.URL[0].testURL)
      .wait(3000)

    //change the window size of the browser
    cy.viewport(1600, 1100)

    //assert url - when launched sucessfully
    cy.url().should('contain','/sign-in')

})

describe('Login Module Test Suite',()=>{

    //calling ClientUpsellTableAssertions
    const UpsellTable = new UpsellTablelist();
    //calling callingDateVariations
    const DateTodayIs = new GetDate();
    //calling BillingUpsellsTableAssertions
    const BillingUpsells = new BillingUpsellTablelist();
    //calling ClientPartnerPage_AdditionalServicesTable
    const AdditionalServiceTableList = new AdditionalServicesTable();
    //calling ClientCreditNotesTable
    const ClientCreditNotesTableList = new ClientCreditNoteTable();
    //calling BillingCreditNotesTableAssertions
    const BillingCreditNotesTablelist = new BillingCreditNoteTable();
    //calling ClientBillingInvoiceHistoryPageTable
    const InvoiceHistoryPageTable = new ClientBillingInvoiceHistoryTable();
    //calling ForTerminationTable
    const TerminationTable = new ForTerminationTable();
    //calling InactiveClientsTableAssertions
    const InactiveClientsTable = new InactiveClientsTableList();
    //calling TaskManagementTableAssertions
    const TaskManagementTableList = new TaskManagementTable();

    it('Testcase ID: CP0001 - Verify when user click onto the client name, it will redirect to the client profile page', ()=>{

     

        //Login using account specialist
        cy.userlogin(loginmodule.EmailAddressInputfield, loginmodule.PasswordInputfield, loginmodule.SigninButton, testdata.userAccounts[0].accountspecialist1, testdata.userAccounts[0].accountspecialistandprojectmanagerpassword)

        //Click the Clients Navigation Module
        cy.get(modulebutton.ClientsModuleButton)
          .click()
          .wait(2000) 

        //I am going to use the same test client in my entire test suites
        //GET the href and client name
        cy.get('table > tbody > tr:first-child > td:nth-child(1) > a')
          .then(($element)=>{
            // Get the href attribute
            const clienthref = $element.attr('href');
            // Get the text content
            const clientName = $element.text();

            //Then click then client name link text
            cy.get('table > tbody > tr:first-child > td:nth-child(1) > a')
              .click()
              .wait(3000)

            //verify url expected destination
            cy.url().should('contain', clienthref)

            //verify the Client Name Title page
            cy.get(clientmodulelocator.ClientNameTitle)
              .should('exist')
              .and('have.text', clientName)
              .and('have.css', 'font-weight', '700') //font is bold
          })
        
    })
    it('Testcase ID: CP0002 - Verify user can upload profile pic to a particular client', ()=>{

        //Login using account specialist
        cy.userlogin(loginmodule.EmailAddressInputfield, loginmodule.PasswordInputfield, loginmodule.SigninButton, testdata.userAccounts[0].accountspecialist1, testdata.userAccounts[0].accountspecialistandprojectmanagerpassword)

        //Click the Clients Navigation Module
        cy.get(modulebutton.ClientsModuleButton)
          .click()
          .wait(2000) 

        //Then click then client name link text
        cy.get('table > tbody > tr:first-child > td:nth-child(1) > a')
          .click()
          .wait(3000)

        //verify Profile Photo Section
        cy.get(clientmodulelocator.ClientDashboardTabPage[0].ProfileTabpage[0].PhotoProfileSection)
          .should('exist')
          .within(()=>{
            //upload
            cy.get('input')
              .should('exist')
              .attachFile('azoginsuit.jpg')
              .wait(3000)
          })

        //verify alert-success message popup 
        cy.GETAlertMessagepopup(alertmessagepopup.TopMessage, 'Profile picture uploaded')
        cy.GETAlertMessagepopup(alertmessagepopup.SubMessage, 'Profile logo successfully fetched.')
        //then i am going to close the alert popup
        cy.get(alertmessagepopup.notificationmessagedeleteicon)
          .click()

        //Then I am going to verify that as expected the uploaded image is there which has now included within an img src or image source
        cy.get(clientmodulelocator.ClientDashboardTabPage[0].ProfileTabpage[0].PhotoProfileSection)
          .find('img')
          .should('exist')
          .invoke('attr', 'src')
          .then((src)=>{
            expect(src).to.include('azoginsuit.jpg')
          }) 
    })
    it('Testcase ID: CP0003 - Verify user can Edit profile Client Name in the list and in the Client name head title page', ()=>{

        let GETClientName;
        let clientName;
        let GETUpdatedClientName;
        let updatedClientName;
        
         //Login using account specialist
         cy.userlogin(loginmodule.EmailAddressInputfield, loginmodule.PasswordInputfield, loginmodule.SigninButton, testdata.userAccounts[0].accountspecialist1, testdata.userAccounts[0].accountspecialistandprojectmanagerpassword)

         //Click the Clients Navigation Module
         cy.get(modulebutton.ClientsModuleButton)
           .click()
           .wait(2000) 
 
         //Then click then client name link text
         cy.get('table > tbody > tr:first-child > td:nth-child(1) > a')
           .click()
           .wait(3000)

        //GET the current client name that shows as the title
        GETClientName = new Promise((resolve)=>{
            cy.get(clientmodulelocator.ClientNameTitle)
              .then((name)=>{
                clientName = name.text().trim();
              })
        })

        //At Client Dashboard > Profile Tab page - there is kebab menu button
        //verify the kebab menu
        cy.get(clientmodulelocator.ClientDashboardTabPage[0].ProfileTabpage[0].KebabMenuButton)
          .should('exist')
          .and('not.be.disabled')
          .click()
          .wait(1000)

        //assert the div that resides the 3 sub menus that suddenly emerge after you click the kebab menu
        cy.get('div.text-left > div > div')
          .should('exist')
          .within(()=>{
            //assert each sub menu - Edit Profile
            cy.get(' > a')
              .should('exist')
              .and('not.be.disabled')
              .and('have.text', 'Edit Profile')
            //assert Update Password
            cy.get(' > button:nth-child(2)')
              .should('exist')
              .and('not.be.disabled')
              .and('have.text', 'Update Password')
            //assert Default Contact
            cy.get(' > button:nth-child(3)')
              .should('exist')
              .and('not.be.disabled')
              .and('have.text', 'Update Default Contact')
          })

        //Click the Edit Profile
        cy.get('div.text-left > div > div > a')
          .realHover()
          .click()
          .wait(2000)

        //verify URL expected destination
        cy.url().should('contain', '/dashboard/edit')

        //verify there is Client Label and input field
        cy.get(clientmodulelocator.ClientDashboardTabPage[0].ProfileTabpage[1].EditProfileSubPage[0].ClientLabelandInputfield)
          .should('exist')
          .within(()=>{
            //assert Client* Label
            cy.get('> label')
              .should('exist')
              .and('have.text', 'Client *')
              .find('sup').should('have.css', 'color', 'rgb(237, 46, 46)') //asterisk text color
            //assert Input field
            GETClientName.then(()=>{
                cy.get('> input[name="client"]')
                  .should('exist')
                  .and('not.be.disabled')
                  .and('have.value', clientName)
            })
          })

        //Now I am going to Edit the Client Name
        cy.get(clientmodulelocator.ClientDashboardTabPage[0].ProfileTabpage[1].EditProfileSubPage[0].ClientLabelandInputfield)
          .find('> input[name="client"]')
          .invoke('val')
          .then((name)=>{
            if(name === '(AAABBB) TEST A'){
                //Then I am going to enter a different client name
                cy.get(clientmodulelocator.ClientDashboardTabPage[0].ProfileTabpage[1].EditProfileSubPage[0].ClientLabelandInputfield)
                  .find('> input[name="client"]')
                  .clear()
                  .type('(AAABAA) TEST B')
                  .wait(600)
                  .should('have.value', '(AAABAA) TEST B')
            }else{
                //Then I am going to enter a different client name
                cy.get(clientmodulelocator.ClientDashboardTabPage[0].ProfileTabpage[1].EditProfileSubPage[0].ClientLabelandInputfield)
                  .find('> input[name="client"]')
                  .clear()
                  .type('(AAABBB) TEST A')
                  .wait(600)
                  .should('have.value', '(AAABBB) TEST A')
                //Then GET the updated name and store it
                cy.get(clientmodulelocator.ClientDashboardTabPage[0].ProfileTabpage[1].EditProfileSubPage[0].ClientLabelandInputfield)
                  .find('> input[name="client"]')
                  .invoke('val')
                  .then((name)=>{
                    GETUpdatedClientName = new Promise((resolve)=>{
                        updatedClientName = name;
                        resolve();
                    })
                  })
            }
          })

        //Click the Update button
        cy.get(clientmodulelocator.ClientDashboardTabPage[0].ProfileTabpage[1].EditProfileSubPage[0].UpdateButton)
          .scrollIntoView()
          .should('exist')
          .and('not.be.disabled')
          .and('have.text', 'Update')
          .and('have.css', 'font-weight', '700') // font bold
          .and('have.css', 'color', 'rgb(255, 255, 255)')
          .and('have.css', 'background-color', 'rgb(185, 28, 28)')  //background color that form like a capsule
          .and('have.css', 'border-radius', '16px')   //the curve edge of the background color
          .click()
          .wait(3000)

        //verify alert-success message popup
        cy.GETAlertMessagepopup(alertmessagepopup.TopMessage, 'Update Success')
        cy.GETAlertMessagepopup(alertmessagepopup.SubMessage, 'Agency Client details were successfully updated')
        //then i am going to close the alert popup
        cy.get(alertmessagepopup.notificationmessagedeleteicon)
          .click()

        //verify the Client Name Title should changed
        cy.get(clientmodulelocator.ClientNameTitle)
          .then((name)=>{
            GETUpdatedClientName.then(()=>{
                expect(name.text().trim()).to.equal(updatedClientName)
            })
        })
    })
    it('Testcase ID: CP0004 - Verify user when attempting to update client password without entering new password', ()=>{


      //Login using account specialist
      cy.userlogin(loginmodule.EmailAddressInputfield, loginmodule.PasswordInputfield, loginmodule.SigninButton, testdata.userAccounts[0].accountspecialist1, testdata.userAccounts[0].accountspecialistandprojectmanagerpassword)

      //Click the Clients Navigation Module
      cy.get(modulebutton.ClientsModuleButton)
        .click()
        .wait(2000) 

      //Then click then client name link text
      cy.get('table > tbody > tr:first-child > td:nth-child(1) > a')
        .click()
        .wait(3000)

      //At Client Dashboard > Profile Tab page - there is kebab menu button
      //verify the kebab menu
      cy.get(clientmodulelocator.ClientDashboardTabPage[0].ProfileTabpage[0].KebabMenuButton)
        .should('exist')
        .and('not.be.disabled')
        .click()
        .wait(1000)

      //Click Update Password sub menu
      cy.get('div.text-left > div > div > button:nth-child(2)')
        .click()
        .wait(2000)

      //verify Update Default Contact Password modal popup
      cy.get(clientmodulelocator.ClientDashboardTabPage[0].ProfileTabpage[1].UpdateDefaultContactPasswordModal[0].modal)
        .should('exist')

      ///////// UPDATE DEFAULT CONTACT PASSWORD MODAL ASSERTION ELEMENTS STARTS HERE //////////
      //verify modal title - Update Default Contact Password
      cy.get(clientmodulelocator.ClientDashboardTabPage[0].ProfileTabpage[1].UpdateDefaultContactPasswordModal[0].modaltitle)
        .should('exist')
        .should("have.css", "font-weight", "700")  // font bold
        .and('have.text', 'Update Default Contact Password')

      //verify "*New* Password input field and label"
      cy.get(clientmodulelocator.ClientDashboardTabPage[0].ProfileTabpage[1].UpdateDefaultContactPasswordModal[0].NewPasswordLabelandInputfield)
        .should('exist')
        .within(()=>{
          //assert New Password Label
          cy.get('label')
            .should('exist')
            .and('have.text', '*New* Password')
            .and('have.css', 'color', 'rgb(107, 114, 128)') //text color
          //assert input field
          cy.get('input[name="newPassword"]')
            .should('exist')
            .and('not.be.disabled')
            .and('have.value', '') //empty by default
            .and('have.attr', 'placeholder', 'Enter minimum of 8 characters')
        })

      //verify Confirm new password label and input field
      cy.get(clientmodulelocator.ClientDashboardTabPage[0].ProfileTabpage[1].UpdateDefaultContactPasswordModal[0].ConfirmNewPasswordLabelandInputfield)
        .should('exist')
        .within(()=>{
          //assert label
          cy.get('label')
            .should('exist')
            .and('have.text', 'Confirm *New* Password')
            .and('have.css', 'color', 'rgb(107, 114, 128)') //text color
          //assert input field
          cy.get('input[name="confirmPassword"]')
            .should('exist')
            .and('not.be.disabled')
            .and('have.value', '') //empty by default
            .and('have.attr', 'placeholder', 're-type new password')
        })
      
      //verify cancel button
      cy.get(clientmodulelocator.ClientDashboardTabPage[0].ProfileTabpage[1].UpdateDefaultContactPasswordModal[0].CancelButton)
        .should('exist')
        .and('not.be.disabled')
        .and("have.css", "color", "rgb(239, 68, 68)")  //text color red
        .and("have.css", "font-weight", "700")         // font bold
        .and('have.text', 'Cancel')

      //verify Reset button
      cy.get(clientmodulelocator.ClientDashboardTabPage[0].ProfileTabpage[1].UpdateDefaultContactPasswordModal[0].ResetButton)
        .should('exist')
        .and('not.be.disabled')
        .and("have.css", "font-weight", "700")                    // verify if it is in bold font
        .and("have.css", "color", "rgb(255, 255, 255)")           //text color 
        .and('have.css', 'background-color', 'rgb(185, 28, 28)')  //button color is red
        .and('have.css', 'border-radius', '16px')                 //button edge curve
        .and('have.text', 'Reset')
        
      //Without Enter new data password, just click the Reset button
      cy.get(clientmodulelocator.ClientDashboardTabPage[0].ProfileTabpage[1].UpdateDefaultContactPasswordModal[0].ResetButton)
        .click()
        .wait(3000)

      //verify that the modal remains open
      cy.get(clientmodulelocator.ClientDashboardTabPage[0].ProfileTabpage[1].UpdateDefaultContactPasswordModal[0].modal)
        .should('exist')

      //verify Error Text - Required - under the new Password
      cy.get('form > div > div:nth-child(1) > div')
        .should('exist')
        .and('have.text', 'Required')
        .and('have.css', 'color', 'rgb(185, 28, 28)') //text color
      
      //verify Error Text - Required - under the Confirm Unew Password
      cy.get('form > div > div:nth-child(2) > div')
        .should('exist')
        .and('have.text', 'Required')
        .and('have.css', 'color', 'rgb(185, 28, 28)') //text color

      ///////// UPDATE DEFAULT CONTACT PASSWORD MODAL ASSERTION ELEMENTS ENDS HERE //////////

    })
    it('Testcase ID: CP0005 - Verify user when attempting to update client password and the new password is less than the minimum required characters.', ()=>{


       //Login using account specialist
       cy.userlogin(loginmodule.EmailAddressInputfield, loginmodule.PasswordInputfield, loginmodule.SigninButton, testdata.userAccounts[0].accountspecialist1, testdata.userAccounts[0].accountspecialistandprojectmanagerpassword)

       //Click the Clients Navigation Module
       cy.get(modulebutton.ClientsModuleButton)
         .click()
         .wait(2000) 
 
       //Then click then client name link text
       cy.get('table > tbody > tr:first-child > td:nth-child(1) > a')
         .click()
         .wait(3000)
 
       //At Client Dashboard > Profile Tab page - there is kebab menu button
       //verify the kebab menu
       cy.get(clientmodulelocator.ClientDashboardTabPage[0].ProfileTabpage[0].KebabMenuButton)
         .should('exist')
         .and('not.be.disabled')
         .click()
         .wait(1000)
 
       //Click Update Password sub menu
       cy.get('div.text-left > div > div > button:nth-child(2)')
         .click()
         .wait(2000)
 
       //verify Update Default Contact Password modal popup
       cy.get(clientmodulelocator.ClientDashboardTabPage[0].ProfileTabpage[1].UpdateDefaultContactPasswordModal[0].modal)
         .should('exist')

      //Enter New password data but less than the minimum required characters
      cy.get(clientmodulelocator.ClientDashboardTabPage[0].ProfileTabpage[1].UpdateDefaultContactPasswordModal[0].NewPasswordLabelandInputfield)
        .should('exist')
        .find('input[name="newPassword"]')
        .clear()
        .type('a#cd3fg')
        .wait(600)
        .should('have.value', 'a#cd3fg')
      
      //click the Reset button
      cy.get(clientmodulelocator.ClientDashboardTabPage[0].ProfileTabpage[1].UpdateDefaultContactPasswordModal[0].ResetButton)
        .click()
        .wait(3000)

      //verify that the modal remains open
      cy.get(clientmodulelocator.ClientDashboardTabPage[0].ProfileTabpage[1].UpdateDefaultContactPasswordModal[0].modal)
        .should('exist')


      //verify Error Text - Required - under the new Password
      cy.get('form > div > div:nth-child(1) > div')
        .should('exist')
        .and('have.text', 'Password must be at least 8 characters')
        .and('have.css', 'color', 'rgb(185, 28, 28)') //text color
    })
    it('Testcase ID: CP0006 - Verify user when attempting to update client password but the new password and the confirm new password does not match', ()=>{


      //Login using account specialist
      cy.userlogin(loginmodule.EmailAddressInputfield, loginmodule.PasswordInputfield, loginmodule.SigninButton, testdata.userAccounts[0].accountspecialist1, testdata.userAccounts[0].accountspecialistandprojectmanagerpassword)

      //Click the Clients Navigation Module
      cy.get(modulebutton.ClientsModuleButton)
        .click()
        .wait(2000) 

      //Then click then client name link text
      cy.get('table > tbody > tr:first-child > td:nth-child(1) > a')
        .click()
        .wait(3000)

      //At Client Dashboard > Profile Tab page - there is kebab menu button
      //verify the kebab menu
      cy.get(clientmodulelocator.ClientDashboardTabPage[0].ProfileTabpage[0].KebabMenuButton)
        .should('exist')
        .and('not.be.disabled')
        .click()
        .wait(1000)

      //Click Update Password sub menu
      cy.get('div.text-left > div > div > button:nth-child(2)')
        .click()
        .wait(2000)

      //verify Update Default Contact Password modal popup
      cy.get(clientmodulelocator.ClientDashboardTabPage[0].ProfileTabpage[1].UpdateDefaultContactPasswordModal[0].modal)
        .should('exist')

      //Enter New password data
      cy.get(clientmodulelocator.ClientDashboardTabPage[0].ProfileTabpage[1].UpdateDefaultContactPasswordModal[0].NewPasswordLabelandInputfield)
        .should('exist')
        .find('input[name="newPassword"]')
        .clear()
        .type('a#cd3fgh')
        .wait(600)
        .should('have.value', 'a#cd3fgh')

      //Enter Password but does not match in the new password you'd entered  
      cy.get(clientmodulelocator.ClientDashboardTabPage[0].ProfileTabpage[1].UpdateDefaultContactPasswordModal[0].ConfirmNewPasswordLabelandInputfield)
        .should('exist')
        .find('input[name="confirmPassword"]')
        .clear()
        .type('a#cd3fghi')
        .wait(600)
        .should('have.value', 'a#cd3fghi')

      //click the Reset button
      cy.get(clientmodulelocator.ClientDashboardTabPage[0].ProfileTabpage[1].UpdateDefaultContactPasswordModal[0].ResetButton)
        .click()
        .wait(3000)

      //verify that the modal remains open
      cy.get(clientmodulelocator.ClientDashboardTabPage[0].ProfileTabpage[1].UpdateDefaultContactPasswordModal[0].modal)
        .should('exist')

      //verify Error Text - Required - under the new Password
      cy.get('form > div > div:nth-child(2) > div')
        .should('exist')
        .and('have.text', 'Passwords do not match')
        .and('have.css', 'color', 'rgb(185, 28, 28)') //text color  
    })
    it('Testcase ID: CP0007 - Verify user can update the client new password', ()=>{

      let GETClientEmailAddress;
      let ClientEmailAddress;

      //Login using account specialist
      cy.userlogin(loginmodule.EmailAddressInputfield, loginmodule.PasswordInputfield, loginmodule.SigninButton, testdata.userAccounts[0].accountspecialist1, testdata.userAccounts[0].accountspecialistandprojectmanagerpassword)

      //Click the Clients Navigation Module
      cy.get(modulebutton.ClientsModuleButton)
        .click()
        .wait(2000) 

      //Then click then client name link text
      cy.get('table > tbody > tr:first-child > td:nth-child(1) > a')
        .click()
        .wait(3000)

      //GET the current email address of the client shown at Client Dashboard > Profile > Overview
      GETClientEmailAddress = new Promise((resolve)=>{
        cy.get(clientmodulelocator.ClientDashboardTabPage[0].ProfileTabpage[0].ClientBasicContactInformationSection[0].ClientEmailAddress)
          .then((email)=>{
            ClientEmailAddress = email.text().trim();
            resolve();
          })
      })
      
      //At Client Dashboard > Profile Tab page - there is kebab menu button
      //verify the kebab menu
      cy.get(clientmodulelocator.ClientDashboardTabPage[0].ProfileTabpage[0].KebabMenuButton)
        .should('exist')
        .and('not.be.disabled')
        .click()
        .wait(1000)

      //Click Update Password sub menu
      cy.get('div.text-left > div > div > button:nth-child(2)')
        .click()
        .wait(2000)

      //verify Update Default Contact Password modal popup
      cy.get(clientmodulelocator.ClientDashboardTabPage[0].ProfileTabpage[1].UpdateDefaultContactPasswordModal[0].modal)
        .should('exist')

      //Enter New password data
      cy.get(clientmodulelocator.ClientDashboardTabPage[0].ProfileTabpage[1].UpdateDefaultContactPasswordModal[0].NewPasswordLabelandInputfield)
        .should('exist')
        .find('input[name="newPassword"]')
        .clear()
        .type('q@testing1')
        .wait(600)
        .should('have.value', 'q@testing1')

      //Enter Password but does not match in the new password you'd entered  
      cy.get(clientmodulelocator.ClientDashboardTabPage[0].ProfileTabpage[1].UpdateDefaultContactPasswordModal[0].ConfirmNewPasswordLabelandInputfield)
        .should('exist')
        .find('input[name="confirmPassword"]')
        .clear()
        .type('q@testing1')
        .wait(600)
        .should('have.value', 'q@testing1')

      //click the Reset button
      cy.get(clientmodulelocator.ClientDashboardTabPage[0].ProfileTabpage[1].UpdateDefaultContactPasswordModal[0].ResetButton)
        .click()
        .wait(3000)

      //verify alert-success notification message popup
      cy.GETAlertMessagepopup(alertmessagepopup.TopMessage, 'Successfully updated password')
      //then i am going to close the alert popup
      cy.get(alertmessagepopup.notificationmessagedeleteicon)
        .click()

      //Then Logout
      //click the user account profile 
      cy.get(testdata.AccountProfileSection[0].useraccountprofilepicinitial)
        .click()

      //click the sign out link text
      cy.get(testdata.AccountProfileSection[0].signoutlinktext)
        .click()
        .wait(10000)

      //Login again but using the old password
      //Login using account specialist
      cy.get('div > form.space-y-6')
        .then(()=>{
          GETClientEmailAddress.then(()=>{
            cy.userlogin(loginmodule.EmailAddressInputfield, loginmodule.PasswordInputfield, loginmodule.SigninButton, ClientEmailAddress, 'qatesting123')
          })
        })
   
      //Alert-Error message popup on top right corner
      cy.GETAlertMessagepopup(alertmessagepopup.TopMessage, 'Authentication Error')
      cy.GETAlertMessagepopup(alertmessagepopup.SubMessage, 'Incorrect email or password')
      //then i am going to close the alert popup
      cy.get(alertmessagepopup.notificationmessagedeleteicon)
      .click()

      //Login again but using the new password
      //Login using account specialist
      cy.get('div > form.space-y-6')
        .then(()=>{
          GETClientEmailAddress.then(()=>{
            cy.userlogin(loginmodule.EmailAddressInputfield, loginmodule.PasswordInputfield, loginmodule.SigninButton, ClientEmailAddress, 'q@testing1')
          })
        })
        
      //verify it is successful and it goes to plan page
      cy.url().should('contain', '/plan')
    })
    it("Testcase ID: CP0008 - Verify user can update default contact", ()=>{


      //Login using account specialist
      cy.userlogin(loginmodule.EmailAddressInputfield, loginmodule.PasswordInputfield, loginmodule.SigninButton, testdata.userAccounts[0].accountspecialist1, testdata.userAccounts[0].accountspecialistandprojectmanagerpassword)

      //Click the Clients Navigation Module
      cy.get(modulebutton.ClientsModuleButton)
        .click()
        .wait(2000) 

      //Then click then client name link text
      cy.get('table > tbody > tr:first-child > td:nth-child(1) > a')
        .click()
        .wait(3000)

      //At Client Dashboard > Profile Tab page - there is kebab menu button
      //verify the kebab menu
      cy.get(clientmodulelocator.ClientDashboardTabPage[0].ProfileTabpage[0].KebabMenuButton)
        .should('exist')
        .and('not.be.disabled')
        .click()
        .wait(1000)

      //Click Update Default Contact sub menu
      cy.get('div.text-left > div > div > button:nth-child(3)')
        .click()
        .wait(2000)

      //verify Update Default Contact Details modal popup
      cy.get(clientmodulelocator.ClientDashboardTabPage[0].ProfileTabpage[1].UpdateDefaultContactDetailsModal[0].modal)
        .should('exist')

      ///////// UPDATE DEFAULT CONTACT MODAL ELEMENTS ASSERTIONS STARTS HERE /////////

      //verify modal title
      cy.get(clientmodulelocator.ClientDashboardTabPage[0].ProfileTabpage[1].UpdateDefaultContactDetailsModal[0].modaltitle)
        .should('exist')
        .should("have.css", "font-weight", "700")  // font bold
        .and('have.text', 'Update Default Contact Details')

      //verify First Name Label and Input field
      cy.get(clientmodulelocator.ClientDashboardTabPage[0].ProfileTabpage[1].UpdateDefaultContactDetailsModal[0].FirstNameLabelandInputfield)
        .should('exist')
        .within(()=>{
          //assert label
          cy.get('label')
            .should('exist')
            .and('have.text', 'First name')
            .and('have.css', 'color', 'rgb(107, 114, 128)') //text color
          //assert input field
          cy.get("input[name='firstName']")
            .should('exist')
            .and('not.be.disabled')
        })

      //verify Last name Label and Input field
      cy.get(clientmodulelocator.ClientDashboardTabPage[0].ProfileTabpage[1].UpdateDefaultContactDetailsModal[0].LastNameLabelandInputfield)
        .should('exist')
        .within(()=>{
          //assert label
          cy.get('label')
            .should('exist')
            .and('have.text', 'Last name')
            .and('have.css', 'color', 'rgb(107, 114, 128)') //text color
          //assert input field
          cy.get("input[name='lastName']")
            .should('exist')
            .and('not.be.disabled')
        })

      //verify Email Label and Input field
      cy.get(clientmodulelocator.ClientDashboardTabPage[0].ProfileTabpage[1].UpdateDefaultContactDetailsModal[0].EmailLabelandInputfield)
        .should('exist')
        .within(()=>{
          //assert label
          cy.get('label')
            .should('exist')
            .and('have.text', 'Email')
            .and('have.css', 'color', 'rgb(107, 114, 128)') //text color
          //assert input field
          cy.get("input[name='email']")
            .should('exist')
            .and('not.be.disabled')
        })

      //verify cancel button
      cy.get(clientmodulelocator.ClientDashboardTabPage[0].ProfileTabpage[1].UpdateDefaultContactDetailsModal[0].CancelButton)
        .should('exist')
        .and('not.be.disabled')
        .and("have.css", "color", "rgb(239, 68, 68)")  //text color red
        .and("have.css", "font-weight", "700")         // font bold
        .and('have.text', 'Cancel')

      //verify Update button
      cy.get(clientmodulelocator.ClientDashboardTabPage[0].ProfileTabpage[1].UpdateDefaultContactDetailsModal[0].UpdateButton)
        .should('exist')
        .and('not.be.disabled')
        .and("have.css", "font-weight", "700")                    // verify if it is in bold font
        .and("have.css", "color", "rgb(255, 255, 255)")           //text color 
        .and('have.css', 'background-color', 'rgb(185, 28, 28)')  //button color is red
        .and('have.css', 'border-radius', '16px')                 //button edge curve
        .and('have.text', 'Update')

      ///////// UPDATE DEFAULT CONTACT MODAL ELEMENTS ASSERTIONS ENDS HERE /////////

      //Enter First Name
      cy.get(clientmodulelocator.ClientDashboardTabPage[0].ProfileTabpage[1].UpdateDefaultContactDetailsModal[0].FirstNameLabelandInputfield)
        .find("input[name='firstName']")
        .clear()
        .type('Pedro')
        .wait(700)
        .should('have.value', 'Pedro')

      //Enter Last Name
      cy.get(clientmodulelocator.ClientDashboardTabPage[0].ProfileTabpage[1].UpdateDefaultContactDetailsModal[0].LastNameLabelandInputfield)
        .find("input[name='lastName']")
        .clear()
        .type('North')
        .wait(700)
        .should('have.value', 'North')

      //Enter Email Address
      cy.get(clientmodulelocator.ClientDashboardTabPage[0].ProfileTabpage[1].UpdateDefaultContactDetailsModal[0].EmailLabelandInputfield)
        .find("input[name='email']")
        .clear()
        .type('aldwin.jumaoaas+pedronorth@outgive.ca')
        .wait(700)
        .should('have.value', 'aldwin.jumaoaas+pedronorth@outgive.ca')

      //Click the Update button
      cy.get(clientmodulelocator.ClientDashboardTabPage[0].ProfileTabpage[1].UpdateDefaultContactDetailsModal[0].UpdateButton)
        .click(3000)

      //verify alert-success message popup
      cy.GETAlertMessagepopup(alertmessagepopup.TopMessage, 'Default contact updated')
      cy.GETAlertMessagepopup(alertmessagepopup.SubMessage, 'Successfully updated contact details')
      //then i am going to close the alert popup
      cy.get(alertmessagepopup.notificationmessagedeleteicon)
      .click()

      //verify under the Profile > Overview if the changes reflect
      //Contact Name
      cy.get(clientmodulelocator.ClientDashboardTabPage[0].ProfileTabpage[0].ClientBasicContactInformationSection[0].ContactName)
        .should('exist')
        .and('have.text', 'Pedro North')

      //Client's Email Address
      cy.get(clientmodulelocator.ClientDashboardTabPage[0].ProfileTabpage[0].ClientBasicContactInformationSection[0].ClientEmailAddress)
        .should('exist')
        .and('have.text', 'aldwin.jumaoaas+pedronorth@outgive.ca')
    })
     // **** CLIENT DASHBOARD FILE STARTS HERE ***
    it.skip("Testcase ID: CDF0001 - Verify user can Upload file", ()=>{


      //calling utility functions
  const utilfunc = new utilityfunctions();

      //login using admin role account
  cy.userloginaccount(loginmodules.loginform[0].emailaddressinputfield, loginmodules.loginform[0].passwordinputfield, loginmodules.loginform[0].signinbutton, useraccountdata.accountspecialist, useraccountdata.accountspecialistandprojectmanagerpassword)

      //click the first top client test in the active client listing AAAROO TEST
  cy.click_link_button(clientmodules.testclient)
    .wait(2000)

      //At the stage, it is already accessed to Client Dashboard Tab
      //verify if under the Client Dashboard Tab there is a Files Tab
  cy.get(clientmodules.clientdashboardtab[3].filestablink)
    .should('exist')
    .and('be.visible')
    .and('have.text', ' Files')
    .and('not.be.disabled')
    .and('have.css', 'color', 'rgb(156, 163, 175)')  //font text color
    .then(($el) => {
      const computedStyle       = getComputedStyle($el[0]);
      const customPropertyValue = computedStyle.getPropertyValue('--tw-text-opacity').trim();
      expect(customPropertyValue).to.equal('1')
    })

      //click the Files tab
  cy.click_link_button(clientmodules.clientdashboardtab[3].filestablink)
    .wait(2000)
    /*
      //verify url destination
  cy.url().should('contain', '/files')

      //verify that the files tab font color to signify that is currently accessed, the color is red
  cy.get(clientmodules.clientdashboardtab[3].filestablink)
    .should('have.css', 'color', 'rgb(239, 68, 68)')  //font text color

      //verify files tab main title page
  cy.get(clientmodules.clientdashboardtab[3].filestabmaintitle)
    .should('exist')
    .and('be.visible')
    .and('have.text', 'Uploaded Files')
    .and('have.css', 'font-weight', '700')  // font bold

      //verify there is the upload element section with label says Drop file or click to select
  cy.get('div.file-drop-target > div')
    .should('exist')
    .and('be.visible')
    .and('not.be.disabled')
    .then(()=>{ 
          //assert the label
      cy.get(clientmodules.clientdashboardtab[3].dropfileorclicktoselectuploadlabel)
        .should('exist')
        .and('be.visible')
        .and('have.text', 'Drop file or click to select')
        .then(($el) => {
          const computedStyle       = getComputedStyle($el[0]);
          const customPropertyValue = computedStyle.getPropertyValue('--tw-text-opacity').trim();
          expect(customPropertyValue).to.equal('1')
        })
    })

      //verify the grid view mode button
  cy.get(clientmodules.clientdashboardtab[3].gridmodebutton)
    .should('exist')
    .and('be.visible')
    .and('not.be.disabled')
    .and('have.css', 'color', 'rgb(239, 68, 68)')  //color is red by default since when you first access the Files tab the grid_view mode is set

      //verify the list view mode button
  cy.get(clientmodules.clientdashboardtab[3].listmodebutton)
    .should('exist')
    .and('be.visible')
    .and('not.be.disabled')
    .and('have.css', 'color', 'rgb(0, 0, 0)')  //color is black

      //click the List view mode button
  cy.click_link_button(clientmodules.clientdashboardtab[3].listmodebutton)
    .wait(1000)

      //verify that the grid view color changes to black and the list view mode button is red
  cy.get(clientmodules.clientdashboardtab[3].gridmodebutton)
    .should('exist')
    .and('be.visible')
    .and('not.be.disabled')
    .and('have.css', 'color', 'rgb(0, 0, 0)')
  cy.get(clientmodules.clientdashboardtab[3].listmodebutton)
    .should('exist')
    .and('be.visible')
    .and('not.be.disabled')
    .and('have.css', 'color', 'rgb(239, 68, 68)')

      //click again the Grid view mode button
  cy.click_link_button(clientmodules.clientdashboardtab[3].gridmodebutton)
    .wait(1000)

      ///////////////// UPLOAD FILE ASSERTIONS STARTS HERE ////////////////////////`
      //upload a *jpeg file
  cy.get(clientmodules.clientdashboardtab[3].uploadafileuploadinput).attachFile('bol g.jpg')
    .wait(1000)

      //verify if Upload attachments appears after a successful partial upload of a file from the local drive
  cy.get(clientmodules.clientdashboardtab[3].uploadattachmentsbutton)
    .should('exist')
    .and('be.visible')
    .and('have.css', 'color', 'rgb(255, 255, 255)') //font color
    .and('have.css', 'background-color', 'rgb(5, 150, 105)') //background color that shape like a capsule
    .and('have.css', 'border-radius', '6px') // the corner edge of the button
    .and('have.css', 'width', '153.375px')
    .and('have.css', 'height', '38px')
    .and('have.text', 'Upload Attachments')

  //click the Upload Attachments button
  cy.click_link_button(clientmodules.clientdashboardtab[3].uploadattachmentsbutton)
    .wait(2000)


      //verify alert-success message popup
  cy.getMessagepopup(alertmessageslocators.updatesuccessmessagepopup, 'File uploaded')
  cy.getMessagepopup(alertmessageslocators.updatemessage, 'AgencyClient Attachment has been successfully uploaded and created.')
    

      //verify if the uploaded image is at row 1, exist in DOM and visible in page
  cy.get('div.gap-x-6 > div.grid > div').should('exist').then(()=>{
      //verify image 
    cy.get('div.mb-5 > div.bg-gray-200 > img')
      .should('exist')
      .and('be.visible')
      .and('have.css', 'width', '162.1875px') //expected weight size displayed
      .and('have.css', 'height', '104.59375px') //expected height size displayed
      //verify the initial of the the uploader - account specialist
    cy.get('div.mb-5 > span.bg-green-text')
      .should('exist')
      .and('be.visible')
      .and('have.css', 'color', 'rgb(255, 255, 255)') //text color of the initial
      .and('have.css', 'background-color', 'rgb(94, 169, 98)') // background green circle color of the initial
      .and('have.css', 'border-radius', '24px') //expected shape of the background is circle
      .and('have.css', 'text-transform', 'uppercase') //the displayed initial is all caps
      .and('have.text', 'lm')
      //verify the filename of the uploaded image
    cy.get('div.col-span-1 > p.text-grayscale-900')
      .should('exist')
      .and('be.visible')
      .and('have.text', 'bol g.jpg')
      //verify date uploaded
    cy.get('div.col-span-1 > p.text-grayscale-600')
      .should('exist')
      .and('be.visible')
      .and('contains', utilfunc.getFormattedDateMonthDayyear) // the time is not included
  }) */
  cy.wait(2000)
  //hover onto the image itself
  cy.get('div.gap-x-6 > div.grid > div').realHover()
    .wait(1000)
    .then(()=>{
      //verify if edit, download, copy to clipboard, and delete buttons visibly appear
      cy.get('div.hidden > div.flex > div > button > svg').each(($button) => {
        cy.wrap($button)
          .should('exist')         // Assert that each buttons exists
          .and('be.visible')    // Assert that each button is visible
          .and('not.be.disabled');  // Assert that each button is not disabled
      })
    })
  //click the list view
  cy.click_link_button(clientmodules.clientdashboardtab[3].listmodebutton)
    .wait(2000)

  ///////////////// UPLOAD FILE ASSERTIONS ENDS HERE ////////////////////////

    })
    it.skip("Testcase ID: CDF0002 - Verify user can Edit the filename of the uploaded file", ()=>{

    //calling utility functions
    const utilfunc = new utilityfunctions();

    //login using admin role account
    cy.userloginaccount(loginmodules.loginform[0].emailaddressinputfield, loginmodules.loginform[0].passwordinputfield, loginmodules.loginform[0].signinbutton, useraccountdata.accountspecialist, useraccountdata.accountspecialistandprojectmanagerpassword)

    //click the first top client test in the active client listing AAAROO TEST
    cy.click_link_button(clientmodules.testclient)
      .wait(2000)

    //click the Files tab
    cy.click_link_button(clientmodules.clientdashboardtab[3].filestablink)
      .wait(2000)

    })
    it.skip("Testcase ID: CDF0003 - Verify user can download of the uploaded file", ()=>{


    //calling utility functions
    const utilfunc = new utilityfunctions();

    //login using admin role account
    cy.userloginaccount(loginmodules.loginform[0].emailaddressinputfield, loginmodules.loginform[0].passwordinputfield, loginmodules.loginform[0].signinbutton, useraccountdata.usernameAdmin, useraccountdata.adminpassword)

    //click the first top client test in the active client listing AAAROO TEST
    cy.click_link_button(clientmodules.testclient)
      .wait(2000)

    //click the Files tab
    cy.click_link_button(clientmodules.clientdashboardtab[3].filestablink)
      .wait(2000)

    })
    it.skip("Testcase ID: CDF0004 - Verify user can link copy into clipboard of the uploaded file", ()=>{


    //calling utility functions
    const utilfunc = new utilityfunctions();

    //login using admin role account
    cy.userloginaccount(loginmodules.loginform[0].emailaddressinputfield, loginmodules.loginform[0].passwordinputfield, loginmodules.loginform[0].signinbutton, useraccountdata.usernameAdmin, useraccountdata.adminpassword)

    //click the first top client test in the active client listing AAAROO TEST
    cy.click_link_button(clientmodules.testclient)
      .wait(2000)

    //click the Files tab
    cy.click_link_button(clientmodules.clientdashboardtab[3].filestablink)
      .wait(2000)




    })
    it.skip("Testcase ID: CDF0005 - Verify user can delete the uploaded file ", ()=>{


    //calling utility functions
    const utilfunc = new utilityfunctions();

    //login using admin role account
    cy.userloginaccount(loginmodules.loginform[0].emailaddressinputfield, loginmodules.loginform[0].passwordinputfield, loginmodules.loginform[0].signinbutton, useraccountdata.usernameAdmin, useraccountdata.adminpassword)

    //click the first top client test in the active client listing AAAROO TEST
    cy.click_link_button(clientmodules.testclient)
      .wait(2000)

    //click the Files tab
    cy.click_link_button(clientmodules.clientdashboardtab[3].filestablink)
      .wait(2000)





    })
    // **** CLIENT DASHBOARD FILE ENDS HERE ***
    // **** CLIENT UPSELL STARTS HERE ***
    it("Testcase ID: CCU0001 - Verify create upsell draft of a client that is connected to amazon or the Selling Partner API and Advertising API are enabled", ()=>{

      
      let GETClientEmailAddress;
      let ClientEmailAddress;
      let GETClientName;
      let clientName;

      //Login using account specialist
      cy.userlogin(loginmodule.EmailAddressInputfield, loginmodule.PasswordInputfield, loginmodule.SigninButton, testdata.userAccounts[0].accountspecialist1, testdata.userAccounts[0].accountspecialistandprojectmanagerpassword)

      //Click the Clients Navigation Module
      cy.get(modulebutton.ClientsModuleButton)
        .click()
        .wait(2000) 

      //Select PPC-SANDBOX 
      cy.get(`a[href="/clients/71fa24a1-4bf5-47fa-9f2a-571471686bc0/dashboard"]`)
        .click()
        .wait(2000)

      //GET the current client name that shows as the title
      GETClientName = new Promise((resolve)=>{
        cy.get(clientmodulelocator.ClientNameTitle)
          .then((name)=>{
            clientName = name.text().trim();
          })
      })

      //GET the current email address of the client shown at Client Dashboard > Profile > Overview
      GETClientEmailAddress = new Promise((resolve)=>{
        cy.get(clientmodulelocator.ClientDashboardTabPage[0].ProfileTabpage[0].ClientBasicContactInformationSection[0].ClientEmailAddress)
          .then((email)=>{
            ClientEmailAddress = email.text().trim();
            resolve();
          })
        })

      //click the billing tab
      cy.get(clientmodulelocator.ClientMainPageTab[0].BillingTab)
        .click()
        .wait(1000)

      // Click the Upsells sub tab
      cy.get(clientmodulelocator.BillingTabPage[0].PageTabs[0].UpsellsTab)
        .click()
        .wait(1000)
        
      //Click the Create Upsell button
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellButton)
        .click()
        .wait(1000)
        
      //verify the Create Upsell modal
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].modal)
        .should('exist')

      ////SELECT UPSELL ITEM AND SAVE AS DRAFT STARTS HERE ////////////////
      
      //Select Upsell item
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UpsellitemAndSelectDropdownmenu)
        .find('select')
        .select('1604151000000147020')
        .should('have.value', '1604151000000147020')

      //verify that it goes on top option 1
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UpsellitemAndSelectDropdownmenu)
        .find('select option:selected')
        .should('have.text', 'Copywriting Work')

      //verify Unit Price value updated
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UnitPricelabelAndInputfield)
        .find('.relative > input')
        .should('have.value', '97.95')

      //verify Upsell Description value updated
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UpsellDescriptionlabelAndTextareafield)
        .find('textarea')
        .should('have.value', 'Copywriting Work')
      
      //Click the Select Available ASIN/s to add button
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].SelectAvailableASINstoAddButton)
        .click()
        .wait(1000)

      //Select Available ASINS
      cy.get('button[value="B06XCYD65F"]')
        .click()
        .wait(1000)
      
      //Enter ASIN 1
      cy.get('input[name="serviceAsins.0.asin"]')
        .scrollIntoView()
        .should('have.value', 'B06XCYD65F')

      //Click Save as Draft Button
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].SaveasDraftButton)
        .click()
        .wait(3000)

      //verify alert-success message popup
      cy.GETAlertMessagepopup(alertmessagepopup.TopMessage, 'Upsell Created')
      //then i am going to close the alert popup
      cy.get(alertmessagepopup.notificationmessagedeleteicon)
      .click()

      ////SELECT UPSELL ITEM AND SAVE AS DRAFT ENDS HERE ////////////////

      /////// CLIENT > BILLING > UPSELLS TAB > TABLE VERFICATION STARTS HERE /////////////

      //verify the column names first
      const expected_columnNames = [
        'Service',
        'Invoice',
        'Amount',
        'Status',
        'Date',
        'Submitted By',
        'Updated By',
        'Action'
      ];
      cy.get('table > thead > tr > th').each(($option, index) => {
          cy.wrap($option)
            .should('exist')
            .should('have.text', expected_columnNames[index])  //verify names based on the expected names per column
            .and('have.css', 'color', 'rgb(190, 190, 190)') //text color
          cy.log(expected_columnNames[index]) 
      });
              
      //Then verify the row 1 each columns 
      cy.get('table > tbody > tr:first-child').within(()=>{
        //assert Row 1 column 1 name Service
        UpsellTable.assertColumn1ServiceName(' > td:nth-child(1) > button', 'Copywriting Work')
        //assert Row 1 column 2 name Invoice
        UpsellTable.assertColumn2InvoiceNumber(' > td:nth-child(2)', '—') 
        //assert Row 1 column 3 name Amount
        UpsellTable.assertColumn3Amount(' > td:nth-child(3) > span', '$ 97.95')
        //assert Row 1 column 4 name Status
        UpsellTable.assertColumn4Status(' > td:nth-child(4) > span', 'draft', 'rgb(107, 114, 128)', 'rgb(243, 244, 246)')
        //assert Row 1 column 5 name Date
        UpsellTable.assertColumn5Date(' > td:nth-child(5) > span', DateTodayIs.TodayDateDDMMYYYY())
        //assert Row 1 column 6 name Submitted By
        UpsellTable.assertColumn6Submittedby(' > td:nth-child(6) > div', 'LP', 'LoganPaul')
        //assert Row 1 column 7 name Updated By
        UpsellTable.assertColumn7UpdatedbyExpectedDASH(' > td:nth-child(7)', '—')
        //assert Row 1 column 8 name Action - has edit button
        UpsellTable.assertColumn8Action(' > td:nth-child(8) > button', 'not.be.disabled', 'Edit')
      }) 

      /////// CLIENT > BILLING > UPSELLS TAB > TABLE VERFICATION ENDS HERE /////////////

    })
    it("Testcase ID: CCU0002 - Create Upsell Draft for client that is not connected to Amazon Selling Partner", ()=>{


      let GETClientEmailAddress;
      let ClientEmailAddress;
      let GETClientName;
      let clientName;

      //Login using account specialist
      cy.userlogin(loginmodule.EmailAddressInputfield, loginmodule.PasswordInputfield, loginmodule.SigninButton, testdata.userAccounts[0].accountspecialist1, testdata.userAccounts[0].accountspecialistandprojectmanagerpassword)

      //Click the Clients Navigation Module
      cy.get(modulebutton.ClientsModuleButton)
        .click()
        .wait(2000) 

      //Then click then client name link text
      cy.get('table > tbody > tr:first-child > td:nth-child(1) > a')
        .click()
        .wait(3000)

      //GET the current client name that shows as the title
      GETClientName = new Promise((resolve)=>{
        cy.get(clientmodulelocator.ClientNameTitle)
          .then((name)=>{
            clientName = name.text().trim();
          })
      })

      //GET the current email address of the client shown at Client Dashboard > Profile > Overview
      GETClientEmailAddress = new Promise((resolve)=>{
        cy.get(clientmodulelocator.ClientDashboardTabPage[0].ProfileTabpage[0].ClientBasicContactInformationSection[0].ClientEmailAddress)
          .then((email)=>{
            ClientEmailAddress = email.text().trim();
            resolve();
          })
        })

      //click the billing tab
      cy.get(clientmodulelocator.ClientMainPageTab[0].BillingTab)
        .click()
        .wait(2000)

      // Click the Upsells sub tab
      cy.get(clientmodulelocator.BillingTabPage[0].PageTabs[0].UpsellsTab)
        .click()
        .wait(2000)
        
      //Click the Create Upsell button
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellButton)
        .click()
        .wait(2000)
        
      //verify the Create Upsell modal
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].modal)
        .should('exist')

      ///////// CREATE UPSELL REQUEST STARTS HERE //////////////

      //Select Upsell item
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UpsellitemAndSelectDropdownmenu)
        .find('select')
        .should('exist')
        .select('1604151000000147020')
        .wait(1000)
        .should('have.value', '1604151000000147020')

      //verify that it goes on top option 1
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UpsellitemAndSelectDropdownmenu)
        .find('select option:selected')
        .should('exist')
        .wait(1000)
        .should('have.text', 'Copywriting Work')

      //verify Unit Price value updated
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UnitPricelabelAndInputfield)
        .find('.relative > input')
        .should('exist')
        .wait(1000)
        .should('have.value', '97.95')

      //verify Upsell Description value updated
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UpsellDescriptionlabelAndTextareafield)
        .find('textarea')
        .should('exist')
        .wait(1000)
        .should('have.value', 'Copywriting Work')
        
      //Click Save as Draft Button
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].SaveasDraftButton)
        .click()
        .wait(3000)

      //verify alert-success message popup
      cy.GETAlertMessagepopup(alertmessagepopup.TopMessage, 'Upsell Created')
  
      ///////// CREATE UPSELL REQUEST ENDS HERE //////////////

       /////// CLIENT > BILLING > UPSELLS TAB > TABLE VERFICATION STARTS HERE /////////////

      //verify the column names first
      const expected_columnNames = [
        'Service',
        'Invoice',
        'Amount',
        'Status',
        'Date',
        'Submitted By',
        'Updated By',
        'Action'
      ];
      cy.get('table > thead > tr > th').each(($option, index) => {
          cy.wrap($option)
            .should('exist')
            .should('have.text', expected_columnNames[index])  //verify names based on the expected names per column
            .and('have.css', 'color', 'rgb(190, 190, 190)') //text color
          cy.log(expected_columnNames[index]) 
      });
              
      //Then verify the row 1 each columns 
      cy.get('table > tbody > tr:first-child').within(()=>{
        //assert Row 1 column 1 name Service
        UpsellTable.assertColumn1ServiceName(' > td:nth-child(1) > button', 'Copywriting Work')
        //assert Row 1 column 2 name Invoice
        UpsellTable.assertColumn2InvoiceNumber(' > td:nth-child(2)', '—') 
        //assert Row 1 column 3 name Amount
        UpsellTable.assertColumn3Amount(' > td:nth-child(3) > span', '$ 97.95')
        //assert Row 1 column 4 name Status
        UpsellTable.assertColumn4Status(' > td:nth-child(4) > span', 'draft', 'rgb(107, 114, 128)', 'rgb(243, 244, 246)')
        //assert Row 1 column 5 name Date
        UpsellTable.assertColumn5Date(' > td:nth-child(5) > span', DateTodayIs.TodayDateDDMMYYYY())
        //assert Row 1 column 6 name Submitted By
        UpsellTable.assertColumn6Submittedby(' > td:nth-child(6) > div', 'LP', 'LoganPaul')
        //assert Row 1 column 7 name Updated By
        UpsellTable.assertColumn7UpdatedbyExpectedDASH(' > td:nth-child(7)', '—')
        //assert Row 1 column 8 name Action - has edit button
        UpsellTable.assertColumn8Action(' > td:nth-child(8) > button', 'not.be.disabled', 'Edit')
      }) 

      /////// CLIENT > BILLING > UPSELLS TAB > TABLE VERFICATION ENDS HERE /////////////
       
    })
    it("Testcase ID: CCU0003 - Edit the Created Draft Upsell", ()=>{

      
      //Login using account specialist
      cy.userlogin(loginmodule.EmailAddressInputfield, loginmodule.PasswordInputfield, loginmodule.SigninButton, testdata.userAccounts[0].accountspecialist1, testdata.userAccounts[0].accountspecialistandprojectmanagerpassword)

      //Click the Clients Navigation Module
      cy.get(modulebutton.ClientsModuleButton)
        .click()
        .wait(2000) 

      //Then click then client name link text
      cy.get('table > tbody > tr:first-child > td:nth-child(1) > a')
        .click()
        .wait(3000)

      //click the billing tab
      cy.get(clientmodulelocator.ClientMainPageTab[0].BillingTab)
        .click()
        .wait(2000)

      // Click the Upsells sub tab
      cy.get(clientmodulelocator.BillingTabPage[0].PageTabs[0].UpsellsTab)
        .click()
        .wait(2000)
        
      //Click the Create Upsell button
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellButton)
        .click()
        .wait(2000)
        
      //verify the Create Upsell modal
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].modal)
        .should('exist')

      ///////// CREATE UPSELL REQUEST STARTS HERE //////////////

      //Select Upsell item
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UpsellitemAndSelectDropdownmenu)
        .find('select')
        .should('exist')
        .select('1604151000000147020')
        .wait(1000)
        .should('have.value', '1604151000000147020')

      //verify that it goes on top option 1
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UpsellitemAndSelectDropdownmenu)
        .find('select option:selected')
        .should('exist')
        .wait(1000)
        .should('have.text', 'Copywriting Work')

      //verify Unit Price value updated
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UnitPricelabelAndInputfield)
        .find('.relative > input')
        .should('exist')
        .wait(1000)
        .should('have.value', '97.95')

      //verify Upsell Description value updated
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UpsellDescriptionlabelAndTextareafield)
        .find('textarea')
        .should('exist')
        .wait(1000)
        .should('have.value', 'Copywriting Work')
        
      //Click Save as Draft Button
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].SaveasDraftButton)
        .click()
        .wait(3000)

      //verify alert-success message popup
      cy.GETAlertMessagepopup(alertmessagepopup.TopMessage, 'Upsell Created')
  
      ///////// CREATE UPSELL REQUEST ENDS HERE //////////////

       /////// CLIENT > BILLING > UPSELLS TAB > TABLE VERFICATION STARTS HERE /////////////

      //verify the column names first
      const expected_columnNames = [
        'Service',
        'Invoice',
        'Amount',
        'Status',
        'Date',
        'Submitted By',
        'Updated By',
        'Action'
      ];
      cy.get('table > thead > tr > th').each(($option, index) => {
          cy.wrap($option)
            .should('exist')
            .should('have.text', expected_columnNames[index])  //verify names based on the expected names per column
            .and('have.css', 'color', 'rgb(190, 190, 190)') //text color
          cy.log(expected_columnNames[index]) 
      });
              
      //Then verify the row 1 each columns 
      cy.get('table > tbody > tr:first-child').within(()=>{
        //assert Row 1 column 1 name Service
        UpsellTable.assertColumn1ServiceName(' > td:nth-child(1) > button', 'Copywriting Work')
        //assert Row 1 column 2 name Invoice
        UpsellTable.assertColumn2InvoiceNumber(' > td:nth-child(2)', '—') 
        //assert Row 1 column 3 name Amount
        UpsellTable.assertColumn3Amount(' > td:nth-child(3) > span', '$ 97.95')
        //assert Row 1 column 4 name Status
        UpsellTable.assertColumn4Status(' > td:nth-child(4) > span', 'draft', 'rgb(107, 114, 128)', 'rgb(243, 244, 246)')
        //assert Row 1 column 5 name Date
        UpsellTable.assertColumn5Date(' > td:nth-child(5) > span', DateTodayIs.TodayDateDDMMYYYY())
        //assert Row 1 column 6 name Submitted By
        UpsellTable.assertColumn6Submittedby(' > td:nth-child(6) > div', 'LP', 'LoganPaul')
        //assert Row 1 column 7 name Updated By
        UpsellTable.assertColumn7UpdatedbyExpectedDASH(' > td:nth-child(7)', '—')
        //assert Row 1 column 8 name Action - has edit button
        UpsellTable.assertColumn8Action(' > td:nth-child(8) > button', 'not.be.disabled', 'Edit')
      }) 

      /////// CLIENT > BILLING > UPSELLS TAB > TABLE VERFICATION ENDS HERE /////////////

      //Then Now I am going to open the Update Upsell modal by clicking the Edit button
      cy.get('table > tbody > tr:first-child > td:nth-child(8) > button')
        .click()
        .wait(2000)

      //verify Update Upsell modal popup
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].modal)
        .should('exist')

      //Edit or change the selected Upsell item and select another one
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UpsellitemAndSelectDropdownmenu)
        .find('select')
        .should('exist')
        .select('1604151000000179046')
        .wait(1000)
        .should('have.value', '1604151000000179046')

      //verify that it goes on top option 1
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UpsellitemAndSelectDropdownmenu)
        .find('select option:selected')
        .should('exist')
        .wait(1000)
        .should('have.text', 'Product Images')

      //verify the updated Unit Price value
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UnitPricelabelAndInputfield)
        .find('.relative > input')
        .should('exist')
        .wait(1000)
        .should('have.value', '125.35')

      //verify the updated item description
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UpsellDescriptionlabelAndTextareafield)
        .find('textarea')
        .should('exist')
        .wait(1000)
        .should('have.value', 'Product Images')

      //Click Save as Draft Button
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].SaveasDraftButton)
        .click()
        .wait(3000)

      //verify alert-success message popup
      cy.GETAlertMessagepopup(alertmessagepopup.TopMessage, 'Upsell Created')

      //Now it should reflect in the table same row
      cy.get('table > tbody > tr:first-child').within(()=>{
        //assert Row 1 column 1 name Service
        UpsellTable.assertColumn1ServiceName(' > td:nth-child(1) > button', 'Product Images')
        //assert Row 1 column 2 name Invoice
        UpsellTable.assertColumn2InvoiceNumber(' > td:nth-child(2)', '—') 
        //assert Row 1 column 3 name Amount
        UpsellTable.assertColumn3Amount(' > td:nth-child(3) > span', '$ 125.35')
        //assert Row 1 column 4 name Status
        UpsellTable.assertColumn4Status(' > td:nth-child(4) > span', 'draft', 'rgb(107, 114, 128)', 'rgb(243, 244, 246)')
        //assert Row 1 column 5 name Date
        UpsellTable.assertColumn5Date(' > td:nth-child(5) > span', DateTodayIs.TodayDateDDMMYYYY())
        //assert Row 1 column 6 name Submitted By
        UpsellTable.assertColumn6Submittedby(' > td:nth-child(6) > div', 'LP', 'LoganPaul')
        //assert Row 1 column 7 name Updated By
        UpsellTable.assertColumn7UpdatedbyExpectedDASH(' > td:nth-child(7)', '—')
        //assert Row 1 column 8 name Action - has edit button
        UpsellTable.assertColumn8Action(' > td:nth-child(8) > button', 'not.be.disabled', 'Edit')
      }) 

    })
    it("Testcase ID: CCU0004 - Submit the Draft Upsell ", ()=>{

      let GETClientName;
      let clientName;

      //Login using account specialist
      cy.userlogin(loginmodule.EmailAddressInputfield, loginmodule.PasswordInputfield, loginmodule.SigninButton, testdata.userAccounts[0].accountspecialist1, testdata.userAccounts[0].accountspecialistandprojectmanagerpassword)

      //Click the Clients Navigation Module
      cy.get(modulebutton.ClientsModuleButton)
        .click()
        .wait(2000) 

      //Then click then client name link text
      cy.get('table > tbody > tr:first-child > td:nth-child(1) > a')
        .click()
        .wait(3000)

      //GET the current client name that shows as the title
      GETClientName = new Promise((resolve)=>{
        cy.get(clientmodulelocator.ClientNameTitle)
          .then((name)=>{
            clientName = name.text().trim();
          })
      })

      //click the billing tab
      cy.get(clientmodulelocator.ClientMainPageTab[0].BillingTab)
        .click()
        .wait(2000)

      // Click the Upsells sub tab
      cy.get(clientmodulelocator.BillingTabPage[0].PageTabs[0].UpsellsTab)
        .click()
        .wait(2000)
        
      //Click the Create Upsell button
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellButton)
        .click()
        .wait(2000)
        
      //verify the Create Upsell modal
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].modal)
        .should('exist')

      ///////// CREATE UPSELL REQUEST STARTS HERE //////////////

      //Select Upsell item
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UpsellitemAndSelectDropdownmenu)
        .find('select')
        .should('exist')
        .select('1604151000000147020')
        .wait(1000)
        .should('have.value', '1604151000000147020')

      //verify that it goes on top option 1
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UpsellitemAndSelectDropdownmenu)
        .find('select option:selected')
        .should('exist')
        .wait(1000)
        .should('have.text', 'Copywriting Work')

      //verify Unit Price value updated
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UnitPricelabelAndInputfield)
        .find('.relative > input')
        .should('exist')
        .wait(1000)
        .should('have.value', '97.95')

      //verify Upsell Description value updated
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UpsellDescriptionlabelAndTextareafield)
        .find('textarea')
        .should('exist')
        .wait(1000)
        .should('have.value', 'Copywriting Work')
        
      //Click Save as Draft Button
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].SaveasDraftButton)
        .click()
        .wait(8000)
      /*
      //verify alert-success message popup
      cy.GETAlertMessagepopup(alertmessagepopup.TopMessage, 'Upsell Created')
      //then i am going to close the alert popup
      cy.get(alertmessagepopup.notificationmessagedeleteicon)
        .click()
      */
      ///////// CREATE UPSELL REQUEST ENDS HERE //////////////

      /////// CLIENT > BILLING > UPSELLS TAB > TABLE VERFICATION STARTS HERE /////////////

      //verify the column names first
      const expected_columnNames = [
        'Service',
        'Invoice',
        'Amount',
        'Status',
        'Date',
        'Submitted By',
        'Updated By',
        'Action'
      ];
      cy.get('table > thead > tr > th').each(($option, index) => {
          cy.wrap($option)
            .should('exist')
            .should('have.text', expected_columnNames[index])  //verify names based on the expected names per column
            .and('have.css', 'color', 'rgb(190, 190, 190)') //text color
          cy.log(expected_columnNames[index]) 
      });
              
      //Then verify the row 1 each columns 
      cy.get('table > tbody > tr:first-child').within(()=>{
        //assert Row 1 column 1 name Service
        UpsellTable.assertColumn1ServiceName(' > td:nth-child(1) > button', 'Copywriting Work')
        //assert Row 1 column 2 name Invoice
        UpsellTable.assertColumn2InvoiceNumber(' > td:nth-child(2)', '—') 
        //assert Row 1 column 3 name Amount
        UpsellTable.assertColumn3Amount(' > td:nth-child(3) > span', '$ 97.95')
        //assert Row 1 column 4 name Status
        UpsellTable.assertColumn4Status(' > td:nth-child(4) > span', 'draft', 'rgb(107, 114, 128)', 'rgb(243, 244, 246)')
        //assert Row 1 column 5 name Date
        UpsellTable.assertColumn5Date(' > td:nth-child(5) > span', DateTodayIs.TodayDateDDMMYYYY())
        //assert Row 1 column 6 name Submitted By
        UpsellTable.assertColumn6Submittedby(' > td:nth-child(6) > div', 'LP', 'LoganPaul')
        //assert Row 1 column 7 name Updated By
        UpsellTable.assertColumn7UpdatedbyExpectedDASH(' > td:nth-child(7)', '—')
        //assert Row 1 column 8 name Action - has edit button
        UpsellTable.assertColumn8Action(' > td:nth-child(8) > button', 'not.be.disabled', 'Edit')
      }) 

      /////// CLIENT > BILLING > UPSELLS TAB > TABLE VERFICATION ENDS HERE /////////////

      //Then I will click the Edit button
      cy.get('table > tbody > tr:first-child > td:nth-child(8) > button')
        .click()
        .wait(3000)

      //verify the Update Upsell modal
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].modal)
        .should('exist')

      //Click Submit Button
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].SubmitButton)
        .click()
        .wait(8000)
      /*
      //verify alert-success message popup
      cy.GETAlertMessagepopup(alertmessagepopup.TopMessage, 'Upsell Created')
      //then i am going to close the alert popup
      cy.get(alertmessagepopup.notificationmessagedeleteicon)
      .click() */

      //verify again the table as the status should change from draft to Awaiting Approval
      cy.get('table > tbody > tr:first-child').within(()=>{
        //assert Column 4 > Status
        BillingUpsells.assertColumn4Status(' > td:nth-child(4) > span', 'awaiting approval', 'rgb(212, 130, 54)', 'rgb(255, 210, 185)')

      })

      //Click the Billing navigation module
      cy.get(modulebutton.BillingModuleButton)
        .click()
        .wait(2000)
        
      //Click the Upsells link text folder
      cy.get(linktextfolder.BillingModule[0].Upsells)
        .click()
        .wait(2000)

      //It is expected that it goes straight onto Upsells >Awaiting Approval Tab page
      
      /// Then verify in row 1 table with each columns
      ////// BILLING > UPSELLS > TABLE LIST ASSERTIONS STARTS HERE ////////

      //verify the column names first
      const expectColumnNames = [
        'Service',
        'Client Name',
        'Amount',
        'Status',
        'Date',
        'Submitted By',
        'Action'
      ];
      cy.get('table > thead > tr > th').each(($option, index) => {
          cy.wrap($option)
            .should('exist')
            .should('have.text', expectColumnNames[index])  //verify names based on the expected names per column
            .and('have.css', 'color', 'rgb(190, 190, 190)') //text color
          cy.log(expectColumnNames[index]) 
      });

      cy.get('table > tbody > tr:first-child').within(()=>{
        //assert Column 1 > Service Name / Upsell Name
        BillingUpsells.assertColumn1ServiceName(' > td:nth-child(1) > button', 'Copywriting Work')
        //assert Column 2 > Client Name
        GETClientName.then(()=>{
          BillingUpsells.assertColumn2ClientName(' > td:nth-child(2) > a', clientName)
        }) 
        //assert Column 3 > Amount
        BillingUpsells.assertColumn3Amount(' > td:nth-child(3) > span', '$ 97.95')
        //assert Column 4 > Status
        BillingUpsells.assertColumn4Status(' > td:nth-child(4) > span', 'awaiting approval', 'rgb(212, 130, 54)', 'rgb(255, 210, 185)')
        //assert Column 5 > Date
        BillingUpsells.assertColumn5Date(' > td:nth-child(5) > span', DateTodayIs.TodayDateDDMMYYYY())
        //assert Column 6 > Submitted by
        BillingUpsells.assertColumn6Submittedby(' > td:nth-child(6) > div', 'LP', 'LoganPaul')
        //assert Column 7 > Action:Review
        BillingUpsells.assertColumn7Action(' > td:nth-child(7) > button', 'not.be.disabled', 'Review')
      })

      ////// BILLING > UPSELLS > TABLE LIST ASSERTIONS ENDS HERE ////////
      
    })
    it("Testcase ID: CCU0005 - Create Upsell Request and submit", ()=>{

      let GETClientName;
      let clientName;

      //Login using account specialist
      cy.userlogin(loginmodule.EmailAddressInputfield, loginmodule.PasswordInputfield, loginmodule.SigninButton, testdata.userAccounts[0].accountspecialist1, testdata.userAccounts[0].accountspecialistandprojectmanagerpassword)

      //Click the Clients Navigation Module
      cy.get(modulebutton.ClientsModuleButton)
        .click()
        .wait(2000) 

      //Then click then client name link text
      cy.get('table > tbody > tr:first-child > td:nth-child(1) > a')
        .click()
        .wait(3000)

      //GET the current client name that shows as the title
      GETClientName = new Promise((resolve)=>{
        cy.get(clientmodulelocator.ClientNameTitle)
          .then((name)=>{
            clientName = name.text().trim();
          })
      })

      //click the billing tab
      cy.get(clientmodulelocator.ClientMainPageTab[0].BillingTab)
        .click()
        .wait(2000)

      // Click the Upsells sub tab
      cy.get(clientmodulelocator.BillingTabPage[0].PageTabs[0].UpsellsTab)
        .click()
        .wait(2000)
        
      //Click the Create Upsell button
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellButton)
        .click()
        .wait(2000)
        
      //verify the Create Upsell modal
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].modal)
        .should('exist')

      ///////// CREATE UPSELL REQUEST STARTS HERE //////////////

      //Select Upsell item
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UpsellitemAndSelectDropdownmenu)
        .find('select')
        .should('exist')
        .select('1604151000000147020')
        .wait(1000)
        .should('have.value', '1604151000000147020')

      //verify that it goes on top option 1
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UpsellitemAndSelectDropdownmenu)
        .find('select option:selected')
        .should('exist')
        .wait(1000)
        .should('have.text', 'Copywriting Work')

      //verify Unit Price value updated
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UnitPricelabelAndInputfield)
        .find('.relative > input')
        .should('exist')
        .wait(1000)
        .should('have.value', '97.95')

      //verify Upsell Description value updated
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UpsellDescriptionlabelAndTextareafield)
        .find('textarea')
        .should('exist')
        .wait(1000)
        .should('have.value', 'Copywriting Work')
        
      //Click Submit Button
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].SubmitButton)
        .click()
        .wait(8000)
      /*
      //verify alert-success message popup
      cy.GETAlertMessagepopup(alertmessagepopup.TopMessage, 'Upsell Created')
      //then i am going to close the alert popup
      cy.get(alertmessagepopup.notificationmessagedeleteicon)
      .click() */
  
      ///////// CREATE UPSELL REQUEST ENDS HERE //////////////

      /////// CLIENT > BILLING > UPSELLS TAB > TABLE VERFICATION STARTS HERE /////////////

      //verify the column names first
      const expected_columnNames = [
        'Service',
        'Invoice',
        'Amount',
        'Status',
        'Date',
        'Submitted By',
        'Updated By',
        'Action'
      ];
      cy.get('table > thead > tr > th').each(($option, index) => {
          cy.wrap($option)
            .should('exist')
            .should('have.text', expected_columnNames[index])  //verify names based on the expected names per column
            .and('have.css', 'color', 'rgb(190, 190, 190)') //text color
          cy.log(expected_columnNames[index]) 
      });
              
      //Then verify the row 1 each columns 
      cy.get('table > tbody > tr:first-child').within(()=>{
        //assert Row 1 column 1 name Service
        UpsellTable.assertColumn1ServiceName(' > td:nth-child(1) > button', 'Copywriting Work')
        //assert Row 1 column 2 name Invoice
        UpsellTable.assertColumn2InvoiceNumber(' > td:nth-child(2)', '—') 
        //assert Row 1 column 3 name Amount
        UpsellTable.assertColumn3Amount(' > td:nth-child(3) > span', '$ 97.95')
        //assert Row 1 column 4 name Status
        UpsellTable.assertColumn4Status(' > td:nth-child(4) > span', 'awaiting approval', 'rgb(212, 130, 54)', 'rgb(255, 210, 185)')
        //assert Row 1 column 5 name Date
        UpsellTable.assertColumn5Date(' > td:nth-child(5) > span', DateTodayIs.TodayDateDDMMYYYY())
        //assert Row 1 column 6 name Submitted By
        UpsellTable.assertColumn6Submittedby(' > td:nth-child(6) > div', 'LP', 'LoganPaul')
        //assert Row 1 column 7 name Updated By
        UpsellTable.assertColumn7UpdatedbyExpectedDASH(' > td:nth-child(7)', '—')
        //assert Row 1 column 8 name Action - has edit button
        UpsellTable.assertColumn8Action(' > td:nth-child(8) > button', 'be.disabled', 'View')
      }) 

      /////// CLIENT > BILLING > UPSELLS TAB > TABLE VERFICATION ENDS HERE /////////////

      //Click the Billing navigation module
      cy.get(modulebutton.BillingModuleButton)
        .click()
        .wait(2000)
        
      //Click the Upsells link text folder
      cy.get(linktextfolder.BillingModule[0].Upsells)
        .click()
        .wait(2000)

      //It is expected that it goes straight onto Upsells >Awaiting Approval Tab page
      
      /// Then verify in row 1 table with each columns
      ////// BILLING > UPSELLS > TABLE LIST ASSERTIONS STARTS HERE ////////

      //verify the column names first
      const expectColumnNames = [
        'Service',
        'Client Name',
        'Amount',
        'Status',
        'Date',
        'Submitted By',
        'Action'
      ];
      cy.get('table > thead > tr > th').each(($option, index) => {
          cy.wrap($option)
            .should('exist')
            .should('have.text', expectColumnNames[index])  //verify names based on the expected names per column
            .and('have.css', 'color', 'rgb(190, 190, 190)') //text color
          cy.log(expectColumnNames[index]) 
      });

      cy.get('table > tbody > tr:first-child').within(()=>{
        //assert Column 1 > Service Name / Upsell Name
        BillingUpsells.assertColumn1ServiceName(' > td:nth-child(1) > button', 'Copywriting Work')
        //assert Column 2 > Client Name
        GETClientName.then(()=>{
          BillingUpsells.assertColumn2ClientName(' > td:nth-child(2) > a', clientName)
        }) 
        //assert Column 3 > Amount
        BillingUpsells.assertColumn3Amount(' > td:nth-child(3) > span', '$ 97.95')
        //assert Column 4 > Status
        BillingUpsells.assertColumn4Status(' > td:nth-child(4) > span', 'awaiting approval', 'rgb(212, 130, 54)', 'rgb(255, 210, 185)')
        //assert Column 5 > Date
        BillingUpsells.assertColumn5Date(' > td:nth-child(5) > span', DateTodayIs.TodayDateDDMMYYYY())
        //assert Column 6 > Submitted by
        BillingUpsells.assertColumn6Submittedby(' > td:nth-child(6) > div', 'LP', 'LoganPaul')
        //assert Column 7 > Action:Review
        BillingUpsells.assertColumn7Action(' > td:nth-child(7) > button', 'not.be.disabled', 'Review')
      })

      ////// BILLING > UPSELLS > TABLE LIST ASSERTIONS ENDS HERE ////////

    })
    it("Testcase ID: CCU0006 - Create upsell request choosing Paid Reviews item and submit", ()=>{


      let GETClientName;
      let clientName;

      //Login using account specialist
      cy.userlogin(loginmodule.EmailAddressInputfield, loginmodule.PasswordInputfield, loginmodule.SigninButton, testdata.userAccounts[0].accountspecialist1, testdata.userAccounts[0].accountspecialistandprojectmanagerpassword)

      //Click the Clients Navigation Module
      cy.get(modulebutton.ClientsModuleButton)
        .click()
        .wait(2000) 

      //Then click then client name link text
      cy.get('table > tbody > tr:first-child > td:nth-child(1) > a')
        .click()
        .wait(3000)

      //GET the current client name that shows as the title
      GETClientName = new Promise((resolve)=>{
        cy.get(clientmodulelocator.ClientNameTitle)
          .then((name)=>{
            clientName = name.text().trim();
          })
      })

      //click the billing tab
      cy.get(clientmodulelocator.ClientMainPageTab[0].BillingTab)
        .click()
        .wait(2000)

      // Click the Upsells sub tab
      cy.get(clientmodulelocator.BillingTabPage[0].PageTabs[0].UpsellsTab)
        .click()
        .wait(2000)
        
      //Click the Create Upsell button
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellButton)
        .click()
        .wait(2000)
        
      //verify the Create Upsell modal
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].modal)
        .should('exist')

      ///////// CREATE UPSELL REQUEST STARTS HERE //////////////

      //Select Upsell item
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UpsellitemAndSelectDropdownmenu)
        .find('select')
        .should('exist')
        .select('REVIEWS')
        .wait(1000)
        .should('have.value', 'REVIEWS')

      //verify that it goes on top option 1
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UpsellitemAndSelectDropdownmenu)
        .find('select option:selected')
        .should('exist')
        .wait(1000)
        .should('have.text', 'Paid Review Program')

      //verify there is Review Fee* Label and Input field
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].ReviewFeeLabelandInputfield)
        .should('exist')
        .and('not.be.disabled')
        .within(()=>{
          //assert label
          cy.get('label')
            .should('exist')
            .and('have.text', 'Review Fee*')
            .find('span').should('have.css', 'color', 'rgb(237, 46, 46)') //asterisk color
          //assert $ symbol 
          cy.get('div > span')
            .should('exist')
            .and('have.text', '$')
            .and('have.css', 'color', 'rgb(148, 148, 148)') //text color
            .and('have.css', 'font-weight', '600') //font bold
          //assert input field
          cy.get('div > input[name="details.reviewFee"]')
            .should('exist')
            .and('not.be.disabled')
            .and('have.value', '25') //default value
        })

      //verify Processing Fee* label and Input field
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].ProcessingFeeLabelandInputfield)
        .should('exist')
        .and('not.be.disabled')
        .within(()=>{
          //assert label
          cy.get('label')
            .should('exist')
            .and('have.text', 'Processing Fee*')
            .find('span').should('have.css', 'color', 'rgb(237, 46, 46)') //asterisk color
          //assert % symbol 
          cy.get('div > span')
            .should('exist')
            .and('have.text', '%')
            .and('have.css', 'color', 'rgb(148, 148, 148)') //text color
            .and('have.css', 'font-weight', '600') //font bold
          //assert input field
          cy.get('div > input[name="details.processingFee"]')
            .should('exist')
            .and('not.be.disabled')
            .and('have.value', '3') //default value
        })

      //verify Tax* label and Input field
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].TaxLabelandInputfield)
        .should('exist')
        .and('not.be.disabled')
        .within(()=>{
          //assert label
          cy.get('label')
            .should('exist')
            .and('have.text', 'Tax*')
            .find('span').should('have.css', 'color', 'rgb(237, 46, 46)') //asterisk color
          //assert % symbol 
          cy.get('div > span')
            .should('exist')
            .and('have.text', '%')
            .and('have.css', 'color', 'rgb(148, 148, 148)') //text color
            .and('have.css', 'font-weight', '600') //font bold
          //assert input field
          cy.get('div > input[name="details.tax"]')
            .should('exist')
            .and('not.be.disabled')
            .and('have.value', '6.8') //default value
        })

      //verify Estimate Completion Date* label and Input field
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].EstimateCompletionDateLabelandInputfield)
        .should('exist')
        .and('not.be.disabled')
        .within(()=>{
          //assert label
          cy.get('label')
            .should('exist')
            .and('have.text', 'Estimate Completion Date*')
            .find('span').should('have.css', 'color', 'rgb(237, 46, 46)') //asterisk color
          //assert input field
          cy.get('input[name="details.completionDate"]')
            .should('exist')
            .and('not.be.disabled')
            .and('have.attr', 'type', 'date')
        })

      //verify Upsell Description
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].PaidReviewProgramUpsellItemDescriptionLabelandTextareafield)
        .should('exist')
        .and('not.be.disabled')
        .within(()=>{
          //assert label
          cy.get('label')
            .should('exist')
            .and('have.text', 'Upsell Description*')
            .find('span').should('have.css', 'color', 'rgb(237, 46, 46)') //asterisk color
          //assert input field
          cy.get('textarea[name="details.description"]')
            .should('exist')
            .and('not.be.disabled')
            .and('have.value', 'This invoice covers the Agency’s services for providing product reviews on Amazon. The reviews will be conducted for the ASINs listed on the billing summary.') //default value
        })

      //Click the Add Asins to Review button
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].PaidReviewProgramADDASINsToReviewButton)
        .scrollIntoView()
        .click()
        .wait(2000)

      // Enter ASIN 1*
      cy.get("input[name='serviceAsins.0.asin']")
        .scrollIntoView()
        .clear()
        .type('asinNumber012')
        .wait(700)
        .should('have.value', 'asinNumber012')

      //verify Quantity* Label and Input field
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].PaidReviewProgramQuantityLabelandInputfield)
        .scrollIntoView()
        .should('exist')
        .and('not.be.disabled')
        .within(()=>{
          //assert label
          cy.get('label')
            .should('exist')
            .and('have.text', 'Quantity*')
            .find('span').should('have.css', 'color', 'rgb(237, 46, 46)') //asterisk color
          //assert input field
          cy.get('input[name="serviceAsins.0.qty"]')
            .should('exist')
            .and('not.be.disabled')
            .and('have.value', '1') //default value
        })

      //verify Unit Price Label and Input field
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].PaidReviewProgramUnitPriceLabelandInputfield)
        .should('exist')
        .and('not.be.disabled')
        .within(()=>{
          //assert label
          cy.get('label')
            .should('exist')
            .and('have.text', 'Unit Price*')
            .find('span').should('have.css', 'color', 'rgb(237, 46, 46)') //asterisk color
          //assert $ symbol 
          cy.get('div > span')
            .should('exist')
            .and('have.text', '$')
            .and('have.css', 'color', 'rgb(148, 148, 148)') //text color
            .and('have.css', 'font-weight', '600') //font bold
          //assert input field
          cy.get('div > input[name="serviceAsins.0.price"]')
            .should('exist')
            .and('not.be.disabled')
            .and('have.value', '0') //default value
        })

      //verify Total Product Cost Label and default value
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].PaidReviewProgramTotalProductCostLabelandDefaultValue)
        .should('exist')
        .within(()=>{
          //assert label
          cy.get('label')
            .should('exist')
            .and('have.text', 'Product Cost')
            .and('have.css', 'color', 'rgb(107, 114, 128)') //text color
          //assert $ 0.00
          cy.get('span')
            .should('exist')
            .then((txt)=>{
              const defaultText = txt.text().replace(/\s+/g, ' ').trim();
              expect(defaultText).to.contain('$ 0.00')
            })
        })

       //verify Total Review Fee Label and default value
       cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].PaidReviewProgramTotalReviewFeeLabelandDefaultValue)
       .should('exist')
       .within(()=>{
         //assert label
         cy.get('label')
           .should('exist')
           .and('have.text', 'Review Fee')
           .and('have.css', 'color', 'rgb(107, 114, 128)') //text color
         //assert $ 0.00
         cy.get('span')
           .should('exist')
           .then((txt)=>{
             const defaultText = txt.text().replace(/\s+/g, ' ').trim();
             expect(defaultText).to.contain('$ 25.00')
           })
       })

      //verify Total Processing Fee and default value
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].PaidReviewProgramTotalProcessingFeeLabelandDefaultValue)
        .should('exist')
        .within(()=>{
          //assert label
          cy.get('label')
            .should('exist')
            .and('have.text', 'Processing Fee')
            .and('have.css', 'color', 'rgb(107, 114, 128)') //text color
          //assert $ 0.00
          cy.get('span')
            .should('exist')
            .then((txt)=>{
              const defaultText = txt.text().replace(/\s+/g, ' ').trim();
              expect(defaultText).to.contain('$ 0.00')
            })
        })

      //verify Total Tax Label and default value
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].PaidReviewProgramTotalTaxLabelandDefaultValue)
        .should('exist')
        .within(()=>{
          //assert label
          cy.get('label')
            .should('exist')
            .and('have.text', 'Tax')
            .and('have.css', 'color', 'rgb(107, 114, 128)') //text color
          //assert $ 0.00
          cy.get('span')
            .should('exist')
            .then((txt)=>{
              const defaultText = txt.text().replace(/\s+/g, ' ').trim();
              expect(defaultText).to.contain('$ 0.00')
            })
        })

      //Now I will set date of Estimated Completion
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].EstimateCompletionDateLabelandInputfield)
        .scrollIntoView()
        .find('input[name="details.completionDate"]')
        .clear()
        .type(DateTodayIs.TodayDateYYYYMMDDWithDashandAddZeroIfNeeded())
        .wait(1000)
        .should('have.value', DateTodayIs.TodayDateYYYYMMDDWithDashandAddZeroIfNeeded())

      //Enter Quantity
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].PaidReviewProgramQuantityLabelandInputfield)
        .find('input[name="serviceAsins.0.qty"]')
        .clear()
        .type('5')
        .wait(700)
        .should('have.value', '5')

      //Enter Unit Price
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].PaidReviewProgramUnitPriceLabelandInputfield)
        .find('div > input[name="serviceAsins.0.price"]')
        .clear()
        .type('10')
        .wait(700)
        .should('have.value', '10')

      //verify the updated value of the Total Product Cost
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].PaidReviewProgramTotalProductCostLabelandDefaultValue)
        .find('span')
        .then((txt)=>{
          const defaultText = txt.text().replace(/\s+/g, ' ').trim();
          expect(defaultText).to.contain('$ 50.00')
        })
      
      //verify the updated value of the Total Processing Fee
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].PaidReviewProgramTotalProcessingFeeLabelandDefaultValue)
        .find('span')
        .then((txt)=>{
          const defaultText = txt.text().replace(/\s+/g, ' ').trim();
          expect(defaultText).to.contain('$ 1.50')
        })

      //verify the updated value of the Total Review Fee
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].PaidReviewProgramTotalReviewFeeLabelandDefaultValue)
        .find('span')
        .then((txt)=>{
          const defaultText = txt.text().replace(/\s+/g, ' ').trim();
          expect(defaultText).to.contain('$ 125.00')
        })

      //verify the updated value of the Total Tax
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].PaidReviewProgramTotalTaxLabelandDefaultValue)
        .find('span')
        .then((txt)=>{
          const defaultText = txt.text().replace(/\s+/g, ' ').trim();
          expect(defaultText).to.contain('$ 3.40')
        })

      //Click Submit Button
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].SubmitButton)
        .click()
        .wait(8000)
      /*
      //verify alert-success message popup
      cy.GETAlertMessagepopup(alertmessagepopup.TopMessage, 'Upsell Created')
      //then i am going to close the alert popup
      cy.get(alertmessagepopup.notificationmessagedeleteicon)
      .click() */
  
      ///////// CREATE UPSELL REQUEST ENDS HERE //////////////

       /////// CLIENT > BILLING > UPSELLS TAB > TABLE VERFICATION STARTS HERE /////////////

      //verify the column names first
      const expected_columnNames = [
        'Service',
        'Invoice',
        'Amount',
        'Status',
        'Date',
        'Submitted By',
        'Updated By',
        'Action'
      ];
      cy.get('table > thead > tr > th').each(($option, index) => {
          cy.wrap($option)
            .should('exist')
            .should('have.text', expected_columnNames[index])  //verify names based on the expected names per column
            .and('have.css', 'color', 'rgb(190, 190, 190)') //text color
          cy.log(expected_columnNames[index]) 
      });
              
      //Then verify the row 1 each columns 
      cy.get('table > tbody > tr:first-child').within(()=>{
        //assert Row 1 column 1 name Service
        UpsellTable.assertColumn1ServiceName(' > td:nth-child(1) > button', 'Paid Review Program')
        //assert Row 1 column 2 name Invoice
        UpsellTable.assertColumn2InvoiceNumber(' > td:nth-child(2)', '—') 
        //assert Row 1 column 3 name Amount
        UpsellTable.assertColumn3Amount(' > td:nth-child(3) > span', '$ 179.90')
        //assert Row 1 column 4 name Status
        UpsellTable.assertColumn4Status(' > td:nth-child(4) > span', 'awaiting approval', 'rgb(212, 130, 54)', 'rgb(255, 210, 185)')
        //assert Row 1 column 5 name Date
        UpsellTable.assertColumn5Date(' > td:nth-child(5) > span', DateTodayIs.TodayDateDDMMYYYY())
        //assert Row 1 column 6 name Submitted By
        UpsellTable.assertColumn6Submittedby(' > td:nth-child(6) > div', 'LP', 'LoganPaul')
        //assert Row 1 column 7 name Updated By
        UpsellTable.assertColumn7UpdatedbyExpectedDASH(' > td:nth-child(7)', '—')
        //assert Row 1 column 8 name Action - has edit button
        UpsellTable.assertColumn8Action(' > td:nth-child(8) > button', 'be.disabled', 'View')
      }) 

      /////// CLIENT > BILLING > UPSELLS TAB > TABLE VERFICATION ENDS HERE /////////////

      //Click the Billing navigation module
      cy.get(modulebutton.BillingModuleButton)
        .click()
        .wait(2000)
        
      //Click the Upsells link text folder
      cy.get(linktextfolder.BillingModule[0].Upsells)
        .click()
        .wait(2000)

      /// Then verify in row 1 table with each columns
      ////// BILLING > UPSELLS > TABLE LIST ASSERTIONS STARTS HERE ////////

      //verify the column names first
      const expectColumnNames = [
        'Service',
        'Client Name',
        'Amount',
        'Status',
        'Date',
        'Submitted By',
        'Action'
      ];
      cy.get('table > thead > tr > th').each(($option, index) => {
          cy.wrap($option)
            .should('exist')
            .should('have.text', expectColumnNames[index])  //verify names based on the expected names per column
            .and('have.css', 'color', 'rgb(190, 190, 190)') //text color
          cy.log(expectColumnNames[index]) 
      });

      cy.get('table > tbody > tr:first-child').within(()=>{
        //assert Column 1 > Service Name / Upsell Name
        BillingUpsells.assertColumn1ServiceName(' > td:nth-child(1) > button', 'Paid Review Program')
        //assert Column 2 > Client Name
        GETClientName.then(()=>{
          BillingUpsells.assertColumn2ClientName(' > td:nth-child(2) > a', clientName)
        }) 
        //assert Column 3 > Amount
        BillingUpsells.assertColumn3Amount(' > td:nth-child(3) > span', '$ 179.90')
        //assert Column 4 > Status
        BillingUpsells.assertColumn4Status(' > td:nth-child(4) > span', 'awaiting approval', 'rgb(212, 130, 54)', 'rgb(255, 210, 185)')
        //assert Column 5 > Date
        BillingUpsells.assertColumn5Date(' > td:nth-child(5) > span', DateTodayIs.TodayDateDDMMYYYY())
        //assert Column 6 > Submitted by
        BillingUpsells.assertColumn6Submittedby(' > td:nth-child(6) > div', 'LP', 'LoganPaul')
        //assert Column 7 > Action:Review
        BillingUpsells.assertColumn7Action(' > td:nth-child(7) > button', 'not.be.disabled', 'Review')
      })

      ////// BILLING > UPSELLS > TABLE LIST ASSERTIONS ENDS HERE ////////

    })
    it("Testcase ID: CCU0007 - Verify Different ASIN label based on the selected upsell item", ()=>{


      //Login using account specialist
      cy.userlogin(loginmodule.EmailAddressInputfield, loginmodule.PasswordInputfield, loginmodule.SigninButton, testdata.userAccounts[0].accountspecialist1, testdata.userAccounts[0].accountspecialistandprojectmanagerpassword)

      //Click the Clients Navigation Module
      cy.get(modulebutton.ClientsModuleButton)
        .click()
        .wait(2000) 

      //Then click then client name link text
      cy.get('table > tbody > tr:first-child > td:nth-child(1) > a')
        .click()
        .wait(3000)

      //click the billing tab
      cy.get(clientmodulelocator.ClientMainPageTab[0].BillingTab)
        .click()
        .wait(2000)

      // Click the Upsells sub tab
      cy.get(clientmodulelocator.BillingTabPage[0].PageTabs[0].UpsellsTab)
        .click()
        .wait(2000)
        
      //Click the Create Upsell button
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellButton)
        .click()
        .wait(2000)
        
      //verify the Create Upsell modal
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].modal)
        .should('exist')

      //Select Upsell item
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UpsellitemAndSelectDropdownmenu)
        .find('select')
        .should('exist')
        .select('REVIEWS')
        .wait(1000)
        .should('have.value', 'REVIEWS')

      //verify that it goes on top option 1
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UpsellitemAndSelectDropdownmenu)
        .find('select option:selected')
        .should('exist')
        .wait(1000)
        .should('have.text', 'Paid Review Program')

      //verify the managed asin label
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].ServiceASINTitle)
        .should('exist')
        .and('contain', 'ASINs to review')
        .and('have.css', 'font-weight', '700')  //font bold

      //change selected upsell item - Walmart Listing Optimization
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UpsellitemAndSelectDropdownmenu)
        .find('select')
        .select('walmart-listing-optimization')
        .wait(1000)
        .should('have.value', 'walmart-listing-optimization')

      //verify that it goes on top option 1
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UpsellitemAndSelectDropdownmenu)
        .find('select option:selected')
        .should('have.text', 'walmart listing optimization')

      //verify again the managed asin label
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].ServiceASINTitle)
        .should('exist')
        .and('be.visible')
        .and('contain', 'Service Items')
        .and('have.css', 'font-weight', '700')  //font bold

      //change selected upsell item - random - Copywriting Work
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UpsellitemAndSelectDropdownmenu)
        .find('select')
        .select('1604151000000147020')
        .wait(1000)
        .should('have.value', '1604151000000147020')

      //verify that it goes on top option 1
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UpsellitemAndSelectDropdownmenu)
        .find('select option:selected')
        .should('have.text', 'Copywriting Work')

      //verify again the managed asin label
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].ServiceASINTitle)
        .should('exist')
        .and('contain', 'Service ASIN')
        .and('have.css', 'font-weight', '700')  //font bold

    })
    it("Testcase ID: CCU0008 - Deny submitted upsell request", ()=>{

      let clientName;
      let GETColumns1Data;
      let serviceName;
      let amountRequest;
      
      //Login using account specialist
      cy.userlogin(loginmodule.EmailAddressInputfield, loginmodule.PasswordInputfield, loginmodule.SigninButton, testdata.userAccounts[0].accountspecialist1, testdata.userAccounts[0].accountspecialistandprojectmanagerpassword)

      //Click the Clients Navigation Module
      cy.get(modulebutton.ClientsModuleButton)
        .click()
        .wait(2000) 

      //Then click then client name link text
      cy.get('table > tbody > tr:first-child > td:nth-child(1) > a')
        .click()
        .wait(3000)

      //click the billing tab
      cy.get(clientmodulelocator.ClientMainPageTab[0].BillingTab)
        .click()
        .wait(2000)

      // Click the Upsells sub tab
      cy.get(clientmodulelocator.BillingTabPage[0].PageTabs[0].UpsellsTab)
        .click()
        .wait(2000)
        
      //Click the Create Upsell button
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellButton)
        .click()
        .wait(2000)
        
      //verify the Create Upsell modal
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].modal)
        .should('exist')

      ///////// CREATE UPSELL REQUEST STARTS HERE //////////////

      //Select Upsell item
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UpsellitemAndSelectDropdownmenu)
        .find('select')
        .should('exist')
        .select('1604151000000147020')
        .wait(1000)
        .should('have.value', '1604151000000147020')

      //verify that it goes on top option 1
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UpsellitemAndSelectDropdownmenu)
        .find('select option:selected')
        .should('exist')
        .wait(1000)
        .should('have.text', 'Copywriting Work')

      //verify Unit Price value updated
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UnitPricelabelAndInputfield)
        .find('.relative > input')
        .should('exist')
        .wait(1000)
        .should('have.value', '97.95')

      //verify Upsell Description value updated
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UpsellDescriptionlabelAndTextareafield)
        .find('textarea')
        .should('exist')
        .wait(1000)
        .should('have.value', 'Copywriting Work')
        
      //Click Submit Button
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].SubmitButton)
        .click()
        .wait(8000)
      /*
      //verify alert-success message popup
      cy.GETAlertMessagepopup(alertmessagepopup.TopMessage, 'Upsell Created')
      //then i am going to close the alert popup
      cy.get(alertmessagepopup.notificationmessagedeleteicon)
      .click() */
  
      ///////// CREATE UPSELL REQUEST ENDS HERE //////////////

      /////// CLIENT > BILLING > UPSELLS TAB > TABLE VERFICATION STARTS HERE /////////////

      //verify the column names first
      const expected_columnNames = [
        'Service',
        'Invoice',
        'Amount',
        'Status',
        'Date',
        'Submitted By',
        'Updated By',
        'Action'
      ];
      cy.get('table > thead > tr > th').each(($option, index) => {
          cy.wrap($option)
            .should('exist')
            .should('have.text', expected_columnNames[index])  //verify names based on the expected names per column
            .and('have.css', 'color', 'rgb(190, 190, 190)') //text color
          cy.log(expected_columnNames[index]) 
      });
              
      //Then verify the row 1 each columns 
      cy.get('table > tbody > tr:first-child').within(()=>{
        //assert Row 1 column 1 name Service
        UpsellTable.assertColumn1ServiceName(' > td:nth-child(1) > button', 'Copywriting Work')
        //assert Row 1 column 2 name Invoice
        UpsellTable.assertColumn2InvoiceNumber(' > td:nth-child(2)', '—') 
        //assert Row 1 column 3 name Amount
        UpsellTable.assertColumn3Amount(' > td:nth-child(3) > span', '$ 97.95')
        //assert Row 1 column 4 name Status
        UpsellTable.assertColumn4Status(' > td:nth-child(4) > span', 'awaiting approval', 'rgb(212, 130, 54)', 'rgb(255, 210, 185)')
        //assert Row 1 column 5 name Date
        UpsellTable.assertColumn5Date(' > td:nth-child(5) > span', DateTodayIs.TodayDateDDMMYYYY())
        //assert Row 1 column 6 name Submitted By
        UpsellTable.assertColumn6Submittedby(' > td:nth-child(6) > div', 'LP', 'LoganPaul')
        //assert Row 1 column 7 name Updated By
        UpsellTable.assertColumn7UpdatedbyExpectedDASH(' > td:nth-child(7)', '—')
        //assert Row 1 column 8 name Action - has edit button
        UpsellTable.assertColumn8Action(' > td:nth-child(8) > button', 'be.disabled', 'View')
      }) 

      /////// CLIENT > BILLING > UPSELLS TAB > TABLE VERFICATION ENDS HERE /////////////
     
      //Click the Billing navigation module
      cy.get(modulebutton.BillingModuleButton)
        .click()
        .wait(2000)
        
      //Click the Upsells link text folder
      cy.get(linktextfolder.BillingModule[0].Upsells)
        .click()
        .wait(2000)

      //prior to executing the deny, I will get the data in Row 1 that I will going to assert later ON at the Billing > Upsells > Rejected Tab Table list
      GETColumns1Data = new Promise((resolve)=>{
        //GET the column 1 Service Name/Upsell Name Request
        cy.get('table > tbody > tr:first-child > td:nth-child(1) > button').then((txt)=>{
          serviceName = txt.text().trim();
        })
        //GET the column 2 Client Name
        cy.get('table > tbody > tr:first-child > td:nth-child(2) > a').then((txt)=>{
          clientName = txt.text().trim();
        })
        //GET the column 3 Amount
        cy.get('table > tbody > tr:first-child > td:nth-child(3) > span').then((col3)=>{
          amountRequest = col3.text().replace(/\s+/g, ' ').trim();
        })
        resolve();
      })
      
      //click the review button
      cy.get('table > tbody > tr:first-child > td:nth-child(7) > button')
        .click()
        .wait(1000)

      //verify Upsell Request modal popup open
      cy.get(billingmodulelocator.UpsellsPage[0].BillingUpsellRequestModal[0].modal)
        .should('exist')

      //verify Upsell Request modal title
      cy.get(billingmodulelocator.UpsellsPage[0].BillingUpsellRequestModal[0].modaltitle)
        .should('exist')
        .and('have.text', ' Upsell Request')
        .and('have.css', 'font-weight', '700') //font bold

      //verify Deny button then click if Found
      cy.get(billingmodulelocator.UpsellsPage[0].BillingUpsellRequestModal[0].DenyButton).scrollIntoView()
        .should('exist')
        .and('not.be.disabled')
        .and('have.text', 'Deny')
        .and('have.css', 'font-weight', '700') //font bold
        .and('have.css', 'color', 'rgb(255, 255, 255)') //text color
        .and('have.css', 'background-color', 'rgb(239, 68, 68)') //background color that form like a capsule
        .and('have.css', 'border-radius', '9999px') // the curve edge of the background color
        .click()
        .wait(3000)

      //verify another modal is open - Let the account manager know why you rejected the upsell request
      cy.get(billingmodulelocator.UpsellsPage[0].LettheaccountmanagerknowwhyyourejectedtheupsellrequestModal[0].modal)
        .should('exist')

      //verify modal title
      cy.get(billingmodulelocator.UpsellsPage[0].LettheaccountmanagerknowwhyyourejectedtheupsellrequestModal[0].modaltitle)
        .should('exist')
        .and('have.text', 'Let the account manager know why you rejected the upsell request')
        .and('have.css', 'font-weight', '700') //font bold

      //verify Reasonf for Rejection * Label and textarea field
      cy.get(billingmodulelocator.UpsellsPage[0].LettheaccountmanagerknowwhyyourejectedtheupsellrequestModal[0].ReasonforRejectionLabelandTextareafield)
        .should('exist')
        .within(()=>{
          //assert label
          cy.get('label')
            .should('exist')
            .and('have.text', 'Reason for rejection *')
            .find('span').should('have.css', 'color', 'rgb(237, 46, 46)') //asterisk color
          //assert textarea field
          cy.get('textarea[name="reason"]')
            .should('exist')
            .and('not.be.disabled')
            .and('have.value', '') //empty by default
            .and('have.attr', 'placeholder', 'Share a reply')
        })

      //verify Cancel button
      cy.get(billingmodulelocator.UpsellsPage[0].LettheaccountmanagerknowwhyyourejectedtheupsellrequestModal[0].CancelButton)
        .should('exist')
        .and('not.be.disabled')
        .and('have.text', 'Cancel')
        .and('have.css', 'color', 'rgb(102, 102, 102)') //text color
        .and('have.css', 'font-weight', '700') //font bold

      //verify Submit button
      cy.get(billingmodulelocator.UpsellsPage[0].LettheaccountmanagerknowwhyyourejectedtheupsellrequestModal[0].SubmitButton)
        .should('exist')
        .and('not.be.disabled')
        .and('have.text', 'Submit')
        .and('have.css', 'color', 'rgb(255, 255, 255)') //text color
        .and('have.css', 'font-weight', '700') //font bold
        .and('have.css', 'background-color', 'rgb(0, 47, 93)') //background color that form like a capsule
        .and('have.css', 'border-radius', '9999px') // the curve edge of the background color

      /////// REQUIRED ASSERTIONS STARTS HERE ///////////

      //without enter any reason data, just click the submit button
      cy.get(billingmodulelocator.UpsellsPage[0].LettheaccountmanagerknowwhyyourejectedtheupsellrequestModal[0].SubmitButton)
        .click()
        .wait(2000)

      //verify the Let the account manager know why you rejected the upsell request modal should remain open
      cy.get(billingmodulelocator.UpsellsPage[0].LettheaccountmanagerknowwhyyourejectedtheupsellrequestModal[0].modal)
        .should('exist')

      //verify Error text appeared - Required
      cy.get('form > div > div > div > div')
        .should('exist')
        .and('have.text', 'Required')
        .and('have.css', 'color', 'rgb(185, 28, 28)') //text color

      //Now Enter Reason for Rejection data
      cy.get(billingmodulelocator.UpsellsPage[0].LettheaccountmanagerknowwhyyourejectedtheupsellrequestModal[0].ReasonforRejectionLabelandTextareafield)
        .find('textarea[name="reason"]')
        .clear()
        .type('I will deny this request as a test to deny an upsell request.')
        .wait(700)
        .should('have.value', 'I will deny this request as a test to deny an upsell request.')

      //At this stage, the Error Text should not exist
      cy.get('form > div > div > div > div')
        .should('not.exist')

      //Click the Submit button
      cy.get(billingmodulelocator.UpsellsPage[0].LettheaccountmanagerknowwhyyourejectedtheupsellrequestModal[0].SubmitButton)
        .click()
        .wait(3000)

      //verify alert-success message popup
      cy.GETAlertMessagepopup(alertmessagepopup.TopMessage, 'Upsell denied')
    
      //click the x button to close the notification message popup
      cy.get('div.p-4 > div.w-full > button.bg-white')
        .click()
        .wait(1000)

      /////// REQUIRED ASSERTIONS ENDS HERE ///////////
        
      //Then as expected it should go to Billing > Upsells > Rejected Tab
      cy.get(billingmodulelocator.UpsellsPage[0].pageTabs[0].RejectedTab)
        .should('exist')
        .and('have.text', 'Rejected')
        .and('have.css', 'color', 'rgb(156, 163, 175)') //default text color
        .click()
        .wait(1000)
        .should('have.css', 'color', 'rgb(24, 121, 216)').and('have.css', 'font-weight', '600') //after it was click

      //verify url destination that it goes to the correct tab
      cy.url().should('contain', '=rejected&filter=name&sizePerPage')

       //// Rejected Tab page Table List Assertions Starts Here ////////////
       cy.get('table > tbody > tr:first-child').within(()=>{
        GETColumns1Data.then(()=>{
          //assert Row 1 column 1 name Service
          BillingUpsells.assertColumn1ServiceName(' > td:nth-child(1) > button', serviceName)
          //assert Row 1 column 2 name Client Name
          BillingUpsells.assertColumn2ClientName(' > td:nth-child(2) > a', clientName)
          //assert Row 1 column 3 name Amount
          BillingUpsells.assertColumn3Amount(' > td:nth-child(3) > span', amountRequest)
        })
        //assert Row 1 column 4 name Status
        BillingUpsells.assertColumn4Status(' > td:nth-child(4) > span', 'rejected', 'rgb(239, 68, 68)', 'rgb(254, 226, 226)')
        //assert Row 1 column 5 name Date
        BillingUpsells.assertColumn5Date(' > td:nth-child(5) > span', DateTodayIs.TodayDateDDMMYYYY())
        //assert Row 1 column 6 name Submitted By
        BillingUpsells.assertColumn6Submittedby(' > td:nth-child(6) > div', 'LP', 'LoganPaul')
        //assert Row 1 column 7 name Rejector
        BillingUpsells.assertColumn7RejectedTabRejector(' > td:nth-child(7) > div', 'LP', 'LoganPaul')
        //assert Row 1 column 8 Action column
        BillingUpsells.assertColumn8Action(' > td:nth-child(8) > button', 'be.disabled', 'View')
      })
      //// Rejected Tab page Table List Assertions Ends Here ////////////

      //I click the Row 1 column 1 Upsell Name link
      cy.get('table > tbody > tr:first-child > td:nth-child(1) > button')
        .click()
        .wait(1000)

      ///// REJECTED TAB > UPSELL REQUEST MODAL ASSERTIONS STARTS HERE //////////

      //verify that the Upsell Request Modal popup
      cy.get(billingmodulelocator.UpsellsPage[0].BillingUpsellRequestModal[0].modal)
        .should('exist')

      //verify Your upsell request was rejected section area
      cy.get(billingmodulelocator.UpsellsPage[0].BillingUpsellRequestModal[0].YourUpsellRequestWasRejectedSection)
        .should('exist')
        .and('have.css', 'background-color', 'rgb(254, 242, 242)')
        .then(($el) => {
          const computedStyle       = getComputedStyle($el[0]);
          const customPropertyValue = computedStyle.getPropertyValue('--tw-bg-opacity').trim();
          expect(customPropertyValue).to.equal('1')
        })
        .within(()=>{
          //assert title section
          cy.get(' > p:nth-child(1)')
            .should('exist')
            .and('have.text', 'Your upsell request was rejected')
            .and('have.css', 'font-weight', '700') // font bold
            .and('have.css', 'color', 'rgb(239, 68, 68)') //text color
          //assert label Rejected By
          cy.get(' > label:nth-child(2)')
            .should('exist')
            .and('have.text', 'Rejected By')
            .and('have.css', 'color', 'rgb(107, 114, 128)') //text color
          //assert the name of the rejector
          cy.get(' > p:nth-child(3)')
            .should('exist')
            .then((txt)=>{
              expect(txt.text().replace(/\s+/g, ' ').trim()).to.equal('Logan Paul')
            })
          //assert label Reason for Rejection
          cy.get(' > label:nth-child(4)')
            .should('exist')
            .and('have.text', 'Reason for rejection')
            .and('have.css', 'color', 'rgb(107, 114, 128)') //text color
          //assert the reason data entered
          cy.get(' > p:nth-child(5)')
            .should('exist')
            .and('have.text', 'I will deny this request as a test to deny an upsell request.')
        })

      //verify status
      cy.get(billingmodulelocator.UpsellsPage[0].BillingUpsellRequestModal[0].StatusLabelandstatus)
        .should('exist')
        .within(()=>{
          //assert Status Label
          cy.get('label')
            .should('exist')
            .and('have.text', 'Status')
            .and('have.css', 'color', 'rgb(107, 114, 128)') //text color
          //assert the status elements
          cy.get('span')
            .should('exist')
            .and('have.text', 'rejected')
            .and('have.css', 'text-transform', 'capitalize')
            .and('have.css', 'color', 'rgb(239, 68, 68)') //text color
            .and('have.css', 'background-color', 'rgb(254, 226, 226)') //background color that form like a capsule
            .and('have.css', 'border-radius', '9999px') //the curve edge of the background color
        })

      ///// REJECTED TAB > UPSELL REQUEST MODAL ASSERTIONS ENDS HERE //////////

      //I will have to close the button so that I may logout
      cy.get('body').type('{esc}'); // pressing esc button of the keyboard

      //Click the Clients Navigation Module
      cy.get(modulebutton.ClientsModuleButton)
        .click()
        .wait(2000) 
 
      //Then click then client name link text
      cy.get('table > tbody > tr:first-child > td:nth-child(1) > a')
        .click()
        .wait(3000)
 
      //click the billing tab
      cy.get(clientmodulelocator.ClientMainPageTab[0].BillingTab)
        .click()
        .wait(2000)
 
      // Click the Upsells sub tab
      cy.get(clientmodulelocator.BillingTabPage[0].PageTabs[0].UpsellsTab)
        .click()
        .wait(2000)

      //// CLIENT > BILLING > UPSELLS TABLE LIST ASSERTIONS STARTS HERE //////////

      cy.get('table > tbody > tr:first-child').within(()=>{
        //assert row 1 column 2 that it should still be only a dash since this upsell request has been denied
        UpsellTable.assertColumn2InvoiceNumber(' > td:nth-child(2)', '—')
        //assert row 1 column 4 the status that it should be Rejected
        UpsellTable.assertColumn4Status(' > td:nth-child(4) > span', 'rejected', 'rgb(239, 68, 68)', 'rgb(254, 226, 226)')
        //assert row 1 column 7 Updated by the name who denied
        UpsellTable.assertColumn7UpdatedbyExpectedName('> td:nth-child(7) > div', 'LP', 'LoganPaul') 
        //assert row 1 column 8 that it should be disabled the view button
        UpsellTable.assertColumn8Action(' > td:nth-child(8) > button', 'be.disabled', 'View')
      })

      //// CLIENT > BILLING > UPSELLS TABLE LIST ASSERTIONS ENDS HERE //////////

      //click the Service / Upsell Name link
      cy.get('table > tbody > tr:first-child > td:nth-child(1) > button')
        .click(0)
        .wait(2000)

      //verify the upsell request modal popup open
      cy.get(cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].modal)
        .should('exist'))

      //verify Your upsell request was rejected section area
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].YourUpsellRequestWasRejectedSection)
        .should('exist')
        .and('have.css', 'background-color', 'rgb(254, 242, 242)')    // background-color area
        .then(($el) => {
          const computedStyle       = getComputedStyle($el[0]);
          const customPropertyValue = computedStyle.getPropertyValue('--tw-bg-opacity').trim();
          expect(customPropertyValue).to.equal('1')
        })
        .within(()=>{
          //assert title section
          cy.get(' > p:nth-child(1)')
            .should('exist')
            .and('have.text', 'Your upsell request was rejected')
            .and('have.css', 'font-weight', '700') // font bold
            .and('have.css', 'color', 'rgb(239, 68, 68)') //text color
          //assert label Rejected By
          cy.get(' > label:nth-child(2)')
            .should('exist')
            .and('have.text', 'Rejected By')
            .and('have.css', 'color', 'rgb(107, 114, 128)') //text color
          //assert the name of the rejector
          cy.get(' > p:nth-child(3)')
            .should('exist')
            .then((txt)=>{
              expect(txt.text().replace(/\s+/g, ' ').trim()).to.equal('Logan Paul')
            })
          //assert label Reason for Rejection
          cy.get(' > label:nth-child(4)')
            .should('exist')
            .and('have.text', 'Reason for rejection')
            .and('have.css', 'color', 'rgb(107, 114, 128)') //text color
          //assert the reason data entered
          cy.get(' > p:nth-child(5)')
            .should('exist')
            .and('have.text', 'I will deny this request as a test to deny an upsell request.')
        })

      //verify status
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].StatusLabelandstatus)
        .should('exist')
        .within(()=>{
          //assert Status Label
          cy.get('label')
            .should('exist')
            .and('have.text', 'Status')
            .and('have.css', 'color', 'rgb(107, 114, 128)') //text color
          //assert the status elements
          cy.get('span')
            .should('exist')
            .and('have.text', 'rejected')
            .and('have.css', 'text-transform', 'capitalize')
            .and('have.css', 'color', 'rgb(239, 68, 68)') //text color
            .and('have.css', 'background-color', 'rgb(254, 226, 226)') //background color that form like a capsule
            .and('have.css', 'border-radius', '9999px') //the curve edge of the background color
        })
    })
    it("Testcase ID: CCU0009 - Approve upsell request", ()=>{

      let GEThrefANDtext;
      let invoiceNumber;

      //Login using account specialist
      cy.userlogin(loginmodule.EmailAddressInputfield, loginmodule.PasswordInputfield, loginmodule.SigninButton, testdata.userAccounts[0].accountspecialist1, testdata.userAccounts[0].accountspecialistandprojectmanagerpassword)

      //Click the Clients Navigation Module
      cy.get(modulebutton.ClientsModuleButton)
        .click()
        .wait(2000) 

      //Then click then client name link text
      cy.get('table > tbody > tr:first-child > td:nth-child(1) > a')
        .click()
        .wait(3000)

      //click the billing tab
      cy.get(clientmodulelocator.ClientMainPageTab[0].BillingTab)
        .click()
        .wait(2000)

      // Click the Upsells sub tab
      cy.get(clientmodulelocator.BillingTabPage[0].PageTabs[0].UpsellsTab)
        .click()
        .wait(2000)
        
      //Click the Create Upsell button
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellButton)
        .click()
        .wait(2000)
        
      //verify the Create Upsell modal
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].modal)
        .should('exist')

      ///////// CREATE UPSELL REQUEST STARTS HERE //////////////

      //Select Upsell item
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UpsellitemAndSelectDropdownmenu)
        .find('select')
        .should('exist')
        .select('1604151000000147020')
        .wait(1000)
        .should('have.value', '1604151000000147020')

      //verify that it goes on top option 1
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UpsellitemAndSelectDropdownmenu)
        .find('select option:selected')
        .should('exist')
        .wait(1000)
        .should('have.text', 'Copywriting Work')

      //verify Unit Price value updated
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UnitPricelabelAndInputfield)
        .find('.relative > input')
        .should('exist')
        .wait(1000)
        .should('have.value', '97.95')

      //verify Upsell Description value updated
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UpsellDescriptionlabelAndTextareafield)
        .find('textarea')
        .should('exist')
        .wait(1000)
        .should('have.value', 'Copywriting Work')
        
      //Click Submit Button
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].SubmitButton)
        .click()
        .wait(8000)
      /*
      //verify alert-success message popup
      cy.GETAlertMessagepopup(alertmessagepopup.TopMessage, 'Upsell Created')
      //then i am going to close the alert popup
      cy.get(alertmessagepopup.notificationmessagedeleteicon)
      .click() */
  
      ///////// CREATE UPSELL REQUEST ENDS HERE //////////////

      /////// CLIENT > BILLING > UPSELLS TAB > TABLE VERFICATION STARTS HERE /////////////

      //verify the column names first
      const expected_columnNames = [
        'Service',
        'Invoice',
        'Amount',
        'Status',
        'Date',
        'Submitted By',
        'Updated By',
        'Action'
      ];
      cy.get('table > thead > tr > th').each(($option, index) => {
          cy.wrap($option)
            .should('exist')
            .should('have.text', expected_columnNames[index])  //verify names based on the expected names per column
            .and('have.css', 'color', 'rgb(190, 190, 190)') //text color
          cy.log(expected_columnNames[index]) 
      });
              
      //Then verify the row 1 each columns 
      cy.get('table > tbody > tr:first-child').within(()=>{
        //assert Row 1 column 1 name Service
        UpsellTable.assertColumn1ServiceName(' > td:nth-child(1) > button', 'Copywriting Work')
        //assert Row 1 column 2 name Invoice
        UpsellTable.assertColumn2InvoiceNumber(' > td:nth-child(2)', '—') 
        //assert Row 1 column 3 name Amount
        UpsellTable.assertColumn3Amount(' > td:nth-child(3) > span', '$ 97.95')
        //assert Row 1 column 4 name Status
        UpsellTable.assertColumn4Status(' > td:nth-child(4) > span', 'awaiting approval', 'rgb(212, 130, 54)', 'rgb(255, 210, 185)')
        //assert Row 1 column 5 name Date
        UpsellTable.assertColumn5Date(' > td:nth-child(5) > span', DateTodayIs.TodayDateDDMMYYYY())
        //assert Row 1 column 6 name Submitted By
        UpsellTable.assertColumn6Submittedby(' > td:nth-child(6) > div', 'LP', 'LoganPaul')
        //assert Row 1 column 7 name Updated By
        UpsellTable.assertColumn7UpdatedbyExpectedDASH(' > td:nth-child(7)', '—')
        //assert Row 1 column 8 name Action - has edit button
        UpsellTable.assertColumn8Action(' > td:nth-child(8) > button', 'be.disabled', 'View')
      }) 

      /////// CLIENT > BILLING > UPSELLS TAB > TABLE VERFICATION ENDS HERE /////////////
     
      //Click the Billing navigation module
      cy.get(modulebutton.BillingModuleButton)
        .click()
        .wait(2000)
        
      //Click the Upsells link text folder
      cy.get(linktextfolder.BillingModule[0].Upsells)
        .click()
        .wait(2000)

      //click the review button at Row 1 column 7
      cy.get('table > tbody > tr:first-child > td:nth-child(7) > button')
        .click()
        .wait(1000)

      //verify Upsell Request modal popup
      cy.get(billingmodulelocator.UpsellsPage[0].BillingUpsellRequestModal[0].modal)
        .should('exist')

      //verify Approve button if found then click
      cy.get(billingmodulelocator.UpsellsPage[0].BillingUpsellRequestModal[0].ApproveButton)
        .scrollIntoView()
        .should('exist')
        .and('not.be.disabled')
        .and('have.text', 'Approve')
        .and('have.css', 'font-weight', '700') //font bold
        .and('have.css', 'color', 'rgb(255, 255, 255)') //text color
        .and('have.css', 'background-color', 'rgb(16, 185, 129)') //background color that form like a capsule
        .and('have.css', 'border-radius', '9999px') // the curve edge of the background color
        .click()
        .wait(3000)

      //verify This upsell request has been approved modal popup
      cy.get(billingmodulelocator.UpsellsPage[0].ThisupsellrequesthasbeenapprovedModal[0].modal)
        .should('exist')

      //verify modal title and check logo
      cy.get(billingmodulelocator.UpsellsPage[0].ThisupsellrequesthasbeenapprovedModal[0].modaltitleandcheckLogo)
        .should('exist')
        .within(()=>{
          //assert modal title
          cy.get(' > div > h3')
            .should('exist')
            .and('not.be.disabled')
            .and('have.text', 'This upsell request has been approved')
            .and('have.css', 'font-weight', '700')  // font bold
          //assert check logo
          cy.get(' > div  > div > span')
            .should('exist')
            .and('have.css', 'border-color', 'rgb(16, 185, 129)') //a circular color
            .find('svg').should('have.css', 'border-color', 'rgb(229, 231, 235)') //check color
        })

      //verify Do you want to send the client the billing summary email? text
      cy.get(billingmodulelocator.UpsellsPage[0].ThisupsellrequesthasbeenapprovedModal[0].DoyouwanttosendtheclientthebillingsummaryemailTEXT)
        .should('exist')
        .and('have.text', 'Do you want to send the client the billing summary email?')
        .and('have.css', 'color', 'rgb(148, 148, 148)')  //text color

      //verify No button
      cy.get(billingmodulelocator.UpsellsPage[0].ThisupsellrequesthasbeenapprovedModal[0].NoButton)
        .should('exist')
        .and('have.text', 'No')
        .and('have.css', 'color', 'rgb(148, 148, 148)')  //text color

      //verify Send Email button
      cy.get(billingmodulelocator.UpsellsPage[0].ThisupsellrequesthasbeenapprovedModal[0].SendEmailButton)
        .should('exist')
        .and('have.text', 'Send Email')
        .and('have.css', 'color', 'rgb(255, 255, 255)')            //text color
        .and('have.css', 'font-weight', '700')                     // font bold
        .and('have.css', 'background-color', 'rgb(16, 185, 129)')  //background color that shape like a capsule
        .and('have.css', 'border-radius', '9999px') 

      //click the Send Email button
      cy.get(billingmodulelocator.UpsellsPage[0].ThisupsellrequesthasbeenapprovedModal[0].SendEmailButton)
        .click()
        .wait(2000)
            
      //verify alert-success message popup
      cy.GETAlertMessagepopup(alertmessagepopup.TopMessage, 'success')

      //click the x button to close the notification message popup
      cy.get('div.p-4 > div.w-full > button.bg-white')
        .click()
        .wait(1000)

      //go to Billing > Upsells > Pending Tab
       //verify Pending Tab then if Found click
       cy.get(billingmodulelocator.UpsellsPage[0].pageTabs[0].PendingTab)
       .should('exist')
       .and('have.text', 'Pending')
       .and('have.css', 'color', 'rgb(156, 163, 175)')  //text color
       .click()
       .wait(700)
       .should('have.css', 'color', 'rgb(24, 121, 216)').and('have.css', 'font-weight', '600') //text color and font bold

      //verify url destinationa after Pending tab is click
      cy.url().should('contain', '=pending')

      //// PENDING TAB PENDING APPROVAL UPSELLS TABLE LIST STARTS HERE /////
      cy.get('table > tbody > tr:first-child').within(()=>{
        //assert row 1 column 4 invoice number should exist and has; also I will get the href link and the exact invoice number for later verification
        BillingUpsells.assertColumn4InvoiceNumber(' > td:nth-child(4) > a')
        //Then here get that Invoice Number and store it in a variable
        GEThrefANDtext = new Promise((resolve)=>{
          cy.get(' > td:nth-child(4) > a')
            .should('exist')
            .and('not.be.disabled')
            .then((txt)=>{
              // Get the text content
              invoiceNumber = txt.text().trim();
            })
            resolve();
        })
        //assert row 1 column 5 status
        BillingUpsells.assertColumn5Status(' > td:nth-child(5) > span', 'pending', 'rgb(245, 158, 11)', 'rgb(254, 243, 199)')
        //assert also at this point that there is no 'seen' text below the status since it is not yet viewed by the client partner
        cy.get(' > td:nth-child(5) > div')
          .should('not.exist')
        //assert row 1 column 9 Action - has Resend button
        BillingUpsells.assertColumn9Action(' > td:nth-child(9) > button', 'not.be.disabled', 'Resend')
      })
      //// PENDING TAB PENDING APPROVAL UPSELLS TABLE LIST ENDS HERE /////
      
      //Click the Clients Navigation Module
      cy.get(modulebutton.ClientsModuleButton)
        .click()
        .wait(2000) 

      //Then click then client name link text
      cy.get('table > tbody > tr:first-child > td:nth-child(1) > a')
        .click()
        .wait(3000)

      //click the billing tab
      cy.get(clientmodulelocator.ClientMainPageTab[0].BillingTab)
        .click()
        .wait(2000)

      // Click the Upsells sub tab
      cy.get(clientmodulelocator.BillingTabPage[0].PageTabs[0].UpsellsTab)
        .click()
        .wait(2000)

      ///// CLIENT > BILLING > UPSELLS TABLE LIST ASSERTIONS STARTS HERE ////////

      cy.get('table > tbody > tr:first-child').within(()=>{
        //assert row 1 column 2 invoice number
        GEThrefANDtext.then(()=>{
          UpsellTablelist.assertColumn2InvoiceNumber(' > td:nth-child(2) > a', invoiceNumber)
        })
        //assert row 1 column 4 status as it should be Pending
        UpsellTable.assertColumn4Status(' > td:nth-child(4) > span', 'pending', 'rgb(245, 158, 11)', 'rgb(254, 243, 199)')
        //assert at this point in time that there is no 'seen' below the status 
        cy.get(' > td:nth-child(4) > div')
          .should('not.exist')
        //assert row 1 column 8 action has resend button
        UpsellTable.assertColumn8Action(' > td:nth-child(8) > button', 'not.be.disabled','Resend')
      })  
      ///// CLIENT > BILLING > UPSELLS TABLE LIST ASSERTIONS ENDS HERE ////////
    })
    it("Testcase ID: CCU00010 - As a client partner, view the approved upsell request", ()=>{

      let GETClientEmailAddress;
      let ClientEmailAddress;
      let GETInvoiceNumber;
      let invoiceNumber;
      let GETinvoiceNumberHREF;
      let InvoiceNumberHREF;


      //Login using account specialist
      cy.userlogin(loginmodule.EmailAddressInputfield, loginmodule.PasswordInputfield, loginmodule.SigninButton, testdata.userAccounts[0].accountspecialist1, testdata.userAccounts[0].accountspecialistandprojectmanagerpassword)

      //Click the Clients Navigation Module
      cy.get(modulebutton.ClientsModuleButton)
        .click()
        .wait(2000) 

      //Then click then client name link text
      cy.get('table > tbody > tr:first-child > td:nth-child(1) > a')
        .click()
        .wait(3000)

      //GET the current email address of the client shown at Client Dashboard > Profile > Overview
      GETClientEmailAddress = new Promise((resolve)=>{
        cy.get(clientmodulelocator.ClientDashboardTabPage[0].ProfileTabpage[0].ClientBasicContactInformationSection[0].ClientEmailAddress)
          .then((email)=>{
            ClientEmailAddress = email.text().trim();
            resolve();
          })
      })

      //click the billing tab
      cy.get(clientmodulelocator.ClientMainPageTab[0].BillingTab)
        .click()
        .wait(2000)

      // Click the Upsells sub tab
      cy.get(clientmodulelocator.BillingTabPage[0].PageTabs[0].UpsellsTab)
        .click()
        .wait(2000)
        
      //Click the Create Upsell button
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellButton)
        .click()
        .wait(2000)
        
      //verify the Create Upsell modal
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].modal)
        .should('exist')

       ///////// CREATE UPSELL REQUEST STARTS HERE //////////////

      //Select Upsell item
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UpsellitemAndSelectDropdownmenu)
        .find('select')
        .should('exist')
        .select('1604151000000147020')
        .wait(1000)
        .should('have.value', '1604151000000147020')

      //verify that it goes on top option 1
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UpsellitemAndSelectDropdownmenu)
        .find('select option:selected')
        .should('exist')
        .wait(1000)
        .should('have.text', 'Copywriting Work')

      //verify Unit Price value updated
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UnitPricelabelAndInputfield)
        .find('.relative > input')
        .should('exist')
        .wait(1000)
        .should('have.value', '97.95')

      //verify Upsell Description value updated
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UpsellDescriptionlabelAndTextareafield)
        .find('textarea')
        .should('exist')
        .wait(1000)
        .should('have.value', 'Copywriting Work')
        
      //Click Submit Button
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].SubmitButton)
        .click()
        .wait(8000)
      /*
      //verify alert-success message popup
      cy.GETAlertMessagepopup(alertmessagepopup.TopMessage, 'Upsell Created')
      //then i am going to close the alert popup
      cy.get(alertmessagepopup.notificationmessagedeleteicon)
      .click() */
  
      ///////// CREATE UPSELL REQUEST ENDS HERE //////////////

      /////// CLIENT > BILLING > UPSELLS TAB > TABLE VERFICATION STARTS HERE /////////////

      //verify the column names first
      const expected_columnNames = [
        'Service',
        'Invoice',
        'Amount',
        'Status',
        'Date',
        'Submitted By',
        'Updated By',
        'Action'
      ];
      cy.get('table > thead > tr > th').each(($option, index) => {
          cy.wrap($option)
            .should('exist')
            .should('have.text', expected_columnNames[index])  //verify names based on the expected names per column
            .and('have.css', 'color', 'rgb(190, 190, 190)') //text color
          cy.log(expected_columnNames[index]) 
      });
              
      //Then verify the row 1 each columns 
      cy.get('table > tbody > tr:first-child').within(()=>{
        //assert Row 1 column 1 name Service
        UpsellTable.assertColumn1ServiceName(' > td:nth-child(1) > button', 'Copywriting Work')
        //assert Row 1 column 2 name Invoice
        UpsellTable.assertColumn2InvoiceNumber(' > td:nth-child(2)', '—') 
        //assert Row 1 column 3 name Amount
        UpsellTable.assertColumn3Amount(' > td:nth-child(3) > span', '$ 97.95')
        //assert Row 1 column 4 name Status
        UpsellTable.assertColumn4Status(' > td:nth-child(4) > span', 'awaiting approval', 'rgb(212, 130, 54)', 'rgb(255, 210, 185)')
        //assert Row 1 column 5 name Date
        UpsellTable.assertColumn5Date(' > td:nth-child(5) > span', DateTodayIs.TodayDateDDMMYYYY())
        //assert Row 1 column 6 name Submitted By
        UpsellTable.assertColumn6Submittedby(' > td:nth-child(6) > div', 'LP', 'LoganPaul')
        //assert Row 1 column 7 name Updated By
        UpsellTable.assertColumn7UpdatedbyExpectedDASH(' > td:nth-child(7)', '—')
        //assert Row 1 column 8 name Action - has edit button
        UpsellTable.assertColumn8Action(' > td:nth-child(8) > button', 'be.disabled', 'View')
      }) 

      /////// CLIENT > BILLING > UPSELLS TAB > TABLE VERFICATION ENDS HERE /////////////
     
      //Click the Billing navigation module
      cy.get(modulebutton.BillingModuleButton)
        .click()
        .wait(2000)
        
      //Click the Upsells link text folder
      cy.get(linktextfolder.BillingModule[0].Upsells)
        .click()
        .wait(2000)

      //click the review button at Row 1 column 7
      cy.get('table > tbody > tr:first-child > td:nth-child(7) > button')
        .click()
        .wait(1000)

      //verify Upsell Request modal popup
      cy.get(billingmodulelocator.UpsellsPage[0].BillingUpsellRequestModal[0].modal)
        .should('exist')

      //Click Approve button
      cy.get(billingmodulelocator.UpsellsPage[0].BillingUpsellRequestModal[0].ApproveButton)
        .click()
        .wait(1000)

      //verify This upsell request has been approved modal popup
      cy.get(billingmodulelocator.UpsellsPage[0].ThisupsellrequesthasbeenapprovedModal[0].modal)
        .should('exist')

      //click the Send Email button
      cy.get(billingmodulelocator.UpsellsPage[0].ThisupsellrequesthasbeenapprovedModal[0].SendEmailButton)
        .click()
        .wait(2000)

      //verify alert-success message popup
      cy.GETAlertMessagepopup(alertmessagepopup.TopMessage, 'success')
      //then i am going to close the alert popup
      cy.get(alertmessagepopup.notificationmessagedeleteicon)
        .click()

      //go to Billing > Upsells > Pending Tab
      //Click Pending Tab
      cy.get(billingmodulelocator.UpsellsPage[0].pageTabs[0].PendingTab)
        .click()
        .wait(2000)

      //verify url destinationa after Pending tab is click
      cy.url().should('contain', '=pending')

      //// PENDING TAB PENDING APPROVAL UPSELLS TABLE LIST STARTS HERE /////

      //Then here I have to click the Date column so that the recently approved goes to row 1
      cy.get('table >thead > tr > th:nth-child(6)')
        .click()
        .wait(2000)

      cy.get('table > tbody > tr:first-child').within(()=>{
        //assert Column 1 > Service Name/Upsell Name Request
        BillingUpsells.assertColumn1ServiceName(' > td:nth-child(1) > button', 'Copywriting Work')
        //assert row 1 column 4 invoice number should exist and has; also I will get the href link and the exact invoice number for later verification
        BillingUpsells.assertColumn4InvoiceNumber(' > td:nth-child(4) > a')
        //Then here get the Invoice Number and store it in a variable
        GETInvoiceNumber = new Promise((resolve)=>{
          cy.get(' > td:nth-child(4) > a')
            .should('exist')
            .and('not.be.disabled')
            .then((txt)=>{
              // Get the text content
              invoiceNumber = txt.text().trim();
            })
            resolve();
        })
        //assert row 1 column 5 status
        BillingUpsells.assertColumn5Status(' > td:nth-child(5) > span', 'pending', 'rgb(245, 158, 11)', 'rgb(254, 243, 199)')
        //assert also at this point that there is no 'seen' text below the status since it is not yet viewed by the client partner
        cy.get(' > td:nth-child(5) > div')
          .should('not.exist')
        //assert row 1 column 9 Action - has Resend button
        BillingUpsells.assertColumn9Action(' > td:nth-child(9) > button', 'not.be.disabled', 'Resend')
      })
      //// PENDING TAB PENDING APPROVAL UPSELLS TABLE LIST ENDS HERE /////

      //Click the Clients Navigation Module
      cy.get(modulebutton.ClientsModuleButton)
        .click()
        .wait(2000) 

      //Then click then client name link text
      cy.get('table > tbody > tr:first-child > td:nth-child(1) > a')
        .click()
        .wait(3000)

      //click the billing tab
      cy.get(clientmodulelocator.ClientMainPageTab[0].BillingTab)
        .click()
        .wait(2000)

      // Click the Upsells sub tab
      cy.get(clientmodulelocator.BillingTabPage[0].PageTabs[0].UpsellsTab)
        .click()
        .wait(2000)
        
      ///// CLIENT > BILLING > UPSELLS TABLE LIST ASSERTIONS STARTS HERE ////////

      cy.get('table > tbody > tr:first-child').within(()=>{
        //assert row 1 column 2 invoice number
        GETInvoiceNumber.then(()=>{
          UpsellTable.assertColumn2InvoiceNumber(' > td:nth-child(2) > a', invoiceNumber)
        })
        //assert row 1 column 4 status as it should be Pending
        UpsellTable.assertColumn4Status(' > td:nth-child(4) > span', 'pending', 'rgb(245, 158, 11)', 'rgb(254, 243, 199)')
        //assert at this point in time that there is no 'seen' below the status 
        cy.get(' > td:nth-child(4) > div')
          .should('not.exist')
        //assert row 1 column 8 action has resend button
        UpsellTable.assertColumn8Action(' > td:nth-child(8) > button', 'not.be.disabled','Resend')
      })  
      ///// CLIENT > BILLING > UPSELLS TABLE LIST ASSERTIONS ENDS HERE ////////

      //logout as account specialist
      //click the user account profile 
      cy.get(testdata.AccountProfileSection[0].useraccountprofilepicinitial)
        .click()

      //click the sign out link text
      cy.get(testdata.AccountProfileSection[0].signoutlinktext)
        .click()
        .wait(10000)

      //Then login as client partner   
      cy.get('#root').then(()=>{
        GETClientEmailAddress.then(()=>{
          cy.userlogin(loginmodule.EmailAddressInputfield, loginmodule.PasswordInputfield, loginmodule.SigninButton, ClientEmailAddress, 'qatesting123')
        })
      })

      //click the Invoice nav button
      cy.get(clientpartnerpage.ClientInvoicesnavlink)
        .click()
        .wait(2000)

      //verify expected url destination which is the Additional Services page
      cy.url().should('contain', '/additional-services')

      // When a user click the Invoices Module, it goes right away to Additional Services folder page and then view the Pending tab

      ////////// ADDITIONAL SERVIECS > PENDING TAB > TABLE LIST ASSERTIONS STARTS HERE //////////////

      //verify the expected column names in the table
      const expectedcolumnNames = [
        'Invoice Number',
        'Service',
        'Amount',
        'Status',
        'Date',
        'Action'
      ];
      cy.get('table > thead > tr > th').each(($columnNames, index) => {
          cy.wrap($columnNames).should('have.text', expectedcolumnNames[index]) //verify names based on the expected options
            .should('exist')
            .and('be.visible')
            .then(($el) => {
              const computedStyle       = getComputedStyle($el[0]);
              const customPropertyValue = computedStyle.getPropertyValue('--tw-text-opacity').trim();
              expect(customPropertyValue).to.equal('1')
            })
            cy.log(expectedcolumnNames[index]) 
      });

      //verify row 1 since it is the target pending approved upsell request
      cy.get('table > tbody > tr:first-child').within(()=>{
        //assert row 1 column 1 Invoice Number
        cy.get(' > td:nth-child(1) > a').then(()=>{
          GETInvoiceNumber.then(()=>{
            AdditionalServiceTableList.assertColumn1InvoiceNumber(' > td:nth-child(1) > a', invoiceNumber)
          })
        })
        //For verification when I click the view button, I will get the href link of the Invoice Number
        GETinvoiceNumberHREF = new Promise((resolve)=>{
          cy.get(' > td:nth-child(1) > a').invoke('attr', 'href').then(hrefValue =>{
            InvoiceNumberHREF = hrefValue;
            cy.log('dasdasdsad '+InvoiceNumberHREF)
          })
        })
        //assert row 1 column 2 Service
        AdditionalServiceTableList.assertColumn2Service('> td:nth-child(2) > span', 'Copywriting Work')
        //assert row 1 column 3 Amount
        AdditionalServiceTableList.assertColumn3Amount(' > td:nth-child(3) > span', '$ 97.95')
        //assert row 1 column 4 Status
        AdditionalServiceTableList.assertColumn4Status(' > td:nth-child(4)  > span', 'pending', 'rgb(245, 158, 11)', 'rgb(254, 243, 199)')
        //assert row 1 column 5 Date
        AdditionalServiceTableList.assertColumn5Date(' > td:nth-child(5)  > span', DateTodayIs.TodayDateDDMMYYYY())
        //assert row 1 column 6 Action has view button
        AdditionalServiceTableList.assertColumn6Action(' > td:nth-child(6) > a', 'not.be.disabled', 'View')
      })
      ////////// ADDITIONAL SERVIECS > PENDING TAB > TABLE LIST ASSERTIONS ENDS HERE //////////////

      //click the view button
      cy.get('table > tbody > tr:first-child > td:nth-child(6) > a')
        .click()
        .wait(2000)

      //Then verify correct destination after the view button is clicked
      cy.get('body').then(()=>{
        GETinvoiceNumberHREF.then(()=>{
          cy.url().should('contain', InvoiceNumberHREF)
        })
      })

      //verify Invoice Number title
      cy.get('div > h3')
        .should('exist')
        .and('have.css', 'font-weight', '700')  //font bold
        .then((el)=>{
          const invoiceNumberTitle = el.text().trim();
          GETInvoiceNumber.then(()=>{
            expect(invoiceNumberTitle).to.equal(invoiceNumber);
          })
        })

      //verify status
      cy.get('div.items-center > span.capitalize')
        .should('exist')
        .and('have.text', 'Pending')
        .and('have.css', 'color', 'rgb(245, 158, 11)')  //text color
        .and('have.css', 'background-color', 'rgb(254, 243, 199)') //background color
        .and('have.css', 'border-radius', '9999px')

      //logout as Client Partner 
      //click the user account profile 
      cy.get(testdata.AccountProfileSection[0].useraccountprofilepicinitial)
        .click()

      //click the sign out link text
      cy.get(testdata.AccountProfileSection[0].signoutlinktext)
        .click()
        .wait(10000)

      //Login using account specialist
      cy.userlogin(loginmodule.EmailAddressInputfield, loginmodule.PasswordInputfield, loginmodule.SigninButton, testdata.userAccounts[0].accountspecialist1, testdata.userAccounts[0].accountspecialistandprojectmanagerpassword)

      //Click the Clients Navigation Module
      cy.get(modulebutton.ClientsModuleButton)
        .click()
        .wait(2000) 

      //Then click then client name link text
      cy.get('table > tbody > tr:first-child > td:nth-child(1) > a')
        .click()
        .wait(3000)

      //click the billing tab
      cy.get(clientmodulelocator.ClientMainPageTab[0].BillingTab)
        .click()
        .wait(2000)

      // Click the Upsells sub tab
      cy.get(clientmodulelocator.BillingTabPage[0].PageTabs[0].UpsellsTab)
        .click()
        .wait(2000)

      //verify in the same approved upsell request under the status there there will be a 'seen' label
      cy.get('table > tbody > tr:first-child > td:nth-child(4) > div')
        .should('exist')
        .within(()=>{
          //assert the check mark 
          cy.get('svg')
            .should('exist')
            .and('have.css', 'color', 'rgb(0, 186, 136)') //text color
          //assert the word seen
          cy.get('p')
            .should('exist')
            .and('have.text', 'seen')
            .and('have.css', 'color', 'rgb(0, 186, 136)') //text color
        })  

    })
    it.skip("Testcase ID: CCU00011 - Client paid the approved upsell request", ()=>{

    })
    it("Testcase ID: CCU00012 - Approve upsell request but don’t send the email", ()=>{


      let GETClientName;
      let clientName;

      //Login using account specialist
      cy.userlogin(loginmodule.EmailAddressInputfield, loginmodule.PasswordInputfield, loginmodule.SigninButton, testdata.userAccounts[0].accountspecialist1, testdata.userAccounts[0].accountspecialistandprojectmanagerpassword)

      //Click the Clients Navigation Module
      cy.get(modulebutton.ClientsModuleButton)
        .click()
        .wait(2000) 

      //Then click then client name link text
      cy.get('table > tbody > tr:first-child > td:nth-child(1) > a')
        .click()
        .wait(3000)

      //GET the current client name that shows as the title
      GETClientName = new Promise((resolve)=>{
        cy.get(clientmodulelocator.ClientNameTitle)
          .then((name)=>{
            clientName = name.text().trim();
          })
      })

      //click the billing tab
      cy.get(clientmodulelocator.ClientMainPageTab[0].BillingTab)
        .click()
        .wait(2000)

      // Click the Upsells sub tab
      cy.get(clientmodulelocator.BillingTabPage[0].PageTabs[0].UpsellsTab)
        .click()
        .wait(2000)
        
      //Click the Create Upsell button
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellButton)
        .click()
        .wait(2000)
        
      //verify the Create Upsell modal
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].modal)
        .should('exist')

      ///////// CREATE UPSELL REQUEST STARTS HERE //////////////

      //Select Upsell item
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UpsellitemAndSelectDropdownmenu)
        .find('select')
        .should('exist')
        .select('1604151000000147020')
        .wait(1000)
        .should('have.value', '1604151000000147020')

      //verify that it goes on top option 1
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UpsellitemAndSelectDropdownmenu)
        .find('select option:selected')
        .should('exist')
        .wait(1000)
        .should('have.text', 'Copywriting Work')

      //verify Unit Price value updated
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UnitPricelabelAndInputfield)
        .find('.relative > input')
        .should('exist')
        .wait(1000)
        .should('have.value', '97.95')

      //verify Upsell Description value updated
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UpsellDescriptionlabelAndTextareafield)
        .find('textarea')
        .should('exist')
        .wait(1000)
        .should('have.value', 'Copywriting Work')
        
      //Click Submit Button
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].SubmitButton)
        .click()
        .wait(8000)
      /*
      //verify alert-success message popup
      cy.GETAlertMessagepopup(alertmessagepopup.TopMessage, 'Upsell Created')
      //then i am going to close the alert popup
      cy.get(alertmessagepopup.notificationmessagedeleteicon)
      .click() */
  
      ///////// CREATE UPSELL REQUEST ENDS HERE //////////////

      /////// CLIENT > BILLING > UPSELLS TAB > TABLE VERFICATION STARTS HERE /////////////

      //verify the column names first
      const expected_columnNames = [
        'Service',
        'Invoice',
        'Amount',
        'Status',
        'Date',
        'Submitted By',
        'Updated By',
        'Action'
      ];
      cy.get('table > thead > tr > th').each(($option, index) => {
          cy.wrap($option)
            .should('exist')
            .should('have.text', expected_columnNames[index])  //verify names based on the expected names per column
            .and('have.css', 'color', 'rgb(190, 190, 190)') //text color
          cy.log(expected_columnNames[index]) 
      });
              
      //Then verify the row 1 each columns 
      cy.get('table > tbody > tr:first-child').within(()=>{
        //assert Row 1 column 1 name Service
        UpsellTable.assertColumn1ServiceName(' > td:nth-child(1) > button', 'Copywriting Work')
        //assert Row 1 column 2 name Invoice
        UpsellTable.assertColumn2InvoiceNumber(' > td:nth-child(2)', '—') 
        //assert Row 1 column 3 name Amount
        UpsellTable.assertColumn3Amount(' > td:nth-child(3) > span', '$ 97.95')
        //assert Row 1 column 4 name Status
        UpsellTable.assertColumn4Status(' > td:nth-child(4) > span', 'awaiting approval', 'rgb(212, 130, 54)', 'rgb(255, 210, 185)')
        //assert Row 1 column 5 name Date
        UpsellTable.assertColumn5Date(' > td:nth-child(5) > span', DateTodayIs.TodayDateDDMMYYYY())
        //assert Row 1 column 6 name Submitted By
        UpsellTable.assertColumn6Submittedby(' > td:nth-child(6) > div', 'LP', 'LoganPaul')
        //assert Row 1 column 7 name Updated By
        UpsellTable.assertColumn7UpdatedbyExpectedDASH(' > td:nth-child(7)', '—')
        //assert Row 1 column 8 name Action - has edit button
        UpsellTable.assertColumn8Action(' > td:nth-child(8) > button', 'be.disabled', 'View')
      }) 

      /////// CLIENT > BILLING > UPSELLS TAB > TABLE VERFICATION ENDS HERE /////////////

      //Click the Billing navigation module
      cy.get(modulebutton.BillingModuleButton)
        .click()
        .wait(2000)
        
      //Click the Upsells link text folder
      cy.get(linktextfolder.BillingModule[0].Upsells)
        .click()
        .wait(2000)

      //It is expected that it goes straight onto Upsells >Awaiting Approval Tab page
      
      /// Then verify in row 1 table with each columns
      ////// BILLING > UPSELLS > TABLE LIST ASSERTIONS STARTS HERE ////////

      //verify the column names first
      const expectColumnNames = [
        'Service',
        'Client Name',
        'Amount',
        'Status',
        'Date',
        'Submitted By',
        'Action'
      ];
      cy.get('table > thead > tr > th').each(($option, index) => {
          cy.wrap($option)
            .should('exist')
            .should('have.text', expectColumnNames[index])  //verify names based on the expected names per column
            .and('have.css', 'color', 'rgb(190, 190, 190)') //text color
          cy.log(expectColumnNames[index]) 
      });

      cy.get('table > tbody > tr:first-child').within(()=>{
        //assert Column 1 > Service Name / Upsell Name
        BillingUpsells.assertColumn1ServiceName(' > td:nth-child(1) > button', 'Copywriting Work')
        //assert Column 2 > Client Name
        GETClientName.then(()=>{
          BillingUpsells.assertColumn2ClientName(' > td:nth-child(2) > a', clientName)
        }) 
        //assert Column 3 > Amount
        BillingUpsells.assertColumn3Amount(' > td:nth-child(3) > span', '$ 97.95')
        //assert Column 4 > Status
        BillingUpsells.assertColumn4Status(' > td:nth-child(4) > span', 'awaiting approval', 'rgb(212, 130, 54)', 'rgb(255, 210, 185)')
        //assert Column 5 > Date
        BillingUpsells.assertColumn5Date(' > td:nth-child(5) > span', DateTodayIs.TodayDateDDMMYYYY())
        //assert Column 6 > Submitted by
        BillingUpsells.assertColumn6Submittedby(' > td:nth-child(6) > div', 'LP', 'LoganPaul')
        //assert Column 7 > Action:Review
        BillingUpsells.assertColumn7Action(' > td:nth-child(7) > button', 'not.be.disabled', 'Review')
      })

      ////// BILLING > UPSELLS > TABLE LIST ASSERTIONS ENDS HERE ////////

      //click the review button at Row 1 column 7
      cy.get('table > tbody > tr:first-child > td:nth-child(7) > button')
        .click()
        .wait(1000)

      //verify Upsell Request modal popup
      cy.get(billingmodulelocator.UpsellsPage[0].BillingUpsellRequestModal[0].modal)
        .should('exist')

      //Click Approve button
      cy.get(billingmodulelocator.UpsellsPage[0].BillingUpsellRequestModal[0].ApproveButton)
        .click()
        .wait(1000)

      //verify This upsell request has been approved modal popup
      cy.get(billingmodulelocator.UpsellsPage[0].ThisupsellrequesthasbeenapprovedModal[0].modal)
        .should('exist')

      ////click the Send No button
      cy.get(billingmodulelocator.UpsellsPage[0].ThisupsellrequesthasbeenapprovedModal[0].NoButton)
        .click()
        .wait(2000)

      //As expected it goes to Billing > Upsells > Approved Tab
      //click the Approved Tab
      cy.get(billingmodulelocator.UpsellsPage[0].pageTabs[0].ApprovedTab)
        .click()
        .wait(2000)

      //verify url destination to check if it goes to the Approved tab
      cy.url().should('contain', 'approved&filter')

      //// APPROVED TAB UPSELLS TABLE LIST STARTS HERE /////

      cy.get('table > tbody > tr:first-child').within(()=>{
        //assert row 1 column 1 Service Name
        BillingUpsells.assertColumn1ServiceName(' > td:nth-child(1) > button', 'Copywriting Work')
        //assert row 1 column 2 Client Name
        cy.get(' > td:nth-child(2) > a')
          .should('exist')
          .then(()=>{
            GETClientName.then(()=>{
              BillingUpsells.assertColumn2ClientName(' > td:nth-child(2) > a', clientName)
          }) 
        })  
        //assert Row 1 column 3 name Amount
        BillingUpsells.assertColumn3Amount(' > td:nth-child(3) > span', '$ 97.95')
        //assert Row 1 column 4 name Status
        BillingUpsells.assertColumn4Status(' > td:nth-child(4) > span', 'approved', 'rgb(59, 130, 246)', 'rgb(219, 234, 254)')
        //assert Row 1 column 5 name Date
        BillingUpsells.assertColumn5Date(' > td:nth-child(5) > span', DateTodayIs.TodayDateDDMMYYYY())
        //assert Row 1 column 6 name Submitted By
        BillingUpsells.assertColumn6Submittedby(' > td:nth-child(6) > div', 'LP', 'LoganPaul')
        //assert Row 1 column 7 name Approver
        BillingUpsells.assertColumn7Approver(' > td:nth-child(7) > div', 'PK', 'PeterKanluran')
        //assert Row 1 column 8 Action has Send
        BillingUpsells.assertColumn8Action(' > td:nth-child(8) > button', 'not.be.disabled', 'Send')
      })

      //// APPROVED TAB UPSELLS TABLE LIST ENDS HERE /////

      //Click the Clients Navigation Module
      cy.get(modulebutton.ClientsModuleButton)
        .click()
        .wait(2000) 
 
      //Then click then client name link text
      cy.get('table > tbody > tr:first-child > td:nth-child(1) > a')
        .click()
        .wait(3000)
 
      //click the billing tab
      cy.get(clientmodulelocator.ClientMainPageTab[0].BillingTab)
        .click()
        .wait(2000)
 
      // Click the Upsells sub tab
      cy.get(clientmodulelocator.BillingTabPage[0].PageTabs[0].UpsellsTab)
        .click()
        .wait(2000)

      ///// CLIENT > BILLING > UPSELLS TABLE LIST ASSERTIONS STARTS HERE ////////

      cy.get('table > tbody > tr:first-child').within(()=>{
        //assert row 1 column 2 Invoice Number as at this time it should be a dash character
        UpsellTable.assertColumn2InvoiceNumber(' > td:nth-child(2)', '—')
        //assert row 1 column 4 status as it should be Approved
        UpsellTable.assertColumn4Status(' > td:nth-child(4) > span', 'approved', 'rgb(59, 130, 246)', 'rgb(219, 234, 254)')
        //assert row 1 column 7 Updated by the approver
        UpsellTable.assertColumn7UpdatedbyExpectedName('> td:nth-child(7) > div', 'PK', 'PeterKanluran')
        //assert row 1 column 8 action has resend button
        UpsellTable.assertColumn8Action(' > td:nth-child(8) > button', 'not.be.disabled','Send')
      })

      ///// CLIENT > BILLING > UPSELLS TABLE LIST ASSERTIONS ENDS HERE ////////        

    })
    it("Testcase ID: CCU00013 - Send the Email feature via the Account Specialist", ()=>{


      let GETClientName;
      let clientName;
      let GETclientEmailAddress;
      let clientEmailAddress;
      let GETInvoiceNumber;
      let thisInvoiceNumber;

      //Login using account specialist
      cy.userlogin(loginmodule.EmailAddressInputfield, loginmodule.PasswordInputfield, loginmodule.SigninButton, testdata.userAccounts[0].accountspecialist1, testdata.userAccounts[0].accountspecialistandprojectmanagerpassword)

      //Click the Clients Navigation Module
      cy.get(modulebutton.ClientsModuleButton)
        .click()
        .wait(2000) 

      //Then click then client name link text
      cy.get('table > tbody > tr:first-child > td:nth-child(1) > a')
        .click()
        .wait(3000)

      //GET the current client name that shows as the title
      GETClientName = new Promise((resolve)=>{
        cy.get(clientmodulelocator.ClientNameTitle)
          .then((name)=>{
            clientName = name.text().trim();
          })
      })

      //I will have to get firs the client email address for later use
      GETclientEmailAddress = new Promise((resolve)=>{
        cy.get(clientmodulelocator.ClientDashboardTabPage[0].ProfileTabpage[0].ClientBasicContactInformationSection[0].ClientEmailAddress)
          .then((email)=>{
            clientEmailAddress = email.text().trim();
            resolve();
          })
      })

      //click the billing tab
      cy.get(clientmodulelocator.ClientMainPageTab[0].BillingTab)
        .click()
        .wait(2000)

      // Click the Upsells sub tab
      cy.get(clientmodulelocator.BillingTabPage[0].PageTabs[0].UpsellsTab)
        .click()
        .wait(2000)
        
      //Click the Create Upsell button
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellButton)
        .click()
        .wait(1000)
        
      //verify the Create Upsell modal
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].modal)
        .should('exist')

      ///////// CREATE UPSELL REQUEST STARTS HERE //////////////

      //Select Upsell item
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UpsellitemAndSelectDropdownmenu)
        .find('select')
        .should('exist')
        .select('1604151000000147020')
        .wait(1000)
        .should('have.value', '1604151000000147020')

      //verify that it goes on top option 1
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UpsellitemAndSelectDropdownmenu)
        .find('select option:selected')
        .should('exist')
        .wait(1000)
        .should('have.text', 'Copywriting Work')

      //verify Unit Price value updated
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UnitPricelabelAndInputfield)
        .find('.relative > input')
        .should('exist')
        .wait(1000)
        .should('have.value', '97.95')

      //verify Upsell Description value updated
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UpsellDescriptionlabelAndTextareafield)
        .find('textarea')
        .should('exist')
        .wait(1000)
        .should('have.value', 'Copywriting Work')
        
      //Click Submit Button
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].SubmitButton)
        .click()
        .wait(8000)
      /*
      //verify alert-success message popup
      cy.GETAlertMessagepopup(alertmessagepopup.TopMessage, 'Upsell Created')
      //then i am going to close the alert popup
      cy.get(alertmessagepopup.notificationmessagedeleteicon)
      .click() */
  
      ///////// CREATE UPSELL REQUEST ENDS HERE //////////////

      /////// CLIENT > BILLING > UPSELLS TAB > TABLE VERFICATION STARTS HERE /////////////

      //verify the column names first
      const expected_columnNames = [
        'Service',
        'Invoice',
        'Amount',
        'Status',
        'Date',
        'Submitted By',
        'Updated By',
        'Action'
      ];
      cy.get('table > thead > tr > th').each(($option, index) => {
          cy.wrap($option)
            .should('exist')
            .should('have.text', expected_columnNames[index])  //verify names based on the expected names per column
            .and('have.css', 'color', 'rgb(190, 190, 190)') //text color
          cy.log(expected_columnNames[index]) 
      });
              
      //Then verify the row 1 each columns 
      cy.get('table > tbody > tr:first-child').within(()=>{
        //assert Row 1 column 1 name Service
        UpsellTable.assertColumn1ServiceName(' > td:nth-child(1) > button', 'Copywriting Work')
        //assert Row 1 column 2 name Invoice
        UpsellTable.assertColumn2InvoiceNumber(' > td:nth-child(2)', '—') 
        //assert Row 1 column 3 name Amount
        UpsellTable.assertColumn3Amount(' > td:nth-child(3) > span', '$ 97.95')
        //assert Row 1 column 4 name Status
        UpsellTable.assertColumn4Status(' > td:nth-child(4) > span', 'awaiting approval', 'rgb(212, 130, 54)', 'rgb(255, 210, 185)')
        //assert Row 1 column 5 name Date
        UpsellTable.assertColumn5Date(' > td:nth-child(5) > span', DateTodayIs.TodayDateDDMMYYYY())
        //assert Row 1 column 6 name Submitted By
        UpsellTable.assertColumn6Submittedby(' > td:nth-child(6) > div', 'LP', 'LoganPaul')
        //assert Row 1 column 7 name Updated By
        UpsellTable.assertColumn7UpdatedbyExpectedDASH(' > td:nth-child(7)', '—')
        //assert Row 1 column 8 name Action - has edit button
        UpsellTable.assertColumn8Action(' > td:nth-child(8) > button', 'be.disabled', 'View')
      }) 

      /////// CLIENT > BILLING > UPSELLS TAB > TABLE VERFICATION ENDS HERE /////////////

      //Click the Billing navigation module
      cy.get(modulebutton.BillingModuleButton)
        .click()
        .wait(2000)
        
      //Click the Upsells link text folder
      cy.get(linktextfolder.BillingModule[0].Upsells)
        .click()
        .wait(2000)

      //It is expected that it goes straight onto Upsells >Awaiting Approval Tab page
      
      /// Then verify in row 1 table with each columns
      ////// BILLING > UPSELLS > TABLE LIST ASSERTIONS STARTS HERE ////////

      //verify the column names first
      const expectColumnNames = [
        'Service',
        'Client Name',
        'Amount',
        'Status',
        'Date',
        'Submitted By',
        'Action'
      ];
      cy.get('table > thead > tr > th').each(($option, index) => {
          cy.wrap($option)
            .should('exist')
            .should('have.text', expectColumnNames[index])  //verify names based on the expected names per column
            .and('have.css', 'color', 'rgb(190, 190, 190)') //text color
          cy.log(expectColumnNames[index]) 
      });

      cy.get('table > tbody > tr:first-child').within(()=>{
        //assert Column 1 > Service Name / Upsell Name
        BillingUpsells.assertColumn1ServiceName(' > td:nth-child(1) > button', 'Copywriting Work')
        //assert Column 2 > Client Name
        GETClientName.then(()=>{
          BillingUpsells.assertColumn2ClientName(' > td:nth-child(2) > a', clientName)
        }) 
        //assert Column 3 > Amount
        BillingUpsells.assertColumn3Amount(' > td:nth-child(3) > span', '$ 97.95')
        //assert Column 4 > Status
        BillingUpsells.assertColumn4Status(' > td:nth-child(4) > span', 'awaiting approval', 'rgb(212, 130, 54)', 'rgb(255, 210, 185)')
        //assert Column 5 > Date
        BillingUpsells.assertColumn5Date(' > td:nth-child(5) > span', DateTodayIs.TodayDateDDMMYYYY())
        //assert Column 6 > Submitted by
        BillingUpsells.assertColumn6Submittedby(' > td:nth-child(6) > div', 'LP', 'LoganPaul')
        //assert Column 7 > Action:Review
        BillingUpsells.assertColumn7Action(' > td:nth-child(7) > button', 'not.be.disabled', 'Review')
      })

      ////// BILLING > UPSELLS > TABLE LIST ASSERTIONS ENDS HERE ////////

      //click the review button at Row 1 column 7
      cy.get('table > tbody > tr:first-child > td:nth-child(7) > button')
        .click()
        .wait(1000)

      //verify Upsell Request modal popup
      cy.get(billingmodulelocator.UpsellsPage[0].BillingUpsellRequestModal[0].modal)
        .should('exist')

      //Click Approve button
      cy.get(billingmodulelocator.UpsellsPage[0].BillingUpsellRequestModal[0].ApproveButton)
        .click()
        .wait(1000)

      //verify This upsell request has been approved modal popup
      cy.get(billingmodulelocator.UpsellsPage[0].ThisupsellrequesthasbeenapprovedModal[0].modal)
        .should('exist')

      ////click the Send No button
      cy.get(billingmodulelocator.UpsellsPage[0].ThisupsellrequesthasbeenapprovedModal[0].NoButton)
        .click()
        .wait(2000)

      //As expected it goes to Billing > Upsells > Approved Tab
      //click the Approved Tab
      cy.get(billingmodulelocator.UpsellsPage[0].pageTabs[0].ApprovedTab)
        .click()
        .wait(2000)

      //verify url destination to check if it goes to the Approved tab
      cy.url().should('contain', 'approved&filter')

      //// APPROVED TAB UPSELLS TABLE LIST STARTS HERE /////

      cy.get('table > tbody > tr:first-child').within(()=>{
        //assert row 1 column 1 Service Name
        BillingUpsells.assertColumn1ServiceName(' > td:nth-child(1) > button', 'Copywriting Work')
        //assert row 1 column 2 Client Name
        cy.get(' > td:nth-child(2) > a')
          .should('exist')
          .then(()=>{
            GETClientName.then(()=>{
              BillingUpsells.assertColumn2ClientName(' > td:nth-child(2) > a', clientName)
          }) 
        })  
        //assert Row 1 column 3 name Amount
        BillingUpsells.assertColumn3Amount(' > td:nth-child(3) > span', '$ 97.95')
        //assert Row 1 column 4 name Status
        BillingUpsells.assertColumn4Status(' > td:nth-child(4) > span', 'approved', 'rgb(59, 130, 246)', 'rgb(219, 234, 254)')
        //assert Row 1 column 5 name Date
        BillingUpsells.assertColumn5Date(' > td:nth-child(5) > span', DateTodayIs.TodayDateDDMMYYYY())
        //assert Row 1 column 6 name Submitted By
        BillingUpsells.assertColumn6Submittedby(' > td:nth-child(6) > div', 'LP', 'LoganPaul')
        //assert Row 1 column 7 name Approver
        BillingUpsells.assertColumn7Approver(' > td:nth-child(7) > div', 'LP', 'LoganPaul')
        //assert Row 1 column 8 Action has Send
        BillingUpsells.assertColumn8Action(' > td:nth-child(8) > button', 'not.be.disabled', 'Send')
      })

      //// APPROVED TAB UPSELLS TABLE LIST ENDS HERE /////

      //Click the Clients Navigation Module
      cy.get(modulebutton.ClientsModuleButton)
        .click()
        .wait(2000) 
 
      //Then click then client name link text
      cy.get('table > tbody > tr:first-child > td:nth-child(1) > a')
        .click()
        .wait(3000)
 
      //click the billing tab
      cy.get(clientmodulelocator.ClientMainPageTab[0].BillingTab)
        .click()
        .wait(2000)
 
      // Click the Upsells sub tab
      cy.get(clientmodulelocator.BillingTabPage[0].PageTabs[0].UpsellsTab)
        .click()
        .wait(2000)

      ///// CLIENT > BILLING > UPSELLS TABLE LIST ASSERTIONS STARTS HERE ////////

      cy.get('table > tbody > tr:first-child').within(()=>{
        //assert row 1 column 2 Invoice Number as at this time it should be a dash character
        UpsellTable.assertColumn2InvoiceNumber(' > td:nth-child(2)', '—')
        //assert row 1 column 4 status as it should be Approved
        UpsellTable.assertColumn4Status(' > td:nth-child(4) > span', 'approved', 'rgb(59, 130, 246)', 'rgb(219, 234, 254)')
        //assert row 1 column 7 Updated by the approver
        UpsellTable.assertColumn7UpdatedbyExpectedName('> td:nth-child(7) > div', 'LP', 'LoganPaul')
        //assert row 1 column 8 action has resend button
        UpsellTable.assertColumn8Action(' > td:nth-child(8) > button', 'not.be.disabled','Send')
      })

      ///// CLIENT > BILLING > UPSELLS TABLE LIST ASSERTIONS ENDS HERE ////////

      //Then I will click the Send button of the same approved upsell request
      cy.get('table > tbody > tr:first-child > td:nth-child(8) > button')
        .click()
        .wait(2000)

      //verify Are you sure you want to resend the billing summary invoice email to the client? Modal popup
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].AreyousureyouwanttoresendthebillingsummaryinvoiceemailtotheclientModal[0].modal)
        .should('exist')

      //verify modal title - Are you sure you want to resend the billing summary invoice email to the client?
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].AreyousureyouwanttoresendthebillingsummaryinvoiceemailtotheclientModal[0].modaltitle)
        .should('exist')
        .and('have.text', 'Are you sure you want to resend the billing summary invoice email to the client?')
        .and('have.css', 'font-weight', '700') // font bold

      //verify client email address  
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].AreyousureyouwanttoresendthebillingsummaryinvoiceemailtotheclientModal[0].modal)
        .then(()=>{
          GETclientEmailAddress.then(()=>{
            cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].AreyousureyouwanttoresendthebillingsummaryinvoiceemailtotheclientModal[0].ClientEmailAddressText)
              .should('exist')
              .and('have.text', clientEmailAddress)
              .and('have.css', 'color', 'rgb(148, 148, 148)') //text color
          })
        })
      
      //verify Cancel button
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].AreyousureyouwanttoresendthebillingsummaryinvoiceemailtotheclientModal[0].CancelButton)
        .should('exist')
        .and('not.be.disabled')
        .and('have.text', 'Cancel')
        .and('have.css', 'color', 'rgb(148, 148, 148)') //text color

      //verify Resend button
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].AreyousureyouwanttoresendthebillingsummaryinvoiceemailtotheclientModal[0].ResendButton)
        .should('exist')
        .and('not.be.disabled')
        .and('have.text', 'Resend')
        .and('have.css', 'color', 'rgb(255, 255, 255)') //text color
        .and('have.css', 'background-color', 'rgb(16, 185, 129)') //background color that form like a capsule
        .and('have.css', 'border-radius', '9999px') //the curve edge of the background color
      
      //click the Resend button
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].AreyousureyouwanttoresendthebillingsummaryinvoiceemailtotheclientModal[0].ResendButton)
        .click()
        .wait(3000)

      //reload the page
      cy.reload()
        .wait(8000) //giving 5 seconds waiting time to properly load the page

      //verify that same upsell that it should have now the invoice number at invoice number column, the status is Pending, the action column button is now a Resend button
      //and at the approver > billing > upsells > pending tab is transfered in there and lastly at the client partner it is now visible

      ///// CLIENT > BILLING > UPSELLS TABLE ASSERTIONS STARTS HERE //////

      cy.get('table > tbody > tr:first-child').within(()=>{
        //assert row 1 column 2 Invoice number
        UpsellTable.assertColumn2InvoiceNumber(' > td:nth-child(2) > a', 'INV')
        //I WILL GET THE INVOICE NUMBER  
        GETInvoiceNumber = new Promise((resolve)=>{
            cy.get(' > td:nth-child(2) > a')
              .then((textInvoiceNumber)=>{
                thisInvoiceNumber = textInvoiceNumber.text().trim();
                resolve();
            })
          })
        //assert row 1 column 4 status as it should be Pending
        UpsellTable.assertColumn4Status(' > td:nth-child(4) > span', 'pending', 'rgb(245, 158, 11)', 'rgb(254, 243, 199)')
        //assert row 1 column 8 action has resend button
        UpsellTable.assertColumn8Action(' > td:nth-child(8) > button', 'not.be.disabled','Resend')
      })

      ///// CLIENT > BILLING > UPSELLS TABLE ASSERTIONS ENDS HERE //////

      //Click the Billing navigation module
      cy.get(modulebutton.BillingModuleButton)
        .click()
        .wait(2000)
        
      //Click the Upsells link text folder
      cy.get(linktextfolder.BillingModule[0].Upsells)
        .click()
        .wait(2000)

      //go to Billing > Upsells > Pending Tab
      //Click Pending Tab
      cy.get(billingmodulelocator.UpsellsPage[0].pageTabs[0].PendingTab)
        .click()
        .wait(2000)

      ///// BILLING > UPSELLS > PENDING TAB TABLE LIST ASSERTIONS STARS HERE //////

      cy.get('table > tbody > tr:first-child').within(()=>{
        //assert row 1 column 4 invoice number
        GETInvoiceNumber.then(()=>{
          cy.get(' > td:nth-child(4) > a')
            .should('exist')
            .and('not.be.disabled')
            .then((txt)=>{
              expect(txt.text().trim()).to.equal(thisInvoiceNumber);
            })
        })
        
        //assert row 1 column 5 status
        BillingUpsells.assertColumn5Status(' > td:nth-child(5) > span', 'pending', 'rgb(245, 158, 11)', 'rgb(254, 243, 199)')
        //assert row 1 column 9 Action - has Resend button
        BillingUpsells.assertColumn9Action(' > td:nth-child(9) > button', 'not.be.disabled', 'Resend')
      })

      ///// BILLING > UPSELLS > PENDING TAB TABLE LIST ASSERTIONS ENDS HERE //////

      //logout 
      //click the user account profile 
      cy.get(testdata.AccountProfileSection[0].useraccountprofilepicinitial)
        .click()

      //click the sign out link text
      cy.get(testdata.AccountProfileSection[0].signoutlinktext)
        .click()
        .wait(10000)

      //Then login as client partner   
      cy.get('#root').then(()=>{
        GETclientEmailAddress.then(()=>{
          cy.userlogin(loginmodule.EmailAddressInputfield, loginmodule.PasswordInputfield, loginmodule.SigninButton, clientEmailAddress, 'qatesting123')
        })
      })
    
      //click the Invoice nav button
      cy.get(clientpartnerpage.ClientInvoicesnavlink)
        .click()
        .wait(2000)

      //verify expected url destination which is the Additional Services page
      cy.url().should('contain', '/additional-services')

      // When a user click the Invoices Module, it goes right away to Additional Services folder page and then view the Pending tab
      
      ////////// ADDITIONAL SERVIECS > PENDING TAB > TABLE LIST ASSERTIONS STARTS HERE //////////////

      //verify the expected column names in the table
      const expectedcolumnNames = [
        'Invoice Number',
        'Service',
        'Amount',
        'Status',
        'Date',
        'Action'
      ];
      cy.get('table > thead > tr > th').each(($columnNames, index) => {
          cy.wrap($columnNames).should('have.text', expectedcolumnNames[index]) //verify names based on the expected options
            .should('exist')
            .and('be.visible')
            .then(($el) => {
              const computedStyle       = getComputedStyle($el[0]);
              const customPropertyValue = computedStyle.getPropertyValue('--tw-text-opacity').trim();
              expect(customPropertyValue).to.equal('1')
            })
            cy.log(expectedcolumnNames[index]) 
      });

      //verify row 1 since it is the target pending approved upsell request
      cy.get('table > tbody > tr:first-child').within(()=>{
        //assert row 1 column 1 Invoice Number
        cy.get(' > td:nth-child(1) > a').then(()=>{
          GETInvoiceNumber.then(()=>{
            AdditionalServiceTableList.assertColumn1InvoiceNumber(' > td:nth-child(1) > a', thisInvoiceNumber)
          })
        })
        //assert row 1 column 2 Service
        AdditionalServiceTableList.assertColumn2Service('> td:nth-child(2) > span', 'Copywriting Work')
        //assert row 1 column 3 Amount
        AdditionalServiceTableList.assertColumn3Amount(' > td:nth-child(3) > span', '$ 97.95')
        //assert row 1 column 4 Status
        AdditionalServiceTableList.assertColumn4Status(' > td:nth-child(4)  > span', 'pending', 'rgb(245, 158, 11)', 'rgb(254, 243, 199)')
        //assert row 1 column 5 Date
        AdditionalServiceTableList.assertColumn5Date(' > td:nth-child(5)  > span', DateTodayIs.TodayDateDDMMYYYY())
        //assert row 1 column 6 Action has view button
        AdditionalServiceTableList.assertColumn6Action(' > td:nth-child(6) > a', 'not.be.disabled', 'View')
      })

      ////////// ADDITIONAL SERVIECS > PENDING TAB > TABLE LIST ASSERTIONS ENDS HERE //////////////

    })
    it("Testcase ID: CCU00014 - Send the Email feature via the Approver", ()=>{

      let GETClientName;
      let clientName;
      let GETclientEmailAddress;
      let clientEmailAddress;
      let GETInvoiceNumber;
      let thisInvoiceNumber;

      //Login using account specialist
      cy.userlogin(loginmodule.EmailAddressInputfield, loginmodule.PasswordInputfield, loginmodule.SigninButton, testdata.userAccounts[0].accountspecialist1, testdata.userAccounts[0].accountspecialistandprojectmanagerpassword)

      //Click the Clients Navigation Module
      cy.get(modulebutton.ClientsModuleButton)
        .click()
        .wait(2000) 

      //Then click then client name link text
      cy.get('table > tbody > tr:first-child > td:nth-child(1) > a')
        .click()
        .wait(3000)

      //GET the current client name that shows as the title
      GETClientName = new Promise((resolve)=>{
        cy.get(clientmodulelocator.ClientNameTitle)
          .then((name)=>{
            clientName = name.text().trim();
          })
      })

      //I will have to get firs the client email address for later use
      GETclientEmailAddress = new Promise((resolve)=>{
        cy.get(clientmodulelocator.ClientDashboardTabPage[0].ProfileTabpage[0].ClientBasicContactInformationSection[0].ClientEmailAddress)
          .then((email)=>{
            clientEmailAddress = email.text().trim();
            resolve();
          })
      })

      //click the billing tab
      cy.get(clientmodulelocator.ClientMainPageTab[0].BillingTab)
        .click()
        .wait(2000)

      // Click the Upsells sub tab
      cy.get(clientmodulelocator.BillingTabPage[0].PageTabs[0].UpsellsTab)
        .click()
        .wait(2000)

      //Click the Create Upsell button
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellButton)
        .click()
        .wait(2000)
        
      //verify the Create Upsell modal
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].modal)
        .should('exist')

      ///////// CREATE UPSELL REQUEST STARTS HERE //////////////

      //Select Upsell item
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UpsellitemAndSelectDropdownmenu)
        .find('select')
        .should('exist')
        .select('1604151000000147020')
        .wait(1000)
        .should('have.value', '1604151000000147020')

      //verify that it goes on top option 1
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UpsellitemAndSelectDropdownmenu)
        .find('select option:selected')
        .should('exist')
        .wait(1000)
        .should('have.text', 'Copywriting Work')

      //verify Unit Price value updated
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UnitPricelabelAndInputfield)
        .find('.relative > input')
        .should('exist')
        .wait(1000)
        .should('have.value', '97.95')

      //verify Upsell Description value updated
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UpsellDescriptionlabelAndTextareafield)
        .find('textarea')
        .should('exist')
        .wait(1000)
        .should('have.value', 'Copywriting Work')
        
      //Click Submit Button
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].SubmitButton)
        .click()
        .wait(8000)
      /*
      //verify alert-success message popup
      cy.GETAlertMessagepopup(alertmessagepopup.TopMessage, 'Upsell Created')
      //then i am going to close the alert popup
      cy.get(alertmessagepopup.notificationmessagedeleteicon)
      .click() */
  
      ///////// CREATE UPSELL REQUEST ENDS HERE //////////////

      /////// CLIENT > BILLING > UPSELLS TAB > TABLE VERFICATION STARTS HERE /////////////

      //verify the column names first
      const expected_columnNames = [
        'Service',
        'Invoice',
        'Amount',
        'Status',
        'Date',
        'Submitted By',
        'Updated By',
        'Action'
      ];
      cy.get('table > thead > tr > th').each(($option, index) => {
          cy.wrap($option)
            .should('exist')
            .should('have.text', expected_columnNames[index])  //verify names based on the expected names per column
            .and('have.css', 'color', 'rgb(190, 190, 190)') //text color
          cy.log(expected_columnNames[index]) 
      });
              
      //Then verify the row 1 each columns 
      cy.get('table > tbody > tr:first-child').within(()=>{
        //assert Row 1 column 1 name Service
        UpsellTable.assertColumn1ServiceName(' > td:nth-child(1) > button', 'Copywriting Work')
        //assert Row 1 column 2 name Invoice
        UpsellTable.assertColumn2InvoiceNumber(' > td:nth-child(2)', '—') 
        //assert Row 1 column 3 name Amount
        UpsellTable.assertColumn3Amount(' > td:nth-child(3) > span', '$ 97.95')
        //assert Row 1 column 4 name Status
        UpsellTable.assertColumn4Status(' > td:nth-child(4) > span', 'awaiting approval', 'rgb(212, 130, 54)', 'rgb(255, 210, 185)')
        //assert Row 1 column 5 name Date
        UpsellTable.assertColumn5Date(' > td:nth-child(5) > span', DateTodayIs.TodayDateDDMMYYYY())
        //assert Row 1 column 6 name Submitted By
        UpsellTable.assertColumn6Submittedby(' > td:nth-child(6) > div', 'LP', 'LoganPaul')
        //assert Row 1 column 7 name Updated By
        UpsellTable.assertColumn7UpdatedbyExpectedDASH(' > td:nth-child(7)', '—')
        //assert Row 1 column 8 name Action - has edit button
        UpsellTable.assertColumn8Action(' > td:nth-child(8) > button', 'be.disabled', 'View')
      }) 

      /////// CLIENT > BILLING > UPSELLS TAB > TABLE VERFICATION ENDS HERE /////////////

      //Click the Billing navigation module
      cy.get(modulebutton.BillingModuleButton)
        .click()
        .wait(2000)
        
      //Click the Upsells link text folder
      cy.get(linktextfolder.BillingModule[0].Upsells)
        .click()
        .wait(2000)
      
      //It is expected that it goes straight onto Upsells >Awaiting Approval Tab page
      
      /// Then verify in row 1 table with each columns
      ////// BILLING > UPSELLS > TABLE LIST ASSERTIONS STARTS HERE ////////

      //verify the column names first
      const expectColumnNames = [
        'Service',
        'Client Name',
        'Amount',
        'Status',
        'Date',
        'Submitted By',
        'Action'
      ];
      cy.get('table > thead > tr > th').each(($option, index) => {
          cy.wrap($option)
            .should('exist')
            .should('have.text', expectColumnNames[index])  //verify names based on the expected names per column
            .and('have.css', 'color', 'rgb(190, 190, 190)') //text color
          cy.log(expectColumnNames[index]) 
      });

      cy.get('table > tbody > tr:first-child').within(()=>{
        //assert Column 1 > Service Name / Upsell Name
        BillingUpsells.assertColumn1ServiceName(' > td:nth-child(1) > button', 'Copywriting Work')
        //assert Column 2 > Client Name
        GETClientName.then(()=>{
          BillingUpsells.assertColumn2ClientName(' > td:nth-child(2) > a', clientName)
        }) 
        //assert Column 3 > Amount
        BillingUpsells.assertColumn3Amount(' > td:nth-child(3) > span', '$ 97.95')
        //assert Column 4 > Status
        BillingUpsells.assertColumn4Status(' > td:nth-child(4) > span', 'awaiting approval', 'rgb(212, 130, 54)', 'rgb(255, 210, 185)')
        //assert Column 5 > Date
        BillingUpsells.assertColumn5Date(' > td:nth-child(5) > span', DateTodayIs.TodayDateDDMMYYYY())
        //assert Column 6 > Submitted by
        BillingUpsells.assertColumn6Submittedby(' > td:nth-child(6) > div', 'LP', 'LoganPaul')
        //assert Column 7 > Action:Review
        BillingUpsells.assertColumn7Action(' > td:nth-child(7) > button', 'not.be.disabled', 'Review')
      })

      ////// BILLING > UPSELLS > TABLE LIST ASSERTIONS ENDS HERE ////////

      //click the review button at Row 1 column 7
      cy.get('table > tbody > tr:first-child > td:nth-child(7) > button')
        .click()
        .wait(1000)

      //verify Upsell Request modal popup
      cy.get(billingmodulelocator.UpsellsPage[0].BillingUpsellRequestModal[0].modal)
        .should('exist')

      //Click Approve button
      cy.get(billingmodulelocator.UpsellsPage[0].BillingUpsellRequestModal[0].ApproveButton)
        .click()
        .wait(1000)

      //verify This upsell request has been approved modal popup
      cy.get(billingmodulelocator.UpsellsPage[0].ThisupsellrequesthasbeenapprovedModal[0].modal)
        .should('exist')

      ////click the Send No button
      cy.get(billingmodulelocator.UpsellsPage[0].ThisupsellrequesthasbeenapprovedModal[0].NoButton)
        .click()
        .wait(2000)
        
      //As expected it goes to Billing > Upsells > Approved Tab
      //click the Approved Tab
      cy.get(billingmodulelocator.UpsellsPage[0].pageTabs[0].ApprovedTab)
        .click()
        .wait(2000)

      //verify url destination to check if it goes to the Approved tab
      cy.url().should('contain', 'approved&filter')

      //// APPROVED TAB UPSELLS TABLE LIST STARTS HERE /////

      cy.get('table > tbody > tr:first-child').within(()=>{
        //assert row 1 column 1 Service Name
        BillingUpsells.assertColumn1ServiceName(' > td:nth-child(1) > button', 'Copywriting Work')
        //assert row 1 column 2 Client Name
        cy.get(' > td:nth-child(2) > a')
          .should('exist')
          .then(()=>{
            GETClientName.then(()=>{
              BillingUpsells.assertColumn2ClientName(' > td:nth-child(2) > a', clientName)
          }) 
        })  
        //assert Row 1 column 3 name Amount
        BillingUpsells.assertColumn3Amount(' > td:nth-child(3) > span', '$ 97.95')
        //assert Row 1 column 4 name Status
        BillingUpsells.assertColumn4Status(' > td:nth-child(4) > span', 'approved', 'rgb(59, 130, 246)', 'rgb(219, 234, 254)')
        //assert Row 1 column 5 name Date
        BillingUpsells.assertColumn5Date(' > td:nth-child(5) > span', DateTodayIs.TodayDateDDMMYYYY())
        //assert Row 1 column 6 name Submitted By
        BillingUpsells.assertColumn6Submittedby(' > td:nth-child(6) > div', 'LP', 'LoganPaul')
        //assert Row 1 column 7 name Approver
        BillingUpsells.assertColumn7Approver(' > td:nth-child(7) > div', 'PK', 'PeterKanluran')
        //assert Row 1 column 8 Action has Send
        BillingUpsells.assertColumn8Action(' > td:nth-child(8) > button', 'not.be.disabled', 'Send')
      })

      //// APPROVED TAB UPSELLS TABLE LIST ENDS HERE /////

      //Then I will click the Send button of this approved upsell request
      cy.get('table > tbody > tr:first-child > td:nth-child(8) > button')
        .click()
        .wait(2000)

      //verify Are you sure you want to resend the billing summary invoice email to the client? Modal popup
      cy.get(billingmodulelocator.UpsellsPage[0].AreyousureyouwanttoresendthebillingsummaryinvoiceemailtotheclientModal[0].modal)
        .should('exist')

      //verify modal title - Are you sure you want to resend the billing summary invoice email to the client?
      cy.get(billingmodulelocator.UpsellsPage[0].AreyousureyouwanttoresendthebillingsummaryinvoiceemailtotheclientModal[0].modaltitle)
        .should('exist')
        .and('have.text', 'Are you sure you want to resend the billing summary invoice email to the client?')
        .and('have.css', 'font-weight', '700') // font bold

      //verify client email address
      cy.get(billingmodulelocator.UpsellsPage[0].AreyousureyouwanttoresendthebillingsummaryinvoiceemailtotheclientModal[0].modal)
        .then(()=>{
          GETclientEmailAddress.then(()=>{
            cy.get(billingmodulelocator.UpsellsPage[0].AreyousureyouwanttoresendthebillingsummaryinvoiceemailtotheclientModal[0].ClientEmailAddressText)
              .should('exist')
              .and('have.text', clientEmailAddress)
              .and('have.css', 'color', 'rgb(148, 148, 148)') // text color
          })
        })
      
      //verify Cancel button
      cy.get(billingmodulelocator.UpsellsPage[0].AreyousureyouwanttoresendthebillingsummaryinvoiceemailtotheclientModal[0].CancelButton)
        .should('exist')
        .and('not.be.disabled')
        .and('have.text', 'Cancel')
        .and('have.css', 'color', 'rgb(148, 148, 148)') //text color

      //verify Resend button
      cy.get(billingmodulelocator.UpsellsPage[0].AreyousureyouwanttoresendthebillingsummaryinvoiceemailtotheclientModal[0].ResendButton)
        .should('exist')
        .and('not.be.disabled')
        .and('have.text', 'Resend')
        .and('have.css', 'color', 'rgb(255, 255, 255)') //text color
        .and('have.css', 'background-color', 'rgb(16, 185, 129)') //background color that form like a capsule
        .and('have.css', 'border-radius', '9999px') //the curve edge of the background color

      //Click the Resend button
      cy.get(billingmodulelocator.UpsellsPage[0].AreyousureyouwanttoresendthebillingsummaryinvoiceemailtotheclientModal[0].ResendButton)
        .click()
        .wait(2000)

      //reload the page
      cy.reload()
        .wait(8000) //giving 5 seconds waiting time to properly load the page

      //Check again the status as it should change into Pending
      //Click Pending Tab
      cy.get(billingmodulelocator.UpsellsPage[0].pageTabs[0].PendingTab)
        .click()
        .wait(2000)

      //verify url destinationa after Pending tab is click
      cy.url().should('contain', '=pending')

      ///// BILLING > UPSELLS > PENDING TAB TABLE LIST ASSERTIONS STARS HERE ////// 

      cy.get('table > tbody > tr:first-child').within(()=>{
        //assert row 1 column 4 Invoice Number
        BillingUpsells.assertColumn4InvoiceNumber(' > td:nth-child(4) > a')
        //I will then GET this Invoice number and store it in a variable to use later for assertion
        GETInvoiceNumber = new Promise((resolve)=>{
          cy.get(' > td:nth-child(4) > a').then((txt)=>{
            thisInvoiceNumber = txt.text().trim();
          })
          resolve();
        })
        //assert row 1 column 5 status
        BillingUpsells.assertColumn5Status(' > td:nth-child(5) > span', 'pending', 'rgb(245, 158, 11)', 'rgb(254, 243, 199)')
        //assert row 1 column 9 Action - has Resend button
        BillingUpsells.assertColumn9Action(' > td:nth-child(9) > button', 'not.be.disabled', 'Resend')
      })

      ///// BILLING > UPSELLS > PENDING TAB TABLE LIST ASSERTIONS ENDS HERE //////

      //Click the Clients Navigation Module
      cy.get(modulebutton.ClientsModuleButton)
        .click()
        .wait(2000) 

      //Then click then client name link text
      cy.get('table > tbody > tr:first-child > td:nth-child(1) > a')
        .click()
        .wait(3000)

      //GET the current client name that shows as the title
      GETClientName = new Promise((resolve)=>{
        cy.get(clientmodulelocator.ClientNameTitle)
          .then((name)=>{
            clientName = name.text().trim();
          })
      })

      //click the billing tab
      cy.get(clientmodulelocator.ClientMainPageTab[0].BillingTab)
        .click()
        .wait(2000)

      // Click the Upsells sub tab
      cy.get(clientmodulelocator.BillingTabPage[0].PageTabs[0].UpsellsTab)
        .click()
        .wait(2000)

      //// CLIENT BILLING > UPSELLS > TABLE LIST ASSERTIONS STARTS HERE ////////

      cy.get('table > tbody > tr:first-child').within(()=>{
        //assert the Invoice Number
        GETInvoiceNumber.then(()=>{
          cy.get(' > td:nth-child(2) > a')
            .should('exist')
            .then((txt)=>{
              expect(txt.text().trim()).to.equal(thisInvoiceNumber);
            })
        })
        //assert status 
        UpsellTable.assertColumn4Status(' > td:nth-child(4) > span', 'pending','rgb(245, 158, 11)', 'rgb(254, 243, 199)')
      })

      //// CLIENT BILLING > UPSELLS > TABLE LIST ASSERTIONS ENDS HERE ////////
      
    })
    // **** CLIENT UPSELL ENDS HERE ***
    // **** CLIENT CREDIT NOTE STARTS HERE ***
    it("Testcase ID: CCCR0001 - Waive Upsell Fee, Upsell Request turned Credit Note Request",()=>{

      
      let GETClientName;
      let clientName;

      //Login using account specialist
      cy.userlogin(loginmodule.EmailAddressInputfield, loginmodule.PasswordInputfield, loginmodule.SigninButton, testdata.userAccounts[0].accountspecialist1, testdata.userAccounts[0].accountspecialistandprojectmanagerpassword)

      //Click the Clients Navigation Module
      cy.get(modulebutton.ClientsModuleButton)
        .click()
        .wait(2000) 

      //Then click then client name link text
      cy.get('table > tbody > tr:first-child > td:nth-child(1) > a')
        .click()
        .wait(3000)

      //GET the current client name that shows as the title
      GETClientName = new Promise((resolve)=>{
        cy.get(clientmodulelocator.ClientNameTitle)
          .then((name)=>{
            clientName = name.text().trim();
          })
      })

      //click the billing tab
      cy.get(clientmodulelocator.ClientMainPageTab[0].BillingTab)
        .click()
        .wait(2000)

      // Click the Upsells sub tab
      cy.get(clientmodulelocator.BillingTabPage[0].PageTabs[0].UpsellsTab)
        .click()
        .wait(2000)
        
      //Click the Create Upsell button
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellButton)
        .click()
        .wait(2000)

      //verify the Create Upsell modal
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].modal)
        .should('exist')

       ///////// CREATE UPSELL REQUEST STARTS HERE //////////////

      //Select Upsell item
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UpsellitemAndSelectDropdownmenu)
        .find('select')
        .should('exist')
        .select('1604151000000147020')
        .wait(1000)
        .should('have.value', '1604151000000147020')

      //verify that it goes on top option 1
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UpsellitemAndSelectDropdownmenu)
        .find('select option:selected')
        .should('exist')
        .wait(1000)
        .should('have.text', 'Copywriting Work')

      //verify Unit Price value updated
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UnitPricelabelAndInputfield)
        .find('.relative > input')
        .should('exist')
        .wait(1000)
        .should('have.value', '97.95')

      //verify Waive Upsell Fee Label and Slide button
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].WaiveUpsellFeelabelAndSlidebutton)
        .should('exist')
        .within(()=>{
          //assert label
          cy.get('label')
            .should('exist')
            .and('have.text', 'Waive Upsell Fee')
            .and('have.css', 'color', 'rgb(107, 114, 128)') //text color
          //assert button
          cy.get('button')
            .should('exist')
            .and('not.be.disabled')
            .and('have.attr', 'aria-checked', 'false') //by default it is off
            .and('have.css', 'background-color', 'rgb(229, 231, 235)') //expected background color when OFF
            .and('have.css', 'border-radius', '9999px') //the curve edge of the background color
        })

      //THEN slide ON the waive upsell fee button
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].WaiveUpsellFeelabelAndSlidebutton)
        .find('button')
        .click()
        .wait(1000)
        .should('have.css', 'background-color', 'rgb(16, 185, 129)').and('have.css', 'border-radius', '9999px') //the expected color after it was click


      //verify Upsell Description value updated
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UpsellDescriptionlabelAndTextareafield)
        .find('textarea')
        .should('exist')
        .wait(1000)
        .should('have.value', 'Copywriting Work')
        
      //Click Submit Button
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].SubmitButton)
        .click()
        .wait(8000)
      /*
      //verify alert-success message popup
      cy.GETAlertMessagepopup(alertmessagepopup.TopMessage, 'Upsell Created')
      //then i am going to close the alert popup
      cy.get(alertmessagepopup.notificationmessagedeleteicon)
        .click()
      */
      ///////// CREATE UPSELL REQUEST ENDS HERE //////////////

      //verify as it is expected to automatically transferred to Client > Billing > Credit Notes Tab
      cy.get(clientmodulelocator.BillingTabPage[0].PageTabs[0].CreditNotesTab)
        .should('exist')
        .and('have.text', ' Credit Notes')
        .and('have.css', 'color', 'rgb(239, 68, 68)') //text color is red signifies that it is currently accessed
        .and('have.css', 'font-weight', '600') //font bold

      //verify that also the url destination is correct which is at the Credit Notes tab page
      cy.url().should('contain', '/billing/creditnotes')

      ////// CLIENT > BILLING > UPSELLS > TABLE LIST ASSERTIONS STARTS HERE ////////
      
      //verify Column Names
      const expected_columnNames = [
        'Name',
        'Date',
        'Amount',
        'Status',
        'Submitted By',
        'Updated By',
        'Action'
      ];
      cy.get('table > thead > tr > th').each(($option, index) => {
          cy.wrap($option).should('have.text', expected_columnNames[index])  //verify names based on the expected names per column
          .should('exist')
          .and('have.css', 'color', 'rgb(190, 190, 190)') //text color
          cy.log(expected_columnNames[index]) 
      });

      cy.get('table > tbody > tr:first-child').within(()=>{
        //assert column 1 > Service Name / Upsell Name Request
        ClientCreditNotesTableList.assertColumn1CreditNoteRequestName(' > td:nth-child(1) > a', 'Copywriting Work')
        //assert column 2 > Created/Submitted Date
        ClientCreditNotesTableList.assertColumn2Date(' > td:nth-child(2) > span', DateTodayIs.TodayDateDDMMYYYY())
        //assert column 3 > Amount
        ClientCreditNotesTableList.assertColumn3Amount(' > td:nth-child(3) > span', '$ 97.95')
        //assert row 1 column 4 > Status
        ClientCreditNotesTableList.assertColumn4Status(' > td:nth-child(4) > span', 'awaiting approval', 'rgb(212, 130, 54)', 'rgb(255, 210, 185)')
        //assert row 1 column 5 > Submitted By
        ClientCreditNotesTableList.assertColumn5Submittedby(' > td:nth-child(5) > div', 'LP', 'LoganPaul')
        //assert row 1 column 6 > Updated By
        ClientCreditNotesTableList.assertColumn6UpdatedbyExpectedDASH(' > td:nth-child(6)','—')
        //assert row 1 column 7 > Action column > has Cancel button
        ClientCreditNotesTableList.assertColumn7Action(' > td:nth-child(7) > button', 'not.be.disabled', 'Cancel')
      })

      ////// CLIENT > BILLING > UPSELLS > TABLE LIST ASSERTIONS ENDS HERE ////////

      //Go back to Billing > Upsells tab and verify the table
      //Click the Upsells sub tab
      cy.get(clientmodulelocator.BillingTabPage[0].PageTabs[0].UpsellsTab)
        .click()
        .wait(2000)

      ////// CLIENT > BILLING > UPSELLS > TABLE LIST ASSERTIONS STARTS HERE /////////////

      cy.get('table > tbody > tr:first-child').within(()=>{
        //assert Row 1 column 1 name Service
        UpsellTable.assertColumn1ServiceName(' > td:nth-child(1) > button', 'Copywriting Work')
        //assert Row 1 column 2 name Invoice
        UpsellTable.assertColumn2InvoiceNumber(' > td:nth-child(2)', '—') 
        //assert Row 1 column 3 name Amount
        UpsellTable.assertColumn3Amount(' > td:nth-child(3) > span', '$ 97.95')
        //assert Row 1 column 4 name Status
        UpsellTable.assertColumn4Status(' > td:nth-child(4) > span', 'waived', 'rgb(107, 114, 128)', 'rgb(237, 233, 254)')
        //assert Row 1 column 5 name Date
        UpsellTable.assertColumn5Date(' > td:nth-child(5) > span', DateTodayIs.TodayDateDDMMYYYY())
        //assert Row 1 column 6 name Submitted By
        UpsellTable.assertColumn6Submittedby(' > td:nth-child(6) > div', 'LP', 'LoganPaul')
        //assert Row 1 column 7 name Updated By
        UpsellTable.assertColumn7UpdatedbyExpectedDASH(' > td:nth-child(7)', '—')
        //assert Row 1 column 8 name Action - has edit button
        UpsellTable.assertColumn8Action(' > td:nth-child(8) > button', 'be.disabled', 'View')
      }) 

      ////// CLIENT > BILLING > UPSELLS > TABLE LIST ASSERTIONS ENDS HERE /////////////

      //Click the Billing navigation module
      cy.get(modulebutton.BillingModuleButton)
        .click()
        .wait(2000)

      //Click the Credit Notes link text folder
      cy.get(linktextfolder.BillingModule[0].CreditNotes)
        .click()
        .wait(2000)

      //When a user access the Billing > Credit Notes folder page, it is automatically accessed the Awaiting Approval tab
      cy.url().should('contain', '=awaiting+approval')

      /////// BILLING > CREDIT NOTES > AWAITING APPROVAL TAB > TABLE LIST ASSERTIONS STARTS HERE //////////

      //verify column Names
      const AwaitingApprovalTableColumnNames = [
        'Name',
        'Client Name',
        'Amount',
        'Status',
        'Request Date',
        'Submitted By',
        'Action'
      ];
      cy.get('table > thead > tr > th').each(($option, index) => {
          cy.wrap($option).should('have.text', AwaitingApprovalTableColumnNames[index])  //verify names based on the expected names per column
          .should('exist')
          .and('have.css', 'color', 'rgb(190, 190, 190)') //text color
          cy.log(AwaitingApprovalTableColumnNames[index]) 
      });

      cy.get('table > tbody > tr:first-child').within(()=>{
        //assert Column 1 > Credit Note Request Name
        BillingCreditNotesTablelist.assertColumn1CreditNoteRequestName(' > td:nth-child(1) > a', 'Copywriting Work')
        //assert Column 2 > Client Name
        GETClientName.then(()=>{
          BillingCreditNotesTablelist.assertColumn2ClientName(' > td:nth-child(2) > a', clientName)
        })
        //assert Column 3 > Amount
        BillingCreditNotesTablelist.assertColumn3Amount(' > td:nth-child(3) > span', '$ 97.95')
        //assert Column 4 > Status
        BillingCreditNotesTablelist.assertColumn4Status(' > td:nth-child(4) > span', 'awaiting approval', 'rgb(212, 130, 54)', 'rgb(255, 210, 185)')
        //assert Column 5 > Reqeust Date /Created Date
        BillingCreditNotesTablelist.assertColumn5RequestDate(' > td:nth-child(5) > span', DateTodayIs.TodayDateDDMMYYYY())
        //assert Column 6 > Submitted By
        BillingCreditNotesTablelist.assertColumn6Submittedby(' > td:nth-child(6) > div', 'LP', 'LoganPaul')
        //assert Column 7 > Action:Review button
        BillingCreditNotesTablelist.assertColumn7Action(' > td:nth-child(7) > button', 'not.be.disabled', 'Review')
      })

      /////// BILLING > CREDIT NOTES > AWAITING APPROVAL TAB > TABLE LIST ASSERTIONS ENDS HERE //////////

    })
    it("Testcase ID: CCCR0002 - Deny Waive Upsell Fee, Upsell Request turned Credit Note Request",()=>{


      let GETClientName;
      let clientName;

      //Login using account specialist
      cy.userlogin(loginmodule.EmailAddressInputfield, loginmodule.PasswordInputfield, loginmodule.SigninButton, testdata.userAccounts[0].accountspecialist1, testdata.userAccounts[0].accountspecialistandprojectmanagerpassword)

      //Click the Clients Navigation Module
      cy.get(modulebutton.ClientsModuleButton)
        .click()
        .wait(2000) 

      //Then click then client name link text
      cy.get('table > tbody > tr:first-child > td:nth-child(1) > a')
        .click()
        .wait(3000)

      //GET the current client name that shows as the title
      GETClientName = new Promise((resolve)=>{
        cy.get(clientmodulelocator.ClientNameTitle)
          .then((name)=>{
            clientName = name.text().trim();
          })
      })

      //click the billing tab
      cy.get(clientmodulelocator.ClientMainPageTab[0].BillingTab)
        .click()
        .wait(2000)

      // Click the Upsells sub tab
      cy.get(clientmodulelocator.BillingTabPage[0].PageTabs[0].UpsellsTab)
        .click()
        .wait(2000)
        
      //Click the Create Upsell button
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellButton)
        .click()
        .wait(2000)

      //verify the Create Upsell modal
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].modal)
        .should('exist')

       ///////// CREATE UPSELL REQUEST STARTS HERE //////////////

      //Select Upsell item
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UpsellitemAndSelectDropdownmenu)
        .find('select')
        .should('exist')
        .select('1604151000000147020')
        .wait(1000)
        .should('have.value', '1604151000000147020')

      //verify that it goes on top option 1
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UpsellitemAndSelectDropdownmenu)
        .find('select option:selected')
        .should('exist')
        .wait(1000)
        .should('have.text', 'Copywriting Work')

      //verify Unit Price value updated
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UnitPricelabelAndInputfield)
        .find('.relative > input')
        .should('exist')
        .wait(1000)
        .should('have.value', '97.95')

      //verify Waive Upsell Fee Label and Slide button
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].WaiveUpsellFeelabelAndSlidebutton)
        .should('exist')
        .within(()=>{
          //assert label
          cy.get('label')
            .should('exist')
            .and('have.text', 'Waive Upsell Fee')
            .and('have.css', 'color', 'rgb(107, 114, 128)') //text color
          //assert button
          cy.get('button')
            .should('exist')
            .and('not.be.disabled')
            .and('have.attr', 'aria-checked', 'false') //by default it is off
            .and('have.css', 'background-color', 'rgb(229, 231, 235)') //expected background color when OFF
            .and('have.css', 'border-radius', '9999px') //the curve edge of the background color
        })

      //THEN slide ON the waive upsell fee button
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].WaiveUpsellFeelabelAndSlidebutton)
        .find('button')
        .click()
        .wait(1000)
        .should('have.css', 'background-color', 'rgb(16, 185, 129)').and('have.css', 'border-radius', '9999px') //the expected color after it was click


      //verify Upsell Description value updated
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UpsellDescriptionlabelAndTextareafield)
        .find('textarea')
        .should('exist')
        .wait(1000)
        .should('have.value', 'Copywriting Work')
        
      //Click Submit Button
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].SubmitButton)
        .click()
        .wait(8000)
      /*
      //verify alert-success message popup
      cy.GETAlertMessagepopup(alertmessagepopup.TopMessage, 'Upsell Created')
      //then i am going to close the alert popup
      cy.get(alertmessagepopup.notificationmessagedeleteicon)
        .click()
      */
      ///////// CREATE UPSELL REQUEST ENDS HERE //////////////

      //verify as it is expected to automatically transferred to Client > Billing > Credit Notes Tab
      cy.get(clientmodulelocator.BillingTabPage[0].PageTabs[0].CreditNotesTab)
        .should('exist')
        .and('have.text', ' Credit Notes')
        .and('have.css', 'color', 'rgb(239, 68, 68)') //text color is red signifies that it is currently accessed
        .and('have.css', 'font-weight', '600') //font bold

      //verify that also the url destination is correct which is at the Credit Notes tab page
      cy.url().should('contain', '/billing/creditnotes')

      ////// CLIENT > BILLING > UPSELLS > TABLE LIST ASSERTIONS STARTS HERE ////////
      
      //verify Column Names
      const expected_columnNames = [
        'Name',
        'Date',
        'Amount',
        'Status',
        'Submitted By',
        'Updated By',
        'Action'
      ];
      cy.get('table > thead > tr > th').each(($option, index) => {
          cy.wrap($option).should('have.text', expected_columnNames[index])  //verify names based on the expected names per column
          .should('exist')
          .and('have.css', 'color', 'rgb(190, 190, 190)') //text color
          cy.log(expected_columnNames[index]) 
      });

      cy.get('table > tbody > tr:first-child').within(()=>{
        //assert column 1 > Service Name / Upsell Name Request
        ClientCreditNotesTableList.assertColumn1CreditNoteRequestName(' > td:nth-child(1) > a', 'Copywriting Work')
        //assert column 2 > Created/Submitted Date
        ClientCreditNotesTableList.assertColumn2Date(' > td:nth-child(2) > span', DateTodayIs.TodayDateDDMMYYYY())
        //assert column 3 > Amount
        ClientCreditNotesTableList.assertColumn3Amount(' > td:nth-child(3) > span', '$ 97.95')
        //assert row 1 column 4 > Status
        ClientCreditNotesTableList.assertColumn4Status(' > td:nth-child(4) > span', 'awaiting approval', 'rgb(212, 130, 54)', 'rgb(255, 210, 185)')
        //assert row 1 column 5 > Submitted By
        ClientCreditNotesTableList.assertColumn5Submittedby(' > td:nth-child(5) > div', 'LP', 'LoganPaul')
        //assert row 1 column 6 > Updated By
        ClientCreditNotesTableList.assertColumn6UpdatedbyExpectedDASH(' > td:nth-child(6)','—')
        //assert row 1 column 7 > Action column > has Cancel button
        ClientCreditNotesTableList.assertColumn7Action(' > td:nth-child(7) > button', 'not.be.disabled', 'Cancel')
      })

      ////// CLIENT > BILLING > UPSELLS > TABLE LIST ASSERTIONS ENDS HERE ////////

      //Go back to Billing > Upsells tab and verify the table
      //Click the Upsells sub tab
      cy.get(clientmodulelocator.BillingTabPage[0].PageTabs[0].UpsellsTab)
        .click()
        .wait(2000)

      ////// CLIENT > BILLING > UPSELLS > TABLE LIST ASSERTIONS STARTS HERE /////////////

      cy.get('table > tbody > tr:first-child').within(()=>{
        //assert Row 1 column 1 name Service
        UpsellTable.assertColumn1ServiceName(' > td:nth-child(1) > button', 'Copywriting Work')
        //assert Row 1 column 2 name Invoice
        UpsellTable.assertColumn2InvoiceNumber(' > td:nth-child(2)', '—') 
        //assert Row 1 column 3 name Amount
        UpsellTable.assertColumn3Amount(' > td:nth-child(3) > span', '$ 97.95')
        //assert Row 1 column 4 name Status
        UpsellTable.assertColumn4Status(' > td:nth-child(4) > span', 'waived', 'rgb(107, 114, 128)', 'rgb(237, 233, 254)')
        //assert Row 1 column 5 name Date
        UpsellTable.assertColumn5Date(' > td:nth-child(5) > span', DateTodayIs.TodayDateDDMMYYYY())
        //assert Row 1 column 6 name Submitted By
        UpsellTable.assertColumn6Submittedby(' > td:nth-child(6) > div', 'LP', 'LoganPaul')
        //assert Row 1 column 7 name Updated By
        UpsellTable.assertColumn7UpdatedbyExpectedDASH(' > td:nth-child(7)', '—')
        //assert Row 1 column 8 name Action - has edit button
        UpsellTable.assertColumn8Action(' > td:nth-child(8) > button', 'be.disabled', 'View')
      }) 

      ////// CLIENT > BILLING > UPSELLS > TABLE LIST ASSERTIONS ENDS HERE /////////////

      //Click the Billing navigation module
      cy.get(modulebutton.BillingModuleButton)
        .click()
        .wait(2000)

      //Click the Credit Notes link text folder
      cy.get(linktextfolder.BillingModule[0].CreditNotes)
        .click()
        .wait(2000)

      /////// BILLING > CREDIT NOTES > AWAITING APPROVAL TAB > TABLE LIST ASSERTIONS STARTS HERE //////////

      //verify column Names
      const AwaitingApprovalTableColumnNames = [
        'Name',
        'Client Name',
        'Amount',
        'Status',
        'Request Date',
        'Submitted By',
        'Action'
      ];
      cy.get('table > thead > tr > th').each(($option, index) => {
          cy.wrap($option).should('have.text', AwaitingApprovalTableColumnNames[index])  //verify names based on the expected names per column
          .should('exist')
          .and('have.css', 'color', 'rgb(190, 190, 190)') //text color
          cy.log(AwaitingApprovalTableColumnNames[index]) 
      });

      cy.get('table > tbody > tr:first-child').within(()=>{
        //assert Column 1 > Credit Note Request Name
        BillingCreditNotesTablelist.assertColumn1CreditNoteRequestName(' > td:nth-child(1) > a', 'Copywriting Work')
        //assert Column 2 > Client Name
        GETClientName.then(()=>{
          BillingCreditNotesTablelist.assertColumn2ClientName(' > td:nth-child(2) > a', clientName)
        })
        //assert Column 3 > Amount
        BillingCreditNotesTablelist.assertColumn3Amount(' > td:nth-child(3) > span', '$ 97.95')
        //assert Column 4 > Status
        BillingCreditNotesTablelist.assertColumn4Status(' > td:nth-child(4) > span', 'awaiting approval', 'rgb(212, 130, 54)', 'rgb(255, 210, 185)')
        //assert Column 5 > Reqeust Date /Created Date
        BillingCreditNotesTablelist.assertColumn5RequestDate(' > td:nth-child(5) > span', DateTodayIs.TodayDateDDMMYYYY())
        //assert Column 6 > Submitted By
        BillingCreditNotesTablelist.assertColumn6Submittedby(' > td:nth-child(6) > div', 'LP', 'LoganPaul')
        //assert Column 7 > Action:Review button
        BillingCreditNotesTablelist.assertColumn7Action(' > td:nth-child(7) > button', 'not.be.disabled', 'Review')
      })

      /////// BILLING > CREDIT NOTES > AWAITING APPROVAL TAB > TABLE LIST ASSERTIONS ENDS HERE //////////

      //Now I click the Review button of the submitted upsell request waive upsell
      cy.get('table > tbody > tr:first-child > td:nth-child(7) > button')
        .click()
        .wait(2000)

      //verify Upsell to Credit Request / Credit Note Request modal popup
      cy.get(billingmodulelocator.CreditNotesPage[0].CreditNoteRequestModal[0].modal)
        .should('exist')

      //verify modal title
      cy.get(billingmodulelocator.CreditNotesPage[0].CreditNoteRequestModal[0].modaltitle)
        .should('exist')
        .and('have.text', 'Upsell to Credit Request')
        .and('have.css', 'font-weight', '700') // font bold

      //verify Client label and the Client Name itself
      cy.get(billingmodulelocator.CreditNotesPage[0].CreditNoteRequestModal[0].modal).then(()=>{
        GETClientName.then(()=>{
          cy.get(billingmodulelocator.CreditNotesPage[0].CreditNoteRequestModal[0].UpselltoCreditRequestClientNameLabelandName)
            .should('exist')
            .and('contain', clientName)
            .find('label').should('exist').and('have.text', 'Client').and('have.css', 'color', 'rgb(107, 114, 128)') //text color
        })
      })

      //verify Date Label and the Date
      cy.get(billingmodulelocator.CreditNotesPage[0].CreditNoteRequestModal[0].UpselltoCreditRequestDatelabelandDate)
        .should('exist')
        .and('contain', DateTodayIs.TodayDateDDMMYYYY())
        .find('label').should('exist').and('have.text', 'Date').and('have.css', 'color', 'rgb(107, 114, 128)') //text color

      //verify Upsell Items Label and the Upsell Item name
      cy.get(billingmodulelocator.CreditNotesPage[0].CreditNoteRequestModal[0].UpselltoCreditRequestUpsellItemLabelandUpsellItem)
        .should('exist')
        .and('contain', 'Copywriting Work')
        .find('label').should('exist').and('have.text', 'Upsell Items').and('have.css', 'color', 'rgb(107, 114, 128)') //text color

      //verify Quantity label and the number
      cy.get(billingmodulelocator.CreditNotesPage[0].CreditNoteRequestModal[0].UpselltoCreditRequestQuantityLabelandNumber)
        .should('exist')
        .and('contain', '1')
        .find('label').should('exist').and('have.text', 'Quantity').and('have.css', 'color', 'rgb(107, 114, 128)') //text color

      //verify Unit Price Label and the Unit Price
      cy.get(billingmodulelocator.CreditNotesPage[0].CreditNoteRequestModal[0].UpselltoCreditRequestUnitePriceLabelandUnitPrice)
        .should('exist')
        .within(()=>{
          //assert label
          cy.get('label')
            .should('exist')
            .and('have.text', 'Unit Price')
            .and('have.css', 'color', 'rgb(107, 114, 128)') //text color
          //assert the Unit Price
          cy.get('span')
            .should('exist')
            .then((txt)=>{
              expect(txt.text().replace(/\s+/g, ' ').trim()).to.contain('$ 97.95')
            })
            .find('span.text-grayscale-600').should('have.css', 'color', 'rgb(190, 190, 190)') //Dollar text color
        })

      //verify Total Label and the total and the Upsell Fee Waived status
      cy.get(billingmodulelocator.CreditNotesPage[0].CreditNoteRequestModal[0].UpselltoCreditRequestTotalLabelandTotal)
        .should('exist')
        .within(()=>{
          //assert label
          cy.get('label')
            .should('exist')
            .and('have.text', 'Total')
            .and('have.css', 'color', 'rgb(107, 114, 128)') //text color
          //assert the Unit Price
          cy.get('div > span')
            .should('exist')
            .then((txt)=>{
              expect(txt.text().replace(/\s+/g, ' ').trim()).to.contain('$ 97.95Upsell Fee Waived')
            })
            .find('span.text-grayscale-600').should('have.css', 'color', 'rgb(190, 190, 190)') //Dollar text color
        })

      //verify Upsell Description
      cy.get(billingmodulelocator.CreditNotesPage[0].CreditNoteRequestModal[0].UpselltoCreditRequestUpsellDescriptionLabelandUpsellDescription)
        .should('exist')
        .within(()=>{
          //assert label
          cy.get('label')
            .should('exist')
            .and('have.text', 'Upsell Description')
            .and('have.css', 'color', 'rgb(107, 114, 128)') //text color
          //assert the Upsell Description
          cy.get('p')
            .should('exist')
            .and('have.text', 'Copywriting Work')
        })

      //verify Service ASINs label
      cy.get(billingmodulelocator.CreditNotesPage[0].CreditNoteRequestModal[0].UpselltoCreditRequestServiceASINsLabel)
        .should('exist')
        .and('have.text', 'Service ASINs')
        .and('have.css', 'font-weight', '400') //font bold

      //verify Deny button
      cy.get(billingmodulelocator.CreditNotesPage[0].CreditNoteRequestModal[0].DenyButton)
        .should('exist')
        .and('have.text', 'Deny')
        .and('have.css', 'color', 'rgb(255, 255, 255)') //text color
        .and('have.css', 'font-weight', '700') //font bold
        .and('have.css', 'background-color', 'rgb(239, 68, 68)') //background color that form like a capsule
        .and('have.css', 'border-radius', '9999px') // the curve edge of the background color

      //verify Approve button
      cy.get(billingmodulelocator.CreditNotesPage[0].CreditNoteRequestModal[0].ApproveButton)
        .should('exist')
        .and('have.text', 'Approve')
        .and('have.css', 'color', 'rgb(255, 255, 255)') //text color
        .and('have.css', 'font-weight', '700') //font bold
        .and('have.css', 'background-color', 'rgb(16, 185, 129)') //background color that form like a capsule
        .and('have.css', 'border-radius', '9999px') // the curve edge of the background color

      //Now Click the Deny button
      cy.get(billingmodulelocator.CreditNotesPage[0].CreditNoteRequestModal[0].DenyButton)
        .click()
        .wait(2000)

      //verify What's the reason for denying this credit note request? modal popup
      cy.get(billingmodulelocator.CreditNotesPage[0].WhatsthereasonfordenyingthiscreditnoterequestModal[0].modal)
        .should('exist')

      //verify modal title
      cy.get(billingmodulelocator.CreditNotesPage[0].WhatsthereasonfordenyingthiscreditnoterequestModal[0].modaltitle)
        .should('exist')
        .and('have.text', `What's the reason for denying this credit note request?`)
        .and('have.css', 'font-weight', '700') //font bold

      //verify Reason textarea field
      cy.get(billingmodulelocator.CreditNotesPage[0].WhatsthereasonfordenyingthiscreditnoterequestModal[0].ReasonTextareafield)
        .should('exist')
        .and('have.value', '') //empty by default
        .and('have.attr', 'placeholder', 'Add a reason for rejecting this credit note request')
      
      //verify Cancel button
      cy.get(billingmodulelocator.CreditNotesPage[0].WhatsthereasonfordenyingthiscreditnoterequestModal[0].CancelButton)
        .should('exist')
        .and('have.text', `Cancel`)
        .and('have.css', 'color', 'rgb(102, 102, 102)') //text color
        .and('have.css', 'font-weight', '700') //font bold

      //verify Deny button
      cy.get(billingmodulelocator.CreditNotesPage[0].WhatsthereasonfordenyingthiscreditnoterequestModal[0].DenyButton)
        .should('exist')
        .and('have.text', `Deny`)
        .and('have.css', 'color', 'rgb(255, 255, 255)') //text color
        .and('have.css', 'background-color', 'rgb(195, 0, 0)') //background color that form like a capsule
        .and('have.css', 'border-radius', '9999px') // the curve edge of the background color
        .and('have.css', 'font-weight', '700') //font bold

      //// REQUIRED ASSERTIONS STARTS HERE /////////

      //Without enter a reason data, click the Deny button
      cy.get(billingmodulelocator.CreditNotesPage[0].WhatsthereasonfordenyingthiscreditnoterequestModal[0].DenyButton)
        .click()
        .wait(1000)

      //verify the What's the reason for denying this credit note request? modal popup should remain open
      cy.get(billingmodulelocator.CreditNotesPage[0].WhatsthereasonfordenyingthiscreditnoterequestModal[0].modal)
        .should('exist')

      //verify Error Text - Required
      cy.get('form > div > div.text-red-700')
        .should('exist')
        .and('have.text', 'Required')
        .and('have.css', 'color', 'rgb(185, 28, 28)') //text color

      //Now Enter Reason data
      cy.get(billingmodulelocator.CreditNotesPage[0].WhatsthereasonfordenyingthiscreditnoterequestModal[0].ReasonTextareafield)
        .clear()
        .type('I will Deny this waive upsell request for testing purpose.')
        .wait(700)
        .should('have.value', 'I will Deny this waive upsell request for testing purpose.')

      //Click again the Deny button
      cy.get(billingmodulelocator.CreditNotesPage[0].WhatsthereasonfordenyingthiscreditnoterequestModal[0].DenyButton)
        .click()
        .wait(3000)

      //// REQUIRED ASSERTIONS ENDS HERE /////////

      //verify alert-success message popup
      cy.GETAlertMessagepopup(alertmessagepopup.TopMessage, 'Credit note request denied')
          
      //click the x button to close the notification message popup
      cy.get('div.p-4 > div.w-full > button.bg-white')
        .click()
        .wait(1000)
        
      //As expected it should go to Billing > Credit Notes > Denied Tab
      //Click Denied Tab
      cy.get(billingmodulelocator.CreditNotesPage[0].pageTabs[0].DeniedTab)
        .click()
        .wait(2000)

      //verify that it goes to the Denied tab page
      cy.url().should('contain', '=denied')

      ///////// BILLING > CREDIT NOTES > DENIED TAB > TABLE LIST ASSERTIONS STARTS HERE /////// 
      
      //I am going to click the date column in order to go up to row 1 the recently denied request


      cy.get('table > tbody > tr:first-child').within(()=>{
        //assert Column 1 > Name
        BillingCreditNotesTablelist.assertColumn1CreditNoteRequestName(' >td:nth-child(1) > a', 'Copywriting Work')
        //assert Column 2 > Client Name
        GETClientName.then(()=>{
          BillingCreditNotesTablelist.assertColumn2ClientName(' >td:nth-child(2) > a', clientName)
        })
        //assert Column 3 > Amount
        BillingCreditNotesTablelist.assertColumn3Amount(' >td:nth-child(3) > span', '$ 97.95')
        //assert Column 4 > Status
        BillingCreditNotesTablelist.assertColumn4Status(' > td:nth-child(4) > span', 'denied', 'rgb(239, 68, 68)', 'rgb(254, 226, 226)')
        //assert Column 5 > Request Date
        BillingCreditNotesTablelist.assertColumn5RequestDate(' > td:nth-child(5) > span', DateTodayIs.TodayDateDDMMYYYY())
        //assert Column 6 > Submitted By
        BillingCreditNotesTablelist.assertColumn6Submittedby(' > td:nth-child(6) > div', 'LP', 'LoganPaul')
        //assert Column 7 > Updated By
        BillingCreditNotesTablelist.assertColumn7UpdatedbyExpectedName(' > td:nth-child(7) > div', 'LP', 'LoganPaul')
        //assert Column 8 > Action:View
        BillingCreditNotesTablelist.assertColumn8Action(' > td:nth-child(8) > button', 'not.be.disabled', 'View')
      })

      ///////// BILLING > CREDIT NOTES > DENIED TAB > TABLE LIST ASSERTIONS ENDS HERE ///////

      //Then click the view button
      cy.get('table > tbody > tr:first-child > td > button')
        .click()
        .wait(2000)

      //verify Upsell Credit Note Request modal popup open
      cy.get('div.opacity-100 > div.rounded-xl')
        .should('exist')
    
      //verify modal title
      cy.get('div.opacity-100 > div.rounded-xl > div > h3 > div > span')
        .should('exist')
        .and('have.text', 'Upsell  Credit Note Request')
        .and('have.css', 'font-weight', '700')  //font bold

      //verify the Denied section information
      cy.get('form > div > div.mb-4')
        .scrollIntoView()
        .should('exist')
        .and('have.css', 'background-color', 'rgb(254, 242, 242)')
        .within(()=>{
          //assert the Your credit note request was rejected text
          cy.get('p.text-xl')
            .should('exist')
            .and('have.css', 'color', 'rgb(239, 68, 68)') //text color
            .and('have.css', 'font-weight', '700')  //font bold
            .then((txt)=>{
              expect(txt.text().replace(/\s+/g, ' ').trim()).to.equal('Credit note request was rejected')
            })
          //assert label Rejected By
          cy.get(' > label:nth-child(2)')
            .should('exist')
            .and('have.text', 'Rejected By')
            .and('have.css', 'color', 'rgb(107, 114, 128)') //text color
          //assert the Rejector Name
          cy.get(' > p.pb-2')
            .should('exist')
            .then((txt)=>{
              expect(txt.text().replace(/\s+/g, ' ').trim()).to.equal('Peter Kanluran')
            })
          //assert label Reason for Rejection
          cy.get(' > label:nth-child(4)')
            .should('exist')
            .and('have.text', 'Reason for rejection')
            .and('have.css', 'color', 'rgb(107, 114, 128)') //text color
          //assert The Reason entered data
          cy.get(' > p:nth-child(5)')
            .should('exist')
            .and('have.text', 'I will Deny this waive upsell request for testing purpose.')
        })

      //close the modal by pressing the {esc} key
      cy.get('body').type('{esc}');

      //Click the Clients Navigation Module
      cy.get(modulebutton.ClientsModuleButton)
        .click()
        .wait(2000) 

      //Then click then client name link text
      cy.get('table > tbody > tr:first-child > td:nth-child(1) > a')
        .click()
        .wait(3000)

      //click the billing tab
      cy.get(clientmodulelocator.ClientMainPageTab[0].BillingTab)
        .click()
        .wait(2000)

      //Click Credit Notes tab
      cy.get(clientmodulelocator.BillingTabPage[0].PageTabs[0].CreditNotesTab)
        .click()
        .wait(2000)

      ////// CLIENT > BILLING > CREDIT NOTES > TABLE LIST ASSERTION STARTS HERE //////////

      cy.get('table > tbody > tr:first-child').within(()=>{
        //assert Column 4 > Status
        UpsellTable.assertColumn4Status(' > td:nth-child(4) > span', 'denied', 'rgb(239, 68, 68)', 'rgb(254, 226, 226)')
        //assert Column 6 > Updated By
        UpsellTable.assertColumn6UpdatedbyExpectedName(' > td:nth-child(6) > div', 'LP', 'LoganPaul')
        //assert Column 7 > Action:View
        UpsellTable.assertColumn7Action(' > td:nth-child(7) > button', 'be.disabled', 'View')
      })

      ////// CLIENT > BILLING > CREDIT NOTES > TABLE LIST ASSERTION ENDS HERE //////////

      //I will then click the Upsell Name/Credit note name
      cy.get('table > tbody > tr:first-child > td:nth-child(1) > a')
        .click()
        .wait(2000)

      //verify Upsell Credit Note Request Modal popup
      cy.get(clientmodulelocator.BillingTabPage[0].CreditNotesTabpage[0].CreditNotesModal[0].modal)
        .should('exist')

      //locate the denied section informations and assert
      cy.get('form >div > div.mb-4')
        .scrollIntoView()
        .should('exist')
        .within(()=>{
          //assert the Your credit note request was rejected text
          cy.get('p.text-xl')
            .should('exist')
            .and('have.css', 'color', 'rgb(239, 68, 68)') //text color
            .and('have.css', 'font-weight', '700')  //font bold
            .then((txt)=>{
              expect(txt.text().replace(/\s+/g, ' ').trim()).to.equal('Your credit note request was rejected')
            })
          //assert label Rejected By
          cy.get(' > label:nth-child(2)')
            .should('exist')
            .and('have.text', 'Rejected By')
            .and('have.css', 'color', 'rgb(107, 114, 128)') //text color
          //assert the Rejector Name
          cy.get(' > p.pb-2')
            .should('exist')
            .then((txt)=>{
              expect(txt.text().replace(/\s+/g, ' ').trim()).to.equal('Peter Kanluran')
            })
          //assert label Reason for Rejection
          cy.get(' > label:nth-child(4)')
            .should('exist')
            .and('have.text', 'Reason for rejection')
            .and('have.css', 'color', 'rgb(107, 114, 128)') //text color
          //assert The Reason entered data
          cy.get(' > p:nth-child(5)')
            .should('exist')
            .and('have.text', 'I will Deny this waive upsell request for testing purpose.')
        })
    })
    it("Testcase ID: CCCR0003 - Approve Waive Upsell Fee, Upsell Request turned Credit Note Request",()=>{

      let GETClientName;
      let clientName;
      let GETCNnumber;
      let cnNumber;
      let GETInvoiceNumber;
      let theInvoiceNumber;

      //Login using account specialist
      cy.userlogin(loginmodule.EmailAddressInputfield, loginmodule.PasswordInputfield, loginmodule.SigninButton, testdata.userAccounts[0].accountspecialist1, testdata.userAccounts[0].accountspecialistandprojectmanagerpassword)

      //Click the Clients Navigation Module
      cy.get(modulebutton.ClientsModuleButton)
        .click()
        .wait(2000) 

      //Then click then client name link text
      cy.get('table > tbody > tr:first-child > td:nth-child(1) > a')
        .click()
        .wait(3000)

      //GET the current client name that shows as the title
      GETClientName = new Promise((resolve)=>{
        cy.get(clientmodulelocator.ClientNameTitle)
          .then((name)=>{
            clientName = name.text().trim();
          })
      })

      //click the billing tab
      cy.get(clientmodulelocator.ClientMainPageTab[0].BillingTab)
        .click()
        .wait(2000)

      // Click the Upsells sub tab
      cy.get(clientmodulelocator.BillingTabPage[0].PageTabs[0].UpsellsTab)
        .click()
        .wait(2000)
        
      //Click the Create Upsell button
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellButton)
        .click()
        .wait(2000)

      //verify the Create Upsell modal
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].modal)
        .should('exist')

       ///////// CREATE UPSELL REQUEST STARTS HERE //////////////

      //Select Upsell item
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UpsellitemAndSelectDropdownmenu)
        .find('select')
        .should('exist')
        .select('1604151000000147020')
        .wait(1000)
        .should('have.value', '1604151000000147020')

      //verify that it goes on top option 1
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UpsellitemAndSelectDropdownmenu)
        .find('select option:selected')
        .should('exist')
        .wait(1000)
        .should('have.text', 'Copywriting Work')

      //verify Unit Price value updated
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UnitPricelabelAndInputfield)
        .find('.relative > input')
        .should('exist')
        .wait(1000)
        .should('have.value', '97.95')

      //verify Waive Upsell Fee Label and Slide button
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].WaiveUpsellFeelabelAndSlidebutton)
        .should('exist')
        .within(()=>{
          //assert label
          cy.get('label')
            .should('exist')
            .and('have.text', 'Waive Upsell Fee')
            .and('have.css', 'color', 'rgb(107, 114, 128)') //text color
          //assert button
          cy.get('button')
            .should('exist')
            .and('not.be.disabled')
            .and('have.attr', 'aria-checked', 'false') //by default it is off
            .and('have.css', 'background-color', 'rgb(229, 231, 235)') //expected background color when OFF
            .and('have.css', 'border-radius', '9999px') //the curve edge of the background color
        })

      //THEN slide ON the waive upsell fee button
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].WaiveUpsellFeelabelAndSlidebutton)
        .find('button')
        .click()
        .wait(1000)
        .should('have.css', 'background-color', 'rgb(16, 185, 129)').and('have.css', 'border-radius', '9999px') //the expected color after it was click


      //verify Upsell Description value updated
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].UpsellDescriptionlabelAndTextareafield)
        .find('textarea')
        .should('exist')
        .wait(1000)
        .should('have.value', 'Copywriting Work')
        
      //Click Submit Button
      cy.get(clientmodulelocator.BillingTabPage[0].UpsellsTabpage[0].CreateUpsellModal[0].SubmitButton)
        .click()
        .wait(8000)
      /*
      //verify alert-success message popup
      cy.GETAlertMessagepopup(alertmessagepopup.TopMessage, 'Upsell Created')
      //then i am going to close the alert popup
      cy.get(alertmessagepopup.notificationmessagedeleteicon)
        .click()
      */
      ///////// CREATE UPSELL REQUEST ENDS HERE //////////////

      //verify as it is expected to automatically transferred to Client > Billing > Credit Notes Tab
      cy.get(clientmodulelocator.BillingTabPage[0].PageTabs[0].CreditNotesTab)
        .should('exist')
        .and('have.text', ' Credit Notes')
        .and('have.css', 'color', 'rgb(239, 68, 68)') //text color is red signifies that it is currently accessed
        .and('have.css', 'font-weight', '600') //font bold

      //verify that also the url destination is correct which is at the Credit Notes tab page
      cy.url().should('contain', '/billing/creditnotes')

      ////// CLIENT > BILLING > UPSELLS > TABLE LIST ASSERTIONS STARTS HERE ////////
      
      //verify Column Names
      const expected_columnNames = [
        'Name',
        'Date',
        'Amount',
        'Status',
        'Submitted By',
        'Updated By',
        'Action'
      ];
      cy.get('table > thead > tr > th').each(($option, index) => {
          cy.wrap($option).should('have.text', expected_columnNames[index])  //verify names based on the expected names per column
          .should('exist')
          .and('have.css', 'color', 'rgb(190, 190, 190)') //text color
          cy.log(expected_columnNames[index]) 
      });

      cy.get('table > tbody > tr:first-child').within(()=>{
        //assert column 1 > Service Name / Upsell Name Request
        ClientCreditNotesTableList.assertColumn1CreditNoteRequestName(' > td:nth-child(1) > a', 'Copywriting Work')
        //assert column 2 > Created/Submitted Date
        ClientCreditNotesTableList.assertColumn2Date(' > td:nth-child(2) > span', DateTodayIs.TodayDateDDMMYYYY())
        //assert column 3 > Amount
        ClientCreditNotesTableList.assertColumn3Amount(' > td:nth-child(3) > span', '$ 97.95')
        //assert row 1 column 4 > Status
        ClientCreditNotesTableList.assertColumn4Status(' > td:nth-child(4) > span', 'awaiting approval', 'rgb(212, 130, 54)', 'rgb(255, 210, 185)')
        //assert row 1 column 5 > Submitted By
        ClientCreditNotesTableList.assertColumn5Submittedby(' > td:nth-child(5) > div', 'LP', 'LoganPaul')
        //assert row 1 column 6 > Updated By
        ClientCreditNotesTableList.assertColumn6UpdatedbyExpectedDASH(' > td:nth-child(6)','—')
        //assert row 1 column 7 > Action column > has Cancel button
        ClientCreditNotesTableList.assertColumn7Action(' > td:nth-child(7) > button', 'not.be.disabled', 'Cancel')
      })

      ////// CLIENT > BILLING > UPSELLS > TABLE LIST ASSERTIONS ENDS HERE ////////

      //Go to Billing > Credit Notes

      //Click the Billing navigation module
      cy.get(modulebutton.BillingModuleButton)
        .click()
        .wait(2000)

      //Click the Credit Notes link text folder
      cy.get(linktextfolder.BillingModule[0].CreditNotes)
        .click()
        .wait(2000)

      /////// BILLING > CREDIT NOTES > AWAITING APPROVAL TAB > TABLE LIST ASSERTIONS STARTS HERE //////////

      //verify column Names
      const AwaitingApprovalTableColumnNames = [
        'Name',
        'Client Name',
        'Amount',
        'Status',
        'Request Date',
        'Submitted By',
        'Action'
      ];
      cy.get('table > thead > tr > th').each(($option, index) => {
          cy.wrap($option).should('have.text', AwaitingApprovalTableColumnNames[index])  //verify names based on the expected names per column
          .should('exist')
          .and('have.css', 'color', 'rgb(190, 190, 190)') //text color
          cy.log(AwaitingApprovalTableColumnNames[index]) 
      });

      cy.get('table > tbody > tr:first-child').within(()=>{
        //assert Column 1 > Credit Note Request Name
        BillingCreditNotesTablelist.assertColumn1CreditNoteRequestName(' > td:nth-child(1) > a', 'Copywriting Work')
        //assert Column 2 > Client Name
        GETClientName.then(()=>{
          BillingCreditNotesTablelist.assertColumn2ClientName(' > td:nth-child(2) > a', clientName)
        })
        //assert Column 3 > Amount
        BillingCreditNotesTablelist.assertColumn3Amount(' > td:nth-child(3) > span', '$ 97.95')
        //assert Column 4 > Status
        BillingCreditNotesTablelist.assertColumn4Status(' > td:nth-child(4) > span', 'awaiting approval', 'rgb(212, 130, 54)', 'rgb(255, 210, 185)')
        //assert Column 5 > Reqeust Date /Created Date
        BillingCreditNotesTablelist.assertColumn5RequestDate(' > td:nth-child(5) > span', DateTodayIs.TodayDateDDMMYYYY())
        //assert Column 6 > Submitted By
        BillingCreditNotesTablelist.assertColumn6Submittedby(' > td:nth-child(6) > div', 'LP', 'LoganPaul')
        //assert Column 7 > Action:Review button
        BillingCreditNotesTablelist.assertColumn7Action(' > td:nth-child(7) > button', 'not.be.disabled', 'Review')
      })

      /////// BILLING > CREDIT NOTES > AWAITING APPROVAL TAB > TABLE LIST ASSERTIONS ENDS HERE //////////

      //Now I click the Review button of the submitted upsell request waive upsell
      cy.get('table > tbody > tr:first-child > td:nth-child(7) > button')
        .click()
        .wait(2000)

      //verify Upsell to Credit Request / Credit Note Request modal popup
      cy.get(billingmodulelocator.CreditNotesPage[0].CreditNoteRequestModal[0].modal)
        .should('exist')

      //Click Approve button
      cy.get(billingmodulelocator.CreditNotesPage[0].CreditNoteRequestModal[0].ApproveButton)
        .scrollIntoView()
        .click()
        .wait(2000)

      //verify Are you sure you want to approve the request to waive the upsell fee? modal popup
      cy.get(billingmodulelocator.CreditNotesPage[0].AreyousureyouwanttoapprovetherequesttowaivetheupsellfeeModal[0].modal)
        .should('exist')

      //verify modal title
      cy.get(billingmodulelocator.CreditNotesPage[0].AreyousureyouwanttoapprovetherequesttowaivetheupsellfeeModal[0].modaltitle)
        .should('exist')
        .and('have.text', `Are you sure you want to approve the request to waive the upsell fee?`)

      //verify If you click approve, a paid invoice will be automatically generated text
      cy.get(billingmodulelocator.CreditNotesPage[0].AreyousureyouwanttoapprovetherequesttowaivetheupsellfeeModal[0].IfyouclickapproveapaidinvoicewillbeautomaticallygeneratedTEXT)
        .should('exist')
        .then((txt)=>{
          expect(txt.text().replace(/\s+/g, ' ').trim()).to.contain('If you click approve, a paid invoice will be automatically generated')
        })
        .find('span').should('have.text', 'approve').and('have.css', 'color', 'rgb(0, 150, 109)') // approve text color

      //verify Cancel button
      cy.get(billingmodulelocator.CreditNotesPage[0].AreyousureyouwanttoapprovetherequesttowaivetheupsellfeeModal[0].CancelButton)
        .should('exist')
        .and('not.be.disabled')
        .and('have.text', 'Cancel')
        .and('have.css', 'font-weight', '700') //font bold
        .and('have.css', 'color', 'rgb(148, 148, 148)') //text color

      //verify Approve button
      cy.get(billingmodulelocator.CreditNotesPage[0].AreyousureyouwanttoapprovetherequesttowaivetheupsellfeeModal[0].ApproveButton)
        .should('exist')
        .and('not.be.disabled')
        .and('have.text', 'Approve')
        .and('have.css', 'font-weight', '700') //font bold
        .and('have.css', 'color', 'rgb(255, 255, 255)') //text color
        .and('have.css', 'background-color', 'rgb(16, 185, 129)') //background color that form like a capsule
        .and('have.css', 'border-radius', '9999px') //the curve edge of the background color

      //Click the Approve button
      cy.get(billingmodulelocator.CreditNotesPage[0].AreyousureyouwanttoapprovetherequesttowaivetheupsellfeeModal[0].ApproveButton)
        .click()
        .wait(6000)

      //As expected it will go to Billing > Credit Notes > Applied Tab
      //verify Applied tab if found then click
      cy.get(billingmodulelocator.CreditNotesPage[0].pageTabs[0].AppliedTab)
        .should('exist')
        .and('have.text', 'applied')
        .and('have.css', 'color', 'rgb(156, 163, 175)') //text color before it is click
        .click()
        .wait(2000)
        .should('have.css', 'color', 'rgb(24, 121, 216)') //after it was click

      //verif url destination
      cy.url().should('contain', '=applied')

      /////////// BILLING > CREDIT NOTES > APPLIED TAB > TABLE LIST ASSERTIONS STARTS HERE ////////////////

      cy.get('table > tbody > tr:first-child').within(()=>{
        //assert Column 1 > Credit Notes Request Name
        BillingCreditNotesTablelist.assertColumn1CreditNoteRequestName(' > td:nth-child(1) > a', 'Copywriting Work')
        //assert Column 2 > Client Name
        GETClientName.then(()=>{
          BillingCreditNotesTablelist.assertColumn2ClientName(' > td:nth-child(2) > a', clientName)
        })
        //assert Column 3 > CN#
        BillingCreditNotesTablelist.assertColumn3CN(' > td:nth-child(3)', 'CN-')
        //GET the CN number and store in a variable
        GETCNnumber = new Promise((resolve)=>{
          cy.get(' > td:nth-child(3)').then((cnNum)=>{
            cnNumber = cnNum.text().trim();
          })
        })
        //assert Column 4 > Amount
        BillingCreditNotesTablelist.assertColumn3Amount(' > td:nth-child(4) > span', '$ 97.95')
        //assert Column 5 > Status
        BillingCreditNotesTablelist.assertColumn5Status(' > td:nth-child(5) > span', 'applied', 'rgb(16, 185, 129)', 'rgb(209, 250, 229)')
        //assert Column 6 > Request Date
        BillingCreditNotesTablelist.assertColumn5RequestDate(' > td:nth-child(6) > span', DateTodayIs.TodayDateDDMMYYYY())
        //assert Column 7 > Submitted By
        BillingCreditNotesTablelist.assertColumn7Submittedby(' > td:nth-child(7) > div', 'LP', 'LoganPaul')
        //assert Column 8 > Updated By
        BillingCreditNotesTablelist.assertColumn7UpdatedbyExpectedName(' > td:nth-child(8) > div', 'LP', 'LoganPaul')
        //assert Column 9 > Action:View
        BillingCreditNotesTablelist.assertColumn9Action(' > td:nth-child(9) > button', 'not.be.disabled', 'View')
      })

      /////////// BILLING > CREDIT NOTES > APPLIED TAB > TABLE LIST ASSERTIONS ENDS HERE ////////////////

      //then I will click the View button
      cy.get('table > tbody > tr:first-child > td > button')
        .click()
        .wait(2000)

      //verify Upsell Credit Note Request modal popup
      cy.get(billingmodulelocator.CreditNotesPage[0].CreditNoteRequestModal[0].modal)
        .should('exist')

      ////// UPSELL CREDIT NOTE REQUEST MODAL ELEMENTS ASSERTIONS STARTS HERE //////////

      //verify Credit note details label
      cy.get(billingmodulelocator.CreditNotesPage[0].CreditNoteRequestModal[0].CreditNoteDetailsLabel)
        .scrollIntoView()
        .should('exist')
        .and('have.text', 'Credit note details')
        .and('have.css', 'font-weight', '700') //font bold

      //verify Amount $ 97.95 (incl. invoice tax, if applicable)
      cy.get(billingmodulelocator.CreditNotesPage[0].CreditNoteRequestModal[0].AmountLabelandValue)
        .should('exist')
        .within(()=>{
          //assert label
          cy.get('label')
            .should('exist')
            .and('have.text', 'Amount')
            .and('have.css', 'color', 'rgb(107, 114, 128)') //text color
          //assert $0.00
          cy.get(' > div > span.text-inherit')
            .should('exist')
            .then((txt)=>{
              expect(txt.text().replace(/\s+/g, ' ').trim()).to.contain('$ 97.95')
            })
            .find('span.text-grayscale-600').should('have.css', 'color', 'rgb(190, 190, 190)') //text color
          //assert (incl. invoice tax, if applicable)
          cy.get(' > div > span.text-grayscale-700')
            .should('exist')
            .and('have.css', 'color', 'rgb(148, 148, 148)') //text color
            .and('have.css', 'font-style', 'italic')
            .and('have.css', 'font-size', '11px')
        })

      //verify ZOHO Credit Note Label and CN# number
      cy.get(billingmodulelocator.CreditNotesPage[0].CreditNoteRequestModal[0].ZohoCreditNoteLabelandCNNumber)
        .should('exist')
        .within(()=>{
          //assert label
          cy.get('label')
            .should('exist')
            .and('have.text', 'Zoho Credit Note')
            .and('have.css', 'color', 'rgb(107, 114, 128)') //text color
          //assert CN number
          GETCNnumber.then(()=>{
            cy.get('div > span')
              .should('exist')
              .and('have.text', cnNumber)
          })
          //assert View PDF button
          cy.get("div > button[title='View PDF']")
            .should('exist')
            .and('not.be.disabled')
          //assert Download PDF button
          cy.get("div > button[title='Download PDF']")
            .should('exist')
            .and('not.be.disabled')
        })

      //verify Credits applied to invoices label
      cy.get(billingmodulelocator.CreditNotesPage[0].CreditNoteRequestModal[0].CreditsappliedtoinvoicesLabel)
        .should('exist')
        .and('have.text', 'Credits applied to invoices')
        .and('have.css', 'color', 'rgb(107, 114, 128)') //text color

      //verify Credits applied to invoices section - column names
      const expectedColumnNames = [
        'Invoice Number',
        'Applied Credits',
        'Applier',
        'Date Applied'
      ];
      cy.get('div.bg-grayscale-400 > div').each(($option, index) => {
        cy.wrap($option).should('have.text', expectedColumnNames[index]) //verify names based on the expected options
          .should('exist')
          .and('have.css', 'color', 'rgb(148, 148, 148)') //text color
          cy.log(expectedColumnNames[index]) 
      });

      //verify under the Credits applied to invoices section
      cy.get('form > div > div > div.flex-col > div > div:nth-child(2)')
        .should('exist')
        .within(()=>{
          //assert check mark beside the invoice number
          cy.get(' > p > svg')
            .should('exist')
            .and('have.css', 'color', 'rgb(0, 186, 136)') //text color
          //assert Invoice Number link text
          cy.get(' > p > a')
            .should('exist')
            .and('not.be.disabled')
          //Then I will get the invoice number and store it in a variable for later verification
          GETInvoiceNumber = new Promise((resolve)=>{
            cy.get(' > p > a')
              .then((txt)=>{
                theInvoiceNumber = txt.text().trim();
              })
              resolve();
          })
          //assert Applied credit amount
          cy.get(' > div > span')
            .should('exist')
            .then((txt)=>{
              expect(txt.text().replace(/\s+/g, ' ').trim()).to.contain('$ 97.95')
            })
            .and('have.css', 'color', 'rgb(0, 186, 136)') //text color
            .find('span').should('have.text', '$').and('have.css', 'color', 'rgb(190, 190, 190)') //text color
          //assert Applier Name
          cy.get(' > div.text-center')
            .should('exist')
            .and('have.text', 'Logan Paul')
          //assert Date Applied
          cy.get(' > p.text-center')
            .should('exist')
            .and('contain', DateTodayIs.TodayDateDDMMYYYY())
        })
      
      //verify Remaining Credits Label and the amount
      cy.get(billingmodulelocator.CreditNotesPage[0].CreditNoteRequestModal[0].RemainingCreditsLabelandAmount)
        .should('exist')
        .within(()=>{
          //assert label
          cy.get('label')
            .should('exist')
            .and('have.text', 'Remaining Credits:')
            .and('have.css', 'color', 'rgb(148, 148, 148)') //text color
          //assert the amount
          cy.get('p')
            .should('exist')
            .then((txt)=>{
              expect(txt.text().replace(/\s+/g, ' ').trim()).to.contain('$ 0.00')
            })
            .find('span.text-3xl').should('have.text', '$').and('have.css', 'color', 'rgb(190, 190, 190)') //text color
        })

      //verify Credits Applied Label and the amount
      cy.get(billingmodulelocator.CreditNotesPage[0].CreditNoteRequestModal[0].CreditsAppliedLabelandAmount)
        .should('exist')
        .within(()=>{
          //assert label
          cy.get('label')
            .should('exist')
            .and('have.text', 'Credits Applied:')
            .and('have.css', 'color', 'rgb(148, 148, 148)') //text color
          //assert the amount
          cy.get('p')
            .should('exist')
            .then((txt)=>{
              expect(txt.text().replace(/\s+/g, ' ').trim()).to.contain('$ 97.95')
            })
            .find('span.text-3xl').should('have.text', '$').and('have.css', 'color', 'rgb(190, 190, 190)') //text color
        })

      ////// UPSELL CREDIT NOTE REQUEST MODAL ELEMENTS ASSERTIONS ENDS HERE //////////

      //close the modal
      cy.get('body').type('{esc}'); // pressing esc button of the keyboard

      //Click the Clients Navigation Module
      cy.get(modulebutton.ClientsModuleButton)
        .click()
        .wait(2000) 

      //Then click then client name link text
      cy.get('table > tbody > tr:first-child > td:nth-child(1) > a')
        .click()
        .wait(3000)

      //click the billing tab
      cy.get(clientmodulelocator.ClientMainPageTab[0].BillingTab)
        .click()
        .wait(2000)

      //Click the Credit Notes Tab
      cy.get(clientmodulelocator.BillingTabPage[0].PageTabs[0].CreditNotesTab)
        .click()
        .wait(2000)

      ////// CLIENT > BILLING > CREDIT NOTES > TABLE LIST ASSERTION STARTS HERE //////////

      cy.get('table > tbody > tr:first-child').within(()=>{
        //assert Column 4 > Status
        ClientCreditNotesTableList.assertColumn4Status(' > td:nth-child(4) > span', 'applied', 'rgb(16, 185, 129)', 'rgb(209, 250, 229)')
        //assert Column 6 > Updated By
        ClientCreditNotesTableList.assertColumn6UpdatedbyExpectedName(' > td:nth-child(6) > div', 'LP', 'LoganPaul')
      })

      ////// CLIENT > BILLING > CREDIT NOTES > TABLE LIST ASSERTION ENDS HERE //////////

      //Then I will click the view button
      cy.get('table > tbody > tr:first-child > td:nth-child(7) > button')
        .click()
        .wait(2000)

      //verify Upsell Credit Note Request modal popup
      cy.get(clientmodulelocator.BillingTabPage[0].CreditNotesTabpage[0].CreditNotesModal[0].modal)
        .should('exist')

      ////// CLIENT > BILLING > CREDIT NOTES > UPSELL CREDIT NOTE REQUEST MODAL ELEMENTS ASSERTIONS STARTS HERE //////////

      //verify Credit note details label
      cy.get(clientmodulelocator.BillingTabPage[0].CreditNotesTabpage[0].CreditNotesModal[0].CreditNoteDetailsLabel)
        .scrollIntoView()
        .should('exist')
        .and('have.text', 'Credit note details')
        .and('have.css', 'font-weight', '700') //font bold

      //verify Amount $ 97.95 (incl. invoice tax, if applicable)
      cy.get(clientmodulelocator.BillingTabPage[0].CreditNotesTabpage[0].CreditNotesModal[0].AmountLabelandValue)
        .should('exist')
        .within(()=>{
          //assert label
          cy.get('label')
            .should('exist')
            .and('have.text', 'Amount')
            .and('have.css', 'color', 'rgb(107, 114, 128)') //text color
          //assert $0.00
          cy.get(' > div > span.text-inherit')
            .should('exist')
            .then((txt)=>{
              expect(txt.text().replace(/\s+/g, ' ').trim()).to.contain('$ 97.95')
            })
            .find('span.text-grayscale-600').should('have.css', 'color', 'rgb(190, 190, 190)') //text color
          //assert (incl. invoice tax, if applicable)
          cy.get(' > div > span.text-grayscale-700')
            .should('exist')
            .and('have.css', 'color', 'rgb(148, 148, 148)') //text color
            .and('have.css', 'font-style', 'italic')
            .and('have.css', 'font-size', '11px')
        })

      //verify ZOHO Credit Note Label and CN# number
      cy.get(clientmodulelocator.BillingTabPage[0].CreditNotesTabpage[0].CreditNotesModal[0].ZohoCreditNoteLabelandCNNumber)
        .should('exist')
        .within(()=>{
          //assert label
          cy.get('label')
            .should('exist')
            .and('have.text', 'Zoho Credit Note')
            .and('have.css', 'color', 'rgb(107, 114, 128)') //text color
          //assert CN number
          GETCNnumber.then(()=>{
            cy.get('div > span')
              .should('exist')
              .and('have.text', cnNumber)
          })
          //assert View PDF button
          cy.get("div > button[title='View PDF']")
            .should('exist')
            .and('not.be.disabled')
          //assert Download PDF button
          cy.get("div > button[title='Download PDF']")
            .should('exist')
            .and('not.be.disabled')
        })

      //verify Credits applied to invoices label
      cy.get(clientmodulelocator.BillingTabPage[0].CreditNotesTabpage[0].CreditNotesModal[0].CreditsappliedtoinvoicesLabel)
        .should('exist')
        .and('have.text', 'Credits applied to invoices')
        .and('have.css', 'color', 'rgb(107, 114, 128)') //text color

      //verify Credits applied to invoices section - column names
      const expectColumnNames = [
        'Invoice Number',
        'Applied Credits',
        'Applier',
        'Date Applied'
      ];
      cy.get('div.bg-grayscale-400 > div').each(($option, index) => {
        cy.wrap($option).should('have.text', expectColumnNames[index]) //verify names based on the expected options
          .should('exist')
          .and('have.css', 'color', 'rgb(148, 148, 148)') //text color
          cy.log(expectColumnNames[index]) 
      });
      
      //verify under the Credits applied to invoices section
      cy.get('form > div > div > div.flex-col > div > div:nth-child(2)')
        .should('exist')
        .within(()=>{
          //assert check mark beside the invoice number
          cy.get(' > p > svg')
            .should('exist')
            .and('have.css', 'color', 'rgb(0, 186, 136)') //text color
          //assert Invoice Number link text
          cy.get(' > p > a')
            .should('exist')
            .and('not.be.disabled')
          //Then I will get the invoice number and store it in a variable for later verification
          GETInvoiceNumber = new Promise((resolve)=>{
            cy.get(' > p > a')
              .then((txt)=>{
                theInvoiceNumber = txt.text().trim();
              })
              resolve();
          })
          //assert Applied credit amount
          cy.get(' > div > span')
            .should('exist')
            .then((txt)=>{
              expect(txt.text().replace(/\s+/g, ' ').trim()).to.contain('$ 97.95')
            })
            .and('have.css', 'color', 'rgb(0, 186, 136)') //text color
            .find('span').should('have.text', '$').and('have.css', 'color', 'rgb(190, 190, 190)') //text color
          //assert Applier Name
          cy.get(' > div.text-center')
            .should('exist')
            .and('have.text', 'Logan Paul')
          //assert Date Applied
          cy.get(' > p.text-center')
            .should('exist')
            .and('contain', DateTodayIs.TodayDateDDMMYYYY())
        })

      //verify Remaining Credits Label and the amount
      cy.get(clientmodulelocator.BillingTabPage[0].CreditNotesTabpage[0].CreditNotesModal[0].RemainingCreditsLabelandAmount)
        .should('exist')
        .within(()=>{
          //assert label
          cy.get('label')
            .should('exist')
            .and('have.text', 'Remaining Credits:')
            .and('have.css', 'color', 'rgb(148, 148, 148)') //text color
          //assert the amount
          cy.get('p')
            .should('exist')
            .then((txt)=>{
              expect(txt.text().replace(/\s+/g, ' ').trim()).to.contain('$ 0.00')
            })
            .find('span.text-3xl').should('have.text', '$').and('have.css', 'color', 'rgb(190, 190, 190)') //text color
        })

      //verify Credits Applied Label and the amount
      cy.get(clientmodulelocator.BillingTabPage[0].CreditNotesTabpage[0].CreditNotesModal[0].CreditsAppliedLabelandAmount)
        .should('exist')
        .within(()=>{
          //assert label
          cy.get('label')
            .should('exist')
            .and('have.text', 'Credits Applied:')
            .and('have.css', 'color', 'rgb(148, 148, 148)') //text color
          //assert the amount
          cy.get('p')
            .should('exist')
            .then((txt)=>{
              expect(txt.text().replace(/\s+/g, ' ').trim()).to.contain('$ 97.95')
            })
            .find('span.text-3xl').should('have.text', '$').and('have.css', 'color', 'rgb(190, 190, 190)') //text color
        })

      ////// CLIENT > BILLING > CREDIT NOTES > UPSELL CREDIT NOTE REQUEST MODAL ELEMENTS ASSERTIONS ENDS HERE //////////

    })
    it("Testcase ID: CCCR0004 - Create Credit Note Request. Clients with no pending, or overdue invoices",()=>{


      //Login using account specialist
      cy.userlogin(loginmodule.EmailAddressInputfield, loginmodule.PasswordInputfield, loginmodule.SigninButton, testdata.userAccounts[0].accountspecialist1, testdata.userAccounts[0].accountspecialistandprojectmanagerpassword)

      //Click the Clients Navigation Module
      cy.get(modulebutton.ClientsModuleButton)
        .click()
        .wait(2000) 

      //Then click then client name link text
      cy.get('table > tbody > tr:first-child > td:nth-child(1) > a')
        .click()
        .wait(3000)

      //click the billing tab
      cy.get(clientmodulelocator.ClientMainPageTab[0].BillingTab)
        .click()
        .wait(2000)

      //Click the Credit Notes sub tab
      cy.get(clientmodulelocator.BillingTabPage[0].PageTabs[0].CreditNotesTab)
        .click()
        .wait(2000)

      //verify expected url destination
      cy.url().should('contain', '/billing/creditnotes?page')

      //Click the Create Credit Button
      cy.get(clientmodulelocator.BillingTabPage[0].CreditNotesTabpage[0].CreateCreditButton)
        .should('exist')
        .and('not.be.disabled')
        .and('have.text', ' Create Credit')
        .and('have.css', 'font-weight', '700') // font bold
        .and('have.css', 'border-color', 'rgb(30, 58, 138)')
        .and('have.css', 'border-radius', '9999px')
        .click()
        .wait(2000)

      //verify Create Credit Note Request Modal popup
      cy.get(clientmodulelocator.BillingTabPage[0].CreditNotesTabpage[0].CreditNotesModal[0].modal)
        .should('exist')

      /////////// CLIENT > BILLING > CREDIT NOTES TAB > CREATE CREDIT NOTE REQUEST MODAL ASSERTIONS STARTS HERE ////////////////

      //verify modal title
      cy.get(clientmodulelocator.BillingTabPage[0].CreditNotesTabpage[0].CreditNotesModal[0].modaltitle)
        .should('exist')
        .and('have.text', 'create Credit Note Request')
        .and('have.css', 'font-weight', '700') // font bold

      //verify Credit Note Name Label and Input field
      cy.get(clientmodulelocator.BillingTabPage[0].CreditNotesTabpage[0].CreditNotesModal[0].CreditNoteNameLabelandInputfield)
        .should('exist')
        .within(()=>{
          //assert Credit Note Name Label
          cy.get(' > label')
            .should('exist')
            .and('have.text', 'Credit Note Name*')
            .and('have.css', 'color', 'rgb(107, 114, 128)') //text color
            .find('sup').should('have.css', 'color', 'rgb(237, 46, 46)') //text color
          //assert Input field
          cy.get(' > input[name="name"]')
            .should('exist')
            .and('not.be.disabled')
            .and('have.value', '') //empty by default
            .and('have.attr', 'placeholder', 'Enter Credit Note Name')
        })

      //verify Description Label and Textarea field
      cy.get(clientmodulelocator.BillingTabPage[0].CreditNotesTabpage[0].CreditNotesModal[0].DescriptionLabelandTextareafield)
        .should('exist')
        .within(()=>{
          //assert Description Label
          cy.get(' > label')
            .should('exist')
            .and('have.text', 'Description*')
            .and('have.css', 'color', 'rgb(107, 114, 128)') //text color
            .find('sup').should('have.css', 'color', 'rgb(237, 46, 46)') //text color
          //assert Textarea field
          cy.get(' > textarea[name="description"]')
            .should('exist')
            .and('not.be.disabled')
            .and('have.value', '') //empty by default
            .and('have.attr', 'placeholder', 'Enter Credit Note Description')
        })

      //verify Requester Note Label and Textarea field
      cy.get(clientmodulelocator.BillingTabPage[0].CreditNotesTabpage[0].CreditNotesModal[0].RequesterNoteLabelandTextareafield)
        .should('exist')
        .within(()=>{
          //assert Requester Note Label
          cy.get(' > label')
            .should('exist')
            .and('have.text', 'Requester Note*')
            .and('have.css', 'color', 'rgb(107, 114, 128)') //text color
            .find('sup').should('have.css', 'color', 'rgb(237, 46, 46)') //text color
          //assert Textarea field
          cy.get(' > textarea[name="notes"]')
            .should('exist')
            .and('not.be.disabled')
            .and('have.value', '') //empty by default
            .and('have.attr', 'placeholder', 'Enter Requester Note')
        })

      //verify Credit Request Amount Label, Dollar Sign, and Input field
      cy.get(clientmodulelocator.BillingTabPage[0].CreditNotesTabpage[0].CreditNotesModal[0].CreditRequestAmountLabel_DollarSign_Inputfield)
        .should('exist')
        .within(()=>{
          //assert Credit Request Amount Label
          cy.get(' > label')
            .should('exist')
            .and('have.text', 'Credit Request Amount*')
            .and('have.css', 'color', 'rgb(107, 114, 128)') //text color
            .find('sup').should('have.css', 'color', 'rgb(237, 46, 46)') //text color
          //assert Dollar Sign
          cy.get(' > div > span')
            .should('exist')
            .and('have.text', '$')
            .and('have.css', 'color', 'rgb(148, 148, 148)') //text color
            .and('have.css', 'font-weight', '600') // font bold
          //assert Input field
          cy.get(' > div > input[name="amount"]')
            .should('exist')
            .and('not.be.disabled')
            .and('have.value', '0') //default value
            .and('have.attr', 'placeholder', 'Enter Credit Request Amount')
        })

      //verify Save as Draft Button
      cy.get(clientmodulelocator.BillingTabPage[0].CreditNotesTabpage[0].CreditNotesModal[0].SaveasDraftButton)
        .should('exist')
        .and('not.be.disabled')
        .and('have.text', 'Save as Draft')
        .and('have.css', 'color', 'rgb(24, 121, 216)') //text color
        .and('have.css', 'font-weight', '700') // font bold

      //verify Submit Button
      cy.get(clientmodulelocator.BillingTabPage[0].CreditNotesTabpage[0].CreditNotesModal[0].SubmitButton)
        .should('exist')
        .and('not.be.disabled')
        .and('have.text', 'Submit')
        .and('have.css', 'color', 'rgb(255, 255, 255)') //text color
        .and('have.css', 'background-color', 'rgb(0, 47, 93)') //background color that form like a capsule
        .and('have.css', 'border-radius', '9999px')
        .and('have.css', 'font-weight', '700') // font bold

      /////////// CLIENT > BILLING > CREDIT NOTES TAB > CREATE CREDIT NOTE REQUEST MODAL ASSERTIONS ENDS HERE ////////////////

      ////////// REQUIRED ASSERTIONS STARTS HERE ////////////  

      //without enter any data on any fields, click the Submit button
      cy.get(clientmodulelocator.BillingTabPage[0].CreditNotesTabpage[0].CreditNotesModal[0].SubmitButton)
        .click()
        .wait(3000)

      //verify alert-error text message 
      cy.GETAlertMessagepopup(alertmessagepopup.TopMessage, 'Errors found')
      cy.GETAlertMessagepopup(alertmessagepopup.SubMessage, "Credit Note Name is required\nDescription is required\nCredit Request Amount must be >= 1\nRequester Note is required")
      
      //verify Create Credit Note Request Modal popup should remain open
      cy.get(clientmodulelocator.BillingTabPage[0].CreditNotesTabpage[0].CreditNotesModal[0].modal)
        .should('exist')

      //verify Error Text 1 - Credit Note Name is required
      cy.get('form > div > div:nth-child(1) > div')
        .should('exist')
        .and('have.text', 'Credit Note Name is required')
        .and('have.css', 'color', 'rgb(185, 28, 28)') //text color

      //verify Error Text 2 - Description is required
      cy.get('form > div > div:nth-child(2) > div')
        .should('exist')
        .and('have.text', 'Description is required')
        .and('have.css', 'color', 'rgb(185, 28, 28)') //text color

      //verify Error Text 3 - Requester Note is required
      cy.get('form > div > div:nth-child(3) > div')
        .should('exist')
        .and('have.text', 'Requester Note is required')
        .and('have.css', 'color', 'rgb(185, 28, 28)') //text color

      //verify Error Text 4 - Credit Request Amount must be >= 1
      cy.get('form > div > div:nth-child(4) > div:nth-child(3)')
        .should('exist')
        .and('have.text', "Credit Request Amount must be >= 1")
        .and('have.css', 'color', 'rgb(185, 28, 28)') //text color

      //Enter Credit Note Name
      cy.get(clientmodulelocator.BillingTabPage[0].CreditNotesTabpage[0].CreditNotesModal[0].CreditNoteNameLabelandInputfield)
        .find(' > input[name="name"]')
        .clear()
        .type('Credit Request For Test')
        .wait(600)
        .should('have.value', 'Credit Request For Test')

      //Enter Description
      cy.get(clientmodulelocator.BillingTabPage[0].CreditNotesTabpage[0].CreditNotesModal[0].DescriptionLabelandTextareafield)
        .find(' > textarea[name="description"]')
        .clear()
        .type('This description is for testing purposes only')
        .wait(600)
        .should('have.value', 'This description is for testing purposes only')

      //Enter Requester Note
      cy.get(clientmodulelocator.BillingTabPage[0].CreditNotesTabpage[0].CreditNotesModal[0].RequesterNoteLabelandTextareafield)
        .find(' > textarea[name="notes"]')
        .clear()
        .type('This requester note is for testing purposes only')
        .wait(600)
        .should('have.value', 'This requester note is for testing purposes only')

      //Enter Credit Request Amount
      cy.get(clientmodulelocator.BillingTabPage[0].CreditNotesTabpage[0].CreditNotesModal[0].CreditRequestAmountLabel_DollarSign_Inputfield)
        .find(' > div > input[name="amount"]')
        .clear()
        .type('447')
        .wait(600)
        .should('have.value', '447')

      //Click Submit Button
      cy.get(clientmodulelocator.BillingTabPage[0].CreditNotesTabpage[0].CreditNotesModal[0].SubmitButton)
        .click()
        .wait(3000)

      //verify alert success message popup
      cy.GETAlertMessagepopup(alertmessagepopup.TopMessage, 'Your credit note request has been sent for approval')
      cy.GETAlertMessagepopup(alertmessagepopup.SubMessage, "Credit note request created.")
      
      ////////// REQUIRED ASSERTIONS ENDS HERE //////////// 
      
      ///////////// CLIENT > BILLING > CREDIT NOTES TAB > TABLE LISTS ASSERTIONS STARTS HERE ///////////////

      //verify Column names
      const expectedcolumnNames = [
        'Name',
        'Date',
        'Amount',
        'Status',
        'Submitted By',
        'Updated By',
        'Action'
      ]
      cy.get('table > thead > tr > th').each(($name, index)=>{
        cy.wrap($name)
          .should('exist')
          .and('have.text', expectedcolumnNames[index])
          .and('have.css', 'color', 'rgb(190, 190, 190)') //text color
          .and('have.css', 'font-weight', '700') // font bold
      })

      //Then assert the Row 1 each column data
      cy.get('table > tbody > tr:first-child').within(()=>{
        //assert Column 1 > Credit Note Name
        ClientCreditNotesTableList.assertColumn1CreditNoteRequestName(' > td:nth-child(1) > a', 'Credit Request For Test')
        //assert Column 2 > Date
        ClientCreditNotesTableList.assertColumn2Date(' > td:nth-child(2) > span', DateTodayIs.TodayDateDDMMYYYY())
        //assert Column 3 > Amount
        ClientCreditNotesTableList.assertColumn3Amount(' > td:nth-child(3) > span', '$ 447.00')
        //assert Column 4 > Status
        ClientCreditNotesTableList.assertColumn4Status(' > td:nth-child(4) > span', 'awaiting approval', 'rgb(212, 130, 54)', 'rgb(255, 210, 185)')
        //assert Column 5 > Submitted By
        ClientCreditNotesTableList.assertColumn5Submittedby(' > td:nth-child(5) > div', 'LP', 'LoganPaul')
        //assert Column 6 > Updated By
        ClientCreditNotesTableList.assertColumn6UpdatedbyExpectedDASH(' > td:nth-child(6)', '—')
        //assert Column 7 > Action:Cancel
        ClientCreditNotesTableList.assertColumn7Action(' > td:nth-child(7) > button', 'not.be.disabled', 'Cancel')
      })
      ///////////// CLIENT > BILLING > CREDIT NOTES TAB > TABLE LISTS ASSERTIONS ENDS HERE ///////////////
      
    })
    it("Testcase ID: CCCR0005 - Cancel the Credit Note Request",()=>{


       //Login using account specialist
       cy.userlogin(loginmodule.EmailAddressInputfield, loginmodule.PasswordInputfield, loginmodule.SigninButton, testdata.userAccounts[0].accountspecialist1, testdata.userAccounts[0].accountspecialistandprojectmanagerpassword)

       //Click the Clients Navigation Module
       cy.get(modulebutton.ClientsModuleButton)
         .click()
         .wait(2000) 
 
       //Then click then client name link text
       cy.get('table > tbody > tr:first-child > td:nth-child(1) > a')
         .click()
         .wait(3000)
 
       //click the billing tab
       cy.get(clientmodulelocator.ClientMainPageTab[0].BillingTab)
         .click()
         .wait(2000)
 
       //Click the Credit Notes sub tab
       cy.get(clientmodulelocator.BillingTabPage[0].PageTabs[0].CreditNotesTab)
         .click()
         .wait(2000)
 
       //verify expected url destination
       cy.url().should('contain', '/billing/creditnotes?page')
 
       //Click the Create Credit Button
       cy.get(clientmodulelocator.BillingTabPage[0].CreditNotesTabpage[0].CreateCreditButton)
         .should('exist')
         .and('not.be.disabled')
         .and('have.text', ' Create Credit')
         .and('have.css', 'font-weight', '700') // font bold
         .and('have.css', 'border-color', 'rgb(30, 58, 138)')
         .and('have.css', 'border-radius', '9999px')
         .click()
         .wait(2000)
 
       //verify Create Credit Note Request Modal popup
       cy.get(clientmodulelocator.BillingTabPage[0].CreditNotesTabpage[0].CreditNotesModal[0].modal)
         .should('exist')
 
       ////////// CREATE CREDIT NOTE REQUEST STARTS HERE ////////////  
 
       //Enter Credit Note Name
       cy.get(clientmodulelocator.BillingTabPage[0].CreditNotesTabpage[0].CreditNotesModal[0].CreditNoteNameLabelandInputfield)
         .find(' > input[name="name"]')
         .clear()
         .type('To be Deleted Credit Request')
         .wait(600)
         .should('have.value', 'To be Deleted Credit Request')
 
       //Enter Description
       cy.get(clientmodulelocator.BillingTabPage[0].CreditNotesTabpage[0].CreditNotesModal[0].DescriptionLabelandTextareafield)
         .find(' > textarea[name="description"]')
         .clear()
         .type('This description is for testing purposes only')
         .wait(600)
         .should('have.value', 'This description is for testing purposes only')
 
       //Enter Requester Note
       cy.get(clientmodulelocator.BillingTabPage[0].CreditNotesTabpage[0].CreditNotesModal[0].RequesterNoteLabelandTextareafield)
         .find(' > textarea[name="notes"]')
         .clear()
         .type('This requester note is for testing purposes only')
         .wait(600)
         .should('have.value', 'This requester note is for testing purposes only')
 
       //Enter Credit Request Amount
       cy.get(clientmodulelocator.BillingTabPage[0].CreditNotesTabpage[0].CreditNotesModal[0].CreditRequestAmountLabel_DollarSign_Inputfield)
         .find(' > div > input[name="amount"]')
         .clear()
         .type('447')
         .wait(600)
         .should('have.value', '447')
 
       //Click Submit Button
       cy.get(clientmodulelocator.BillingTabPage[0].CreditNotesTabpage[0].CreditNotesModal[0].SubmitButton)
         .click()
         .wait(3000)
 
       //verify alert success message popup
       cy.GETAlertMessagepopup(alertmessagepopup.TopMessage, 'Your credit note request has been sent for approval')
       cy.GETAlertMessagepopup(alertmessagepopup.SubMessage, "Credit note request created.")
       
       ////////// CREATE CREDIT NOTE REQUEST ENDS HERE //////////// 
       
       ///////////// CLIENT > BILLING > CREDIT NOTES TAB > TABLE LISTS ASSERTIONS STARTS HERE ///////////////
 
       //verify Column names
       const expectedcolumnNames = [
         'Name',
         'Date',
         'Amount',
         'Status',
         'Submitted By',
         'Updated By',
         'Action'
       ]
       cy.get('table > thead > tr > th').each(($name, index)=>{
         cy.wrap($name)
           .should('exist')
           .and('have.text', expectedcolumnNames[index])
           .and('have.css', 'color', 'rgb(190, 190, 190)') //text color
           .and('have.css', 'font-weight', '700') // font bold
       })
 
      //Then assert the Row 1 each column data
       cy.get('table > tbody > tr:first-child').within(()=>{
         //assert Column 1 > Credit Note Name
         ClientCreditNotesTableList.assertColumn1CreditNoteRequestName(' > td:nth-child(1) > a', 'To be Deleted Credit Request')
         //assert Column 2 > Date
         ClientCreditNotesTableList.assertColumn2Date(' > td:nth-child(2) > span', DateTodayIs.TodayDateDDMMYYYY())
         //assert Column 3 > Amount
         ClientCreditNotesTableList.assertColumn3Amount(' > td:nth-child(3) > span', '$ 447.00')
         //assert Column 4 > Status
         ClientCreditNotesTableList.assertColumn4Status(' > td:nth-child(4) > span', 'awaiting approval', 'rgb(212, 130, 54)', 'rgb(255, 210, 185)')
         //assert Column 5 > Submitted By
         ClientCreditNotesTableList.assertColumn5Submittedby(' > td:nth-child(5) > div', 'LP', 'LoganPaul')
         //assert Column 6 > Updated By
         ClientCreditNotesTableList.assertColumn6UpdatedbyExpectedDASH(' > td:nth-child(6)', '—')
         //assert Column 7 > Action:Cancel
         ClientCreditNotesTableList.assertColumn7Action(' > td:nth-child(7) > button', 'not.be.disabled', 'Cancel')
       })
      ///////////// CLIENT > BILLING > CREDIT NOTES TAB > TABLE LISTS ASSERTIONS ENDS HERE ///////////////
       
      //Then here I am going to click the Cancel button
      cy.get('table > tbody > tr:first-child > td:nth-child(7) > button')
        .click()
        .wait(2000)

      //verify the cancel credit note modal popup
      cy.get(clientmodulelocator.BillingTabPage[0].CreditNotesTabpage[0].CancelCreditNoteModal[0].modal)
        .should('exist')

      //verify modal title
      cy.get(clientmodulelocator.BillingTabPage[0].CreditNotesTabpage[0].CancelCreditNoteModal[0].modaltitle)
        .should('exist')
        .and('have.text', 'Cancel Credit Note?')
        .and('have.css', 'font-weight', '700')  //font bold

      //verify Credit Note Name label and the credit note name itself
      cy.get(clientmodulelocator.BillingTabPage[0].CreditNotesTabpage[0].CancelCreditNoteModal[0].creditnotenamelabelandThecreditnotename)
        .should('exist')
        .within((el)=>{
          //assert label and the Credit Note Request name
          cy.get(' > span:nth-child(1)')
            .should('exist')
            .then((el)=>{
              expect(el.text().replace(/\s+/g, ' ').trim()).to.equal('Credit Note Name: To be Deleted Credit Request')
            })
          //assert that the credit note name itself is in bold
          cy.get(' > span:nth-child(2)')
            .should('exist')
            .then((txt)=>{
              expect(el.text().replace(/\s+/g, ' ').trim()).to.contain('Amount: $447')
            })
            .find('b').should('have.text', '$447').and('have.css', 'font-weight', '700')  //font bold
        })

      //verify no button
      cy.get(clientmodulelocator.BillingTabPage[0].CreditNotesTabpage[0].CancelCreditNoteModal[0].nobutton)
        .should('exist')
        .and('be.visible')
        .and('have.text', 'No')
        .and('have.css', 'font-weight', '700')  //font bold
        .and('have.css', 'color', 'rgb(148, 148, 148)')  //text color
        .then((txt)=>{
          const computedStyle = getComputedStyle(txt[0]);
          const customPropertyValue = computedStyle.getPropertyValue('--tw-text-opacity').trim();
          expect(customPropertyValue).to.equal('1');
        })

      //verify Yes button
      cy.get(clientmodulelocator.BillingTabPage[0].CreditNotesTabpage[0].CancelCreditNoteModal[0].yesbutton)
        .should('exist')
        .and('be.visible')
        .and('have.text', 'Yes')
        .and('have.css', 'font-weight', '700')  //font bold
        .and('have.css', 'color', 'rgb(255, 255, 255)')  //text color
        .and('have.css', 'background-color', 'rgb(5, 150, 105)') //background color that form like a capsule
        .and('have.css', 'border-radius', '40px') // the curve edge

      //click the Yes button
      cy.get(clientmodulelocator.BillingTabPage[0].CreditNotesTabpage[0].CancelCreditNoteModal[0].yesbutton)
        .click()
        .wait(2000)

      //verify alert-error text message 
      cy.GETAlertMessagepopup(alertmessagepopup.TopMessage, 'Success')
      cy.GETAlertMessagepopup(alertmessagepopup.SubMessage, 'Credit request updated.')

      //intentionally wait to close the alert-success 
      cy.wait(2000)

      //verify on that cancelled credit note request status as it should be Cancelled
      cy.get('table > tbody > tr:first-child > td:nth-child(4) > span')
        .should('exist')
        .and('be.visible')
        .and('have.text', 'cancelled')
        .and('have.css', 'text-transform', 'capitalize')
        .and('have.css', 'color', 'rgb(239, 68, 68)')  //text color
        .and('have.css', 'background-color', 'rgb(254, 226, 226)') //background color that form like a capsule
        .and('have.css', 'border-radius', '9999px') // the curve edge

      //verify also at the action column that from cancel it becomes View button but disabled
      cy.get('table > tbody > tr:first-child > td > button')
        .should('exist')
        .and('be.visible')
        .and('be.disabled')
        .and('have.text', ' View')
        .and('have.css', 'font-weight', '700')                  //font bold
        .and('have.css', 'color','rgb(148, 148, 148)')          //text color
        .and('have.css', 'border-color', 'rgb(148, 148, 148)')  //the line that forms a square of a button
        .and('have.css', 'border-radius', '12px')               //the curve edge of the button
        .and('have.css', 'width', '108px')
        .and('have.css', 'height', '40px')

      //verify back in the Billing > Credit Notes Table that the cancelled credit note request should have a status of Cancelled
      cy.get('table > tbody > tr:first-child').within(()=>{
        //assert Column 4 > Status
        ClientCreditNotesTableList.assertColumn4Status(' > td:nth-child(4) > span', 'cancelled', 'rgb(239, 68, 68)', 'rgb(254, 226, 226)')
        //assert Column 7 > Action:Cancel
        ClientCreditNotesTableList.assertColumn7Action(' > td:nth-child(7) > button', 'be.disabled', 'View')
      })
    })
    it.skip("Testcase ID: CCCR0006 - Apply to Next Month Invoice [Enter Total Max Credit amount]",()=>{

    })
    it.skip("Testcase ID: CCCR0007 - Apply to Next Month Invoice [Enter partial Credit amount]",()=>{

    })
    // **** CLIENT CREDIT NOTE ENDS HERE ***
    // **** CLIENT BILLING SUBSCRIPTIONS PAYMENT METHOD CARD STARTS HERE ***
    it.skip("Testcase ID: CBS0001 - Verify user can Add New Card Number at the Billing > Subscriptions > Payment Methods [Braintree processed]",()=>{
         
        
      //login using admin role account
      cy.userloginaccount(loginpagelocatorsdata.emailaddressinputfield, loginpagelocatorsdata.passwordinputfield, loginpagelocatorsdata.signinbutton, useraccountdata.usernameAdmin, useraccountdata.adminpassword)

      //click the first top client test in the active client listing AAAROO
      cy.click_link_button(activeclientpagelocatorsdata.aaarootestactiveclient)
      cy.wait(2000)

      //click the billing tab
      cy.click_link_button_xpathlocator(clientbillingpagedata.billingtablink)
      .wait(3000)

      //verify in here that when you click the billing tab the default focus sub tab is the Subscription tab
      //it will be identified as the title becomes in bold red color signifying that it is by default selected or visit
      //then you will find also that there is a title called Overview   
      cy.get(billingsubscriptiondata.Subscriptionstab)
      .should('have.css', 'color', 'rgb(239, 68, 68)') //font color
      .and('have.css', 'font-weight', '600') //font bold
      .and('be.visible')
      .and('exist')

      //verify title in the Subscriptions tab
      cy.get(billingsubscriptiondata.overviewtitle)
      .should('have.css', 'font-weight', '700') //font bold
      .and('be.visible')
      .and('exist')

      //This test client is created as a brain tree payment process
      //verify the payment methods title
      cy.get(billingsubscriptiondata.paymentmethodstitle)
      .should('have.css', 'font-weight', '700') //font bold
      .and('be.visible')
      .and('exist')
      .and('contain', 'Payment Methods')

      //verify add new button
      cy.get(billingsubscriptiondata.addnewbutton)
      .should('have.css', 'color', 'rgb(250, 250, 250)') //font color
      .and('have.css', 'font-weight', '700') //font bold
      .and('have.css', 'background-color', 'rgb(0, 47, 93)') // color of the capsule-like background
      .and('have.css', 'border-radius', '40px') //the curve edge
      .and('have.css', 'width', '114.359375px')
      .and('have.css', 'height', '39.5px')
      .and('be.visible')
      .and('exist')
      .and('not.have.attr', 'disabled')

      //click the add new button
      cy.click_link_button(billingsubscriptiondata.addnewbutton)
      cy.wait(1000)

      //verify that the Add new payment method popup
      cy.get(billingsubscriptiondata.addnewpaymentmethodmodal)
      .should('be.visible')
      .and('exist')

      //verify the add new payment modal title
      cy.get(billingsubscriptiondata.addnewpaymentmethodmodaltitle)
      .should('have.css', 'font-weight', '700') //font bold
      .and('be.visible')
      .and('exist')
      .and('contain', 'Add new Payment Method')

      //verify card number input field label
      cy.get(billingsubscriptiondata.addnewpaymentmethodmodalcardnumberinputfieldlabel)
      .should('be.visible')
      .and('exist')
      .and('contain', 'Card Number')

      //verify card number input field 
     cy.get(billingsubscriptiondata.addnewpaymentmethodmodalcardnumberinputfield)
      .should('be.visible')
      .and('exist')
      .and('not.have.attr', 'disabled')
      //since the input field of the card number is in iframe so trying to get the exact iframe input field 
   

      //////////////////////////////////////////////////////////////////////

        function getStripeField({iframeSelector, fieldSelector}, attempts = 0) {
          Cypress.log({displayName: 'getCardField', message: `${fieldSelector}: ${attempts}`})
        
          if (attempts > 50) throw new Error('too many attempts')
        
          return cy.get(iframeSelector, {timeout:10_000, log:false})
            .eq(0, {log:false})
            .its('0.contentDocument', {log:false}) 
            .find('body', {log:false})
            .then(body => {
              cy.wait(10000)
              const stripeField = body.find(fieldSelector)
              if (!stripeField.length) {
                return cy.wait(300, {log:false})
                  .then(() => {
                    getStripeField({iframeSelector, fieldSelector}, ++attempts)
                  })
              } else {
                return cy.wrap(stripeField)
              }
            })
        }

        getStripeField({
          iframeSelector: '#braintree-hosted-field-number', 
          fieldSelector: '#credit-card-number'
        })
        .should('have.value', '4242 4242 4242 4242').should('be.visible')
      //////////////////////////////////////////////////////////////////////        
    })
    it.skip("Verify user can Set as Default the newly added card number at the Billing > Subscriptions > Payment Methods [Braintree processed]",()=>{

    })
    it.skip("Verify user can Delete an existing card number at the Billing > Subscriptions > Payment Methods [Braintree processed]",()=>{

    })
    it("Testcase ID: CBS0004 - Verify user can do Charge One-Time Addon feature",()=>{

      

      //Login using account specialist
      cy.userlogin(loginmodule.EmailAddressInputfield, loginmodule.PasswordInputfield, loginmodule.SigninButton, testdata.userAccounts[0].accountspecialist1, testdata.userAccounts[0].accountspecialistandprojectmanagerpassword)

      //Click the Clients Navigation Module
      cy.get(modulebutton.ClientsModuleButton)
        .click()
        .wait(2000) 

      //Then click then client name link text
      cy.get('table > tbody > tr:first-child > td:nth-child(1) > a')
        .click()
        .wait(3000)

      //click the billing tab
      cy.get(clientmodulelocator.ClientMainPageTab[0].BillingTab)
        .click()
        .wait(2000)

      //verify the kebab menu buton in the Billing > Subscriptions page - next to Edit button
      //if found, then click
      cy.get(clientmodulelocator.BillingTabPage[0].SubscriptionTabpage[0].KebabMenu)
        .should('exist')
        .and('not.be.disabled')
        .click()
        .wait(1000)

      //verify the sub menus such as Charge One-Time Addon | One Time Change | Pause Subscription | Cancel Subscription
      //verify the Charge One-Tim Addon and One Time Charge sub menus
      const ChargeOneTimeAddon_and_OneTimeCharge_SubmenuButtons = [
        'Charge One-Time Addon',
        'One Time charge'
      ];
      cy.get('div.ring-opacity-5 > div:nth-child(1) > button').each(($option, index) => {
          cy.wrap($option).should('have.text', ChargeOneTimeAddon_and_OneTimeCharge_SubmenuButtons[index])  //verify names based on the expected names per column
            .should('exist')
            .and('not.be.disabled')
            .realHover()
            .wait(500)
            .should('have.css', 'color', 'rgb(255, 255, 255)') //text color changed as it hovers onto it
            .and('have.css', 'background-color', 'rgb(239, 68, 68)') // background color emerge as it hovers onto it
          cy.log(ChargeOneTimeAddon_and_OneTimeCharge_SubmenuButtons[index]) 
      });

      //verify Pause Subscription and Cancel Subscription sub menus
      const PauseSubscription_and_CancelSubscription_SubmenuButtons = [
        'Pause Subscription',
        'Cancel Subscription'
      ];

      cy.get('div.ring-opacity-5 > div:nth-child(2) > button').each(($option, index) => {
        cy.wrap($option).should('have.text', PauseSubscription_and_CancelSubscription_SubmenuButtons[index])  //verify names based on the expected names per column
          .should('exist')
          .and('not.be.disabled')
          .realHover()
          .wait(500)
          .should('have.css', 'color', 'rgb(255, 255, 255)') //text color changed as it hovers onto it
          .and('have.css', 'background-color', 'rgb(239, 68, 68)') // background color emerge as it hovers onto it
        cy.log(PauseSubscription_and_CancelSubscription_SubmenuButtons[index]) 
      });

      //Then click the Charge On-Time Addon sub menu button
      cy.get('div.ring-opacity-5 > div:nth-child(1) > button')
        .realHover()
        .click()
        .wait(1000)

      //verify Charge One-Time Addon modal popup
      cy.get(clientmodulelocator.BillingTabPage[0].SubscriptionTabpage[0].ChargeOneTimeAddonModal[0].modal)
        .should('exist')

      //verify modal title
      cy.get(clientmodulelocator.BillingTabPage[0].SubscriptionTabpage[0].ChargeOneTimeAddonModal[0].modaltitle)
        .should('exist')
        .and('have.text', 'Charge One-Time Addon')
        .and('have.css', 'font-weight', '700') //font bold

      //verify Addon 1 Label and the Delete icon button
      cy.get(clientmodulelocator.BillingTabPage[0].SubscriptionTabpage[0].ChargeOneTimeAddonModal[0].Addon1labelandDeletebutton)
        .should('exist')
        .within(()=>{
          //assert Addon1 label
          cy.get('span')
            .should('exist')
            .and('have.text', 'Addon 1')
            .and('have.css', 'font-weight', '700') //font bold
          //assert delete icon button
          cy.get('button')
            .should('exist')
            .and('not.be.disabled')
        })

      //verify Addon Label and the Select Menu Drop down menu
      cy.get(clientmodulelocator.BillingTabPage[0].SubscriptionTabpage[0].ChargeOneTimeAddonModal[0].AddonLabelandSelectMenu)
        .should('exist')
        .within(()=>{
          //assert Addon label
          cy.get('label')
            .should('exist')
            .and('have.text', 'Addon *')
            .find('sup').should('have.css', 'color', 'rgb(237, 46, 46)') //asterisk color
          //assert Addon Select drop down menu
          cy.get('select[name="addons.0.addon_code"]')
            .should('exist')
            .and('not.be.disabled')
            .find('option').should('have.length.gt', 0) //Since the list is not static and it can be added and/or remove, but it should have at least minimum of 1
        })

      //verify Type Label and One_Time text
      cy.get(clientmodulelocator.BillingTabPage[0].SubscriptionTabpage[0].ChargeOneTimeAddonModal[0].TypeLabelandOne_Time)
        .should('exist')
        .within(()=>{
          //assert Type Label
          cy.get('label')
            .should('exist')
            .and('have.text', 'Type')
          //assert One_Time text
          cy.get('div')
            .should('exist')
            .and('have.text', 'one_time')
            .and('have.css', 'text-transform', 'capitalize')
        })

      //verify Qty label and Input field
      cy.get(clientmodulelocator.BillingTabPage[0].SubscriptionTabpage[0].ChargeOneTimeAddonModal[0].QtyLabelandInputfield)
        .should('exist')
        .within(()=>{
          //assert Qty Label
          cy.get('label')
            .should('exist')
            .and('have.text', 'Qty')
          //assert Qty input field
          cy.get('input[name="addons.0.quantity"]')
            .should('exist')
            .and('not.be.disabled')
            .and('have.value', '1')
        })

      //verify Price label and Input field
      cy.get(clientmodulelocator.BillingTabPage[0].SubscriptionTabpage[0].ChargeOneTimeAddonModal[0].PriceLabelandInputfield)
        .should('exist')
        .within(()=>{
          //assert Price label
          cy.get('label')
            .should('exist')
            .and('contain', 'Price')
          //assert the $ symbol
          cy.get(' > div > div > span')
            .should('exist')
            .and('have.text', '$')
            .and('have.css', 'color', 'rgb(107, 114, 128)') //text color
          //and then the input field
          cy.get(' > div > input[name="addons.0.price"]')
            .should('exist')
            .and('not.be.disabled')
            .and('have.value', '0')
        })

      //verify Total label and value
      cy.get(clientmodulelocator.BillingTabPage[0].SubscriptionTabpage[0].ChargeOneTimeAddonModal[0].TotalLabelandValue)
        .should('exist')
        .within(()=>{
          //assert Price label
          cy.get('label')
            .should('exist')
            .and('have.text', 'Total')
          //assert $0.00
          cy.get('span')
            .should('exist')
            .and('have.text', '$0.00')
            .and('have.css', 'color', 'rgb(16, 185, 129)') //text color
        })

      //verify Addon Item Description textarea field
      cy.get(clientmodulelocator.BillingTabPage[0].SubscriptionTabpage[0].ChargeOneTimeAddonModal[0].ItemDescriptiontextareafield)
        .should('exist')
        .within(()=>{
          //assert textarea input field
          cy.get('textarea[name="addons.0.addon_description"]')
            .should('exist')
            .and('not.be.disabled')
            .and('have.value', '') //empty by default before selecting an item
            .and('have.attr', 'maxlength', '2000')
          //assert the 0/2000 characters text info
          cy.get(' > div')
            .should('exist')
            .then((txt)=>{
              expect(txt.text().replace(/\s+/g, ' ').trim()).to.equal('0/2000 characters')
            })
        })

      //verify +Addon button
      cy.get(clientmodulelocator.BillingTabPage[0].SubscriptionTabpage[0].ChargeOneTimeAddonModal[0].AddonButton)
        .should('exist')
        .and('not.be.disabled')
        .and('have.css', 'color', 'rgb(75, 85, 99)') //text color
        .and('have.css', 'border-color', 'rgb(75, 85, 99)') //border color outline that form a capsule like
        .and('have.css', 'border-radius', '16px')
        .and('have.css', 'font-weight', '700')
        .then((txt)=>{
          expect(txt.text().trim()).to.equal('Addon')
        })

      //verify Cancel button
      cy.get(clientmodulelocator.BillingTabPage[0].SubscriptionTabpage[0].ChargeOneTimeAddonModal[0].CancelButton)
        .should('exist')
        .and('not.be.disabled')
        .and('have.text', 'Cancel')
        .and('have.css', 'font-weight', '700')
        .and('have.css', 'color', 'rgb(239, 68, 68)') //text color

      //verify Apply button
      cy.get(clientmodulelocator.BillingTabPage[0].SubscriptionTabpage[0].ChargeOneTimeAddonModal[0].ApplyButton)
        .should('exist')
        .and('not.be.disabled')
        .and('have.text', 'Apply')
        .and('have.css', 'color', 'rgb(255, 255, 255)') //text color
        .and('have.css', 'font-weight', '700') //font bold
        .and('have.css', 'background-color', 'rgb(185, 28, 28)') //background color that form like a capsule

      /////// REQUIRED CHARGE ONE-TIME ADDON MODAL ASSERTIONS STARTS HERE /////////////

      //without selecing addon, click the Apply button
      cy.get(clientmodulelocator.BillingTabPage[0].SubscriptionTabpage[0].ChargeOneTimeAddonModal[0].ApplyButton)
        .click()
        .wait(3000)

      //alert-success message popup
      cy.GETAlertMessagepopup(alertmessagepopup.TopMessage, 'Errors found')
      cy.GETAlertMessagepopup(alertmessagepopup.SubMessage, 'addon code is required')

      //verify that the modal should remain open
      cy.get(clientmodulelocator.BillingTabPage[0].SubscriptionTabpage[0].ChargeOneTimeAddonModal[0].modal)
        .should('exist')

      //verify Error text appear inside the modal - addon code is required
      cy.get('form > div > div:nth-child(2) > div')
        .should('exist')
        .and('have.text', 'addon code is required')
        .and('have.css', 'color', 'rgb(185, 28, 28)') //text color

      //Now I will select addon
      cy.get(clientmodulelocator.BillingTabPage[0].SubscriptionTabpage[0].ChargeOneTimeAddonModal[0].AddonLabelandSelectMenu)
        .find('select[name="addons.0.addon_code"]').select('1604151000000179046').should('have.value', '1604151000000179046')
        .wait(500)

      //verify that after i select an addon item, it goes onto the top
      cy.get(clientmodulelocator.BillingTabPage[0].SubscriptionTabpage[0].ChargeOneTimeAddonModal[0].AddonLabelandSelectMenu)
        .find('select option:selected')
        .should('have.text', 'Product Images')

      //verify that the Error Text should not visible inside the modal
      cy.get('form > div > div:nth-child(2) > div')
        .should('not.exist')

      //verify the updated Price value
      cy.get(clientmodulelocator.BillingTabPage[0].SubscriptionTabpage[0].ChargeOneTimeAddonModal[0].PriceLabelandInputfield)
        .find(' > div > input[name="addons.0.price"]')
        .should('have.value', '125.35')
        .and('not.be.disabled')

      //verify the updated Total value
      cy.get(clientmodulelocator.BillingTabPage[0].SubscriptionTabpage[0].ChargeOneTimeAddonModal[0].TotalLabelandValue)
        .find('span')
        .should('have.text', '$125.35')

      //verify the updated Item description value
      cy.get(clientmodulelocator.BillingTabPage[0].SubscriptionTabpage[0].ChargeOneTimeAddonModal[0].ItemDescriptiontextareafield)
        .find('textarea[name="addons.0.addon_description"]')
        .should('have.value', 'Product Images')

      /////// REQUIRED CHARGE ONE-TIME ADDON MODAL ASSERTIONS ENDS HERE /////////////

      //To continue, No I am going to click the Apply button
      cy.get(clientmodulelocator.BillingTabPage[0].SubscriptionTabpage[0].ChargeOneTimeAddonModal[0].ApplyButton)
        .click()
        .wait(3000)

      //verify success notification popup
      cy.GETAlertMessagepopup(alertmessagepopup.TopMessage, 'Charge successful')
      cy.GETAlertMessagepopup(alertmessagepopup.SubMessage, 'One-time addon has been purchased successfully.')

      //the reason for this is to avoid if there is a delay in producing an invoice at the billing > invoice history tab - it will not be able to find in time
      //Now as expected it will create an invoice at the Billing > Invoice History
      cy.wait(8000)  
      
      //verify Invoice History Tab, if Found then click
      cy.get(clientmodulelocator.BillingTabPage[0].PageTabs[0].InvoiceHistoryTab)
        .should('exist')
        .and('have.text', ' Invoice History')
        .and("have.css", "color", "rgb(156, 163, 175)") //default text color 
        .and("have.css", "font-weight", "400") //font bold
        .click()
        .wait(700)
        .should("have.css", "color", "rgb(239, 68, 68)") //after it was click it changes the text color
        
      //verify the url expected destination page
      cy.url().should('contain', '/billing/invoicehistory')

      /////// CLIENT > BILLING > INVOICE HISTORY > TABLE LIST ASSERTIONS STARTS HERE ///////////

      //verify first the column Names
      //verify the expected column names
      const expectedColumnNames = [
        'Invoice #',
        'Amount',
        'Balance',
        'Status',
        'Due Date',
        'Action'
      ];
      cy.get('table > thead > tr > th').each(($option, index) => {
          cy.wrap($option).should('have.text', expectedColumnNames[index]) //verify names based on the expected options
          .should('exist')
          .and('have.css', 'font-weight', '700')  //font bold
          .and('have.css', 'color', 'rgb(190, 190, 190)') //text color
          cy.log(expectedColumnNames[index]) 
      });


      cy.get('table > tbody > tr:first-child').within(()=>{
        //assert Column 1 > Invoice Number
        InvoiceHistoryPageTable.assertColumn1InvoiceNumber(' > td:nth-child(1) > a', 'INV-')
        //assert Column 2 > Amount
        InvoiceHistoryPageTable.assertColumn2Amount(' > td:nth-child(2) > span', '$ 125.35')
        //assert Column 3 > Balance
        InvoiceHistoryPageTable.assertColumn3Balance(' > td:nth-child(2) > span', '$ 125.35')
        //assert Column 4 > Status
        InvoiceHistoryPageTable.assertColumn4Status(' > td:nth-child(4) > span', 'sent', 'rgb(59, 130, 246)', 'rgb(219, 234, 254)')
        //assert Column 5 > Due Date - the Due Date is 5 days from the time the Charge One-Time Addon is submitted
        InvoiceHistoryPageTable.assertColumn5Date(' > td:nth-child(5) > span', DateTodayIs.TodayDateDDMMYYYYPlus5days())
        //assert Column 6 > Action:DownloadPDF | SENT EMAIL | VIEW PDF icons
        InvoiceHistoryPageTable.assertActionColumWith3Buttons(' > td:nth-child(6) > span')
      })
      /////// CLIENT > BILLING > INVOICE HISTORY > TABLE LIST ASSERTIONS ENDS HERE ///////////
    
    })  
    it.skip("Testcase ID: CBS0005 - Verify user can Edit description under the Plan & Addon Details",()=>{

  
      //Login using account specialist
      cy.userlogin(loginmodule.EmailAddressInputfield, loginmodule.PasswordInputfield, loginmodule.SigninButton, testdata.userAccounts[0].accountspecialist1, testdata.userAccounts[0].accountspecialistandprojectmanagerpassword)

      //Click the Clients Navigation Module
      cy.get(modulebutton.ClientsModuleButton)
        .click()
        .wait(2000) 

      //Then click then client name link text
      cy.get('table > tbody > tr:first-child > td:nth-child(1) > a')
        .click()
        .wait(3000)

      //click the billing tab
      cy.get(clientmodulelocator.ClientMainPageTab[0].BillingTab)
        .click()
        .wait(2000)

      //////////  PLAN & ADD ON DETAILS TABLE AND ELEMENTS ASSERTIONS STARTS HERE /////////////
      //verify the PLAN & ADD ON DETAILS TABLE Each Column names
      const ColumnNames = [
        'Plan & Addon Details',
        'Qty',
        'Rate',
        'Tax',
        'Amount'
      ];
      cy.get('table > thead > tr > th').each(($option, index) => {
          cy.wrap($option).should('have.text', ColumnNames[index]) //verify names based on the expected options
            .should('exist')
            .and('have.css', 'font-weight', '700')  //font bold
            .and('have.css', 'text-transform', 'uppercase') //all caps
          cy.log(ColumnNames[index]) 
      });
    
      ///// PLAN & ADDON DETAILS > ROW 1 > TABLE LISTS ASSERTIONS STARTS HERE /////
      
      cy.get('table > tbody > tr:first-child').within(()=>{
        //assert Row 1 > Column 1 > Addon Description
        cy.get(' > td:nth-child(1)')
          .should('exist')
          .and('contain', 'Agency Subscription') // Addon Description title
          .within(()=>{
            //assert the Addon Description
            cy.get(' > div > div > div:nth-child(1)')
              .should('exist')
              .and('not.have.text', '') // means there is a description regardless of what it is
            //assert Edit Description Link text
            cy.get(' > div > div > div:nth-child(2)')
              .should('exist')
              .and('not.be.disabled')
              .and('have.text', 'Edit Description')
              .and('have.css', 'color', 'rgb(239, 68, 68)') //text color
          })
        //assert Row 1 > Column 2 > Qty
        cy.get(' > td:nth-child(2)')
          .should('exist')
          .and('have.text', '1')
        //assert Row 1 > Column 3 > Rate
        cy.get(' > td:nth-child(3)')
          .should('exist')
          .and('have.text', '$800.00')
        //Assert Row 1 > Column 4 > Tax 
        cy.get(' > td:nth-child(4)')
          .should('exist')
          .and('have.text', '-') //no added tax value since the address is not canada
        //assert Row 1 > Column 5 > Amount
        cy.get(' > td:nth-child(5)')
          .should('exist')
          .and('have.text', '$800.00')
      })

      ///// PLAN & ADDON DETAILS > ROW 1 > TABLE LISTS ASSERTIONS ENDS HERE /////

      //Under still the table there is Sub Total label and the Sub total amount - Then verify
      cy.get('table > tbody > tr:nth-child(2) ')
        .should('exist')
        .within(()=>{
          //assert Sub Total label
          cy.get(' > td:nth-child(1)')
            .should('exist')
            .and('have.text', 'Sub Total')
          //assert Sub Total Amount
          cy.get(' > td:nth-child(2)')
            .should('exist')
            .and('have.text', '$800.00')
        })
    
      //verify No Tax Label and the value
      cy.get('table > tbody > tr:nth-child(3)')
        .should('exist')
          .within(()=>{
            //assert No Tax (0%) label
            cy.get(' > td:nth-child(1)')
              .should('exist')
              .and('have.text', 'No Tax (0%)')
            //assert No Tax (0%) Amount
            cy.get(' > td:nth-child(2)')
              .should('exist')
              .and('have.text', '$0.00')
          })

      //verify TOTAL(USD) label and the total amount
      cy.get('table > tbody > tr:nth-child(4)')
        .should('exist')
          .within(()=>{
            //assert TOTAL(USD) label
            cy.get(' > td:nth-child(1)')
              .should('exist')
              .and('have.text', 'Total (USD)')
              .and('have.css', 'font-weight', '700')  //font bold
            //assert Total Amount
            cy.get(' > td:nth-child(2)')
              .should('exist')
              .and('have.text', '$800.00')
              .and('have.css', 'font-weight', '700')  //font bold
          })
    
      //Now I will click the Edit Description Link text
      cy.get('table > tbody > tr:first-child > td:nth-child(1) > div > div:nth-child(1) > div:nth-child(2)')
        .click()
        .wait(1000)

      //After a user clicks onto the Edit Description link text, the Addon Description becomes a textarea field
      // This is a test description. Please disregard as I will remove it after. -> this is the default addon description
      //verify
      cy.get('table > tbody > tr:first-child > td:nth-child(1) > div > div:nth-child(1)')
        .find('textarea')
        .should('exist')
      //Then I will edit
      cy.get('table > tbody > tr:first-child > td:nth-child(1) > div > div:nth-child(1)')
        .find('textarea')
        .and('not.be.disabled')
        .clear()
        .type("This editted Addon Description is for testing purposes only!")
        .wait(600)
        .should('have.value', 'This editted Addon Description is for testing purposes only!')
        .type('{ctrl}{enter}') //And I will Press {CTRL} + {ENTER} on my keyboard
        .wait(3000)

      //verify alert-success message popup
      cy.getMessagepopup(alertmessageslocators.authenticationerror, 'description updated')
      cy.getMessagepopup(alertmessageslocators.loginerrormessage, 'Item description has been updated successfully.')

      //Intentionally I will have to wait for 7 seconds then reload the page 
      cy.wait(10000)
      cy.reload()

      //Again verify if the description is updated and from textarea field becomes back to non textarea field
      cy.get('table > tbody > tr:first-child > td:nth-child(1) > div > div:nth-child(1) > div:nth-child(1)')
        .should('exist')
        .then((txt)=>{
          expect(txt.text().trim()).to.equal('This editted Addon Description is for testing purposes only!')
        })

    })
    it.skip("Testcase ID: CBS0006 - Verify user can delete the added description under the Plan & Addon Details",()=>{

      
      
      //login using account specialist
      cy.userloginaccount(loginmoduledata.cssSelectors[0].emailaddressInputfield, loginmoduledata.cssSelectors[0].passwordInputfield, loginmoduledata.cssSelectors[0].submitButton, useraccountdata.accountspecialist1, useraccountdata.accountspecialistandprojectmanagerpassword)

      //click the Client module nav link
      cy.get(BSmodulesnavlink.clientsnavlink)
        .click()
        .wait(3000)

      //click the row 1 test in the active client 
      cy.get('table > tbody > tr:first-child > td:nth-child(1) > a')
        .click()
        .wait(2000)

      //click the billing tab
      cy.get(clientmoduledata.cssSelectors[1].BillingTabLink)
        .click()
        .wait(1000)

      //Now I will click the Edit Description Link text
      cy.get('table > tbody > tr:first-child > td:nth-child(1) > div > div:nth-child(1) > div:nth-child(2)')
        .click()
        .wait(1000)

      //Delete the Entire Description
      cy.get('table > tbody > tr:first-child > td:nth-child(1) > div > div:nth-child(1)')
        .find('textarea')
        .clear()
        .type('{ctrl}{enter}') //And I will Press {CTRL} + {ENTER} on my keyboard
        .wait(3000)

      //verify alert-success message popup
      cy.getMessagepopup(alertmessageslocators.authenticationerror, 'description updated')
      cy.getMessagepopup(alertmessageslocators.loginerrormessage, 'Item description has been updated successfully.')

      //Intentionally I will have to wait for 7 seconds then reload the page 
      cy.wait(8000)
      cy.reload()
      cy.wait(3000)
      cy.reload()

      //Again verify if the description is updated and from textarea field becomes back to non textarea field
      cy.get('table > tbody > tr:first-child > td:nth-child(1) > div > div:nth-child(1) > div:nth-child(1)')
        .should('exist')
        .then((txt)=>{
          expect(txt.text().trim()).to.equal('Add a description') // default text
        })

      //verify the Edit Description Link text is now Add Description Link text
      cy.get('table > tbody > tr:first-child > td:nth-child(1) > div > div:nth-child(1) > div:nth-child(2)')
        .should('exist')
        .and('have.text', 'Add Description')
        .and('have.css', 'color', 'rgb(239, 68, 68)') //text color
      
    })
    it("Testcase ID: CBS0007 - Verify user can Add a Subscription Note ",()=>{
      
      let GETActivationDate;
      let ClientActivationDate;
  
      //Login using account specialist
      cy.userlogin(loginmodule.EmailAddressInputfield, loginmodule.PasswordInputfield, loginmodule.SigninButton, testdata.userAccounts[0].accountspecialist1, testdata.userAccounts[0].accountspecialistandprojectmanagerpassword)

      //Click the Clients Navigation Module
      cy.get(modulebutton.ClientsModuleButton)
        .click()
        .wait(2000) 
 
      //Then click then client name link text
      cy.get('table > tbody > tr:first-child > td:nth-child(1) > a')
        .click()
        .wait(3000)
 
      //click the billing tab
      cy.get(clientmodulelocator.ClientMainPageTab[0].BillingTab)
        .click()
        .wait(2000)

      //GET the Activation Date
      GETActivationDate = new Promise((resolve)=>{
        cy.get(clientmodulelocator.BillingTabPage[0].SubscriptionTabpage[0].ClientBasicContactInformationSection[0].ActivationDate)
          .then((date)=>{
            ClientActivationDate = date.text().trim();
            resolve();
          })
      })

      //verify Note Section Area
      cy.get('div.client-updates > div:nth-child(4)')
        .should('exist')

      //verify NOTES Label and Add button
      cy.get('div.client-updates > div:nth-child(4) > div:nth-child(1)')
        .should('exist')
        .within(()=>{
          //assert NOTES label
          cy.get(' > span')
            .should('exist')
            .and('have.text', 'NOTES|')
            .and('have.css', 'color', 'rgb(156, 163, 175)') //text color
            .then((txt)=>{
              const computedStyle = getComputedStyle(txt[0]);
              const customPropertyValue = computedStyle.getPropertyValue('--tw-text-opacity').trim();
              expect(customPropertyValue).to.equal('1')
            })
          //assert ADD button
          cy.get(' > div > button')
            .should('exist')
            .and('not.be.disabled')
            .and('have.text', ' Add')
            .and('have.css', 'color', 'rgb(239, 68, 68)') //text color
            .and('have.css', 'font-weight', '700') //font bold
        })

      //verify Default Notes
      cy.get('div.client-updates > div:nth-child(4) > div:nth-child(2)')
        .should('exist')
        .within(()=>{
          //assert notes icon
          cy.get(' > div:nth-child(1) > svg')
            .should('exist')
            .and('have.css', 'color', 'rgb(75, 85, 99)') //icon color
          //assert the default note itself
          cy.get(' > div:nth-child(2) > span:nth-child(1)')
            .should('exist')
            .and('have.text', 'The company will pay the Agency a $800.00 USD monthly retainer for services rendered in 1.1. for up to 5 Parent ASINs on the Amazon.com platform.')
          //assert the Seller Interactive Admin name
          cy.get(' > div:nth-child(2) > span:nth-child(3)')
            .should('exist')
            .and('have.text', '- Seller Interactive Admin')
            .and('have.css', 'color', 'rgb(107, 114, 128)') //text color
          //assert Activation Date and Delete icon
          cy.get(' > div:nth-child(3) ')
            .should('exist')
            .within(()=>{
              //assert Activation Date
              GETActivationDate.then(()=>{
                cy.get('  > div > span')
                  .should('exist')
                  .and('have.text', ClientActivationDate)
              })
              //assert delete icon
              cy.get('  > div > button > svg')
                .should('exist')
                .and('not.be.disabled')
                .and('have.css', 'color', 'rgb(156, 163, 175)') //text color
            })
        })

      //Now I will click the Add button
      cy.get('div.client-updates > div:nth-child(4) > div:nth-child(1)')
        .find(' > div > button')
        .click()
        .wait(2000)

      //verify Add Note modal popup
      cy.get('div.relative > div.tail')
        .should('exist')
        //verify inside that mini gui Add note expected elements
        .within(()=>{
          //assert Add note label
          cy.get(' > div:nth-child(1)')
            .should('exist')
            .and('have.text', 'Add Note')
            .and('have.css', 'color', 'rgb(55, 65, 81)') //text color
          //assert textarea field
          cy.get(' > div:nth-child(2) > textarea[name="newDescription"]')
            .should('exist')
            .and('not.be.disabled')
            .and('have.value', '') //empty default
          //assert Save button
          cy.get(' > div:nth-child(3) > button:nth-child(1)')
            .should('exist')
            .and('not.be.disabled')
            .and('have.text', 'Save')
            .and('have.css', 'color', 'rgb(255, 255, 255)') //text color
            .and('have.css', 'background-color', 'rgb(239, 68, 68)') //background color
          //assert Cancel button
          cy.get(' > div:nth-child(3) > button:nth-child(2)')
            .should('exist')
            .and('not.be.disabled')
            .and('have.text', 'Cancel')
            .and('have.css', 'color', 'rgb(107, 114, 128)') //text color
            .and('have.css', 'background-color', 'rgb(243, 244, 246)') //background color
        })
      
      //////// REQUIRED ASSERTIONS STARTS HERE //////////

      //without Enter any note data, click the Save button
      cy.get('div.relative > div.tail')
        .find(' > div:nth-child(3) > button:nth-child(1)')
        .click()
        .wait(3000)

      //verify alert-error message popup
      cy.GETAlertMessagepopup(alertmessagepopup.TopMessage, 'Failed to add note')

      //verify Add note mini gui should remain open
      cy.get('div.relative > div.tail')
        .should('exist')
      
      //additional wait
      cy.wait(5000)

      //////// REQUIRED ASSERTIONS ENDS HERE ///////////

      ////// ADD NEW NOTE STARTS HERE //////////

      //Enter New Note
      cy.get('div.relative > div.tail')
        .find(' > div:nth-child(2) > textarea[name="newDescription"]')
        .clear()
        .type('Added this note today as testing purposes only')
        .wait(700)
        .should('have.value', 'Added this note today as testing purposes only')

      //Click the Save button
      cy.get('div.relative > div.tail')
        .find(' > div:nth-child(3) > button:nth-child(1)')
        .click()
        .wait(3000)

      //verify Alert-success message popup
      cy.GETAlertMessagepopup(alertmessagepopup.TopMessage, 'Note added')
      cy.GETAlertMessagepopup(alertmessagepopup.SubMessage, 'Notes added.')

      ////// ADD NEW NOTE ENDS HERE //////////

      //I will intentionally reload the page after a waiting period of 10seconds
      cy.wait(15000);
      cy.reload();
      cy.wait(15000)

      //verify that the added note is visible
      cy.get('div.client-updates > div:nth-child(4) > div')
        .should('exist')
        .its('length')
        .then(($row)=>{
          cy.get(`div.client-updates > div:nth-child(4) > div:nth-child(${$row})`)
            .should('exist')
            .within(()=>{
              //assert notes icon
              cy.get(' > div:nth-child(1) > svg')
                .should('exist')
                .and('have.css', 'color', 'rgb(75, 85, 99)') //icon color
              //assert the default note itself
              cy.get(' > div:nth-child(2) > span:nth-child(1)')
                .should('exist')
                .and('have.text', 'Added this note today as testing purposes only')
              //assert the Seller Interactive Admin name
              cy.get(' > div:nth-child(2) > span:nth-child(3)')
                .should('exist')
                .and('have.text', '- Seller Interactive Admin') // this part is bug and should be the name of the current role who added
                .and('have.css', 'color', 'rgb(107, 114, 128)') //text color
              //assert Activation Date and Delete icon
              cy.get(' > div:nth-child(3) ')
                .should('exist')
                .within(()=>{
                  //assert Date Added
                  cy.get('  > div > span')
                    .should('exist')
                    .and('have.text', DateTodayIs.TodayDateDDMMYYYYWithSpaceInBetween())
                  //assert delete icon
                  cy.get('  > div > button > svg')
                    .should('exist')
                    .and('not.be.disabled')
                    .and('have.css', 'color', 'rgb(156, 163, 175)') //text color
                })
            })
        })

    })
    it("Testcase ID: CBS0009 - Verify user can Delete a Subscription Note ",()=>{

      let GETUpdatedTotalRow;
      let updatedRow;

      //Login using account specialist
      cy.userlogin(loginmodule.EmailAddressInputfield, loginmodule.PasswordInputfield, loginmodule.SigninButton, testdata.userAccounts[0].accountspecialist1, testdata.userAccounts[0].accountspecialistandprojectmanagerpassword)

      //Click the Clients Navigation Module
      cy.get(modulebutton.ClientsModuleButton)
        .click()
        .wait(2000) 
 
      //Then click then client name link text
      cy.get('table > tbody > tr:first-child > td:nth-child(1) > a')
        .click()
        .wait(3000)
 
      //click the billing tab
      cy.get(clientmodulelocator.ClientMainPageTab[0].BillingTab)
        .click()
        .wait(2000)

      //Now I will click the Add button
      cy.get('div.client-updates > div:nth-child(4) > div:nth-child(1)')
        .find(' > div > button')
        .click()
        .wait(2000)

      //verify Add Note modal popup
      cy.get('div.relative > div.tail')
        .should('exist')
       
      ////// ADD NEW NOTE STARTS HERE //////////

      //Enter New Note
      cy.get('div.relative > div.tail')
        .find(' > div:nth-child(2) > textarea[name="newDescription"]')
        .clear()
        .type('This note is for testing purpose only')
        .wait(700)
        .should('have.value', 'This note is for testing purpose only')

      //Click the Save button
      cy.get('div.relative > div.tail')
        .find(' > div:nth-child(3) > button:nth-child(1)')
        .click()
        .wait(3000)

      //verify Alert-success message popup
      cy.GETAlertMessagepopup(alertmessagepopup.TopMessage, 'Note added')
      cy.GETAlertMessagepopup(alertmessagepopup.SubMessage, 'Notes added.')

      ////// ADD NEW NOTE ENDS HERE //////////

      //I will intentionally reload the page after a waiting period of 10seconds
      cy.wait(8000);
      cy.reload();
      cy.wait(10000);

      //Now I will store again the updated count of row
      GETUpdatedTotalRow = new Promise(()=>{
        cy.get('div.client-updates > div:nth-child(4) > div')
          .its('length')
          .then(($row)=>{ 
            updatedRow = $row;
          })
      })

      //Now I am going to click the delete icon of the previously added row which resides in the 3rd div but actually it is 
      //next to the default note
      cy.get('div.client-updates > div:nth-child(4) > div:nth-child(3)')
        .find(' > div:nth-child(3) > div > button')
        .click()
        .wait(3000)

      //verify Delete Note confirmation dialog popup
      cy.get('div.min-h-screen > div.inline-block')
        .should('exist')
        .within(()=>{
          //assert Delete Note Title
          cy.get(' > h3')
            .should('exist')
            .and('have.text', 'Delete Note')
            .and('have.css', 'font-weight', '700') //font bold
          //assert Are you sure you want to delete this note?
          cy.get(' > div:nth-child(2) > div')
            .should('exist')
            .and('have.text', 'Are you sure you want to delete this note?')
            .and('have.css', 'color', 'rgb(107, 114, 128)') //text color
          //assert No button
          cy.get(' > div:nth-child(3) > button:nth-child(1)')
            .should('exist')
            .and('not.be.disabled')
            .and('have.text', 'No')
            .and('have.css', 'color', 'rgb(148, 148, 148)') //text color
            .and('have.css', 'font-weight', '700') //font bold
          //assert Yes button
          cy.get(' > div:nth-child(3) > button:nth-child(2)')
            .should('exist')
            .and('not.be.disabled')
            .and('have.text', 'Yes')
            .and('have.css', 'color', 'rgb(255, 255, 255)') //text color
            .and('have.css', 'background-color', 'rgb(5, 150, 105)') //background color
            .and('have.css', 'border-radius', '40px')
            .and('have.css', 'font-weight', '700') //font bold
        })

      //I now click the yes button
      cy.get('div.min-h-screen > div.inline-block')
        .find(' > div:nth-child(3) > button:nth-child(2)')
        .click()
        .wait(3000)

      //verify Alert-success message popup
      cy.GETAlertMessagepopup(alertmessagepopup.TopMessage, 'Note deleted')
      cy.GETAlertMessagepopup(alertmessagepopup.SubMessage, 'The note has been deleted.')

      //Additional waiting before reloading the page
      cy.wait(8000);
      cy.reload();
      cy.wait(15000);

      //verify that the current row should be minus 1
      cy.get('div.client-updates > div:nth-child(4) > div')
        .its('length')
        .then(($row)=>{ 
          GETUpdatedTotalRow.then(()=>{
            expect($row).to.equal(updatedRow - 1)
          })
        })

    })
    // **** CLIENT BILLING SUBSCRIPTIONS PAYMENT METHOD  ENDS HERE ***
    // **** CLIENT ACCOUNT PERFORMANCE STARTS HERE ***
    it("Testcase ID: CRD0001 - Verify user can Add Rate Account Performance",()=>{

      let GETClientName;
      let clientName;

      //Login using account specialist
      cy.userlogin(loginmodule.EmailAddressInputfield, loginmodule.PasswordInputfield, loginmodule.SigninButton, testdata.userAccounts[0].accountspecialist1, testdata.userAccounts[0].accountspecialistandprojectmanagerpassword)

      //Click the Clients Navigation Module
      cy.get(modulebutton.ClientsModuleButton)
        .click()
        .wait(2000) 

      //Then click then client name link text
      cy.get('table > tbody > tr:first-child > td:nth-child(1) > a')
        .click()
        .wait(3000)

      //GET the current client name that shows as the title
      GETClientName = new Promise((resolve)=>{
        cy.get(clientmodulelocator.ClientNameTitle)
          .then((name)=>{
            clientName = name.text().trim();
          })
      })
  
      //verify Rating Dashboard link text folder
      cy.get(linktextfolder.ClientModule[0].RatingDashboard)
        .should('exist')
        .and('not.be.disabled')
        .and('have.text', 'Rating Dashboard')
        .and('have.css', 'color', 'rgb(156, 163, 175)') //default text color
        .find('svg').should('exist').and('be.visible').and('have.css', 'color', 'rgb(156, 163, 175)') //its star icon verification

      //Click the Rating Dashboard Link text folder
      cy.get(linktextfolder.ClientModule[0].RatingDashboard)
        .click()
        .wait(1000)
        .should('have.css', 'color', 'rgb(239, 68, 68)') // text color
        .find('svg').should('have.css', 'color', 'rgb(239, 68, 68)') //text color
      
      //verify correct destination page url
      cy.url().should('contain', '/clients/performance-ratings')

      //verify Rating Dashboard Main Title - Partner Rating Dashboard
      cy.get(ratingdashboardlocators.pageTitle)
        .should('exist')
        .and('have.css', 'font-weight', '700') // font bold
        .and('have.text', 'Partner Rating Dashboard')

      //verify Rate Account Performance button, if found then click
      cy.get(ratingdashboardlocators.RateAccountPerformanceButton)
        .should('exist')
        .and('not.be.disabled')
        .and('have.text', 'Rate Account Performance')
        .and('have.css', 'color','rgb(250, 250, 250)') // font text color
        .and('have.css', 'font-weight', '700') //font bold
        .and('have.css', 'background-color', 'rgb(0, 47, 93)') //background color button 
        .and('have.css', 'border-radius', '40px') //the curve edges of the button
        .click()
        .wait(2000)

      //verify that the Rate Account Performance modal popup
      cy.get(ratingdashboardlocators.RateAccountPerformanceModal[0].modal)
        .should('exist')

      ////////////// RATE ACCOUNT PERFORMANCE MODAL ELEMENT ASSERTIONS STARTS HERE ////////////////
      //verify Rate Account Performance Modal Title 
      cy.get(ratingdashboardlocators.RateAccountPerformanceModal[0].modaltitle)
        .should('exist')
        .and('have.css', 'font-weight', '700') //font bold
        .and('have.text', 'Rate Account Performance')

      //verify the Partner's Account Label and the drop down menu
      cy.get(ratingdashboardlocators.RateAccountPerformanceModal[0].PartnersAccountLabelandDropdownmenu)
        .should('exist')
        .within(()=>{
          //assert Partner's Account* Label
          cy.get('label')
            .should('exist')
            .and('have.text', "Partner's Account*")
            .find('sup').should('have.css', 'color', 'rgb(237, 46, 46)') // asterisk text color
          //assert Partner's Account select menu button
          cy.get(' > div > div > button')
            .should('exist')
            .and('not.be.disabled')
            .and('have.attr', 'aria-expanded', 'false') // before it is click, this is just a button
            .and('have.text', "Select Partner's Account")
          //Click the button - expected to emerge an search input field within and a drop down list of clients available
          cy.get(' > div > div > button')
            .click()
            .wait(1000)
            .should('have.attr', 'aria-expanded', 'true')
          //assert search input field emerge
          cy.get('#email')
            .should('exist')
            .and('not.be.disabled')
            .and('have.value', '') // empty by default
            .and('have.attr', 'placeholder', 'Search')
          //assert a drop down list of available client. regardless of what and how many but there should be at least 1
          cy.get('div.scrollbar-container > ul')
            .should('exist')
            .and('not.be.disabled')
            .within(()=>{
              //assert there should be a list
              cy.get('li').should('have.length.gt', 0)
            })
          //Now clicking back the Partner's Account button should hide the Search input field and the client list
          cy.get(' > div > div > button')
            .click()
            .wait(1000)
            .should('have.attr', 'aria-expanded', 'false')
          //assert search input field should not be visible
          cy.get('#email')
            .should('not.exist')
          //assert the client list also should not be visible
          cy.get('div.scrollbar-container > ul')
            .should('not.exist')
        })

      //verify Type of Review Label and the lists
      cy.get(ratingdashboardlocators.RateAccountPerformanceModal[0].TypeOfReviewLabelandThelists)
        .should('exist')
        .within(()=>{
          //assert the Type of Review label
          cy.get('label')
            .should('exist')
            .and('contain', 'Type of Review*')
            .find('sup').should('have.css', 'color', 'rgb(237, 46, 46)') // asterisk text color
          //assert the lists with each radio button
          //and the expected options
          const TypeOfReviewLists = [
            'Finished Tasks',
            'Missed Meetings',
            'More action needed',
            'Missed deadlines/Delays',
            'Delayed Reporting',
            'Lack of sales growth',
            'Increase in sales',
            'PPC Issues'
          ];
          cy.get(' > div > label').each(($option, index) => {
            cy.wrap($option).should('have.text', TypeOfReviewLists[index]) //verify names based on the expected
              .should('exist')
              .and('not.be.checked')
              .and('not.be.disabled')
            cy.log(TypeOfReviewLists[index])
          })
      })

      //verify Start Rating label and the five star elements
      cy.get(ratingdashboardlocators.RateAccountPerformanceModal[0].StartRatingLabelandThe5StarsElement)
        .should('exist')
        .within(()=>{
          //assert the Star Rating label
          cy.get('label')
            .should('exist')
            .and('have.text', 'Start Rating*')
            .find('sup').should('have.css', 'color', 'rgb(237, 46, 46)') // asterisk text color
          //assert the 5 star elements
          cy.get(' > div > span > span')
            .should('exist')
            .and('have.length', 5)
            .each(($span)=>{
              cy.wrap($span)
                .should('exist')
                .and('not.be.disabled')
                .and('not.be.checked')
            })
        })

      //verify Additional Information Screenshots Label and button
      cy.get(ratingdashboardlocators.RateAccountPerformanceModal[0].AdditionalInformationScreenshotsLabelandButton)
        .should('exist')
        .within(()=>{
          //assert Additional Information Screenshots Label
          cy.get(' > div > label')
            .should('exist')
            .and('have.text', 'Additional Information Screenshots*')
            .find('sup').should('have.css', 'color', 'rgb(237, 46, 46)') // asterisk text color
          //assert Additional Information Screenshots button
          cy.get(' > div > div > button')
            .should('exist')
            .and('not.be.disabled')
            .and('have.text', 'Additional Information Screenshots')
            .and('have.css', 'color', 'rgb(148, 148, 148)') //text color
            .and('have.css', 'font-weight', '700') //font bold
            .and('have.css', 'border-color', 'rgb(148, 148, 148)')
            .and('have.css', 'border-radius', '40px') //the curve of the edge of the button
        })

      //verify Any additional notes related to this rating?* label and textarea field
      cy.get(ratingdashboardlocators.RateAccountPerformanceModal[0].AnyadditionalNotesRelatedToThisRatingLabelandTextareafield)
        .should('exist')
        .within(()=>{
          //assert Any additional notes related to this rating?* label
          cy.get('label')
            .should('exist')
            .and('contain', "Any additional notes related to this rating?*")
            .find('sup').should('have.css', 'color', 'rgb(237, 46, 46)') // asterisk text color
          //assert textarea field
          cy.get('textarea[name="information"]')
            .should('exist')
            .and('not.be.disabled')
            .and('have.value', '') //empty by default
        })

      //verify Cancel Button
      cy.get(ratingdashboardlocators.RateAccountPerformanceModal[0].CancelButton)
        .should('exist')
        .and('not.be.disabled')
        .and('have.text', "Cancel")
        .and('have.css', 'color', 'rgb(24, 121, 216)') //text color
        .and('have.css', 'font-weight', '700') //font bold

      //verify Submit Button
      cy.get(ratingdashboardlocators.RateAccountPerformanceModal[0].SubmitButton)
        .should('exist')
        .and('be.disabled')
        .and('have.text', "Submit")
        .and('have.css', 'color', 'rgb(250, 250, 250)') //text color
        .and('have.css', 'font-weight', '700') //font bold
        .and('have.css', 'background-color', 'rgb(0, 28, 55)') //the button capsule color

      ////////////// RATE ACCOUNT PERFORMANCE MODAL ELEMENT ASSERTIONS ENDS HERE ////////////////

      //Enter Test Client Name (AAAROO) TEST Then click it when it shows up
      cy.get(ratingdashboardlocators.RateAccountPerformanceModal[0].PartnersAccountLabelandDropdownmenu)
        .within(()=>{
          //click the button
          cy.get(' > div > div > button')
            .click()
            .wait(700)
          //Enter the Client test name in the Search Input field
          cy.get('input[type="email"][name="email"]')
            .clear()
            .type('(AAA')
            .wait(3000)
          //Then click the name as it showed up which is the (AAAROO) TEST
          cy.get('ul > li > button')
            .click()
            .wait(700)
        })

      //verify that it appeared on top after it was selected
      cy.get(ratingdashboardlocators.RateAccountPerformanceModal[0].PartnersAccountLabelandDropdownmenu)
        .find(' > div > div > button')
        .then((txt)=>{
          GETClientName.then(()=>{
            expect(txt.text().trim()).to.equal(clientName);
          })
        })

      //verify Type of Review by ticking each radio button for each of the list
      cy.get(ratingdashboardlocators.RateAccountPerformanceModal[0].TypeOfReviewLabelandThelists)
        .find(' > div > label > input')
        .each(($input) => {
          cy.wrap($input).check()
            .wait(700)
            .should('be.checked')
        })
      
      //Then I will select the first
      cy.get('form > div > div:nth-child(2) > div > label:nth-child(1) > input')
        .check()
        .should('be.checked')
        .wait(1000)
        /*
      //verify star rating by clicking star 1
      cy.get('form > div > div:nth-child(3) > div > span > span:nth-child(1) > span:nth-child(1)')
        .click('center')//expected 50% which is equivalent to 40px
        .wait(600)
      cy.get('form > div > div:nth-child(3) > div > span > span:nth-child(1) > span:nth-child(2) > svg')
        .should('have.css', 'color', 'rgb(245, 158, 11)') //yellow color
      cy.get('form > div > div:nth-child(3) > div > span > span:nth-child(1) > span:nth-child(2)')
        .should('have.css', 'width', '40px') // the 100% is 80px 

      cy.wait(2000)
        *//////////////////////
      //Then I will click the full star 1
      cy.get('form > div > div:nth-child(3) > div > span > span:nth-child(1) > span:nth-child(1)')
        .click('right')//expected 100% which is equivalent to 80px
        .wait(600)
        .should('have.css', 'width', '80px') // the 100% is 80px 
      cy.get('form > div > div:nth-child(3) > div > span > span:nth-child(1) > span:nth-child(2) > svg')
        .should('have.css', 'color', 'rgb(245, 158, 11)') //yellow color
    
      //Upload a file
      cy.get(ratingdashboardlocators.RateAccountPerformanceModal[0].AdditionalInformationScreenshotsLabelandButton)
        .within(()=>{
          //upload an image file
          cy.get(' > div > div > input')
            .should('exist')
            .attachFile('azoginsuit.jpg')
            .wait(1000)
          //verify that the name of the buttone is now Upload more
          cy.get(' > div > div > button')
            .should('exist')
            .and('not.be.disabled')
            .and('have.text', 'Upload more')
            .and('have.css', 'color', 'rgb(148, 148, 148)') //text color
            .and('have.css', 'font-weight', '700') //font bold
            .and('have.css', 'border-color', 'rgb(148, 148, 148)')
            .and('have.css', 'border-radius', '40px') //the curve of the edge of the button
          //Then verify the uploaded image file is in the Modal
          cy.get(' > div:nth-child(2)')
            .should('exist')
            .within(()=>{
              //assert the x close button on top right corner of the uploaded image 
              cy.get(' > div > div:nth-child(1)')
                .should('exist')
                .and('not.be.disabled')
                .and('have.css', 'background-color', 'rgb(0, 47, 93)') // the circular blue color that surrounds the x button
                .find('svg').should('exist').and('have.css', 'color', 'rgb(255, 255, 255)') //the x text color
              //assert the uploaded image itself
              cy.get(' > div > div:nth-child(2) > img')
                .should('exist')
                .and('have.css', 'width', '131px') //the rendered width size of the uploaded image file
                .and('have.css', 'height', '133px') //the rendered height size of the uploaded image file
            })
        })
        
      //Add Additional Notes Related to this Rating
      cy.get(ratingdashboardlocators.RateAccountPerformanceModal[0].AnyadditionalNotesRelatedToThisRatingLabelandTextareafield)
        .find('textarea[name="information"]')
        .clear()
        .type('The notes here that I added is for testing purposes only.')
        .wait(600)
        .should('have.value', 'The notes here that I added is for testing purposes only.')

      //verify that the Submit button should be enabled since all the required elements are now filled
      cy.get(ratingdashboardlocators.RateAccountPerformanceModal[0].SubmitButton)
        .should('not.be.disabled')
        .click()
        .wait(3000)
        
      //////// PARTNER RATING DASHBOARD TABLE LIST ASSERTIONS STARTS HERE ///////////////
      
      //verify first the column names
      //verify Column Names
      const expected_columnNames = [
        'Review',
        'Details',
        'Date Added',
        'Reviewer',
        'Rating',
        'View Details'
      ];
      cy.get('table > thead > tr > th').each(($option, index) => {
          cy.wrap($option).should('have.text', expected_columnNames[index])  //verify names based on the expected names per column
          .should('exist')
          .and('have.css', 'color', 'rgb(190, 190, 190)') //text color
          .and('have.css', 'font-weight', '700') //font bold
          cy.log(expected_columnNames[index]) 
      });

      //Now verify the table in row 1
      cy.get('table >tbody > tr:first-child').within(()=>{
        //assert Column1 > Review Name / the selected type of review you choose
        cy.get(' > td:nth-child(1)')
          .should('exist')
          .and('not.be.disabled')
          .and('have.text', 'Finished Tasks')
          .and('have.css', 'color', 'rgb(24, 121, 216)') //text color
        //assert Column 2 > Details / the added related notes you entered
        cy.get(' > td:nth-child(2)')
          .should('exist')
          .and('have.text', 'The notes here that I added is for testing purposes only.')
          .and('have.css', 'color', 'rgb(102, 102, 102)') //text color
        //assert Column 3 > Date Added
        cy.get(' > td:nth-child(3)')
          .should('exist')
          .and('have.text', DateTodayIs.TodayDateMMDDYYYY_ShortMonthWord_NoTHonDate())
          .and('have.css', 'color', 'rgb(102, 102, 102)') //text color
        //assert Column 4 > Reviewer
        cy.get(' > td:nth-child(4)')
          .should('exist')
          .within(()=>{
            cy.get('> div > div > span')  //the initial logo
              .should('exist')
              .and('have.text', 'LP')
              .and('have.css', 'color', 'rgb(255, 255, 255)')         //text color
              .and('have.css', 'background-color', 'rgb(0, 47, 93)')  //background color
              .and('have.css', 'border-radius', '9999px')             //the curve edge that form the background color like a circle
          })
        //assert Column 5 > Rating
        cy.get(' > td:nth-child(5) > div')
          .should('exist')
          .within(()=>{
            //assert the rating value which is 1 meaning 1 star
            cy.get('p')
              .should('exist')
              .and('have.text', '1')
              .and('have.css', 'color', 'rgb(107, 114, 128)') //text color
              .and('have.css', 'font-weight', '700') //font bold
              .and('have.css', 'font-size', '25px')
            //assert the 1st star from the left to the right
            cy.get(' > span > span')
              .should('exist')
              .and('have.length', 5) // 5 stars
          })
        //assert Column 6 > View Details
        cy.get(' > td:nth-child(6) > div')
          .should('exist')
          .and('not.be.disabled')
          .find('svg').should('have.css', 'color', 'rgb(0, 150, 109)')
      })

    //Then I will click the view details button
    cy.get('table >tbody > tr:first-child > td:nth-child(6) > div')
      .click()
      .wait(2000)

    //verify Account Performance Review Modal popup
    cy.get(ratingdashboardlocators.AccountPerformanceReviewModal[0].modal)
      .should('exist')

    /////// ACCOUNT PERFORMANCE REVIEW MODAL ASSERTIONS STARTS HERE //////////

    //verify modal title
    cy.get(ratingdashboardlocators.AccountPerformanceReviewModal[0].modaltitle)
      .should('exist')
      .and('have.text', 'Account Performance Review')
      .and('have.css', 'font-weight', '700') //font bold

    //verify Partners Account Label and the Client Name
    cy.get(ratingdashboardlocators.AccountPerformanceReviewModal[0].PartnersAccountLabelandClientName)
      .should('exist')
      .within(()=>{
        //assert the Partner's Account Label 
        cy.get(' > p:nth-child(1)')
          .should('exist')
          .and('have.text', "Partner's Account")
          .and('have.css', 'color', 'rgb(148, 148, 148)') //text color
        //assert the client Name
        cy.get(' > p:nth-child(2)')
          .should('exist')
          .then((txt)=>{
            GETClientName.then(()=>{
              expect(txt.text().trim()).to.equal(clientName);
            })
          })
      })

    //verify Reviewer Label and the Name of the Reviewer
    cy.get(ratingdashboardlocators.AccountPerformanceReviewModal[0].ReviewerLabelandReviewerName)
      .should('exist')
      .within(()=>{
        //assert Reviewer Label
        cy.get(' > p')
          .should('exist')
          .and('have.text', "Reviewer")
          .and('have.css', 'color', 'rgb(148, 148, 148)') //text color
        //assert Reviewer Name
        cy.get('div')
          .then(()=>{
            //assert the Initial Logo
            cy.get(' > div > div > div > span')
              .should('exist')
              .and('have.text', 'LP')
              .and('have.css', 'color', 'rgb(255, 255, 255)')         //text color
              .and('have.css', 'background-color', 'rgb(0, 47, 93)')  //background color
              .and('have.css', 'border-radius', '9999px')
            //assert the name
            cy.get(' div > p')
              .should('exist')
              .and('have.text', "Logan Paul")
          })
      })

      //verify the Date Added Label and the Date
      cy.get(ratingdashboardlocators.AccountPerformanceReviewModal[0].DateAddedLabelandTheDate)
        .should('exist')
        .within(()=>{
          //assert the Date Added Label
          cy.get('p:nth-child(1)')
            .should('exist')
            .and('have.text', "Date Added")
            .and('have.css', 'color', 'rgb(148, 148, 148)') //text color
          //verify the Date 
          cy.get('p:nth-child(2)')
            .should('exist')
            .and('have.text', DateTodayIs.TodayDateMMDDYYYY_ShortMonthWord_NoTHonDate())
        })

      //verify Type Label and the type
      cy.get(ratingdashboardlocators.AccountPerformanceReviewModal[0].TypeLabelandTheSelectedType)
        .should('exist')
        .within(()=>{

          //assert the Type Label
          cy.get('p:nth-child(1)')
            .should('exist')
            .and('have.text', "Type")
            .and('have.css', 'color', 'rgb(148, 148, 148)') //text color
          //verify the Date 
          cy.get('p:nth-child(2)')
            .should('exist')
            .and('have.text', 'Finished Tasks')
        })

      //verify the Rating Label and the number and stars elements
      cy.get(ratingdashboardlocators.AccountPerformanceReviewModal[0].RatingLabelandTheStars)
        .should('exist')
        .within(()=>{
          //assert the Rating Label
          cy.get(' > p')
            .should('exist')
            .and('have.text', "Rating")
            .and('have.css', 'color', 'rgb(148, 148, 148)') //text color
          //verify the Count / score rating 
          cy.get(' > div > p')
            .should('exist')
            .and('have.text', '1')
          //assert the Stars
          cy.get(' > div > span > span')
            .should('exist')
            .and('have.length', 5) // 5 stars
        })

      //verify the Files Uploaded Label and the File
      cy.get(ratingdashboardlocators.AccountPerformanceReviewModal[0].FilesUploadedLabelandTheFile)
        .should('exist')
        .within(()=>{
          //assert the Files Uploaded Label
          cy.get(' > p')
            .should('exist')
            .and('have.text', "Files Uploaded")
            .and('have.css', 'color', 'rgb(102, 102, 102)') //text color
            .and('have.css', 'font-weight', '700') //font bold
          //verify the file itself
          cy.get(' > div > div > img')
            .should('exist')
        })

      //verify the Additional Notes Label and the Notes
      cy.get(ratingdashboardlocators.AccountPerformanceReviewModal[0].AdditionalNotesLabelandTheNotes)
        .should('exist')
        .within(()=>{
          //assert the Files Uploaded Label
          cy.get('p:nth-child(1)')
            .should('exist')
            .and('have.text', "Additional Notes")
            .and('have.css', 'color', 'rgb(102, 102, 102)') //text color
            .and('have.css', 'font-weight', '700') //font bold
          //verify the file itself
          cy.get('p:nth-child(2)')
            .should('exist')
            .and('have.text', 'The notes here that I added is for testing purposes only.')
        })
        
    })
    // **** CLIENT ACCOUNT PERFORMANCE ENDS HERE ***
    // **** CLIENT COMPLAINTS STARTS HERE ***
    it("Testcase ID: CC0001 - Verify client partner can add complaint form",()=>{

      let GETClientName;
      let clientName;
      let GETClientPartnerFullName;
      let clientFullName;

      //Login using account specialist
      cy.userlogin(loginmodule.EmailAddressInputfield, loginmodule.PasswordInputfield, loginmodule.SigninButton, testdata.userAccounts[0].accountspecialist1, testdata.userAccounts[0].accountspecialistandprojectmanagerpassword)

      //Click the Clients Navigation Module
      cy.get(modulebutton.ClientsModuleButton)
        .click()
        .wait(2000) 

      //Then click then client name link text
      cy.get('table > tbody > tr:first-child > td:nth-child(1) > a')
        .click()
        .wait(3000)

      //GET the current client name that shows as the title
      GETClientName = new Promise((resolve)=>{
        cy.get(clientmodulelocator.ClientNameTitle)
          .then((name)=>{
            clientName = name.text().trim();
          })
      })

      //GET the Client Partner full name in the Client > Client Dashboard > Profile > Overview > Contact Name
      GETClientPartnerFullName = new Promise((resolve)=>{
        cy.get(clientmodulelocator.ClientDashboardTabPage[0].ProfileTabpage[0].ClientBasicContactInformationSection[0].ContactName)
          .then((cName)=>{
            clientFullName = cName.text().trim();
            resolve();
          })
      })
    
      //verify there this is Complaints link text folder under the client module
      cy.get(linktextfolder.ClientModule[0].Complaints) //Complaints link text
        .should('exist')
        .and('not.be.disabled')
        .and('have.text', 'Complaints')
        .and('have.css', 'color', 'rgb(156, 163, 175)') //default text color
        .find('svg').should('exist').and('be.visible').and('have.css', 'color', 'rgb(156, 163, 175)') //its star icon verification

      //Click the Complaints Link text folder
      cy.get(linktextfolder.ClientModule[0].Complaints)
        .click()
        .wait(1000)
        .should('have.css', 'color', 'rgb(239, 68, 68)') // text color
        .find('svg').should('have.css', 'color', 'rgb(239, 68, 68)') //text color

      //verify correct destination page url
      cy.url().should('contain', '/clients/complaints')
  
      //verify Complaints page title - Complaints
      cy.get(complaintslocators.PageTitle)
        .should('exist')
        .and('have.css', 'font-weight', '700') //font bold
        .and('have.text', 'Complaints')

      //verify Add button if Found then click
      cy.get(complaintslocators.AddButton)
        .should('exist')
        .and('not.be.disabled')
        .and('have.text', 'Add')
        .and('have.css', 'border-color', 'rgb(0, 47, 93)') //border capsule shape color
        .and('have.css', 'border-radius', '40px') // the curve edge 
        .click()
        .wait(2000)

      //verify that the Client Complaint Form modal popup
      cy.get(complaintslocators.ClientComplaintFormModal[0].modal)
        .should('exist')

      ////////////// CLIENT COMPLAINT FORM MODAL ELEMENT ASSERTIONS STARTS HERE ////////////////
      
      //verify Client Complaint Form modal title
      cy.get(complaintslocators.ClientComplaintFormModal[0].modaltitle)
        .should('exist')
        .and('have.css', 'font-weight', '700') // font bold
        .and('have.text', 'Client Complaint Form')

      //verify Partners Account Label and the Select Partners Account select menu
      cy.get(complaintslocators.ClientComplaintFormModal[0].PartnersAccountLabelandSelectPartnersAccountButton)
        .should('exist')
        .within(()=>{
          //assert Partner's Account Label
          cy.get(' > label')
            .should('exist')
            .and('have.text', "Partner's Account*")
            .and('have.css', 'color', 'rgb(102, 102, 102)') //text color
            .find('sup').should('have.css', 'color', 'rgb(237, 46, 46)') //asterisk text color
          //assert Select Partner's Account button
          cy.get(' > div > div > button')
            .should('exist')
            .and('not.be.disabled')
            .and('have.text', "Select Partner's Account")
            .and('have.attr', 'aria-expanded', 'false') // it means if the Select Partner's Account is not yet click, then it is still abutton
          //Then I am going to click the Select Partner's Account button
          cy.get(' > div > div > button')
            .click()
            .wait(1000)
            .should('have.attr', 'aria-expanded', 'true') //it means it becomes a select drop down menu
          //verify that there is a Search input field
          cy.get('input[type="email"][name="email"]')
            .should('exist')
            .and('not.be.disabled')
            .and('have.value', '') //empty by default
            .and('have.attr', 'placeholder', 'Search')
          //assert the drop down menu - there should be no zero - at least 1
          cy.get('div.scrollbar-container > ul > li')
            .should('exist')
            .and('have.length.gt', 0)
          //Now if I am going to click Again the Select Partner's Account button
          cy.get(' > div > div > button')
            .click()
            .wait(1000)
            .should('have.attr', 'aria-expanded', 'false') //it means it becomes back as a button
          //assert that the Search Input field should not be visible
          cy.get('input[type="email"][name="email"]')
            .should('not.exist')
          //assert the drop down menu should not be visible
          cy.get('div.scrollbar-container > ul > li')
            .should('not.exist')
        })

      //verify Type of Complaints Label and the lists of complaints
      cy.get(complaintslocators.ClientComplaintFormModal[0].TypeofComplaintLabelandTheLists)
        .should('exist')
        .within(()=>{
          //asser the Type of Complaint Label
          cy.get(' > label')
            .should('exist')
            .and('have.text', "Type of Complaint*")
            .and('have.css', 'color', 'rgb(102, 102, 102)') //text color
            .find('sup').should('have.css', 'color', 'rgb(237, 46, 46)') //asterisk text color
          //assert the Type of Complaint lists - one by one
          const TypeofComplaintsLists = [
            'Onboarding Process',
            'Missed Meetings',
            'Creatives',
            'Missed deadlines/Delays',
            'Copywriting',
            'Lack of sales growth',
            'Communication',
            'PPC Issues',
            'Other'
          ];
          cy.get(' > div > label').each(($label, index)=>{
            cy.wrap($label)
              .should('have.text', TypeofComplaintsLists[index]) //verify names based on the expected
              .and('not.be.checked')
              .and('not.be.disabled')
              cy.log(TypeofComplaintsLists[index])
            })
          //tick or check each radio button
          cy.get(' > div > label > input')
            .each(($input) => {
              cy.wrap($input).check()
                .wait(700)
                .should('be.checked')
            })
        })

      //verify How many times has this client reached out regarding this issue to you? Label and drop down menu
      cy.get(complaintslocators.ClientComplaintFormModal[0].HowmanytimeshasthisclientreachedoutregardingthisissuetoyouLabelandDropdownMenu)
        .should('exist')
        .within(()=>{
          //assert the How many times has this client reached out regarding this issue to you? label
          cy.get(' > label')
            .should('exist')
            .and('have.text', 'How many times has this client reached out regarding this issue to you?*')
            .and('have.css', 'color', 'rgb(102, 102, 102)') //text color
            .find('sup').should('have.css', 'color', 'rgb(237, 46, 46)') //asterisk text color
          //assert Select Number of Occurence drop down menu
          cy.get(' > select[name="occurence"]')
            .should('exist')
            .and('not.be.disabled')
          //and the expected options
          const expectedOptions = [
            'Select Number of Occurence',
            '1st',
            '2nd',
            '3rd',
            '4th',
            '5th+'
          ];
          cy.get(" > select[name='occurence'] > option").each(($option, index) => {
            cy.wrap($option)
              .should('have.text', expectedOptions[index])
              .and('not.be.disabled')
          });
        })

      //verify Urgency Level Label and each of the 1-2 elements
      cy.get(complaintslocators.ClientComplaintFormModal[0].UrgencyLevelLabelandDropdownMenu)
        .should('exist')
        .within(()=>{
          //assert the Urgency Level label
          cy.get(' > label')
            .should('exist')
            .and('have.text', 'Urgency Level*')
            .and('have.css', 'color', 'rgb(102, 102, 102)') //text color
            .find('sup').should('have.css', 'color', 'rgb(237, 46, 46)') //asterisk text color
          //assert the number elements from 1 to 5
          cy.get(' > div > button')
            .should('exist')
            .each(($button)=>{
              cy.wrap($button)
                .should('exist')
                .and('not.be.disabled')
            })
        })
      //Click one by one and assert changes in the UI
      cy.get(complaintslocators.ClientComplaintFormModal[0].UrgencyLevelLabelandDropdownMenu)
        .within(()=>{
          //click and then assert number 1
          cy.get(' > div > button:nth-child(1)')
            .click()
            .wait(700)
            .should('have.css', 'color', 'rgb(191, 166, 84)') //text color
            .and('have.css', 'background-color', 'rgb(249, 220, 125)') //background color
            .and('have.css', 'border-radius', '9999px')
          //click and then assert number 2
          cy.get(' > div  > button:nth-child(2)')
            .click()
            .wait(700)
            .should('have.css', 'color', 'rgb(191, 166, 84)') //text color
            .and('have.css', 'background-color', 'rgb(249, 220, 125)') //background color
            .and('have.css', 'border-radius', '9999px')
          //assert number 1 that it should go back to normal
          cy.get(' > div > button:nth-child(1)')
            .should('have.css', 'color', 'rgb(0, 0, 0)') //text color
            .and('have.css', 'background-color', 'rgba(0, 0, 0, 0)') //background color
          //click and then assert number 3
          cy.get(' > div  > button:nth-child(3)')
            .click()
            .wait(700)
            .should('have.css', 'color', 'rgb(212, 130, 54)') //text color
            .and('have.css', 'background-color', 'rgb(255, 210, 185)') //background color
            .and('have.css', 'border-radius', '9999px')
          //assert number 2 that it should go back to normal
          cy.get(' > div > button:nth-child(2)')
            .should('have.css', 'color', 'rgb(0, 0, 0)') //text color
            .and('have.css', 'background-color', 'rgba(0, 0, 0, 0)') //background color
          //click and then assert number 4
          cy.get(' > div  > button:nth-child(4)')
            .click()
            .wait(700)
            .should('have.css', 'color', 'rgb(212, 130, 54)') //text color
            .and('have.css', 'background-color', 'rgb(255, 210, 185)') //background color
            .and('have.css', 'border-radius', '9999px')
          //assert number 3 that it should go back to normal
          cy.get(' > div > button:nth-child(3)')
            .should('have.css', 'color', 'rgb(0, 0, 0)') //text color
            .and('have.css', 'background-color', 'rgba(0, 0, 0, 0)') //background color
          //click and then assert number 5
          cy.get(' > div  > button:nth-child(5)')
            .click()
            .wait(700)
            .should('have.css', 'color', 'rgb(195, 0, 0)') //text color
            .and('have.css', 'background-color', 'rgb(255, 175, 175)') //background color
            .and('have.css', 'border-radius', '9999px')
        })

      //verify Additional Information Screenshots Label and button
      cy.get(complaintslocators.ClientComplaintFormModal[0].AdditionalInformationScreenshotsLabelandButton)
        .should('exist')
        .within(()=>{
          //assert the Additional Information Screenshots Label
          cy.get(' > div:nth-child(1) > label')
            .should('exist')
            .and('have.text', 'Additional Information Screenshots*')
            .and('have.css', 'color', 'rgb(102, 102, 102)') //text color
            .find('sup').should('have.css', 'color', 'rgb(237, 46, 46)') //asterisk text color
          //assert Additional Information Screenshots button
          cy.get(' > div:nth-child(1) > div > button')
            .should('exist')
            .and('not.be.disabled')
            .and('have.text', 'Additional Information Screenshots')
            .and('have.css', 'color', 'rgb(148, 148, 148)') //text color
            .and('have.css', 'font-weight', '700') //font bold
            .and('have.css', 'border-color', 'rgb(148, 148, 148)')
            .and('have.css', 'border-radius', '40px') //the curve of the edge of the button
        })

      //verify Any additional notes related to this complaint? Label and textarea field
      cy.get(complaintslocators.ClientComplaintFormModal[0].AnyAdditionalNotesRelatedToThisComplaintLabelandTextareafield)
        .should('exist')
        .within(()=>{
          //assert the Additional Information Screenshots Label
          cy.get(' > label')
            .should('exist')
            .and('have.text', 'Any additional notes related to this complaint?*')
            .and('have.css', 'color', 'rgb(102, 102, 102)') //text color
            .find('sup').should('have.css', 'color', 'rgb(237, 46, 46)') //asterisk text color
          //assert textarea field
          cy.get(' > textarea[name="information"]')
            .should('exist')
            .and('not.be.disabled')
            .and('have.value', '') // empty by default
        })

      //verify Cancel Button
      cy.get(complaintslocators.ClientComplaintFormModal[0].CancelButton)
        .should('exist')
        .and('not.be.disabled')
        .and('have.text', "Cancel")
        .and('have.css', 'color', 'rgb(24, 121, 216)') //text color
        .and('have.css', 'font-weight', '700') //font bold

      //verify Submit Button
      cy.get(complaintslocators.ClientComplaintFormModal[0].SubmitButton)
        .should('exist')
        .and('be.disabled') //by default the button should be disabled because it has a required elements needs to respond inside the Rate Account Performance modal
        .and('have.text', "Submit")
        .and('have.css', 'color', 'rgb(250, 250, 250)') //text color
        .and('have.css', 'font-weight', '700') //font bold
        .and('have.css', 'background-color', 'rgb(0, 28, 55)') //the button capsule color

      ///////// CLIENT COMPLAINT FORM REQUIRED ASSERTIONS STARTS HERE ///////////

      //Select Client test in the Select Partner's Account
      cy.get(complaintslocators.ClientComplaintFormModal[0].PartnersAccountLabelandSelectPartnersAccountButton)
        .within(()=>{
          //click the button
          cy.get(' > div > div > button')
          .click()
          .wait(1000)
          //enter the client name in the Search Input field
          cy.get('input[type="email"][name="email"]')
            .clear()
            .type('(AAA')
            .wait(3000)
          //Then as it appears, click the client test
          cy.get('ul > li > button')
            .click()
            .wait(700)
        })

      //verify that it appeared on top after it was selected
      cy.get(complaintslocators.ClientComplaintFormModal[0].PartnersAccountLabelandSelectPartnersAccountButton)
        .find(' > div > div > button')
        .then((txt)=>{
          GETClientName.then(()=>{
            expect(txt.text().trim()).to.equal(clientName);
          })
        })

      //Select Type of Complaint - Onboarding Process
      cy.get(complaintslocators.ClientComplaintFormModal[0].TypeofComplaintLabelandTheLists)
        .find(' > div > label:nth-child(1) > input')
        .check()
        .should('be.checked')

      //Select Number of Occurence
      cy.get(complaintslocators.ClientComplaintFormModal[0].HowmanytimeshasthisclientreachedoutregardingthisissuetoyouLabelandDropdownMenu)
        .find(" > select[name='occurence']")
        .select('2').should('have.value','2')
        .wait(2000)
      //verify that the selected number of occurence is on top 
      cy.get(complaintslocators.ClientComplaintFormModal[0].HowmanytimeshasthisclientreachedoutregardingthisissuetoyouLabelandDropdownMenu)
        .find('select option:selected')
        .should('have.text', '2nd')

      //Select Urgency Level
      cy.get(complaintslocators.ClientComplaintFormModal[0].UrgencyLevelLabelandDropdownMenu)
        .find(' > div > button:nth-child(1)')
        .click()
        .wait(1000)

      //Upload Additional Screenshot
      cy.get(complaintslocators.ClientComplaintFormModal[0].AdditionalInformationScreenshotsLabelandButton)
        .find(' > div:nth-child(1) > div > input')
        .attachFile('azoginsuit.jpg')
        .wait(2000)

      //verify that the Additional Screenshot button has changed its name and now it becomes Upload more
      cy.get(complaintslocators.ClientComplaintFormModal[0].AdditionalInformationScreenshotsLabelandButton)
        .within(()=>{
          //assert buton name
          cy.get(' > div:nth-child(1) > div > button')
            .should('exist')
            .and('not.be.disabled')
            .and('have.text', 'Upload more')
            .and('have.css', 'color', 'rgb(148, 148, 148)') //text color
            .and('have.css', 'font-weight', '700') //font bold
            .and('have.css', 'border-color', 'rgb(148, 148, 148)')
            .and('have.css', 'border-radius', '40px') //the curve of the edge of the button
          //assert the uploaded image file
          cy.get(' > div:nth-child(2) > div')
            .should('exist')
            .within(()=>{
              //assert the x close button
              cy.get(' > div:nth-child(1)')
                .should('exist')
                .and('not.be.disabled')
                .and('have.css', 'background-color', 'rgb(0, 47, 93)') // blue circle background color
                .find('svg').should('have.css', 'color', 'rgb(255, 255, 255)') // text color
              //the image
              cy.get(' > div:nth-child(2) > img')
                .should('exist')
            })
        })

      //Add data on Any additional notes related to this complaint?
      cy.get(complaintslocators.ClientComplaintFormModal[0].AnyAdditionalNotesRelatedToThisComplaintLabelandTextareafield)
        .find(' > textarea[name="information"]')
        .clear()
        .type('This is only a test data for testing purposes only')
        .wait(500)
        .should('have.value', 'This is only a test data for testing purposes only')

      //verify that the submit button now is enabled
      cy.get(complaintslocators.ClientComplaintFormModal[0].SubmitButton)
        .should('not.be.disabled')

      //Then click the Submit button
      cy.get(complaintslocators.ClientComplaintFormModal[0].SubmitButton)
        .click()
        .wait(3000)
        
      //////// COMPLAINTS TABLET LISTS ASSERTIONS STARTS HERE ///////////////

      //verify first the Column Names
      const columnNames = [
        "Partner's Account",
        "Partner's Name",
        "Submitted Date",
        "Submitted By",
        "Sales Representative",
        "Project Manager",
        "Type",
        "Occurence",
        "Urgency Level",
        "Status",
        "Action"
      ]
      cy.get('table > thead > tr > th').each(($option, index)=>{
        cy.wrap($option)
          .should('exist')
          .and('have.text', columnNames[index])
          .and('have.css', 'color', 'rgb(190, 190, 190)') //text color
          .and('have.css', 'font-weight', '700') //font bold
        cy.log(columnNames[index])
      })

      //Then verify each columns in row 1
      cy.get('table > tbody > tr:first-child').within(()=>{
        //assert Column 1 > Partner's Account / Client Name
        cy.get(' > td:nth-child(1) > a')
          .should('exist')
          .and('not.be.disabled')
          .then((txt)=>{
            GETClientName.then(()=>{
              expect(txt.text().trim()).to.equal(clientName);
            })
          })
        //assert Column 2 > Partner's Name / Client Partner's Name
        cy.get(' > td:nth-child(2)')
          .should('exist')
          .then((txt)=>{
            GETClientPartnerFullName.then(()=>{
              expect(txt.text().trim()).to.equal(clientFullName);
            })
          })
        //assert Column 3 > Submitted Date
        cy.get(' > td:nth-child(3)')
          .should('exist')
          .and('have.text', DateTodayIs.TodayDateMMDDYYYY_ShortMonthWord_NoTHonDate())
        //assert Column 4 > Submitted By
        cy.get(' > td:nth-child(4) > div')
          .should('exist')
          .within(()=>{
            //assert Logo Initial
            cy.get(' > div > div > span')
              .should('exist')
              .and('have.text', 'LP')
              .and('have.css', 'color', 'rgb(255, 255, 255)') //text color
              .and('have.css', 'background-color', 'rgb(0, 47, 93)') //the circular background color
              .and('have.css', 'border-radius', '9999px')
            //assert the Name
            cy.get(' > span')
              .should('exist')
              .and('have.text', 'Logan Paul')
          })
        //assert Column 5 > Sales Representative - this is optional
        //assert Column 6 > Project Manager
        cy.get(' > td:nth-child(6) > div')
          .should('exist')
          .within(()=>{
            //assert Logo Initial
            cy.get(' > div > div > span')
              .should('exist')
              .and('have.text', 'PK')
              .and('have.css', 'color', 'rgb(255, 255, 255)') //text color
              .and('have.css', 'background-color', 'rgb(0, 47, 93)') //the circular background color
              .and('have.css', 'border-radius', '9999px')
            //assert the Name
            cy.get(' > span')
              .should('exist')
              .and('have.text', 'Peter Kanluran')
          })
        //assert Column 7 > Type
        cy.get(' > td:nth-child(7)')
          .should('exist')
          .and('have.text', 'Onboarding Process')
        //assert Column 8 > Occurrence
        cy.get(' > td:nth-child(8)')
          .should('exist')
          .and('have.text', '2nd')
        //assert Column 9 > Urgency Level
        cy.get(' > td:nth-child(9) > span')
          .should('exist')
          .and('have.text', '1')
          .and('have.css', 'color', 'rgb(191, 166, 84)') //text color
          .and('have.css', 'background-color', 'rgb(249, 220, 125)') //the circular background color
          .and('have.css', 'border-radius', '9999px')
        //assert Column 10 > Status
        cy.get(' td:nth-child(10) > span')
          .should('exist')
          .and('have.text', 'Ongoing')
          .and('have.css', 'color', 'rgb(191, 166, 84)') //text color
          .and('have.css', 'background-color', 'rgb(249, 220, 125)') //the circular background color
          .and('have.css', 'border-radius', '40px')
        //assert Column 11 > Action:View
        cy.get(' > td:nth-child(11) > div ')
          .should('exist')
          .and('not.be.disabled')
          .find('svg').should('have.css', 'color', 'rgb(0, 150, 109)') //text color
      })
      //////// COMPLAINTS TABLET LISTS ASSERTIONS ENDS HERE ///////////////

    })
    it("Testcase ID: CC0002 - Verify client partner can view the existing created complaint form",()=>{


      let GETClientName;
      let clientName;
      let GETClientPartnerFullName;
      let clientFullName;

      //Login using account specialist
      cy.userlogin(loginmodule.EmailAddressInputfield, loginmodule.PasswordInputfield, loginmodule.SigninButton, testdata.userAccounts[0].accountspecialist1, testdata.userAccounts[0].accountspecialistandprojectmanagerpassword)

      //Click the Clients Navigation Module
      cy.get(modulebutton.ClientsModuleButton)
        .click()
        .wait(2000) 

      //Then click then client name link text
      cy.get('table > tbody > tr:first-child > td:nth-child(1) > a')
        .click()
        .wait(3000)

      //GET the current client name that shows as the title
      GETClientName = new Promise((resolve)=>{
        cy.get(clientmodulelocator.ClientNameTitle)
          .then((name)=>{
            clientName = name.text().trim();
          })
      })

      //GET the Client Partner full name in the Client > Client Dashboard > Profile > Overview > Contact Name
      GETClientPartnerFullName = new Promise((resolve)=>{
        cy.get(clientmodulelocator.ClientDashboardTabPage[0].ProfileTabpage[0].ClientBasicContactInformationSection[0].ContactName)
          .then((cName)=>{
            clientFullName = cName.text().trim();
            resolve();
          })
      })
    
      //Click the Complaints Link text folder
      cy.get(linktextfolder.ClientModule[0].Complaints)
        .click()
        .wait(1000)
        .should('have.css', 'color', 'rgb(239, 68, 68)') // text color
        .find('svg').should('have.css', 'color', 'rgb(239, 68, 68)') //text color

      //verify correct destination page url
      cy.url().should('contain', '/clients/complaints')
  
      //verify Add button if Found then click
      cy.get(complaintslocators.AddButton)
        .should('exist')
        .and('not.be.disabled')
        .and('have.text', 'Add')
        .and('have.css', 'border-color', 'rgb(0, 47, 93)') //border capsule shape color
        .and('have.css', 'border-radius', '40px') // the curve edge 
        .click()
        .wait(2000)

      //verify that the Client Complaint Form modal popup
      cy.get(complaintslocators.ClientComplaintFormModal[0].modal)
        .should('exist')

      ///////// CREATE CLIENT COMPLAINT STARTS HERE ///////////

      //Select Client test in the Select Partner's Account
      cy.get(complaintslocators.ClientComplaintFormModal[0].PartnersAccountLabelandSelectPartnersAccountButton)
        .within(()=>{
          //click the button
          cy.get(' > div > div > button')
          .click()
          .wait(1000)
          //enter the client name in the Search Input field
          cy.get('input[type="email"][name="email"]')
            .clear()
            .type('(AAA')
            .wait(3000)
          //Then as it appears, click the client test
          cy.get('ul > li > button')
            .click()
            .wait(700)
        })

      //verify that it appeared on top after it was selected
      cy.get(complaintslocators.ClientComplaintFormModal[0].PartnersAccountLabelandSelectPartnersAccountButton)
        .find(' > div > div > button')
        .then((txt)=>{
          GETClientName.then(()=>{
            expect(txt.text().trim()).to.equal(clientName);
          })
        })

      //Select Type of Complaint - Onboarding Process
      cy.get(complaintslocators.ClientComplaintFormModal[0].TypeofComplaintLabelandTheLists)
        .find(' > div > label:nth-child(1) > input')
        .check()
        .should('be.checked')

      //Select Number of Occurence
      cy.get(complaintslocators.ClientComplaintFormModal[0].HowmanytimeshasthisclientreachedoutregardingthisissuetoyouLabelandDropdownMenu)
        .find(" > select[name='occurence']")
        .select('2').should('have.value','2')
        .wait(2000)

      //verify that the selected number of occurence is on top 
      cy.get(complaintslocators.ClientComplaintFormModal[0].HowmanytimeshasthisclientreachedoutregardingthisissuetoyouLabelandDropdownMenu)
        .find('select option:selected')
        .should('have.text', '2nd')

      //Select Urgency Level
      cy.get(complaintslocators.ClientComplaintFormModal[0].UrgencyLevelLabelandDropdownMenu)
        .find(' > div > button:nth-child(1)')
        .click()
        .wait(1000)

      //Upload Additional Screenshot
      cy.get(complaintslocators.ClientComplaintFormModal[0].AdditionalInformationScreenshotsLabelandButton)
        .find(' > div:nth-child(1) > div > input')
        .attachFile('azoginsuit.jpg')
        .wait(2000)

      //Add data on Any additional notes related to this complaint?
      cy.get(complaintslocators.ClientComplaintFormModal[0].AnyAdditionalNotesRelatedToThisComplaintLabelandTextareafield)
        .find(' > textarea[name="information"]')
        .clear()
        .type('This is only a test data for testing purposes only')
        .wait(500)
        .should('have.value', 'This is only a test data for testing purposes only')

      //verify that the submit button now is enabled
      cy.get(complaintslocators.ClientComplaintFormModal[0].SubmitButton)
        .should('not.be.disabled')

      //Then click the Submit button
      cy.get(complaintslocators.ClientComplaintFormModal[0].SubmitButton)
        .click()
        .wait(3000)

      ///////// CREATE CLIENT COMPLAINT ENDS HERE ///////////
        
      //////// COMPLAINTS TABLET LISTS ASSERTIONS STARTS HERE ///////////////

      //verify first the Column Names
      const columnNames = [
        "Partner's Account",
        "Partner's Name",
        "Submitted Date",
        "Submitted By",
        "Sales Representative",
        "Project Manager",
        "Type",
        "Occurence",
        "Urgency Level",
        "Status",
        "Action"
      ]
      cy.get('table > thead > tr > th').each(($option, index)=>{
        cy.wrap($option)
          .should('exist')
          .and('have.text', columnNames[index])
          .and('have.css', 'color', 'rgb(190, 190, 190)') //text color
          .and('have.css', 'font-weight', '700') //font bold
        cy.log(columnNames[index])
      })

      //Then verify each columns in row 1
      cy.get('table > tbody > tr:first-child').within(()=>{
        //assert Column 1 > Partner's Account / Client Name
        cy.get(' > td:nth-child(1) > a')
          .should('exist')
          .and('not.be.disabled')
          .then((txt)=>{
            GETClientName.then(()=>{
              expect(txt.text().trim()).to.equal(clientName);
            })
          })
        //assert Column 2 > Partner's Name / Client Partner's Name
        cy.get(' > td:nth-child(2)')
          .should('exist')
          .then((txt)=>{
            GETClientPartnerFullName.then(()=>{
              expect(txt.text().trim()).to.equal(clientFullName);
            })
          })
        //assert Column 3 > Submitted Date
        cy.get(' > td:nth-child(3)')
          .should('exist')
          .and('have.text', DateTodayIs.TodayDateMMDDYYYY_ShortMonthWord_NoTHonDate())
        //assert Column 4 > Submitted By
        cy.get(' > td:nth-child(4) > div')
          .should('exist')
          .within(()=>{
            //assert Logo Initial
            cy.get(' > div > div > span')
              .should('exist')
              .and('have.text', 'LP')
              .and('have.css', 'color', 'rgb(255, 255, 255)') //text color
              .and('have.css', 'background-color', 'rgb(0, 47, 93)') //the circular background color
              .and('have.css', 'border-radius', '9999px')
            //assert the Name
            cy.get(' > span')
              .should('exist')
              .and('have.text', 'Logan Paul')
          })
        //assert Column 5 > Sales Representative - this is optional
        //assert Column 6 > Project Manager
        cy.get(' > td:nth-child(6) > div')
          .should('exist')
          .within(()=>{
            //assert Logo Initial
            cy.get(' > div > div > span')
              .should('exist')
              .and('have.text', 'PK')
              .and('have.css', 'color', 'rgb(255, 255, 255)') //text color
              .and('have.css', 'background-color', 'rgb(0, 47, 93)') //the circular background color
              .and('have.css', 'border-radius', '9999px')
            //assert the Name
            cy.get(' > span')
              .should('exist')
              .and('have.text', 'Peter Kanluran')
          })
        //assert Column 7 > Type
        cy.get(' > td:nth-child(7)')
          .should('exist')
          .and('have.text', 'Onboarding Process')
        //assert Column 8 > Occurrence
        cy.get(' > td:nth-child(8)')
          .should('exist')
          .and('have.text', '2nd')
        //assert Column 9 > Urgency Level
        cy.get(' > td:nth-child(9) > span')
          .should('exist')
          .and('have.text', '1')
          .and('have.css', 'color', 'rgb(191, 166, 84)') //text color
          .and('have.css', 'background-color', 'rgb(249, 220, 125)') //the circular background color
          .and('have.css', 'border-radius', '9999px')
        //assert Column 10 > Status
        cy.get(' td:nth-child(10) > span')
          .should('exist')
          .and('have.text', 'Ongoing')
          .and('have.css', 'color', 'rgb(191, 166, 84)') //text color
          .and('have.css', 'background-color', 'rgb(249, 220, 125)') //the circular background color
          .and('have.css', 'border-radius', '40px')
        //assert Column 11 > Action:View
        cy.get(' > td:nth-child(11) > div ')
          .should('exist')
          .and('not.be.disabled')
          .find('svg').should('have.css', 'color', 'rgb(0, 150, 109)') //text color
      })
      //////// COMPLAINTS TABLET LISTS ASSERTIONS ENDS HERE ///////////////
      
      //Then I will click the Action: View button
      cy.get('table > tbody > tr:first-child > td:nth-child(11) > div')
        .click()
        .wait(3000)

      //verify Complaint View Modal popup
      cy.get(complaintslocators.ComplaintViewModal[0].modal)
        .should('exist')

      ///////// COMPLAINT VIEW MODAL ELEMENT ASSERTIONS STARTS HERE ///////////////

      //verify modal title
      cy.get(complaintslocators.ComplaintViewModal[0].modaltitle)
        .should('exist')
        .and('have.text', 'Complaint')
        .and('have.css', 'color', 'rgb(148, 148, 148)') //text color
      
      //verify Partner's Account label and the Partner's Account Name
      cy.get(complaintslocators.ComplaintViewModal[0].PartnersAccountLabelandPartnerAccountsName)
        .should('exist')
        .within(()=>{
          //assert Partner's Account Label
          cy.get(' > p:nth-child(1)')
            .should('exist')
            .and('have.text', "Partner's Account")
            .and('have.css', 'color', 'rgb(148, 148, 148)') //text color
          //assert Partner's Account Name / Client Name
          cy.get(' > p:nth-child(2)')
            .should('exist')
            .then((txt)=>{
              GETClientName.then(()=>{
                expect(txt.text().trim()).to.equal(clientName);
              })
            })
        })
      
      //verify Partner's Name / Client Partner's Full Name
      cy.get(complaintslocators.ComplaintViewModal[0].PartnersAccountNameLabelandPartnersAccountFullName)
        .should('exist')
        .within(()=>{
          //assert Partner's Account Label
          cy.get(' > p:nth-child(1)')
            .should('exist')
            .and('have.text', "Partner's Name")
            .and('have.css', 'color', 'rgb(148, 148, 148)') //text color
          //assert Partner's Account Name / Client Name
          cy.get(' > p:nth-child(2)')
            .should('exist')
            .then((txt)=>{
              GETClientPartnerFullName.then(()=>{
                expect(txt.text().trim()).to.equal(clientFullName);
              })
            })
        })

      //verify Submitted Date Label and the Date
      cy.get(complaintslocators.ComplaintViewModal[0].SubmittedDateLabelandTheDate)
        .should('exist')
        .within(()=>{
          //assert Partner's Account Label
          cy.get(' > p:nth-child(1)')
            .should('exist')
            .and('have.text', "Submitted Date")
            .and('have.css', 'color', 'rgb(148, 148, 148)') //text color
          //assert Partner's Account Name / Client Name
          cy.get(' > p:nth-child(2)')
            .should('exist')
            .and('have.text', DateTodayIs.TodayDateMMDDYYYY_ShortMonthWord_NoTHonDate())
        })

      //verify Submitted By Label and the Initial Logo of the Submitter and its Full Name
      cy.get(complaintslocators.ComplaintViewModal[0].SubmittedByLabelandTheSubmitter)
        .should('exist')
        .within(()=>{
          //assert the Submitted By label
          cy.get(' > p')
            .should('exist')
            .and('have.text', "Submitted By")
            .and('have.css', 'color', 'rgb(148, 148, 148)') //text color
          //assert the Initial Logo of the Submitter
          cy.get(' > div > div > div > span')
            .should('exist')
            .and('have.text', 'LP')
            .and('have.css', 'color', 'rgb(255, 255, 255)') //text color
            .and('have.css', 'background-color', 'rgb(0, 47, 93)') //the circular background color
            .and('have.css', 'border-radius', '9999px')
          //assert the Submitter Full Name
          cy.get(' > div > p')
            .should('exist')
            .and('have.text', 'Logan Paul')
        })

      //verify Project Manager Label and the Project Manager Full Name
      cy.get(complaintslocators.ComplaintViewModal[0].ProjectManagerLabelandTheProjectManagerFullName)
        .should('exist')
        .within(()=>{
          //assert Project Manager Label
          cy.get(' > p')
            .should('exist')
            .and('have.text', "Project Manager")
            .and('have.css', 'color', 'rgb(148, 148, 148)') //text color
          //assert PM Initial Logo
          cy.get(' > div > div > div > span')
            .should('exist')
            .and('have.text', 'PK')
          //assert PM Full Name
          cy.get(' > div > p')
            .should('exist')
            .and('have.text', 'Peter Kanluran')
        })

      //verify Type Label and the selected Type
      cy.get(complaintslocators.ComplaintViewModal[0].TypeLabelandTheselectedType)
        .should('exist')
        .within(()=>{
          //assert Type Label
          cy.get(' > p:nth-child(1)')
            .should('exist')
            .and('have.text', "Type")
            .and('have.css', 'color', 'rgb(148, 148, 148)') //text color
          //assert the selected type
          cy.get(' > p:nth-child(2)')
            .should('exist')
            .and('have.text', 'Onboarding Process')
        })

      //verify Occurent Label and the selected Occurence
      cy.get(complaintslocators.ComplaintViewModal[0].OccurentLabelandTheselectedOccurent)
        .should('exist')
        .within(()=>{
          //assert Type Label
          cy.get(' > p:nth-child(1)')
            .should('exist')
            .and('have.text', "Occurent")
            .and('have.css', 'color', 'rgb(148, 148, 148)') //text color
          //assert the selected type
          cy.get(' > p:nth-child(2)')
            .should('exist')
            .and('have.text', '2nd')
        })

      //verify Files Uploaded by Client Label and the Uploaded File
      cy.get(complaintslocators.ComplaintViewModal[0].FilesUploadedByClientLabelandTheUploadedFILE)
        .should('exist')
        .within(()=>{
          //assert the Files Uploaded by Client Label
          cy.get(' > p')
            .should('exist')
            .and('have.text', 'Files Uploaded by client')
            .and('have.css', 'color', 'rgb(102, 102, 102)') //text color
            .and('have.css', 'font-weight', '700') // font bold
          //assert the Uploaded Image
          cy.get(' > div > div > img')
            .should('exist')
        })

      //verify Additional Notes Label and the Note
      cy.get(complaintslocators.ComplaintViewModal[0].AdditionalNotesLabelandTheNote)
        .should('exist')
        .within(()=>{
          //assert Type Label
          cy.get(' > p:nth-child(1)')
            .should('exist')
            .and('have.text', "Additional Notes")
            .and('have.css', 'color', 'rgb(102, 102, 102)') //text color
            .and('have.css', 'font-weight', '700') // font bold
          //assert the selected type
          cy.get(' > p:nth-child(2)')
            .should('exist')
            .and('have.text', 'This is only a test data for testing purposes only')
        })

      //verify Mark as Resolved button
      cy.get(complaintslocators.ComplaintViewModal[0].MarkasResolvedButton)
        .should('exist')
        .and('not.be.disabled')
        .and('have.text', 'Mark as Resolved')
        .and('have.css', 'color', 'rgb(250, 250, 250)') //text color
        .and('have.css', 'font-weight', '700') // font bold
        .and('have.css', 'background-color', 'rgb(0, 186, 136)') //background color
        .and('have.css', 'border-radius', '40px')

      //verify Urgency Level Number
      cy.get(complaintslocators.ComplaintViewModal[0].UrgencyLevelNumber)
        .should('exist')
        .and('have.text', '1')
        .and('have.css', 'color', 'rgb(191, 166, 84)') //text color
        .and('have.css', 'background-color', 'rgb(249, 220, 125)') //the circular background color
        .and('have.css', 'border-radius', '9999px')

      //verify Status
      cy.get(complaintslocators.ComplaintViewModal[0].Status)
        .should('exist')
        .and('have.text', 'Ongoing')
        .and('have.css', 'color', 'rgb(191, 166, 84)') //text color
        .and('have.css', 'background-color', 'rgb(249, 220, 125)') //the circular background color
        .and('have.css', 'border-radius', '40px')

      ///////// COMPLAINT VIEW MODAL ELEMENT ASSERTIONS ENDS HERE ///////////////
      
    })
    it("Testcase ID: CC0003 - Verify client partner can mark as resolved the existing created complaint form",()=>{
      
      
      let GETClientName;
      let clientName;
      let GETClientPartnerFullName;
      let clientFullName;

      //Login using account specialist
      cy.userlogin(loginmodule.EmailAddressInputfield, loginmodule.PasswordInputfield, loginmodule.SigninButton, testdata.userAccounts[0].accountspecialist1, testdata.userAccounts[0].accountspecialistandprojectmanagerpassword)

      //Click the Clients Navigation Module
      cy.get(modulebutton.ClientsModuleButton)
        .click()
        .wait(2000) 

      //Then click then client name link text
      cy.get('table > tbody > tr:first-child > td:nth-child(1) > a')
        .click()
        .wait(3000)

      //GET the current client name that shows as the title
      GETClientName = new Promise((resolve)=>{
        cy.get(clientmodulelocator.ClientNameTitle)
          .then((name)=>{
            clientName = name.text().trim();
          })
      })

      //GET the Client Partner full name in the Client > Client Dashboard > Profile > Overview > Contact Name
      GETClientPartnerFullName = new Promise((resolve)=>{
        cy.get(clientmodulelocator.ClientDashboardTabPage[0].ProfileTabpage[0].ClientBasicContactInformationSection[0].ContactName)
          .then((cName)=>{
            clientFullName = cName.text().trim();
            resolve();
          })
      })
    
      //Click the Complaints Link text folder
      cy.get(linktextfolder.ClientModule[0].Complaints)
        .click()
        .wait(1000)
        .should('have.css', 'color', 'rgb(239, 68, 68)') // text color
        .find('svg').should('have.css', 'color', 'rgb(239, 68, 68)') //text color

      //verify correct destination page url
      cy.url().should('contain', '/clients/complaints')
  
      //verify Add button if Found then click
      cy.get(complaintslocators.AddButton)
        .should('exist')
        .and('not.be.disabled')
        .and('have.text', 'Add')
        .and('have.css', 'border-color', 'rgb(0, 47, 93)') //border capsule shape color
        .and('have.css', 'border-radius', '40px') // the curve edge 
        .click()
        .wait(2000)

      //verify that the Client Complaint Form modal popup
      cy.get(complaintslocators.ClientComplaintFormModal[0].modal)
        .should('exist')

      ///////// CREATE CLIENT COMPLAINT STARTS HERE ///////////

      //Select Client test in the Select Partner's Account
      cy.get(complaintslocators.ClientComplaintFormModal[0].PartnersAccountLabelandSelectPartnersAccountButton)
        .within(()=>{
          //click the button
          cy.get(' > div > div > button')
          .click()
          .wait(1000)
          //enter the client name in the Search Input field
          cy.get('input[type="email"][name="email"]')
            .clear()
            .type('(AAA')
            .wait(3000)
          //Then as it appears, click the client test
          cy.get('ul > li > button')
            .click()
            .wait(700)
        })

      //verify that it appeared on top after it was selected
      cy.get(complaintslocators.ClientComplaintFormModal[0].PartnersAccountLabelandSelectPartnersAccountButton)
        .find(' > div > div > button')
        .then((txt)=>{
          GETClientName.then(()=>{
            expect(txt.text().trim()).to.equal(clientName);
          })
        })

      //Select Type of Complaint - Onboarding Process
      cy.get(complaintslocators.ClientComplaintFormModal[0].TypeofComplaintLabelandTheLists)
        .find(' > div > label:nth-child(1) > input')
        .check()
        .should('be.checked')

      //Select Number of Occurence
      cy.get(complaintslocators.ClientComplaintFormModal[0].HowmanytimeshasthisclientreachedoutregardingthisissuetoyouLabelandDropdownMenu)
        .find(" > select[name='occurence']")
        .select('2').should('have.value','2')
        .wait(2000)

      //verify that the selected number of occurence is on top 
      cy.get(complaintslocators.ClientComplaintFormModal[0].HowmanytimeshasthisclientreachedoutregardingthisissuetoyouLabelandDropdownMenu)
        .find('select option:selected')
        .should('have.text', '2nd')

      //Select Urgency Level
      cy.get(complaintslocators.ClientComplaintFormModal[0].UrgencyLevelLabelandDropdownMenu)
        .find(' > div > button:nth-child(1)')
        .click()
        .wait(1000)

      //Upload Additional Screenshot
      cy.get(complaintslocators.ClientComplaintFormModal[0].AdditionalInformationScreenshotsLabelandButton)
        .find(' > div:nth-child(1) > div > input')
        .attachFile('azoginsuit.jpg')
        .wait(2000)

      //Add data on Any additional notes related to this complaint?
      cy.get(complaintslocators.ClientComplaintFormModal[0].AnyAdditionalNotesRelatedToThisComplaintLabelandTextareafield)
        .find(' > textarea[name="information"]')
        .clear()
        .type('This is only a test data for testing purposes only')
        .wait(500)
        .should('have.value', 'This is only a test data for testing purposes only')

      //verify that the submit button now is enabled
      cy.get(complaintslocators.ClientComplaintFormModal[0].SubmitButton)
        .should('not.be.disabled')

      //Then click the Submit button
      cy.get(complaintslocators.ClientComplaintFormModal[0].SubmitButton)
        .click()
        .wait(3000)

      ///////// CREATE CLIENT COMPLAINT ENDS HERE ///////////
        
      //////// COMPLAINTS TABLET LISTS ASSERTIONS STARTS HERE ///////////////

      //verify first the Column Names
      const columnNames = [
        "Partner's Account",
        "Partner's Name",
        "Submitted Date",
        "Submitted By",
        "Sales Representative",
        "Project Manager",
        "Type",
        "Occurence",
        "Urgency Level",
        "Status",
        "Action"
      ]
      cy.get('table > thead > tr > th').each(($option, index)=>{
        cy.wrap($option)
          .should('exist')
          .and('have.text', columnNames[index])
          .and('have.css', 'color', 'rgb(190, 190, 190)') //text color
          .and('have.css', 'font-weight', '700') //font bold
        cy.log(columnNames[index])
      })

      //Then verify each columns in row 1
      cy.get('table > tbody > tr:first-child').within(()=>{
        //assert Column 1 > Partner's Account / Client Name
        cy.get(' > td:nth-child(1) > a')
          .should('exist')
          .and('not.be.disabled')
          .then((txt)=>{
            GETClientName.then(()=>{
              expect(txt.text().trim()).to.equal(clientName);
            })
          })
        //assert Column 2 > Partner's Name / Client Partner's Name
        cy.get(' > td:nth-child(2)')
          .should('exist')
          .then((txt)=>{
            GETClientPartnerFullName.then(()=>{
              expect(txt.text().trim()).to.equal(clientFullName);
            })
          })
        //assert Column 3 > Submitted Date
        cy.get(' > td:nth-child(3)')
          .should('exist')
          .and('have.text', DateTodayIs.TodayDateMMDDYYYY_ShortMonthWord_NoTHonDate())
        //assert Column 4 > Submitted By
        cy.get(' > td:nth-child(4) > div')
          .should('exist')
          .within(()=>{
            //assert Logo Initial
            cy.get(' > div > div > span')
              .should('exist')
              .and('have.text', 'LP')
              .and('have.css', 'color', 'rgb(255, 255, 255)') //text color
              .and('have.css', 'background-color', 'rgb(0, 47, 93)') //the circular background color
              .and('have.css', 'border-radius', '9999px')
            //assert the Name
            cy.get(' > span')
              .should('exist')
              .and('have.text', 'Logan Paul')
          })
        //assert Column 5 > Sales Representative - this is optional
        //assert Column 6 > Project Manager
        cy.get(' > td:nth-child(6) > div')
          .should('exist')
          .within(()=>{
            //assert Logo Initial
            cy.get(' > div > div > span')
              .should('exist')
              .and('have.text', 'PK')
              .and('have.css', 'color', 'rgb(255, 255, 255)') //text color
              .and('have.css', 'background-color', 'rgb(0, 47, 93)') //the circular background color
              .and('have.css', 'border-radius', '9999px')
            //assert the Name
            cy.get(' > span')
              .should('exist')
              .and('have.text', 'Peter Kanluran')
          })
        //assert Column 7 > Type
        cy.get(' > td:nth-child(7)')
          .should('exist')
          .and('have.text', 'Onboarding Process')
        //assert Column 8 > Occurrence
        cy.get(' > td:nth-child(8)')
          .should('exist')
          .and('have.text', '2nd')
        //assert Column 9 > Urgency Level
        cy.get(' > td:nth-child(9) > span')
          .should('exist')
          .and('have.text', '1')
          .and('have.css', 'color', 'rgb(191, 166, 84)') //text color
          .and('have.css', 'background-color', 'rgb(249, 220, 125)') //the circular background color
          .and('have.css', 'border-radius', '9999px')
        //assert Column 10 > Status
        cy.get(' td:nth-child(10) > span')
          .should('exist')
          .and('have.text', 'Ongoing')
          .and('have.css', 'color', 'rgb(191, 166, 84)') //text color
          .and('have.css', 'background-color', 'rgb(249, 220, 125)') //the circular background color
          .and('have.css', 'border-radius', '40px')
        //assert Column 11 > Action:View
        cy.get(' > td:nth-child(11) > div ')
          .should('exist')
          .and('not.be.disabled')
          .find('svg').should('have.css', 'color', 'rgb(0, 150, 109)') //text color
      })
      //////// COMPLAINTS TABLET LISTS ASSERTIONS ENDS HERE ///////////////
      
      //Then I will click the Action: View button
      cy.get('table > tbody > tr:first-child > td:nth-child(11) > div')
        .click()
        .wait(3000)

      //verify Complaint View Modal popup
      cy.get(complaintslocators.ComplaintViewModal[0].modal)
        .should('exist')

      //Then Click the Mark as Resolved button
      cy.get(complaintslocators.ComplaintViewModal[0].MarkasResolvedButton)
        .click()
        .wait(2000)

      //verify Mark as Resolved modal popup 
      cy.get(complaintslocators.MarkasResolvedModal[0].modal)
        .should('exist')
        
      //////// MARK AS RESOLVED MODAL ELEMENTS ASSERTIONS STARTS HERE /////////

      //verify modal title
      cy.get(complaintslocators.MarkasResolvedModal[0].modaltitle)
        .should('exist')
        .and('have.text', 'Mark as Resolved')
        .and('have.css', 'color', 'rgb(148, 148, 148)') //text color

      //verify Tell us how you resolve the problem Label and its textarea field
      cy.get(complaintslocators.MarkasResolvedModal[0].TellUsHowYouResolveTheProblemLabelandTextareafield)
        .should('exist')
        .within(()=>{
          //assert Label
          cy.get(' > label')
            .should('exist')
            .and('have.text', 'Tell us how you resolve the problem*')
            .and('have.css', 'color', 'rgb(102, 102, 102)') //text color
            .find('sup').should('have.css', 'color', 'rgb(237, 46, 46)') //text color
          //assert textarea field
          cy.get('textarea[name="resolution"]')
            .should('exist')
            .and('not.be.disabled')
            .and('have.value', '') //empty by default
            .and('have.attr', 'placeholder', 'Enter additional notes here')
        })

      //verify Cancel Button
      cy.get(complaintslocators.MarkasResolvedModal[0].CancelButton)
        .should('exist')
        .and('not.be.disabled')
        .and('have.text', 'Cancel')
        .and('have.css', 'color', 'rgb(24, 121, 216)') //text color
        .and('have.css', 'font-weight', '700') // font bold

      //verify Submit Button
      cy.get(complaintslocators.MarkasResolvedModal[0].SubmitButton)
        .should('exist')
        .and('be.disabled')
        .and('have.text', 'Submit')

      //////// MARK AS RESOLVED MODAL ELEMENTS ASSERTIONS ENDS HERE /////////

      //Now Enter data on Tell us how you resolve the problem textarea field
      cy.get(complaintslocators.MarkasResolvedModal[0].TellUsHowYouResolveTheProblemLabelandTextareafield)
        .find('textarea[name="resolution"]')
        .clear()
        .type('The data I entered here is for testing purposes only')
        .wait(600)
        .should('have.value', 'The data I entered here is for testing purposes only')

      //verify now the Submit button should be enabled
      cy.get(complaintslocators.MarkasResolvedModal[0].SubmitButton)
        .should('exist')
        .and('not.be.disabled')
        .and('have.text', 'Submit')
        .and('have.css', 'color', 'rgb(250, 250, 250)') //text color
        .and('have.css', 'font-weight', '700') // font bold
        .and('have.css', 'background-color', 'rgb(0, 47, 93)') //background color
        .and('have.css', 'border-radius', '40px')
        
      //THEN I will now click the Submit button 
      cy.get(complaintslocators.MarkasResolvedModal[0].SubmitButton)
        .click()
        .wait(300)

      //verify back at the Complaint View Modal that there is no more Mark as Resolved button
      cy.get(complaintslocators.ComplaintViewModal[0].MarkasResolvedButton)
        .should('not.exist')

      //verify there is no Ongoing Status Instead it becomes Resolved element
      cy.get(complaintslocators.ComplaintViewModal[0].Status)
        .should('exist')
        .and('have.text', 'Resolved')
        .and('have.css', 'background-color', 'rgb(207, 255, 221)') //background color
        .and('have.css', 'border-radius', '40px')

      //Now I am going to close the Complaints View modal by {esc} keyboard
      cy.get('body').type('{esc}'); //esc keyboard execution
        
      //verify in the Complaints Table list under the same row at Column 10 > Status
      cy.get('table > tbody > tr:first-child > td:nth-child(10) > span')
        .should('exist')
        .and('have.text', 'Resolved')
        .and('have.css', 'color', 'rgb(102, 102, 102)') //text color
        .and('have.css', 'background-color', 'rgb(207, 255, 221)') //the circular background color
        .and('have.css', 'border-radius', '40px')
        
    })
    // **** CLIENT CLIENT COMPLAINT ENDS HERE ***
    // **** CLIENTS TERMINATION STARTS HERE ***
    it("Testcase ID: CT0001 - Client Initiate Termination Request for a Client",()=>{

      let GETClientService;
      let ClientService;
      let GETClientName;
      let clientName;
      let GETActivationDate;
      let ClientActivationDate;


      //Login using account specialist
      cy.userlogin(loginmodule.EmailAddressInputfield, loginmodule.PasswordInputfield, loginmodule.SigninButton, testdata.userAccounts[0].accountspecialist1, testdata.userAccounts[0].accountspecialistandprojectmanagerpassword)

      //Click the Clients Navigation Module
      cy.get(modulebutton.ClientsModuleButton)
        .click()
        .wait(2000) 

      //GET the client Service of the test client in number 7 row at column 2; can be found in the table at column 2
      GETClientService = new Promise((resolve)=>{
        cy.get('table > tbody > tr:nth-child(7) > td:nth-child(2)').then((textName)=>{
          ClientService = textName.text().trim()
          resolve();
        })
      })
      
      //Then I will select that number 7 test client 
      cy.get('table > tbody > tr:nth-child(7) > td:nth-child(1) > a')
        .click()
        .wait(2000)

      //GET client name H1 title
      GETClientName = new Promise((resolve)=>{
        cy.get(clientmodulelocator.ClientNameTitle)
          .then((name)=>{
            clientName = name.text().trim();
          })
      })
      
      //click the billing tab
      cy.get(clientmodulelocator.ClientMainPageTab[0].BillingTab)
        .click()
        .wait(2000)

      //GET the Activation Date
      GETActivationDate = new Promise((resolve)=>{
        cy.get(clientmodulelocator.BillingTabPage[0].SubscriptionTabpage[0].ClientBasicContactInformationSection[0].ActivationDate)
          .then((date)=>{
            ClientActivationDate = date.text().trim();
            resolve();
          })
      })

      //verify there is Terminate link if Found then click
      cy.get(clientmodulelocator.TerminateButton)
        .should('exist')
        .and('not.be.disabled')
        .and('have.text', 'Terminate')
        .and('have.css', 'color', 'rgb(195, 0, 0)')  // text color
        .and('have.css', 'font-weight', '700')  // font bold
        .click()
        .wait(2000)
        
      //verify that the Termination Request modal popup open
      cy.get(clientmodulelocator.TerminationRequestModal[0].modal)
        .should('exist')

      ///////// TERMINATION REQUEST MODAL ELEMENTS ASSERTIONS STARTS HERE ////////////////

      //verify modal title
      cy.get(clientmodulelocator.TerminationRequestModal[0].modaltitle)
        .should('exist')
        .and('have.text', 'Termination Request')
        .and('have.css', 'font-weight' ,'700') // font bold
        .and('have.css', 'font-size', '25px')

      //verify ' For + Client Name '
      cy.get(clientmodulelocator.TerminationRequestModal[0].clientname)
        .should('exist')
        .then((txt)=>{
          GETClientName.then(()=>{
            expect(txt.text().trim()).to.equal(`For ${clientName}`)
          })
        })
      
      //verify Reason for Termination Label and Select Menu
      cy.get(clientmodulelocator.TerminationRequestModal[0].ReasonForTerminationLabelandSelectMenu)
        .should('exist')
        .within(()=>{
          //assert Reason for Termination Label
          cy.get(' > label')
            .should('exist')
            .and('have.text', 'Reason for termination')
            .and('have.css', 'color', 'rgb(107, 114, 128)') // text color
          //assert Select Menu
          cy.get(' > div > select[name="reason"]')
            .should('exist')
            .and('not.be.disabled')
          const listofReasons = [
            'Select Reason',
            'PPC Issues',
            'Communication Issues',
            'Design Issues',
            'Writing Issues',
            'Poor Sales Growth',
            'Amazon Listing Restriction',
            'Lack of Reporting/Strategies',
            'Not profitable - No ROI with SI',
            'SI Terminated',
            'Change of Agency',
            'Ceasing Amazon Channel',
            'SI Delays',
            'Created In-house Team',
            'Contract Fulfilled'
          ]
          cy.get(' > div > select[name="reason"] > option').each(($option, index)=>{
            cy.wrap($option)
              .should('exist')
              .and('not.be.disabled')
              .and('have.text', listofReasons[index])
            cy.log(listofReasons[index])
          })
        })

      //verify Retention Effort Checklist Label and Description
      cy.get(clientmodulelocator.TerminationRequestModal[0].RetentionEffortChecklistLabelandDescription)
        .should('exist')
        .within(()=>{
          //assert Retention Effort Checklist Label
          cy.get(' > label') 
            .should('exist')
            .and('have.text', 'Retention Effort Checklist')
            .and('have.css', 'color', 'rgb(107, 114, 128)') // text color
          //assert description
          cy.get(' > div > label')
            .should('exist')
            .and('have.text', 'Before we terminate this client, we wanna make sure that all efforts are made. Kindly review the checklist and confirm the following has been done.')
            .and('have.css', 'color', 'rgb(148, 148, 148)') // text color
        })
      
      //verify Retention Effort Checklist
      cy.get(clientmodulelocator.TerminationRequestModal[0].RetentionEffortChecklists)
        .should('exist')
        .within(()=>{
          const checklists = [
            'Provided a seamless onboarding process.',
            'Established a regular communication schdule.',
            'Addressed and resolve issues promptly.',
            'Reached out to clients with solutions before they encounter problems.',
            'Schedule regular check-in calls or meetings to discuss their progress, challenges, and goals.'
          ]
          cy.get(' > div > span').each(($span, index)=>{
            cy.wrap($span)
              .should('exist')
              .and('have.text', checklists[index])
            cy.log(checklists[index])
          })
        })

      //verify Additional Notes Label and Textarea field
      cy.get(clientmodulelocator.TerminationRequestModal[0].AdditionalNotesLabelandTextareafield)
        .should('exist')
        .within(()=>{
          //assert Additional Notes Label
          cy.get(' > label')
            .should('exist')
            .and('have.text', 'Additional Notes')
            .and('have.css', 'color', 'rgb(107, 114, 128)') //text color
          //assert textarea field
          cy.get(' > div > textarea[name="moreInformation"]')
            .should('exist')
            .and('not.be.disabled')
            .and('have.value', '') // empty by default
        })

      //verify Cancel Button
      cy.get(clientmodulelocator.TerminationRequestModal[0].CancelButton)
        .should('exist')
        .and('not.be.disabled')
        .and('have.text', 'Cancel')
        .and('have.css', 'color', 'rgb(148, 148, 148)') //text color
        .and('have.css', 'font-weight' ,'700') // font bold

      //verify Request for Termination Button
      cy.get(clientmodulelocator.TerminationRequestModal[0].RequestForTerminationButton)
        .should('exist')
        .and('not.be.disabled')
        .and('have.text', 'Request for Termination')
        .and('have.css', 'color', 'rgb(250, 250, 250)') //text color
        .and('have.css', 'background-color', 'rgb(195, 0, 0)') // background color 
        .and('have.css', 'border-radius', '40px')
        .and('have.css', 'font-weight' ,'700') // font bold
  
      ///////// TERMINATION REQUEST MODAL ELEMENTS ASSERTIONS ENDS HERE ////////////////

      ///// REQUIRED FIELDS ASSERTIONS STARTS HERE /////////
  
      //without fill any of the fields, click the Request for Termination Button
      cy.get(clientmodulelocator.TerminationRequestModal[0].RequestForTerminationButton)
        .click()
        .wait(3000)

      //verify that the Termination Request modal popup should remain open
      cy.get(clientmodulelocator.TerminationRequestModal[0].modal)
        .should('exist')
        
      //verify Error Text 1 - Please select a reason for termination
      cy.get('form > div.space-y-6 > div:nth-child(1) > div > div')
        .should('exist')
        .and('have.text', 'Please select a reason for termination')
        .and('have.css', 'color', 'rgb(185, 28, 28)') //text color

      //verify Error Text 2 - Checklist must have at least 1 item.
      cy.get('form > div.space-y-6 > div:nth-child(3) > div:nth-child(2)')
        .should('exist')
        .and('have.text', 'Checklist must have at least 1 item.')
        .and('have.css', 'color', 'rgb(185, 28, 28)') //text color

      //verify Error Text 3 - Please provide more information about this termination request
      cy.get('form > div.space-y-6 > div:nth-child(4) > div > div')
        .should('exist')
        .and('have.text', 'Please provide more information about this termination request')
        .and('have.css', 'color', 'rgb(185, 28, 28)') //text color

      //Now I will select one Reason for Termination
      cy.get(clientmodulelocator.TerminationRequestModal[0].ReasonForTerminationLabelandSelectMenu)
        .find(' > div > select[name="reason"]')
        .select('Design Issues')
        .wait(700)
        .should('have.value','Design Issues')
        
      //verify that the selected reason goes on top
      cy.get(clientmodulelocator.TerminationRequestModal[0].ReasonForTerminationLabelandSelectMenu)
        .find('select option:selected')
        .should('have.text', 'Design Issues')
      
      //verify that Error Text 1 - Please select a reason for termination should not be visible
      cy.get('form > div.space-y-6 > div:nth-child(1) > div > div')
        .should('not.exist')

      //verify Error Text 2 - Checklist must have at least 1 item. remains visible
      cy.get('form > div.space-y-6 > div:nth-child(3) > div:nth-child(2)')
        .should('exist')

      //verify Error Text 3 - Please provide more information about this termination request remains visible
      cy.get('form > div.space-y-6 > div:nth-child(4) > div > div')
        .should('exist')
      
      //Then Select 1 Retention Effort at Checklist - Addressed and resolve issues promptly.
      cy.get('form > div.space-y-6 > div:nth-child(3) > div > div:nth-child(3) > input[name="retentionEffortCheckList"]')
        .check()
        .wait(600)
        .should('be.checked')

      //verify Error Text 2 - Checklist must have at least 1 item. should not be visible 
      cy.get('form > div.space-y-6 > div:nth-child(3) > div:nth-child(2)')
        .should('not.exist')

      //verify Error Text 3 - Please provide more information about this termination request remains visible
      cy.get('form > div.space-y-6 > div:nth-child(4) > div > div')
        .should('exist')

      //Now Enter Data on Additional Notes Textarea field
      cy.get(clientmodulelocator.TerminationRequestModal[0].AdditionalNotesLabelandTextareafield)
        .find(' > div > textarea[name="moreInformation"]')
        .clear()
        .type('The Data I entered here is for testing purposes only')
        .wait(600)
        .should('have.value', 'The Data I entered here is for testing purposes only')

      //verify Error Text 3 - Please provide more information about this termination request should not be visible 
      cy.get('form > div.space-y-6 > div:nth-child(4) > div > div')
        .should('not.exist')
      
      //Then Finally I click the Request for Termination button
      cy.get(clientmodulelocator.TerminationRequestModal[0].RequestForTerminationButton)
        .click()
        .wait(3000)

      ///// REQUIRED FIELDS ASSERTIONS ENDS HERE /////////

      //verify alert-success modal popup
      cy.get('div.overflow-y-auto > div.min-h-full')
        .should('exist')
        .within(()=>{
          //assert check logo
          cy.get(' > div > div > svg')
            .should('exist')
            .and('have.css', 'color', 'rgb(0, 150, 109)') //check color
          //assert message
          cy.get(' > div > div')
            .should('exist')
            .and('have.text', 'Your termination request has been sent to the approver.')
            .and('have.css', 'color', 'rgb(0, 150, 109)') //text color
            .and('have.css', 'font-weight', '400')  //font bold
        })

      //then simulate pressing esc key in your keyboard
      cy.get('body').type('{esc}');
      cy.wait(3000)

      //verify that the Terminate link button becomes Termination Ongoing
      cy.get('div.main-content-inner2 > div > div > p')
        .should('exist')
        .and('have.text', 'Termination Ongoing')
        .and('have.css', 'color', 'rgb(195, 0, 0)')  // text color
        .and('have.css', 'background-color', 'rgb(255, 175, 175)')  // background color that forms like a capsule
        .and('have.css', 'border-radius', '40px')  // the curve edge of the background color

      //Go to Client > For Termination Folder
      //verify FOR Termination link text folder
      cy.get(linktextfolder.ClientModule[0].ForTermination)
        .should('exist')
        .and('not.be.disabled')
        .and('have.text', 'For Termination')
        .and('have.css', 'color', 'rgb(156, 163, 175)') //default text color
        .find('svg').should('exist').and('be.visible').and('have.css', 'color', 'rgb(156, 163, 175)') //its star icon verification
        
      //Click the FOR Termination Link text folder
      cy.get(linktextfolder.ClientModule[0].ForTermination)
        .click()
        .wait(1000)
        .should('have.css', 'color', 'rgb(239, 68, 68)') // text color
        .find('svg').should('have.css', 'color', 'rgb(239, 68, 68)') //text color
      
      //verify correct destination page url
      cy.url().should('contain', '/clients/fortermination')
        
      ////// FOR TERMINATION > REQUESTS TAB > TABLE LISTS ASSERTIONS STARTS HERE ///////////

      //verify Column Names
      const expected_columnNames = [
        'Client Name',
        'Service',
        'Brand Strategist',
        'Contract Signed',
        'Submission Date',
        'Action'
      ];
      cy.get('table > thead > tr > th').each(($option, index) => {
        cy.wrap($option)
          .should('exist')
          .and('have.text', expected_columnNames[index])  //verify names based on the expected names per column
          .and('have.css', 'color', 'rgb(190, 190, 190)') // text color
          .and('have.css', 'font-weight', '700')  //font bold
          cy.log(expected_columnNames[index]) 
      });
      /*
      // I intentionally click the Submission Date column name in order to go to row 1 the recently send for approval test client
      cy.get('table > thead > tr > th:nth-child(5)')
        .click()
        .wait(2000)  */

      //Then assert Row 1 each columns in the table
      cy.get('table > tbody > tr:first-child').within(()=>{
        //assert Column 1 > Client Name
        GETClientName.then(()=>{
          TerminationTable.assertColumn1ClientName(' > td:nth-child(1) > a', clientName)
        })
        //assert Column 2 > Service 
        GETClientService.then(()=>{
          TerminationTable.assertColumn2Service(' > td:nth-child(2)', ClientService)
        })
        //assert Column 3 > Brand Strategist
        TerminationTable.assertColumn3BrandStrategist(' > td:nth-child(3) > div', 'JG', 'Jean Gray')
        //assert Column 4 > Contract Signed
        GETActivationDate.then(()=>{
          TerminationTable.assertColumn4ContractSigned(' > td:nth-child(4)', ClientActivationDate)
        })
        //assert Column 5 > Submission Date
        TerminationTable.assertColumn5SubmissionDate(' > td:nth-child(5) > span', DateTodayIs.TodayDateDDMMYYYY())
        //assert Column 6 > Action:View
        TerminationTable.assertColumn6Action(' > td:nth-child(6) > button', 'not.be.disabled', 'View')
      })
        
      ////// FOR TERMINATION > REQUESTS TAB > TABLE LISTS ASSERTIONS ENDS HERE ///////////

      //Then here I click the View button
      cy.get('table > tbody > tr:first-child > td:nth-child(6) > button')
        .click()
        .wait(3000)

      //verify Termination Request modal popup open
      cy.get(clientmodulelocator.View_TerminationRequestModal[0].modal)
        .should('exist')

      ///////// TERMINATION REQUEST MODAL ELEMENTS ASSERTIONS STARTS HERE ////////

      //verify modal title
      cy.get(clientmodulelocator.View_TerminationRequestModal[0].modaltitle)
        .should('exist')
        .and('have.text', 'Termination Request')
        .and('have.css', 'font-weight', '700')  //font bold
        .and('have.css', 'font-size', '25px')

      //verify Client Name
      cy.get(clientmodulelocator.View_TerminationRequestModal[0].clientname)
        .should('exist')
        .then((txt)=>{
          GETClientName.then(()=>{
            expect(txt.text().trim()).to.equal(`For ${clientName}`)
          })
        }) 

      //verify Reason for Termination Label and Select Menu
      cy.get(clientmodulelocator.View_TerminationRequestModal[0].ReasonForTerminationLabelandSelectMenu)
        .should('exist')
        .within(()=>{
          //assert Reason for Termination Label
          cy.get(' > label')
            .should('exist')
            .and('have.text', 'Reason for termination')
            .and('have.css', 'color', 'rgb(107, 114, 128)') // text color
          //assert the select menu and that it is expected it shows on top the previously selected reason
          cy.get('select option:selected')
            .should('have.text', 'Design Issues')
          //assert the rest of the list since at this point, i can still select or make changes
          cy.get(' > div > select[name="reason"]')
            .should('exist')
            .and('not.be.disabled')
            const viewlistofReasons = [
              'PPC Issues',
              'Communication Issues',
              'Design Issues',
              'Writing Issues',
              'Poor Sales Growth',
              'Amazon Listing Restriction',
              'Lack of Reporting/Strategies',
              'Not profitable - No ROI with SI',
              'SI Terminated',
              'Change of Agency',
              'Ceasing Amazon Channel',
              'SI Delays',
              'Created In-house Team',
              'Contract Fulfilled'
            ]
            cy.get(' > div > select[name="reason"] > option').each(($option, index)=>{
              cy.wrap($option)
                .should('exist')
                .and('not.be.disabled')
                .and('have.text', viewlistofReasons[index])
              cy.log(viewlistofReasons[index])
            })
        })

      //verify Retentiion Effort Checklist Label and the selected retention
      cy.get(clientmodulelocator.View_TerminationRequestModal[0].RetentionEffortChecklistLabelandTheSelectedRetention)
        .should('exist')
        .within(()=>{
          //assert Retention Effort Checklist Label
          cy.get(' > label')
            .should('exist')
            .and('have.text', 'Retention Effort Checklist')
            .and('have.css', 'color', 'rgb(107, 114, 128)') //text color
          //assert the check logo
          cy.get(' > ul > li > svg')
            .should('exist')
            .and('have.css', 'color', 'rgb(0, 186, 136)') //text color
          //assert the selected retention
          cy.get(' > ul > li > span')
            .should('exist')
            .and('have.text', 'Addressed and resolve issues promptly.')
            .and('have.css', 'color', 'rgb(107, 114, 128)') //text color
        })
      
      //verify Additional Notes Label and the Note
      cy.get(clientmodulelocator.View_TerminationRequestModal[0].AdditionalNotesLabelandTheNotes)
        .should('exist')
        .within(()=>{
          //assert Additional Notes Label
          cy.get(' > label')
            .should('exist')
            .and('have.text', 'Additional Notes')
            .and('have.css', 'color', 'rgb(107, 114, 128)') //text color
          //assert the textarea field and it should be disabled
          cy.get(' > div > textarea[name="moreInformation"]')
            .should('exist')
            .and('be.disabled')
            .and('have.text', 'The Data I entered here is for testing purposes only')
        })

      //verify Deny Button
      cy.get(clientmodulelocator.View_TerminationRequestModal[0].DenyButton)
        .should('exist')
        .and('have.text', 'Deny')
        .and('have.css', 'font-weight', '700') //font bold
        .and('have.css', 'color', 'rgb(250, 250, 250)') //text color
        .and('have.css', 'background-color', 'rgb(195, 0, 0)') //background color
        .and('have.css', 'border-radius', '40px')

      //verify Approve Button
      cy.get(clientmodulelocator.View_TerminationRequestModal[0].ApproveButton)
        .should('exist')
        .and('have.text', 'Approve')
        .and('have.css', 'font-weight', '700') //font bold
        .and('have.css', 'color', 'rgb(250, 250, 250)') //text color
        .and('have.css', 'background-color', 'rgb(0, 186, 136)') //background color
        .and('have.css', 'border-radius', '40px')

      ///////// TERMINATION REQUEST MODAL ELEMENTS ASSERTIONS ENDS HERE ////////
      
      //I will have to close the button so that I may logout
      cy.get('body').type('{esc}'); // pressing esc button of the keyboard

      //Then click the link client name
      cy.get('table > tbody >tr:first-child > td:nth-child(1) > a')
        .click()
        .wait(3000)

      //verify the Terminate Button now becomes 'Termination Ongoing'
      cy.get('div.main-content-inner2 > div > div > p')
        .should('exist')
        .and('have.text', 'Termination Ongoing')
        .and('have.css', 'color', 'rgb(195, 0, 0)') //text color
        .and('have.css', 'background-color', 'rgb(255, 175, 175)') //background color
        .and('have.css', 'border-radius', '40px')

    })
    it("Testcase ID: CT0002 - Deny Termination Request for a Client",()=>{

      let GETClientService;
      let ClientService;
      let GETClientName;
      let clientName;
      let GETActivationDate;
      let ClientActivationDate;


      //Login using account specialist
      cy.userlogin(loginmodule.EmailAddressInputfield, loginmodule.PasswordInputfield, loginmodule.SigninButton, testdata.userAccounts[0].accountspecialist1, testdata.userAccounts[0].accountspecialistandprojectmanagerpassword)

      //Click the Clients Navigation Module
      cy.get(modulebutton.ClientsModuleButton)
        .click()
        .wait(2000) 

      //GET the client Service of the test client (AAA); can be found in the table at column 2
      GETClientService = new Promise((resolve)=>{
        cy.get('table > tbody > tr:first-child > td:nth-child(2)').then((textName)=>{
          ClientService = textName.text().trim()
          resolve();
        })
      })
      
      //Then I will select that same test client 
      cy.get('table > tbody > tr:first-child > td:nth-child(1) > a')
        .click()
        .wait(2000)

      //GET client name H1 title
      GETClientName = new Promise((resolve)=>{
        cy.get(clientmodulelocator.ClientNameTitle)
          .then((name)=>{
            clientName = name.text().trim();
          })
      })
      
      //click the billing tab
      cy.get(clientmodulelocator.ClientMainPageTab[0].BillingTab)
        .click()
        .wait(2000)

      //GET the Activation Date
      GETActivationDate = new Promise((resolve)=>{
        cy.get(clientmodulelocator.BillingTabPage[0].SubscriptionTabpage[0].ClientBasicContactInformationSection[0].ActivationDate)
          .then((date)=>{
            ClientActivationDate = date.text().trim();
            resolve();
          })
      })

      //verify there is Terminate link if Found then click
      cy.get(clientmodulelocator.TerminateButton)
        .should('exist')
        .and('not.be.disabled')
        .and('have.text', 'Terminate')
        .and('have.css', 'color', 'rgb(195, 0, 0)')  // text color
        .and('have.css', 'font-weight', '700')  // font bold
        .click()
        .wait(2000)
        
      //verify that the Termination Request modal popup open
      cy.get(clientmodulelocator.TerminationRequestModal[0].modal)
        .should('exist')

      ///// PROCESS TERMINATION REQUEST STARTS HERE /////////

      //Select one Reason for Termination
      cy.get(clientmodulelocator.TerminationRequestModal[0].ReasonForTerminationLabelandSelectMenu)
        .find(' > div > select[name="reason"]')
        .select('Design Issues')
        .wait(700)
        .should('have.value','Design Issues')
        
      //verify that the selected reason goes on top
      cy.get(clientmodulelocator.TerminationRequestModal[0].ReasonForTerminationLabelandSelectMenu)
        .find('select option:selected')
        .should('have.text', 'Design Issues')

      //Select 1 Retention Effort at Checklist - Addressed and resolve issues promptly.
      cy.get('form > div.space-y-6 > div:nth-child(3) > div > div:nth-child(3) > input[name="retentionEffortCheckList"]')
        .check()
        .wait(600)
        .should('be.checked')

      //Now Enter Data on Additional Notes Textarea field
      cy.get(clientmodulelocator.TerminationRequestModal[0].AdditionalNotesLabelandTextareafield)
        .find(' > div > textarea[name="moreInformation"]')
        .clear()
        .type('The Data I entered here is for testing purposes only')
        .wait(600)
        .should('have.value', 'The Data I entered here is for testing purposes only')

      //Click the Request for Termination button
      cy.get(clientmodulelocator.TerminationRequestModal[0].RequestForTerminationButton)
        .click()
        .wait(3000)

      ///// PROCESS TERMINATION REQUEST ENDS HERE /////////

      //verify alert-success modal popup
      cy.get('div.overflow-y-auto > div.min-h-full')
        .should('exist')
        .within(()=>{
          //assert check logo
          cy.get(' > div > div > svg')
            .should('exist')
            .and('have.css', 'color', 'rgb(0, 150, 109)') //check color
          //assert message
          cy.get(' > div > div')
            .should('exist')
            .and('have.text', 'Your termination request has been sent to the approver.')
            .and('have.css', 'color', 'rgb(0, 150, 109)') //text color
            .and('have.css', 'font-weight', '400')  //font bold
        })

      //then simulate pressing esc key in your keyboard
      cy.get('body').type('{esc}');
      cy.wait(3000)

      //Click the FOR Termination Link text folder
      cy.get(linktextfolder.ClientModule[0].ForTermination)
        .click()
        .wait(1000)

      //verify correct destination page url
      cy.url().should('contain', '/clients/fortermination')
      /*
      // I intentionally click the Submission Date column name in order to go to row 1 the recently send for approval test client
      cy.get('table > thead > tr > th:nth-child(5)')
        .click()
        .wait(1000)  */

      //select row 1 for termination request and click its view button
      cy.get('table > tbody > tr:first-child > td:nth-child(6) > button')
        .click()
        .wait(1000)

      //verify Termination Request modal popup
      cy.get(clientmodulelocator.View_TerminationRequestModal[0].modal)
        .should('exist')

      //Click the Deny Button
      cy.get(clientmodulelocator.View_TerminationRequestModal[0].DenyButton)
        .click()
        .wait(1000)

      //verify Let the requestor know why are you denying the request text
      cy.get(clientmodulelocator.View_TerminationRequestModal[0].LetTheRequestorKnowWhyAreYouDenyingTheRequestTEXT)
        .should('exist')
        .and('have.text', 'Let the requestor know why are you denying the request')
        .and('have.css', 'font-weight', '700') // font bold

      //verify Reason for Denying Label and textarea field
      cy.get(clientmodulelocator.View_TerminationRequestModal[0].ReasonForDenyingLabelandTextarea)
        .should('exist')
        .within(()=>{
          //assert Reason for Denying Label
          cy.get(' > label')
            .should('exist')
            .and('have.text', 'Reason for denying:')
            .and('have.css', 'color', 'rgb(107, 114, 128)') //text color
          //assert textarea field
          cy.get(' > div > textarea[name="denyReason"]')
            .should('exist')
            .and('not.be.disabled')
            .and('have.value', '') //empty by default
        })
      
      //verify GO back button
      cy.get(clientmodulelocator.View_TerminationRequestModal[0].GobackButton)
        .should('exist')
        .and('not.be.disabled')
        .and('have.text', 'Go Back')
        .and('have.css', 'color', 'rgb(148, 148, 148)') //text color
        .and('have.css', 'font-weight', '700') // font bold

      //verify Submit button
      cy.get(clientmodulelocator.View_TerminationRequestModal[0].SubmitButton)
        .should('exist')
        .and('not.be.disabled')
        .and('have.text', 'Submit')
        .and('have.css', 'color', 'rgb(250, 250, 250)') //text color
        .and('have.css', 'font-weight', '700') // font bold
        .and('have.css', 'background-color', 'rgb(0, 47, 93)') //background color
        .and('have.css', 'border-radius', '40px')

      ////////// REQUIRED ASSERTIONS STARTS HERE /////////////////

      //without fill up reason, click the submit button
      cy.get(clientmodulelocator.View_TerminationRequestModal[0].SubmitButton)
        .click()
        .wait(2000)

      //verify that the Termination Request modal should remain open
      cy.get(clientmodulelocator.View_TerminationRequestModal[0].modal)
        .should('exist')

      //verify Error Text - Reason for denying is required.
      cy.get('form > div.space-y-6 > div:nth-child(2) > div > div')
        .should('exist')
        .and('have.text', 'Reason for denying is required.')
        .and('have.css', 'color', 'rgb(185, 28, 28)') //text color

      //Enter Reason for Denying 
      cy.get(clientmodulelocator.View_TerminationRequestModal[0].ReasonForDenyingLabelandTextarea)
        .find(' > div > textarea[name="denyReason"]')
        .clear()
        .type('This client will be denied for testing purposes only')
        .wait(600)
        .and('have.value', 'This client will be denied for testing purposes only')

      //verify Error Text - Reason for denying is required. -  should not be visible
      cy.get('form > div.space-y-6 > div:nth-child(2) > div > div')
        .should('not.exist')

      //Click the Submit button
      cy.get(clientmodulelocator.View_TerminationRequestModal[0].SubmitButton)
        .click()
        .wait(3000)

      ////////// REQUIRED ASSERTIONS ENDS HERE /////////////////

      //verify alert-success message modal popup
      cy.get('div.overflow-y-auto > div.min-h-full')
        .should('exist')
        .within(()=>{
          //assert check logo
          cy.get(' > div > div > svg')
            .should('exist')
            .and('have.css', 'color', 'rgb(0, 47, 93)') //text color
          //assert message
          cy.get(' > div > div')
            .should('exist')
            .and('have.text', 'The requestor has been notified about the denial of the termination request.')
            .and('have.css', 'color', 'rgb(0, 47, 93)') //text color
            .and('have.css', 'font-weight', '400')  //font bold
        })

      //then simulate pressing esc key in your keyboard
      cy.get('body').type('{esc}');
      cy.wait(3000)
        
      //go to Client > For Termination > Denied tab
      //verify there is Denied tab - if Found, then click
      cy.get(forterminationlocators.pageTab[0].DeniedTab)
        .should('exist')
        .and('have.text', 'Denied')
        .and('have.css', 'color', 'rgb(148, 148, 148)') //default text color
        .and('have.css', 'color', 'rgb(148, 148, 148)') //text color
        .and('have.css', 'font-weight', '700')  //font bold
        .click()
        .wait(2000)
        .should('have.css', 'color', 'rgb(24, 121, 216)') //the changed text color
        .and('have.css', 'font-weight', '700')  //font bold

      //verify url expected destination
      cy.url().should('contain', '/clients/fortermination/denied')
      /*
      // I intentionally click the Submission Date column name in order to go to row 1 the recently send for approval test client
      cy.get('table > thead > tr > th:nth-child(5)')
        .click()
        .wait(1000)  */

      /////// DENIED TAB > TABLE LISTS ASSERTIONS STARTS HERE ////////////

      //verify the column names
      const expected_columnNames = [
        'Client Name',
        'Service',
        'Brand Strategist',
        'Contract Signed',
        'Submission Date',
        'Action'
      ];
      cy.get('table > thead > tr > th').each(($option, index) => {
        cy.wrap($option)
          .should('exist')
          .and('have.text', expected_columnNames[index])  //verify names based on the expected names per column
          .and('have.css', 'color', 'rgb(190, 190, 190)') // text color
          .and('have.css', 'font-weight', '700')  //font bold
          cy.log(expected_columnNames[index]) 
      });

      //Then verify the row 1 each columns - because that is the one that recently denied earlier
      cy.get('table > tbody > tr:first-child').within(()=>{
        //assert Column 1 > Client Name
        GETClientName.then(()=>{
          TerminationTable.assertColumn1ClientName(' > td:nth-child(1) > a', clientName)
        })
        //assert Column 2 > Service
        GETClientService.then(()=>{
          TerminationTable.assertColumn2Service(' > td:nth-child(2)', ClientService)
        })
        //assert Column 3 > Brand Strategist
        TerminationTable.assertColumn3BrandStrategist(' > td:nth-child(3) > div', 'JG', 'Jean Gray')
        //assert Column 4 > Contract Signed
        GETActivationDate.then(()=>{
          TerminationTable.assertColumn4ContractSigned(' > td:nth-child(4)', ClientActivationDate)
        })
        //assert Column 5 > Submission Date
        TerminationTable.assertColumn5SubmissionDate(' > td:nth-child(5) > span', DateTodayIs.TodayDateDDMMYYYY())
        //assert Column 6 > Action:View
        TerminationTable.assertColumn6Action(' > td:nth-child(6) > button', 'not.be.disabled', 'View')
      })

      /////// DENIED TAB > TABLE LISTS ASSERTIONS ENDS HERE ////////////

      //Click the View button
      cy.get('table > tbody > tr:first-child > td:nth-child(6) > button')
        .click()
        .wait(2000)

      //verify Termination Request modal popup
      cy.get(clientmodulelocator.View_TerminationRequestModal[0].modal)
        .should('exist')

      //verify there is YOur termination request was denied section and within its elements
      cy.get(clientmodulelocator.View_TerminationRequestModal[0].YourTerminationRequestWasDeniedSection)
        .should('exist')
        .within(()=>{
          //assert Your termination request was denied text
          cy.get(' > p:nth-child(1)')
            .should('exist')
            .and('have.text', 'Your termination request was denied')
            .and('have.css', 'color', 'rgb(239, 68, 68)') // text color
            .and('have.css', 'font-weight', '700')  //font bold
          //assert Reason for deny Label
          cy.get(' > label')
            .should('exist')
            .and('have.text', 'Reason for deny')
            .and('have.css', 'color', 'rgb(107, 114, 128)') // text color
          //assert the Entered Reason for deny data
          cy.get(' > p:nth-child(3)')
            .should('exist')
            .and('have.text', 'This client will be denied for testing purposes only')
        })

      //then simulate pressing esc key in your keyboard
      cy.get('body').type('{esc}');
      cy.wait(3000)

      //I will click the client name in row 1 column 1 to go to its profile page
      cy.get('table > tbody > tr:first-child > td:nth-child(1) > a')
        .click()
        .wait(2000)

      //verify the Termination Ongoing goes back as Terminate link
      cy.get(clientmodulelocator.TerminateButton)
        .should('exist')
        .and('not.be.disabled')
        .and('have.text', 'Terminate')
        .and('have.css', 'color', 'rgb(195, 0, 0)')  // text color
        .and('have.css', 'font-weight', '700')  // font bold

    })
    it("Testcase ID: CT0003 - Approve Termination Request for a Client",()=>{

      let GETClientName;
      let clientName;
      let GETActivationDate;
      let ClientActivationDate;


      //Login using account specialist
      cy.userlogin(loginmodule.EmailAddressInputfield, loginmodule.PasswordInputfield, loginmodule.SigninButton, testdata.userAccounts[0].accountspecialist1, testdata.userAccounts[0].accountspecialistandprojectmanagerpassword)

      //Click the Clients Navigation Module
      cy.get(modulebutton.ClientsModuleButton)
        .click()
        .wait(2000) 

      //Then I will select that last row in page 1 test client 
      cy.get('table > tbody > tr:last-child > td:nth-child(1) > a')
        .click()
        .wait(2000)

      //GET client name H1 title
      GETClientName = new Promise((resolve)=>{
        cy.get(clientmodulelocator.ClientNameTitle)
          .then((name)=>{
            clientName = name.text().trim();
            resolve();
          })
      })
      
      //click the billing tab
      cy.get(clientmodulelocator.ClientMainPageTab[0].BillingTab)
        .click()
        .wait(2000)

      //GET the Activation Date
      GETActivationDate = new Promise((resolve)=>{
        cy.get(clientmodulelocator.BillingTabPage[0].SubscriptionTabpage[0].ClientBasicContactInformationSection[0].ActivationDate)
          .then((date)=>{
            ClientActivationDate = date.text().trim();
            resolve();
          })
      })

      //verify there is Terminate link if Found then click
      cy.get(clientmodulelocator.TerminateButton)
        .should('exist')
        .and('not.be.disabled')
        .and('have.text', 'Terminate')
        .and('have.css', 'color', 'rgb(195, 0, 0)')  // text color
        .and('have.css', 'font-weight', '700')  // font bold
        .click()
        .wait(2000)
        
      //verify that the Termination Request modal popup open
      cy.get(clientmodulelocator.TerminationRequestModal[0].modal)
        .should('exist')

      ///// PROCESS TERMINATION REQUEST STARTS HERE /////////

      //Select one Reason for Termination
      cy.get(clientmodulelocator.TerminationRequestModal[0].ReasonForTerminationLabelandSelectMenu)
        .find(' > div > select[name="reason"]')
        .select('Design Issues')
        .wait(700)
        .should('have.value','Design Issues')
        
      //verify that the selected reason goes on top
      cy.get(clientmodulelocator.TerminationRequestModal[0].ReasonForTerminationLabelandSelectMenu)
        .find('select option:selected')
        .should('have.text', 'Design Issues')

      //Select 1 Retention Effort at Checklist - Addressed and resolve issues promptly.
      cy.get('form > div.space-y-6 > div:nth-child(3) > div > div:nth-child(3) > input[name="retentionEffortCheckList"]')
        .check()
        .wait(600)
        .should('be.checked')

      //Now Enter Data on Additional Notes Textarea field
      cy.get(clientmodulelocator.TerminationRequestModal[0].AdditionalNotesLabelandTextareafield)
        .find(' > div > textarea[name="moreInformation"]')
        .clear()
        .type('The Data I entered here is for testing purposes only')
        .wait(600)
        .should('have.value', 'The Data I entered here is for testing purposes only')

      //Click the Request for Termination button
      cy.get(clientmodulelocator.TerminationRequestModal[0].RequestForTerminationButton)
        .click()
        .wait(3000)

      ///// PROCESS TERMINATION REQUEST ENDS HERE /////////

      //verify alert-success modal popup
      cy.get('div.overflow-y-auto > div.min-h-full')
        .should('exist')
        .within(()=>{
          //assert check logo
          cy.get(' > div > div > svg')
            .should('exist')
            .and('have.css', 'color', 'rgb(0, 150, 109)') //check color
          //assert message
          cy.get(' > div > div')
            .should('exist')
            .and('have.text', 'Your termination request has been sent to the approver.')
            .and('have.css', 'color', 'rgb(0, 150, 109)') //text color
            .and('have.css', 'font-weight', '400')  //font bold
        })

      //then simulate pressing esc key in your keyboard
      cy.get('body').type('{esc}');
      cy.wait(3000)

      //Click the FOR Termination Link text folder
      cy.get(linktextfolder.ClientModule[0].ForTermination)
        .click()
        .wait(1000)

      //verify correct destination page url
      cy.url().should('contain', '/clients/fortermination')
      /*
      // I intentionally click the Submission Date column name in order to go to row 1 the recently send for approval test client
      cy.get('table > thead > tr > th:nth-child(5)')
        .click()
        .wait(1000)  */

      //select row 1 for termination request and click its view button
      cy.get('table > tbody > tr:first-child > td:nth-child(6) > button')
        .click()
        .wait(1000)

      //verify Termination Request modal popup
      cy.get(clientmodulelocator.View_TerminationRequestModal[0].modal)
        .should('exist')

      //Click the Approve Button
      cy.get(clientmodulelocator.View_TerminationRequestModal[0].ApproveButton)
        .click()
        .wait(3000)

      //verify alert-success modal popup
      cy.get('div.overflow-y-auto > div.min-h-full')
        .should('exist')
        .within(()=>{
          //assert check logo
          cy.get(' > div > div > svg')
            .should('exist')
            .and('have.css', 'color', 'rgb(0, 150, 109)') //check color
          //assert message
          cy.get(' > div > div')
            .should('exist')
            .and('have.text', 'The client has been successfully terminated.')
            .and('have.css', 'color', 'rgb(0, 150, 109)') //text color
            .and('have.css', 'font-weight', '400')  //font bold
        })

      //then simulate pressing esc key in your keyboard
      cy.get('body').type('{esc}');
      cy.wait(3000)

      //Go to Inactive Clients
      cy.get(linktextfolder.ClientModule[0].InactiveClients)
        .click()
        .wait(3000)
      /*
      //I will intentionally click the Terminated At column so that the recently terminated client will go to row 1
      cy.get('table > thead > tr > th:nth-child(7)')
        .click()
        .wait(3000) */

      //Verify in Row 1 each columns  
      cy.get('table > tbody > tr:first-child').within(()=>{
        //assert Column1 > CLient Name
        GETClientName.then(()=>{
          InactiveClientsTable.assertColumn1ClientName(' > td:nth-child(1) > a', clientName)
        })
        //assert Column 2 > Status
        InactiveClientsTable.assertColumn2Status(' > td:nth-child(2) > span', 'Inactive', 'rgb(195, 0, 0)', 'rgb(255, 175, 175)')
        //assert Column 3 > Project Manager
        InactiveClientsTable.assertColumn3ProjectManager(' > td:nth-child(3) > div', 'PK', 'Peter Kanluran')
        //assert Column 4 > Brand Strategist
        InactiveClientsTable.assertColumn4BrandStrategist(' > td:nth-child(4) > div', 'JG', 'Jean Gray')
        //assert Column 5 > Account Specialist
        InactiveClientsTable.assertColumn5AccountSpecialist(' > td:nth-child(5) > div', 'LP', 'Logan Paul')
        //assert Column 6 > Contact Signed [Activation Date]
        GETActivationDate.then(()=>{
          InactiveClientsTable.assertColumn6ContractSigned(' > td:nth-child(6) > div > span', ClientActivationDate)
        })
        //assert Column 7 > Terminated At
        InactiveClientsTable.assertColumn7TerminatedAt(' > td:nth-child(7) > div > span', DateTodayIs.TodayDateDDMMYYYYAddZeroOnDDandMM())
        //assert Column 8 > Termination Reason
        InactiveClientsTable.assertColumn8TerminationReason(' > td:nth-child(8)', 'Design Issues')
      })

      //Now I am going to click the Client Name in Row 1 column 1
      cy.get('table > tbody > tr:first-child > td:nth-child(1) > a')
        .click()
        .wait(3000)

      //verify the Terminate from 'Termination Ongoing' to now 'TerminatedYYYY-MM-DD'
      cy.get('div.main-content-inner2 > div > div > p')
        .should('exist')
        .and('have.text', `Terminated last ${DateTodayIs.TodayDateYYYYMMDDWithDashandAddZeroOnDDandMM()}`)
        .and('have.css', 'color', 'rgb(195, 0, 0)') //text color
        .and('have.css', 'background-color', 'rgb(255, 175, 175)') //background color
        .and('have.css', 'border-radius', '40px')

    })
    // **** CLIENTS TERMINATION ENDS HERE ***
    // **** CLIENT ADMIN TASK MANAGEMENT STARTS HERE ***
    it("Testcase ID: CATM0001 - Create Task Management Onboarding Template for New Onboarded client",()=>{

      let GETHREF;
      let templatehref;

      //Login using account specialist
      cy.userlogin(loginmodule.EmailAddressInputfield, loginmodule.PasswordInputfield, loginmodule.SigninButton, testdata.userAccounts[0].accountspecialist1, testdata.userAccounts[0].accountspecialistandprojectmanagerpassword)

      //Click the Admin Navigation Module
      cy.get(modulebutton.AdminModuleButton)
        .click()
        .wait(2000)
        
      //Click the Task Management link text folder
      cy.get(linktextfolder.AdminModule[0].TaskManagement)
        .click()
        .wait(2000)

      //verify Page Title 'Task Management'
      cy.get(adminmodulelocator.TaskManageementFolder[0].pageTitle)
        .should('exist')
        .and('have.text', 'Task Management')
        .and('have.css', 'font-weight', '700') //font bold
        .and('have.css', 'font-size', '25px')

      //verify Add button - if found click
      cy.get(adminmodulelocator.TaskManageementFolder[0].AddButton)
        .should('exist')
        .and('not.be.disabled')
        .and('have.text', 'Add')
        .and('have.css', 'color', 'rgb(0, 47, 93)') //text color
        .and('have.css', 'border-color', 'rgb(0, 47, 93)')
        .and('have.css', 'border-radius', '40px')
        .click()
        .wait(2000)

      //verify Task List Creation Modal popup open
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].modal)
        .should('exist')

      /////// TASK LIST CREATION MODAL ELEMENT ASSERTIONS STARTS HERE ////////

      //verify modal title
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].modaltitle)
        .should('exist')
        .and('have.text', 'Task List Creation')
        .and('have.css', 'color', 'rgb(31, 41, 55)') //text color
        .and('have.css', 'font-weight', '500') //font bold

      //verify 'Select a Template to start with'
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].TemplateTitleText)
        .should('exist')
        .and('have.text', 'Select a Template to start with')
        .and('have.css', 'font-weight', '700') //font bold

      //verify Default Onboarding Template - default
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].OnboardingTemplate)
        .should('exist')
        .within(()=>{
          //assert the blue circle signify it is selected by default
          cy.get(' > div > div')
            .should('exist')
            .and('have.css', 'background-color', 'rgb(24, 121, 216)') // blue background color
          //assert Onboarding
          cy.get(' > p')
            .should('exist')
            .and('have.text', 'Onboarding')
          //assert img template
          cy.get(' > img')
            .should('exist')
            .should('attr', 'src')
            .should('include', '/assets/tasks-templates/onboarding.png')
        })

      //verify Roadmap Template - disabled
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].RoadmapTemplate)
        .should('exist')

      //verify Recurring Template
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].RecurringTemplate)
        .should('exist')
        .within(()=>{
          //assert the blue circle but transparent by default
          cy.get(' > div > div')
            .should('exist')
            .and('have.css', 'background-color', 'rgba(0, 0, 0, 0)') // expected transparent color
          //assert Onboarding
          cy.get(' > p')
            .should('exist')
            .and('have.text', 'Recurring')
          //assert img template
          cy.get(' > img')
            .should('exist')
            .should('attr', 'src')
            .should('include', '/assets/tasks-templates/recurring.png')
        })

      //verify One Time Template
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].OneTimeTemplate)
        .should('exist')
        .within(()=>{
          //assert the blue circle but transparent by default
          cy.get(' > div > div')
            .should('exist')
            .and('have.css', 'background-color', 'rgba(0, 0, 0, 0)') // expected transparent color
          //assert Onboarding
          cy.get(' > p')
            .should('exist')
            .and('have.text', 'One Time')
          //assert img template
          cy.get(' > img')
            .should('exist')
            .should('attr', 'src')
            .should('include', '/assets/tasks-templates/one-time.png')
        })

      //verify Next button
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].NextButton)
        .should('exist')
        .and('not.be.disabled')
        .and('have.text', 'Next')
        .and('have.css', 'color', 'rgb(255, 255, 255)') //text color
        .and('have.css', 'background-color', 'rgb(30, 58, 138)') //background color
        .and('have.css','border-color', 'rgb(30, 58, 138)')
        .and('have.css', 'border-radius', '9999px')

      /////// TASK LIST CREATION MODAL ELEMENT ASSERTIONS ENDS HERE /////////

      //Click the Next Button
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].NextButton)
        .click()
        .wait(2000)

      //verify the Task List Creation Modal should remain open
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].modal)
        .should('exist')

      //verify the Template title text should be 'Customize your onboardin template' 
      //since we choose the default template which is the Onboarding Template
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].TemplateTitleText)
        .should('exist')
        .and('have.text', 'Customize your onboarding template')
        .and('have.css', 'font-weight', '700') //font bold

      //verify Template Name Label and Input field
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].TemplateNameLabelandInputfield)
        .should('exist')
        .within(()=>{
          //assert Label
          cy.get(' > label')
            .should('exist')
            .and('have.text', 'Template Name*')
            .find('sup').should('have.css', 'color', 'rgb(237, 46, 46)') //asterisk text color
          //assert Input field
          cy.get(' > input[name="name"]')
            .should('exist')
            .and('have.value', '') //empty by default
        })

      //verify Partner Type Label and drop down menu
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].PartnerTypeLabelandDropdownMenu)
        .should('exist')
        .within(()=>{
          //assert Label
          cy.get(' > label')
            .should('exist')
            .and('have.text', 'Partner Type *')
            .find('sup').should('have.css', 'color', 'rgb(237, 46, 46)') //asterisk text color
          //assert drop down menu
          const optionsMenu = [
            'Choose One',
            'New',
            'Existing'
          ];
          cy.get(' > div > select[name="partnerType"] > option').each(($option, index)=>{
            cy.wrap($option)
              .should('exist')
              .and('have.text', optionsMenu[index])
            cy.log(optionsMenu[index])
          });
        })

      //verify Which service category will this be used? * Label and drop down menu
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].WhichServiceCategoryWIllThisBeUsedLabelandDropdownMenu)
        .should('exist')
        .within(()=>{
          //assert Label
          cy.get(' > label')
            .should('exist')
            .and('contain', 'Which service category will this be used?')
            .find('sup').should('have.css', 'color', 'rgb(237, 46, 46)') //asterisk text color
          //assert drop down menu
          const serviceCategoryOptions = [
            'Choose One',
            'Full Account Management',
            'PPC Management',
            'Listing Content Creation',
            'Account Health Management',
            'Account Health Issue',
            'Seller Launch',
            'Account Creation',
            'Amazon Traffic Boost',
            'Advertising Management',
            'Google Advertising',
            'Meta Advertising',
            'SEO Management',
            'Website Content',
            'Mailchimp Management',
            'Website Activation'
          ];
          cy.get(' > select[name="partnerService"] > option').each(($option, index)=>{
            cy.wrap($option)
              .should('exist')
              .and('have.text', serviceCategoryOptions[index])
            cy.log(serviceCategoryOptions[index])
          });
        })

      //verify Back Button
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].BackButton)
        .should('exist')
        .and('not.be.disabled')
        .and('have.text', 'Back')
        .and('have.css', 'color', 'rgb(107, 114, 128)') //text color
        .and('have.css', 'background-color', 'rgb(255, 255, 255)') 
        .and('have.css', 'border-color', 'rgb(107, 114, 128)')
        .and('have.css', 'border-radius', '9999px')

      //verify Create Button
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].CreateButton)
        .should('exist')
        .and('not.be.disabled')
        .and('have.text', 'Create')
        .and('have.css', 'color', 'rgb(255, 255, 255)') //text color
        .and('have.css', 'background-color', 'rgb(0, 47, 93)') 
        .and('have.css', 'border-color', 'rgb(30, 58, 138)')
        .and('have.css', 'border-radius', '9999px')

      //////// REQUIRED ASSERTIONS STARTS HERE ///////////

      //Without enter Template Name data, or selecting Partner Type and Service Category
      //click the Create Button
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].CreateButton)
        .click()
        .wait(2000)

      //verify Task List Creation Modal remains open
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].modal)
        .should('exist')

      //verify Error Text 1 - Template name is required
      cy.get('form > div > div:nth-child(1) > div')
        .should('exist')
        .and('have.text', 'Template name is required')
        .and('have.css', 'color', 'rgb(185, 28, 28)') //text color

      //verify Error Text 2 - Partner type is required
      cy.get('form > div > div:nth-child(2) > div > div')
        .should('exist')
        .and('have.text', 'Partner type is required')
        .and('have.css', 'color', 'rgb(185, 28, 28)') //text color

      //verify Error Text 3 - Service category is required
      cy.get('form > div > div:nth-child(3) > div')
        .should('exist')
        .and('have.text', 'Service category is required')
        .and('have.css', 'color', 'rgb(185, 28, 28)') //text color

      //Now Enter Template Name
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].TemplateNameLabelandInputfield)
        .find(' > input[name="name"]')
        .clear()
        .type('Test New Onboarding Template')
        .wait(600)
        .should('have.value', 'Test New Onboarding Template')

      //verify Error Text 1 - should not be visible
      cy.get('form > div > div:nth-child(1) > div')
        .should('not.exist')

      //verify Error Text 2 - Partner type is required
      cy.get('form > div > div:nth-child(2) > div > div')
        .should('exist')
        .and('have.text', 'Partner type is required')
        .and('have.css', 'color', 'rgb(185, 28, 28)') //text color

      //verify Error Text 3 - Service category is required
      cy.get('form > div > div:nth-child(3) > div')
        .should('exist')
        .and('have.text', 'Service category is required')
        .and('have.css', 'color', 'rgb(185, 28, 28)') //text color

      //Select New in Partner Type
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].PartnerTypeLabelandDropdownMenu)
        .find(' > div > select[name="partnerType"]')
        .select('new')
        .wait(600)

      //verify that the selected option goes on top
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].PartnerTypeLabelandDropdownMenu)
        .find('select option:selected')
        .should('have.text', 'New')

      //verify Error Text 2 - should not be visible
      cy.get('form > div > div:nth-child(2) > div > div')
        .should('not.exist')

      //verify Error Text 3 - Service category is required
      cy.get('form > div > div:nth-child(3) > div')
        .should('exist')
        .and('have.text', 'Service category is required')
        .and('have.css', 'color', 'rgb(185, 28, 28)') //text color

      //Select Service Category Full Account Management
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].WhichServiceCategoryWIllThisBeUsedLabelandDropdownMenu)
        .find(' > select[name="partnerService"]')
        .select('Full Account Management')
        .wait(600)

      //verify the selected service category goes on top
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].WhichServiceCategoryWIllThisBeUsedLabelandDropdownMenu)
        .find('select option:selected')
        .should('have.text', 'Full Account Management')

      //verify Error Text 3 - should not be visible
      cy.get('form > div > div:nth-child(3) > div')
        .should('not.exist')

      ///////// REQUIRED ASSERTIONS ENDS HERE ///////////

      //Click Create Button
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].CreateButton)
        .click()
        .wait(2000)

      //verify alert-success modal popup
      cy.get('div.overflow-y-auto > div.min-h-full')
        .should('exist')
        .within(()=>{
          //assert check logo
          cy.get(' > div > div > svg')
            .should('exist')
            .and('have.css', 'color', 'rgb(0, 150, 109)') //check color
          //assert message
          cy.get(' > div > div')
            .should('exist')
            .and('have.text', 'Template has been created.')
            .and('have.css', 'color', 'rgb(0, 150, 109)') //text color
            .and('have.css', 'font-weight', '400')  //font bold
        })

      //then simulate pressing esc key in your keyboard
      cy.get('body').type('{esc}');
      cy.wait(3000)
        
      //////// TASK MANAGEMENT > NEW > ONBOARDING TABLE LIST ASSERTIONS STARTS HERE ////////////

      //verify first column Names
      const columnNames = [
        'Template Name',
        'Partner Type',
        'Service Type',
        'Last Updated',
        'Updated By',
        'Action'
      ];
      cy.get('table > thead > tr > th').each(($column, index)=>{
        cy.wrap($column)
          .should('exist')
          .and('have.text',columnNames[index])
        cy.log(columnNames[index])
      })

      //Then verify row 1 each column
      cy.get('table > tbody > tr:first-child').within(()=>{
        //assert Template Name
        TaskManagementTableList.assertColumn1TemplateName(' > td:nth-child(1) > a', 'Test New Onboarding Template')
        //I will get the href link for later assertion
        GETHREF = new Promise((resolve)=>{
          cy.get(' > td:nth-child(1) > a')
            .then(($element)=>{
              // Get the href attribute
              templatehref = $element.attr('href');
              resolve();
            })
        })
        //assert Partner Type
        TaskManagementTableList.assertColumn2PartnerType(' > td:nth-child(2)', 'new')
        //assert Service Type
        TaskManagementTableList.assertColumn3ServiceType(' > td:nth-child(3)', 'Full Account Management')
        //assert Last Updated
        TaskManagementTableList.assertColumn4LastUpdated(' > td:nth-child(4)', DateTodayIs.TodayDateMMDDYYYY_MonthisinWholeWordandDayiswithTH())
        //assert Updated By
        TaskManagementTableList.assertColumn5UpdatedBy(' > td:nth-child(5) > div', 'LP', 'Logan Paul')
        //aasert Action:Edit
        TaskManagementTableList.assertColumn6Action(' > td:nth-child(6) > a', 'not.be.disabled', 'Edit')
      })

      //////// TASK MANAGEMENT > NEW > ONBOARDING TABLE LIST ASSERTIONS ENDS HERE ////////////
        
      //CLick the Action Edit button
      cy.get('table > tbody > tr:first-child > td:nth-child(6) > a')
        .click()
        .wait(3000)

      //verify url expected destination
      cy.get('body').then(()=>{
        GETHREF.then(()=>{
          cy.url().should('contain', templatehref)
        })
      })

      //Template Name as Title page
      cy.get('div > h3')
        .should('exist')
        .and('have.text', 'Test New Onboarding Template')
        .and('have.css', 'font-weight', '700') //font bold

      //verify Update Button
      cy.get('form > div:nth-child(2) > button')
        .should('exist')
        .and('not.be.disabled')
        .and('have.text', 'Update')
        .and('have.css', 'font-weight', '700') //font bold
        .and('have.css', 'color', 'rgb(250, 250, 250)') //text color
        .and('have.css', 'background-color', 'rgb(0, 47, 93)') // background color
        .and('have.css', 'border-radius', '9999px')

      //verify Settings
      cy.get('form > div:nth-child(3) > div')
        .should('exist')
        .within(()=>{
          //assert Label
          cy.get(' > span')
            .should('exist')
            .and('have.text', 'Settings')
            .and('have.css', 'font-weight', '700') //font bold
          //assert the '>' symbol
          cy.get(' > svg')
            .should('exist')
            .and('have.css', 'color', 'rgb(148, 148, 148)') //text color
        })

      //verify Tasks Title and Add button
      cy.get('div.main-content-inner2 > div > div.space-y-8 > div:nth-child(1)')
        .should('exist')
        .within(()=>{
          //assert Tasks title
          cy.get(' > h4')
            .should('exist')
            .and('have.text', 'Tasks')
            .and('have.css', 'font-weight', '700') //font bold
          //assert Add button
          cy.get(' > button')
            .should('exist')
            .and('not.be.disabled')
            .and('have.text', 'Add')
            .and('have.css', 'color', 'rgb(0, 47, 93)') //text color
            .and('have.css', 'border-color', 'rgb(0, 47, 93)')
            .and('have.css', 'border-radius', '40px')
        })

      //verify Onboarding Tasks
      cy.get('div.space-y-8 > div:nth-child(2) > div > div > div')
        .should('exist')
        .within(()=>{
          //assert button
          cy.get(' > div > svg')
            .should('exist')
          //assert Onboarding tasks title
          cy.get(' > p > span')
            .should('exist')
            .and('have.text', 'Onboarding tasks')
            .and('have.css', 'font-weight', '700') //font bold
        })

      //Now if I click the Settings, there will be additional elements that should be visible
      cy.get('form > div:nth-child(3) > div')
        .should('have.attr', 'aria-expanded', 'false')
        .click()
        .wait(600)
        .should('have.attr', 'aria-expanded', 'true')

      //verify the additional elements are visible
      cy.get('div.pb-6 > div')
        .should('exist')
        .within(()=>{
          //assert Template Name Label and Input field
          cy.get(' > div:nth-child(1)')
            .should('exist')
            .within(()=>{
              //assert Template Name label
              cy.get(' > label')
                .should('exist')
                .and('have.text', 'Template Name*')
                .find('sup').should('have.css', 'color', 'rgb(237, 46, 46)') //asterisk text color
              //assert Input field
              cy.get(' > input[name="name"]')
                .should('exist')
                .and('not.be.disabled')
                .and('have.value', 'Test New Onboarding Template')
            })
          //assert Template Type Label and drop down menu with the selected on top
          cy.get(' > div:nth-child(2)')
            .should('exist')
            .within(()=>{
              //assert Template Name Label
              cy.get(' > label')
                .should('exist')
                .and('have.text', 'Template Type*')
                .find('sup').should('have.css', 'color', 'rgb(237, 46, 46)') //asterisk text color
              //assert the drop down menu with the already selected on top
              cy.get(' > select[name="type"]')
                .should('exist')
                .and('not.be.disabled')
              const typeOption = [
                'Choose One',
                'Onboarding',
                'Roadmap',
                'Recurring',
                'One Time'
              ]
              cy.get(' > select[name="type"] > option').each(($option, index)=>{
                cy.wrap($option)
                  .should('exist')
                  .and('have.text', typeOption[index])
                cy.log(typeOption[index])
              })
            })
          //assert Partner Type Label and drop down menu
          cy.get(' > div:nth-child(3)')
            .should('exist')
            .within(()=>{
              //assert Partner Type Label
              cy.get(' > label')
                .should('exist')
                .and('have.text', 'Partner Type *')
                .find('sup').should('have.css', 'color', 'rgb(237, 46, 46)') //asterisk text color
              const partnertypeOption = [
                'Choose One',
                'New',
                'Existing'
              ]
              cy.get(' > div > select[name="partnerType"] > option').each(($option, index)=>{
                cy.wrap($option)
                  .should('exist')
                  .and('have.text', partnertypeOption[index])
                cy.log(partnertypeOption[index])
              })
            })
          //assert Service Category Label and drop down menu
          cy.get(' > div:nth-child(4)')
            .should('exist')
            .within(()=>{
              //assert Service Category Label
              cy.get(' > label')
                .should('exist')
                .and('have.text', 'Service Category*')
                .find('sup').should('have.css', 'color', 'rgb(237, 46, 46)') //asterisk text color
              //assert drop down menu
              cy.get(' > select[name="partnerService"]')
                .should('exist')
                .and('not.be.disabled')
              const serviceOption = [
                'Choose One',
                'Full Account Management',
                'PPC Management',
                'Listing Content Creation',
                'Account Health Management',
                'Account Health Issue',
                'Seller Launch',
                'Account Creation',
                'Amazon Traffic Boost',
                'Advertising Management',
                'Google Advertising',
                'Meta Advertising',
                'SEO Management',
                'Website Content',
                'Mailchimp Management',
                'Website Activation'
              ]
              cy.get(' > select[name="partnerService"] > option').each(($option, index)=>{
                cy.wrap($option)
                  .should('exist')
                  .and('have.text', serviceOption[index])
                cy.log(serviceOption[index])
              })
            })
        })

      //Now if I will click the settings once again, these set of elements should not be visible
      cy.get('form > div:nth-child(3) > div > svg')
        .click()
        .wait(2000)
      //assert that the elements such as Template Name, Template Type, Partner Type, and Service Category are not visible
      cy.get('form > div:nth-child(3) > div')
        .should('have.attr', 'aria-expanded', 'false')

      //the group of element should not exist such as Template Name, Template Type, Partner Type, and Service Category
      cy.get('div.pb-6 > div')
        .should('not.exist')

      //Click the Tasks Add button, should reveal additional elements
      cy.get('div.main-content-inner2 > div > div.space-y-8 > div:nth-child(1)')
        .find(' > button')
        .click()
        .wait(2000)

      //verify there would be Enter Task Name input field
      cy.get('input[name="title"]')
        .should('exist')
        .and('not.be.disabled')
        .and('have.value', '') //empty by default
        .and('have.attr', 'placeholder', 'Enter task name')
      //verify there would be Enter task description input field
      cy.get('input[name="description"]')
        .should('exist')
        .and('not.be.disabled')
        .and('have.value', '') //empty by default
        .and('have.attr', 'placeholder', 'Enter task description')
      //verify there would be submit/check/save button icon
      cy.get('div.grid > div > button:nth-child(1)')
        .should('exist')
        .and('not.be.disabled')
        .and('have.css', 'background-color', 'rgb(0, 47, 93)') //background color
        .and('have.css', 'border-radius', '10px')
      //verify there would be delete button icon
      cy.get('div.grid > div > button:nth-child(2)')
        .should('exist')
        .and('not.be.disabled')
        .and('have.css', 'border-color', 'rgb(148, 148, 148)') //background color
        .and('have.css', 'border-radius', '10px')

      //Then if I am going to click the delete icon, the Enter Task Name, Enter Task Description, 
      //input fields and the check button including delete icon will not be visible
      cy.get('div.grid > div > button:nth-child(2)')
        .click()
        .wait(3000)

      //verify Enter Task Name input field should not be visible'
      cy.get('input[name="title"]')
        .should('not.exist')
      //verify Enter Task description input field should not be visible
      cy.get('input[name="description"]')
        .should('not.exist')
      //verify there would be delete button icon
      cy.get('div.grid > div > button:nth-child(2)')
        .should('not.exist')

      //Click the '>' Onboarding tasks
      cy.get('div.space-y-8 > div:nth-child(2) > div > div > div')
        .find(' > div > svg')
        .click()
        .wait(3000)

      //verify there would be Description column name
      cy.get('div.font-inter > p:nth-child(2)')
        .should('exist')
        .and('have.text', 'Description')
      //verify there would be Actions column name
      cy.get('div.font-inter > p:nth-child(3)')
        .should('exist')
        .and('have.text', 'Actions')
      //verify No Items
      cy.get('div.space-y-8 > div > div.bg-white > p')
        .should('exist')
        .and('have.text', 'No Items')
    
      //Now if I am going to click again the '>' Onboarding tasks, Description, Actions, and No Items should not be visible
      cy.get('div.space-y-8 > div:nth-child(2) > div > div > div')
        .find(' > div > svg')
        .click()
        .wait(3000)

      //verify there would be Description column name - should not be visible
      cy.get('div.font-inter > p:nth-child(2)')
        .should('not.exist')
      //verify there would be Actions column name - should not be visible
      cy.get('div.font-inter > p:nth-child(3)')
        .should('not.exist')
      //verify No Items - should not be visible 
      cy.get('div.space-y-8 > div > div.bg-white > p')
        .should('not.exist')
      
    })
    it("Testcase ID: CATM0002 - Create Task Management Recurring Template for New Onboarded client",()=>{

      let GETHREF;
      let templatehref;

      //Login using account specialist
      cy.userlogin(loginmodule.EmailAddressInputfield, loginmodule.PasswordInputfield, loginmodule.SigninButton, testdata.userAccounts[0].accountspecialist1, testdata.userAccounts[0].accountspecialistandprojectmanagerpassword)

      //Click the Admin Navigation Module
      cy.get(modulebutton.AdminModuleButton)
        .click()
        .wait(2000)
        
      //Click the Task Management link text folder
      cy.get(linktextfolder.AdminModule[0].TaskManagement)
        .click()
        .wait(2000)
        
      //verify Page Title 'Task Management'
      cy.get(adminmodulelocator.TaskManageementFolder[0].pageTitle)
        .should('exist')
        .and('have.text', 'Task Management')
        .and('have.css', 'font-weight', '700') //font bold
        .and('have.css', 'font-size', '25px')

      //verify Add button - if found click
      cy.get(adminmodulelocator.TaskManageementFolder[0].AddButton)
        .should('exist')
        .and('not.be.disabled')
        .and('have.text', 'Add')
        .and('have.css', 'color', 'rgb(0, 47, 93)') //text color
        .and('have.css', 'border-color', 'rgb(0, 47, 93)')
        .and('have.css', 'border-radius', '40px')
        .click()
        .wait(2000)

      //verify Task List Creation Modal popup open
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].modal)
        .should('exist')

      //Select Recurring Template
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].RecurringTemplate)
        .click()
        .wait(1000)
        .should('have.css', 'border-color', 'rgb(24, 121, 216)') // the entire recurring template has blue border color signify it is seleected
        .find(' > div > div').should('have.css', 'background-color', 'rgb(24, 121, 216)') //blue dot signify it is selected
    
      //Click the Next Button
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].NextButton)
        .click()
        .wait(2000)

      //verify the Task List Creation Modal should remain open
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].modal)
        .should('exist')

      //verify the Template title text should be 'Customize your recurring template' 
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].TemplateTitleText)
        .should('exist')
        .and('have.text', 'Customize your recurring template')
        .and('have.css', 'font-weight', '700') //font bold
   
      //verify Template Name Label and Input field
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].TemplateNameLabelandInputfield)
        .should('exist')
        .within(()=>{
          //assert Label
          cy.get(' > label')
            .should('exist')
            .and('have.text', 'Template Name*')
            .find('sup').should('have.css', 'color', 'rgb(237, 46, 46)') //asterisk text color
          //assert Input field
          cy.get(' > input[name="name"]')
            .should('exist')
            .and('have.value', '') //empty by default
        })

      //verify Partner Type Label and drop down menu
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].PartnerTypeLabelandDropdownMenu)
        .should('exist')
        .within(()=>{
          //assert Label
          cy.get(' > label')
            .should('exist')
            .and('have.text', 'Partner Type *')
            .find('sup').should('have.css', 'color', 'rgb(237, 46, 46)') //asterisk text color
          //assert drop down menu
          const optionsMenu = [
            'Choose One',
            'New',
            'Existing'
          ];
          cy.get(' > div > select[name="partnerType"] > option').each(($option, index)=>{
            cy.wrap($option)
              .should('exist')
              .and('have.text', optionsMenu[index])
            cy.log(optionsMenu[index])
          });
        })

      //verify Which service category will this be used? * Label and drop down menu
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].WhichServiceCategoryWIllThisBeUsedLabelandDropdownMenu)
        .should('exist')
        .within(()=>{
          //assert Label
          cy.get(' > label')
            .should('exist')
            .and('contain', 'Which service category will this be used?')
            .find('sup').should('have.css', 'color', 'rgb(237, 46, 46)') //asterisk text color
          //assert drop down menu
          const serviceCategoryOptions = [
            'Choose One',
            'Full Account Management',
            'PPC Management',
            'Listing Content Creation',
            'Account Health Management',
            'Account Health Issue',
            'Seller Launch',
            'Account Creation',
            'Amazon Traffic Boost',
            'Advertising Management',
            'Google Advertising',
            'Meta Advertising',
            'SEO Management',
            'Website Content',
            'Mailchimp Management',
            'Website Activation'
          ];
          cy.get(' > select[name="partnerService"] > option').each(($option, index)=>{
            cy.wrap($option)
              .should('exist')
              .and('have.text', serviceCategoryOptions[index])
            cy.log(serviceCategoryOptions[index])
          });
        })

      //verify Back Button
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].BackButton)
        .should('exist')
        .and('not.be.disabled')
        .and('have.text', 'Back')
        .and('have.css', 'color', 'rgb(107, 114, 128)') //text color
        .and('have.css', 'background-color', 'rgb(255, 255, 255)') 
        .and('have.css', 'border-color', 'rgb(107, 114, 128)')
        .and('have.css', 'border-radius', '9999px')

      //verify Create Button
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].CreateButton)
        .should('exist')
        .and('not.be.disabled')
        .and('have.text', 'Create')
        .and('have.css', 'color', 'rgb(255, 255, 255)') //text color
        .and('have.css', 'background-color', 'rgb(0, 47, 93)') 
        .and('have.css', 'border-color', 'rgb(30, 58, 138)')
        .and('have.css', 'border-radius', '9999px')

      //////// CREATE NEW RECURRING TASKS STARTS HERE ///////////

      //Now Enter Template Name
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].TemplateNameLabelandInputfield)
        .find(' > input[name="name"]')
        .clear()
        .type('Test New Recurring Template')
        .wait(600)
        .should('have.value', 'Test New Recurring Template')

      //Select New in Partner Type
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].PartnerTypeLabelandDropdownMenu)
        .find(' > div > select[name="partnerType"]')
        .select('new')
        .wait(600)

      //verify that the selected option goes on top
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].PartnerTypeLabelandDropdownMenu)
        .find('select option:selected')
        .should('have.text', 'New')

      //Select Service Category Full Account Management
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].WhichServiceCategoryWIllThisBeUsedLabelandDropdownMenu)
        .find(' > select[name="partnerService"]')
        .select('Full Account Management')
        .wait(600)

      //verify the selected service category goes on top
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].WhichServiceCategoryWIllThisBeUsedLabelandDropdownMenu)
        .find('select option:selected')
        .should('have.text', 'Full Account Management')

      ///////// CREATE NEW RECURRING TASKS ENDS HERE ///////////
      
      //Click Create Button
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].CreateButton)
        .click()
        .wait(2000) 

      //verify alert-success modal popup
      cy.get('div.overflow-y-auto > div.min-h-full')
        .should('exist')
        .within(()=>{
          //assert check logo
          cy.get(' > div > div > svg')
            .should('exist')
            .and('have.css', 'color', 'rgb(0, 150, 109)') //check color
          //assert message
          cy.get(' > div > div')
            .should('exist')
            .and('have.text', 'Template has been created.')
            .and('have.css', 'color', 'rgb(0, 150, 109)') //text color
            .and('have.css', 'font-weight', '400')  //font bold
        })

      //then simulate pressing esc key in your keyboard
      cy.get('body').type('{esc}');
      cy.wait(3000)
        
      //Go to New > Recurring Tab
      //verify Recurring Tab and click when found
      cy.get(adminmodulelocator.TaskManageementFolder[0].pageSubTab[0].RecurringTab)
        .click()
        .wait(3000)

      //verify expected url destination
      cy.url().should('contain', 'recurring')
        
      //////// TASK MANAGEMENT > NEW > ONBOARDING TABLE LIST ASSERTIONS STARTS HERE ////////////

      //verify first column Names
      const columnNames = [
        'Template Name',
        'Partner Type',
        'Service Type',
        'Last Updated',
        'Updated By',
        'Action'
      ];
      cy.get('table > thead > tr > th').each(($column, index)=>{
        cy.wrap($column)
          .should('exist')
          .and('have.text',columnNames[index])
        cy.log(columnNames[index])
      })
      
      //Then verify row 1 each column
      cy.get('table > tbody > tr:first-child').within(()=>{
        //assert Template Name
        TaskManagementTableList.assertColumn1TemplateName(' > td:nth-child(1) > a', 'Test New Recurring Template')
        //I will get the href link for later assertion
        GETHREF = new Promise((resolve)=>{
          cy.get(' > td:nth-child(1) > a')
            .then(($element)=>{
              // Get the href attribute
              templatehref = $element.attr('href');
              resolve();
            })
        })
        //assert Partner Type
        TaskManagementTableList.assertColumn2PartnerType(' > td:nth-child(2)', 'new')
        //assert Service Type
        TaskManagementTableList.assertColumn3ServiceType(' > td:nth-child(3)', 'Full Account Management')
        //assert Last Updated
        TaskManagementTableList.assertColumn4LastUpdated(' > td:nth-child(4)', DateTodayIs.TodayDateMMDDYYYY_MonthisinWholeWordandDayiswithTH())
        //assert Updated By
        TaskManagementTableList.assertColumn5UpdatedBy(' > td:nth-child(5) > div', 'LP', 'Logan Paul')
        //aasert Action:Edit
        TaskManagementTableList.assertColumn6Action(' > td:nth-child(6) > a', 'not.be.disabled', 'Edit') 
      }) 

      //////// TASK MANAGEMENT > NEW > ONBOARDING TABLE LIST ASSERTIONS ENDS HERE ////////////
        
      //Click the Edit button
      cy.get('table > tbody > tr:first-child > td:nth-child(6) > a')
        .click()
        .wait(3000)

      //verify url expected destination
      cy.get('body').then(()=>{
        GETHREF.then(()=>{
          cy.url().should('contain', templatehref)
        })
      })

      //Template Name as Title page
      cy.get('div > h3')
        .should('exist')
        .and('have.text', 'Test New Recurring Template')
        .and('have.css', 'font-weight', '700') //font bold

      //verify Update Button
      cy.get('form > div:nth-child(2) > button')
        .should('exist')
        .and('not.be.disabled')
        .and('have.text', 'Update')
        .and('have.css', 'font-weight', '700') //font bold
        .and('have.css', 'color', 'rgb(250, 250, 250)') //text color
        .and('have.css', 'background-color', 'rgb(0, 47, 93)') // background color
        .and('have.css', 'border-radius', '9999px')

      //verify Settings
      cy.get('form > div:nth-child(3) > div')
        .should('exist')
        .within(()=>{
          //assert Label
          cy.get(' > span')
            .should('exist')
            .and('have.text', 'Settings')
            .and('have.css', 'font-weight', '700') //font bold
          //assert the '>' symbol
          cy.get(' > svg')
            .should('exist')
            .and('have.css', 'color', 'rgb(148, 148, 148)') //text color
        })

      //Click the Settings
      cy.get('form > div:nth-child(3) > div')
        .click()
        .wait(1000)
        .should('have.attr', 'aria-expanded', 'true')

      //verify Additional elements emerged
      cy.get('div.pb-6 > div')
        .should('exist')
        .within(()=>{
          //assert Template Name Label and Input field
          cy.get(' > div:nth-child(1)')
            .should('exist')
            .within(()=>{
              //assert Template Name label
              cy.get(' > label')
                .should('exist')
                .and('have.text', 'Template Name*')
                .find('sup').should('have.css', 'color', 'rgb(237, 46, 46)') //asterisk text color
              //assert Input field
              cy.get(' > input[name="name"]')
                .should('exist')
                .and('not.be.disabled')
                .and('have.value', 'Test New Recurring Template')
            })
          //assert Template Type Label and drop down menu with the selected on top
          cy.get(' > div:nth-child(2)')
            .should('exist')
            .within(()=>{
              //assert Template Name Label
              cy.get(' > label')
                .should('exist')
                .and('have.text', 'Template Type*')
                .find('sup').should('have.css', 'color', 'rgb(237, 46, 46)') //asterisk text color
              //assert the drop down menu with the already selected on top
              cy.get(' > select[name="type"]')
                .should('exist')
                .and('not.be.disabled')
              const typeOption = [
                'Choose One',
                'Onboarding',
                'Roadmap',
                'Recurring',
                'One Time'
              ]
              cy.get(' > select[name="type"] > option').each(($option, index)=>{
                cy.wrap($option)
                  .should('exist')
                  .and('have.text', typeOption[index])
                cy.log(typeOption[index])
              })
            })
          //assert Partner Type Label and drop down menu
          cy.get(' > div:nth-child(3)')
            .should('exist')
            .within(()=>{
              //assert Partner Type Label
              cy.get(' > label')
                .should('exist')
                .and('have.text', 'Partner Type *')
                .find('sup').should('have.css', 'color', 'rgb(237, 46, 46)') //asterisk text color
              const partnertypeOption = [
                'Choose One',
                'New',
                'Existing'
              ]
              cy.get(' > div > select[name="partnerType"] > option').each(($option, index)=>{
                cy.wrap($option)
                  .should('exist')
                  .and('have.text', partnertypeOption[index])
                cy.log(partnertypeOption[index])
              })
            })
          //assert Service Category Label and drop down menu
          cy.get(' > div:nth-child(4)')
            .should('exist')
            .within(()=>{
              //assert Service Category Label
              cy.get(' > label')
                .should('exist')
                .and('have.text', 'Service Category*')
                .find('sup').should('have.css', 'color', 'rgb(237, 46, 46)') //asterisk text color
              //assert drop down menu
              cy.get(' > select[name="partnerService"]')
                .should('exist')
                .and('not.be.disabled')
              const serviceOption = [
                'Choose One',
                'Full Account Management',
                'PPC Management',
                'Listing Content Creation',
                'Account Health Management',
                'Account Health Issue',
                'Seller Launch',
                'Account Creation',
                'Amazon Traffic Boost',
                'Advertising Management',
                'Google Advertising',
                'Meta Advertising',
                'SEO Management',
                'Website Content',
                'Mailchimp Management',
                'Website Activation'
              ]
              cy.get(' > select[name="partnerService"] > option').each(($option, index)=>{
                cy.wrap($option)
                  .should('exist')
                  .and('have.text', serviceOption[index])
                cy.log(serviceOption[index])
              })
            })
        })

      //Click again the settings and the group elements should not be visible such as Template Name, Template Type, Partner Type, and Select Category Type
      cy.get('form > div:nth-child(3) > div > svg')
        .click()
        .wait(1000)
      cy.get('form > div:nth-child(3) > div')
        .should('have.attr', 'aria-expanded', 'false')

      //the main group element should not be visible
      cy.get('div.pb-6 > div')
        .should('not.exist')

      //verify Tasks Title and Add button
      cy.get('div.main-content-inner2 > div > div.space-y-8 > div:nth-child(1)')
        .should('exist')
        .within(()=>{
          //assert Tasks title
          cy.get(' > h4')
            .should('exist')
            .and('have.text', 'Tasks')
            .and('have.css', 'font-weight', '700') //font bold
          //assert Add button
          cy.get(' > button')
            .should('exist')
            .and('not.be.disabled')
            .and('have.text', 'Add')
            .and('have.css', 'color', 'rgb(0, 47, 93)') //text color
            .and('have.css', 'border-color', 'rgb(0, 47, 93)')
            .and('have.css', 'border-radius', '40px')
        })

      //Click the Tasks Add button
      cy.get('div.main-content-inner2 > div > div.space-y-8 > div:nth-child(1)')
        .find(' > button')
        .click()
        .wait(1000)

      //verify there would be Enter Task Name input field
      cy.get('input[name="title"]')
        .should('exist')
        .and('not.be.disabled')
        .and('have.value', '') //empty by default
        .and('have.attr', 'placeholder', 'Enter task name')
      //verify there would be Enter task description input field
      cy.get('input[name="description"]')
        .should('exist')
        .and('not.be.disabled')
        .and('have.value', '') //empty by default
        .and('have.attr', 'placeholder', 'Enter task description')
      //verify Recurring Button
      cy.get('form > div > div > div:nth-child(3)')
        .should('exist')
        .within(()=>{
          //assert Button
          cy.get(' > div > button')
            .should('exist')
            .and('not.be.disabled')
            .find(' > label').should('have.text', 'Recurring')
        })
      //verify Select Department Dropdown menu
      cy.get('select[name="department"]')
        .should('exist')
        .and('not.be.disabled')
        const departmentOptions = [
          ' Select Department',
          'SI-Operations',
          'SI-PPC',
          'SI-Writing',
          'SI-Design',
          'SI-Admin',
          'Billing',
          'Sales',
          'Lead Generation'
        ]
        cy.get('select[name="department"] > option').each(($option, index)=>{
          cy.wrap($option)
            .should('exist')
            .and('have.text', departmentOptions[index])
          cy.log(departmentOptions[index])
        })
      //verify there would be submit/check/save button icon
      cy.get('div.grid > div > button:nth-child(1)')
        .should('exist')
        .and('not.be.disabled')
        .and('have.css', 'background-color', 'rgb(0, 47, 93)') //background color
        .and('have.css', 'border-radius', '10px')
      //verify there would be delete button icon
      cy.get('div.grid > div > button:nth-child(2)')
        .should('exist')
        .and('not.be.disabled')
        .and('have.css', 'border-color', 'rgb(148, 148, 148)') //background color
        .and('have.css', 'border-radius', '10px')

      //Click again the delete icon and it would not be visible the Enter Task Name, Enter Task Description, Recurring button, and Department drop down menu
      cy.get('div.grid > div > button:nth-child(2)')
        .click()
        .wait(1000)

      //verify there would be Enter Task Name input field - should not be visible
      cy.get('input[name="title"]')
        .should('not.exist')
      //verify Select Department Dropdown menu - should not be visible
      cy.get('select[name="department"]')
        .should('not.exist')
      //verify Recurring Button - should not be visible
      cy.get('form > div > div > div:nth-child(3)')
        .should('not.exist')
      //verify Select Department Dropdown menu - should not be visible
      cy.get('select[name="department"]')
        .should('not.exist')
      //verify there would be submit/check/save button icon - should not be visible
      cy.get('div.grid > div > button:nth-child(1)')
        .should('not.exist')
      //verify there would be delete button icon - should not be visible
      cy.get('div.grid > div > button:nth-child(2)')
        .should('not.exist')

      ////////// SI-OPERATIONS ASSERTIONS STARTS HERE /////////////

      //verify SI-Operations
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(1)')
        .should('exist')
        .within(()=>{
          //assert the button left beside the SI-Operations Title
          cy.get(' > div > div > div')
            .should('exist')
            .and('not.be.disabled')
          //assert SI-Operations title
          cy.get(' > div > div > p > span')
            .should('exist')
            .and('have.text', 'SI-Operations')
            .and('have.css', 'font-weight', '700') //font bold
        })

      //Now I click the SI-Operations - it should reveal additional within elements
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(1)')
        .click()
        .wait(1000)
        .within(()=>{
          //assert Description, Recurring, Department, and Actions column names
          const operationcolNames = [
            'Description',
            'Recurring',
            'Department',
            'Actions'
          ]
          cy.get(' > div:nth-child(1) > p').each(($option, index)=>{
            cy.wrap($option)
              .should('exist')
              .and('have.text', operationcolNames[index])
            cy.log(operationcolNames[index])
          })
          //assert No Items
          cy.get(' > div:nth-child(2) > p')
            .should('exist')
            .and('have.text', 'No Items')
        })
      
      //Click again the SI-Operations - it should hide the additional elements within
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(1)')
        .find(' > div > div > div')
        .click()
        .wait(1000)
        
      //verify Description column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(1) > div:nth-child(1) > p:nth-child(2)')
        .should('not.exist')
      //verify Recurring column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(1) > div:nth-child(1) > p:nth-child(3)')
        .should('not.exist')
      //verify Department column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(1) > div:nth-child(1) > p:nth-child(4)')
        .should('not.exist')
      //verify Action column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(1) > div:nth-child(1) > p:nth-child(5)')
        .should('not.exist')
      //verify No Items should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(1) > div:nth-child(2) > p')
        .should('not.exist')

      ////////// SI-OPERATIONS ASSERTIONS ENDS HERE /////////////  

      ////////// SI-PPC ASSERTIONS STARTS HERE /////////////

      //verify SI-PPC
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(2)')
        .should('exist')
        .within(()=>{
          //assert the button left beside the SI-PPC Title
          cy.get(' > div > div > div')
            .should('exist')
            .and('not.be.disabled')
          //assert SI-PPC title
          cy.get(' > div > div > p > span')
            .should('exist')
            .and('have.text', 'SI-PPC')
            .and('have.css', 'font-weight', '700') //font bold
        })

      //Click the SI-PPC - it should reveal additional within element
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(2)')
        .click()
        .wait(1000)
        .within(()=>{
          //assert Description, Recurring, Department, and Actions column names
          const operationcolNames = [
            'Description',
            'Recurring',
            'Department',
            'Actions'
          ]
          cy.get(' > div:nth-child(1) > p').each(($option, index)=>{
            cy.wrap($option)
              .should('exist')
              .and('have.text', operationcolNames[index])
            cy.log(operationcolNames[index])
          })
          //assert No Items
          cy.get(' > div:nth-child(2) > p')
            .should('exist')
            .and('have.text', 'No Items')
          //assert No Items
          cy.get(' > div:nth-child(2) > p')
            .should('exist')
            .and('have.text', 'No Items')
        })

      //Then click again the SI-PPC - it should hide the additional elements within
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(2)')
        .find(' > div > div > div')
        .click()
        .wait(1000)

      //verify Description column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(2) > div:nth-child(1) > p:nth-child(2)')
        .should('not.exist')
      //verify Recurring column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(2) > div:nth-child(1) > p:nth-child(3)')
        .should('not.exist')
      //verify Department column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(2) > div:nth-child(1) > p:nth-child(4)')
        .should('not.exist')
      //verify Action column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(2) > div:nth-child(1) > p:nth-child(5)')
        .should('not.exist')
      //verify No Items should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(2) > div:nth-child(2) > p')
        .should('not.exist')

      ////////// SI-PPC ASSERTIONS ENDS HERE /////////////

      ////////// SI-Writing ASSERTIONS STARTS HERE /////////////

      //verify SI-Writing
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3)')
        .should('exist')
        .within(()=>{
          //assert the button left beside the SI-PPC Title
          cy.get(' > div > div > div')
            .should('exist')
            .and('not.be.disabled')
          //assert SI-PPC title
          cy.get(' > div > div > p > span')
            .should('exist')
            .and('have.text', 'SI-Writing')
            .and('have.css', 'font-weight', '700') //font bold
        })

      //Click SI-Writing - it should reveal additional within element
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3)')
        .click()
        .wait(1000)
        .within(()=>{
          //assert Description, Recurring, Department, and Actions column names
          const operationcolNames = [
            'Description',
            'Recurring',
            'Department',
            'Actions'
          ]
          cy.get(' > div:nth-child(1) > p').each(($option, index)=>{
            cy.wrap($option)
              .should('exist')
              .and('have.text', operationcolNames[index])
            cy.log(operationcolNames[index])
          })
          //assert No Items
          cy.get(' > div:nth-child(2) > p')
            .should('exist')
            .and('have.text', 'No Items')
          //assert No Items
          cy.get(' > div:nth-child(2) > p')
            .should('exist')
            .and('have.text', 'No Items')
        })

      //Now Click again SI-Writing - it should hide the additional elements within
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3)')
        .find(' > div > div > div')
        .click()
        .wait(1000)

      //verify Description column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(2)')
        .should('not.exist')
      //verify Recurring column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(3)')
        .should('not.exist')
      //verify Department column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(4)')
        .should('not.exist')
      //verify Action column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(5)')
        .should('not.exist')
      //verify No Items should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(2) > p')
        .should('not.exist')

      ////////// SI-Writing ASSERTIONS ENDS HERE /////////////

      ////////// SI-Design ASSERTIONS STARTS HERE /////////////

      //verify SI-Design
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(4)')
        .should('exist')
        .within(()=>{
          //assert the button left beside the SI-PPC Title
          cy.get(' > div > div > div')
            .should('exist')
            .and('not.be.disabled')
          //assert SI-PPC title
          cy.get(' > div > div > p > span')
            .should('exist')
            .and('have.text', 'SI-Design')
            .and('have.css', 'font-weight', '700') //font bold
        })

      //Click the SI_Design - it should reveal additional within element
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(4)')
        .click()
        .wait(1000)
        .within(()=>{
          //assert Description, Recurring, Department, and Actions column names
          const operationcolNames = [
            'Description',
            'Recurring',
            'Department',
            'Actions'
          ]
          cy.get(' > div:nth-child(1) > p').each(($option, index)=>{
            cy.wrap($option)
              .should('exist')
              .and('have.text', operationcolNames[index])
            cy.log(operationcolNames[index])
          })
          //assert No Items
          cy.get(' > div:nth-child(2) > p')
            .should('exist')
            .and('have.text', 'No Items')
          //assert No Items
          cy.get(' > div:nth-child(2) > p')
            .should('exist')
            .and('have.text', 'No Items')
        })

      //Click again SI-Design - it should hide the additional elements within
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(4)')
        .find(' > div > div > div')
        .click()
        .wait(1000)

      //verify Description column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(2)')
        .should('not.exist')
      //verify Recurring column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(3)')
        .should('not.exist')
      //verify Department column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(4)')
        .should('not.exist')
      //verify Action column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(5)')
        .should('not.exist')
      //verify No Items should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(2) > p')
        .should('not.exist')

      ////////// SI-Design ASSERTIONS ENDS HERE /////////////
      
      ////////// SI-Admin ASSERTIONS STARTS HERE /////////////

      //verify SI-Admin
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(5)')
        .should('exist')
        .within(()=>{
          //assert the button left beside the SI-PPC Title
          cy.get(' > div > div > div')
            .should('exist')
            .and('not.be.disabled')
          //assert SI-PPC title
          cy.get(' > div > div > p > span')
            .should('exist')
            .and('have.text', 'SI-Admin')
            .and('have.css', 'font-weight', '700') //font bold
        })

      //Click the SI-Admin - it should reveal additional within element
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(5)')
        .click()
        .wait(1000)
        .within(()=>{
          //assert Description, Recurring, Department, and Actions column names
          const operationcolNames = [
            'Description',
            'Recurring',
            'Department',
            'Actions'
          ]
          cy.get(' > div:nth-child(1) > p').each(($option, index)=>{
            cy.wrap($option)
              .should('exist')
              .and('have.text', operationcolNames[index])
            cy.log(operationcolNames[index])
          })
          //assert No Items
          cy.get(' > div:nth-child(2) > p')
            .should('exist')
            .and('have.text', 'No Items')
          //assert No Items
          cy.get(' > div:nth-child(2) > p')
            .should('exist')
            .and('have.text', 'No Items')
        })

      //Click again the SI-Admin - it should hide the additional elements within
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(5)')
        .find(' > div > div > div')
        .click()
        .wait(1000)

      //verify Description column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(2)')
        .should('not.exist')
      //verify Recurring column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(3)')
        .should('not.exist')
      //verify Department column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(4)')
        .should('not.exist')
      //verify Action column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(5)')
        .should('not.exist')
      //verify No Items should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(2) > p')
        .should('not.exist')

      ////////// SI-Admin ASSERTIONS ENDS HERE /////////////

      ////////// Billing ASSERTIONS STARTS HERE ////////////

      //verify Billing
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(6)')
        .should('exist')
        .within(()=>{
          //assert the button left beside the SI-PPC Title
          cy.get(' > div > div > div')
            .should('exist')
            .and('not.be.disabled')
          //assert SI-PPC title
          cy.get(' > div > div > p > span')
            .should('exist')
            .and('have.text', 'Billing')
            .and('have.css', 'font-weight', '700') //font bold
        })

      //Click Billing - it should reveal additional within element
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(6)')
        .click()
        .wait(1000)
        .within(()=>{
          //assert Description, Recurring, Department, and Actions column names
          const operationcolNames = [
            'Description',
            'Recurring',
            'Department',
            'Actions'
          ]
          cy.get(' > div:nth-child(1) > p').each(($option, index)=>{
            cy.wrap($option)
              .should('exist')
              .and('have.text', operationcolNames[index])
            cy.log(operationcolNames[index])
          })
          //assert No Items
          cy.get(' > div:nth-child(2) > p')
            .should('exist')
            .and('have.text', 'No Items')
          //assert No Items
          cy.get(' > div:nth-child(2) > p')
            .should('exist')
            .and('have.text', 'No Items')
        })

      //Click again Billing - it should hide the additional elements within
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(6)')
        .find(' > div > div > div')
        .click()
        .wait(1000)

      //verify Description column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(2)')
        .should('not.exist')
      //verify Recurring column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(3)')
        .should('not.exist')
      //verify Department column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(4)')
        .should('not.exist')
      //verify Action column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(5)')
        .should('not.exist')
      //verify No Items should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(2) > p')
        .should('not.exist')

      ////////// Billing ASSERTIONS ENDS HERE /////////////

      ////////// Sales ASSERTIONS STARTS HERE /////////////

      //verify Sales
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(7)')
        .should('exist')
        .within(()=>{
          //assert the button left beside the SI-PPC Title
          cy.get(' > div > div > div')
            .should('exist')
            .and('not.be.disabled')
          //assert SI-PPC title
          cy.get(' > div > div > p > span')
            .should('exist')
            .and('have.text', 'Sales')
            .and('have.css', 'font-weight', '700') //font bold
        })

      //Click Sales - it should reveal additional within element
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(7)')
        .click()
        .wait(1000)
        .within(()=>{
          //assert Description, Recurring, Department, and Actions column names
          const operationcolNames = [
            'Description',
            'Recurring',
            'Department',
            'Actions'
          ]
          cy.get(' > div:nth-child(1) > p').each(($option, index)=>{
            cy.wrap($option)
              .should('exist')
              .and('have.text', operationcolNames[index])
            cy.log(operationcolNames[index])
          })
          //assert No Items
          cy.get(' > div:nth-child(2) > p')
            .should('exist')
            .and('have.text', 'No Items')
          //assert No Items
          cy.get(' > div:nth-child(2) > p')
            .should('exist')
            .and('have.text', 'No Items')
        })

      //Click again Sales - it should hide the additional elements within
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(7)')
        .find(' > div > div > div')
        .click()
        .wait(1000)

      //verify Description column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(2)')
        .should('not.exist')
      //verify Recurring column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(3)')
        .should('not.exist')
      //verify Department column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(4)')
        .should('not.exist')
      //verify Action column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(5)')
        .should('not.exist')
      //verify No Items should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(2) > p')
        .should('not.exist')

      ////////// Sales ASSERTIONS ENDS HERE /////////////

      ////////// Lead Generation ASSERTIONS STARTS HERE /////////////

      //verify Lead Generation
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(8)')
        .should('exist')
        .within(()=>{
          //assert the button left beside the SI-PPC Title
          cy.get(' > div > div > div')
            .should('exist')
            .and('not.be.disabled')
          //assert SI-PPC title
          cy.get(' > div > div > p > span')
            .should('exist')
            .and('have.text', 'Lead Generation')
            .and('have.css', 'font-weight', '700') //font bold
        })

      //Click Lead Generation - it should reveal additional within element
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(8)')
        .click()
        .wait(1000)
        .within(()=>{
          //assert Description, Recurring, Department, and Actions column names
          const operationcolNames = [
            'Description',
            'Recurring',
            'Department',
            'Actions'
          ]
          cy.get(' > div:nth-child(1) > p').each(($option, index)=>{
            cy.wrap($option)
              .should('exist')
              .and('have.text', operationcolNames[index])
            cy.log(operationcolNames[index])
          })
          //assert No Items
          cy.get(' > div:nth-child(2) > p')
            .should('exist')
            .and('have.text', 'No Items')
          //assert No Items
          cy.get(' > div:nth-child(2) > p')
            .should('exist')
            .and('have.text', 'No Items')
        })

      //Click again Lead Generation - it should hide the additional elements within
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(8)')
        .find(' > div > div > div')
        .click()
        .wait(1000)

      //verify Description column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(2)')
        .should('not.exist')
      //verify Recurring column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(3)')
        .should('not.exist')
      //verify Department column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(4)')
        .should('not.exist')
      //verify Action column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(5)')
        .should('not.exist')
      //verify No Items should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(2) > p')
        .should('not.exist')

      ////////// Lead Generation ASSERTIONS ENDS HERE /////////////
      
    })
    it("Testcase ID: CATM0003 - Create Task Management One Time Template for New Onboarded client",()=>{


      let GETHREF;
      let templatehref;

      //Login using account specialist
      cy.userlogin(loginmodule.EmailAddressInputfield, loginmodule.PasswordInputfield, loginmodule.SigninButton, testdata.userAccounts[0].accountspecialist1, testdata.userAccounts[0].accountspecialistandprojectmanagerpassword)

      //Click the Admin Navigation Module
      cy.get(modulebutton.AdminModuleButton)
        .click()
        .wait(2000)
        
      //Click the Task Management link text folder
      cy.get(linktextfolder.AdminModule[0].TaskManagement)
        .click()
        .wait(2000)
      
      //verify Page Title 'Task Management'
      cy.get(adminmodulelocator.TaskManageementFolder[0].pageTitle)
        .should('exist')
        .and('have.text', 'Task Management')
        .and('have.css', 'font-weight', '700') //font bold
        .and('have.css', 'font-size', '25px')

      //verify Add button - if found click
      cy.get(adminmodulelocator.TaskManageementFolder[0].AddButton)
        .should('exist')
        .and('not.be.disabled')
        .and('have.text', 'Add')
        .and('have.css', 'color', 'rgb(0, 47, 93)') //text color
        .and('have.css', 'border-color', 'rgb(0, 47, 93)')
        .and('have.css', 'border-radius', '40px')
        .click()
        .wait(2000)

      //verify Task List Creation Modal popup open
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].modal)
        .should('exist')

      //Select One Time Template
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].OneTimeTemplate)
        .click()
        .wait(1000)
        .should('have.css', 'border-color', 'rgb(24, 121, 216)') // the entire recurring template has blue border color signify it is seleected
        .find(' > div > div').should('have.css', 'background-color', 'rgb(24, 121, 216)') //blue dot signify it is selected
    
      //Click the Next Button
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].NextButton)
        .click()
        .wait(2000)

      //verify the Task List Creation Modal should remain open
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].modal)
        .should('exist')

      //verify the Template title text should be 'Customize your recurring template' 
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].TemplateTitleText)
        .should('exist')
        .and('have.text', 'Customize your one-time template')
        .and('have.css', 'font-weight', '700') //font bold
   
      //verify Template Name Label and Input field
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].TemplateNameLabelandInputfield)
        .should('exist')
        .within(()=>{
          //assert Label
          cy.get(' > label')
            .should('exist')
            .and('have.text', 'Template Name*')
            .find('sup').should('have.css', 'color', 'rgb(237, 46, 46)') //asterisk text color
          //assert Input field
          cy.get(' > input[name="name"]')
            .should('exist')
            .and('have.value', '') //empty by default
        })

      //verify Partner Type Label and drop down menu
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].PartnerTypeLabelandDropdownMenu)
        .should('exist')
        .within(()=>{
          //assert Label
          cy.get(' > label')
            .should('exist')
            .and('have.text', 'Partner Type *')
            .find('sup').should('have.css', 'color', 'rgb(237, 46, 46)') //asterisk text color
          //assert drop down menu
          const optionsMenu = [
            'Choose One',
            'New',
            'Existing'
          ];
          cy.get(' > div > select[name="partnerType"] > option').each(($option, index)=>{
            cy.wrap($option)
              .should('exist')
              .and('have.text', optionsMenu[index])
            cy.log(optionsMenu[index])
          });
        })

      //verify Which service category will this be used? * Label and drop down menu
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].WhichServiceCategoryWIllThisBeUsedLabelandDropdownMenu)
        .should('exist')
        .within(()=>{
          //assert Label
          cy.get(' > label')
            .should('exist')
            .and('contain', 'Which service category will this be used?')
            .find('sup').should('have.css', 'color', 'rgb(237, 46, 46)') //asterisk text color
          //assert drop down menu
          const serviceCategoryOptions = [
            'Choose One',
            'Full Account Management',
            'PPC Management',
            'Listing Content Creation',
            'Account Health Management',
            'Account Health Issue',
            'Seller Launch',
            'Account Creation',
            'Amazon Traffic Boost',
            'Advertising Management',
            'Google Advertising',
            'Meta Advertising',
            'SEO Management',
            'Website Content',
            'Mailchimp Management',
            'Website Activation'
          ];
          cy.get(' > select[name="partnerService"] > option').each(($option, index)=>{
            cy.wrap($option)
              .should('exist')
              .and('have.text', serviceCategoryOptions[index])
            cy.log(serviceCategoryOptions[index])
          });
        })

      //verify Back Button
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].BackButton)
        .should('exist')
        .and('not.be.disabled')
        .and('have.text', 'Back')
        .and('have.css', 'color', 'rgb(107, 114, 128)') //text color
        .and('have.css', 'background-color', 'rgb(255, 255, 255)') 
        .and('have.css', 'border-color', 'rgb(107, 114, 128)')
        .and('have.css', 'border-radius', '9999px')

      //verify Create Button
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].CreateButton)
        .should('exist')
        .and('not.be.disabled')
        .and('have.text', 'Create')
        .and('have.css', 'color', 'rgb(255, 255, 255)') //text color
        .and('have.css', 'background-color', 'rgb(0, 47, 93)') 
        .and('have.css', 'border-color', 'rgb(30, 58, 138)')
        .and('have.css', 'border-radius', '9999px')

      //////// CREATE NEW ONE-TIME TASKS STARTS HERE ///////////

      //Now Enter Template Name
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].TemplateNameLabelandInputfield)
        .find(' > input[name="name"]')
        .clear()
        .type('Test New One-Time Template')
        .wait(600)
        .should('have.value', 'Test New One-Time Template')

      //Select New in Partner Type
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].PartnerTypeLabelandDropdownMenu)
        .find(' > div > select[name="partnerType"]')
        .select('new')
        .wait(600)

      //verify that the selected option goes on top
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].PartnerTypeLabelandDropdownMenu)
        .find('select option:selected')
        .should('have.text', 'New')

      //Select Service Category Full Account Management
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].WhichServiceCategoryWIllThisBeUsedLabelandDropdownMenu)
        .find(' > select[name="partnerService"]')
        .select('Full Account Management')
        .wait(600)

      //verify the selected service category goes on top
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].WhichServiceCategoryWIllThisBeUsedLabelandDropdownMenu)
        .find('select option:selected')
        .should('have.text', 'Full Account Management')

      ///////// CREATE NEW ONE-TIME TASKS ENDS HERE ///////////
      
      //Click Create Button
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].CreateButton)
        .click()
        .wait(2000) 

      //verify alert-success modal popup
      cy.get('div.overflow-y-auto > div.min-h-full')
        .should('exist')
        .within(()=>{
          //assert check logo
          cy.get(' > div > div > svg')
            .should('exist')
            .and('have.css', 'color', 'rgb(0, 150, 109)') //check color
          //assert message
          cy.get(' > div > div')
            .should('exist')
            .and('have.text', 'Template has been created.')
            .and('have.css', 'color', 'rgb(0, 150, 109)') //text color
            .and('have.css', 'font-weight', '400')  //font bold
        })

      //then simulate pressing esc key in your keyboard
      cy.get('body').type('{esc}');
      cy.wait(3000)
        
      //Go to New > One Time Tab
      //verify One Time and click when found
      cy.get(adminmodulelocator.TaskManageementFolder[0].pageSubTab[0].OneTimeTab)
        .click()
        .wait(3000)

      //verify expected url destination
      cy.url().should('contain', 'one-time')
        
      //////// TASK MANAGEMENT > NEW > ONBOARDING TABLE LIST ASSERTIONS STARTS HERE ////////////

      //verify first column Names
      const columnNames = [
        'Template Name',
        'Partner Type',
        'Service Type',
        'Last Updated',
        'Updated By',
        'Action'
      ];
      cy.get('table > thead > tr > th').each(($column, index)=>{
        cy.wrap($column)
          .should('exist')
          .and('have.text',columnNames[index])
        cy.log(columnNames[index])
      })
      
      //Then verify row 1 each column
      cy.get('table > tbody > tr:first-child').within(()=>{
        //assert Template Name
        TaskManagementTableList.assertColumn1TemplateName(' > td:nth-child(1) > a', 'Test New One-Time Template')
        //I will get the href link for later assertion
        GETHREF = new Promise((resolve)=>{
          cy.get(' > td:nth-child(1) > a')
            .then(($element)=>{
              // Get the href attribute
              templatehref = $element.attr('href');
              resolve();
            })
        })
        //assert Partner Type
        TaskManagementTableList.assertColumn2PartnerType(' > td:nth-child(2)', 'new')
        //assert Service Type
        TaskManagementTableList.assertColumn3ServiceType(' > td:nth-child(3)', 'Full Account Management')
        //assert Last Updated
        TaskManagementTableList.assertColumn4LastUpdated(' > td:nth-child(4)', DateTodayIs.TodayDateMMDDYYYY_MonthisinWholeWordandDayiswithTH())
        //assert Updated By
        TaskManagementTableList.assertColumn5UpdatedBy(' > td:nth-child(5) > div', 'LP', 'Logan Paul')
        //aasert Action:Edit
        TaskManagementTableList.assertColumn6Action(' > td:nth-child(6) > a', 'not.be.disabled', 'Edit') 
      }) 

      //////// TASK MANAGEMENT > NEW > ONBOARDING TABLE LIST ASSERTIONS ENDS HERE ////////////
        
      //Click the Edit button
      cy.get('table > tbody > tr:first-child > td:nth-child(6) > a')
        .click()
        .wait(3000)

      //verify url expected destination
      cy.get('body').then(()=>{
        GETHREF.then(()=>{
          cy.url().should('contain', templatehref)
        })
      })

      //Template Name as Title page
      cy.get('div > h3')
        .should('exist')
        .and('have.text', 'Test New One-Time Template')
        .and('have.css', 'font-weight', '700') //font bold

      //verify Update Button
      cy.get('form > div:nth-child(2) > button')
        .should('exist')
        .and('not.be.disabled')
        .and('have.text', 'Update')
        .and('have.css', 'font-weight', '700') //font bold
        .and('have.css', 'color', 'rgb(250, 250, 250)') //text color
        .and('have.css', 'background-color', 'rgb(0, 47, 93)') // background color
        .and('have.css', 'border-radius', '9999px')

      //verify Settings
      cy.get('form > div:nth-child(3) > div')
        .should('exist')
        .within(()=>{
          //assert Label
          cy.get(' > span')
            .should('exist')
            .and('have.text', 'Settings')
            .and('have.css', 'font-weight', '700') //font bold
          //assert the '>' symbol
          cy.get(' > svg')
            .should('exist')
            .and('have.css', 'color', 'rgb(148, 148, 148)') //text color
        })

      //Click the Settings
      cy.get('form > div:nth-child(3) > div')
        .click()
        .wait(1000)
        .should('have.attr', 'aria-expanded', 'true')

      //verify Additional elements emerged
      cy.get('div.pb-6 > div')
        .should('exist')
        .within(()=>{
          //assert Template Name Label and Input field
          cy.get(' > div:nth-child(1)')
            .should('exist')
            .within(()=>{
              //assert Template Name label
              cy.get(' > label')
                .should('exist')
                .and('have.text', 'Template Name*')
                .find('sup').should('have.css', 'color', 'rgb(237, 46, 46)') //asterisk text color
              //assert Input field
              cy.get(' > input[name="name"]')
                .should('exist')
                .and('not.be.disabled')
                .and('have.value', 'Test New One-Time Template')
            })
          //assert Template Type Label and drop down menu with the selected on top
          cy.get(' > div:nth-child(2)')
            .should('exist')
            .within(()=>{
              //assert Template Name Label
              cy.get(' > label')
                .should('exist')
                .and('have.text', 'Template Type*')
                .find('sup').should('have.css', 'color', 'rgb(237, 46, 46)') //asterisk text color
              //assert the drop down menu with the already selected on top
              cy.get(' > select[name="type"]')
                .should('exist')
                .and('not.be.disabled')
              const typeOption = [
                'Choose One',
                'Onboarding',
                'Roadmap',
                'Recurring',
                'One Time'
              ]
              cy.get(' > select[name="type"] > option').each(($option, index)=>{
                cy.wrap($option)
                  .should('exist')
                  .and('have.text', typeOption[index])
                cy.log(typeOption[index])
              })
            })
          //assert Partner Type Label and drop down menu
          cy.get(' > div:nth-child(3)')
            .should('exist')
            .within(()=>{
              //assert Partner Type Label
              cy.get(' > label')
                .should('exist')
                .and('have.text', 'Partner Type *')
                .find('sup').should('have.css', 'color', 'rgb(237, 46, 46)') //asterisk text color
              const partnertypeOption = [
                'Choose One',
                'New',
                'Existing'
              ]
              cy.get(' > div > select[name="partnerType"] > option').each(($option, index)=>{
                cy.wrap($option)
                  .should('exist')
                  .and('have.text', partnertypeOption[index])
                cy.log(partnertypeOption[index])
              })
            })
          //assert Service Category Label and drop down menu
          cy.get(' > div:nth-child(4)')
            .should('exist')
            .within(()=>{
              //assert Service Category Label
              cy.get(' > label')
                .should('exist')
                .and('have.text', 'Service Category*')
                .find('sup').should('have.css', 'color', 'rgb(237, 46, 46)') //asterisk text color
              //assert drop down menu
              cy.get(' > select[name="partnerService"]')
                .should('exist')
                .and('not.be.disabled')
              const serviceOption = [
                'Choose One',
                'Full Account Management',
                'PPC Management',
                'Listing Content Creation',
                'Account Health Management',
                'Account Health Issue',
                'Seller Launch',
                'Account Creation',
                'Amazon Traffic Boost',
                'Advertising Management',
                'Google Advertising',
                'Meta Advertising',
                'SEO Management',
                'Website Content',
                'Mailchimp Management',
                'Website Activation'
              ]
              cy.get(' > select[name="partnerService"] > option').each(($option, index)=>{
                cy.wrap($option)
                  .should('exist')
                  .and('have.text', serviceOption[index])
                cy.log(serviceOption[index])
              })
            })
        })

      //Click again the settings and the group elements should not be visible such as Template Name, Template Type, Partner Type, and Select Category Type
      cy.get('form > div:nth-child(3) > div > svg')
        .click()
        .wait(1000)
      cy.get('form > div:nth-child(3) > div')
        .should('have.attr', 'aria-expanded', 'false')

      //the main group element should not be visible
      cy.get('div.pb-6 > div')
        .should('not.exist')

      //verify Tasks Title and Add button
      cy.get('div.main-content-inner2 > div > div.space-y-8 > div:nth-child(1)')
        .should('exist')
        .within(()=>{
          //assert Tasks title
          cy.get(' > h4')
            .should('exist')
            .and('have.text', 'Tasks')
            .and('have.css', 'font-weight', '700') //font bold
          //assert Add button
          cy.get(' > button')
            .should('exist')
            .and('not.be.disabled')
            .and('have.text', 'Add')
            .and('have.css', 'color', 'rgb(0, 47, 93)') //text color
            .and('have.css', 'border-color', 'rgb(0, 47, 93)')
            .and('have.css', 'border-radius', '40px')
        })

      //Click the Tasks Add button
      cy.get('div.main-content-inner2 > div > div.space-y-8 > div:nth-child(1)')
        .find(' > button')
        .click()
        .wait(1000)

      //verify there would be Enter Task Name input field
      cy.get('input[name="title"]')
        .should('exist')
        .and('not.be.disabled')
        .and('have.value', '') //empty by default
        .and('have.attr', 'placeholder', 'Enter task name')
      //verify there would be Enter task description input field
      cy.get('input[name="description"]')
        .should('exist')
        .and('not.be.disabled')
        .and('have.value', '') //empty by default
        .and('have.attr', 'placeholder', 'Enter task description')
      //verify Select Department Dropdown menu
      cy.get('select[name="department"]')
        .should('exist')
        .and('not.be.disabled')
        const departmentOptions = [
          ' Select Department',
          'SI-Operations',
          'SI-PPC',
          'SI-Writing',
          'SI-Design',
          'SI-Admin',
          'Billing',
          'Sales',
          'Lead Generation'
        ]
        cy.get('select[name="department"] > option').each(($option, index)=>{
          cy.wrap($option)
            .should('exist')
            .and('have.text', departmentOptions[index])
          cy.log(departmentOptions[index])
        })
      //verify there would be submit/check/save button icon
      cy.get('div.grid > div > button:nth-child(1)')
        .should('exist')
        .and('not.be.disabled')
        .and('have.css', 'background-color', 'rgb(0, 47, 93)') //background color
        .and('have.css', 'border-radius', '10px')
      //verify there would be delete button icon
      cy.get('div.grid > div > button:nth-child(2)')
        .should('exist')
        .and('not.be.disabled')
        .and('have.css', 'border-color', 'rgb(148, 148, 148)') //background color
        .and('have.css', 'border-radius', '10px')

      //Click again the delete icon and it would not be visible the Enter Task Name, Enter Task Description, Recurring button, and Department drop down menu
      cy.get('div.grid > div > button:nth-child(2)')
        .click()
        .wait(1000)

      //verify there would be Enter Task Name input field - should not be visible
      cy.get('input[name="title"]')
        .should('not.exist')
      //verify Select Department Dropdown menu - should not be visible
      cy.get('select[name="department"]')
        .should('not.exist')
      //verify Recurring Button - should not be visible
      cy.get('form > div > div > div:nth-child(3)')
        .should('not.exist')
      //verify Select Department Dropdown menu - should not be visible
      cy.get('select[name="department"]')
        .should('not.exist')
      //verify there would be submit/check/save button icon - should not be visible
      cy.get('div.grid > div > button:nth-child(1)')
        .should('not.exist')
      //verify there would be delete button icon - should not be visible
      cy.get('div.grid > div > button:nth-child(2)')
        .should('not.exist')

      ////////// SI-OPERATIONS ASSERTIONS STARTS HERE /////////////

      //verify SI-Operations
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(1)')
        .should('exist')
        .within(()=>{
          //assert the button left beside the SI-Operations Title
          cy.get(' > div > div > div')
            .should('exist')
            .and('not.be.disabled')
          //assert SI-Operations title
          cy.get(' > div > div > p > span')
            .should('exist')
            .and('have.text', 'SI-Operations')
            .and('have.css', 'font-weight', '700') //font bold
        })

      //Now I click the SI-Operations - it should reveal additional within elements
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(1)')
        .click()
        .wait(1000)
        .within(()=>{
          //assert Description, Recurring, Department, and Actions column names
          const operationcolNames = [
            'Description',
            'Department',
            'Actions'
          ]
          cy.get(' > div:nth-child(1) > p').each(($option, index)=>{
            cy.wrap($option)
              .should('exist')
              .and('have.text', operationcolNames[index])
            cy.log(operationcolNames[index])
          })
          //assert No Items
          cy.get(' > div:nth-child(2) > p')
            .should('exist')
            .and('have.text', 'No Items')
        })
      
      //Click again the SI-Operations - it should hide the additional elements within
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(1)')
        .find(' > div > div > div')
        .click()
        .wait(1000)
        
      //verify Description column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(1) > div:nth-child(1) > p:nth-child(2)')
        .should('not.exist')
      //verify Recurring column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(1) > div:nth-child(1) > p:nth-child(3)')
        .should('not.exist')
      //verify Department column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(1) > div:nth-child(1) > p:nth-child(4)')
        .should('not.exist')
      //verify Action column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(1) > div:nth-child(1) > p:nth-child(5)')
        .should('not.exist')
      //verify No Items should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(1) > div:nth-child(2) > p')
        .should('not.exist')

      ////////// SI-OPERATIONS ASSERTIONS ENDS HERE /////////////  

      ////////// SI-PPC ASSERTIONS STARTS HERE /////////////

      //verify SI-PPC
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(2)')
        .should('exist')
        .within(()=>{
          //assert the button left beside the SI-PPC Title
          cy.get(' > div > div > div')
            .should('exist')
            .and('not.be.disabled')
          //assert SI-PPC title
          cy.get(' > div > div > p > span')
            .should('exist')
            .and('have.text', 'SI-PPC')
            .and('have.css', 'font-weight', '700') //font bold
        })

      //Click the SI-PPC - it should reveal additional within element
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(2)')
        .click()
        .wait(1000)
        .within(()=>{
          //assert Description, Recurring, Department, and Actions column names
          const operationcolNames = [
            'Description',
            'Department',
            'Actions'
          ]
          cy.get(' > div:nth-child(1) > p').each(($option, index)=>{
            cy.wrap($option)
              .should('exist')
              .and('have.text', operationcolNames[index])
            cy.log(operationcolNames[index])
          })
          //assert No Items
          cy.get(' > div:nth-child(2) > p')
            .should('exist')
            .and('have.text', 'No Items')
          //assert No Items
          cy.get(' > div:nth-child(2) > p')
            .should('exist')
            .and('have.text', 'No Items')
        })

      //Then click again the SI-PPC - it should hide the additional elements within
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(2)')
        .find(' > div > div > div')
        .click()
        .wait(1000)

      //verify Description column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(2) > div:nth-child(1) > p:nth-child(2)')
        .should('not.exist')
      //verify Recurring column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(2) > div:nth-child(1) > p:nth-child(3)')
        .should('not.exist')
      //verify Department column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(2) > div:nth-child(1) > p:nth-child(4)')
        .should('not.exist')
      //verify Action column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(2) > div:nth-child(1) > p:nth-child(5)')
        .should('not.exist')
      //verify No Items should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(2) > div:nth-child(2) > p')
        .should('not.exist')

      ////////// SI-PPC ASSERTIONS ENDS HERE /////////////

      ////////// SI-Writing ASSERTIONS STARTS HERE /////////////

      //verify SI-Writing
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3)')
        .should('exist')
        .within(()=>{
          //assert the button left beside the SI-PPC Title
          cy.get(' > div > div > div')
            .should('exist')
            .and('not.be.disabled')
          //assert SI-PPC title
          cy.get(' > div > div > p > span')
            .should('exist')
            .and('have.text', 'SI-Writing')
            .and('have.css', 'font-weight', '700') //font bold
        })

      //Click SI-Writing - it should reveal additional within element
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3)')
        .click()
        .wait(1000)
        .within(()=>{
          //assert Description, Recurring, Department, and Actions column names
          const operationcolNames = [
            'Description',
            'Department',
            'Actions'
          ]
          cy.get(' > div:nth-child(1) > p').each(($option, index)=>{
            cy.wrap($option)
              .should('exist')
              .and('have.text', operationcolNames[index])
            cy.log(operationcolNames[index])
          })
          //assert No Items
          cy.get(' > div:nth-child(2) > p')
            .should('exist')
            .and('have.text', 'No Items')
          //assert No Items
          cy.get(' > div:nth-child(2) > p')
            .should('exist')
            .and('have.text', 'No Items')
        })

      //Now Click again SI-Writing - it should hide the additional elements within
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3)')
        .find(' > div > div > div')
        .click()
        .wait(1000)

      //verify Description column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(2)')
        .should('not.exist')
      //verify Recurring column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(3)')
        .should('not.exist')
      //verify Department column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(4)')
        .should('not.exist')
      //verify Action column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(5)')
        .should('not.exist')
      //verify No Items should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(2) > p')
        .should('not.exist')

      ////////// SI-Writing ASSERTIONS ENDS HERE /////////////

      ////////// SI-Design ASSERTIONS STARTS HERE /////////////

      //verify SI-Design
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(4)')
        .should('exist')
        .within(()=>{
          //assert the button left beside the SI-PPC Title
          cy.get(' > div > div > div')
            .should('exist')
            .and('not.be.disabled')
          //assert SI-PPC title
          cy.get(' > div > div > p > span')
            .should('exist')
            .and('have.text', 'SI-Design')
            .and('have.css', 'font-weight', '700') //font bold
        })

      //Click the SI_Design - it should reveal additional within element
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(4)')
        .click()
        .wait(1000)
        .within(()=>{
          //assert Description, Recurring, Department, and Actions column names
          const operationcolNames = [
            'Description',
            'Department',
            'Actions'
          ]
          cy.get(' > div:nth-child(1) > p').each(($option, index)=>{
            cy.wrap($option)
              .should('exist')
              .and('have.text', operationcolNames[index])
            cy.log(operationcolNames[index])
          })
          //assert No Items
          cy.get(' > div:nth-child(2) > p')
            .should('exist')
            .and('have.text', 'No Items')
          //assert No Items
          cy.get(' > div:nth-child(2) > p')
            .should('exist')
            .and('have.text', 'No Items')
        })

      //Click again SI-Design - it should hide the additional elements within
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(4)')
        .find(' > div > div > div')
        .click()
        .wait(1000)

      //verify Description column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(2)')
        .should('not.exist')
      //verify Recurring column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(3)')
        .should('not.exist')
      //verify Department column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(4)')
        .should('not.exist')
      //verify Action column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(5)')
        .should('not.exist')
      //verify No Items should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(2) > p')
        .should('not.exist')

      ////////// SI-Design ASSERTIONS ENDS HERE /////////////
      
      ////////// SI-Admin ASSERTIONS STARTS HERE /////////////

      //verify SI-Admin
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(5)')
        .should('exist')
        .within(()=>{
          //assert the button left beside the SI-PPC Title
          cy.get(' > div > div > div')
            .should('exist')
            .and('not.be.disabled')
          //assert SI-PPC title
          cy.get(' > div > div > p > span')
            .should('exist')
            .and('have.text', 'SI-Admin')
            .and('have.css', 'font-weight', '700') //font bold
        })

      //Click the SI-Admin - it should reveal additional within element
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(5)')
        .click()
        .wait(1000)
        .within(()=>{
          //assert Description, Recurring, Department, and Actions column names
          const operationcolNames = [
            'Description',
            'Department',
            'Actions'
          ]
          cy.get(' > div:nth-child(1) > p').each(($option, index)=>{
            cy.wrap($option)
              .should('exist')
              .and('have.text', operationcolNames[index])
            cy.log(operationcolNames[index])
          })
          //assert No Items
          cy.get(' > div:nth-child(2) > p')
            .should('exist')
            .and('have.text', 'No Items')
          //assert No Items
          cy.get(' > div:nth-child(2) > p')
            .should('exist')
            .and('have.text', 'No Items')
        })

      //Click again the SI-Admin - it should hide the additional elements within
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(5)')
        .find(' > div > div > div')
        .click()
        .wait(1000)

      //verify Description column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(2)')
        .should('not.exist')
      //verify Recurring column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(3)')
        .should('not.exist')
      //verify Department column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(4)')
        .should('not.exist')
      //verify Action column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(5)')
        .should('not.exist')
      //verify No Items should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(2) > p')
        .should('not.exist')

      ////////// SI-Admin ASSERTIONS ENDS HERE /////////////

      ////////// Billing ASSERTIONS STARTS HERE ////////////

      //verify Billing
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(6)')
        .should('exist')
        .within(()=>{
          //assert the button left beside the SI-PPC Title
          cy.get(' > div > div > div')
            .should('exist')
            .and('not.be.disabled')
          //assert SI-PPC title
          cy.get(' > div > div > p > span')
            .should('exist')
            .and('have.text', 'Billing')
            .and('have.css', 'font-weight', '700') //font bold
        })

      //Click Billing - it should reveal additional within element
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(6)')
        .click()
        .wait(1000)
        .within(()=>{
          //assert Description, Recurring, Department, and Actions column names
          const operationcolNames = [
            'Description',
            'Department',
            'Actions'
          ]
          cy.get(' > div:nth-child(1) > p').each(($option, index)=>{
            cy.wrap($option)
              .should('exist')
              .and('have.text', operationcolNames[index])
            cy.log(operationcolNames[index])
          })
          //assert No Items
          cy.get(' > div:nth-child(2) > p')
            .should('exist')
            .and('have.text', 'No Items')
          //assert No Items
          cy.get(' > div:nth-child(2) > p')
            .should('exist')
            .and('have.text', 'No Items')
        })

      //Click again Billing - it should hide the additional elements within
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(6)')
        .find(' > div > div > div')
        .click()
        .wait(1000)

      //verify Description column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(2)')
        .should('not.exist')
      //verify Recurring column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(3)')
        .should('not.exist')
      //verify Department column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(4)')
        .should('not.exist')
      //verify Action column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(5)')
        .should('not.exist')
      //verify No Items should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(2) > p')
        .should('not.exist')

      ////////// Billing ASSERTIONS ENDS HERE /////////////

      ////////// Sales ASSERTIONS STARTS HERE /////////////

      //verify Sales
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(7)')
        .should('exist')
        .within(()=>{
          //assert the button left beside the SI-PPC Title
          cy.get(' > div > div > div')
            .should('exist')
            .and('not.be.disabled')
          //assert SI-PPC title
          cy.get(' > div > div > p > span')
            .should('exist')
            .and('have.text', 'Sales')
            .and('have.css', 'font-weight', '700') //font bold
        })

      //Click Sales - it should reveal additional within element
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(7)')
        .click()
        .wait(1000)
        .within(()=>{
          //assert Description, Recurring, Department, and Actions column names
          const operationcolNames = [
            'Description',
            'Department',
            'Actions'
          ]
          cy.get(' > div:nth-child(1) > p').each(($option, index)=>{
            cy.wrap($option)
              .should('exist')
              .and('have.text', operationcolNames[index])
            cy.log(operationcolNames[index])
          })
          //assert No Items
          cy.get(' > div:nth-child(2) > p')
            .should('exist')
            .and('have.text', 'No Items')
          //assert No Items
          cy.get(' > div:nth-child(2) > p')
            .should('exist')
            .and('have.text', 'No Items')
        })

      //Click again Sales - it should hide the additional elements within
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(7)')
        .find(' > div > div > div')
        .click()
        .wait(1000)

      //verify Description column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(2)')
        .should('not.exist')
      //verify Recurring column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(3)')
        .should('not.exist')
      //verify Department column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(4)')
        .should('not.exist')
      //verify Action column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(5)')
        .should('not.exist')
      //verify No Items should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(2) > p')
        .should('not.exist')

      ////////// Sales ASSERTIONS ENDS HERE /////////////

      ////////// Lead Generation ASSERTIONS STARTS HERE /////////////

      //verify Lead Generation
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(8)')
        .should('exist')
        .within(()=>{
          //assert the button left beside the SI-PPC Title
          cy.get(' > div > div > div')
            .should('exist')
            .and('not.be.disabled')
          //assert SI-PPC title
          cy.get(' > div > div > p > span')
            .should('exist')
            .and('have.text', 'Lead Generation')
            .and('have.css', 'font-weight', '700') //font bold
        })

      //Click Lead Generation - it should reveal additional within element
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(8)')
        .click()
        .wait(1000)
        .within(()=>{
          //assert Description, Recurring, Department, and Actions column names
          const operationcolNames = [
            'Description',
            'Department',
            'Actions'
          ]
          cy.get(' > div:nth-child(1) > p').each(($option, index)=>{
            cy.wrap($option)
              .should('exist')
              .and('have.text', operationcolNames[index])
            cy.log(operationcolNames[index])
          })
          //assert No Items
          cy.get(' > div:nth-child(2) > p')
            .should('exist')
            .and('have.text', 'No Items')
          //assert No Items
          cy.get(' > div:nth-child(2) > p')
            .should('exist')
            .and('have.text', 'No Items')
        })

      //Click again Lead Generation - it should hide the additional elements within
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(8)')
        .find(' > div > div > div')
        .click()
        .wait(1000)

      //verify Description column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(2)')
        .should('not.exist')
      //verify Recurring column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(3)')
        .should('not.exist')
      //verify Department column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(4)')
        .should('not.exist')
      //verify Action column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(5)')
        .should('not.exist')
      //verify No Items should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(2) > p')
        .should('not.exist')

      ////////// Lead Generation ASSERTIONS ENDS HERE /////////////

    })
    it("Testcase ID: CATM0004 - Create Task Management Onboarding Template for Existing client",()=>{


      let GETHREF;
      let templatehref;

      //Login using account specialist
      cy.userlogin(loginmodule.EmailAddressInputfield, loginmodule.PasswordInputfield, loginmodule.SigninButton, testdata.userAccounts[0].accountspecialist1, testdata.userAccounts[0].accountspecialistandprojectmanagerpassword)

      //Click the Admin Navigation Module
      cy.get(modulebutton.AdminModuleButton)
        .click()
        .wait(2000)
        
      //Click the Task Management link text folder
      cy.get(linktextfolder.AdminModule[0].TaskManagement)
        .click()
        .wait(2000)
      
      //verify Page Title 'Task Management'
      cy.get(adminmodulelocator.TaskManageementFolder[0].pageTitle)
        .should('exist')
        .and('have.text', 'Task Management')
        .and('have.css', 'font-weight', '700') //font bold
        .and('have.css', 'font-size', '25px')

      //verify Add button - if found click
      cy.get(adminmodulelocator.TaskManageementFolder[0].AddButton)
        .should('exist')
        .and('not.be.disabled')
        .and('have.text', 'Add')
        .and('have.css', 'color', 'rgb(0, 47, 93)') //text color
        .and('have.css', 'border-color', 'rgb(0, 47, 93)')
        .and('have.css', 'border-radius', '40px')
        .click()
        .wait(2000)

      //verify Task List Creation Modal popup open
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].modal)
        .should('exist')

      /////// TASK LIST CREATION MODAL ELEMENT ASSERTIONS STARTS HERE ////////

      //verify modal title
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].modaltitle)
        .should('exist')
        .and('have.text', 'Task List Creation')
        .and('have.css', 'color', 'rgb(31, 41, 55)') //text color
        .and('have.css', 'font-weight', '500') //font bold

      //verify 'Select a Template to start with'
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].TemplateTitleText)
        .should('exist')
        .and('have.text', 'Select a Template to start with')
        .and('have.css', 'font-weight', '700') //font bold

      //verify Default Onboarding Template - default
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].OnboardingTemplate)
        .should('exist')
        .within(()=>{
          //assert the blue circle signify it is selected by default
          cy.get(' > div > div')
            .should('exist')
            .and('have.css', 'background-color', 'rgb(24, 121, 216)') // blue background color
          //assert Onboarding
          cy.get(' > p')
            .should('exist')
            .and('have.text', 'Onboarding')
          //assert img template
          cy.get(' > img')
            .should('exist')
            .should('attr', 'src')
            .should('include', '/assets/tasks-templates/onboarding.png')
        })

      //verify Roadmap Template - disabled
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].RoadmapTemplate)
        .should('exist')

      //verify Recurring Template
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].RecurringTemplate)
        .should('exist')
        .within(()=>{
          //assert the blue circle but transparent by default
          cy.get(' > div > div')
            .should('exist')
            .and('have.css', 'background-color', 'rgba(0, 0, 0, 0)') // expected transparent color
          //assert Onboarding
          cy.get(' > p')
            .should('exist')
            .and('have.text', 'Recurring')
          //assert img template
          cy.get(' > img')
            .should('exist')
            .should('attr', 'src')
            .should('include', '/assets/tasks-templates/recurring.png')
        })

      //verify One Time Template
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].OneTimeTemplate)
        .should('exist')
        .within(()=>{
          //assert the blue circle but transparent by default
          cy.get(' > div > div')
            .should('exist')
            .and('have.css', 'background-color', 'rgba(0, 0, 0, 0)') // expected transparent color
          //assert Onboarding
          cy.get(' > p')
            .should('exist')
            .and('have.text', 'One Time')
          //assert img template
          cy.get(' > img')
            .should('exist')
            .should('attr', 'src')
            .should('include', '/assets/tasks-templates/one-time.png')
        })

      //verify Next button
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].NextButton)
        .should('exist')
        .and('not.be.disabled')
        .and('have.text', 'Next')
        .and('have.css', 'color', 'rgb(255, 255, 255)') //text color
        .and('have.css', 'background-color', 'rgb(30, 58, 138)') //background color
        .and('have.css','border-color', 'rgb(30, 58, 138)')
        .and('have.css', 'border-radius', '9999px')

      /////// TASK LIST CREATION MODAL ELEMENT ASSERTIONS ENDS HERE /////////

      //Click the Next Button
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].NextButton)
        .click()
        .wait(2000)

      //verify the Task List Creation Modal should remain open
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].modal)
        .should('exist')

      //verify the Template title text should be 'Customize your onboardin template' 
      //since we choose the default template which is the Onboarding Template
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].TemplateTitleText)
        .should('exist')
        .and('have.text', 'Customize your onboarding template')
        .and('have.css', 'font-weight', '700') //font bold

      //verify Template Name Label and Input field
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].TemplateNameLabelandInputfield)
        .should('exist')
        .within(()=>{
          //assert Label
          cy.get(' > label')
            .should('exist')
            .and('have.text', 'Template Name*')
            .find('sup').should('have.css', 'color', 'rgb(237, 46, 46)') //asterisk text color
          //assert Input field
          cy.get(' > input[name="name"]')
            .should('exist')
            .and('have.value', '') //empty by default
        })

      //verify Partner Type Label and drop down menu
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].PartnerTypeLabelandDropdownMenu)
        .should('exist')
        .within(()=>{
          //assert Label
          cy.get(' > label')
            .should('exist')
            .and('have.text', 'Partner Type *')
            .find('sup').should('have.css', 'color', 'rgb(237, 46, 46)') //asterisk text color
          //assert drop down menu
          const optionsMenu = [
            'Choose One',
            'New',
            'Existing'
          ];
          cy.get(' > div > select[name="partnerType"] > option').each(($option, index)=>{
            cy.wrap($option)
              .should('exist')
              .and('have.text', optionsMenu[index])
            cy.log(optionsMenu[index])
          });
        })

      //verify Which service category will this be used? * Label and drop down menu
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].WhichServiceCategoryWIllThisBeUsedLabelandDropdownMenu)
        .should('exist')
        .within(()=>{
          //assert Label
          cy.get(' > label')
            .should('exist')
            .and('contain', 'Which service category will this be used?')
            .find('sup').should('have.css', 'color', 'rgb(237, 46, 46)') //asterisk text color
          //assert drop down menu
          const serviceCategoryOptions = [
            'Choose One',
            'Full Account Management',
            'PPC Management',
            'Listing Content Creation',
            'Account Health Management',
            'Account Health Issue',
            'Seller Launch',
            'Account Creation',
            'Amazon Traffic Boost',
            'Advertising Management',
            'Google Advertising',
            'Meta Advertising',
            'SEO Management',
            'Website Content',
            'Mailchimp Management',
            'Website Activation'
          ];
          cy.get(' > select[name="partnerService"] > option').each(($option, index)=>{
            cy.wrap($option)
              .should('exist')
              .and('have.text', serviceCategoryOptions[index])
            cy.log(serviceCategoryOptions[index])
          });
        })

      //verify Back Button
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].BackButton)
        .should('exist')
        .and('not.be.disabled')
        .and('have.text', 'Back')
        .and('have.css', 'color', 'rgb(107, 114, 128)') //text color
        .and('have.css', 'background-color', 'rgb(255, 255, 255)') 
        .and('have.css', 'border-color', 'rgb(107, 114, 128)')
        .and('have.css', 'border-radius', '9999px')

      //verify Create Button
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].CreateButton)
        .should('exist')
        .and('not.be.disabled')
        .and('have.text', 'Create')
        .and('have.css', 'color', 'rgb(255, 255, 255)') //text color
        .and('have.css', 'background-color', 'rgb(0, 47, 93)') 
        .and('have.css', 'border-color', 'rgb(30, 58, 138)')
        .and('have.css', 'border-radius', '9999px')

      //////// CREATE EXISTING ONBOARDING STARTS HERE ///////////

      //Now Enter Template Name
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].TemplateNameLabelandInputfield)
        .find(' > input[name="name"]')
        .clear()
        .type('Test Existing Onboarding Template')
        .wait(600)
        .should('have.value', 'Test Existing Onboarding Template')

      //Select New in Partner Type
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].PartnerTypeLabelandDropdownMenu)
        .find(' > div > select[name="partnerType"]')
        .select('existing')
        .wait(600)

      //verify that the selected option goes on top
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].PartnerTypeLabelandDropdownMenu)
        .find('select option:selected')
        .should('have.text', 'Existing')

      //Select Service Category Full Account Management
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].WhichServiceCategoryWIllThisBeUsedLabelandDropdownMenu)
        .find(' > select[name="partnerService"]')
        .select('Full Account Management')
        .wait(600)

      //verify the selected service category goes on top
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].WhichServiceCategoryWIllThisBeUsedLabelandDropdownMenu)
        .find('select option:selected')
        .should('have.text', 'Full Account Management')

      ///////// CREATE EXISTING ONBOARDING ENDS HERE ///////////

      //Click Create Button
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].CreateButton)
        .click()
        .wait(2000)

      //verify alert-success modal popup
      cy.get('div.overflow-y-auto > div.min-h-full')
        .should('exist')
        .within(()=>{
          //assert check logo
          cy.get(' > div > div > svg')
            .should('exist')
            .and('have.css', 'color', 'rgb(0, 150, 109)') //check color
          //assert message
          cy.get(' > div > div')
            .should('exist')
            .and('have.text', 'Template has been created.')
            .and('have.css', 'color', 'rgb(0, 150, 109)') //text color
            .and('have.css', 'font-weight', '400')  //font bold
        })

      //then simulate pressing esc key in your keyboard
      cy.get('body').type('{esc}');
      cy.wait(3000)
        
      //Go to Existing Onboarding
      //Verify Existing Tab if Found then click
      cy.get(adminmodulelocator.TaskManageementFolder[0].pageTab[0].ExistingTab)
        .should('exist')
        .click()
        .wait(3000)

      //Automatically it goes to Onboarding tab so no need to click the Onboarding Tab
        
      //////// TASK MANAGEMENT > NEW > ONBOARDING TABLE LIST ASSERTIONS STARTS HERE ////////////

      //verify first column Names
      const columnNames = [
        'Template Name',
        'Partner Type',
        'Service Type',
        'Last Updated',
        'Updated By',
        'Action'
      ];
      cy.get('table > thead > tr > th').each(($column, index)=>{
        cy.wrap($column)
          .should('exist')
          .and('have.text',columnNames[index])
        cy.log(columnNames[index])
      })

      //Then verify row 1 each column
      cy.get('table > tbody > tr:first-child').within(()=>{
        //assert Template Name
        TaskManagementTableList.assertColumn1TemplateName(' > td:nth-child(1) > a', 'Test Existing Onboarding Template')
        //I will get the href link for later assertion
        GETHREF = new Promise((resolve)=>{
          cy.get(' > td:nth-child(1) > a')
            .then(($element)=>{
              // Get the href attribute
              templatehref = $element.attr('href');
              resolve();
            })
        })
        //assert Partner Type
        TaskManagementTableList.assertColumn2PartnerType(' > td:nth-child(2)', 'existing')
        //assert Service Type
        TaskManagementTableList.assertColumn3ServiceType(' > td:nth-child(3)', 'Full Account Management')
        //assert Last Updated
        TaskManagementTableList.assertColumn4LastUpdated(' > td:nth-child(4)', DateTodayIs.TodayDateMMDDYYYY_MonthisinWholeWordandDayiswithTH())
        //assert Updated By
        TaskManagementTableList.assertColumn5UpdatedBy(' > td:nth-child(5) > div', 'LP', 'Logan Paul')
        //aasert Action:Edit
        TaskManagementTableList.assertColumn6Action(' > td:nth-child(6) > a', 'not.be.disabled', 'Edit')
      })

      //////// TASK MANAGEMENT > NEW > ONBOARDING TABLE LIST ASSERTIONS ENDS HERE ////////////
        
      //CLick the Action Edit button
      cy.get('table > tbody > tr:first-child > td:nth-child(6) > a')
        .click()
        .wait(3000)

      //verify url expected destination
      cy.get('body').then(()=>{
        GETHREF.then(()=>{
          cy.url().should('contain', templatehref)
        })
      })

      //Template Name as Title page
      cy.get('div > h3')
        .should('exist')
        .and('have.text', 'Test Existing Onboarding Template')
        .and('have.css', 'font-weight', '700') //font bold

      //verify Update Button
      cy.get('form > div:nth-child(2) > button')
        .should('exist')
        .and('not.be.disabled')
        .and('have.text', 'Update')
        .and('have.css', 'font-weight', '700') //font bold
        .and('have.css', 'color', 'rgb(250, 250, 250)') //text color
        .and('have.css', 'background-color', 'rgb(0, 47, 93)') // background color
        .and('have.css', 'border-radius', '9999px')

      //verify Settings
      cy.get('form > div:nth-child(3) > div')
        .should('exist')
        .within(()=>{
          //assert Label
          cy.get(' > span')
            .should('exist')
            .and('have.text', 'Settings')
            .and('have.css', 'font-weight', '700') //font bold
          //assert the '>' symbol
          cy.get(' > svg')
            .should('exist')
            .and('have.css', 'color', 'rgb(148, 148, 148)') //text color
        })

      //verify Tasks Title and Add button
      cy.get('div.main-content-inner2 > div > div.space-y-8 > div:nth-child(1)')
        .should('exist')
        .within(()=>{
          //assert Tasks title
          cy.get(' > h4')
            .should('exist')
            .and('have.text', 'Tasks')
            .and('have.css', 'font-weight', '700') //font bold
          //assert Add button
          cy.get(' > button')
            .should('exist')
            .and('not.be.disabled')
            .and('have.text', 'Add')
            .and('have.css', 'color', 'rgb(0, 47, 93)') //text color
            .and('have.css', 'border-color', 'rgb(0, 47, 93)')
            .and('have.css', 'border-radius', '40px')
        })

      //verify Onboarding Tasks
      cy.get('div.space-y-8 > div:nth-child(2) > div > div > div')
        .should('exist')
        .within(()=>{
          //assert button
          cy.get(' > div > svg')
            .should('exist')
          //assert Onboarding tasks title
          cy.get(' > p > span')
            .should('exist')
            .and('have.text', 'Onboarding tasks')
            .and('have.css', 'font-weight', '700') //font bold
        })

      //Now if I click the Settings, there will be additional elements that should be visible
      cy.get('form > div:nth-child(3) > div')
        .should('have.attr', 'aria-expanded', 'false')
        .click()
        .wait(600)
        .should('have.attr', 'aria-expanded', 'true')

      //verify the additional elements are visible
      cy.get('div.pb-6 > div')
        .should('exist')
        .within(()=>{
          //assert Template Name Label and Input field
          cy.get(' > div:nth-child(1)')
            .should('exist')
            .within(()=>{
              //assert Template Name label
              cy.get(' > label')
                .should('exist')
                .and('have.text', 'Template Name*')
                .find('sup').should('have.css', 'color', 'rgb(237, 46, 46)') //asterisk text color
              //assert Input field
              cy.get(' > input[name="name"]')
                .should('exist')
                .and('not.be.disabled')
                .and('have.value', 'Test Existing Onboarding Template')
            })
          //assert Template Type Label and drop down menu with the selected on top
          cy.get(' > div:nth-child(2)')
            .should('exist')
            .within(()=>{
              //assert Template Name Label
              cy.get(' > label')
                .should('exist')
                .and('have.text', 'Template Type*')
                .find('sup').should('have.css', 'color', 'rgb(237, 46, 46)') //asterisk text color
              //assert the drop down menu with the already selected on top
              cy.get(' > select[name="type"]')
                .should('exist')
                .and('not.be.disabled')
              const typeOption = [
                'Choose One',
                'Onboarding',
                'Roadmap',
                'Recurring',
                'One Time'
              ]
              cy.get(' > select[name="type"] > option').each(($option, index)=>{
                cy.wrap($option)
                  .should('exist')
                  .and('have.text', typeOption[index])
                cy.log(typeOption[index])
              })
            })
          //assert Partner Type Label and drop down menu
          cy.get(' > div:nth-child(3)')
            .should('exist')
            .within(()=>{
              //assert Partner Type Label
              cy.get(' > label')
                .should('exist')
                .and('have.text', 'Partner Type *')
                .find('sup').should('have.css', 'color', 'rgb(237, 46, 46)') //asterisk text color
              const partnertypeOption = [
                'Choose One',
                'New',
                'Existing'
              ]
              cy.get(' > div > select[name="partnerType"] > option').each(($option, index)=>{
                cy.wrap($option)
                  .should('exist')
                  .and('have.text', partnertypeOption[index])
                cy.log(partnertypeOption[index])
              })
            })
          //assert Service Category Label and drop down menu
          cy.get(' > div:nth-child(4)')
            .should('exist')
            .within(()=>{
              //assert Service Category Label
              cy.get(' > label')
                .should('exist')
                .and('have.text', 'Service Category*')
                .find('sup').should('have.css', 'color', 'rgb(237, 46, 46)') //asterisk text color
              //assert drop down menu
              cy.get(' > select[name="partnerService"]')
                .should('exist')
                .and('not.be.disabled')
              const serviceOption = [
                'Choose One',
                'Full Account Management',
                'PPC Management',
                'Listing Content Creation',
                'Account Health Management',
                'Account Health Issue',
                'Seller Launch',
                'Account Creation',
                'Amazon Traffic Boost',
                'Advertising Management',
                'Google Advertising',
                'Meta Advertising',
                'SEO Management',
                'Website Content',
                'Mailchimp Management',
                'Website Activation'
              ]
              cy.get(' > select[name="partnerService"] > option').each(($option, index)=>{
                cy.wrap($option)
                  .should('exist')
                  .and('have.text', serviceOption[index])
                cy.log(serviceOption[index])
              })
            })
        })

      //Now if I will click the settings once again, these set of elements should not be visible
      cy.get('form > div:nth-child(3) > div > svg')
        .click()
        .wait(2000)
      //assert that the elements such as Template Name, Template Type, Partner Type, and Service Category are not visible
      cy.get('form > div:nth-child(3) > div')
        .should('have.attr', 'aria-expanded', 'false')

      //the group of element should not exist such as Template Name, Template Type, Partner Type, and Service Category
      cy.get('div.pb-6 > div')
        .should('not.exist')

      //Click the Tasks Add button, should reveal additional elements
      cy.get('div.main-content-inner2 > div > div.space-y-8 > div:nth-child(1)')
        .find(' > button')
        .click()
        .wait(2000)

      //verify there would be Enter Task Name input field
      cy.get('input[name="title"]')
        .should('exist')
        .and('not.be.disabled')
        .and('have.value', '') //empty by default
        .and('have.attr', 'placeholder', 'Enter task name')
      //verify there would be Enter task description input field
      cy.get('input[name="description"]')
        .should('exist')
        .and('not.be.disabled')
        .and('have.value', '') //empty by default
        .and('have.attr', 'placeholder', 'Enter task description')
      //verify there would be submit/check/save button icon
      cy.get('div.grid > div > button:nth-child(1)')
        .should('exist')
        .and('not.be.disabled')
        .and('have.css', 'background-color', 'rgb(0, 47, 93)') //background color
        .and('have.css', 'border-radius', '10px')
      //verify there would be delete button icon
      cy.get('div.grid > div > button:nth-child(2)')
        .should('exist')
        .and('not.be.disabled')
        .and('have.css', 'border-color', 'rgb(148, 148, 148)') //background color
        .and('have.css', 'border-radius', '10px')

      //Then if I am going to click the delete icon, the Enter Task Name, Enter Task Description, 
      //input fields and the check button including delete icon will not be visible
      cy.get('div.grid > div > button:nth-child(2)')
        .click()
        .wait(3000)

      //verify Enter Task Name input field should not be visible'
      cy.get('input[name="title"]')
        .should('not.exist')
      //verify Enter Task description input field should not be visible
      cy.get('input[name="description"]')
        .should('not.exist')
      //verify there would be delete button icon
      cy.get('div.grid > div > button:nth-child(2)')
        .should('not.exist')

      //Click the '>' Onboarding tasks
      cy.get('div.space-y-8 > div:nth-child(2) > div > div > div')
        .find(' > div > svg')
        .click()
        .wait(3000)

      //verify there would be Description column name
      cy.get('div.font-inter > p:nth-child(2)')
        .should('exist')
        .and('have.text', 'Description')
      //verify there would be Actions column name
      cy.get('div.font-inter > p:nth-child(3)')
        .should('exist')
        .and('have.text', 'Actions')
      //verify No Items
      cy.get('div.space-y-8 > div > div.bg-white > p')
        .should('exist')
        .and('have.text', 'No Items')
    
      //Now if I am going to click again the '>' Onboarding tasks, Description, Actions, and No Items should not be visible
      cy.get('div.space-y-8 > div:nth-child(2) > div > div > div')
        .find(' > div > svg')
        .click()
        .wait(3000)

      //verify there would be Description column name - should not be visible
      cy.get('div.font-inter > p:nth-child(2)')
        .should('not.exist')
      //verify there would be Actions column name - should not be visible
      cy.get('div.font-inter > p:nth-child(3)')
        .should('not.exist')
      //verify No Items - should not be visible 
      cy.get('div.space-y-8 > div > div.bg-white > p')
        .should('not.exist')

    })
    it("Testcase ID: CATM0005 - Create Task Management Recurring Template for Existing client",()=>{


      let GETHREF;
      let templatehref;

      //Login using account specialist
      cy.userlogin(loginmodule.EmailAddressInputfield, loginmodule.PasswordInputfield, loginmodule.SigninButton, testdata.userAccounts[0].accountspecialist1, testdata.userAccounts[0].accountspecialistandprojectmanagerpassword)

      //Click the Admin Navigation Module
      cy.get(modulebutton.AdminModuleButton)
        .click()
        .wait(2000)
        
      //Click the Task Management link text folder
      cy.get(linktextfolder.AdminModule[0].TaskManagement)
        .click()
        .wait(2000)
        
      //verify Page Title 'Task Management'
      cy.get(adminmodulelocator.TaskManageementFolder[0].pageTitle)
        .should('exist')
        .and('have.text', 'Task Management')
        .and('have.css', 'font-weight', '700') //font bold
        .and('have.css', 'font-size', '25px')

      //verify Add button - if found click
      cy.get(adminmodulelocator.TaskManageementFolder[0].AddButton)
        .should('exist')
        .and('not.be.disabled')
        .and('have.text', 'Add')
        .and('have.css', 'color', 'rgb(0, 47, 93)') //text color
        .and('have.css', 'border-color', 'rgb(0, 47, 93)')
        .and('have.css', 'border-radius', '40px')
        .click()
        .wait(2000)

      //verify Task List Creation Modal popup open
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].modal)
        .should('exist')

      //Select Recurring Template
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].RecurringTemplate)
        .click()
        .wait(1000)
        .should('have.css', 'border-color', 'rgb(24, 121, 216)') // the entire recurring template has blue border color signify it is seleected
        .find(' > div > div').should('have.css', 'background-color', 'rgb(24, 121, 216)') //blue dot signify it is selected
    
      //Click the Next Button
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].NextButton)
        .click()
        .wait(2000)

      //verify the Task List Creation Modal should remain open
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].modal)
        .should('exist')

      //verify the Template title text should be 'Customize your recurring template' 
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].TemplateTitleText)
        .should('exist')
        .and('have.text', 'Customize your recurring template')
        .and('have.css', 'font-weight', '700') //font bold
   
      //verify Template Name Label and Input field
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].TemplateNameLabelandInputfield)
        .should('exist')
        .within(()=>{
          //assert Label
          cy.get(' > label')
            .should('exist')
            .and('have.text', 'Template Name*')
            .find('sup').should('have.css', 'color', 'rgb(237, 46, 46)') //asterisk text color
          //assert Input field
          cy.get(' > input[name="name"]')
            .should('exist')
            .and('have.value', '') //empty by default
        })

      //verify Partner Type Label and drop down menu
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].PartnerTypeLabelandDropdownMenu)
        .should('exist')
        .within(()=>{
          //assert Label
          cy.get(' > label')
            .should('exist')
            .and('have.text', 'Partner Type *')
            .find('sup').should('have.css', 'color', 'rgb(237, 46, 46)') //asterisk text color
          //assert drop down menu
          const optionsMenu = [
            'Choose One',
            'New',
            'Existing'
          ];
          cy.get(' > div > select[name="partnerType"] > option').each(($option, index)=>{
            cy.wrap($option)
              .should('exist')
              .and('have.text', optionsMenu[index])
            cy.log(optionsMenu[index])
          });
        })

      //verify Which service category will this be used? * Label and drop down menu
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].WhichServiceCategoryWIllThisBeUsedLabelandDropdownMenu)
        .should('exist')
        .within(()=>{
          //assert Label
          cy.get(' > label')
            .should('exist')
            .and('contain', 'Which service category will this be used?')
            .find('sup').should('have.css', 'color', 'rgb(237, 46, 46)') //asterisk text color
          //assert drop down menu
          const serviceCategoryOptions = [
            'Choose One',
            'Full Account Management',
            'PPC Management',
            'Listing Content Creation',
            'Account Health Management',
            'Account Health Issue',
            'Seller Launch',
            'Account Creation',
            'Amazon Traffic Boost',
            'Advertising Management',
            'Google Advertising',
            'Meta Advertising',
            'SEO Management',
            'Website Content',
            'Mailchimp Management',
            'Website Activation'
          ];
          cy.get(' > select[name="partnerService"] > option').each(($option, index)=>{
            cy.wrap($option)
              .should('exist')
              .and('have.text', serviceCategoryOptions[index])
            cy.log(serviceCategoryOptions[index])
          });
        })

      //verify Back Button
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].BackButton)
        .should('exist')
        .and('not.be.disabled')
        .and('have.text', 'Back')
        .and('have.css', 'color', 'rgb(107, 114, 128)') //text color
        .and('have.css', 'background-color', 'rgb(255, 255, 255)') 
        .and('have.css', 'border-color', 'rgb(107, 114, 128)')
        .and('have.css', 'border-radius', '9999px')

      //verify Create Button
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].CreateButton)
        .should('exist')
        .and('not.be.disabled')
        .and('have.text', 'Create')
        .and('have.css', 'color', 'rgb(255, 255, 255)') //text color
        .and('have.css', 'background-color', 'rgb(0, 47, 93)') 
        .and('have.css', 'border-color', 'rgb(30, 58, 138)')
        .and('have.css', 'border-radius', '9999px')

      //////// CREATE EXISTING RECURRING TASKS STARTS HERE ///////////

      //Now Enter Template Name
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].TemplateNameLabelandInputfield)
        .find(' > input[name="name"]')
        .clear()
        .type('Test Existing Recurring Template')
        .wait(600)
        .should('have.value', 'Test Existing Recurring Template')

      //Select New in Partner Type
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].PartnerTypeLabelandDropdownMenu)
        .find(' > div > select[name="partnerType"]')
        .select('existing')
        .wait(600)

      //verify that the selected option goes on top
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].PartnerTypeLabelandDropdownMenu)
        .find('select option:selected')
        .should('have.text', 'Existing')

      //Select Service Category Full Account Management
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].WhichServiceCategoryWIllThisBeUsedLabelandDropdownMenu)
        .find(' > select[name="partnerService"]')
        .select('Full Account Management')
        .wait(600)

      //verify the selected service category goes on top
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].WhichServiceCategoryWIllThisBeUsedLabelandDropdownMenu)
        .find('select option:selected')
        .should('have.text', 'Full Account Management')

      ///////// CREATE EXISTING RECURRING TASKS ENDS HERE ///////////
      
      //Click Create Button
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].CreateButton)
        .click()
        .wait(2000) 

      //verify alert-success modal popup
      cy.get('div.overflow-y-auto > div.min-h-full')
        .should('exist')
        .within(()=>{
          //assert check logo
          cy.get(' > div > div > svg')
            .should('exist')
            .and('have.css', 'color', 'rgb(0, 150, 109)') //check color
          //assert message
          cy.get(' > div > div')
            .should('exist')
            .and('have.text', 'Template has been created.')
            .and('have.css', 'color', 'rgb(0, 150, 109)') //text color
            .and('have.css', 'font-weight', '400')  //font bold
        })

      //then simulate pressing esc key in your keyboard
      cy.get('body').type('{esc}');
      cy.wait(3000)
        
      //Go to Existing Onboarding
      //Verify Existing Tab if Found then click
      cy.get(adminmodulelocator.TaskManageementFolder[0].pageTab[0].ExistingTab)
        .should('exist')
        .click()
        .wait(3000)

      //Go to New > Recurring Tab
      //verify Recurring Tab and click when found
      cy.get(adminmodulelocator.TaskManageementFolder[0].pageSubTab[0].RecurringTab)
        .click()
        .wait(3000)

      //verify expected url destination
      cy.url().should('contain', 'recurring')
        
      //////// TASK MANAGEMENT > NEW > ONBOARDING TABLE LIST ASSERTIONS STARTS HERE ////////////

      //verify first column Names
      const columnNames = [
        'Template Name',
        'Partner Type',
        'Service Type',
        'Last Updated',
        'Updated By',
        'Action'
      ];
      cy.get('table > thead > tr > th').each(($column, index)=>{
        cy.wrap($column)
          .should('exist')
          .and('have.text',columnNames[index])
        cy.log(columnNames[index])
      })
      
      //Then verify row 1 each column
      cy.get('table > tbody > tr:first-child').within(()=>{
        //assert Template Name
        TaskManagementTableList.assertColumn1TemplateName(' > td:nth-child(1) > a', 'Test Existing Recurring Template')
        //I will get the href link for later assertion
        GETHREF = new Promise((resolve)=>{
          cy.get(' > td:nth-child(1) > a')
            .then(($element)=>{
              // Get the href attribute
              templatehref = $element.attr('href');
              resolve();
            })
        })
        //assert Partner Type
        TaskManagementTableList.assertColumn2PartnerType(' > td:nth-child(2)', 'existing')
        //assert Service Type
        TaskManagementTableList.assertColumn3ServiceType(' > td:nth-child(3)', 'Full Account Management')
        //assert Last Updated
        TaskManagementTableList.assertColumn4LastUpdated(' > td:nth-child(4)', DateTodayIs.TodayDateMMDDYYYY_MonthisinWholeWordandDayiswithTH())
        //assert Updated By
        TaskManagementTableList.assertColumn5UpdatedBy(' > td:nth-child(5) > div', 'LP', 'Logan Paul')
        //aasert Action:Edit
        TaskManagementTableList.assertColumn6Action(' > td:nth-child(6) > a', 'not.be.disabled', 'Edit') 
      }) 

      //////// TASK MANAGEMENT > NEW > ONBOARDING TABLE LIST ASSERTIONS ENDS HERE ////////////
        
      //Click the Edit button
      cy.get('table > tbody > tr:first-child > td:nth-child(6) > a')
        .click()
        .wait(3000)

      //verify url expected destination
      cy.get('body').then(()=>{
        GETHREF.then(()=>{
          cy.url().should('contain', templatehref)
        })
      })

      //Template Name as Title page
      cy.get('div > h3')
        .should('exist')
        .and('have.text', 'Test Existing Recurring Template')
        .and('have.css', 'font-weight', '700') //font bold

      //verify Update Button
      cy.get('form > div:nth-child(2) > button')
        .should('exist')
        .and('not.be.disabled')
        .and('have.text', 'Update')
        .and('have.css', 'font-weight', '700') //font bold
        .and('have.css', 'color', 'rgb(250, 250, 250)') //text color
        .and('have.css', 'background-color', 'rgb(0, 47, 93)') // background color
        .and('have.css', 'border-radius', '9999px')

      //verify Settings
      cy.get('form > div:nth-child(3) > div')
        .should('exist')
        .within(()=>{
          //assert Label
          cy.get(' > span')
            .should('exist')
            .and('have.text', 'Settings')
            .and('have.css', 'font-weight', '700') //font bold
          //assert the '>' symbol
          cy.get(' > svg')
            .should('exist')
            .and('have.css', 'color', 'rgb(148, 148, 148)') //text color
        })

      //Click the Settings
      cy.get('form > div:nth-child(3) > div')
        .click()
        .wait(1000)
        .should('have.attr', 'aria-expanded', 'true')

      //verify Additional elements emerged
      cy.get('div.pb-6 > div')
        .should('exist')
        .within(()=>{
          //assert Template Name Label and Input field
          cy.get(' > div:nth-child(1)')
            .should('exist')
            .within(()=>{
              //assert Template Name label
              cy.get(' > label')
                .should('exist')
                .and('have.text', 'Template Name*')
                .find('sup').should('have.css', 'color', 'rgb(237, 46, 46)') //asterisk text color
              //assert Input field
              cy.get(' > input[name="name"]')
                .should('exist')
                .and('not.be.disabled')
                .and('have.value', 'Test Existing Recurring Template')
            })
          //assert Template Type Label and drop down menu with the selected on top
          cy.get(' > div:nth-child(2)')
            .should('exist')
            .within(()=>{
              //assert Template Name Label
              cy.get(' > label')
                .should('exist')
                .and('have.text', 'Template Type*')
                .find('sup').should('have.css', 'color', 'rgb(237, 46, 46)') //asterisk text color
              //assert the drop down menu with the already selected on top
              cy.get(' > select[name="type"]')
                .should('exist')
                .and('not.be.disabled')
              const typeOption = [
                'Choose One',
                'Onboarding',
                'Roadmap',
                'Recurring',
                'One Time'
              ]
              cy.get(' > select[name="type"] > option').each(($option, index)=>{
                cy.wrap($option)
                  .should('exist')
                  .and('have.text', typeOption[index])
                cy.log(typeOption[index])
              })
            })
          //assert Partner Type Label and drop down menu
          cy.get(' > div:nth-child(3)')
            .should('exist')
            .within(()=>{
              //assert Partner Type Label
              cy.get(' > label')
                .should('exist')
                .and('have.text', 'Partner Type *')
                .find('sup').should('have.css', 'color', 'rgb(237, 46, 46)') //asterisk text color
              const partnertypeOption = [
                'Choose One',
                'New',
                'Existing'
              ]
              cy.get(' > div > select[name="partnerType"] > option').each(($option, index)=>{
                cy.wrap($option)
                  .should('exist')
                  .and('have.text', partnertypeOption[index])
                cy.log(partnertypeOption[index])
              })
            })
          //assert Service Category Label and drop down menu
          cy.get(' > div:nth-child(4)')
            .should('exist')
            .within(()=>{
              //assert Service Category Label
              cy.get(' > label')
                .should('exist')
                .and('have.text', 'Service Category*')
                .find('sup').should('have.css', 'color', 'rgb(237, 46, 46)') //asterisk text color
              //assert drop down menu
              cy.get(' > select[name="partnerService"]')
                .should('exist')
                .and('not.be.disabled')
              const serviceOption = [
                'Choose One',
                'Full Account Management',
                'PPC Management',
                'Listing Content Creation',
                'Account Health Management',
                'Account Health Issue',
                'Seller Launch',
                'Account Creation',
                'Amazon Traffic Boost',
                'Advertising Management',
                'Google Advertising',
                'Meta Advertising',
                'SEO Management',
                'Website Content',
                'Mailchimp Management',
                'Website Activation'
              ]
              cy.get(' > select[name="partnerService"] > option').each(($option, index)=>{
                cy.wrap($option)
                  .should('exist')
                  .and('have.text', serviceOption[index])
                cy.log(serviceOption[index])
              })
            })
        })

      //Click again the settings and the group elements should not be visible such as Template Name, Template Type, Partner Type, and Select Category Type
      cy.get('form > div:nth-child(3) > div > svg')
        .click()
        .wait(1000)
      cy.get('form > div:nth-child(3) > div')
        .should('have.attr', 'aria-expanded', 'false')

      //the main group element should not be visible
      cy.get('div.pb-6 > div')
        .should('not.exist')

      //verify Tasks Title and Add button
      cy.get('div.main-content-inner2 > div > div.space-y-8 > div:nth-child(1)')
        .should('exist')
        .within(()=>{
          //assert Tasks title
          cy.get(' > h4')
            .should('exist')
            .and('have.text', 'Tasks')
            .and('have.css', 'font-weight', '700') //font bold
          //assert Add button
          cy.get(' > button')
            .should('exist')
            .and('not.be.disabled')
            .and('have.text', 'Add')
            .and('have.css', 'color', 'rgb(0, 47, 93)') //text color
            .and('have.css', 'border-color', 'rgb(0, 47, 93)')
            .and('have.css', 'border-radius', '40px')
        })

      //Click the Tasks Add button
      cy.get('div.main-content-inner2 > div > div.space-y-8 > div:nth-child(1)')
        .find(' > button')
        .click()
        .wait(1000)

      //verify there would be Enter Task Name input field
      cy.get('input[name="title"]')
        .should('exist')
        .and('not.be.disabled')
        .and('have.value', '') //empty by default
        .and('have.attr', 'placeholder', 'Enter task name')
      //verify there would be Enter task description input field
      cy.get('input[name="description"]')
        .should('exist')
        .and('not.be.disabled')
        .and('have.value', '') //empty by default
        .and('have.attr', 'placeholder', 'Enter task description')
      //verify Recurring Button
      cy.get('form > div > div > div:nth-child(3)')
        .should('exist')
        .within(()=>{
          //assert Button
          cy.get(' > div > button')
            .should('exist')
            .and('not.be.disabled')
            .find(' > label').should('have.text', 'Recurring')
        })
      //verify Select Department Dropdown menu
      cy.get('select[name="department"]')
        .should('exist')
        .and('not.be.disabled')
        const departmentOptions = [
          ' Select Department',
          'SI-Operations',
          'SI-PPC',
          'SI-Writing',
          'SI-Design',
          'SI-Admin',
          'Billing',
          'Sales',
          'Lead Generation'
        ]
        cy.get('select[name="department"] > option').each(($option, index)=>{
          cy.wrap($option)
            .should('exist')
            .and('have.text', departmentOptions[index])
          cy.log(departmentOptions[index])
        })
      //verify there would be submit/check/save button icon
      cy.get('div.grid > div > button:nth-child(1)')
        .should('exist')
        .and('not.be.disabled')
        .and('have.css', 'background-color', 'rgb(0, 47, 93)') //background color
        .and('have.css', 'border-radius', '10px')
      //verify there would be delete button icon
      cy.get('div.grid > div > button:nth-child(2)')
        .should('exist')
        .and('not.be.disabled')
        .and('have.css', 'border-color', 'rgb(148, 148, 148)') //background color
        .and('have.css', 'border-radius', '10px')

      //Click again the delete icon and it would not be visible the Enter Task Name, Enter Task Description, Recurring button, and Department drop down menu
      cy.get('div.grid > div > button:nth-child(2)')
        .click()
        .wait(1000)

      //verify there would be Enter Task Name input field - should not be visible
      cy.get('input[name="title"]')
        .should('not.exist')
      //verify Select Department Dropdown menu - should not be visible
      cy.get('select[name="department"]')
        .should('not.exist')
      //verify Recurring Button - should not be visible
      cy.get('form > div > div > div:nth-child(3)')
        .should('not.exist')
      //verify Select Department Dropdown menu - should not be visible
      cy.get('select[name="department"]')
        .should('not.exist')
      //verify there would be submit/check/save button icon - should not be visible
      cy.get('div.grid > div > button:nth-child(1)')
        .should('not.exist')
      //verify there would be delete button icon - should not be visible
      cy.get('div.grid > div > button:nth-child(2)')
        .should('not.exist')

      ////////// SI-OPERATIONS ASSERTIONS STARTS HERE /////////////

      //verify SI-Operations
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(1)')
        .should('exist')
        .within(()=>{
          //assert the button left beside the SI-Operations Title
          cy.get(' > div > div > div')
            .should('exist')
            .and('not.be.disabled')
          //assert SI-Operations title
          cy.get(' > div > div > p > span')
            .should('exist')
            .and('have.text', 'SI-Operations')
            .and('have.css', 'font-weight', '700') //font bold
        })

      //Now I click the SI-Operations - it should reveal additional within elements
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(1)')
        .click()
        .wait(1000)
        .within(()=>{
          //assert Description, Recurring, Department, and Actions column names
          const operationcolNames = [
            'Description',
            'Recurring',
            'Department',
            'Actions'
          ]
          cy.get(' > div:nth-child(1) > p').each(($option, index)=>{
            cy.wrap($option)
              .should('exist')
              .and('have.text', operationcolNames[index])
            cy.log(operationcolNames[index])
          })
          //assert No Items
          cy.get(' > div:nth-child(2) > p')
            .should('exist')
            .and('have.text', 'No Items')
        })
      
      //Click again the SI-Operations - it should hide the additional elements within
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(1)')
        .find(' > div > div > div')
        .click()
        .wait(1000)
        
      //verify Description column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(1) > div:nth-child(1) > p:nth-child(2)')
        .should('not.exist')
      //verify Recurring column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(1) > div:nth-child(1) > p:nth-child(3)')
        .should('not.exist')
      //verify Department column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(1) > div:nth-child(1) > p:nth-child(4)')
        .should('not.exist')
      //verify Action column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(1) > div:nth-child(1) > p:nth-child(5)')
        .should('not.exist')
      //verify No Items should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(1) > div:nth-child(2) > p')
        .should('not.exist')

      ////////// SI-OPERATIONS ASSERTIONS ENDS HERE /////////////  

      ////////// SI-PPC ASSERTIONS STARTS HERE /////////////

      //verify SI-PPC
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(2)')
        .should('exist')
        .within(()=>{
          //assert the button left beside the SI-PPC Title
          cy.get(' > div > div > div')
            .should('exist')
            .and('not.be.disabled')
          //assert SI-PPC title
          cy.get(' > div > div > p > span')
            .should('exist')
            .and('have.text', 'SI-PPC')
            .and('have.css', 'font-weight', '700') //font bold
        })

      //Click the SI-PPC - it should reveal additional within element
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(2)')
        .click()
        .wait(1000)
        .within(()=>{
          //assert Description, Recurring, Department, and Actions column names
          const operationcolNames = [
            'Description',
            'Recurring',
            'Department',
            'Actions'
          ]
          cy.get(' > div:nth-child(1) > p').each(($option, index)=>{
            cy.wrap($option)
              .should('exist')
              .and('have.text', operationcolNames[index])
            cy.log(operationcolNames[index])
          })
          //assert No Items
          cy.get(' > div:nth-child(2) > p')
            .should('exist')
            .and('have.text', 'No Items')
          //assert No Items
          cy.get(' > div:nth-child(2) > p')
            .should('exist')
            .and('have.text', 'No Items')
        })

      //Then click again the SI-PPC - it should hide the additional elements within
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(2)')
        .find(' > div > div > div')
        .click()
        .wait(1000)

      //verify Description column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(2) > div:nth-child(1) > p:nth-child(2)')
        .should('not.exist')
      //verify Recurring column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(2) > div:nth-child(1) > p:nth-child(3)')
        .should('not.exist')
      //verify Department column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(2) > div:nth-child(1) > p:nth-child(4)')
        .should('not.exist')
      //verify Action column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(2) > div:nth-child(1) > p:nth-child(5)')
        .should('not.exist')
      //verify No Items should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(2) > div:nth-child(2) > p')
        .should('not.exist')

      ////////// SI-PPC ASSERTIONS ENDS HERE /////////////

      ////////// SI-Writing ASSERTIONS STARTS HERE /////////////

      //verify SI-Writing
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3)')
        .should('exist')
        .within(()=>{
          //assert the button left beside the SI-PPC Title
          cy.get(' > div > div > div')
            .should('exist')
            .and('not.be.disabled')
          //assert SI-PPC title
          cy.get(' > div > div > p > span')
            .should('exist')
            .and('have.text', 'SI-Writing')
            .and('have.css', 'font-weight', '700') //font bold
        })

      //Click SI-Writing - it should reveal additional within element
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3)')
        .click()
        .wait(1000)
        .within(()=>{
          //assert Description, Recurring, Department, and Actions column names
          const operationcolNames = [
            'Description',
            'Recurring',
            'Department',
            'Actions'
          ]
          cy.get(' > div:nth-child(1) > p').each(($option, index)=>{
            cy.wrap($option)
              .should('exist')
              .and('have.text', operationcolNames[index])
            cy.log(operationcolNames[index])
          })
          //assert No Items
          cy.get(' > div:nth-child(2) > p')
            .should('exist')
            .and('have.text', 'No Items')
          //assert No Items
          cy.get(' > div:nth-child(2) > p')
            .should('exist')
            .and('have.text', 'No Items')
        })

      //Now Click again SI-Writing - it should hide the additional elements within
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3)')
        .find(' > div > div > div')
        .click()
        .wait(1000)

      //verify Description column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(2)')
        .should('not.exist')
      //verify Recurring column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(3)')
        .should('not.exist')
      //verify Department column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(4)')
        .should('not.exist')
      //verify Action column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(5)')
        .should('not.exist')
      //verify No Items should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(2) > p')
        .should('not.exist')

      ////////// SI-Writing ASSERTIONS ENDS HERE /////////////

      ////////// SI-Design ASSERTIONS STARTS HERE /////////////

      //verify SI-Design
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(4)')
        .should('exist')
        .within(()=>{
          //assert the button left beside the SI-PPC Title
          cy.get(' > div > div > div')
            .should('exist')
            .and('not.be.disabled')
          //assert SI-PPC title
          cy.get(' > div > div > p > span')
            .should('exist')
            .and('have.text', 'SI-Design')
            .and('have.css', 'font-weight', '700') //font bold
        })

      //Click the SI_Design - it should reveal additional within element
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(4)')
        .click()
        .wait(1000)
        .within(()=>{
          //assert Description, Recurring, Department, and Actions column names
          const operationcolNames = [
            'Description',
            'Recurring',
            'Department',
            'Actions'
          ]
          cy.get(' > div:nth-child(1) > p').each(($option, index)=>{
            cy.wrap($option)
              .should('exist')
              .and('have.text', operationcolNames[index])
            cy.log(operationcolNames[index])
          })
          //assert No Items
          cy.get(' > div:nth-child(2) > p')
            .should('exist')
            .and('have.text', 'No Items')
          //assert No Items
          cy.get(' > div:nth-child(2) > p')
            .should('exist')
            .and('have.text', 'No Items')
        })

      //Click again SI-Design - it should hide the additional elements within
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(4)')
        .find(' > div > div > div')
        .click()
        .wait(1000)

      //verify Description column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(2)')
        .should('not.exist')
      //verify Recurring column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(3)')
        .should('not.exist')
      //verify Department column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(4)')
        .should('not.exist')
      //verify Action column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(5)')
        .should('not.exist')
      //verify No Items should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(2) > p')
        .should('not.exist')

      ////////// SI-Design ASSERTIONS ENDS HERE /////////////
      
      ////////// SI-Admin ASSERTIONS STARTS HERE /////////////

      //verify SI-Admin
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(5)')
        .should('exist')
        .within(()=>{
          //assert the button left beside the SI-PPC Title
          cy.get(' > div > div > div')
            .should('exist')
            .and('not.be.disabled')
          //assert SI-PPC title
          cy.get(' > div > div > p > span')
            .should('exist')
            .and('have.text', 'SI-Admin')
            .and('have.css', 'font-weight', '700') //font bold
        })

      //Click the SI-Admin - it should reveal additional within element
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(5)')
        .click()
        .wait(1000)
        .within(()=>{
          //assert Description, Recurring, Department, and Actions column names
          const operationcolNames = [
            'Description',
            'Recurring',
            'Department',
            'Actions'
          ]
          cy.get(' > div:nth-child(1) > p').each(($option, index)=>{
            cy.wrap($option)
              .should('exist')
              .and('have.text', operationcolNames[index])
            cy.log(operationcolNames[index])
          })
          //assert No Items
          cy.get(' > div:nth-child(2) > p')
            .should('exist')
            .and('have.text', 'No Items')
          //assert No Items
          cy.get(' > div:nth-child(2) > p')
            .should('exist')
            .and('have.text', 'No Items')
        })

      //Click again the SI-Admin - it should hide the additional elements within
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(5)')
        .find(' > div > div > div')
        .click()
        .wait(1000)

      //verify Description column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(2)')
        .should('not.exist')
      //verify Recurring column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(3)')
        .should('not.exist')
      //verify Department column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(4)')
        .should('not.exist')
      //verify Action column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(5)')
        .should('not.exist')
      //verify No Items should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(2) > p')
        .should('not.exist')

      ////////// SI-Admin ASSERTIONS ENDS HERE /////////////

      ////////// Billing ASSERTIONS STARTS HERE ////////////

      //verify Billing
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(6)')
        .should('exist')
        .within(()=>{
          //assert the button left beside the SI-PPC Title
          cy.get(' > div > div > div')
            .should('exist')
            .and('not.be.disabled')
          //assert SI-PPC title
          cy.get(' > div > div > p > span')
            .should('exist')
            .and('have.text', 'Billing')
            .and('have.css', 'font-weight', '700') //font bold
        })

      //Click Billing - it should reveal additional within element
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(6)')
        .click()
        .wait(1000)
        .within(()=>{
          //assert Description, Recurring, Department, and Actions column names
          const operationcolNames = [
            'Description',
            'Recurring',
            'Department',
            'Actions'
          ]
          cy.get(' > div:nth-child(1) > p').each(($option, index)=>{
            cy.wrap($option)
              .should('exist')
              .and('have.text', operationcolNames[index])
            cy.log(operationcolNames[index])
          })
          //assert No Items
          cy.get(' > div:nth-child(2) > p')
            .should('exist')
            .and('have.text', 'No Items')
          //assert No Items
          cy.get(' > div:nth-child(2) > p')
            .should('exist')
            .and('have.text', 'No Items')
        })

      //Click again Billing - it should hide the additional elements within
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(6)')
        .find(' > div > div > div')
        .click()
        .wait(1000)

      //verify Description column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(2)')
        .should('not.exist')
      //verify Recurring column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(3)')
        .should('not.exist')
      //verify Department column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(4)')
        .should('not.exist')
      //verify Action column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(5)')
        .should('not.exist')
      //verify No Items should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(2) > p')
        .should('not.exist')

      ////////// Billing ASSERTIONS ENDS HERE /////////////

      ////////// Sales ASSERTIONS STARTS HERE /////////////

      //verify Sales
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(7)')
        .should('exist')
        .within(()=>{
          //assert the button left beside the SI-PPC Title
          cy.get(' > div > div > div')
            .should('exist')
            .and('not.be.disabled')
          //assert SI-PPC title
          cy.get(' > div > div > p > span')
            .should('exist')
            .and('have.text', 'Sales')
            .and('have.css', 'font-weight', '700') //font bold
        })

      //Click Sales - it should reveal additional within element
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(7)')
        .click()
        .wait(1000)
        .within(()=>{
          //assert Description, Recurring, Department, and Actions column names
          const operationcolNames = [
            'Description',
            'Recurring',
            'Department',
            'Actions'
          ]
          cy.get(' > div:nth-child(1) > p').each(($option, index)=>{
            cy.wrap($option)
              .should('exist')
              .and('have.text', operationcolNames[index])
            cy.log(operationcolNames[index])
          })
          //assert No Items
          cy.get(' > div:nth-child(2) > p')
            .should('exist')
            .and('have.text', 'No Items')
          //assert No Items
          cy.get(' > div:nth-child(2) > p')
            .should('exist')
            .and('have.text', 'No Items')
        })

      //Click again Sales - it should hide the additional elements within
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(7)')
        .find(' > div > div > div')
        .click()
        .wait(1000)

      //verify Description column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(2)')
        .should('not.exist')
      //verify Recurring column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(3)')
        .should('not.exist')
      //verify Department column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(4)')
        .should('not.exist')
      //verify Action column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(5)')
        .should('not.exist')
      //verify No Items should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(2) > p')
        .should('not.exist')

      ////////// Sales ASSERTIONS ENDS HERE /////////////

      ////////// Lead Generation ASSERTIONS STARTS HERE /////////////

      //verify Lead Generation
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(8)')
        .should('exist')
        .within(()=>{
          //assert the button left beside the SI-PPC Title
          cy.get(' > div > div > div')
            .should('exist')
            .and('not.be.disabled')
          //assert SI-PPC title
          cy.get(' > div > div > p > span')
            .should('exist')
            .and('have.text', 'Lead Generation')
            .and('have.css', 'font-weight', '700') //font bold
        })

      //Click Lead Generation - it should reveal additional within element
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(8)')
        .click()
        .wait(1000)
        .within(()=>{
          //assert Description, Recurring, Department, and Actions column names
          const operationcolNames = [
            'Description',
            'Recurring',
            'Department',
            'Actions'
          ]
          cy.get(' > div:nth-child(1) > p').each(($option, index)=>{
            cy.wrap($option)
              .should('exist')
              .and('have.text', operationcolNames[index])
            cy.log(operationcolNames[index])
          })
          //assert No Items
          cy.get(' > div:nth-child(2) > p')
            .should('exist')
            .and('have.text', 'No Items')
          //assert No Items
          cy.get(' > div:nth-child(2) > p')
            .should('exist')
            .and('have.text', 'No Items')
        })

      //Click again Lead Generation - it should hide the additional elements within
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(8)')
        .find(' > div > div > div')
        .click()
        .wait(1000)

      //verify Description column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(2)')
        .should('not.exist')
      //verify Recurring column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(3)')
        .should('not.exist')
      //verify Department column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(4)')
        .should('not.exist')
      //verify Action column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(5)')
        .should('not.exist')
      //verify No Items should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(2) > p')
        .should('not.exist')

      ////////// Lead Generation ASSERTIONS ENDS HERE /////////////


    })
    it("Testcase ID: CATM0006 - Create Task Management One Time Template for Existing client",()=>{


      let GETHREF;
      let templatehref;

      //Login using account specialist
      cy.userlogin(loginmodule.EmailAddressInputfield, loginmodule.PasswordInputfield, loginmodule.SigninButton, testdata.userAccounts[0].accountspecialist1, testdata.userAccounts[0].accountspecialistandprojectmanagerpassword)

      //Click the Admin Navigation Module
      cy.get(modulebutton.AdminModuleButton)
        .click()
        .wait(2000)
        
      //Click the Task Management link text folder
      cy.get(linktextfolder.AdminModule[0].TaskManagement)
        .click()
        .wait(2000)
      
      //verify Page Title 'Task Management'
      cy.get(adminmodulelocator.TaskManageementFolder[0].pageTitle)
        .should('exist')
        .and('have.text', 'Task Management')
        .and('have.css', 'font-weight', '700') //font bold
        .and('have.css', 'font-size', '25px')

      //verify Add button - if found click
      cy.get(adminmodulelocator.TaskManageementFolder[0].AddButton)
        .should('exist')
        .and('not.be.disabled')
        .and('have.text', 'Add')
        .and('have.css', 'color', 'rgb(0, 47, 93)') //text color
        .and('have.css', 'border-color', 'rgb(0, 47, 93)')
        .and('have.css', 'border-radius', '40px')
        .click()
        .wait(2000)

      //verify Task List Creation Modal popup open
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].modal)
        .should('exist')

      //Select One Time Template
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].OneTimeTemplate)
        .click()
        .wait(1000)
        .should('have.css', 'border-color', 'rgb(24, 121, 216)') // the entire recurring template has blue border color signify it is seleected
        .find(' > div > div').should('have.css', 'background-color', 'rgb(24, 121, 216)') //blue dot signify it is selected
    
      //Click the Next Button
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].NextButton)
        .click()
        .wait(2000)

      //verify the Task List Creation Modal should remain open
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].modal)
        .should('exist')

      //verify the Template title text should be 'Customize your recurring template' 
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].TemplateTitleText)
        .should('exist')
        .and('have.text', 'Customize your one-time template')
        .and('have.css', 'font-weight', '700') //font bold
   
      //verify Template Name Label and Input field
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].TemplateNameLabelandInputfield)
        .should('exist')
        .within(()=>{
          //assert Label
          cy.get(' > label')
            .should('exist')
            .and('have.text', 'Template Name*')
            .find('sup').should('have.css', 'color', 'rgb(237, 46, 46)') //asterisk text color
          //assert Input field
          cy.get(' > input[name="name"]')
            .should('exist')
            .and('have.value', '') //empty by default
        })

      //verify Partner Type Label and drop down menu
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].PartnerTypeLabelandDropdownMenu)
        .should('exist')
        .within(()=>{
          //assert Label
          cy.get(' > label')
            .should('exist')
            .and('have.text', 'Partner Type *')
            .find('sup').should('have.css', 'color', 'rgb(237, 46, 46)') //asterisk text color
          //assert drop down menu
          const optionsMenu = [
            'Choose One',
            'New',
            'Existing'
          ];
          cy.get(' > div > select[name="partnerType"] > option').each(($option, index)=>{
            cy.wrap($option)
              .should('exist')
              .and('have.text', optionsMenu[index])
            cy.log(optionsMenu[index])
          });
        })

      //verify Which service category will this be used? * Label and drop down menu
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].WhichServiceCategoryWIllThisBeUsedLabelandDropdownMenu)
        .should('exist')
        .within(()=>{
          //assert Label
          cy.get(' > label')
            .should('exist')
            .and('contain', 'Which service category will this be used?')
            .find('sup').should('have.css', 'color', 'rgb(237, 46, 46)') //asterisk text color
          //assert drop down menu
          const serviceCategoryOptions = [
            'Choose One',
            'Full Account Management',
            'PPC Management',
            'Listing Content Creation',
            'Account Health Management',
            'Account Health Issue',
            'Seller Launch',
            'Account Creation',
            'Amazon Traffic Boost',
            'Advertising Management',
            'Google Advertising',
            'Meta Advertising',
            'SEO Management',
            'Website Content',
            'Mailchimp Management',
            'Website Activation'
          ];
          cy.get(' > select[name="partnerService"] > option').each(($option, index)=>{
            cy.wrap($option)
              .should('exist')
              .and('have.text', serviceCategoryOptions[index])
            cy.log(serviceCategoryOptions[index])
          });
        })

      //verify Back Button
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].BackButton)
        .should('exist')
        .and('not.be.disabled')
        .and('have.text', 'Back')
        .and('have.css', 'color', 'rgb(107, 114, 128)') //text color
        .and('have.css', 'background-color', 'rgb(255, 255, 255)') 
        .and('have.css', 'border-color', 'rgb(107, 114, 128)')
        .and('have.css', 'border-radius', '9999px')

      //verify Create Button
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].CreateButton)
        .should('exist')
        .and('not.be.disabled')
        .and('have.text', 'Create')
        .and('have.css', 'color', 'rgb(255, 255, 255)') //text color
        .and('have.css', 'background-color', 'rgb(0, 47, 93)') 
        .and('have.css', 'border-color', 'rgb(30, 58, 138)')
        .and('have.css', 'border-radius', '9999px')

      //////// CREATE NEW ONE-TIME TASKS STARTS HERE ///////////

      //Now Enter Template Name
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].TemplateNameLabelandInputfield)
        .find(' > input[name="name"]')
        .clear()
        .type('Test Existing One-Time Template')
        .wait(600)
        .should('have.value', 'Test Existing One-Time Template')

      //Select New in Partner Type
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].PartnerTypeLabelandDropdownMenu)
        .find(' > div > select[name="partnerType"]')
        .select('existing')
        .wait(600)

      //verify that the selected option goes on top
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].PartnerTypeLabelandDropdownMenu)
        .find('select option:selected')
        .should('have.text', 'Existing')

      //Select Service Category Full Account Management
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].WhichServiceCategoryWIllThisBeUsedLabelandDropdownMenu)
        .find(' > select[name="partnerService"]')
        .select('Full Account Management')
        .wait(600)

      //verify the selected service category goes on top
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].WhichServiceCategoryWIllThisBeUsedLabelandDropdownMenu)
        .find('select option:selected')
        .should('have.text', 'Full Account Management')

      ///////// CREATE NEW ONE-TIME TASKS ENDS HERE ///////////
      
      //Click Create Button
      cy.get(adminmodulelocator.TaskManageementFolder[0].TaskListCreationModal[0].CreateButton)
        .click()
        .wait(2000) 

      //verify alert-success modal popup
      cy.get('div.overflow-y-auto > div.min-h-full')
        .should('exist')
        .within(()=>{
          //assert check logo
          cy.get(' > div > div > svg')
            .should('exist')
            .and('have.css', 'color', 'rgb(0, 150, 109)') //check color
          //assert message
          cy.get(' > div > div')
            .should('exist')
            .and('have.text', 'Template has been created.')
            .and('have.css', 'color', 'rgb(0, 150, 109)') //text color
            .and('have.css', 'font-weight', '400')  //font bold
        })

      //then simulate pressing esc key in your keyboard
      cy.get('body').type('{esc}');
      cy.wait(3000)

      //Go to Existing Onboarding
      //Verify Existing Tab if Found then click
      cy.get(adminmodulelocator.TaskManageementFolder[0].pageTab[0].ExistingTab)
        .should('exist')
        .click()
        .wait(3000)
        
      //Go to New > One Time Tab
      //verify One Time and click when found
      cy.get(adminmodulelocator.TaskManageementFolder[0].pageSubTab[0].OneTimeTab)
        .click()
        .wait(3000)

      //verify expected url destination
      cy.url().should('contain', 'one-time')
        
      //////// TASK MANAGEMENT > NEW > ONBOARDING TABLE LIST ASSERTIONS STARTS HERE ////////////

      //verify first column Names
      const columnNames = [
        'Template Name',
        'Partner Type',
        'Service Type',
        'Last Updated',
        'Updated By',
        'Action'
      ];
      cy.get('table > thead > tr > th').each(($column, index)=>{
        cy.wrap($column)
          .should('exist')
          .and('have.text',columnNames[index])
        cy.log(columnNames[index])
      })
      
      //Then verify row 1 each column
      cy.get('table > tbody > tr:first-child').within(()=>{
        //assert Template Name
        TaskManagementTableList.assertColumn1TemplateName(' > td:nth-child(1) > a', 'Test Existing One-Time Template')
        //I will get the href link for later assertion
        GETHREF = new Promise((resolve)=>{
          cy.get(' > td:nth-child(1) > a')
            .then(($element)=>{
              // Get the href attribute
              templatehref = $element.attr('href');
              resolve();
            })
        })
        //assert Partner Type
        TaskManagementTableList.assertColumn2PartnerType(' > td:nth-child(2)', 'existing')
        //assert Service Type
        TaskManagementTableList.assertColumn3ServiceType(' > td:nth-child(3)', 'Full Account Management')
        //assert Last Updated
        TaskManagementTableList.assertColumn4LastUpdated(' > td:nth-child(4)', DateTodayIs.TodayDateMMDDYYYY_MonthisinWholeWordandDayiswithTH())
        //assert Updated By
        TaskManagementTableList.assertColumn5UpdatedBy(' > td:nth-child(5) > div', 'LP', 'Logan Paul')
        //aasert Action:Edit
        TaskManagementTableList.assertColumn6Action(' > td:nth-child(6) > a', 'not.be.disabled', 'Edit') 
      }) 

      //////// TASK MANAGEMENT > NEW > ONBOARDING TABLE LIST ASSERTIONS ENDS HERE ////////////
        
      //Click the Edit button
      cy.get('table > tbody > tr:first-child > td:nth-child(6) > a')
        .click()
        .wait(3000)

      //verify url expected destination
      cy.get('body').then(()=>{
        GETHREF.then(()=>{
          cy.url().should('contain', templatehref)
        })
      })

      //Template Name as Title page
      cy.get('div > h3')
        .should('exist')
        .and('have.text', 'Test Existing One-Time Template')
        .and('have.css', 'font-weight', '700') //font bold

      //verify Update Button
      cy.get('form > div:nth-child(2) > button')
        .should('exist')
        .and('not.be.disabled')
        .and('have.text', 'Update')
        .and('have.css', 'font-weight', '700') //font bold
        .and('have.css', 'color', 'rgb(250, 250, 250)') //text color
        .and('have.css', 'background-color', 'rgb(0, 47, 93)') // background color
        .and('have.css', 'border-radius', '9999px')

      //verify Settings
      cy.get('form > div:nth-child(3) > div')
        .should('exist')
        .within(()=>{
          //assert Label
          cy.get(' > span')
            .should('exist')
            .and('have.text', 'Settings')
            .and('have.css', 'font-weight', '700') //font bold
          //assert the '>' symbol
          cy.get(' > svg')
            .should('exist')
            .and('have.css', 'color', 'rgb(148, 148, 148)') //text color
        })

      //Click the Settings
      cy.get('form > div:nth-child(3) > div')
        .click()
        .wait(1000)
        .should('have.attr', 'aria-expanded', 'true')

      //verify Additional elements emerged
      cy.get('div.pb-6 > div')
        .should('exist')
        .within(()=>{
          //assert Template Name Label and Input field
          cy.get(' > div:nth-child(1)')
            .should('exist')
            .within(()=>{
              //assert Template Name label
              cy.get(' > label')
                .should('exist')
                .and('have.text', 'Template Name*')
                .find('sup').should('have.css', 'color', 'rgb(237, 46, 46)') //asterisk text color
              //assert Input field
              cy.get(' > input[name="name"]')
                .should('exist')
                .and('not.be.disabled')
                .and('have.value', 'Test Existing One-Time Template')
            })
          //assert Template Type Label and drop down menu with the selected on top
          cy.get(' > div:nth-child(2)')
            .should('exist')
            .within(()=>{
              //assert Template Name Label
              cy.get(' > label')
                .should('exist')
                .and('have.text', 'Template Type*')
                .find('sup').should('have.css', 'color', 'rgb(237, 46, 46)') //asterisk text color
              //assert the drop down menu with the already selected on top
              cy.get(' > select[name="type"]')
                .should('exist')
                .and('not.be.disabled')
              const typeOption = [
                'Choose One',
                'Onboarding',
                'Roadmap',
                'Recurring',
                'One Time'
              ]
              cy.get(' > select[name="type"] > option').each(($option, index)=>{
                cy.wrap($option)
                  .should('exist')
                  .and('have.text', typeOption[index])
                cy.log(typeOption[index])
              })
            })
          //assert Partner Type Label and drop down menu
          cy.get(' > div:nth-child(3)')
            .should('exist')
            .within(()=>{
              //assert Partner Type Label
              cy.get(' > label')
                .should('exist')
                .and('have.text', 'Partner Type *')
                .find('sup').should('have.css', 'color', 'rgb(237, 46, 46)') //asterisk text color
              const partnertypeOption = [
                'Choose One',
                'New',
                'Existing'
              ]
              cy.get(' > div > select[name="partnerType"] > option').each(($option, index)=>{
                cy.wrap($option)
                  .should('exist')
                  .and('have.text', partnertypeOption[index])
                cy.log(partnertypeOption[index])
              })
            })
          //assert Service Category Label and drop down menu
          cy.get(' > div:nth-child(4)')
            .should('exist')
            .within(()=>{
              //assert Service Category Label
              cy.get(' > label')
                .should('exist')
                .and('have.text', 'Service Category*')
                .find('sup').should('have.css', 'color', 'rgb(237, 46, 46)') //asterisk text color
              //assert drop down menu
              cy.get(' > select[name="partnerService"]')
                .should('exist')
                .and('not.be.disabled')
              const serviceOption = [
                'Choose One',
                'Full Account Management',
                'PPC Management',
                'Listing Content Creation',
                'Account Health Management',
                'Account Health Issue',
                'Seller Launch',
                'Account Creation',
                'Amazon Traffic Boost',
                'Advertising Management',
                'Google Advertising',
                'Meta Advertising',
                'SEO Management',
                'Website Content',
                'Mailchimp Management',
                'Website Activation'
              ]
              cy.get(' > select[name="partnerService"] > option').each(($option, index)=>{
                cy.wrap($option)
                  .should('exist')
                  .and('have.text', serviceOption[index])
                cy.log(serviceOption[index])
              })
            })
        })

      //Click again the settings and the group elements should not be visible such as Template Name, Template Type, Partner Type, and Select Category Type
      cy.get('form > div:nth-child(3) > div > svg')
        .click()
        .wait(1000)
      cy.get('form > div:nth-child(3) > div')
        .should('have.attr', 'aria-expanded', 'false')

      //the main group element should not be visible
      cy.get('div.pb-6 > div')
        .should('not.exist')

      //verify Tasks Title and Add button
      cy.get('div.main-content-inner2 > div > div.space-y-8 > div:nth-child(1)')
        .should('exist')
        .within(()=>{
          //assert Tasks title
          cy.get(' > h4')
            .should('exist')
            .and('have.text', 'Tasks')
            .and('have.css', 'font-weight', '700') //font bold
          //assert Add button
          cy.get(' > button')
            .should('exist')
            .and('not.be.disabled')
            .and('have.text', 'Add')
            .and('have.css', 'color', 'rgb(0, 47, 93)') //text color
            .and('have.css', 'border-color', 'rgb(0, 47, 93)')
            .and('have.css', 'border-radius', '40px')
        })

      //Click the Tasks Add button
      cy.get('div.main-content-inner2 > div > div.space-y-8 > div:nth-child(1)')
        .find(' > button')
        .click()
        .wait(1000)

      //verify there would be Enter Task Name input field
      cy.get('input[name="title"]')
        .should('exist')
        .and('not.be.disabled')
        .and('have.value', '') //empty by default
        .and('have.attr', 'placeholder', 'Enter task name')
      //verify there would be Enter task description input field
      cy.get('input[name="description"]')
        .should('exist')
        .and('not.be.disabled')
        .and('have.value', '') //empty by default
        .and('have.attr', 'placeholder', 'Enter task description')
      //verify Select Department Dropdown menu
      cy.get('select[name="department"]')
        .should('exist')
        .and('not.be.disabled')
        const departmentOptions = [
          ' Select Department',
          'SI-Operations',
          'SI-PPC',
          'SI-Writing',
          'SI-Design',
          'SI-Admin',
          'Billing',
          'Sales',
          'Lead Generation'
        ]
        cy.get('select[name="department"] > option').each(($option, index)=>{
          cy.wrap($option)
            .should('exist')
            .and('have.text', departmentOptions[index])
          cy.log(departmentOptions[index])
        })
      //verify there would be submit/check/save button icon
      cy.get('div.grid > div > button:nth-child(1)')
        .should('exist')
        .and('not.be.disabled')
        .and('have.css', 'background-color', 'rgb(0, 47, 93)') //background color
        .and('have.css', 'border-radius', '10px')
      //verify there would be delete button icon
      cy.get('div.grid > div > button:nth-child(2)')
        .should('exist')
        .and('not.be.disabled')
        .and('have.css', 'border-color', 'rgb(148, 148, 148)') //background color
        .and('have.css', 'border-radius', '10px')

      //Click again the delete icon and it would not be visible the Enter Task Name, Enter Task Description, Recurring button, and Department drop down menu
      cy.get('div.grid > div > button:nth-child(2)')
        .click()
        .wait(1000)

      //verify there would be Enter Task Name input field - should not be visible
      cy.get('input[name="title"]')
        .should('not.exist')
      //verify Select Department Dropdown menu - should not be visible
      cy.get('select[name="department"]')
        .should('not.exist')
      //verify Recurring Button - should not be visible
      cy.get('form > div > div > div:nth-child(3)')
        .should('not.exist')
      //verify Select Department Dropdown menu - should not be visible
      cy.get('select[name="department"]')
        .should('not.exist')
      //verify there would be submit/check/save button icon - should not be visible
      cy.get('div.grid > div > button:nth-child(1)')
        .should('not.exist')
      //verify there would be delete button icon - should not be visible
      cy.get('div.grid > div > button:nth-child(2)')
        .should('not.exist')

      ////////// SI-OPERATIONS ASSERTIONS STARTS HERE /////////////

      //verify SI-Operations
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(1)')
        .should('exist')
        .within(()=>{
          //assert the button left beside the SI-Operations Title
          cy.get(' > div > div > div')
            .should('exist')
            .and('not.be.disabled')
          //assert SI-Operations title
          cy.get(' > div > div > p > span')
            .should('exist')
            .and('have.text', 'SI-Operations')
            .and('have.css', 'font-weight', '700') //font bold
        })

      //Now I click the SI-Operations - it should reveal additional within elements
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(1)')
        .click()
        .wait(1000)
        .within(()=>{
          //assert Description, Recurring, Department, and Actions column names
          const operationcolNames = [
            'Description',
            'Department',
            'Actions'
          ]
          cy.get(' > div:nth-child(1) > p').each(($option, index)=>{
            cy.wrap($option)
              .should('exist')
              .and('have.text', operationcolNames[index])
            cy.log(operationcolNames[index])
          })
          //assert No Items
          cy.get(' > div:nth-child(2) > p')
            .should('exist')
            .and('have.text', 'No Items')
        })
      
      //Click again the SI-Operations - it should hide the additional elements within
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(1)')
        .find(' > div > div > div')
        .click()
        .wait(1000)
        
      //verify Description column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(1) > div:nth-child(1) > p:nth-child(2)')
        .should('not.exist')
      //verify Recurring column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(1) > div:nth-child(1) > p:nth-child(3)')
        .should('not.exist')
      //verify Department column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(1) > div:nth-child(1) > p:nth-child(4)')
        .should('not.exist')
      //verify Action column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(1) > div:nth-child(1) > p:nth-child(5)')
        .should('not.exist')
      //verify No Items should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(1) > div:nth-child(2) > p')
        .should('not.exist')

      ////////// SI-OPERATIONS ASSERTIONS ENDS HERE /////////////  

      ////////// SI-PPC ASSERTIONS STARTS HERE /////////////

      //verify SI-PPC
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(2)')
        .should('exist')
        .within(()=>{
          //assert the button left beside the SI-PPC Title
          cy.get(' > div > div > div')
            .should('exist')
            .and('not.be.disabled')
          //assert SI-PPC title
          cy.get(' > div > div > p > span')
            .should('exist')
            .and('have.text', 'SI-PPC')
            .and('have.css', 'font-weight', '700') //font bold
        })

      //Click the SI-PPC - it should reveal additional within element
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(2)')
        .click()
        .wait(1000)
        .within(()=>{
          //assert Description, Recurring, Department, and Actions column names
          const operationcolNames = [
            'Description',
            'Department',
            'Actions'
          ]
          cy.get(' > div:nth-child(1) > p').each(($option, index)=>{
            cy.wrap($option)
              .should('exist')
              .and('have.text', operationcolNames[index])
            cy.log(operationcolNames[index])
          })
          //assert No Items
          cy.get(' > div:nth-child(2) > p')
            .should('exist')
            .and('have.text', 'No Items')
          //assert No Items
          cy.get(' > div:nth-child(2) > p')
            .should('exist')
            .and('have.text', 'No Items')
        })

      //Then click again the SI-PPC - it should hide the additional elements within
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(2)')
        .find(' > div > div > div')
        .click()
        .wait(1000)

      //verify Description column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(2) > div:nth-child(1) > p:nth-child(2)')
        .should('not.exist')
      //verify Recurring column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(2) > div:nth-child(1) > p:nth-child(3)')
        .should('not.exist')
      //verify Department column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(2) > div:nth-child(1) > p:nth-child(4)')
        .should('not.exist')
      //verify Action column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(2) > div:nth-child(1) > p:nth-child(5)')
        .should('not.exist')
      //verify No Items should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(2) > div:nth-child(2) > p')
        .should('not.exist')

      ////////// SI-PPC ASSERTIONS ENDS HERE /////////////

      ////////// SI-Writing ASSERTIONS STARTS HERE /////////////

      //verify SI-Writing
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3)')
        .should('exist')
        .within(()=>{
          //assert the button left beside the SI-PPC Title
          cy.get(' > div > div > div')
            .should('exist')
            .and('not.be.disabled')
          //assert SI-PPC title
          cy.get(' > div > div > p > span')
            .should('exist')
            .and('have.text', 'SI-Writing')
            .and('have.css', 'font-weight', '700') //font bold
        })

      //Click SI-Writing - it should reveal additional within element
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3)')
        .click()
        .wait(1000)
        .within(()=>{
          //assert Description, Recurring, Department, and Actions column names
          const operationcolNames = [
            'Description',
            'Department',
            'Actions'
          ]
          cy.get(' > div:nth-child(1) > p').each(($option, index)=>{
            cy.wrap($option)
              .should('exist')
              .and('have.text', operationcolNames[index])
            cy.log(operationcolNames[index])
          })
          //assert No Items
          cy.get(' > div:nth-child(2) > p')
            .should('exist')
            .and('have.text', 'No Items')
          //assert No Items
          cy.get(' > div:nth-child(2) > p')
            .should('exist')
            .and('have.text', 'No Items')
        })

      //Now Click again SI-Writing - it should hide the additional elements within
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3)')
        .find(' > div > div > div')
        .click()
        .wait(1000)

      //verify Description column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(2)')
        .should('not.exist')
      //verify Recurring column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(3)')
        .should('not.exist')
      //verify Department column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(4)')
        .should('not.exist')
      //verify Action column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(5)')
        .should('not.exist')
      //verify No Items should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(2) > p')
        .should('not.exist')

      ////////// SI-Writing ASSERTIONS ENDS HERE /////////////

      ////////// SI-Design ASSERTIONS STARTS HERE /////////////

      //verify SI-Design
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(4)')
        .should('exist')
        .within(()=>{
          //assert the button left beside the SI-PPC Title
          cy.get(' > div > div > div')
            .should('exist')
            .and('not.be.disabled')
          //assert SI-PPC title
          cy.get(' > div > div > p > span')
            .should('exist')
            .and('have.text', 'SI-Design')
            .and('have.css', 'font-weight', '700') //font bold
        })

      //Click the SI_Design - it should reveal additional within element
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(4)')
        .click()
        .wait(1000)
        .within(()=>{
          //assert Description, Recurring, Department, and Actions column names
          const operationcolNames = [
            'Description',
            'Department',
            'Actions'
          ]
          cy.get(' > div:nth-child(1) > p').each(($option, index)=>{
            cy.wrap($option)
              .should('exist')
              .and('have.text', operationcolNames[index])
            cy.log(operationcolNames[index])
          })
          //assert No Items
          cy.get(' > div:nth-child(2) > p')
            .should('exist')
            .and('have.text', 'No Items')
          //assert No Items
          cy.get(' > div:nth-child(2) > p')
            .should('exist')
            .and('have.text', 'No Items')
        })

      //Click again SI-Design - it should hide the additional elements within
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(4)')
        .find(' > div > div > div')
        .click()
        .wait(1000)

      //verify Description column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(2)')
        .should('not.exist')
      //verify Recurring column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(3)')
        .should('not.exist')
      //verify Department column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(4)')
        .should('not.exist')
      //verify Action column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(5)')
        .should('not.exist')
      //verify No Items should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(2) > p')
        .should('not.exist')

      ////////// SI-Design ASSERTIONS ENDS HERE /////////////
      
      ////////// SI-Admin ASSERTIONS STARTS HERE /////////////

      //verify SI-Admin
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(5)')
        .should('exist')
        .within(()=>{
          //assert the button left beside the SI-PPC Title
          cy.get(' > div > div > div')
            .should('exist')
            .and('not.be.disabled')
          //assert SI-PPC title
          cy.get(' > div > div > p > span')
            .should('exist')
            .and('have.text', 'SI-Admin')
            .and('have.css', 'font-weight', '700') //font bold
        })

      //Click the SI-Admin - it should reveal additional within element
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(5)')
        .click()
        .wait(1000)
        .within(()=>{
          //assert Description, Recurring, Department, and Actions column names
          const operationcolNames = [
            'Description',
            'Department',
            'Actions'
          ]
          cy.get(' > div:nth-child(1) > p').each(($option, index)=>{
            cy.wrap($option)
              .should('exist')
              .and('have.text', operationcolNames[index])
            cy.log(operationcolNames[index])
          })
          //assert No Items
          cy.get(' > div:nth-child(2) > p')
            .should('exist')
            .and('have.text', 'No Items')
          //assert No Items
          cy.get(' > div:nth-child(2) > p')
            .should('exist')
            .and('have.text', 'No Items')
        })

      //Click again the SI-Admin - it should hide the additional elements within
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(5)')
        .find(' > div > div > div')
        .click()
        .wait(1000)

      //verify Description column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(2)')
        .should('not.exist')
      //verify Recurring column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(3)')
        .should('not.exist')
      //verify Department column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(4)')
        .should('not.exist')
      //verify Action column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(5)')
        .should('not.exist')
      //verify No Items should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(2) > p')
        .should('not.exist')

      ////////// SI-Admin ASSERTIONS ENDS HERE /////////////

      ////////// Billing ASSERTIONS STARTS HERE ////////////

      //verify Billing
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(6)')
        .should('exist')
        .within(()=>{
          //assert the button left beside the SI-PPC Title
          cy.get(' > div > div > div')
            .should('exist')
            .and('not.be.disabled')
          //assert SI-PPC title
          cy.get(' > div > div > p > span')
            .should('exist')
            .and('have.text', 'Billing')
            .and('have.css', 'font-weight', '700') //font bold
        })

      //Click Billing - it should reveal additional within element
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(6)')
        .click()
        .wait(1000)
        .within(()=>{
          //assert Description, Recurring, Department, and Actions column names
          const operationcolNames = [
            'Description',
            'Department',
            'Actions'
          ]
          cy.get(' > div:nth-child(1) > p').each(($option, index)=>{
            cy.wrap($option)
              .should('exist')
              .and('have.text', operationcolNames[index])
            cy.log(operationcolNames[index])
          })
          //assert No Items
          cy.get(' > div:nth-child(2) > p')
            .should('exist')
            .and('have.text', 'No Items')
          //assert No Items
          cy.get(' > div:nth-child(2) > p')
            .should('exist')
            .and('have.text', 'No Items')
        })

      //Click again Billing - it should hide the additional elements within
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(6)')
        .find(' > div > div > div')
        .click()
        .wait(1000)

      //verify Description column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(2)')
        .should('not.exist')
      //verify Recurring column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(3)')
        .should('not.exist')
      //verify Department column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(4)')
        .should('not.exist')
      //verify Action column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(5)')
        .should('not.exist')
      //verify No Items should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(2) > p')
        .should('not.exist')

      ////////// Billing ASSERTIONS ENDS HERE /////////////

      ////////// Sales ASSERTIONS STARTS HERE /////////////

      //verify Sales
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(7)')
        .should('exist')
        .within(()=>{
          //assert the button left beside the SI-PPC Title
          cy.get(' > div > div > div')
            .should('exist')
            .and('not.be.disabled')
          //assert SI-PPC title
          cy.get(' > div > div > p > span')
            .should('exist')
            .and('have.text', 'Sales')
            .and('have.css', 'font-weight', '700') //font bold
        })

      //Click Sales - it should reveal additional within element
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(7)')
        .click()
        .wait(1000)
        .within(()=>{
          //assert Description, Recurring, Department, and Actions column names
          const operationcolNames = [
            'Description',
            'Department',
            'Actions'
          ]
          cy.get(' > div:nth-child(1) > p').each(($option, index)=>{
            cy.wrap($option)
              .should('exist')
              .and('have.text', operationcolNames[index])
            cy.log(operationcolNames[index])
          })
          //assert No Items
          cy.get(' > div:nth-child(2) > p')
            .should('exist')
            .and('have.text', 'No Items')
          //assert No Items
          cy.get(' > div:nth-child(2) > p')
            .should('exist')
            .and('have.text', 'No Items')
        })

      //Click again Sales - it should hide the additional elements within
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(7)')
        .find(' > div > div > div')
        .click()
        .wait(1000)

      //verify Description column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(2)')
        .should('not.exist')
      //verify Recurring column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(3)')
        .should('not.exist')
      //verify Department column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(4)')
        .should('not.exist')
      //verify Action column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(5)')
        .should('not.exist')
      //verify No Items should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(2) > p')
        .should('not.exist')

      ////////// Sales ASSERTIONS ENDS HERE /////////////

      ////////// Lead Generation ASSERTIONS STARTS HERE /////////////

      //verify Lead Generation
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(8)')
        .should('exist')
        .within(()=>{
          //assert the button left beside the SI-PPC Title
          cy.get(' > div > div > div')
            .should('exist')
            .and('not.be.disabled')
          //assert SI-PPC title
          cy.get(' > div > div > p > span')
            .should('exist')
            .and('have.text', 'Lead Generation')
            .and('have.css', 'font-weight', '700') //font bold
        })

      //Click Lead Generation - it should reveal additional within element
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(8)')
        .click()
        .wait(1000)
        .within(()=>{
          //assert Description, Recurring, Department, and Actions column names
          const operationcolNames = [
            'Description',
            'Department',
            'Actions'
          ]
          cy.get(' > div:nth-child(1) > p').each(($option, index)=>{
            cy.wrap($option)
              .should('exist')
              .and('have.text', operationcolNames[index])
            cy.log(operationcolNames[index])
          })
          //assert No Items
          cy.get(' > div:nth-child(2) > p')
            .should('exist')
            .and('have.text', 'No Items')
          //assert No Items
          cy.get(' > div:nth-child(2) > p')
            .should('exist')
            .and('have.text', 'No Items')
        })

      //Click again Lead Generation - it should hide the additional elements within
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(8)')
        .find(' > div > div > div')
        .click()
        .wait(1000)

      //verify Description column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(2)')
        .should('not.exist')
      //verify Recurring column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(3)')
        .should('not.exist')
      //verify Department column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(4)')
        .should('not.exist')
      //verify Action column name should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(1) > p:nth-child(5)')
        .should('not.exist')
      //verify No Items should not be visible
      cy.get('div.space-y-8 > div.space-y-8 > div:nth-child(3) > div:nth-child(2) > p')
        .should('not.exist')

      ////////// Lead Generation ASSERTIONS ENDS HERE /////////////

    })

    // **** CLIENT ADMIN TASK MANAGEMENT ENDS HERE ***
})
