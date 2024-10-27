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
<Story name="Indeterminate" args={{ checked: 'indeterminate' }} />
<Story name="Disabled" args={{ disabled: true }} />
<Story name="Focus" {play} />
