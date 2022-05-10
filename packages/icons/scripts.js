import svgtofont from "svgtofont";
import SVGFixer from "oslllo-svg-fixer";
import { resolve } from "path";

const src = resolve(process.cwd(), "svg");

export const generateIcons = async () => {
    await svgtofont({
        src: src,
        dist: resolve(process.cwd(), "dist"),
        fontName: "icon",
        css: {
            fontSize: "16px",
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
        },
        svgoOptions: {
            full: false
        }
    });
}

export const optimizeSVG = async () => {
    const fixer = new SVGFixer(src, src, {
        showProgressBar: true
    });

    await fixer.fix();
}