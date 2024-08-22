import Dark from './themes/Dark.svelte';
import Light from './themes/Light.svelte';

/** @type { import('@storybook/svelte').Preview } */
const preview = {
    decorators: [
        (_, { globals }) => {
            return globals.theme === 'light' ? Light : Dark;
        }
    ],
    globalTypes: {
        theme: {
            description: 'Global theme for components',
            defaultValue: 'light',
            toolbar: {
                title: 'Theme',
                items: [
                    { value: 'light', right: '☀', title: 'Light' },
                    { value: 'dark', right: '☽', title: 'Dark' }
                ]
            }
        }
    },
    tags: []
};

export default preview;
