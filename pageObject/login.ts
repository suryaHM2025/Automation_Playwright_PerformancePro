import { Locator, expect } from "@playwright/test"
import logger from "../logger"
export default class login {
    page: any;
    private userName: Locator;
    private password: Locator;
    private continue: Locator;
    private errorMessage: Locator;
    private forgetPassword: Locator;
    private forgotPassPopText: Locator;
    private forgotPassUsername: Locator;
    private forgotPassEmail: Locator;
    private submitInForgotPass: Locator;
    private failAfterSubmit: Locator;
    private closeButton: Locator;
    private userNameError: Locator;
    private passError: Locator;
    constructor(page: any) {
        this.page = page;
        this.userName = this.page.locator('input[type="text"]')
        this.password = this.page.locator('input[type="password"]')
        this.continue = this.page.locator('button[class*="login__submit"] span[class*="v-btn__content"]');
        this.errorMessage = this.page.locator('p[class*="form__sublabel-error"]')
        this.forgetPassword = this.page.locator('p[class="form__sublabel-link"]')
        this.forgotPassPopText = this.page.locator('p[class="forgot-modal__paragraph"]')
        this.forgotPassUsername = this.page.locator('input[placeholder="Your Username"]')
        this.forgotPassEmail = this.page.locator('input[placeholder="Your Email"]')
        this.submitInForgotPass = this.page.locator('button[class*="forgot-modal__btn"] span[class*="v-btn__content"]')
        this.failAfterSubmit = this.page.locator('div[class="forgot-modal__success"] h1[class="forgot-modal__title"]')
        this.closeButton = this.page.locator('div[class="forgot-modal__success"] div[class="forgot-modal__btn"]')
        this.userNameError = this.page.locator('span[class*="form__sublabel-error"]')
        this.passError = this.page.locator('span[class*="form__sublabel-error"]')
    }
    public async validateCredential(username: string, password: string) {
        logger.info("Validating the login credential")
        await this.userName.first().waitFor();
        let userNameValue = await this.userName.first().inputValue();
        await this.password.first().waitFor();
        let passwordValue = await this.password.first().inputValue();
        if (userNameValue === username && passwordValue === password) {
            logger.info("Filled the correct credential what we passed as parameter")
        } else {
            logger.error("Did not fill the correct credential what we passed as parameter")
        }
        await expect(userNameValue).toBe(username);
        await expect(passwordValue).toBe(password);
    }
    public async loginCUSolution(username: string, password: string) {
        logger.info("Login CU Solution")
        await this.userName.first().waitFor();
        await this.userName.first().fill(username);
        await this.password.first().waitFor();
        await this.password.first().fill(password);
        await this.validateCredential(username, password)
        await this.continue.first().waitFor();
        await this.continue.first().click();
    }
    public async validateErrorMessage(errorMessage: string) {
        logger.info("Validating the error message")
        await this.errorMessage.first().waitFor({ timeout: 3000 })
        let messageVisible = await this.errorMessage.first().isVisible();
        await expect(messageVisible).toBeTruthy()
        if (messageVisible) {
            logger.info("Login error message is visible")
            let errMessage = await this.errorMessage.first().innerText();
            if (errMessage === errorMessage) {
                logger.info("Login error message is " + errMessage)
                await expect(await errMessage).toBe(errorMessage)
            } else {
                logger.error("Error message is " + errMessage)
            }
        } else {
            logger.error(errorMessage + " Did not displayed")
        }

    }
    public async validatepasswordError(username: string, passErrorMessage: string, loginErrorMessage: string) {
        logger.info("Validate username error message")
        await this.userName.first().waitFor();
        await this.userName.first().fill(username);
        await this.continue.first().waitFor();
        await this.continue.first().click();
        await this.validateErrorMessage(loginErrorMessage)
        logger.info("Clicking on password input area")
        await this.password.first().click();
        logger.info("Clicking on continue to get password error message")
        await this.continue.first().click();
        await this.passError.first().waitFor({ timeout: 3000 })
        let passError = await this.passError.first().isVisible()
        logger.info("Password error message is" + passError)
        if (passError) {
            logger.info("Password error is visible after clicking on continue button as we did not fill the password")
            let errorMessage = await this.passError.first().innerText();
            if (errorMessage === passErrorMessage) {
                logger.info(passErrorMessage + " has displayed")
            } else {
                logger.error(passErrorMessage + " has not displayed")
            }
            await expect(passErrorMessage).toBe(errorMessage)
        } else {
            logger.error("Password error is not visible after clicking on continue button as we did not fill the password")
        }
    }
    public async validateUsernameError(password: string, userNameErrorMessage: string, loginErrorMessage: string) {
        logger.info("Validate username error message")
        await this.password.first().waitFor();
        await this.password.first().fill(password);
        await this.userName.first().clear();
        await this.continue.first().waitFor();
        await this.continue.first().click();
        await this.validateErrorMessage(loginErrorMessage)
        await this.userNameError.first().waitFor({ timeout: 3000 })
        let userError = await this.userNameError.first().isVisible()
        if (userError) {
            logger.info("Username error is visible after clicking on continue button as we did not fill the username")
            let errorMessage = await this.userNameError.first().innerText();
            logger.info("Username error message is" + errorMessage)
            if (errorMessage === userNameErrorMessage) {
                logger.info(userNameErrorMessage + " has displayed")
            } else {
                logger.error(userNameErrorMessage + " has not displayed")
            }
            await expect(userNameErrorMessage).toBe(errorMessage)
        } else {
            logger.error("Username error is not visible after clicking on continue button as we did not fill the usename")
        }
    }
    public async validateUserPassError(userNameErrorMessage: string, passErrorMessage: string, loginErrorMessage: string) {
        logger.info("Validate username and password error message")
        await this.password.first().waitFor();
        await this.password.first().clear();
        await this.userName.first().clear();
        await this.continue.first().waitFor();
        await this.continue.first().click();
        await this.validateErrorMessage(loginErrorMessage)
        await this.userNameError.getByText(userNameErrorMessage).first().waitFor({ timeout: 3000 })
        await this.userNameError.getByText(passErrorMessage).first().waitFor({ timeout: 3000 })
        let userErrorVisible = await this.userNameError.getByText(userNameErrorMessage).first().isVisible();
        let passErrorVisible = await this.userNameError.getByText(passErrorMessage).first().isVisible();
        if (userErrorVisible && passErrorVisible) {
            logger.info("userErrorVisible=" + userErrorVisible + " passErrorVisible=" + passErrorVisible + " Username and password error message is visible")
        } else {
            logger.error("userErrorVisible=" + userErrorVisible + " passErrorVisible=" + passErrorVisible + " Username and password error message is not visible")
        }
        await expect(userErrorVisible).toBeTruthy();
        await expect(passErrorVisible).toBeTruthy();
    }
    public async emptyUserPassValidation(username: string, password: string, userNameErrorMessage: string, passErrorMessage: string, loginErrorMessage: string) {
        await this.validatepasswordError(username, passErrorMessage, loginErrorMessage)
        await this.validateUsernameError(password, userNameErrorMessage, loginErrorMessage)
        await this.validateUserPassError(userNameErrorMessage, passErrorMessage, loginErrorMessage)
    }
    public async invalidCredentialValidation(username: string, password: string, errorMessage: string) {
        await this.loginCUSolution(username, password);
        await this.validateErrorMessage(errorMessage)
    }
    public async invalidUsernameEmailValidation(popText: string, username: string, email: string, failText: string) {
        logger.info("Validating the invalid username and email for forgot password")
        await this.forgetPassword.first().waitFor();
        await this.forgetPassword.first().click();
        await this.forgotPassPopText.first().waitFor();
        let popUpText = await this.forgotPassPopText.first().innerText()
        await expect(popUpText).toBe(popText);
        await this.forgotPassUsername.first().fill(username);
        await this.forgotPassEmail.first().fill(email);
        await this.submitInForgotPass.first().click()
        await this.failAfterSubmit.first().waitFor({ timeout: 3000 })
        let failedText = await this.failAfterSubmit.first().innerText();
        if (failedText === failText) {
            logger.info(failedText + " text appeared after filling invalid username or email for forgot pass")
        } else {
            logger.error(failedText + " text appeared after filling invalid username or email for forgot pass")
        }
        await expect(failedText).toBe(failText)
        await this.closeButton.first().waitFor()
        await this.closeButton.first().click()
        logger.info("Closing the pop up")
    }
}