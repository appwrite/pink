<script lang="ts">
    import { onMount } from 'svelte';
    import Row from './row/Base.svelte';
    import type { Column, RootProp } from './index.js';

    export let columns: Array<Column> | number;
    export let allowSelection: boolean = false;
    export let selectedRows: Array<string> = [];

    let dragGhostBorder: HTMLElement;
    let availableIds: Set<string> = new Set();

    let rootEl: HTMLDivElement;
    const spreadSheetGhostBorderKey = 'spreadsheet-ghost-border';

    let currentlyEditing: HTMLElement | null = null;

    function setEditing(cellInEdit: HTMLElement | null) {
        currentlyEditing = cellInEdit;
    }

    onMount(() => {
        if (dragGhostBorder) return;

        dragGhostBorder = document.createElement('div');
        dragGhostBorder.id = spreadSheetGhostBorderKey;
        Object.assign(dragGhostBorder.style, {
            top: '0',
            width: '1px',
            zIndex: '9999',
            height: '100vh',
            display: 'none',
            position: 'fixed',
            pointerEvents: 'none',
            background: 'var(--border-neutral)'
        });
        rootEl.appendChild(dragGhostBorder);
    });

    function createGridTemplateColumns(cols: typeof columns) {
        if (typeof cols === 'number') {
            return `repeat(${cols}, 1fr)`;
        }
        const columns = cols.filter((column) => column.hide !== true);
        const hasOnlyMaxWidth = columns.every(
            (column) => typeof column.width === 'number' || (column.width && 'max' in column.width)
        );

        return columns.reduce(
            (acc, column) => {
                if (column.width === undefined) return `${acc} 1fr`;
                if (typeof column.width === 'number') {
                    return `${acc} ${column.width}px`;
                }
                if ('min' in column.width && 'max' in column.width) {
                    if (hasOnlyMaxWidth) {
                        return `${acc} minmax(${column.width.min}px, 1fr)`;
                    }
                    return `${acc} minmax(${column.width.min}px, ${column.width.max}px)`;
                }
                if ('min' in column.width) {
                    return `${acc} minmax(${column.width.min}px, 1fr)`;
                }
                return acc;
            },
            allowSelection ? ' 40px' : '' // Default width for selection column
        );
    }

    function groupById(cols: typeof columns): RootProp['columns'] {
        if (typeof cols === 'number') {
            return {};
        }
        return cols.reduce<Record<Column['id'], Column>>((acc, column) => {
            acc[column.id] = column;
            return acc;
        }, {});
    }

    function updateCells(columnId: string, newWidth: number) {
        if (typeof columns === 'number') return;

        const index = columns.findIndex((col) => col.id === columnId);
        if (index === -1) return;

        const col = columns[index];

        if (typeof col.width === 'object') {
            const min = col.width.min;
            const max = 'max' in col.width ? col.width.max : undefined;

            if (min) newWidth = Math.max(min, newWidth);
            if (max) newWidth = Math.min(max, newWidth);

            columns[index] = {
                ...col,
                width: { ...col.width, min: newWidth }
            };
        } else {
            columns[index] = {
                ...col,
                width: newWidth
            };
        }

        columns = [...columns];
    }

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

    $: root = {
        dragGhostBorder,
        allowSelection,
        selectedRows,
        columns: groupById(columns),
        toggleAll,
        toggle,
        updateCells,
        selectedSome: someRowsSelected,
        selectedNone: !someRowsSelected,
        selectedAll: allRowsSelected,
        addAvailableId,
        removeAvailableId,
        currentlyEditing,
        setEditing
    } as RootProp;
</script>

<div class="root" bind:this={rootEl}>
    <div role="table" style:--grid-template-columns={createGridTemplateColumns(columns)}>
        {#if $$slots.header}
            <Row type="header" {root}>
                <slot name="header" {root} />
            </Row>
        {/if}
        <slot {root} />
    </div>
</div>

<style lang="scss">
    .root {
        overflow-x: auto;
        border: 1px solid var(--border-neutral);
        background: var(--bgcolor-neutral-primary);

        ::-webkit-scrollbar {
            display: none;
        }

        [role='table'] {
            width: 100%;
            display: grid;
            transition: all 0.15s ease-in-out;
            grid-template-columns: var(--grid-template-columns);
        }
    }
</style>
