/**
 * @type {import('vite').UserConfig}
 */
 const config = {
    publicDir: 'styleguide',
    build: {
        outDir: 'dist'
    },
    css: {
        devSourcemap: true
    }
}

export default config;