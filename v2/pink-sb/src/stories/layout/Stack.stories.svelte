<script context="module" lang="ts">
    import { Layout } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Stack',
        component: Layout.Stack,
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
</script>

<Template let:args>
    <Layout.Stack {...args}></Layout.Stack>
</Template>

<Story name="Rows" args={{ direction: 'row' }} let:args>
    <Layout.Stack {...args}>
        <div class="demo-block">Item 1</div>
        <div class="demo-block">Item 2</div>
        <div class="demo-block">Item 3</div>
    </Layout.Stack>
</Story>
<Story name="Colums" args={{ direction: 'column' }} let:args>
    <Layout.Stack {...args}>
        <div class="demo-block">Item 1</div>
        <div class="demo-block">Item 2</div>
        <div class="demo-block">Item 3</div>
    </Layout.Stack>
</Story>
<Story name="Nested">
    <Layout.Stack direction="row">
        <Layout.Stack direction="column">
            <div class="demo-block">Item 1.1</div>
            <div class="demo-block">Item 1.2</div>
            <div class="demo-block">Item 1.3</div>
        </Layout.Stack>
        <Layout.Stack direction="column">
            <Layout.Stack direction="row">
                <div class="demo-block">Item 2.1.1</div>
                <div class="demo-block">Item 2.1.2</div>
            </Layout.Stack>
            <div class="demo-block">Item 2.2</div>
        </Layout.Stack>
        <Layout.Stack direction="column">
            <div class="demo-block">Item 3</div>
        </Layout.Stack>
    </Layout.Stack>
</Story>

<style>
    .demo-block {
        display: grid;
        place-content: center;
        background-color: #f0f0f0;
        padding: 1rem;
        width: 100%;
        height: 100%;
    }
</style>
