import { Page } from "puppeteer";

export interface IAuthService {
    login(email: string, password: string): Promise<void>;
    logout(): Promise<void>;
}

export interface IVideoPlayerService {
    activateFullscreen(page: any): Promise<void>;
    waitForEpisodeFinish(page: any): Promise<void>;
}

export interface IPageService {
    getPage(): Promise<Page | null>;
    closePage(): Promise<void>;
}
