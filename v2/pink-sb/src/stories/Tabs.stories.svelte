<script context="module" lang="ts">
    import Tabs from '$lib/tabs/Tabs.svelte';
    import TabItemLink from '$lib/tabs/TabItemLink.svelte';
    import TabItemButton from '$lib/tabs/TabItemButton.svelte';
    import type { MetaProps } from '@storybook/addon-svelte-csf';

    export const meta: MetaProps = {
        title: 'Components/Tabs',
        component: Tabs,
        subcomponents: { TabItemLink, TabItemButton }
    };
</script>

<script>
    import { Story } from '@storybook/addon-svelte-csf';
</script>

<Story name="Button">
    <Tabs>
        <TabItemButton>Tab Item</TabItemButton>
        <TabItemButton>Tab Item</TabItemButton>
        <TabItemButton active>Tab Item</TabItemButton>
    </Tabs>
</Story>

<Story name="Button - disabled">
    <Tabs>
        <TabItemButton disabled>Tab Item</TabItemButton>
        <TabItemButton>Tab Item</TabItemButton>
        <TabItemButton active>Tab Item</TabItemButton>
    </Tabs>
</Story>

<Story name="Link">
    <Tabs>
        <TabItemLink href="#">Tab Item</TabItemLink>
        <TabItemLink href="#">Tab Item</TabItemLink>
        <TabItemLink href="#" active>Tab Item</TabItemLink>
    </Tabs>
</Story>

<Story name="Link - disabled">
    <Tabs>
        <TabItemLink href="#" disabled>Tab Item</TabItemLink>
        <TabItemLink href="#">Tab Item</TabItemLink>
        <TabItemLink href="#" active>Tab Item</TabItemLink>
    </Tabs>
</Story>
