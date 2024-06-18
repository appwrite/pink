<script context="module" lang="ts">
    import Card from '$lib/card/CardSelector.svelte';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Elements/Card/Selector',
        component: Card,
        argTypes: {
            variant: {
                options: ['primary', 'secondary'],
                control: { type: 'select' }
            },
            radius: {
                options: ['small', 'medium', 'large'],
                control: { type: 'select' }
            },
            padding: {
                options: ['small', 'medium', 'large'],
                control: { type: 'select' }
            }
        }
    };
</script>

<script>
    import { Story, Template } from '@storybook/addon-svelte-csf';
    let group = 1;
</script>

<Template let:args>
    <Card bind:group value={1} {...args}>
        <h2 slot="title">This is a title</h2>
        <p>This is just some text.</p>
    </Card>
    <Card bind:group value={2} {...args}>
        <h2 slot="title">This is a title</h2>
        <p>This is just some text.</p>
    </Card>
</Template>

<Story name="Primary" args={{ variant: 'primary' }} />
<Story name="Secondary" args={{ variant: 'secondary' }} />
<Story name="Radius - small" args={{ radius: 'small' }} />
<Story name="Radius - medium" args={{ radius: 'medium' }} />
<Story name="Radius - large" args={{ radius: 'large' }} />
<Story name="Padding - small" args={{ padding: 'small' }} />
<Story name="Padding - medium" args={{ padding: 'medium' }} />
<Story name="Padding - large" args={{ padding: 'large' }} />
