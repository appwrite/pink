import svgtofont from "svgtofont";
import { resolve } from "path";

export const generateIcons = async () => {
    try {
        await svgtofont({
            src: resolve(process.cwd(), "svg"),
            dist: resolve(process.cwd(), "dist"),
            fontName: "icon",
            css: {
                fontSize: "16px",
                cssPath: "/dist/"
            },
            website: {
                title: "appwrite-icons",
                version: "0.0.0",
                logo: "./docs/logo.svg",
            },
            outSVGReact: false,
            svgicons2svgfont: {
                centerHorizontally: true,
                centerVertically: true,
                fixedWidth: true,
                fontHeight: 1000,
                normalize: true,
                ascent: 850
            }
        });
    } catch (error) {
        console.error(error);
    }
}

generateIcons();