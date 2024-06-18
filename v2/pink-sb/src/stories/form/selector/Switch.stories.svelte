<script context="module" lang="ts">
    import Switch from '$lib/selector/Switch.svelte';
    import type { MetaProps, StoryProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Form/Selector/Switch',
        component: Switch
    };

    const play: StoryProps['play'] = async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);
        const button = canvas.getByRole('switch');

        await step('highlight button', async () => {
            button.focus();
            await expect(button).toHaveFocus();
        });
    };
</script>

<script>
    import { Story, Template } from '@storybook/addon-svelte-csf';
    import { expect, within } from '@storybook/test';
</script>

<Template let:args>
    <Switch {...args} />
</Template>

<Story name="Default" />
<Story name="Checked" args={{ checked: true }} />
<Story name="Disabled" args={{ disabled: true }} />
<Story name="Focus" {play} />
