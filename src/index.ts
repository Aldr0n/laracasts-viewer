import { Browser } from "./core/Browser";
import { Page } from "./core/Page";
import { AuthService } from "./services/AuthService";
import { VideoService } from "./services/VideoService";

async function main() {
    try {
        const browser = Browser.getInstance();
        await browser.init();

        const page = new Page(browser);
        const authService = new AuthService(page);
        const videoService = new VideoService(page);
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

main();
