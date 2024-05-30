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
    reporter: process.env.CI ? 'github' : 'html',
    webServer: {
        command: 'npm run dev',
        reuseExistingServer: !process.env.CI,
        port: 6006
    },
    expect: {
        toHaveScreenshot: {
            scale: 'device',
            threshold: 0.1,
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
