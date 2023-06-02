import { CustomProjectConfig, PageScreenshotParameter } from "lost-pixel";

const defaultPageOptions: Partial<PageScreenshotParameter> = {
    waitBeforeScreenshot: 2500
}

export const config: CustomProjectConfig = {
    pageShots: {
        pages: [
            {
                path: "/elements/button",
                name: "buttons",
                ...defaultPageOptions
            },
            {
                path: "/elements/card",
                name: "card",
                ...defaultPageOptions
            },
            {
                path: "/elements/input-field",
                name: "input-field",
                ...defaultPageOptions
            },
        ],
        baseUrl: "http://172.17.0.1:3333",
    },
    lostPixelProjectId: "clf6rcb5205pmmg0ehjcxzv68",
    apiKey: process.env.LOST_PIXEL_API_KEY,
};
