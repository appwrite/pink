<script context="module">
    import Tag from '$lib/Tag.svelte';

    /** @type {import('@storybook/addon-svelte-csf').MetaProps}*/
    export const meta = {
        title: 'Elements/Tag',
        component: Tag,
        args: {
            content: 'Tag',
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
