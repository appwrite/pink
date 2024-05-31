import { test, expect } from '@playwright/test';

/**
 * @typedef {Object} Story
 * @property {string} id
 * @property {string} title
 * @property {string} name
 * @property {string} type
 * @property {string[]} tags

 * @typedef {Object} StorybookIndex
 * @property {string} v
 * @property {Record<string,Story>} entries
 */
/**
 * @returns {Promise<StorybookIndex>}
 */
async function get_index() {
    return fetch('http://localhost:6006/index.json').then((response) => response.json());
}
/**
 * @returns {Promise<Array<Story>>}
 */
async function all_stories() {
    const stories = [];
    const index = await get_index();
    for (const [id, story] of Object.entries(index.entries)) {
        if (story.type === 'story') {
            stories.push(story);
        }
    }
    return stories;
}

const stories = await all_stories();

test.describe('visual regression', () => {
    for (const story of stories) {
        test(story.id, async ({ page }) => {
            const url = new URL('http://localhost:6006/iframe.html');
            url.searchParams.set('id', story.id);
            url.searchParams.set('viewMode', 'story');
            await page.goto(url.toString());
            await page.waitForLoadState('networkidle');
            await page.evaluate(() => document.fonts.ready);
            await page.waitForTimeout(500);
            const root = page.locator('#storybook-root');
            await expect(root).toHaveScreenshot();
        });
    }
});
