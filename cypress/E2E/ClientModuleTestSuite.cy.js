/// <reference types="cypress" />

import UpsellTablelist from "../pageObjects/ClientUpsellTableAssertions.js"
import GetDate from "../pageObjects/callingDateVariations.js"

let testdata;
let loginmodule;
let alertmessagepopup;
let modulebutton;
let linktextfolder;
let clientmodulelocator;
let billingmodulelocator;


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

    it.only("Testcase ID: CCU0001 - Verify create upsell draft of a client that is connected to amazon or the Selling Partner API and Advertising API are enabled", ()=>{

      
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
    
    

})