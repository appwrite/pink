<script context="module" lang="ts">
    import { Card, Layout } from '$lib/index.js';

    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/GridFraction',
        component: Layout.GridFraction,
        args: {
            gap: 'm'
        },
        argTypes: {
            direction: {
                options: ['column', 'row'],
                control: { type: 'select' }
            },
            gap: {
                options: ['none', 'xs', 's', 'm', 'l', 'xl'],
                control: { type: 'select' }
            }
        }
    };
</script>

<script>
    import { Story, Template } from '@storybook/addon-svelte-csf';
    import Image from '$lib/Image.svelte';
</script>

<Template let:args>
    <Layout.GridFraction {...args}></Layout.GridFraction>
</Template>

<Story name="Rows" args={{ direction: 'row' }} let:args>
    <Card.Button padding="xxs">
        <Layout.GridFraction {...args}>
            <Image title="Title" src="https://picsum.photos/id/237/250" alt="Placeholder image" />
            Some text
        </Layout.GridFraction>
    </Card.Button>
</Story>
