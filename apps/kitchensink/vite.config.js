import { resolve } from "path";
import handlebars from "vite-plugin-handlebars";

/**
 * @type {import('vite').UserConfig}
 */
const config = {
  server: {
    port: 3030,
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        index: new URL("./index.html", import.meta.url).pathname,
        dashboard: new URL("./dashboard.html", import.meta.url).pathname,
        login: new URL("./login.html", import.meta.url).pathname,
        login1: new URL("./login-1.html", import.meta.url).pathname,
        login2: new URL("./login-2.html", import.meta.url).pathname,
        noSide: new URL("./no-side.html", import.meta.url).pathname,
        wizard: new URL("./wizard.html", import.meta.url).pathname,
        wizardForm: new URL("./wizard-form.html", import.meta.url).pathname,
        coverFrame: new URL("./cover-frame.html", import.meta.url).pathname,
        users: new URL("./users.html", import.meta.url).pathname,
        user: new URL("./user.html", import.meta.url).pathname,
        functions: new URL("./functions.html", import.meta.url).pathname,
        userSecurity: new URL("./userSecurity.html", import.meta.url).pathname,
        auth: new URL("./auth.html", import.meta.url).pathname,
        auth2: new URL("./auth2.html", import.meta.url).pathname,
        teamActivity: new URL("./teamActivity.html", import.meta.url).pathname,
        bucket: new URL("./bucket.html", import.meta.url).pathname,
        buckets: new URL("./buckets.html", import.meta.url).pathname,
        bucketSettings: new URL("./bucketSettings.html", import.meta.url)
          .pathname,
        collection: new URL("./collection.html", import.meta.url).pathname,
        emptyStateCards: new URL("./empty-state-cards.html", import.meta.url).pathname,
        gettingStarted: new URL("./getting-started.html", import.meta.url).pathname,
        modalDemo: new URL("./modal-demo.html", import.meta.url).pathname,
        filters: new URL("./filters.html", import.meta.url).pathname,
      },
    },
  },
  css: {
    devSourcemap: true,
  },
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, "partials"),
    }),
  ],
};

export default config;
