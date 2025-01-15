import login from "./login"
import goals from "./goals"
import performancePro from "./performancePro"
import systemConfiguration from "./systemConfiguration"
import appraisalsAndForms from "./appraisalsAndForms"
export default class pomManager {
    page: any;
    private login: any;
    private goals: any;
    private performancePro: any;
    private systemConfiguration: any;
    private appraisalsAndForms: any;
    constructor(page: any) {
        this.page = page;
        this.login = new login(this.page)
        this.goals = new goals(this.page)
        this.performancePro = new performancePro(this.page)
        this.systemConfiguration = new systemConfiguration(this.page)
        this.appraisalsAndForms = new appraisalsAndForms(this.page)
    }
    public async getLoginPage() {
        return this.login;
    }
    public async getGoalsPage() {
        return this.goals;
    }
    public async getPerformanceProPage() {
        return this.performancePro;
    }
    public async getSystemConfigurationPage() {
        return this.systemConfiguration;
    }
    public async getAppraisalAndFormPage() {
        return this.appraisalsAndForms;
    }
}