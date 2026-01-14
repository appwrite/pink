<script lang="ts">
    import type { TableColumn, TableRootProps } from '../index.js';
    import { createEventDispatcher, tick } from 'svelte';

    export let columns: Array<TableColumn> | number;
    export let allowSelection: boolean = false;
    export let selectedRows: Array<string> = [];
    export let element: HTMLElement | undefined = undefined;
    
    // Context menu props
    export let enableContextMenu: boolean = false;

    let availableIds: Set<string> = new Set();
    
    // Context menu state
    let showContextMenu = false;
    let contextMenuX = 0;
    let contextMenuY = 0;
    let contextMenuRowId: string | undefined = undefined;
    let contextMenuElement: HTMLDivElement;
    
    const dispatch = createEventDispatcher();

    $: someRowsSelected =
        availableIds.size > 0 &&
        selectedRows.length > 0 &&
        selectedRows.some((row) => availableIds.has(row));

    $: allRowsSelected =
        availableIds.size > 0 && [...availableIds].every((row) => selectedRows.includes(row));

    function toggleAll() {
        if (allRowsSelected) {
            selectedRows = selectedRows.filter((row) => !availableIds.has(row));
        } else {
            selectedRows = [
                ...selectedRows,
                ...[...availableIds].filter((row) => !selectedRows.includes(row))
            ];
        }
    }
    function toggle(id: string) {
        if (selectedRows.includes(id)) {
            selectedRows = selectedRows.filter((row) => row !== id);
        } else {
            selectedRows = [...selectedRows, id];
        }
    }

    function addAvailableId(id: string) {
        availableIds.add(id);
        availableIds = availableIds;
    }

    function removeAvailableId(id: string) {
        availableIds.delete(id);
        availableIds = availableIds;
    }

    function groupById(cols: typeof columns): TableRootProps['columnsMap'] {
        if (typeof cols === 'number') {
            return {};
        }
        return cols.reduce<Record<TableColumn['id'], TableColumn>>((acc, column) => {
            acc[column.id] = column;
            return acc;
        }, {});
    }

    function handleCellContextMenu(event: CustomEvent<{ event: MouseEvent; id?: string }>) {
        const { event: mouseEvent, id } = event.detail;

        // Only allow context menu for data rows (must have a row id)
        if (!enableContextMenu || !id) return;

        contextMenuX = mouseEvent.clientX;
        contextMenuY = mouseEvent.clientY;
        contextMenuRowId = id;
        showContextMenu = true;

        // Ensure menu stays within viewport
        tick().then(() => {
            if (contextMenuElement) {
                const rect = contextMenuElement.getBoundingClientRect();
                const viewportWidth = window.innerWidth;
                const viewportHeight = window.innerHeight;

                if (rect.right > viewportWidth) {
                    contextMenuX = viewportWidth - rect.width - 8;
                }
                if (rect.bottom > viewportHeight) {
                    contextMenuY = viewportHeight - rect.height - 8;
                }
            }
        });

        dispatch('contextmenu', { event: mouseEvent, rowId: id });
    }

    function handleContextMenuClick(event: MouseEvent) {
        if (!enableContextMenu || !showContextMenu || !contextMenuElement || !event.target) return;
        if (!contextMenuElement.contains(event.target as Node)) {
            showContextMenu = false;
        }
    }

    $: root = {
        allowSelection,
        selectedRows,
        columns: columns,
        columnsMap: groupById(columns),
        toggleAll,
        toggle,
        selectedSome: someRowsSelected,
        selectedNone: !someRowsSelected,
        selectedAll: allRowsSelected,
        addAvailableId,
        removeAvailableId,
        enableContextMenu,
        handleCellContextMenu
    } as TableRootProps;
    const { class: className, ...rest } = $$restProps;
</script>

<svelte:window
    on:click={handleContextMenuClick}
    on:keydown={(e) => {
        if (enableContextMenu && e.key === 'Escape' && showContextMenu) {
            showContextMenu = false;
        }
    }}
/>

{#if enableContextMenu}

    {#if showContextMenu}
        <div
            bind:this={contextMenuElement}
            class="context-menu"
            style:left={`${contextMenuX}px`}
            style:top={`${contextMenuY}px`}
            role="menu"
            tabindex="-1"
        >
            <slot name="contextmenu" rowId={contextMenuRowId} />
        </div>
    {/if}
{/if}

<div class="root {className || ''}" bind:this={element} {...rest}>
    <slot {root} />
</div>

<style lang="scss">
    .root {
        --p-table-cell-padding-inline: var(--space-6);
        border: var(--p-table-border, 1px solid var(--border-neutral));
        border-radius: var(--p-table-border-radius, var(--border-radius-s));
        background: var(--p-table-background, var(--bgcolor-neutral-primary));
        overflow-x: auto;

        ::-webkit-scrollbar {
            display: none;
        }
    }

    .context-menu {
        position: fixed;
        z-index: 9999;
        background: var(--bgcolor-neutral-primary);
        border: var(--border-width-s) solid var(--border-neutral);
        border-radius: var(--border-radius-m);
        box-shadow:
            0 1px 3px 0 rgba(0, 0, 0, 0.03),
            0 4px 4px 0 rgba(0, 0, 0, 0.04),
            0 8px 16px 0 rgba(0, 0, 0, 0.08);
        min-width: 200px;
    }
</style>
