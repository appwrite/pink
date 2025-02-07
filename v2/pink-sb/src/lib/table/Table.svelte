<script lang="ts">
    import Row from './Row.svelte';
    import Cell from './Cell.svelte';
    import Checkbox from '$lib/selector/Checkbox.svelte';

    export let selection = false;
    export let idKey: string = 'id';
    export let selectedIds: string[] = [];
    export let items: Array<Record<string, any>> = [];

    $: someSelected = !allSelected && items.some((item) => selectedIds.includes(item[idKey]));
    $: allSelected = items.length > 0 && items.every((item) => selectedIds.includes(item[idKey]));

    function toggleAll() {
        selectedIds = allSelected ? [] : items.map((item) => item[idKey]);
    }

    function toggleRow(id: string) {
        if (selectedIds.includes(id)) {
            selectedIds = selectedIds.filter((selId) => selId !== id);
        } else {
            selectedIds = [...selectedIds, id];
        }
    }
</script>

<div class="root">
    <div role="table">
        {#if $$slots.header}
            <Row type="header">
                {#if selection}
                    <Cell width="20px">
                        <Checkbox
                            size="s"
                            checked={allSelected ? true : someSelected ? 'indeterminate' : false}
                            on:click={toggleAll}
                        />
                    </Cell>
                {/if}
                <slot name="header" />
            </Row>
        {/if}

        {#if selection}
            {#each items as tableItem}
                <Row type="row">
                    <Cell>
                        <Checkbox
                            size="s"
                            on:click={() => toggleRow(tableItem[idKey])}
                            checked={selectedIds.includes(tableItem[idKey])}
                        />
                    </Cell>
                    <slot name="row" {tableItem} />
                </Row>
            {/each}
        {:else}
            <slot />
        {/if}
    </div>
</div>

<style lang="scss">
    .root {
        overflow-x: auto;
        border: 1px solid var(--color-border-neutral);
        border-radius: var(--border-radius-s);
        background: var(--color-bgcolor-neutral-primary);

        ::-webkit-scrollbar {
            display: none;
        }

        [role='table'] {
            display: table;
            width: 100%;
            overflow: hidden;
        }
    }
</style>
