/// <reference types="cypress" />

import UpsellTablelist from "../pageObjects/ClientUpsellTableAssertions.js"
import BillingUpsellTablelist from "../pageObjects/BillingUpsellsTableAssertions.js"
import AdditionalServicesTable from "../pageObjects/ClientPartnerPage_AdditionalServicesTable.js"
import ClientCreditNoteTable from "../pageObjects/ClientCreditNotesTable.js"
import BillingCreditNoteTable from "../pageObjects/BillingCreditNotesTableAssertions.js"
import GetDate from "../pageObjects/callingDateVariations.js"


let testdata;
let loginmodule;
let alertmessagepopup;
let modulebutton;
let linktextfolder;
let clientmodulelocator;
let billingmodulelocator;
let clientpartnerpage;

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
    //calling
    const BillingCreditNotesTablelist = new BillingCreditNoteTable();

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

      //Select DEXY PAWS since the SP-API and ADV-API are enabled
      cy.get('a[href="/clients/ed0db233-91e4-472f-879f-d9c2fbd44bde/dashboard"]')
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

      //Logout as Account Specialist
      //click the user account profile 
      cy.get(testdata.AccountProfileSection[0].useraccountprofilepicinitial)
        .click()

      //click the sign out link text
      cy.get(testdata.AccountProfileSection[0].signoutlinktext)
        .click()
        .wait(10000)

      //Login as Project Manager
      cy.userlogin(loginmodule.EmailAddressInputfield, loginmodule.PasswordInputfield, loginmodule.SigninButton, testdata.userAccounts[0].projectmanager, testdata.userAccounts[0].accountspecialistandprojectmanagerpassword)

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

      //Logout as Account Specialist
      //click the user account profile 
      cy.get(testdata.AccountProfileSection[0].useraccountprofilepicinitial)
        .click()

      //click the sign out link text
      cy.get(testdata.AccountProfileSection[0].signoutlinktext)
        .click()
        .wait(10000)

      //Login as Project Manager
      cy.userlogin(loginmodule.EmailAddressInputfield, loginmodule.PasswordInputfield, loginmodule.SigninButton, testdata.userAccounts[0].projectmanager, testdata.userAccounts[0].accountspecialistandprojectmanagerpassword)

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

      //Logout as Account Specialist
      //click the user account profile 
      cy.get(testdata.AccountProfileSection[0].useraccountprofilepicinitial)
        .click()

      //click the sign out link text
      cy.get(testdata.AccountProfileSection[0].signoutlinktext)
        .click()
        .wait(10000)

      //Login as Project Manager
      cy.userlogin(loginmodule.EmailAddressInputfield, loginmodule.PasswordInputfield, loginmodule.SigninButton, testdata.userAccounts[0].projectmanager, testdata.userAccounts[0].accountspecialistandprojectmanagerpassword)

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
     
      //Logout as Account Specialist
      //click the user account profile 
      cy.get(testdata.AccountProfileSection[0].useraccountprofilepicinitial)
        .click()

      //click the sign out link text
      cy.get(testdata.AccountProfileSection[0].signoutlinktext)
        .click()
        .wait(10000)
 
      //Login as Project Manager
      cy.userlogin(loginmodule.EmailAddressInputfield, loginmodule.PasswordInputfield, loginmodule.SigninButton, testdata.userAccounts[0].projectmanager, testdata.userAccounts[0].accountspecialistandprojectmanagerpassword)

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
        BillingUpsells.assertColumn7RejectedTabRejector(' > td:nth-child(7) > div', 'PK', 'PeterKanluran')
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
              expect(txt.text().replace(/\s+/g, ' ').trim()).to.equal('Peter Kanluran')
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

      //logout as the Approver / Project Manager
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

      //// CLIENT > BILLING > UPSELLS TABLE LIST ASSERTIONS STARTS HERE //////////

      cy.get('table > tbody > tr:first-child').within(()=>{
        //assert row 1 column 2 that it should still be only a dash since this upsell request has been denied
        UpsellTable.assertColumn2InvoiceNumber(' > td:nth-child(2)', '—')
        //assert row 1 column 4 the status that it should be Rejected
        UpsellTable.assertColumn4Status(' > td:nth-child(4) > span', 'rejected', 'rgb(239, 68, 68)', 'rgb(254, 226, 226)')
        //assert row 1 column 7 Updated by the approver name who denied
        UpsellTable.assertColumn7UpdatedbyExpectedName('> td:nth-child(7) > div', 'PK', 'PeterKanluran') 
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
              expect(txt.text().replace(/\s+/g, ' ').trim()).to.equal('Peter Kanluran')
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
     
      //Logout as Account Specialist
      //click the user account profile 
      cy.get(testdata.AccountProfileSection[0].useraccountprofilepicinitial)
        .click()

      //click the sign out link text
      cy.get(testdata.AccountProfileSection[0].signoutlinktext)
        .click()
        .wait(10000)
 
      //Login as Project Manager
      cy.userlogin(loginmodule.EmailAddressInputfield, loginmodule.PasswordInputfield, loginmodule.SigninButton, testdata.userAccounts[0].projectmanager, testdata.userAccounts[0].accountspecialistandprojectmanagerpassword)

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
      
      //logout as the Approver / Project Manager
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
     
      //Logout as Account Specialist
      //click the user account profile 
      cy.get(testdata.AccountProfileSection[0].useraccountprofilepicinitial)
        .click()

      //click the sign out link text
      cy.get(testdata.AccountProfileSection[0].signoutlinktext)
        .click()
        .wait(10000)
 
      //Login as Project Manager
      cy.userlogin(loginmodule.EmailAddressInputfield, loginmodule.PasswordInputfield, loginmodule.SigninButton, testdata.userAccounts[0].projectmanager, testdata.userAccounts[0].accountspecialistandprojectmanagerpassword)

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

      //logout as the Approver / Project Manager
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

      //Logout as Account Specialist
      //click the user account profile 
      cy.get(testdata.AccountProfileSection[0].useraccountprofilepicinitial)
        .click()

      //click the sign out link text
      cy.get(testdata.AccountProfileSection[0].signoutlinktext)
        .click()
        .wait(10000)

      //Login as Project Manager
      cy.userlogin(loginmodule.EmailAddressInputfield, loginmodule.PasswordInputfield, loginmodule.SigninButton, testdata.userAccounts[0].projectmanager, testdata.userAccounts[0].accountspecialistandprojectmanagerpassword)

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

      //logout as Project Manager / Approver
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

      //Logout as Account Specialist
      //click the user account profile 
      cy.get(testdata.AccountProfileSection[0].useraccountprofilepicinitial)
        .click()

      //click the sign out link text
      cy.get(testdata.AccountProfileSection[0].signoutlinktext)
        .click()
        .wait(10000)

      //Login as Project Manager
      cy.userlogin(loginmodule.EmailAddressInputfield, loginmodule.PasswordInputfield, loginmodule.SigninButton, testdata.userAccounts[0].projectmanager, testdata.userAccounts[0].accountspecialistandprojectmanagerpassword)

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

      //logout as Project Manager / Approver
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

      //logout as account specialist and then login as the approver / PM
      //click the user account profile 
      cy.get(testdata.AccountProfileSection[0].useraccountprofilepicinitial)
        .click()

      //click the sign out link text
      cy.get(testdata.AccountProfileSection[0].signoutlinktext)
        .click()
        .wait(10000)

      //Login as Project Manager
      cy.userlogin(loginmodule.EmailAddressInputfield, loginmodule.PasswordInputfield, loginmodule.SigninButton, testdata.userAccounts[0].projectmanager, testdata.userAccounts[0].accountspecialistandprojectmanagerpassword)

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

      //logout as approver / PM then login as the Client partner
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

      //Logout as Account Specialist
      //click the user account profile 
      cy.get(testdata.AccountProfileSection[0].useraccountprofilepicinitial)
        .click()

      //click the sign out link text
      cy.get(testdata.AccountProfileSection[0].signoutlinktext)
        .click()
        .wait(10000)
      
      //Login as Project Manager
      cy.userlogin(loginmodule.EmailAddressInputfield, loginmodule.PasswordInputfield, loginmodule.SigninButton, testdata.userAccounts[0].projectmanager, testdata.userAccounts[0].accountspecialistandprojectmanagerpassword)

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

      //logout as Project Manager
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

      //logout as account specialist
      //click the user account profile 
      cy.get(testdata.AccountProfileSection[0].useraccountprofilepicinitial)
        .click()

      //click the sign out link text
      cy.get(testdata.AccountProfileSection[0].signoutlinktext)
        .click()
        .wait(10000)
      
      //Login as Project Manager
      cy.userlogin(loginmodule.EmailAddressInputfield, loginmodule.PasswordInputfield, loginmodule.SigninButton, testdata.userAccounts[0].projectmanager, testdata.userAccounts[0].accountspecialistandprojectmanagerpassword)

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

    it.only("Testcase ID: CCCR0002 - Deny Waive Upsell Fee, Upsell Request turned Credit Note Request",()=>{


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

      //logout as account specialist
      //click the user account profile 
      cy.get(testdata.AccountProfileSection[0].useraccountprofilepicinitial)
        .click()

      //click the sign out link text
      cy.get(testdata.AccountProfileSection[0].signoutlinktext)
        .click()
        .wait(10000)
      
      //Login as Project Manager
      cy.userlogin(loginmodule.EmailAddressInputfield, loginmodule.PasswordInputfield, loginmodule.SigninButton, testdata.userAccounts[0].projectmanager, testdata.userAccounts[0].accountspecialistandprojectmanagerpassword)

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
        BillingCreditNotesTablelist.assertColumn7UpdatedbyExpectedName(' > td:nth-child(7) > div', 'PK', 'PeterKanluran')
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

      //logout as Project Manager
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

      //Click Credit Notes tab
      cy.get(clientmodulelocator.BillingTabPage[0].PageTabs[0].CreditNotesTab)
        .click()
        .wait(2000)

      ////// CLIENT > BILLING > CREDIT NOTES > TABLE LIST ASSERTION STARTS HERE //////////

      cy.get('table > tbody > tr:first-child').within(()=>{
        //assert Column 4 > Status
        UpsellTable.assertColumn4Status(' > td:nth-child(4) > span', 'denied', 'rgb(239, 68, 68)', 'rgb(254, 226, 226)')
        //assert Column 6 > Updated By
        UpsellTable.assertColumn6UpdatedbyExpectedName(' > td:nth-child(6) > div', 'PK', 'PeterKanluran')
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

    })

    // **** CLIENT CREDIT NOTE ENDS HERE ***
})