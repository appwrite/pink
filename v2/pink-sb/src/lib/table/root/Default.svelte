<script lang="ts">
    import type { TableColumn } from '../index.js';
    import Row from '../row/Base.svelte';
    import Base from './Base.svelte';

    export let columns: Array<TableColumn> | number;
    export let allowSelection: boolean = false;
    export let selectAll: true | 'disabled' | 'hidden' = true;
    export let selectedRows: Array<string> = [];

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

    function widthWithPadding(width: number): string {
        return `calc(${width}px + var(--p-table-cell-padding-inline))`;
    }
</script>

<Base {columns} {allowSelection} bind:selectedRows let:root>
    <div role="table" style:--grid-template-columns={createGridTemplateColumns(columns)}>
        {#if $$slots.header}
            <Row type="header" {root} select={selectAll}>
                <slot name="header" {root} />
            </Row>
        {/if}
        <slot {root} />
    </div>
</Base>

<style lang="scss">
    [role='table'] {
        display: grid;
        grid-template-columns: var(--grid-template-columns);
        width: 100%;
    }
</style>
