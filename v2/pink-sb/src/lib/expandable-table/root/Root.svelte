<script lang="ts">
    import type { RootProp } from '../index.js';
    import Text from '$lib/typography/Text.svelte';

    export type ExpandableTableColumn = {
        id: string;
        title?: string;
        width?: string; // e.g. '2fr'
        align?: 'left' | 'center' | 'right';
    };

    export let single: boolean = false;
    export let openIds: string[] = [];
    export let columns: ExpandableTableColumn[] = [];
    export let showHeader: boolean = true;

    let registeredIds: Set<string> = new Set();

    function isOpen(id: string): boolean {
        return openIds.includes(id);
    }

    function open(id: string): void {
        if (!registeredIds.has(id)) return;
        if (single) {
            openIds = [id];
        } else if (!openIds.includes(id)) {
            openIds = [...openIds, id];
        }
    }

    function close(id: string): void {
        if (!registeredIds.has(id)) return;
        openIds = openIds.filter((openId) => openId !== id);
    }

    function toggle(id: string): void {
        if (isOpen(id)) close(id);
        else open(id);
    }

    function register(id: string): void {
        registeredIds.add(id);
        registeredIds = registeredIds;
    }

    function unregister(id: string): void {
        registeredIds.delete(id);
        registeredIds = registeredIds;
        openIds = openIds.filter((openId) => openId !== id);
    }

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

    $: root = {
        single,
        openIds,
        isOpen,
        open,
        close,
        toggle,
        register,
        unregister,
        columns,
        gridTemplateColumns,
        childGridTemplate,
        getJustify
    } as RootProp & {
        columns: ExpandableTableColumn[];
        gridTemplateColumns: string;
        childGridTemplate: string;
        getJustify: typeof getJustify;
    };
</script>

<div class="expandable-table">
    {#if showHeader && columns.length}
        <div class="table-header" style="grid-template-columns: {gridTemplateColumns};">
            <slot name="header">
                {#each columns as col}
                    <div class="header-cell" style="justify-content: {getJustify(col.align)};">
                        <Text variant="m-500" color="--fgcolor-neutral-secondary">{col.title}</Text>
                    </div>
                {/each}
            </slot>
        </div>
    {/if}

    <div class="table-body">
        <slot {root} />
    </div>
</div>

<style lang="scss">
    .expandable-table {
        --row-pad-top: var(--space-3, 8px);
        --row-pad-bottom: var(--space-3, 8px);
        --row-pad-left: var(--space-4, 12px);
        --row-pad-right: var(--space-4, 12px);
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
        overflow-x: auto;
        width: 100%;
    }

    @media (prefers-color-scheme: dark) {
        .expandable-table {
            --divider-color: var(--border-neutral, rgba(255, 255, 255, 0.08));
            --divider-strong: var(--border-neutral-strong, rgba(255, 255, 255, 0.12));
            --overlay-hover: var(--overlay-neutral-hover, rgba(255, 255, 255, 0.02));
            --row-open-bg: var(--bgcolor-neutral-default-dark, rgba(255, 255, 255, 0.02));
        }
    }

    .table-header {
        display: grid;
        align-items: center;
        padding: var(--row-pad-top) var(--row-pad-right) var(--row-pad-bottom) var(--row-pad-left);
        background: var(--bgcolor-neutral-tertiary, #fff);
        border-bottom: var(--border-width-s, 1px) solid var(--divider-strong);
        min-height: var(--row-height);
    }
    .header-cell {
        display: flex;
        align-items: center;
    }

    /* Responsive (match legacy) */
    @media (max-width: 480px) {
        .table-header {
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            padding: 8px;
        }
    }
    @media (min-width: 481px) and (max-width: 768px) {
        .table-header {
            grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
            padding: 10px 12px;
        }
    }
    @media (min-width: 1200px) {
        .table-header {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            padding: 14px 20px;
        }
    }
</style>
