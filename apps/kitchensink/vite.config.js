/**
 * @type {import('vite').UserConfig}
 */
const config = {
  server: {
    port: 3030,
  },
  publicDir: "docs",
  build: {
    outDir: "dist",
  },
  css: {
    devSourcemap: true,
  },
};

export default config;
