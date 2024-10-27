<script context="module" lang="ts">
    import { Button } from '$lib/button/index.js';
    import { within, expect } from '@storybook/test';
    import type { MetaProps, StoryProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Button/Compact',
        component: Button,
        args: {
            content: 'Button',
            type: 'button',
            variant: 'compact'
        },
        argTypes: {
            type: {
                options: ['button', 'submit', 'reset'],
                control: { type: 'select' }
            },
            size: {
                options: ['small', 'medium'],
                control: { type: 'select' }
            }
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
    import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
    <Button {...args} on:click>
        {args.content}
    </Button>
</Template>

<Story name="Default" />
<Story name="Badge" args={{ badge: '123' }} />
<Story name="Disabled" args={{ disabled: true }} />
<Story name="Focus" {play} />
<Story name="Small" args={{ size: 'small' }} />
<Story name="X-Small" args={{ size: 'xs' }} />
