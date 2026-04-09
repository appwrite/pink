<script lang="ts">
    import { createVirtualizer } from '@tanstack/svelte-virtual';
    import { type TableColumn } from '../index.js';
    import Row from '../row/Base.svelte';
    import Base from './Base.svelte';

    export let columns: Array<TableColumn>;
    export let allowSelection: boolean = false;
    export let selectAll: true | 'disabled' | 'hidden' = true;
    export let selectedRows: Array<string> = [];
    export let overscan: number = 5;

    let scrollElement: HTMLElement;

    const withPadding = (width: number) => width + 48;

    $: visibleColumns = columns.filter((column) => column.hide !== true);
    $: virtualizer = createVirtualizer({
        count: visibleColumns.length,
        paddingStart: allowSelection ? 40 : 0,
        getScrollElement: () => scrollElement,
        estimateSize: (index) => {
            const column = visibleColumns[index];
            let baseWidth: number;

            if (typeof column?.width === 'number') {
                baseWidth = column.width;
            } else if (column?.width?.min) {
                baseWidth = column.width.min;
            } else {
                console.warn('Column width is undefined');
                baseWidth = 256;
            }
            if (!scrollElement) return withPadding(baseWidth);

            if (totalBaseWidth < availableWidth) {
                const extraWidth = availableWidth - totalBaseWidth;
                const extraPerColumn = extraWidth / visibleColumns.length;
                baseWidth += extraPerColumn;
            }

            return withPadding(baseWidth);
        },
        horizontal: true,
        overscan
    });
    $: availableWidth = scrollElement?.offsetWidth - (allowSelection ? 40 : 0);
    $: totalSize = $virtualizer.getTotalSize();
    $: totalBaseWidth = visibleColumns.reduce((sum, col) => {
        let colWidth: number;
        if (typeof col?.width === 'number') {
            colWidth = col.width;
        } else if (col?.width?.min) {
            colWidth = col.width.min;
        } else {
            colWidth = 256;
        }
        return sum + withPadding(colWidth);
    }, 0);
</script>

<Base {columns} {allowSelection} bind:selectedRows let:root bind:element={scrollElement}>
    <div role="table" style:width="{totalSize + (allowSelection ? 40 : 0)}px">
        {#if $$slots.header}
            <Row type="header" {root} select={selectAll}>
                <slot name="header" {root} virtualizer={$virtualizer} />
            </Row>
        {/if}
        <slot {root} virtualizer={$virtualizer} />
    </div>
</Base>

<style lang="scss">
    [role='table'] {
        height: 100%;
    }
</style>
