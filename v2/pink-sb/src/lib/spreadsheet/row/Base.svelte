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
    export let type: $$Props['type'] = 'row';
    export let id: $$Props['id'] = undefined;

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
</script>

<div role={type === 'row' ? 'row' : 'rowheader'}>
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
