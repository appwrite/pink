<script context="module" lang="ts">
    import ActionList from '$lib/actionlist/ActionList.svelte';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/ActionList',
        component: ActionList
    };
</script>

<script>
    import IconInfo from 'pink-icons/svg/info.svelte';
    import ActionListItem from '$lib/actionlist/ActionListItem.svelte';
    import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template>
    <ActionList>
        <ActionListItem
            title="Title 1"
            subtitle="One of the most visually innovative films of all time"
        />
        <ActionListItem
            title="Title 2"
            subtitle="One of the most visually innovative films of all time"
            description="lorem ipsum dolor et si"
        />
        <ActionListItem
            icon={IconInfo}
            title="Title 1"
            subtitle="One of the most visually innovative films of all time"
        />
        <ActionListItem
            icon={IconInfo}
            title="Title 2"
            subtitle="One of the most visually innovative films of all time"
            description="lorem ipsum dolor et si"
        />
    </ActionList>
</Template>

<Story name="Default" />
