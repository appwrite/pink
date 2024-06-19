<script context="module" lang="ts">
    import Radio from '$lib/selector/Radio.svelte';
    import type { MetaProps, StoryProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Radio',
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

    const play: StoryProps['play'] = async ({ canvasElement, step }) => {
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
        <Radio group="group" name="group" value="1" checked />
        <Radio group="group" name="group" value="2" />
        <Radio group="group" name="group" value="3" />
    </Stack>
</Story>
