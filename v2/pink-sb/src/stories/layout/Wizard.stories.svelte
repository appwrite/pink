<script context="module" lang="ts">
    import { Layout } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Wizard',
        component: Layout.Wizard,
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
    import { Card, Typography } from '$lib/index.ts';
    import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
    <Layout.Wizard {...args}></Layout.Wizard>
</Template>

<Story name="Default" args={{ direction: 'row' }} let:args>
    <Layout.Wizard {...args}>
        <svelte:fragment slot="header">
            <Typography.Title size="l">Title</Typography.Title>
        </svelte:fragment>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>

        <svelte:fragment slot="aside">
            <Card.Base>aspdsasdfdf</Card.Base>
        </svelte:fragment>
    </Layout.Wizard>
</Story>
