<script context="module" lang="ts">
    import { Selector } from '$lib/index.js';
    import type { MetaProps, StoryProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Switch',
        component: Selector.Switch,
        args: {
            id: 'id',
            label: 'This is a label'
        }
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
    <Selector.Switch {...args} />
</Template>

<Story name="Default" />
<Story
    name="With description"
    args={{
        description:
            ' Provide a fallback file for advanced routing and proper page handling in SPA mode.'
    }}
/>
<Story name="Checked" args={{ checked: true }} />
<Story name="Disabled" args={{ disabled: true }} />
<Story name="Focus" {play} />
<Story
    name="Truncated"
    args={{
        label: 'This is a very long label that should be truncated with an ellipsis when the truncate prop is enabled',
        description: 'This is a very long description that should also be truncated with an ellipsis when the truncate prop is enabled',
        truncate: true
    }}
/>
