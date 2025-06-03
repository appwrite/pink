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
    let toggle = true;
</script>

<Template let:args>
    <div class="container">
        <Tooltip {...args}>
            <Button on:click={() => (toggle = !toggle)}>Hover me</Button>
            <p slot="tooltip">{toggle ? 'Tooltip content' : '-'}</p>
        </Tooltip>
    </div>
</Template>

<Story name="Default" />
<Story name="Hover" {play} />
<Story name="Hide Tooltip content when closed">
    <div class="container">
        <Tooltip>
            <Button on:click={() => (toggle = !toggle)}>Hover me</Button>
            <p slot="tooltip" let:showing>
                {#if showing}
                    Long text that can do stuff.
                {/if}
            </p>
        </Tooltip>
    </div>
</Story>

<style>
    .container {
        margin: 12rem auto;
        display: grid;
        place-content: center;
    }
</style>
