import { Page } from "puppeteer";

export interface IAuthService {
    login(email: string, password: string): Promise<void>;
    logout(): Promise<void>;
}

export interface IVideoService {
    play(): Promise<void>;
    pause(): Promise<void>;
    toggleFullscreen(): Promise<void>;
    setQuality(quality: string): Promise<void>;
}

export interface IPageService {
    getPage(): Promise<Page>;
    closePage(): Promise<void>;
}
