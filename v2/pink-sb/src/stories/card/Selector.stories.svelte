<script context="module" lang="ts">
    import { Card } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Card/Selector',
        component: Card.Selector,
        args: {
            title: 'This is a title',
            info: 'This is some info.'
        },
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
                options: ['x-small, small', 'medium', 'large'],
                control: { type: 'select' }
            }
        }
    };
</script>

<script>
    import { Layout } from '$lib/index.ts';
    import Tag from '$lib/Tag.svelte';
    import { Story, Template } from '@storybook/addon-svelte-csf';
    import { IconApi } from '@appwrite.io/pink-icons-svelte';
    let group = 1;
</script>

<Template let:args>
    <Layout.Stack direction="row">
        <Card.Selector bind:group value={1} {...args} icon={IconApi}>
            <svelte:fragment slot="action"><Tag size="small">New</Tag></svelte:fragment>
            <p>This is just some text.</p>
        </Card.Selector>
        <Card.Selector bind:group value={2} {...args} info={undefined}>
            <p>This is just some text.</p>
        </Card.Selector>
    </Layout.Stack>
</Template>

<Story name="Primary" args={{ variant: 'primary' }} />
<Story name="Secondary" args={{ variant: 'secondary' }} />
<Story
    name="With image"
    args={{ variant: 'primary', src: 'https://via.placeholder.com/248x148' }}
/>
<Story name="Radius - small" args={{ radius: 'small' }} />
<Story name="Radius - medium" args={{ radius: 'medium' }} />
<Story name="Radius - large" args={{ radius: 'large' }} />
<Story name="Padding - x-small" args={{ padding: 'x-small' }} />
<Story name="Padding - small" args={{ padding: 'small' }} />
<Story name="Padding - medium" args={{ padding: 'medium' }} />
<Story name="Padding - large" args={{ padding: 'large' }} />
