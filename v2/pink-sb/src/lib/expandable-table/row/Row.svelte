<script lang="ts">
    import { onMount } from 'svelte';
    import type { RootProp } from '../types.js';
    import { slide } from 'svelte/transition';

    export let root: RootProp;
    export let id: string;
    export let expandable: boolean = true;

    onMount(() => {
        if (id) root.register(id);
        return () => {
            if (id) root.unregister(id);
        };
    });

    $: isOpen = root.isOpen(id);
</script>

<div class="table-row" class:has-children={expandable} class:is-open={isOpen}>
    <div class="row-content" style="grid-template-columns: {root.gridTemplateColumns};">
        <slot />
    </div>

    {#if isOpen}
        <div class="expanded-content" transition:slide={{ duration: 200 }}>
            <slot name="summary" {root} />
        </div>
    {/if}
</div>

<style lang="scss">
    .table-row.has-children:not(.is-open):hover .row-content {
        background: var(--overlay-hover);
    }
    .table-row.is-open .row-content {
        background: var(--row-open-bg);
        border-bottom-color: var(--divider-strong);
    }

    .row-content {
        display: grid;
        align-items: center;
        padding: var(--row-pad-top) var(--row-pad-right) var(--row-pad-bottom) var(--row-pad-left);
        border-bottom: var(--border-width-s, 1px) solid var(--divider-color);
        min-height: var(--row-height);
        box-sizing: border-box;
        transition: background-color 0.2s ease;
    }

    .expanded-content {
        background: var(--accordion-bg);
        padding-top: calc(var(--row-pad-top) / 2);
        padding-bottom: var(--row-pad-bottom);
        position: relative;
    }
    .expanded-content::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: calc(var(--border-width-s, 1px) * 2);
        background: var(--divider-strong);
        box-shadow: 0 -1px 0 var(--divider-color) inset;
        z-index: 1;
        pointer-events: none;
    }

    :global(.child-row) {
        display: grid;
        align-items: center;
        padding: var(--row-pad-top) var(--row-pad-right) var(--row-pad-bottom) var(--row-pad-left);
        border-bottom: var(--border-width-s, 1px) solid var(--divider-color);
        min-height: var(--row-height);
        box-sizing: border-box;
        background: transparent;
        color: var(--fgcolor-neutral-secondary, rgba(0, 0, 0, 0.6));
    }
    :global(.child-row:last-child) {
        border-bottom: none;
    }
    :global(.child-cell) {
        display: flex;
        align-items: center;
    }

    /* Responsive (match legacy) */
    @media (max-width: 480px) {
        .row-content,
        :global(.child-row) {
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            padding: 8px;
        }
        :global(.child-cell) {
            gap: 4px;
        }
    }
    @media (min-width: 481px) and (max-width: 768px) {
        .row-content,
        :global(.child-row) {
            grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
            padding: 10px 12px;
        }
    }
    @media (min-width: 1200px) {
        .row-content,
        :global(.child-row) {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            padding: 14px 20px;
        }
    }
</style>
