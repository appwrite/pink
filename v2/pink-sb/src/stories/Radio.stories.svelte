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
    import Anchor from '$lib/link/Anchor.svelte';
    import Stack from '$lib/layout/Stack.svelte';
    import Text from '../lib/typography/Text.svelte';
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

<Story name="Descriptions">
    <Stack gap="xxxl">
        <Stack>
            <Text variant="m-400">1. No description</Text>
            <Selector.Radio label="Radio" value="1" id="id1" group="group" name="group" />
        </Stack>

        <Stack>
            <Text variant="m-400">2. Prop description</Text>
            <Selector.Radio
                label="Radio"
                value="2"
                id="id2"
                group="group"
                name="group"
                description="This is a description text"
            />
        </Stack>

        <Stack>
            <Text variant="m-400">3. Slot description</Text>
            <Selector.Radio label="Radio" value="3" id="id3" group="group" name="group">
                <Text variant="m-400" color="--fgcolor-neutral-tertiary" slot="description">
                    This is a description as a slot. Here's a <Anchor href="#">link</Anchor> for demo.
                </Text>
            </Selector.Radio>
        </Stack>
    </Stack>
</Story>
