<script context="module" lang="ts">
    import { OverflowTabs } from '$lib/index.js';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Lab/OverflowTabs',
        component: OverflowTabs.Root,
        subcomponents: { Link: OverflowTabs.Item.Link, Button: OverflowTabs.Item.Button }
    };
</script>

<script>
    import { Story } from '@storybook/addon-svelte-csf';
</script>

<Story name="Button">
    <OverflowTabs.Root let:root>
        <OverflowTabs.Item.Button {root}>Tab Item</OverflowTabs.Item.Button>
        <OverflowTabs.Item.Button {root}>Tab Item</OverflowTabs.Item.Button>
        <OverflowTabs.Item.Button {root} active>Tab Item</OverflowTabs.Item.Button>
        <OverflowTabs.Item.Button {root}>Tab Item</OverflowTabs.Item.Button>
        <OverflowTabs.Item.Button {root} disabled>Tab Item</OverflowTabs.Item.Button>
        <OverflowTabs.Item.Button {root}>Tab Item</OverflowTabs.Item.Button>
    </OverflowTabs.Root>
</Story>
