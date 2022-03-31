/**
 * @type {import('vite').UserConfig}
 */
 const config = {
    publicDir: 'public',
    build: {
        outDir: 'dist'
    },
    css: {
        devSourcemap: true
    }
}

export default config;