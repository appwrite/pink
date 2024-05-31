// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
    testDir: 'tests',
    testMatch: /(.+\.)?(test|spec)\.js/,
    snapshotDir: 'snapshots',
    snapshotPathTemplate: '{snapshotDir}/{projectName}/{arg}{ext}',
    fullyParallel: true,
    workers: process.env.CI ? 1 : "80%",
    reporter: [['list'], ['html']],
    webServer: {
        command: 'npm run dev',
        reuseExistingServer: !process.env.CI,
        port: 6006
    },
    expect: {
        toHaveScreenshot: {
            stylePath: 'tests/test.css'
        }
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] }
        },

        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] }
        },

        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] }
        },

        /* Test against mobile viewports. */
        {
            name: 'chromium-mobile',
            use: { ...devices['Pixel 5'] }
        },
        {
            name: 'webkit-mobile',
            use: { ...devices['iPhone 12'] }
        }
    ]
});
