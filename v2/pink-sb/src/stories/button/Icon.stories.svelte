<script context="module" lang="ts">
    import { Button } from '$lib/button/index.js';
    import { within, expect } from '@storybook/test';
    import type { MetaProps, StoryProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Button/Icon',
        component: Button,
        args: {
            icon: true
        }
    };

    const play: StoryProps['play'] = async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);
        const button = canvas.getByRole('button');

        await step('highlight button', async () => {
            button.focus();
            await expect(button).toHaveFocus();
        });
    };
</script>

<script>
    import Icon from '$lib/Icon.svelte';
    import { IconCheck } from '@appwrite.io/pink-icons-svelte';
    import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
    <Button {...args} on:click>
        <Icon icon={IconCheck} />
    </Button>
</Template>

<Story name="Default" />
<Story name="Disabled" args={{ disabled: true }} />
<Story name="Focus" {play} />
<Story name="Small" args={{ size: 'small' }} />
<Story name="X-Small" args={{ size: 'xs' }} />
