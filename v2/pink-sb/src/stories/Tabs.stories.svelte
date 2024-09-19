<script context="module" lang="ts">
    import { Tabs } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Tabs',
        component: Tabs.Root,
        subcomponents: { Link: Tabs.Item.Link, Button: Tabs.Item.Button }
    };
</script>

<script>
    import { Story } from '@storybook/addon-svelte-csf';
</script>

<Story name="Button">
    <Tabs.Root>
        <Tabs.Item.Button>Tab Item</Tabs.Item.Button>
        <Tabs.Item.Button>Tab Item</Tabs.Item.Button>
        <Tabs.Item.Button active>Tab Item</Tabs.Item.Button>
    </Tabs.Root>
</Story>

<Story name="Button - disabled">
    <Tabs.Root>
        <Tabs.Item.Button disabled>Tab Item</Tabs.Item.Button>
        <Tabs.Item.Button>Tab Item</Tabs.Item.Button>
        <Tabs.Item.Button active>Tab Item</Tabs.Item.Button>
    </Tabs.Root>
</Story>

<Story name="Link">
    <Tabs.Root>
        <Tabs.Item.Link href="#">Tab Item</Tabs.Item.Link>
        <Tabs.Item.Link href="#">Tab Item</Tabs.Item.Link>
        <Tabs.Item.Link href="#" active>Tab Item</Tabs.Item.Link>
    </Tabs.Root>
</Story>

<Story name="Link - disabled">
    <Tabs.Root>
        <Tabs.Item.Link href="#" disabled>Tab Item</Tabs.Item.Link>
        <Tabs.Item.Link href="#">Tab Item</Tabs.Item.Link>
        <Tabs.Item.Link href="#" active>Tab Item</Tabs.Item.Link>
    </Tabs.Root>
</Story>
