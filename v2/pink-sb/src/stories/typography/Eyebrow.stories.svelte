<script context="module" lang="ts">
    import Eyebrow from '$lib/typography/Eyebrow.svelte';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Typography/Eyebrow',
        component: Eyebrow
    };
</script>

<script>
    import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
    <Eyebrow {...args}>Example</Eyebrow>
</Template>

<Story name="Default" />
<Story name="Small" args={{ size: 's' }} />
<Story name="Medium" args={{ size: 'm' }} />
<Story name="Large" args={{ size: 'large' }} />
