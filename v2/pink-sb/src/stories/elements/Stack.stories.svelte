<script context="module">
    import Stack from '$lib/layout/Stack.svelte';

    /** @type {import('@storybook/addon-svelte-csf').MetaProps}*/
    export const meta = {
        title: 'Layout/Stack',
        component: Stack,
        argTypes: {
            direction: {
                options: ['column', 'row'],
                control: { type: 'select' }
            },
            gap: {
                control: {
                    min: 0,
                    type: 'number'
                }
            }
        }
    };
</script>

<script>
    import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
    <Stack {...args}></Stack>
</Template>

<Story name="Rows" args={{ direction: 'row' }} let:args>
    <Stack {...args}>
        <div class="demo-block">Item 1</div>
        <div class="demo-block">Item 2</div>
        <div class="demo-block">Item 3</div>
    </Stack>
</Story>
<Story name="Colums" args={{ direction: 'column' }} let:args>
    <Stack {...args}>
        <div class="demo-block">Item 1</div>
        <div class="demo-block">Item 2</div>
        <div class="demo-block">Item 3</div>
    </Stack>
</Story>
<Story name="Nested">
    <Stack direction="row">
        <Stack direction="column">
            <div class="demo-block">Item 1.1</div>
            <div class="demo-block">Item 1.2</div>
            <div class="demo-block">Item 1.3</div>
        </Stack>
        <Stack direction="column">
            <Stack direction="row">
                <div class="demo-block">Item 2.1.1</div>
                <div class="demo-block">Item 2.1.2</div>
            </Stack>
            <div class="demo-block">Item 2.2</div>
        </Stack>
        <Stack direction="column">
            <div class="demo-block">Item 3</div>
        </Stack>
    </Stack>
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
