import { Browser } from "./core/Browser";
import { Page } from "./core/Page";
import { AuthService } from "./services/AuthService";
import { VideoService } from "./services/VideoService";
import { laracastsConfig } from "./config/config";

async function main() {
    try {
        const browser = Browser.getInstance();
        await browser.init();

        const page = new Page(browser);
        const authService = new AuthService(page);
        const videoService = new VideoService(page);

        // Login
        await authService.login(laracastsConfig.credentials.email, laracastsConfig.credentials.password);

        // Example: Navigate to a video and make it fullscreen
        const puppeteerPage = await page.getPage();
        await puppeteerPage.goto("https://laracasts.com/series/your-series/episodes/1");
        await videoService.play();
        await videoService.toggleFullscreen();
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

main();
