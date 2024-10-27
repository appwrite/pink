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
    import Button from '$lib/button/Button.svelte';
    import { Story, Template } from '@storybook/addon-svelte-csf';
    import Stack from './Stack.stories.svelte';
</script>

<Template let:args>
    <Layout.Wizard {...args}></Layout.Wizard>
</Template>

<Story name="Default" args={{ title: 'Wizard' }} let:args>
    <Layout.Wizard {...args}>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>

        <svelte:fragment slot="aside">
            <Card.Base>aspdsasdfdf</Card.Base>
        </svelte:fragment>
        <svelte:fragment slot="footer">
            <Button variant="secondary" size="s">Cancel</Button>
            <Button size="s">Next</Button>
        </svelte:fragment>
    </Layout.Wizard>
</Story>
<Story name="Inverted columns" args={{ title: 'Wizard', invertColumns: true }} let:args>
    <Layout.Wizard {...args}>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>

        <svelte:fragment slot="aside">
            <Card.Base>aspdsasdfdf</Card.Base>
        </svelte:fragment>
    </Layout.Wizard>
</Story>
