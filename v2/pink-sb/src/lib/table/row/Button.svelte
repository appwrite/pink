<script lang="ts">
    import type { HTMLButtonAttributes } from 'svelte/elements';
    import type { RowBaseProps } from './index.js';
    import { onMount } from 'svelte';
    import Cell from '../Cell.svelte';
    import Checkbox from '$lib/selector/Checkbox.svelte';

    type $$Props = HTMLButtonAttributes & RowBaseProps;

    export let root: RowBaseProps['root'];
    export let id: $$Props['id'] = undefined;

    function clickOnEnter(
        event: KeyboardEvent & {
            currentTarget: EventTarget & HTMLElement;
        }
    ) {
        if (event.key === 'Enter' && event.currentTarget.contains(event.target as Node)) {
            event.preventDefault();
            event.currentTarget.click();
        }
    }

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

<div role="row" tabindex="0" on:click|preventDefault {...$$restProps} on:keyup={clickOnEnter}>
    {#if root.allowSelection}
        <Cell id="first" {root}>
            <Checkbox size="s" on:change={toggle} checked={selected} />
        </Cell>
    {/if}
    <slot {toggle} />
</div>

<style lang="scss">
    [role='row'] {
        display: grid;
        grid-template-columns: subgrid;
        grid-column: 1 / -1;
        width: 100%;
        cursor: pointer;
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
