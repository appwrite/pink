<script context="module" lang="ts">
    import { ActionList } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/ActionList',
        component: ActionList.Root
    };
</script>

<script>
    import { Story } from '@storybook/addon-svelte-csf';
    import { IconInfo } from '@appwrite.io/pink-icons-svelte';
</script>

<Story name="Button">
    <ActionList.Root>
        <ActionList.Item.Button
            title="Title 1"
            subtitle="One of the most visually innovative films of all time"
        />
        <ActionList.Item.Button
            title="Title 2"
            subtitle="One of the most visually innovative films of all time"
            description="lorem ipsum dolor et si"
        />
        <ActionList.Item.Button
            icon={IconInfo}
            title="Title 1"
            subtitle="One of the most visually innovative films of all time"
        />
        <ActionList.Item.Button
            icon={IconInfo}
            title="Title 2"
            subtitle="One of the most visually innovative films of all time"
            description="lorem ipsum dolor et si"
        />
    </ActionList.Root>
</Story>

<Story name="Anchor">
    <ActionList.Root>
        <ActionList.Item.Anchor
            href="#"
            title="Title 1"
            subtitle="One of the most visually innovative films of all time"
        />
        <ActionList.Item.Anchor
            href="#"
            title="Title 2"
            subtitle="One of the most visually innovative films of all time"
            description="lorem ipsum dolor et si"
        />
        <ActionList.Item.Anchor
            href="#"
            icon={IconInfo}
            title="Title 1"
            subtitle="One of the most visually innovative films of all time"
        />
        <ActionList.Item.Anchor
            href="#"
            icon={IconInfo}
            title="Title 2"
            subtitle="One of the most visually innovative films of all time"
            description="lorem ipsum dolor et si"
        />
    </ActionList.Root>
</Story>

<Story name="Accordion">
    <ActionList.Root>
        <ActionList.Item.Accordion title="One of the most visually innovative films of all time">
            Expanded content
        </ActionList.Item.Accordion>
    </ActionList.Root>
</Story>

<Story name="Mixed">
    <ActionList.Root>
        <ActionList.Item.Accordion
            icon={IconInfo}
            title="One of the most visually innovative films of all time"
            hasDivider={true}
        >
            Expanded content
        </ActionList.Item.Accordion>
        <ActionList.Item.Anchor
            href="#"
            icon={IconInfo}
            title="Title 1"
            subtitle="One of the most visually innovative films of all time"
            hasDivider={true}
        />
        <ActionList.Item.Button
            icon={IconInfo}
            title="Title 1"
            subtitle="One of the most visually innovative films of all time"
            hasDivider={true}
        />
        <ActionList.Item.Anchor
            href="#"
            icon={IconInfo}
            title="Title 2"
            subtitle="One of the most visually innovative films of all time"
            description="lorem ipsum dolor et si"
        />
    </ActionList.Root>
</Story>
