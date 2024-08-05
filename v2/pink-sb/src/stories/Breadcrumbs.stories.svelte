<script context="module" lang="ts">
    import { Breadcrumbs } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Breadcrumbs',
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
