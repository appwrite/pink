<script lang="ts">
    import type { HTMLAnchorAttributes } from 'svelte/elements';
    import type { RowBaseProps } from './index.ts';
    import { onMount } from 'svelte';
    import Cell from '../Cell.svelte';
    import Checkbox from '$lib/selector/Checkbox.svelte';
    type $$Props = HTMLAnchorAttributes & RowBaseProps & { href: string };

    export let href: $$Props['href'];
    export let root: RowBaseProps['root'];
    export let id: RowBaseProps['id'] = undefined;
    export let select: $$Props['select'] = true;

    function toggle() {
        if (id) root.toggle(id);
    }

    onMount(() => {
        if (id && select === true) root.addAvailableId(id);

        return () => {
            if (id) root.removeAvailableId(id);
        };
    });
    $: selected = id ? root.selectedRows.includes(id) : false;
</script>

<a role="row" {href} {...$$restProps}>
    {#if root.allowSelection}
        <Cell column={`__select_${id}`} {root}>
            {#if select !== 'hidden'}
                <Checkbox
                    size="s"
                    disabled={select === 'disabled'}
                    on:change={toggle}
                    checked={selected}
                />
            {/if}
        </Cell>
    {/if}
    <slot {toggle} />
</a>

<style lang="scss">
    [role='row'] {
        position: relative;
        height: calc(40px + var(--border-width-s));
        display: grid;
        grid-template-columns: subgrid;
        grid-column: 1 / -1;
        width: 100%;
        background: var(--bgcolor-neutral-primary);

        &:hover {
            background: var(--overlay-neutral-hover);
        }

        &:last-child {
            :global([role='cell']) {
                border-bottom: 0;
            }
        }
    }
</style>
