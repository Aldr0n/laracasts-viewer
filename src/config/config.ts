import path from "path";
import { BrowserConfig, LaracastsConfig } from "../interfaces/Config";

export const browserConfig: BrowserConfig = {
    headless: false,
    defaultViewport: null,
    args: [
        "--app=https://laracasts.com/me",
        "--window-size=1280,800",
        "--center-window",
        "--disable-infobars",
        "--disable-notifications",
        "--no-default-browser-check",
        "--disable-session-crashed-bubble",
        "--disable-translate",
        "--disable-features=TranslateUI",
        "--disable-save-password-bubble",
        "--disable-extensions",
        "--disable-default-apps",
    ],
    ignoreDefaultArgs: ["--enable-automation"],
    userDataDir: path.join(process.cwd(), "dist", "user_data"),
};

export const laracastsConfig: LaracastsConfig = {
    baseUrl: "https://laracasts.com",
    credentials: {
        email: process.env.LARACASTS_EMAIL || "",
        password: process.env.LARACASTS_PASSWORD || "",
    },
};
