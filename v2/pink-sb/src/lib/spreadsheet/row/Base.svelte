<script lang="ts">
    import Cell from '../Cell.svelte';
    import { EMPTY_ROW_ID } from '../index.js';
    import { onMount, setContext } from 'svelte';
    import type { RowBaseProps } from './index.js';
    import Checkbox from '$lib/selector/Checkbox.svelte';

    type $$Props = RowBaseProps &
        Partial<{
            type: 'row' | 'header';
            sticky: boolean;
        }>;

    export let root: $$Props['root'];
    export let virtualItem: $$Props['virtualItem'] = undefined;

    export let type: $$Props['type'] = 'row';
    export let id: $$Props['id'] = undefined;
    export let index: $$Props['index'] = undefined;
    export let sticky: $$Props['sticky'] = false;
    export let select: $$Props['select'] = true;

    function toggle() {
        if (id) root.toggle(id);
    }

    onMount(() => {
        if (id && !isEmptyRow && select === true) root.addAvailableId(id);

        return () => {
            /* Clean up only if:
               - `id` exists,
               - the row is not marked as empty (`!isEmptyRow`),
               - and the item is not virtual (`!virtualItem`)
            */
            if (id && !isEmptyRow && !virtualItem) {
                root.removeAvailableId(id);
            }
        };
    });

    const isHeader = type === 'header';

    $: isEmptyRow = id?.includes(EMPTY_ROW_ID) || false;
    $: selected = id ? root.selectedRows.includes(id) : false;

    if (root.keyboardNavigation && !isEmptyRow) {
        const rowIndex = isHeader ? 0 : (index ?? 0) + 1;
        setContext('row', rowIndex);
    }
</script>

<div
    data-empty-row={isEmptyRow}
    class:sticky-header={sticky && isHeader}
    class:virtual-row={!!virtualItem}
    role={!isHeader ? 'row' : 'rowheader'}
    style:height={virtualItem ? `${virtualItem.size}px` : undefined}
    style:transform={virtualItem ? `translateY(${virtualItem.start}px)` : undefined}
>
    {#if root.allowSelection}
        <Cell {isHeader} column={`__select_${id}`} {root}>
            <div class:hide-checkbox={(!isHeader && isEmptyRow) || select === 'hidden'}>
                <Checkbox
                    size="s"
                    disabled={(!isHeader && isEmptyRow) || root.loading || select === 'disabled'}
                    on:change={isHeader ? root.toggleAll : toggle}
                    checked={isHeader
                        ? root.selectedAll
                            ? true
                            : root.selectedSome
                              ? 'indeterminate'
                              : false
                        : selected}
                />
            </div>
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

        & .hide-checkbox {
            visibility: hidden;
        }

        &.virtual-row {
            top: 0;
            left: 0;
            width: 100%;
            position: absolute;
            grid-column: unset;
            grid-template-columns: var(--grid-template-columns);

            &:has([data-editing-mode='true']) {
                z-index: 1;
            }
        }
    }

    .sticky-header {
        top: 0;
        z-index: 4;
        position: sticky;
    }
</style>
