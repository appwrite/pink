import Root from '$lib/Root.svelte';

/** @type { import('@storybook/svelte').Preview } */
const preview = {
    decorators: [() => Root],
    tags: ['autodocs']
};

export default preview;
