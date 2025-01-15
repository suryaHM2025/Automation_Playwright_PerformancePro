import { chromium, test as setup } from "@playwright/test"
import login from "../pageObject/login"
setup("login page", async ({ }) => {
    // Launch the browser
    const browser = await chromium.launch({ channel: "chrome", headless: false });
    const context = await browser.newContext()
    const page = await context.newPage();
    const loginPage = new login(page)
    await page.goto("https://chrisintqa.perfpro-hrnonline-qa.com/index.php")
    await loginPage.loginCUSolution("Spimpalkar", "Welcome123")
    await page.context().storageState({ path: "auth/login.json" })
    await page.close();
    await context.close();
    await browser.close();
})