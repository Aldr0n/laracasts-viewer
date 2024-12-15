export interface LaracastsConfig {
    baseUrl: string;
    credentials: {
        email: string;
        password: string;
    };
}

export interface BrowserConfig {
    headless: boolean;
    defaultViewport: {
        width: number;
        height: number;
    };
}
