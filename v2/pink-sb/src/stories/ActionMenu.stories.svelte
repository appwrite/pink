<script context="module" lang="ts">
    import { ActionMenu } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/ActionMenu',
        component: ActionMenu.Root
    };
</script>

<script>
    import { Story } from '@storybook/addon-svelte-csf';
    import { IconChevronDoubleRight, IconInfo } from '@appwrite.io/pink-icons-svelte';
</script>

<Story name="Button">
    <ActionMenu.Root>
        <ActionMenu.Item.Button
            leadingIcon={IconInfo}
            trailingIcon={IconChevronDoubleRight}
            badge="1"
        >
            Default
        </ActionMenu.Item.Button>
        <ActionMenu.Item.Button
            leadingIcon={IconInfo}
            trailingIcon={IconChevronDoubleRight}
            disabled
        >
            Default
        </ActionMenu.Item.Button>
        <ActionMenu.Item.Button leadingIcon={IconInfo} status="danger">
            Danger
        </ActionMenu.Item.Button>
        <ActionMenu.Item.Button leadingIcon={IconInfo} status="danger" disabled>
            Danger
        </ActionMenu.Item.Button>
    </ActionMenu.Root>
</Story>

<Story name="Anchor">
    <ActionMenu.Root>
        <ActionMenu.Item.Anchor href="#" leadingIcon={IconInfo}>Default</ActionMenu.Item.Anchor>
        <ActionMenu.Item.Anchor href="#" leadingIcon={IconInfo} disabled>
            Default
        </ActionMenu.Item.Anchor>
        <ActionMenu.Item.Anchor href="#" leadingIcon={IconInfo} status="danger">
            Danger
        </ActionMenu.Item.Anchor>
    </ActionMenu.Root>
</Story>
