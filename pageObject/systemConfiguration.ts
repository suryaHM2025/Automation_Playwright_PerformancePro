export default class systemConfiguration {

    page: any;
    private systemConfigurationTab: any;
    constructor(page: any) {
        this.page = page;
        this.systemConfigurationTab = (tabText: string) => this.page.locator(`div[role="tablist"] a[role="tab"]:has-text("${tabText}")`)
    }
}