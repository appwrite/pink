import { build } from "vite";
import { generateIcons } from "./icons.js";

const buildDocs = async () => {
    await generateIcons();
    await build();
}
buildDocs();