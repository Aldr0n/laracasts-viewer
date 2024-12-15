import { BrowserConfig, LaracastsConfig } from "../interfaces/Config";

export const browserConfig: BrowserConfig = {
    headless: false,
    defaultViewport: {
        width: 1920,
        height: 1080,
    },
};

export const laracastsConfig: LaracastsConfig = {
    baseUrl: "https://laracasts.com",
    credentials: {
        email: process.env.LARACASTS_EMAIL || "",
        password: process.env.LARACASTS_PASSWORD || "",
    },
};
