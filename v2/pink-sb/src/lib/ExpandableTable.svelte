<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import Icon from '$lib/Icon.svelte';
    import Text from '$lib/typography/Text.svelte';
    import Badge from '$lib/Badge.svelte';
    import { IconChevronDown } from '@appwrite.io/pink-icons-svelte';
    import { slide } from 'svelte/transition';

    export interface ExpandableTableColumn {
        id: string;
        title: string;
        width?: string;
        align?: 'left' | 'center' | 'right';
    }

    export interface ExpandableTableRow {
        id: string;
        cells: Record<string, string>;
        expandable?: boolean;
        open?: boolean;
        children?: ExpandableTableRow[];
        badge?: {
            content: string;
            type?: 'success' | 'warning' | 'error';
        };
    }

    export let columns: ExpandableTableColumn[] = [];
    export let rows: ExpandableTableRow[] = [];
    export let showHeader = true;

    const dispatch = createEventDispatcher<{
        toggle: { rowId: string; open: boolean };
    }>();

    const toggleRow = (rowId: string) => {
        rows = rows.map((row) => (row.id === rowId ? { ...row, open: !row.open } : row));
        const row = rows.find((r) => r.id === rowId);
        if (row) dispatch('toggle', { rowId, open: row.open ?? false });
    };

    // Grid column templates
    $: baseColumnWidths = columns.length ? columns.map((c) => c.width ?? '1fr').join(' ') : '1fr';
    $: gridTemplateColumns = baseColumnWidths;
    $: childGridTemplate = baseColumnWidths;

    const getJustify = (align?: 'left' | 'center' | 'right') => {
        switch (align) {
            case 'right':
                return 'flex-end';
            case 'center':
                return 'center';
            default:
                return 'flex-start';
        }
    };
</script>

