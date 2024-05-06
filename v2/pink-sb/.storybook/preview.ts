import type { Preview } from '@storybook/svelte';
import Root from '$lib/Root.svelte';

const preview: Preview = {
    decorators: [
        /** @ts-ignore */
        () => Root
    ]
};

export default preview;
