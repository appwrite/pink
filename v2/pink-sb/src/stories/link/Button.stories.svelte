<script context="module" lang="ts">
    import { Link } from '$lib/index.js';
    import type { MetaProps, StoryProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Link/Button',
        component: Link.Button,
        argTypes: {
            variant: {
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
    <Link.Button {...args}>Link</Link.Button>
</Template>

<Story name="Default" />
<Story name="Quiet" args={{ variant: 'quiet' }} />
<Story name="Muted" args={{ variant: 'muted' }} />
<Story name="Quiet & Muted" args={{ variant: 'quiet-muted' }} />
<Story name="Disabled" args={{ disabled: true }} />
<Story name="Focus" {play} />
<Story name="Small" args={{ size: 'small' }} />
<Story name="Large" args={{ size: 'large' }} />
