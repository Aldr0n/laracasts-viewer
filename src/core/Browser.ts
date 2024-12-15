import puppeteer, { Browser as PuppeteerBrowser } from "puppeteer";
import { browserConfig } from "../config/config";
import { BrowserStatus } from "../types";

export class Browser {
    private static instance: Browser;
    private browser: PuppeteerBrowser | null = null;
    private status: BrowserStatus = "initialized";

    private constructor() {}

    public static getInstance(): Browser {
        if (!Browser.instance) {
            Browser.instance = new Browser();
        }
        return Browser.instance;
    }

    public async init(): Promise<void> {
        if (this.browser) return;

        this.browser = await puppeteer.launch(browserConfig);
        this.status = "running";
    }

    public async getBrowser(): Promise<PuppeteerBrowser> {
        if (!this.browser) {
            await this.init();
        }
        return this.browser!;
    }

    public async close(): Promise<void> {
        if (this.browser) {
            await this.browser.close();
            this.status = "closed";
        }
    }
}
