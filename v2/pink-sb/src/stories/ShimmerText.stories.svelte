<script context="module" lang="ts">
    import { ShimmerText } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Lab/ShimmerText',
        component: ShimmerText,
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
    <ShimmerText>{args.content}</ShimmerText>
</Template>

<Story name="Default" let:args>
    <ShimmerText {...args}>{args.content}</ShimmerText>
</Story>

<Story name="Colors" let:args>
    <ShimmerText
        {...args}
        --base-color="var(--brand-pink-700)"
        --base-gradient-color="var(--brand-pink-500)">{args.content}</ShimmerText
    >
</Story>
