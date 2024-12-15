import { IVideoService } from "../interfaces/Services";
import { Page } from "../core/Page";

export class VideoService implements IVideoService {
    constructor(private page: Page) {}

    public async play(): Promise<void> {
        const puppeteerPage = await this.page.getPage();
        await puppeteerPage.click(".vjs-play-control");
    }

    public async pause(): Promise<void> {
        const puppeteerPage = await this.page.getPage();
        await puppeteerPage.click(".vjs-play-control");
    }

    public async toggleFullscreen(): Promise<void> {
        const puppeteerPage = await this.page.getPage();
        await puppeteerPage.click(".vjs-fullscreen-control");
    }

    public async setQuality(quality: string): Promise<void> {
        const puppeteerPage = await this.page.getPage();
        await puppeteerPage.click(".vjs-quality-selector");
        await puppeteerPage.click(`[data-quality="${quality}"]`);
    }
}
