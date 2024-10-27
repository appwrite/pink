<script context="module" lang="ts">
    import { Avatar } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Avatar',
        component: Avatar,
        args: {
            size: 'medium'
        },
        argTypes: {
            size: {
                options: ['xs', 'small', 'medium', 'large', 'x-large'],
                control: { type: 'select' }
            }
        }
    };
</script>

<script>
    import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
    <Avatar {...args} />
</Template>
<Story name="Empty" />
<Story
    name="Image"
    args={{ src: 'https://avatars.githubusercontent.com/u/1759475?v=4&size=128' }}
/>
