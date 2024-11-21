<script context="module" lang="ts">
    import { Selector, Layout } from '$lib/index.js';
    import type { MetaProps, StoryProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Radio',
        component: Selector.Radio,
        args: {
            name: 'name',
            label: 'This is a label'
        },
        argTypes: {
            size: {
                options: ['s', 'm'],
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
</script>

<Template let:args>
    <Selector.Radio {...args} />
</Template>

<Story name="Default" />
<Story name="Checked" args={{ checked: true }} />
<Story name="Disabled" args={{ disabled: true }} />
<Story name="Focus" {play} />
<Story name="Group">
    <Layout.Stack>
        <Selector.Radio id="id1" label="Option 1" group="group" name="group" value="1" checked />
        <Selector.Radio id="id2" label="Option 2" group="group" name="group" value="2" />
        <Selector.Radio id="id3" label="Option 3" group="group" name="group" value="3" />
    </Layout.Stack>
</Story>
