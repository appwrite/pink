<script context="module" lang="ts">
    import Checkbox from '$lib/selector/Checkbox.svelte';
    import type { MetaProps, StoryProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Checkbox',
        component: Checkbox,
        args: {
            size: 'm'
        },
        argTypes: {
            checked: {
                control: {
                    type: 'select'
                },
                options: [true, false, 'indeterminate']
            },
            size: {
                options: ['small', 'medium'],
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
    <Checkbox {...args} />
</Template>

<Story name="Default" />
<Story name="Checked" args={{ checked: true }} />
<Story name="Indeterminate" args={{ checked: 'indeterminate' }} />
<Story name="Disabled" args={{ disabled: true }} />
<Story name="Focus" {play} />
