import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

/** @type { import('@storybook/sveltekit').StorybookConfig } */
const config = {
    stories: ['../src/**/*.stories.svelte'],
    addons: [
        '@storybook/addon-svelte-csf',
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@storybook/addon-a11y'
    ],
    framework: {
        name: '@storybook/sveltekit',
        options: {}
    },
    docs: {
        autodocs: true
    }
};

export default config;
