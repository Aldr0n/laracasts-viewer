import { Page as PuppeteerPage } from "puppeteer";
import { Browser } from "./Browser";
import { IPageService } from "../interfaces/Services";

export class Page implements IPageService {
    private page: PuppeteerPage | null = null;

    constructor(private browser: Browser) {}

    public async getPage(): Promise<PuppeteerPage> {
        if (!this.page) {
            const browserInstance = await this.browser.getBrowser();
            const pages = await browserInstance.pages();
            this.page = pages[0];

            if (!this.page) {
                throw new Error("No initial page found");
            }
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
