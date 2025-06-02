<script lang="ts">
    import type { Column, RootProp } from './index.js';
    import Row from './row/Base.svelte';

    export let columns: Array<Column> | number;
    export let allowSelection: boolean = false;
    export let selectedRows: Array<string> = [];

    let availableIds: Set<string> = new Set();

    function widthWithPadding(width: number): string {
        return `calc(${width}px + var(--p-table-cell-padding-inline))`;
    }

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
                    return `${acc} ${widthWithPadding(column.width)}`;
                }
                if ('min' in column.width && 'max' in column.width) {
                    if (hasOnlyMaxWidth) {
                        return `${acc} minmax(${widthWithPadding(column.width.min)}, 1fr)`;
                    }
                    return `${acc} minmax(${widthWithPadding(column.width.min)}, ${widthWithPadding(column.width.max)})`;
                }
                if ('min' in column.width) {
                    return `${acc} minmax(${widthWithPadding(column.width.min)}, 1fr)`;
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
        allowSelection,
        selectedRows,
        columns: groupById(columns),
        toggleAll,
        toggle,
        selectedSome: someRowsSelected,
        selectedNone: !someRowsSelected,
        selectedAll: allRowsSelected,
        addAvailableId,
        removeAvailableId
    } as RootProp;
</script>

<div class="root">
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
        --p-table-cell-padding-inline: var(--space-6);
        overflow-x: auto;
        border: 1px solid var(--border-neutral);
        border-radius: var(--border-radius-s);
        background: var(--bgcolor-neutral-primary);

        ::-webkit-scrollbar {
            display: none;
        }

        [role='table'] {
            display: grid;
            grid-template-columns: var(--grid-template-columns);
            width: 100%;
        }
    }
</style>
