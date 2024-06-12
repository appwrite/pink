<script context="module">
    import Card from '$lib/Card.svelte';

    /** @type {import('@storybook/addon-svelte-csf').MetaProps}*/
    export const meta = {
        title: 'Elements/Card',
        component: Card,
        argTypes: {
            type: {
                options: ['primary', 'secondary'],
                control: { type: 'select' }
            },
            radius: {
                options: ['small', 'medium', 'large'],
                control: { type: 'select' }
            }
        }
    };
</script>

<script>
    import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
    <Card {...args}>
        <p>This is just some text.</p>
    </Card>
</Template>

<Story name="Primary" args={{ type: 'primary' }} />
<Story name="Secondary" args={{ type: 'secondary' }} />
<Story name="Radius - small" args={{ radius: 'small' }} />
<Story name="Radius - medium" args={{ radius: 'medium' }} />
<Story name="Radius - large" args={{ radius: 'large' }} />
