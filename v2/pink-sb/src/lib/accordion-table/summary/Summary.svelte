<script lang="ts">
    import type { RootProp } from '../index.js';
    import Table from '$lib/table/index.js';

    export let root: RootProp;

    $: tableColumns = root.columns.map((c) => ({
        id: c.id,
        width: c.width,
        hide: c.hide
    }));
</script>

<div class="summary">
    <Table.Root columns={tableColumns} let:root={table}>
        <slot {root} {table} />
    </Table.Root>
</div>

<style lang="scss">
    .summary {
        width: 100%;
        display: block;

        --p-table-border: 0;
        --p-table-border-radius: 0;
        --p-table-background: transparent;
        --p-table-row-background: var(--bgcolor-neutral-default);

        --border-neutral: var(--divider-color);

        :global([role='row']:last-child) :global([role='cell']) {
            border-bottom: 0;
        }
    }
</style>
