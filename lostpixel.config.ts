import { CustomProjectConfig } from "lost-pixel";

export const config: CustomProjectConfig = {
    pageShots: {
        pages: [{ path: "/", name: "kitchensink" }],
        // IP should be localhost when running locally & 172.17.0.1 when running in GitHub action

        baseUrl: "http://172.17.0.1:4173",
    },
    generateOnly: true,
};
