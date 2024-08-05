<script context="module" lang="ts">
    import { ActionList } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/ActionList',
        component: ActionList.Root
    };
</script>

<script>
    import { Story, Template } from '@storybook/addon-svelte-csf';
    import { IconInfo } from '@appwrite.io/pink-icons';
</script>

<Template>
    <ActionList.Root>
        <ActionList.Item
            title="Title 1"
            subtitle="One of the most visually innovative films of all time"
        />
        <ActionList.Item
            title="Title 2"
            subtitle="One of the most visually innovative films of all time"
            description="lorem ipsum dolor et si"
        />
        <ActionList.Item
            icon={IconInfo}
            title="Title 1"
            subtitle="One of the most visually innovative films of all time"
        />
        <ActionList.Item
            icon={IconInfo}
            title="Title 2"
            subtitle="One of the most visually innovative films of all time"
            description="lorem ipsum dolor et si"
        />
    </ActionList.Root>
</Template>

<Story name="Default" />
