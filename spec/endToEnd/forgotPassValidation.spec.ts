import { test, chromium } from '@playwright/test';
import logger from "../../logger"
import loginPage from "../../pageObject/login"
import pomManager from "../../pageObject/pomManager"
test.describe('Forgot pass validation', () => {
    test.beforeAll("", async () => {
        global.browser = await chromium.launch({ channel: "chrome", headless: false });
        global.context = await global.browser.newContext()
        global.page = await global.context.newPage();
        global.pomClassManager = new pomManager(global.page)
        global.loginPage = await global.pomClassManager.getLoginPage(global.page)
        const startTime = Date.now();
        await global.page.goto("https://chrisintqa.perfpro-hrnonline-qa.com/index.php", { waitUntil: 'load' });
        const loadTime = Date.now() - startTime;
        logger.info(`Page load time while checking forgot password validation: ${loadTime / 1000} sec`);
    })
    test.afterAll(async () => {
        await global.page.close();
        await global.context.close();
        await global.browser.close();
    })
    test('Forgot pass validation', async ({ }) => {
        await global.loginPage.invalidUsernameEmailValidation("Enter your username AND email address to reset your password.", "qqefeqf", "dfhdh", "Fail!")

    });
})