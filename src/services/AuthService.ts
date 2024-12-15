import { IAuthService } from "../interfaces/Services";
import { Page } from "../core/Page";
import { laracastsConfig } from "../config/config";

export class AuthService implements IAuthService {
    constructor(private page: Page) {}

    public async login(email: string, password: string): Promise<void> {
        const puppeteerPage = await this.page.getPage();
        await puppeteerPage.goto(`${laracastsConfig.baseUrl}/login`);

        await puppeteerPage.type('input[type="email"]', email);
        await puppeteerPage.type('input[type="password"]', password);
        await puppeteerPage.click('button[type="submit"]');

        await puppeteerPage.waitForNavigation();
    }

    public async logout(): Promise<void> {
        const puppeteerPage = await this.page.getPage();
        await puppeteerPage.goto(`${laracastsConfig.baseUrl}/logout`);
    }
}
