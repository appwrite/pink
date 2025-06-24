<script lang="ts">
    import { onMount } from 'svelte';
    import Row from './row/Base.svelte';
    import Icon from '$lib/Icon.svelte';
    import { Button } from '$lib/button/index.js';
    import { DragManager } from './drag/manager.js';
    import type { Column, RootProp } from './index.js';
    import { IconPlus } from '@appwrite.io/pink-icons-svelte';

    export let columns: Array<Column>;
    export let allowSelection = false;
    export let selectedRows: string[] = [];
    export let borderRadius: 'xs' | 's' | 'm' | undefined = undefined;
    export let bottomActionClick: (() => void) | undefined = undefined;

    let rootEl: HTMLDivElement;
    let fixedColumnsWidth = 0;
    let availableIds = new Set<string>();
    let draggingColumn: string | null = null;
    let dragOverColumn: string | null = null;
    let currentlyEditingCellId: string | null = null;

    let dragManager: DragManager;
    const columnCache = new Map<string, number>();

    onMount(() => {
        if (Array.isArray(columns)) {
            calculateFixedColumnsWidth(columns);
            dragManager = new DragManager(rootEl, columns);
        }
    });

    function calculateFixedColumnsWidth(cols: Column[]) {
        let width = allowSelection ? 40 : 0;
        for (const col of cols) {
            if (!col.fixed) continue;
            width += typeof col.width === 'number' ? col.width : (col.width?.min ?? 40);
        }

        fixedColumnsWidth = width;
    }

    function calculateLastResizableId(cols: number | Column[]) {
        if (typeof cols === 'number') return null;
        const visible = cols.filter((col) => !col.hide);
        if (visible.length === 0) return null;

        const last = visible.at(-1);
        if (last && !last.fixed) return last.id;

        const secondLast = visible.at(-2);
        return secondLast?.id ?? null;
    }

    function updateCells(columnId: string, newWidth: number) {
        let index = columnCache.get(columnId);
        if (index === undefined) {
            index = columns.findIndex((col) => col.id === columnId);
            if (index !== -1) columnCache.set(columnId, index);
        }
        if (index === -1) return;

        const col = columns[index];
        const current =
            col.resizedWidth ?? (typeof col.width === 'number' ? col.width : (col.width?.min ?? 0));

        if (current === newWidth) return;

        const min = typeof col.width === 'number' ? col.width : (col.width?.min ?? 0);

        const max = typeof col.width === 'object' && 'max' in col.width ? col.width.max : undefined;

        const clamped = Math.max(min, typeof max === 'number' ? Math.min(newWidth, max) : newWidth);

        columns[index] = {
            ...col,
            resizedWidth: clamped
        };

        columns = [...columns];
        calculateFixedColumnsWidth(columns);
    }

    function groupById(cols: typeof columns): Record<Column['id'], Column> {
        return cols.reduce(
            (acc, column) => {
                acc[column.id] = column;
                return acc;
            },
            {} as Record<Column['id'], Column>
        );
    }

    function createGridTemplateColumns(cols: typeof columns) {
        let hasOnlyMaxWidth = true;
        const scrollable: string[] = [];
        const rightFixed: string[] = [];
        const leftFixed = allowSelection ? ['40px'] : [];

        for (const column of cols) {
            if (column.hide) continue;

            if (
                hasOnlyMaxWidth &&
                !(typeof column.width === 'number' || (column.width && 'max' in column.width))
            ) {
                hasOnlyMaxWidth = false;
            }

            let width = '1fr';
            if (column.width !== undefined) {
                if (column.resizedWidth) {
                    width = `${column.resizedWidth}px`;
                } else if (typeof column.width === 'number') {
                    width = `${column.width}px`;
                } else if ('min' in column.width && 'max' in column.width) {
                    width = `minmax(${column.width.min}px, ${column.width.max}px)`;
                } else if ('min' in column.width) {
                    width = `minmax(${column.width.min}px, 1fr)`;
                }
            }

            if (column.fixed && column.id === 'actions') {
                rightFixed.push(width);
            } else {
                scrollable.push(width);
            }
        }

        return [...leftFixed, ...scrollable, ...rightFixed].join(' ');
    }

    function toggleAll() {
        if (allRowsSelected) {
            selectedRows = selectedRows.filter((row) => !availableIds.has(row));
        } else {
            selectedRows = [
                ...selectedRows,
                ...[...availableIds].filter((row) => !selectedRows.includes(row))
            ];
        }
    }

    function toggle(id: string) {
        if (selectedRows.includes(id)) {
            selectedRows = selectedRows.filter((row) => row !== id);
        } else {
            selectedRows = [...selectedRows, id];
        }
    }

    function addAvailableId(id: string) {
        availableIds.add(id);
        availableIds = availableIds;
    }

    function removeAvailableId(id: string) {
        availableIds.delete(id);
        availableIds = availableIds;
    }

    function setEditing(cell: string | null) {
        currentlyEditingCellId = cell;
    }

    function startDrag(columnId: string, event?: DragEvent) {
        draggingColumn = columnId;
        dragManager.startDrag(columnId, event);
    }

    function overDrag(columnId: string, event?: DragEvent) {
        const canDrag = dragManager.handleDragOver(columnId, event);
        if (!canDrag) {
            draggingColumn = null;
            dragOverColumn = null;
        } else {
            dragOverColumn = columnId;
        }
    }

    function endDrag() {
        const newColumns = dragManager.endDrag();
        if (newColumns && Array.isArray(columns)) {
            columns = newColumns.map((col) => {
                // retain resizedWidth
                const match = (columns as Column[]).find((c) => c.id === col.id);
                return match ? { ...col, resizedWidth: match.resizedWidth } : col;
            });
        }

        dragOverColumn = null;
        draggingColumn = null;
    }

    function clearDragOver() {
        dragOverColumn = null;
    }

    $: someRowsSelected =
        availableIds.size > 0 &&
        selectedRows.length > 0 &&
        selectedRows.some((row) => availableIds.has(row));

    $: allRowsSelected =
        availableIds.size > 0 && [...availableIds].every((row) => selectedRows.includes(row));

    $: root = {
        allowSelection,
        selectedRows,
        columns: groupById(columns),
        toggleAll,
        toggle,
        updateCells,
        currentlyEditingCellId,
        selectedSome: someRowsSelected,
        selectedNone: !someRowsSelected,
        selectedAll: allRowsSelected,
        addAvailableId,
        removeAvailableId,
        setEditing,
        draggingColumn,
        dragOverColumn,
        startDrag,
        overDrag,
        endDrag,
        clearDragOver,
        lastResizableColumnId: calculateLastResizableId(columns)
    } as RootProp;

    function resolveBorderRadius() {
        switch (borderRadius) {
            case 'xs':
                return 'var(--border-radius-xs)';
            case 's':
                return 'var(--border-radius-s)';
            case 'm':
                return 'var(--border-radius-m)';
            default:
                return undefined;
        }
    }
