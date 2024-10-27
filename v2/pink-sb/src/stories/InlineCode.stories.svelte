<script context="module" lang="ts">
    import InlineCode from '$lib/InlineCode.svelte';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    const code = `npm install appwrite`;

    export const meta: MetaProps = {
        title: 'Components/InlineCode',
        component: InlineCode,
        args: {
            code,
            size: `medium`
        },

        argTypes: {
            size: {
                options: ['s', 'medium'],
                control: { type: 'select' }
            }
        }
    };
</script>

<script>
    import { Story } from '@storybook/addon-svelte-csf';
</script>

<Story name="Default" let:args>
    Example of inline code <InlineCode {...args} /> in a sentence.
</Story>