<div class="expandable-table">
    {#if showHeader && columns.length}
        <div class="table-header" style="grid-template-columns: {gridTemplateColumns};">
            {#each columns as col}
                <div class="header-cell" style="justify-content: {getJustify(col.align)};">
                    <Text variant="m-500" color="--fgcolor-neutral-secondary">
                        {col.title}
                    </Text>
                </div>
            {/each}
        </div>
    {/if}

    <div class="table-body">
        {#each rows as row, rowIndex (row.id)}
            <div class="table-row" class:has-children={row.expandable} class:is-open={row.open}>
                <div class="row-content" style="grid-template-columns: {gridTemplateColumns};">
                    {#each columns as col, colIndex}
                        <div class="cell" style="justify-content: {getJustify(col.align)};">
                            {#if row.expandable && colIndex === 0}
                                <button
                                    class="chevron-button"
                                    on:click={() => toggleRow(row.id)}
                                    aria-expanded={row.open}
                                    aria-label={row.open ? 'Collapse row' : 'Expand row'}
                                >
                                    <span class="chevron" class:open={row.open}>
                                        <Icon icon={IconChevronDown} size="s" />
                                    </span>
                                </button>
                            {/if}

                            <Text
                                variant={rowIndex === rows.length - 1 ? 'm-500' : 'm-400'}
                                color={rowIndex === rows.length - 1
                                    ? '--fgcolor-neutral-primary'
                                    : '--fgcolor-neutral-secondary'}
                            >
                                {row.cells?.[col.id] ?? ''}
                            </Text>

                            {#if row.badge && colIndex === 0}
                                <Badge
                                    size="xs"
                                    variant="secondary"
                                    type={row.badge.type}
                                    content={row.badge.content}
                                />
                            {/if}
                        </div>
                    {/each}
                </div>

                {#if row.expandable && row.open && row.children}
                    <div class="expanded-content" transition:slide={{ duration: 200 }}>
                        {#each row.children as child (child.id)}
                            <div
                                class="child-row"
                                style="grid-template-columns: {childGridTemplate};"
                            >
                                {#each columns as col}
                                    <div
                                        class="child-cell"
                                        style="justify-content: {getJustify(col.align)};"
                                    >
                                        <Text variant="m-400" color="--fgcolor-neutral-secondary">
                                            {child.cells?.[col.id] ?? ''}
                                        </Text>
                                    </div>
                                {/each}
                            </div>
                        {/each}
                    </div>
                {/if}
            </div>
        {/each}
    </div>
</div>

<style lang="scss">
    .expandable-table {
        --row-pad-top: var(--space-4, 12px);
        --row-pad-bottom: var(--space-4, 12px);
        --row-pad-left: var(--space-6, 16px);
        --row-pad-right: var(--space-6, 16px);
        --row-gap: 4px;
        --row-height: 40px;

        --divider-color: var(--border-neutral, rgba(0, 0, 0, 0.12));
        --divider-strong: var(--border-neutral-strong, rgba(0, 0, 0, 0.18));
        --overlay-hover: var(--overlay-neutral-hover, rgba(0, 0, 0, 0.04));
        --row-open-bg: var(--bgcolor-neutral-default, rgba(0, 0, 0, 0.02));
        --accordion-bg: var(--bgcolor-neutral-default, var(--row-open-bg));

        border: var(--border-width-s, 1px) solid var(--divider-strong);
        border-radius: var(--border-radius-s);
        background: var(--bgcolor-neutral-primary, #fff);
        overflow: hidden;
    }

    @media (prefers-color-scheme: dark) {
        .expandable-table {
            --divider-color: var(--border-neutral, rgba(255, 255, 255, 0.08));
            --divider-strong: var(--border-neutral-strong, rgba(255, 255, 255, 0.12));
            --overlay-hover: var(--overlay-neutral-hover, rgba(255, 255, 255, 0.02));
            --row-open-bg: var(--bgcolor-neutral-default-dark, rgba(255, 255, 255, 0.02));
        }
        .child-row {
            background: var(--bgcolor-neutral-default-dark, rgba(255, 255, 255, 0.02));
        }
    }

    /* Header */
    .table-header {
        display: grid;
        align-items: center;
        padding: var(--row-pad-top) var(--row-pad-right) var(--row-pad-bottom) var(--row-pad-left);
        background: var(--bgcolor-neutral-tertiary, #fff);
        border-bottom: var(--border-width-s, 1px) solid var(--divider-strong);
        height: var(--row-height);
    }
    .header-cell {
        display: flex;
        align-items: center;
    }

    /* Rows */
    .table-row.has-children:not(.is-open):hover .row-content {
        background: var(--overlay-hover);
    }
    .table-row.is-open .row-content {
        background: var(--row-open-bg);
        border-bottom-color: var(--divider-strong);
    }

    /* Row content */
    .row-content {
        display: grid;
        align-items: center;
        padding: var(--row-pad-top) var(--row-pad-right) var(--row-pad-bottom) var(--row-pad-left);
        border-bottom: var(--border-width-s, 1px) solid var(--divider-color);
        height: var(--row-height);
        box-sizing: border-box;
        transition: background-color 0.2s ease;
    }
    .cell {
        display: flex;
        align-items: center;
        gap: 4px; /* tighter spacing between chevron + text + badge */
    }

    /* Chevron */
    .chevron-button {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0; /* remove extra spacing */
        border-radius: var(--border-radius-s);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .chevron-button:hover {
        background: var(--overlay-hover);
    }
    .chevron-button:focus-visible {
        outline: var(--border-width-l) solid var(--border-focus);
    }
    .chevron {
        display: flex;
        transition: rotate 300ms ease-in-out;
    }
    .chevron.open {
        rotate: 180deg;
    }

    /* Expanded content */
    .expanded-content {
        background: var(--accordion-bg);
        padding-top: calc(var(--row-pad-top) / 2);
        padding-bottom: var(--row-pad-bottom);
        position: relative;
    }
    .expanded-content::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: calc(var(--border-width-s, 1px) * 2);
        background: var(--divider-strong);
        box-shadow: 0 -1px 0 var(--divider-color) inset;
        z-index: 1;
        pointer-events: none;
    }

    /* Child rows */
    .child-row {
        display: grid;
        align-items: center;
        padding: var(--row-pad-top) var(--row-pad-right) var(--row-pad-bottom) var(--row-pad-left);
        border-bottom: var(--border-width-s, 1px) solid var(--divider-color);
        height: var(--row-height);
        box-sizing: border-box;
        background: transparent;
        color: var(--fgcolor-neutral-secondary, rgba(0, 0, 0, 0.6));
    }
    .child-row:last-child {
        border-bottom: none;
    }
    .child-cell {
        display: flex;
        align-items: center;
    }
</style>
