<script context="module" lang="ts">
    import Code from '$lib/typography/Code.svelte';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Typography/Code',
        component: Code
    };
</script>

<script>
    import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
    <Code {...args}>Example</Code>
</Template>

<Story name="Default" />
<Story name="Small" args={{ size: 's' }} />
<Story name="Medium" args={{ size: 'medium' }} />
