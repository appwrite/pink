<script context="module" lang="ts">
    import Link from '$lib/Link.svelte';
    import type { MetaProps, StoryProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Link',
        component: Link,
        argTypes: {
            type: {
                options: ['default', 'quiet', 'muted', 'quiet-muted'],
                control: { type: 'select' }
            },
            size: {
                options: ['small', 'medium', 'large'],
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
</script>

<Template let:args>
    <Link {...args}>Link</Link>
</Template>

<Story name="Default" args={{ href: '/#' }} />
<Story name="Quiet" args={{ href: '/#', type: 'quiet' }} />
<Story name="Muted" args={{ href: '/#', type: 'muted' }} />
<Story name="Disabled" args={{ href: '/#', disabled: true }} />
<Story name="Focus" args={{ href: '/#' }} {play} />
<Story name="Quiet & Muted" args={{ href: '/#', type: 'quiet-muted' }} />
<Story name="Small" args={{ href: '/#', size: 'small' }} />
<Story name="Large" args={{ href: '/#', size: 'large' }} />
