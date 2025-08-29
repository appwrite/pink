<script lang="ts">
    import type { RootProp } from '../index.js';
    import Icon from '$lib/Icon.svelte';
    import { IconChevronDown } from '@appwrite.io/pink-icons-svelte';
    import Button from '$lib/button/Button.svelte';
    import { getContext } from 'svelte';

    export let root: RootProp;
    export let column: string;
    export let expandable: boolean = true;
    const rowId = getContext<string>('rowId');

    $: columnIndex = root.columns.findIndex((c) => c.id === column);
    $: justify = root.alignment(root.columns[columnIndex]?.align);
    $: isFirstCell = columnIndex === 0;
    $: isOpen = rowId ? root.isOpen(rowId) : false;
    $: toggle = rowId ? () => root.toggle(rowId) : () => {};
</script>

<div class="cell" style="justify-content: {justify};">
    {#if isFirstCell && expandable}
        <Button
            variant="ghost"
            icon
            size="s"
            on:click={toggle}
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Collapse row' : 'Expand row'}
        >
            <span class="chevron" class:open={isOpen}>
                <Icon icon={IconChevronDown} size="s" />
            </span>
        </Button>
    {/if}
    <slot />
</div>

<style lang="scss">
    .cell {
        display: flex;
        align-items: center;
        gap: var(--space-2, 4px);
        height: 100%;
    }

    .chevron {
        display: flex;
        transition: rotate 300ms ease-in-out;
    }

    .chevron.open {
        rotate: 180deg;
    }
</style>
