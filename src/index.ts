import { Browser } from "./core/Browser";
import { Page } from "./core/Page";
import { VideoPlayerService } from "./services/VideoService";

async function main() {
    try {
        // setup browser
        const browser = Browser.getInstance();
        await browser.init();
        const page = new Page(browser);

        // setup video service
        const videoPlayerService = new VideoPlayerService(page);
        await videoPlayerService.init();
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

main();
