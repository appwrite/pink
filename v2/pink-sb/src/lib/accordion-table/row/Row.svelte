<script lang="ts">
    import { onMount, setContext } from 'svelte';

    import Icon from '$lib/Icon.svelte';
    import { slide } from 'svelte/transition';
    import type { RootProp } from '../index.js';
    import { createEventDispatcher } from 'svelte';
    import Button from '../../button/Button.svelte';
    import { IconChevronDown } from '@appwrite.io/pink-icons-svelte';
    import Summary from '$lib/accordion-table/summary/Summary.svelte';

    export let id: string;
    export let root: RootProp;
    export let expandable: boolean = true;
    export let defaultOpen: boolean = false;

    const dispatch = createEventDispatcher<{
        toggle: { id: string; open: boolean };
        open: { id: string };
        close: { id: string };
    }>();

    onMount(() => {
        if (id) root.register(id);
        if (defaultOpen && id) root.open(id);

        return () => {
            if (id) root.unregister(id);
        };
    });

    $: isOpen = root.isOpen(id);
    $: rowGridTemplate = `repeat(${root.columnsCount}, 1fr)`;

    setContext('expandable', expandable);

    function toggleRow() {
        if (!expandable) return;

        const wasOpen = isOpen;
        root.toggle(id);

        const nowOpen = !wasOpen;
        dispatch('toggle', { id, open: nowOpen });

        if (nowOpen) dispatch('open', { id });
        else dispatch('close', { id });
    }
</script>

<div class="accordion-table-row" class:has-children={expandable} class:is-open={isOpen}>
    {#if expandable}
        <div class="row-content">
            <Button variant="compact" on:click={toggleRow} style="width: 100%">
                <span class="chevron" class:is-open={isOpen} style:display="flex">
                    <Icon icon={IconChevronDown} size="s"></Icon>
                </span>

                <slot {id} />
            </Button>
        </div>
    {:else}
        <div class="row-content" style:grid-template-columns={rowGridTemplate}>
            <slot {id} />
        </div>
    {/if}

    {#if isOpen}
        <div class="expanded-content" transition:slide={{ duration: 200 }}>
            <Summary {root} let:table>
                <slot name="summary" {id} root={table} />
            </Summary>
        </div>
    {/if}
</div>

<style lang="scss">
    .accordion-table-row {
        display: inline;
        &.has-children:not(.is-open):hover .row-content {
            background: var(--overlay-hover);

            .chevron {
                color: var(--fgcolor-neutral-secondary);
            }
        }

        &.is-open .row-content {
            background: var(--bgcolor-neutral-primary);
            border-bottom-color: var(--divider-strong);
        }
    }

    .row-content {
        display: flex;
        align-items: center !important;
        width: 100% !important;
        height: var(--row-height);
        padding: 4px 12px !important;
        --p-button-border-radius: 0;

        border-bottom: var(--border-width-s, 1px) solid var(--divider-color) !important;

        & > :global(*) {
            height: 100%;
        }
    }

    .chevron {
        color: var(--fgcolor-neutral-tertiary);
        transition:
            rotate 300ms ease-in-out,
            color 200ms ease-in-out;

        &.is-open {
            rotate: 180deg;
            color: var(--fgcolor-neutral-secondary);
        }
    }

    .expanded-content {
        padding: 0;
        position: relative;
        background: var(--bgcolor-neutral-default);
    }

    .expanded-content::after {
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
        content: '';
        position: absolute;
        pointer-events: none;
        height: var(--border-width-s);
        background: var(--divider-strong);
    }
</style>
