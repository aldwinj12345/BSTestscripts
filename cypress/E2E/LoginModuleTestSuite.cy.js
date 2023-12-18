/// <reference types="cypress" />

let testdata;
let loginmodule;
let alertmessagepopup;


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
        alertmessagepopup = data;    })
})


beforeEach('Launch BS Login Page',()=>{

    cy.visit(testdata.URL[0].stagingURL)
      .wait(3000)

    //change the window size of the browser
    cy.viewport(1600, 1100)

    //assert url - when launched sucessfully
    cy.url().should('contain','/sign-in')

})


//Based on Test cases created at JIRA Confluence
describe('Login Module Test Suite',()=>{


    //////// LOGIN PAGE STARTS HERE //////////
    it('Testcase ID: L0001 - Verify there is a page title and correct', ()=>{
        cy.title().should('eq','Agency - BetterSeller')  
    })

    it('Testcase ID: L0002 - Verify there is a BetterSeller Logo', ()=>{

        cy.get(loginmodule.bettersellerlogo)
          .wait(1000)
          .should('exist')
          .and('have.css', 'width', '48px')   //expected rendered size on the web
          .and('have.css', 'height', '48px')  //expected rendered size on the web
    })

    it('Testcase ID: L0003 - Verify there login form title', ()=>{

        cy.get(loginmodule.bettersellerHeaderTitle)
          .wait(1000)
          .should('exist')
          .and('have.css', 'font-weight', '800') // font bold
          .and('have.text','Agency Dashboard')

    })

    it('Testcase ID: L0004 - Verify there is an email address input field.', ()=>{

        //verify Email address Label
        cy.get(loginmodule.EmailAddressLabel)
          .should('exist')
          .and('have.text', 'Email address')
          .and('have.css', 'color', 'rgb(55, 65, 81)') // text color
        //verify Email address Input field
        cy.get(loginmodule.EmailAddressInputfield)
          .should('exist')
          .and('not.be.disabled')
          .and('have.value', '') //empty by default
    })

    it('Testcase ID: L0005 - Verify there is a password input field.', ()=>{

        //verify Password Label
        cy.get(loginmodule.PasswordLabel)
          .should('exist')
          .and('have.text', 'Password')
          .and('have.css', 'color', 'rgb(55, 65, 81)') // text color
        //verify Email address Input field
        cy.get(loginmodule.PasswordInputfield)
          .should('exist')
          .and('not.be.disabled')
          .and('have.value', '') //empty by default
    })

    it('Testcase ID: L0006 - Verify there is a Remember me tick box and label', ()=>{

        //verify Remember me Label
        cy.get(loginmodule.RememberMeLabel)
          .should('exist')
          .and('have.text', 'Remember me')
        //verify Remember me checkbox
        cy.get(loginmodule.RememberMeCheckbox)
          .should('exist')
          .and('not.be.disabled')
          .and('not.be.checked')
    })

    it('Testcase ID: L0007 - Verify there is a link text called Forgot your password?', ()=>{

        //verify Forgot your password? link text
        cy.get(loginmodule.ForgotYourPasswordLinktext)
          .should('exist')
          .and('not.be.disabled')
          .and('have.text', 'Forgot your password?')
          .and('have.css', 'color', 'rgb(220, 38, 38)') //text color
    })

    it('Testcase ID: L0008 - Verify there is a Sign in button.', ()=>{

        cy.get(loginmodule.SigninButton)
          .should('exist')
          .and('not.be.disabled')
          .and('have.text', 'Sign in')
          .and('have.css', 'color', 'rgb(255, 255, 255)') // text color
          .and('have.css', 'background-color', 'rgb(220, 38, 38)') //button color
          .and('have.css', 'border-radius', '9999px') //edge curve size
    })

    it('Testcase ID: L0009 - Verify user cannot successfully login if incorrect email address or not yet registered', ()=>{

        //Enter Email address
        cy.get(loginmodule.EmailAddressInputfield)
          .clear()
          .type('aldwinj12345@gmail.com')
          .wait(600)
          .should('have.value', 'aldwinj12345@gmail.com')
        //Enter password
        cy.get(loginmodule.PasswordInputfield)
          .clear()
          .type('qatesting123')
          .wait(600)
        //Click Sign in Button
        cy.get(loginmodule.SigninButton)
          .click()
          .wait(3000)

        //Alert-Error message popup on top right corner
        cy.GETAlertMessagepopup(alertmessagepopup.TopMessage, 'Authentication Error')
        cy.GETAlertMessagepopup(alertmessagepopup.SubMessage, 'Incorrect email or password')

        //verify it remains in the sign-in page
        cy.url().should('contain','/sign-in')
    })

    it('Testcase ID: L00010 - Verify user cannot successfully login if incorrect Password', ()=>{

        //Enter Email address
        cy.get(loginmodule.EmailAddressInputfield)
          .clear()
          .type('agencysu@betterseller.com')
          .wait(600)
          .should('have.value', 'agencysu@betterseller.com')
        //Enter password
        cy.get(loginmodule.PasswordInputfield)
          .clear()
          .type('qatesting123')
          .wait(600)
        //Click Sign in Button
        cy.get(loginmodule.SigninButton)
          .click()
          .wait(3000)

        //Alert-Error message popup on top right corner
        cy.GETAlertMessagepopup(alertmessagepopup.TopMessage, 'Authentication Error')
        cy.GETAlertMessagepopup(alertmessagepopup.SubMessage, 'Incorrect email or password')

        //verify it remains in the sign-in page
        cy.url().should('contain','/sign-in')

    })

    it('Testcase ID: L00011 - Verify user can successfully login if Email address and Password are correct', ()=>{

        //Enter Email address
        cy.get(loginmodule.EmailAddressInputfield)
          .clear()
          .type(testdata.userAccounts[0].usernameAdmin)
          .wait(600)
          .should('have.value', testdata.userAccounts[0].usernameAdmin)
        //Enter password
        cy.get(loginmodule.PasswordInputfield)
          .clear()
          .type(testdata.userAccounts[0].adminpassword)
          .wait(600)
        //Click Sign in Button
        cy.get(loginmodule.SigninButton)
          .click()
          .wait(5000)

        //verify it remains in the sign-in page
        cy.url().should('contain','/home/my-workspace')
    })
    //////// LOGIN PAGE ENDS HERE //////////
    //////// FORGOT PASSWORD PAGE STARTS HERE //////////
    it('Testcase ID: LFP0001 - Verify when user clicks the Forgot your password link text, it will go to Forgot your password page', ()=>{

        //Click the Forgot your password? Link text
        cy.get(loginmodule.ForgotYourPasswordLinktext)
          .click()
          .wait(3000)

        //verify expected url destination
        cy.url().should('contain', '/forgot-password')

        //verify BetterSeller Logo
        cy.get(loginmodule.bettersellerlogo)
          .wait(1000)
          .should('exist')
          .and('have.css', 'width', '48px')   //expected rendered size on the web
          .and('have.css', 'height', '48px')  //expected rendered size on the web

        //verify BetterSeller > Forgot your password? Header Title page
        cy.get(loginmodule.bettersellerHeaderTitle)
          .wait(1000)
          .should('exist')
          .and('have.css', 'font-weight', '800') // font bold
          .and('have.text','Forgot your password?')

        //verify Enter your email to your reset password. text
        cy.get(loginmodule.EnteryouremailtoyourresetpasswordTEXT)
          .should('exist')
          .and('have.text', 'Enter your email to your reset password.')
          .and('have.css', 'color', 'rgb(75, 85, 99)') // text color

        //verify Email address Label
        cy.get(loginmodule.EmailAddressLabel)
          .should('exist')
          .and('have.text', 'Email address')
          .and('have.css', 'color', 'rgb(55, 65, 81)') // text color
        //verify Email address Input field
        cy.get(loginmodule.EmailAddressInputfield)
          .should('exist')
          .and('not.be.disabled')
          .and('have.value', '') //empty by default

        //verify Reset Password button
        cy.get(loginmodule.SigninButton)
          .should('exist')
          .and('not.be.disabled')
          .and('have.text', 'Reset Password')
          .and('have.css', 'color', 'rgb(255, 255, 255)') // text color
          .and('have.css', 'background-color', 'rgb(220, 38, 38)') //button color
          .and('have.css', 'border-radius', '6px') //edge curve

        //verify Did you remember your password? text
        cy.get(loginmodule.DidYourRememberYourPasswordTEXT)
          .should('exist')
          .and('contain', 'Did you remember your password?')
        
        //verify Try logging in. Link text
        cy.get(loginmodule.TryLoggingInLinktext)
          .should('exist')
          .and('not.be.disabled')
          .and('have.text', 'Try logging in.')
          .and('have.css', 'color', 'rgb(220, 38, 38)') // text color
    })

    it('Testcase ID: LFP0002 - Verify when user clicks the Try Logging in, it goes back to the main login page', ()=>{

        //Click the Forgot your password? Link text
        cy.get(loginmodule.ForgotYourPasswordLinktext)
          .click()
          .wait(3000)

        //click Try Logging in Link text
        cy.get(loginmodule.TryLoggingInLinktext)
          .click()
          .wait(3000)

        //verify url expected destination
        cy.url().should('contain','/sign-in')

    })

    it('Testcase ID: LFP0003 - Verify when user attempts to reset password, but the email address is not yet registered in the betterseller.', ()=>{

        //Click the Forgot your password? Link text
        cy.get(loginmodule.ForgotYourPasswordLinktext)
          .click()
          .wait(3000)

        //Enter Email address
        cy.get(loginmodule.EmailAddressInputfield)
          .clear()
          .type('aldwinj12345@gmail.com')
          .wait(600)
          .should('have.value', 'aldwinj12345@gmail.com')

       //Click Reset Password
       cy.get(loginmodule.SigninButton)
         .click()
         .wait(3000)

       //Alert-Error message popup on top right corner
       cy.GETAlertMessagepopup(alertmessagepopup.TopMessage, 'There is no user with that email')
      
       //verify if it remains as it should be in the reset password page
       cy.url().should('contain','/forgot-password')

    })

    it('Testcase ID: LFP0004 - Verify when user attempts to reset password Successfully.', ()=>{

        //Click the Forgot your password? Link text
        cy.get(loginmodule.ForgotYourPasswordLinktext)
          .click()
          .wait(3000)
        
        //Enter Email address
        cy.get(loginmodule.EmailAddressInputfield)
          .clear()
          .type(testdata.userAccounts[0].accountmanager)
          .wait(600)
          .should('have.value', testdata.userAccounts[0].accountmanager)

        //Click Reset Password
        cy.get(loginmodule.SigninButton)
          .click()
          .wait(3000)

        //verify url expected destination
        cy.url().should('contain','/forgot-password/success')

        //verify BetterSeller Logo
        cy.get(loginmodule.bettersellerlogo)
          .wait(1000)
          .should('exist')
          .and('have.css', 'width', '48px')   //expected rendered size on the web
          .and('have.css', 'height', '48px')  //expected rendered size on the web

        //verify Check your email header title page
        cy.get(loginmodule.bettersellerHeaderTitle)
          .wait(1000)
          .should('exist')
          .and('have.css', 'font-weight', '800') // font bold
          .and('have.text','Check your email')

        //verify We just emailed you instructions on how to reset your password. text
        cy.get(loginmodule.EnteryouremailtoyourresetpasswordTEXT)
          .should('exist')
          .and('have.text', 'We just emailed you instructions on how to reset your password.')
          .and('have.css', 'color', 'rgb(75, 85, 99)') // text color

        //verify Return to Login button
        cy.get(loginmodule.ReturntoLoginButton)
          .should('exist')
          .and('not.be.disabled')
          .and('have.text', 'Return to Login')
          .and('have.css', 'color', 'rgb(255, 255, 255)') // text color
          .and('have.css', 'background-color', 'rgb(220, 38, 38)') //button color
          .and('have.css', 'border-radius', '6px') //edge curve size

        //Then lastly, if I click the Return Login button, it should go back to Home login page
        cy.get(loginmodule.ReturntoLoginButton)
          .click()
          .wait(2000)

        //verify url expected destination
        cy.url().should('contain','/sign-in')

    })
    //////// FORGOT PASSWORD PAGE ENDS HERE //////////
})