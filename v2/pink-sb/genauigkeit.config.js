/** @type {import('genauigkeit').Config} */
export default {
    port: 6006,
    strict: false,
    directory: './.genauigkeit',
    concurrency: 'auto',
    browsers: {
        chromium: true,
        firefox: false,
        webkit: true
    },
    devices: {
        mobile: true,
        desktop: true
    }
};
