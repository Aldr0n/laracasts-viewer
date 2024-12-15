import { Page } from "puppeteer";

export interface IAuthService {
    login(email: string, password: string): Promise<void>;
    logout(): Promise<void>;
}

export interface IVideoPlayerService {
    registerFullscreenHandler(): Promise<void>;
    handleFullscreen(page: any): Promise<void>;
    init(): Promise<void>;
}

export interface IPageService {
    getPage(): Promise<Page | null>;
    closePage(): Promise<void>;
}
