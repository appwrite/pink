<script context="module" lang="ts">
    import { Card } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Card/Button',
        component: Card.Button,
        argTypes: {
            variant: {
                options: ['primary', 'secondary'],
                control: { type: 'select' }
            },
            radius: {
                options: ['s', 'm', 'l'],
                control: { type: 'select' }
            },
            padding: {
                options: ['xs, s', 'm', 'l'],
                control: { type: 'select' }
            }
        }
    };
</script>

<script>
    import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
    <Card.Button {...args}>
        <p>This is just some text.</p>
    </Card.Button>
</Template>

<Story name="Primary" args={{ variant: 'primary' }} />
<Story name="Secondary" args={{ variant: 'secondary' }} />
<Story name="Radius - s" args={{ radius: 's' }} />
<Story name="Radius - m" args={{ radius: 'm' }} />
<Story name="Radius - l" args={{ radius: 'l' }} />
<Story name="Padding - xs" args={{ padding: 'xs' }} />
<Story name="Padding - s" args={{ padding: 's' }} />
<Story name="Padding - m" args={{ padding: 'm' }} />
<Story name="Padding - l" args={{ padding: 'l' }} />
