// @ts-check
import { defineConfig, devices } from '@playwright/test';

const isCI = !!process.env.CI;

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
    testDir: 'tests',
    testMatch: /(.+\.)?(test|spec)\.js/,
    snapshotDir: 'snapshots',
    snapshotPathTemplate: '{snapshotDir}/{projectName}/{arg}{ext}',
    fullyParallel: true,
    workers: '50%',
    retries: isCI ? 2 : 0,
    forbidOnly: isCI,
    reporter: [['html', { open: 'never' }], isCI ? ['github'] : ['line']],
    webServer: {
        command: 'pnpm run dev',
        reuseExistingServer: !process.env.CI,
        port: 6006
    },
    use: {
        connectOptions: {
            wsEndpoint: 'ws://127.0.0.1:3007'
        }
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
