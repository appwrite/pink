<script context="module">
    import Tag from '$lib/Tag.svelte';

    /** @type {import('@storybook/addon-svelte-csf').MetaProps}*/
    export const meta = {
        title: 'Elements/Tag',
        component: Tag
    };
</script>

<script>
    import { Story, Template } from '@storybook/addon-svelte-csf';
    const defaultArgs = { content: 'Tag' };
</script>

<Template let:args>
    <Tag {...defaultArgs} {...args} />
</Template>

<Story name="Primary" args={{ variant: 'primary' }} />
