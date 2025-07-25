<script lang="ts">
    import Cell from './Cell.svelte';
    import Icon from '$lib/Icon.svelte';
    import Row from './row/Base.svelte';
    import { Button } from '$lib/button/index.js';
    import { DragManager } from './drag/manager.js';
    import { onMount, createEventDispatcher } from 'svelte';
    import { IconPlus } from '@appwrite.io/pink-icons-svelte';
    import { type Column, EMPTY_ROW_ID, type RootProp } from './index.js';

    export let loading = false;
    export let columns: Array<Column>;
    export let height: string = '100vh';
    export let allowSelection = false;
    export let selectedRows: string[] = [];
    export let emptyCells: false | number = false;
    export let borderRadius: 'xs' | 's' | 'm' | undefined = undefined;
    export let bottomActionClick: (() => void) | undefined = undefined;

    let rootEl: HTMLDivElement;
    let fixedColumnsWidth = 0;
    let availableIds = new Set<string>();
    let draggingColumn: string | null = null;
    let dragOverColumn: string | null = null;
    let currentlyEditingCellId: string | null = null;

    let dragManager: DragManager;
    const dispatch = createEventDispatcher();
    const columnCache = new Map<string, number>();

    onMount(async () => {
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

        dispatch('columnsResize', {
            columnId,
            newWidth: clamped,
        });
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
        const oldPositions = new Map<string, number>();

        // should be equal as the length of columns
        const columnEls = Array.from(rootEl.querySelectorAll('[data-column-id]')) as HTMLElement[];

        for (const column of columnEls) {
            const id = column.getAttribute('data-column-id');
            if (id) oldPositions.set(id, column.getBoundingClientRect().left);
        }

        const newColumns = dragManager.endDrag();
        if (!newColumns || !Array.isArray(columns)) {
            dragOverColumn = null;
            draggingColumn = null;
            return;
        }

        // retain resizedWidth
        columns = newColumns.map((col) => {
            const match = (columns as Column[]).find((c) => c.id === col.id);
            return match ? { ...col, resizedWidth: match.resizedWidth } : col;
        });

        requestAnimationFrame(() => {
            const movedElements: HTMLElement[] = [];

            const swappedElements = Array.from(
                rootEl.querySelectorAll('[data-column-id]')
            ) as HTMLElement[];

            for (const swappedElement of swappedElements) {
                const id = swappedElement.getAttribute('data-column-id');
                if (!id || !oldPositions.has(id)) continue;

                const newLeft = swappedElement.getBoundingClientRect().left;
                const oldLeft = oldPositions.get(id)!;
                const dx = oldLeft - newLeft;

                if (dx !== 0) {
                    swappedElement.style.transition = 'none';
                    swappedElement.style.transform = `translateX(${dx}px)`;
                    movedElements.push(swappedElement);
                }
            }

            if (movedElements.length) {
                movedElements[0].offsetWidth;
            }

            requestAnimationFrame(() => {
                for (const element of movedElements) {
                    element.style.transition = 'transform 200ms ease';
                    element.style.transform = 'translateX(0)';
                    element.addEventListener(
                        'transitionend',
                        () => {
                            element.style.transition = '';
                            element.style.transform = '';
                        },
                        { once: true }
                    );
                }

                dragOverColumn = null;
                draggingColumn = null;
            });

            /**
             * easy tracking on component side without
             * having to worry about the state management issues.
             */
            dispatch('columnsSwap', columns.map((col) => col.id));
        });
    }

    function clearDragOver() {
        dragOverColumn = null;
    }

    function calculateLastColumnBeforeAction(cols: Column[]): string | null {
        const firstActionIndex = cols.findIndex((col) => col.isAction);
        return firstActionIndex > 0 ? cols[firstActionIndex - 1].id : null;
    }

    $: emptyRowsCount = typeof emptyCells === 'number' ? emptyCells : 0;

    $: someRowsSelected =
        availableIds.size > 0 &&
        selectedRows.length > 0 &&
        selectedRows.some((row) => availableIds.has(row));

    $: allRowsSelected =
        availableIds.size > 0 && [...availableIds].every((row) => selectedRows.includes(row));

    $: root = {
        loading,
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
        lastResizableColumnId: calculateLastResizableId(columns),
        lastColumnBeforeAction: calculateLastColumnBeforeAction(columns)
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

<div
    class="root"
    bind:this={rootEl}
    style:height
    style:--sheet-border-radius={resolveBorderRadius()}
>
    <div class="spreadsheet-container">
        <div
            role="grid"
            class:reordering={!!draggingColumn}
            style:--fixed-columns-width={`${fixedColumnsWidth}px`}
            style:--grid-template-columns={createGridTemplateColumns(columns)}
        >
            {#if $$slots.header}
                <Row type="header" {root} sticky>
                    <slot name="header" {root} />
                </Row>
            {/if}

            <slot {root} />

            {#if emptyCells && emptyRowsCount > 0}
                {#each Array.from({ length: emptyRowsCount }, (_, i) => i) as rowIndex}
                    <Row {root} id={EMPTY_ROW_ID}>
                        {#each columns as col, columnIndex (`${col.id}-${rowIndex}-${columnIndex}`)}
                            <Cell {root} column={col.id} id={EMPTY_ROW_ID} isEditable={false} />
                        {/each}
                    </Row>
                {/each}
            {/if}
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
            flex: 1;
            min-height: 0;
            overflow-y: auto;
        }

        [role='grid'] {
            width: 100%;
            display: grid;
            position: relative;
            grid-template-columns: var(--grid-template-columns);
        }

        .footer {
            bottom: 0;
            position: sticky;

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
            width: 100%;
            display: flex;
            align-items: center;
        }
    }
</style>
