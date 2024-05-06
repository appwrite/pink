/** @type { import('@storybook/sveltekit').StorybookConfig } */
const config = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: [
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
        autodocs: 'tag'
    }
};

export default config;
