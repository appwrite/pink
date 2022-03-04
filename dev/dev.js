import { createServer } from "vite";
import { generateIcons } from "./icons.js";

const dev = async () => {
    const server = await createServer();
    await generateIcons();
    await server.listen();
    server.printUrls();
}
dev();