<script context="module">
    import Divider from '$lib/Divider.svelte';

    /** @type {import('@storybook/addon-svelte-csf').MetaProps}*/
    export const meta = {
        title: 'Elements/Divider',
        component: Divider,
        args: {
            dashed: false
        }
    };
</script>

<script>
    import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
    <Divider {...args} />
</Template>

<Story name="Default">
    <Divider />
</Story>
<Story name="Dashed" args={{ dashed: true }} />
