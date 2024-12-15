import { Page } from "../core/Page";
import { State } from "../core/State";
import { IVideoPlayerService } from "../interfaces/Services";

export class VideoPlayerService implements IVideoPlayerService {
    private isProcessing = false;

    constructor(private page: Page, private state: State = State.getInstance()) {}

    public async init(): Promise<void> {
        await this.registerFullscreenHandler();
    }

    public async registerFullscreenHandler(): Promise<void> {
        await this.page.registerNavCallback(async (page) => {
            if (this.isProcessing || this.state.get("fullscreenClicked")) {
                return;
            }

            try {
                this.isProcessing = true;
                await this.handleFullscreen(page);
            } catch (error) {
                console.error("Error in fullscreen handler:", error);
            } finally {
                this.isProcessing = false;
            }
        });
    }

    public async handleFullscreen(page: any): Promise<void> {
        await page.waitForSelector("iframe");
        console.log("iframe is ready. Loading iframe content");

        const elementHandle = await page.$("iframe");
        const frame = await elementHandle?.contentFrame();

        if (!frame) {
            console.log("No frame found");
            return;
        }

        console.log("filling form in iframe");
        const fullscreenButton = await frame.waitForSelector("#fullscreen-control-bar-button");

        if (!this.state.get("fullscreenClicked")) {
            await fullscreenButton?.click();
            this.state.set("fullscreenClicked", true);
            console.log("Fullscreen mode activated");
        }
    }
}
