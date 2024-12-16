import { Page } from "../core/Page";
import { Page as PuppeteerPage } from "puppeteer";
import { State } from "../core/State";
import { VideoPlayerService } from "./VideoService";

export class EventService {
    constructor(private page: Page, private videoPlayerService: VideoPlayerService, private state: State = State.getInstance()) {}

    private puppeteerPage: PuppeteerPage | null = null;

    public async init(): Promise<void> {
        this.puppeteerPage = await this.page.getPuppeteerPage();

        await this.page.registerNavCallback(async (page) => {
            await this.setupFullscreenHandling();
            await this.setupAutoNavHandling();
        });
    }

    private async setupFullscreenHandling(): Promise<void> {
        if (!this.puppeteerPage) throw new Error("Puppeteer page not initialized");
        if (this.state.get("autonav") === false) return;

        try {
            await this.videoPlayerService.activateFullscreen(this.puppeteerPage);
            this.state.set("autonav", false);
        } catch (error) {
            console.error("Error in fullscreen handler:", error);
        }
    }

    private async setupAutoNavHandling(): Promise<void> {
        if (!this.puppeteerPage) throw new Error("Puppeteer page not initialized");

        try {
            await this.videoPlayerService.waitForEpisodeFinish(this.puppeteerPage);
        } catch (error) {
            console.error("Error in auto nav handler:", error);
        }
    }
}
