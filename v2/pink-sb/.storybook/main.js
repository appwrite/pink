import { dirname, join } from 'path';
/** @type { import('@storybook/sveltekit').StorybookConfig } */
const config = {
    stories: ['../src/**/*.stories.svelte'],
    addons: [
        '@storybook/addon-svelte-csf',
        getAbsolutePath('@storybook/addon-links'),
        getAbsolutePath('@storybook/addon-essentials'),
        getAbsolutePath('@storybook/addon-interactions'),
        getAbsolutePath('@storybook/addon-a11y')
    ],
    framework: {
        name: getAbsolutePath('@storybook/sveltekit'),
        options: {}
    }
};

export default config;

function getAbsolutePath(value) {
    return dirname(require.resolve(join(value, 'package.json')));
}
