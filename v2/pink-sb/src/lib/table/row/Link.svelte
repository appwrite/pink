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

<a role="row" {href} {...$$restProps}>
    {#if root.allowSelection}
        <Cell id="first" {root}>
            <Checkbox size="s" on:change={toggle} checked={selected} />
        </Cell>
    {/if}
    <slot {toggle} />
</a>

<style lang="scss">
    [role='row'] {
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
