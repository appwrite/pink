<script context="module">
    import Radio from '$lib/selector/Radio.svelte';

    /** @type {import('@storybook/addon-svelte-csf').MetaProps}*/
    export const meta = {
        title: 'Form/Selector/Radio',
        component: Radio,
        args: {
            name: 'name'
        },
        argTypes: {
            size: {
                options: ['small', 'medium'],
                control: { type: 'select' }
            }
        }
    };

    /** @type {import('@storybook/addon-svelte-csf').TemplateProps['play']}*/
    const play = async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);
        const button = canvas.getByRole('radio');

        await step('highlight radio', async () => {
            button.focus();
            await expect(button).toHaveFocus();
        });
    };
</script>

<script>
    import { Story, Template } from '@storybook/addon-svelte-csf';
    import { expect, within } from '@storybook/test';
    import Stack from '$lib/layout/Stack.svelte';
</script>

<Template let:args>
    <Radio {...args} />
</Template>

<Story name="Default" />
<Story name="Checked" args={{ checked: true }} />
<Story name="Disabled" args={{ disabled: true }} />
<Story name="Focus" {play} />
<Story name="Group">
    <Stack>
        <Radio name="group" value="1" checked />
        <Radio name="group" value="2" />
        <Radio name="group" value="3" />
    </Stack>
</Story>
