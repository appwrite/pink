<script context="module" lang="ts">
    import Tooltip from '$lib/Tooltip.svelte';
    import { userEvent, within } from '@storybook/test';
    import type { MetaProps, StoryProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Tooltip',
        component: Tooltip
    };

    const play: StoryProps['play'] = async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);
        const button = canvas.getByRole('button');

        await step('hover button', async () => {
            await userEvent.hover(button);
        });
    };
</script>

<script>
    import { Button } from '$lib/button/index.js';
    import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
    <div class="container">
        <Tooltip {...args}>
            <Button>Hover me</Button>
            <p slot="tooltip">Tooltip content</p>
        </Tooltip>
    </div>
</Template>

<Story name="Default" />
<Story name="Hover" {play} />

<style>
    .container {
        margin: 12rem auto;
        display: grid;
        place-content: center;
    }
</style>
