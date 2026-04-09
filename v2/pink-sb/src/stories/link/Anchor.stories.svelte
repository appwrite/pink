<script context="module" lang="ts">
    import { Link } from '$lib/index.js';
    import type { MetaProps, StoryProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Link/Anchor',
        component: Link.Anchor,
        argTypes: {
            variant: {
                options: ['default', 'quiet', 'muted', 'quiet-muted'],
                control: { type: 'select' }
            },
            size: {
                options: ['s', 'm', 'l'],
                control: { type: 'select' }
            }
        }
    };

    const play: StoryProps['play'] = async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);
        const button = canvas.getByRole('link');

        await step('highlight button', async () => {
            button.focus();
            await expect(button).toHaveFocus();
        });
    };
</script>

<script>
    import { Story, Template } from '@storybook/addon-svelte-csf';
    import { expect, within } from '@storybook/test';
    import { Typography } from '$lib/index.js';
</script>

<Template let:args>
    <Typography.Text variant="l-400">
        {#if args.text}
            This is some normal text with a <Link.Anchor {...args} text={undefined}
                >Link</Link.Anchor
            > and another <Link.Anchor {...args} text={undefined}>Link</Link.Anchor>
        {:else}
            <Link.Anchor {...args} text={undefined}>Link</Link.Anchor>
        {/if}
    </Typography.Text>
</Template>

<Story name="Default" args={{ href: '/#' }} />
<Story name="Quiet" args={{ href: '/#', variant: 'quiet' }} />
<Story name="Muted" args={{ href: '/#', variant: 'muted' }} />
<Story name="Quiet & Muted" args={{ href: '/#', variant: 'quiet-muted' }} />
<Story name="Disabled" args={{ href: '/#', disabled: true }} />
<Story name="Focus" args={{ href: '/#' }} {play} />
<Story name="Small" args={{ href: '/#', size: 's' }} />
<Story name="Large" args={{ href: '/#', size: 'l' }} />
<Story name="Small with Icon" args={{ href: '/#', size: 's', icon: true }} />
<Story name="Large with Icon" args={{ href: '/#', size: 'l', icon: true }} />
<Story name="Large with Text" args={{ href: '/#', size: 'l', text: true }} />
