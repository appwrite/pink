<script context="module" lang="ts">
    import Title from '$lib/typography/Title.svelte';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Typography/Title',
        component: Title
    };
</script>

<script>
    import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
    <Title {...args}>Example Title</Title>
</Template>

<Story name="X-Large" args={{ size: 'xl' }} />
<Story name="Large" args={{ size: 'l' }} />
<Story name="Medium" args={{ size: 'm' }} />
<Story name="Small" args={{ size: 's' }} />
