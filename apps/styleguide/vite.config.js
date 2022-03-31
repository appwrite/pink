/**
 * @type {import('vite').UserConfig}
 */
 const config = {
    publicDir: 'docs',
    build: {
        outDir: 'dist'
    },
    css: {
        devSourcemap: true
    }
}

export default config;