import Root from '$lib/Root.svelte';

/** @type { import('@storybook/svelte').Preview } */
const preview = {
    decorators: [
        /** @ignore */
        () => Root
    ]
};

export default preview;
