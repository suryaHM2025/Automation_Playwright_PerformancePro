import { expect } from "@playwright/test"
import logger from "../logger"
export default class performancePro {
    page: any;
    private accountArrow: any;
    private accountRole: any;
    private logoutIcon: any;
    private dashboard: any;
    private welcomeButton: any;
    private welcomePopupMessage: any;
    private welcomeMessageClose: any;
    private performanceProTab: any;
    private internalPerformanceProTab: any;
    private loginTitle: any;
    private oldUiRoleDropDown: any;
    private selectRoleInLegacyUi: any;
    constructor(page: any) {
        this.page = page;
        this.accountArrow = this.page.locator('div[class*="account__arrow"]')
        this.accountRole = (roleText: string) => this.page.locator(`div[class*="role-selector__role"]:has-text("${roleText}")`)
        this.logoutIcon = this.page.locator('div[title="Logout"] div[class*="logout__icon"]')
        this.dashboard = page.locator('div[class*="dashboard"]:has-text(" Welcome Team!! ")')
        this.welcomeButton = page.locator('button[class*="welcomeMessageBtn"]:has-text("WELCOME ")')
        this.welcomePopupMessage = page.locator('div[class*="messagePopup"]:has-text("Welcome to Performance Pro!")')
        this.welcomeMessageClose = page.locator('div[class*="white-close-btn"]')
        this.performanceProTab = (tabText: string) => this.page.locator(`span[class*="tile-title"]:has-text("${tabText}")`)
        this.internalPerformanceProTab = (tabText: string) => this.page.locator(`p[class*="route__title"]:has-text("${tabText}")`)
        this.loginTitle = this.page.locator('p[class="login__title"]:has-text("Welcome to Integrated Learning and Performance Management")')
        this.oldUiRoleDropDown = this.page.locator('span[id="loadRoleIcon"] i[class*="fas fa-chevron-down"]')
        this.selectRoleInLegacyUi = this.page.locator('div[id="PerfPro3_LC_Role_Selector"]:has-text("New GUI")')
    }
    public async logoutPerformancePro() {
        logger.info("logging out the performance pro")
        await this.logoutIcon.first().waitFor()
        await this.logoutIcon.first().click()
        await this.loginTitle.first().waitFor()
        let loginPage = await this.loginTitle.first().isVisible()
        if (loginPage) {
            logger.info("Logged out of performance pro")
        } else {
            logger.error("Did not Log out of performance pro")
        }
        await expect(loginPage).toBeTruthy()
    }
    public async validatePerformanceHomePage() {
        logger.info("Validating the performance pro home text")
        await this.dashboard.first().waitFor()
        let welcomeText = await this.dashboard.first().isVisible()
        if (welcomeText) {
            logger.info("Welcome text available on performance pro home page")
        } else {
            logger.error("Welcome text is not available on performance pro home page")
        }
        await expect(welcomeText).toBeTruthy()
    }
    public async validateWelcomeMessage() {
        logger.info("Validating the welcome messaget")
        await this.welcomeButton.first().waitFor()
        await this.welcomeButton.first().click()
        await this.welcomePopupMessage.first().waitFor();
        let welcomePopupText = await this.welcomePopupMessage.first().isVisible()
        if (welcomePopupText) {
            logger.info("Welcome text available on pop up")
        } else {
            logger.error("Welcome text is not available on pop up")
        }
        await expect(welcomePopupText).toBeTruthy()
        await this.welcomeMessageClose.first().click()
    }
    /**
    * Select the account role 
    * @param role - Administrative User, Appraiser, Employee
    */
    public async selectAccountRole(role: string) {
        logger.info("Selecting the account role as " + role)
        await this.accountArrow.first().waitFor();
        await this.accountArrow.first().click()
        await this.accountRole(role).first().waitFor();
        await this.accountRole(role).first().click();
        logger.info("account role as " + role + " selected")
    }
    /**
    * Select the main tab in performance pro home page
    * @param mainTab - System Configuration, Goals, Appraisals & Forms
    */
    public async selectMainTabInPerformancePro(mainTab: string) {
        logger.info("Selecting the main tab in performance pro " + mainTab)
        await this.performanceProTab(mainTab).first().waitFor();
        await this.performanceProTab(mainTab).first().click();
        logger.info("Selected the main tab in performance pro " + mainTab)
    }
    /**
    * Select the internal tab in performance pro
    * @param internalTab - System Configuration, Goals, Appraisals & Forms
    */
    public async selectInternalTabInPerformancePro(internalTab: string) {
        logger.info("Selecting the internal tab in performance pro " + internalTab)
        await this.internalPerformanceProTab(internalTab).first().waitFor();
        await this.internalPerformanceProTab(internalTab).first().click();
        logger.info("Selected the internal tab in performance pro " + internalTab)
    }
}