<script context="module" lang="ts">
    import { Anchor } from '$lib/button/index.js';
    import { within, expect } from '@storybook/test';
    import type { MetaProps, StoryProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Button/Anchor',
        component: Anchor,
        args: {
            content: 'Button',
            type: 'button',
            variant: 'primary',
            href: '#'
        },
        argTypes: {
            variant: {
                options: ['primary', 'secondary', 'text', 'compact'],
                control: { type: 'select' }
            },
            size: {
                options: ['s', 'm'],
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
    <Anchor {...args} on:click>
        {args.content}
    </Anchor>
</Template>

<Story name="Default" />
<Story name="Badge" args={{ badge: '123' }} />
<Story name="Disabled" args={{ disabled: true }} />
<Story name="Focus" {play} />
<Story name="Small" args={{ size: 's' }} />
<Story name="X-Small" args={{ size: 'xs' }} />
