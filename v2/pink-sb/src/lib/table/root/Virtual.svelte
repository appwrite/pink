<script lang="ts">
    import { createVirtualizer } from '@tanstack/svelte-virtual';
    import { type Column } from '../index.js';
    import Row from '../row/Base.svelte';
    import Base from './Base.svelte';

    export let columns: Array<Column>;
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
            const column = columns[index];

            if (typeof column?.width === 'number') {
                return withPadding(column.width);
            }
            if (column?.width?.min) {
                return withPadding(column.width.min);
            }

            console.warn('Column width is undefined');
            return withPadding(256);
        },
        horizontal: true,
        overscan
    });

    $: totalSize = $virtualizer.getTotalSize();
</script>

<Base {columns} {allowSelection} {selectedRows} let:root bind:element={scrollElement}>
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
