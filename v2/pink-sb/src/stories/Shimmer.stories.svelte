<script context="module" lang="ts">
    import { Shimmer } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Lab/Shimmer',
        component: Shimmer,
        args: {
            content: 'Loading your dashboard...',
            duration: 1
        }
    };
</script>

<script>
    import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
    <Shimmer>{args.content}</Shimmer>
</Template>

<Story name="Default" let:args>
    <Shimmer {...args}>{args.content}</Shimmer>
</Story>

<Story name="Colors" let:args>
    <Shimmer
        {...args}
        --base-color="var(--brand-pink-700)"
        --base-gradient-color="var(--brand-pink-500)">{args.content}</Shimmer
    >
</Story>