</script>

<div class="root" bind:this={rootEl} style:--sheet-border-radius={resolveBorderRadius()}>
    <div class="spreadsheet-container">
        <div
            role="grid"
            class:reordering={!!draggingColumn}
            style:--fixed-columns-width={`${fixedColumnsWidth}px`}
            style:--grid-template-columns={createGridTemplateColumns(columns)}
        >
            {#if $$slots.header}
                <Row type="header" {root}>
                    <slot name="header" {root} />
                </Row>
            {/if}

            <slot {root} />
        </div>
    </div>

    {#if $$slots.footer}
        <div class="footer">
            {#if typeof bottomActionClick !== 'undefined'}
                <div class="footer-action-divider">
                    <Button icon variant="extra-compact" on:click={bottomActionClick}>
                        <Icon icon={IconPlus} color="--fgcolor-neutral-tertiary" />
                    </Button>
                </div>
            {/if}

            <div class="footer-content">
                <slot name="footer" {root} />
            </div>
        </div>
    {/if}
</div>

<style lang="scss">
    .root {
        height: 100vh;
        border: 1px solid var(--border-neutral);
        border-radius: var(--sheet-border-radius);
        background: var(--bgcolor-neutral-primary);

        overflow: hidden;
        border-bottom: unset;
        scrollbar-width: none;
        scroll-behavior: smooth;
        -ms-overflow-style: none;

        display: grid;
        grid-template-rows: 1fr auto;

        ::-webkit-scrollbar {
            display: none;
        }

        .spreadsheet-container {
            height: 100%;
            overflow: auto;
        }

        [role='grid'] {
            width: 100%;
            display: grid;
            position: relative;
            grid-template-columns: var(--grid-template-columns);
        }

        .footer {
            width: 100%;
            height: 40px;
            background: var(--bgcolor-neutral-default);
            border-top: 1px solid var(--border-neutral);
            border-bottom: 1px solid var(--border-neutral);

            display: flex;
            align-items: center;
            gap: var(--space-xxl);
            padding: 0 var(--space-3);
        }

        .footer-action-divider {
            display: flex;
            height: 100%;
            align-items: center;
            padding-inline-start: var(--space-2);
            padding-right: var(--space-4);
            margin-right: var(--space-6);
            border-right: var(--border-width-s) solid var(--border-neutral);
        }

        .footer-content {
            display: flex;
            align-items: center;
        }
    }
</style>
