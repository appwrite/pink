<script context="module">
    import Checkbox from '$lib/selector/Checkbox.svelte';

    /** @type {import('@storybook/addon-svelte-csf').MetaProps}*/
    export const meta = {
        title: 'Form/Selector/Checkbox',
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

    /** @type {import('@storybook/addon-svelte-csf').TemplateProps['play']}*/
    const play = async ({ canvasElement, step }) => {
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
