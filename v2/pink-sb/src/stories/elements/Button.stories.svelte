<script context="module">
    import Button from '$lib/Button.svelte';
    import { within, expect } from '@storybook/test';

    /** @type {import('@storybook/addon-svelte-csf').MetaProps}*/
    export const meta = {
        title: 'Elements/Button',
        component: Button,
        args: {
            content: 'Button',
            type: 'button'
        },
        argTypes: {
            variant: {
                options: ['primary', 'secondary', 'text'],
                control: { type: 'select' }
            },
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

<Story name="Primary" args={{ variant: 'primary' }} />
<Story name="Primary - badge" args={{ variant: 'primary', badge: '123' }} />
<Story name="Primary - disabled" args={{ variant: 'primary', disabled: true }} />
<Story name="Primary - focus" args={{ variant: 'primary' }} {play} />
<Story name="Primary - small" args={{ variant: 'primary', size: 'small' }} />
<Story name="Primary - small - badge" args={{ variant: 'primary', size: 'small', badge: '123' }} />
<Story
    name="Primary - small - disabled"
    args={{ variant: 'primary', size: 'small', disabled: true }}
/>
<Story name="Primary - small - focus" args={{ variant: 'primary', size: 'small' }} {play} />
<Story name="Secondary" args={{ variant: 'secondary' }} />
<Story name="Secondary - badge" args={{ variant: 'secondary', badge: '123' }} />
<Story name="Secondary - disabled" args={{ variant: 'secondary', disabled: true }} />
<Story name="Secondary - focus" args={{ variant: 'secondary' }} {play} />
<Story name="Secondary - small" args={{ variant: 'secondary', size: 'small' }} />
<Story
    name="Secondary - small - badge"
    args={{ variant: 'secondary', size: 'small', badge: '123' }}
/>
<Story
    name="Secondary - small - disabled"
    args={{ variant: 'secondary', size: 'small', disabled: true }}
/>
<Story name="Secondary - small - focus" args={{ variant: 'secondary', size: 'small' }} {play} />
<Story name="Text" args={{ variant: 'text' }} />
<Story name="Text - badge" args={{ variant: 'text', badge: '123' }} />
<Story name="Text - disabled" args={{ variant: 'text', disabled: true }} />
<Story name="Text - focus" args={{ variant: 'text' }} {play} />
<Story name="Text - small" args={{ variant: 'text', size: 'small' }} />
<Story name="Text - small - badge" args={{ variant: 'text', size: 'small', badge: '123' }} />
<Story name="Text - small - disabled" args={{ variant: 'text', size: 'small', disabled: true }} />
<Story name="Text - small - focus" args={{ variant: 'text', size: 'small' }} {play} />
