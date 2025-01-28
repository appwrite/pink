<script context="module" lang="ts">
    import { Avatar } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Avatar',
        component: Avatar,
        args: {
            size: 'm'
        },
        argTypes: {
            size: {
                options: ['xs', 's', 'm', 'l', 'xl'],
                control: { type: 'select' }
            }
        }
    };
</script>

<script>
    import Icon from '$lib/Icon.svelte';
    import { IconSvelte } from '@appwrite.io/pink-icons-svelte';
    import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
    <Avatar {...args}>
        <slot />
    </Avatar>
</Template>
<Story
    name="Image"
    args={{ src: 'https://avatars.githubusercontent.com/u/1759475?v=4&size=128' }}
/>
<Story name="Icon">
    <Avatar>
        <Icon icon={IconSvelte} size="s" />
    </Avatar>
</Story>
<Story name="Empty" args={{ empty: true }} />
