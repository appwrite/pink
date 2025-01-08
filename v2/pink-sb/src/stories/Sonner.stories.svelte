<script context="module" lang="ts">
    import { Sonner } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Lab/Sonner',
        component: Sonner
    };
</script>

<script>
    import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
    <Sonner {...args} />
</Template>

<Story name="Default" let:args>
    <Sonner {...args} />
</Story>
