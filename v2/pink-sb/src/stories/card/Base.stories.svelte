<script context="module" lang="ts">
    import { Card } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Card/Base',
        component: Card.Base,
        argTypes: {
            variant: {
                options: ['primary', 'secondary'],
                control: { type: 'select' }
            },
            radius: {
                options: ['s', 'medium', 'large'],
                control: { type: 'select' }
            },
            padding: {
                options: ['xs, s', 'medium', 'large'],
                control: { type: 'select' }
            }
        }
    };
</script>

<script>
    import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
    <Card.Base {...args}>
        <p>This is just some text.</p>
    </Card.Base>
</Template>

<Story name="Primary" args={{ variant: 'primary' }} />
<Story name="Secondary" args={{ variant: 'secondary' }} />
<Story name="Radius - s" args={{ radius: 's' }} />
<Story name="Radius - medium" args={{ radius: 'medium' }} />
<Story name="Radius - large" args={{ radius: 'large' }} />
<Story name="Padding - xs" args={{ padding: 'xs' }} />
<Story name="Padding - s" args={{ padding: 's' }} />
<Story name="Padding - medium" args={{ padding: 'medium' }} />
<Story name="Padding - large" args={{ padding: 'large' }} />
<Story name="Border - solid" args={{ border: 'solid' }} />
<Story name="Border - dashed" args={{ border: 'dashed' }} />
