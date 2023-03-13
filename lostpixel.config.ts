import { CustomProjectConfig } from "lost-pixel";

export const config: CustomProjectConfig = {
    pageShots: {
        pages: [
            {
                path: "/elements/button",
                name: "buttons",
            },
            {
                path: "/elements/card",
                name: "card",
            },
            {
                path: "/elements/input-field",
                name: "input-field",
            },
        ],
        baseUrl: "http://172.17.0.1:3333",
    },
    generateOnly: true,
    lostPixelProjectId: "clf6rcb5205pmmg0ehjcxzv68",
    apiKey: process.env.LOST_PIXEL_API_KEY,
};
