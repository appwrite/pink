<script context="module" lang="ts">
    import Popover from '$lib/Popover.svelte';
    import { userEvent, within } from '@storybook/test';
    import type { MetaProps, StoryProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Popover',
        component: Popover
    };

    const play: StoryProps['play'] = async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);
        const button = canvas.getByRole('button');

        await step('click button', async () => {
            await userEvent.click(button);
        });
    };
</script>

<script>
    import { Button } from '$lib/button/index.js';
    import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
    <div class="container">
        <Popover {...args} let:toggle>
            <Button on:click={toggle}>Pop me</Button>
            <p slot="tooltip">Tooltip content</p>
        </Popover>
    </div>
</Template>

<Story name="Default" />
<Story name="Popped" {play} />

<style>
    .container {
        margin: 12rem auto;
        display: grid;
        place-content: center;
    }
</style>
