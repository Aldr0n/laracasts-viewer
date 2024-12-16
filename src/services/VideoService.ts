import { Page as PuppeteerPage } from "puppeteer";
import { State } from "../core/State";
import { IVideoPlayerService } from "../interfaces/Services";
import { sleep } from "../utils/helpers";

export class VideoPlayerService implements IVideoPlayerService {
    private fullScreenProcess = false;
    private finishEpisodeProcess = false;

    constructor(private state: State = State.getInstance()) {}

    public async activateFullscreen(page: PuppeteerPage): Promise<void> {
        if (this.fullScreenProcess || this.state.get("fullscreenClicked")) {
            return;
        }

        this.fullScreenProcess = true;

        await page.waitForSelector("#laracasts-video iframe");

        const frameElement = await page.$("iframe");
        const contentFrame = await frameElement?.contentFrame();

        if (!contentFrame) {
            throw new Error("No video frame found");
        }

        const fullscreenButton = await contentFrame.waitForSelector("#fullscreen-control-bar-button");

        if (!this.state.get("fullscreenClicked")) {
            await fullscreenButton?.click();
            this.state.set("fullscreenClicked", true);
            this.fullScreenProcess = false;
        }
    }

    public async waitForEpisodeFinish(puppeteerPage: PuppeteerPage): Promise<void> {
        if (this.finishEpisodeProcess) return;

        this.finishEpisodeProcess = true;

        while (this.finishEpisodeProcess) {
            try {
                const nextEpisode = await this.watchFlashDialog(puppeteerPage);
                if (nextEpisode) {
                    this.cleanup();
                    this.state.set("autonav", true);
                }
            } catch (error) {
                console.error("Error checking flash dialog:", error);
                this.cleanup();
                break;
            }

            await sleep(500);
        }
    }

    private async watchFlashDialog(puppeteerPage: PuppeteerPage): Promise<boolean> {
        if (!puppeteerPage) throw new Error("Puppeteer page not initialized");

        return puppeteerPage.evaluate(() => {
            const flashDialog = document.querySelector("#flash-dialog #flash-dialog-message");

            if (flashDialog && flashDialog.textContent?.includes("Advancing to the next episode in")) {
                const element = document.querySelector('button[value="Next Episode!"]');
                if (element instanceof HTMLElement) element.click();
                return true;
            }

            return false;
        });
    }

    private cleanup(): void {
        this.finishEpisodeProcess = false;
    }
}
