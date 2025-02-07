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
    <Tabs.Root let:root>
        <Tabs.Item.Button {root}>Tab Item</Tabs.Item.Button>
        <Tabs.Item.Button {root}>Tab Item</Tabs.Item.Button>
        <Tabs.Item.Button {root} active>Tab Item</Tabs.Item.Button>
        <Tabs.Item.Button {root}>Tab Item</Tabs.Item.Button>
        <Tabs.Item.Button {root} disabled>Tab Item</Tabs.Item.Button>
        <Tabs.Item.Button {root}>Tab Item</Tabs.Item.Button>
    </Tabs.Root>
</Story>
<Story name="Button - stretch">
    <div style="width: 400px; dispay: flex; justify-content: space-between;">
        <Tabs.Root stretch let:root>
            <Tabs.Item.Button {root} active>Tab Item</Tabs.Item.Button>
            <Tabs.Item.Button {root}>Tab Item</Tabs.Item.Button>
        </Tabs.Root>
    </div>
</Story>
<Story name="Button - Secondary">
    <Tabs.Root variant="secondary" let:root>
        <Tabs.Item.Button {root}>Tab Item</Tabs.Item.Button>
        <Tabs.Item.Button {root}>Tab Item</Tabs.Item.Button>
        <Tabs.Item.Button {root} active>Tab Item</Tabs.Item.Button>
        <Tabs.Item.Button {root}>Tab Item</Tabs.Item.Button>
        <Tabs.Item.Button {root} disabled>Tab Item</Tabs.Item.Button>
        <Tabs.Item.Button {root}>Tab Item</Tabs.Item.Button>
    </Tabs.Root>
</Story>

<Story name="Link">
    <Tabs.Root let:root>
        <Tabs.Item.Link {root} href="#">Tab Item</Tabs.Item.Link>
        <Tabs.Item.Link {root} href="#" disabled>Tab Item</Tabs.Item.Link>
        <Tabs.Item.Link {root} href="#" active>Tab Item</Tabs.Item.Link>
    </Tabs.Root>
</Story>

<Story name="Link - Secondary">
    <Tabs.Root variant="secondary" let:root>
        <Tabs.Item.Link {root} href="#">Tab Item</Tabs.Item.Link>
        <Tabs.Item.Link {root} href="#" disabled>Tab Item</Tabs.Item.Link>
        <Tabs.Item.Link {root} href="#" active>Tab Item</Tabs.Item.Link>
    </Tabs.Root>
</Story>
