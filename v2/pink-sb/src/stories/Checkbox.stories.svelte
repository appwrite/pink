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
    import Anchor from '$lib/link/Anchor.svelte';
    import Stack from '$lib/layout/Stack.svelte';
    import Text from '../lib/typography/Text.svelte';
</script>

<Template let:args>
    <Selector.Checkbox {...args} />
</Template>

<Story name="Default" />
<Story name="Checked" args={{ checked: true }} />
<Story name="Indeterminate" args={{ checked: 'indeterminate' }} />
<Story name="Disabled" args={{ disabled: true }} />
<Story name="Focus" {play} />
<Story name="Descriptions">
    <Stack gap="xxxl">
        <Stack>
            <Text variant="m-400">1. No description</Text>
            <Selector.Checkbox label="Checkbox" />
        </Stack>

        <Stack>
            <Text variant="m-400">2. Prop description</Text>
            <Selector.Checkbox label="Checkbox" description="This is a description text" />
        </Stack>

        <Stack>
            <Text variant="m-400">3. Slot description</Text>
            <Selector.Checkbox label="Checkbox">
                <Text variant="m-400" color="--fgcolor-neutral-tertiary" slot="description">
                    This is a description as a slot. Here's a <Anchor href="#">link</Anchor> for demo.
                </Text>
            </Selector.Checkbox>
        </Stack>
    </Stack>
</Story>
