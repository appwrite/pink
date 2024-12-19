/** @type {import('genauigkeit').Config} */
export default {
    port: 6006,
    strict: false,
    directory: './.genauigkeit',
    concurrency: 'auto',
    browsers: {
        chromium: true,
        firefox: false,
        webkit: false
    },
    devices: {
        mobile: false,
        desktop: true
    }
};
