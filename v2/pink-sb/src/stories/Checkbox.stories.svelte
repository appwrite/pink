<script context="module" lang="ts">
    import { Selector } from '$lib/index.js';
    import type { MetaProps, StoryProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Checkbox',
        component: Selector.Checkbox,
        args: {
            id: 'id',
            size: 'm',
            label: 'This is a label'
        },
        argTypes: {
            checked: {
                control: {
                    type: 'select'
                },
                options: [true, false, 'indeterminate']
            },
            size: {
                options: ['s', 'm'],
                control: { type: 'select' }
            }
        }
    };

    const play: StoryProps['play'] = async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);
        const button = canvas.getByRole('checkbox');

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
    <Selector.Checkbox {...args} />
</Template>

<Story name="Default" />
<Story name="Checked" args={{ checked: true }} />
<Story name="With description" args={{ description: 'This is a description text' }} />
<Story name="Indeterminate" args={{ checked: 'indeterminate' }} />
<Story name="Disabled" args={{ disabled: true }} />
<Story name="Disabled but checked" args={{ disabled: true, checked: true }} />
<Story name="Focus" {play} />
<Story
    name="Truncated"
    args={{
        label: 'This is a very long label that should be truncated with an ellipsis when the truncate prop is enabled',
        description: 'This is a very long description that should also be truncated with an ellipsis when the truncate prop is enabled',
        truncate: true
    }}
/>
