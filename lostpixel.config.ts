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
        // IP should be localhost when running locally & 172.17.0.1 when running in GitHub action

        baseUrl: "http://172.17.0.1:3333",
    },
    generateOnly: true,
};
