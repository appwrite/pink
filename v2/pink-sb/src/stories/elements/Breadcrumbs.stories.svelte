<script context="module">
    import Breadcrumbs from '$lib/Breadcrumbs.svelte';

    /** @type {import('@storybook/addon-svelte-csf').MetaProps}*/
    export const meta = {
        title: 'Elements/Breadcrumbs',
        component: Breadcrumbs,
        args: {
            crumbs: [
                {
                    title: 'Lorem Ipsum',
                    href: '#'
                },
                {
                    title: 'Lorem Ipsum',
                    href: '#'
                },
                {
                    title: 'Lorem Ipsum',
                    href: '#'
                },
                {
                    title: 'Lorem Ipsum',
                    href: '#'
                },
                {
                    title: 'Lorem Ipsum',
                    href: '#'
                }
            ]
        }
    };
</script>

<script>
    import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
    <Breadcrumbs {...args} />
</Template>

<Story name="Default" />
