<script lang="ts">
    import type { RootProp } from '../index.js';
    import Icon from '$lib/Icon.svelte';
    import { IconChevronDown } from '@appwrite.io/pink-icons-svelte';

    export let root: RootProp & {
        columns: Array<{ id: string; align?: 'left' | 'center' | 'right' }>;
        getJustify: (align?: 'left' | 'center' | 'right') => string;
    };
    export let column: string;
    export let expandable: boolean = true;
    export let isOpen: boolean = false;
    export let toggle: () => void = () => {};

    $: columnIndex = root.columns.findIndex((c) => c.id === column);
    $: justify = root.getJustify(root.columns[columnIndex]?.align);
    $: isFirstCell = columnIndex === 0;
</script>

<div class="cell" style="justify-content: {justify};">
    {#if isFirstCell && expandable}
        <button
            class="chevron-button"
            on:click={toggle}
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Collapse row' : 'Expand row'}
        >
            <span class="chevron" class:open={isOpen}>
                <Icon icon={IconChevronDown} size="s" />
            </span>
        </button>
    {/if}
    <slot />
</div>

<style lang="scss">
    .cell {
        display: flex;
        align-items: center;
        gap: 6px;
    }

    .chevron-button {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
        border-radius: var(--border-radius-s);
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 24px;
        min-height: 24px;
    }
    .chevron-button:hover {
        background: var(--overlay-hover);
    }
    .chevron-button:focus-visible {
        outline: var(--border-width-l) solid var(--border-focus);
    }
    .chevron {
        display: flex;
        transition: rotate 300ms ease-in-out;
    }
    .chevron.open {
        rotate: 180deg;
    }
</style>
