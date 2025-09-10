<script lang="ts">
    import { onMount, tick } from 'svelte';
    import Table from '$lib/table/index.js';
    import type { RootProp } from '../index.js';
    import { browser } from '$app/environment';

    export let root: RootProp;

    let innerWidth = 1024;
    let tableReference: HTMLElement;
    let measuredTemplate: string | null = null;

    onMount(() => (innerWidth = window.innerWidth));

    $: isMobileViewport = innerWidth < 768;
    $: isDesktopViewport = innerWidth >= 1024;
    $: isTabletViewport = innerWidth >= 768 && innerWidth < 1024;

    $: tableColumns = root.columns.map((c) => ({
        id: c.id,
        hide: c.hide,
        width: isDesktopViewport ? c.width : undefined
    }));

    async function measureColumns() {
        if (isMobileViewport) {
            // simpler 1fr for mobile
            const visibleCount = root.columns.filter((c) => !c.hide).length;
            measuredTemplate = `repeat(${visibleCount}, 1fr)`;
        } else if (isTabletViewport && tableReference) {
            await tick();
            const widths: number[] = [];

            // not the most optimal, but shouldn't affect performance.
            const cells = tableReference.querySelectorAll('[role="row"]:first-child [role="cell"]');

            cells.forEach((cell) => {
                // buffer of 16px, just to be a bit safe!
                widths.push(cell.getBoundingClientRect().width + 16);
            });

            if (widths.length > 0) {
                const minWidth = Math.min(...widths);
                measuredTemplate = widths
                    .map((w) => `${Math.max(1, Math.round((w / minWidth) * 10) / 10)}fr`)
                    .join(' ');
            }
        } else {
            measuredTemplate = null;
        }
    }

    $: if (browser && innerWidth) {
        measureColumns();
    }
</script>

<svelte:window bind:innerWidth />

<div
    class="summary"
    bind:this={tableReference}
    class:is-mobile={isMobileViewport}
    class:is-tablet={isTabletViewport}
    style:--summary-table-grid-template={measuredTemplate}
>
    <Table.Root columns={tableColumns} let:root={table}>
        <slot {root} {table} />
    </Table.Root>
</div>

<style lang="scss">
    .summary {
        width: 100%;
        display: block;

        --p-table-border: 0;
        --p-table-border-radius: 0;
        --p-table-background: transparent;
        --p-table-row-background: var(--bgcolor-neutral-default);

        :global([role='row']:last-child) :global([role='cell']) {
            border-bottom: 0;
        }

        &.is-mobile,
        &.is-tablet {
            :global([role='table']) {
                grid-template-columns: var(--summary-table-grid-template) !important;
            }
        }
    }
</style>
