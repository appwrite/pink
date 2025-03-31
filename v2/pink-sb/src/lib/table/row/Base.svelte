<script lang="ts">
    import { onMount } from 'svelte';
    import type { RowBaseProps } from './index.js';
    import Cell from '../Cell.svelte';
    import Checkbox from '$lib/selector/Checkbox.svelte';

    type $$Props = RowBaseProps &
        Partial<{
            type: 'row' | 'header';
        }>;

    export let root: $$Props['root'];
    export let id: $$Props['id'] = undefined;
    export let type: $$Props['type'] = 'row';
    export let sticky: $$Props['sticky'] = false;

    function toggle() {
        if (id) root.toggle(id);
    }

    onMount(() => {
        if (id) root.addAvailableId(id);

        return () => {
            if (id) root.removeAvailableId(id);
        };
    });

    $: selected = id ? root.selectedRows.includes(id) : false;
    $: top =
        sticky !== false && Number.isInteger(sticky)
            ? `calc(${sticky} * ${root.cellHeight})`
            : undefined;
</script>

<div role={type === 'row' ? 'row' : 'rowheader'} class:sticky style:top>
    {#if root.allowSelection}
        {@const isHeader = type === 'header'}
        <Cell column={`__select_${id}`} {root}>
            <Checkbox
                size="s"
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
        display: grid;
        grid-template-columns: subgrid;
        grid-column: 1 / -1;
        width: 100%;
        background: var(--bgcolor-neutral-primary);

        &[role='rowheader'] {
            background: var(--bgcolor-neutral-default);
        }

        &:last-child {
            :global([role='cell']) {
                border-bottom: 0;
            }
        }

        &.sticky {
            position: sticky;
            top: 0;
        }
    }
</style>
