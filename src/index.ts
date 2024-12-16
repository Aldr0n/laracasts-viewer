import { Browser } from "./core/Browser";
import { Page } from "./core/Page";
import { EventService } from "./services/EventService";
import { VideoPlayerService } from "./services/VideoService";

async function main() {
    try {
        // bootstrap app
        const browser = Browser.getInstance();
        await browser.init();
        const page = new Page(browser);
        const videoPlayerService = new VideoPlayerService();
        const eventHandlerService = new EventService(page, videoPlayerService);
        await eventHandlerService.init();
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

main();
