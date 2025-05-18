<script context="module" lang="ts">
    import Text from '$lib/typography/Text.svelte';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Typography/Text',
        component: Text
    };
</script>

<script>
    import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
    <Text {...args}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
</Template>

<Story name="Default" />
<Story name="Large 600" args={{ variant: 'l-600' }} />
<Story name="Large 500" args={{ variant: 'l-500' }} />
<Story name="Large 400" args={{ variant: 'l-400' }} />
<Story name="Medium 600" args={{ variant: 'm-600' }} />
<Story name="Medium 500" args={{ variant: 'm-500' }} />
<Story name="Medium 400" args={{ variant: 'm-400' }} />
