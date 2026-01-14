<script lang="ts">
    import type { TableAlignment, TableRootProps } from '../index.js';
    import { createEventDispatcher } from 'svelte';

    export let column: string | undefined = undefined;
    export let root: TableRootProps;
    export let alignment: TableAlignment = 'middle-middle';
    export let id: string | undefined = undefined;

    const dispatch = createEventDispatcher();

    $: options = column !== undefined && root.columnsMap?.[column];
    $: isVerticalStart = alignment.startsWith('start');
    $: isVerticalEnd = alignment.startsWith('end');
    $: isHorizontalStart = alignment.endsWith('start');
    $: isHorizontalEnd = alignment.endsWith('end');

    function handleContextMenu(event: MouseEvent) {
        if (!root.enableContextMenu) return;
        
        event.preventDefault();
        const contextEvent = new CustomEvent('contextmenu', {
            detail: { event, id }
        });
        
        if (root.handleCellContextMenu) {
            root.handleCellContextMenu(contextEvent);
        }
        
        dispatch('contextmenu', { event, id });
    }
</script>

{#if !options || options?.hide !== true}
    <div
        role="cell"
        tabindex="-1"
        class:vertical-start={isVerticalStart}
        class:vertical-end={isVerticalEnd}
        class:horizontal-start={isHorizontalStart}
        class:horizontal-end={isHorizontalEnd}
        on:contextmenu={handleContextMenu}
    >
        <slot />
    </div>
{/if}

<style lang="scss">
    [role='cell'] {
        --p-cell-width: var(--cell-width);
        --p-cell-max-width: var(--cell-max-width);
        --p-cell-alignment: var(--cell-alignment);
        display: flex;
        align-items: center;
        padding-inline: var(--space-6);
        height: 40px;
        border-bottom: var(--border-width-s) solid var(--border-neutral);
        overflow: hidden;
        white-space: nowrap;

        &.horizontal-start {
            justify-content: flex-start;
        }

        &.horizontal-end {
            justify-content: flex-end;
        }

        &.vertical-start {
            align-items: flex-start;
        }

        &.vertical-end {
            align-items: flex-end;
        }
    }
</style>
