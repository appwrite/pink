<script lang="ts">
    import { getContext } from 'svelte';
    import Cell from '$lib/table/header/Cell.svelte';
    import Checkbox from '$lib/selector/Checkbox.svelte';
    import { TABLE_CONTEXT, type TableContext } from './Table.svelte';

    export let type: 'row' | 'header' = 'row';
    export let id: string | undefined = undefined;

    const tableCtx = getContext<TableContext>(TABLE_CONTEXT);
    let allSelected = tableCtx.allSelected;
    let someSelected = tableCtx.someSelected;

    function checkboxClick(e: MouseEvent) {
        e.stopPropagation();
        type === 'row' && id ? tableCtx.toggleRow(id) : tableCtx.toggleAll();
    }

    $: isChecked = () => {
        return type === 'header'
            ? $allSelected
                ? true
                : $someSelected
                  ? 'indeterminate'
                  : false
            : id
              ? tableCtx.isSelected(id)
              : false;
    };
</script>

<div role={type === 'row' ? 'row' : 'rowheader'}>
    {#if tableCtx.selection}
        <Cell width="20px">
            <Checkbox size="s" on:click={checkboxClick} checked={isChecked()} />
        </Cell>
    {/if}

    <slot />
</div>

<style lang="scss">
    div {
        display: table-row;
        width: 100%;
        background: var(--color-bgcolor-neutral-primary);

        &[role='rowheader'] {
            background: var(--color-bgcolor-neutral-default);
        }

        &:last-child {
            :global([role='cell']) {
                border-bottom: 0;
            }
        }
    }
</style>
