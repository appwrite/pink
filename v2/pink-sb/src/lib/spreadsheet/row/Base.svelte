<script lang="ts">
    import { onMount } from 'svelte';
    import Cell from '../Cell.svelte';
    import type { RowBaseProps } from './index.js';
    import Checkbox from '$lib/selector/Checkbox.svelte';
    import { EMPTY_ROW_ID } from '../index.js';

    type $$Props = RowBaseProps &
        Partial<{
            type: 'row' | 'header';
        }>;

    export let root: $$Props['root'];
    export let type: $$Props['type'] = 'row';
    export let id: $$Props['id'] = undefined;

    function toggle() {
        if (id) root.toggle(id);
    }

    onMount(() => {
        if (id && !isEmptyRow) root.addAvailableId(id);

        return () => {
            if (id && !isEmptyRow) root.removeAvailableId(id);
        };
    });

    const parentId = `${type}-${id}`;

    $: isEmptyRow = id?.includes(EMPTY_ROW_ID) || false;
    $: selected = id ? root.selectedRows.includes(id) : false;
</script>

<div role={type === 'row' ? 'row' : 'rowheader'} id={parentId}>
    {#if root.allowSelection}
        {@const isHeader = type === 'header'}
        <Cell column={`__select_${id}`} {root}>
            <Checkbox
                size="s"
                disabled={!isHeader && isEmptyRow}
                on:change={isHeader ? root.toggleAll : toggle}
                checked={isHeader
                    ? root.selectedAll
                        ? true
                        : root.selectedSome
                          ? 'indeterminate'
                          : false
                    : selected}
            />
        </Cell>
    {/if}

    <slot {toggle} {selected} />
</div>

<style lang="scss">
    div {
        width: 100%;
        display: grid;
        grid-column: 1 / -1;
        grid-template-columns: subgrid;
        background: var(--bgcolor-neutral-primary);

        &[role='rowheader'] {
            background: var(--bgcolor-neutral-default);
        }
    }
</style>
