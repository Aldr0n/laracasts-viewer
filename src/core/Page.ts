import { Page as PuppeteerPage } from "puppeteer";
import { Browser } from "./Browser";
import { IPageService } from "../interfaces/Services";

export class Page implements IPageService {
    private page: PuppeteerPage | null = null;

    constructor(private browser: Browser) {}

    public async getPage(): Promise<PuppeteerPage> {
        if (!this.page) {
            const browserInstance = await this.browser.getBrowser();
            this.page = await browserInstance.newPage();
        }
        return this.page;
    }

    public async closePage(): Promise<void> {
        if (this.page) {
            await this.page.close();
            this.page = null;
        }
    }
}
