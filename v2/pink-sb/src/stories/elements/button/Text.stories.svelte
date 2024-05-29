<script context="module">
    import Button from '$lib/Button.svelte';
    import { within, expect } from '@storybook/test';

    /** @type {import('@storybook/addon-svelte-csf').MetaProps}*/
    export const meta = {
        title: 'Elements/Button/Text',
        component: Button,
        args: {
            content: 'Button',
            type: 'button',
            variant: 'text'
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

    /** @type {import('@storybook/addon-svelte-csf').TemplateProps['play']}*/
    const play = async ({ canvasElement, step }) => {
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
    <Button {...args} on:click />
</Template>

<Story name="Default" />
<Story name="Badge" args={{ badge: '123' }} />
<Story name="Disabled" args={{ disabled: true }} />
<Story name="Focus" {play} />
<Story name="Small" args={{ size: 'small' }} />
<Story name="Small with badge" args={{ size: 'small', badge: '123' }} />
<Story name="Small with disabled" args={{ size: 'small', disabled: true }} />
<Story name="Small with focus" args={{ size: 'small' }} {play} />
