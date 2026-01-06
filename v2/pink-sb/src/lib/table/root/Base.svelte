<script lang="ts">
    import type { TableColumn, TableRootProps } from '../index.js';

    export let columns: Array<TableColumn> | number;
    export let allowSelection: boolean = false;
    export let selectedRows: Array<string> = [];
    export let element: HTMLElement | undefined = undefined;

    let availableIds: Set<string> = new Set();

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
        removeAvailableId
    } as TableRootProps;
    $: ({ class: className, ...rest } = $$restProps);
</script>

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
</style>
