<script context="module" lang="ts">
    import Tag from '$lib/Tag.svelte';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Tag',
        component: Tag,
        args: {
            content: 'Tag'
        }
    };
</script>

<script>
    import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
    <Tag {...args} />
</Template>

<Story name="Default" />
<Story name="Selected" args={{ selected: true }} />
