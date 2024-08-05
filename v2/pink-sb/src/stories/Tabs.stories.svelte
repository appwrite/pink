<script context="module" lang="ts">
    import { Tabs } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Tabs',
        component: Tabs.Root,
        subcomponents: { Link: Tabs.Link, Button: Tabs.Button }
    };
</script>

<script>
    import { Story } from '@storybook/addon-svelte-csf';
</script>

<Story name="Button">
    <Tabs.Root>
        <Tabs.Button>Tab Item</Tabs.Button>
        <Tabs.Button>Tab Item</Tabs.Button>
        <Tabs.Button active>Tab Item</Tabs.Button>
    </Tabs.Root>
</Story>

<Story name="Button - disabled">
    <Tabs.Root>
        <Tabs.Button disabled>Tab Item</Tabs.Button>
        <Tabs.Button>Tab Item</Tabs.Button>
        <Tabs.Button active>Tab Item</Tabs.Button>
    </Tabs.Root>
</Story>

<Story name="Link">
    <Tabs.Root>
        <Tabs.Link href="#">Tab Item</Tabs.Link>
        <Tabs.Link href="#">Tab Item</Tabs.Link>
        <Tabs.Link href="#" active>Tab Item</Tabs.Link>
    </Tabs.Root>
</Story>

<Story name="Link - disabled">
    <Tabs.Root>
        <Tabs.Link href="#" disabled>Tab Item</Tabs.Link>
        <Tabs.Link href="#">Tab Item</Tabs.Link>
        <Tabs.Link href="#" active>Tab Item</Tabs.Link>
    </Tabs.Root>
</Story>
