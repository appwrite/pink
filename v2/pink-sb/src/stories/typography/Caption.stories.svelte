<script context="module" lang="ts">
    import Caption from '$lib/typography/Caption.svelte';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Typography/Caption',
        component: Caption
    };
</script>

<script>
    import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
    <Caption {...args}>This is a caption</Caption>
</Template>

<Story name="Default" />
<Story name="Variant 400" args={{ variant: '400' }} />
<Story name="Variant 500" args={{ variant: '500' }} />
