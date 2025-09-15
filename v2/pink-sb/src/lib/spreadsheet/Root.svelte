<script lang="ts">
    import Cell from './Cell.svelte';
    import Icon from '$lib/Icon.svelte';
    import Row from './row/Base.svelte';
    import Tooltip from '$lib/Tooltip.svelte';
    import { Button } from '$lib/button/index.js';
    import { DragManager } from './drag/manager.js';
    import { IconPlus } from '@appwrite.io/pink-icons-svelte';
    import { createVirtualizer } from '@tanstack/svelte-virtual';
    import { tick, onMount, createEventDispatcher, type ComponentProps } from 'svelte';
    import { EMPTY_ROW_ID, ESTIMATED_ROW_HEIGHT, type Column, type RootProp } from './index.js';

    type TooltipPlacement = NonNullable<ComponentProps<Tooltip>['placement']>;

    export let loading = false;
    export let columns: Array<Column>;
    export let height: string = '100vh';
    export let allowSelection = false;
    export let keyboardNavigation = false;
    export let selectedRows: string[] = [];
    export let emptyCells: false | number = false;
    export let selection: true | 'hidden' | 'disabled' = true;
    export let borderRadius: 'xs' | 's' | 'm' | undefined = undefined;

    export let bottomActionTooltip:
        | {
              text: string;
              placement?: TooltipPlacement;
          }
        | undefined = undefined;

    export let bottomActionClick: (() => void) | undefined = undefined;

    export let rowCount: number = 0;
    export let loadingMore: boolean = false;
    export let useVirtualizer: boolean = false;

    export let currentPage: number = 1;
    export let itemsPerPage: number = 30;
    export let jumpToPageNumber: number = 0;
    export let goToPage: ((pageNum: number) => Promise<void>) | undefined = undefined;
    export let loadNextPage: ((pageNum: number) => Promise<boolean>) | undefined = undefined;
    export let loadPreviousPage: ((pageNum: number) => Promise<boolean>) | undefined = undefined;

    export let nextPageTriggerOffset: number = 5;

    let loadingTriggered = false;
    let lastCheckedPages = new Set<number>();

    let rootEl: HTMLDivElement;
    let sheetContainer: HTMLDivElement;

    let fixedColumnsWidth = 0;
    let availableIds = new Set<string>();
    let draggingColumn: string | null = null;
    let dragOverColumn: string | null = null;

    let currentlyHoveredColumn: string | null = null;
    let currentlyEditingCellId: string | null = null;
    let cellGridRegistry: (HTMLElement | undefined)[][] = [];

    let dragManager: DragManager;
    const dispatch = createEventDispatcher();
    const columnCache = new Map<string, number>();

    $: if (columns) {
        // clear cache
        invalidateColumnCache();

        // needs to be initialized
        // for the most recent updated columns!
        initColumns();
    }

    const handleScroll = () => {
        const totalPages = Math.ceil(rowCount / itemsPerPage) || 1;

        const scrollTop = $virtualizer.scrollElement?.scrollTop ?? 0;
        const topVisibleIndex = Math.floor(scrollTop / ESTIMATED_ROW_HEIGHT);
        const calculatedPage = Math.floor(topVisibleIndex / itemsPerPage) + 1;

        // update `currentPage` regardless of listeners availability on scroll!
        if (calculatedPage !== currentPage && calculatedPage > 0 && calculatedPage <= totalPages) {
            currentPage = calculatedPage;
        }

        if (!useVirtualizer || loadingTriggered || loadingMore || !$virtualizer) return;
        if (!loadPreviousPage && !loadNextPage) return;

        const virtualItems = $virtualizer.getVirtualItems();
        if (virtualItems.length === 0) return;

        // next page loading
        if (loadNextPage) {
            const scrollElement = $virtualizer.scrollElement;
            if (!scrollElement) return;

            const { scrollTop, scrollHeight, clientHeight } = scrollElement;
            const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);
            const triggerDistance = nextPageTriggerOffset * ESTIMATED_ROW_HEIGHT;
            const hasBufferSpace = distanceFromBottom <= triggerDistance;

            if (hasBufferSpace && !loadingTriggered) {
                loadingTriggered = true;
                const nextPage = Math.floor(rowCount / itemsPerPage) + 1;

                loadNextPage(nextPage)
                    .then(() => {
                        loadingTriggered = false;
                        tick().then(() => $virtualizer.measure());
                    })
                    .catch(() => (loadingTriggered = false));
            }
        }

        if (loadPreviousPage) {
            const firstVisibleItem = virtualItems[0];
            if (firstVisibleItem && firstVisibleItem.index >= 0) {
                const pageOfFirstItem = Math.floor(firstVisibleItem.index / itemsPerPage) + 1;

                if (!lastCheckedPages.has(pageOfFirstItem)) {
                    lastCheckedPages.add(pageOfFirstItem);
                    loadingTriggered = true;

                    loadPreviousPage(pageOfFirstItem)
                        .then(() => {
                            loadingTriggered = false;
                            setTimeout(() => lastCheckedPages.delete(pageOfFirstItem), 2000);
                        })
                        .catch(() => {
                            loadingTriggered = false;
                            lastCheckedPages.delete(pageOfFirstItem);
                        });
                }
            }
        }
    };

    onMount(initColumns);

    function initColumns() {
        if (Array.isArray(columns)) {
            calculateFixedColumnsWidth(columns);
            dragManager = new DragManager(rootEl, columns);
        }
    }

    function calculateFixedColumnsWidth(cols: Column[]) {
        let width = allowSelection ? ESTIMATED_ROW_HEIGHT : 0;
        for (const col of cols) {
            if (!col.fixed) continue;
            width +=
                typeof col.width === 'number'
                    ? col.width
                    : (col.width?.min ?? ESTIMATED_ROW_HEIGHT);
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

        const min =
            col.minimumWidth ?? (typeof col.width === 'number' ? col.width : (col.width?.min ?? 0));

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
            newWidth: clamped
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
        const visibleCols = cols.filter((col) => !col.hide);
        const nonActionCols = visibleCols.filter((col) => !col.isAction);

        let gridTemplate = '';

        const scrollable: string[] = [];
        for (const column of nonActionCols) {
            if (column.resizedWidth) {
                scrollable.push(`${column.resizedWidth}px`);
            } else if (column.width) {
                if (typeof column.width === 'number') {
                    scrollable.push(`${column.width}px`);
                } else if (typeof column.width === 'object' && 'min' in column.width) {
                    scrollable.push(
                        `minmax(${column.width.min}px, ${'max' in column.width ? `${column.width.max}px` : '1fr'})`
                    );
                } else {
                    scrollable.push('1fr');
                }
            } else {
                scrollable.push('1fr');
            }
        }

        let flexibleColumnsCount = 0;
        const flexibleIndices: number[] = [];

        for (let i = 0; i < scrollable.length; i++) {
            const column = nonActionCols[i];
            const hasResizedWidth = !!column.resizedWidth;
            const hasFixedPixelWidth = typeof column.width === 'number';

            if (!hasResizedWidth && !hasFixedPixelWidth && scrollable[i].includes('1fr')) {
                flexibleColumnsCount++;
                flexibleIndices.push(i);
            }
        }

        // if multiple flexible columns,
        // constrain all but the last one
        if (flexibleColumnsCount > 1) {
            for (let i = 0; i < flexibleIndices.length - 1; i++) {
                const index = flexibleIndices[i];
                const column = nonActionCols[index];
                const minWidth =
                    column.width && typeof column.width === 'object' && 'min' in column.width
                        ? column.width.min
                        : ESTIMATED_ROW_HEIGHT;
                scrollable[index] = `${minWidth}px`;
            }
        } else if (flexibleColumnsCount === 0 && scrollable.length > 0) {
            // if no flexible columns,
            // make the last non-action column flexible
            const lastIndex = scrollable.length - 1;
            const lastColumn = nonActionCols[lastIndex];

            // only make it flexible
            // if it doesn't have a resized width
            if (!lastColumn.resizedWidth) {
                const minWidth =
                    (typeof lastColumn.width === 'number'
                        ? lastColumn.width
                        : lastColumn.minimumWidth) || ESTIMATED_ROW_HEIGHT;

                scrollable[lastIndex] = `minmax(${minWidth}px, 1fr)`;
            }
        }

        gridTemplate += scrollable.join(' ');

        const actionCol = visibleCols.find((col) => col.isAction);
        if (actionCol) {
            gridTemplate += ` ${actionCol.width}px`;
        }

        if (allowSelection) {
            gridTemplate = `${ESTIMATED_ROW_HEIGHT}px ` + gridTemplate;
        }

        return gridTemplate.trim();
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

        invalidateColumnCache();

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
                void movedElements[0].offsetWidth;
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

                            if (
                                element.dataset.header === 'true' &&
                                element.classList.contains('being-hovered')
                            ) {
                                setTimeout(() => element.classList.remove('being-hovered'), 8);
                            }
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
            dispatch(
                'columnsSwap',
                columns.map((col) => col.id)
            );
        });
    }

    function invalidateColumnCache() {
        columnCache.clear();
    }

    function clearDragOver() {
        dragOverColumn = null;
    }

    function getLastVisibleColumnBeforeActions(cols: Column[]): string | null {
        const actionColumnIndex = cols.findIndex((col) => col.isAction);

        if (actionColumnIndex <= 0) {
            return null;
        }

        for (let i = actionColumnIndex - 1; i >= 0; i--) {
            const column = cols[i];
            if (!column.hide) {
                return column.id;
            }
        }

        return null;
    }

    function registerForNavigation(el: HTMLElement, row: number, col: number) {
        if (!keyboardNavigation) return;
        if (!cellGridRegistry[row]) cellGridRegistry[row] = [];
        cellGridRegistry[row][col] = el;
    }

    function unregisterForNavigation(row: number, col: number) {
        if (!keyboardNavigation) return;
        if (cellGridRegistry[row]) delete cellGridRegistry[row][col];
    }

    function moveFocus(row: number, col: number, direction: string) {
        if (!keyboardNavigation) return;

        const visibleColumns = columns.filter((col) => !col.hide);
        if (visibleColumns.length === 0) return;

        let nextRow = row;
        let nextCol = col;

        if (direction === 'ArrowRight' || direction === 'Tab') {
            nextCol++;
            if (nextCol >= cellGridRegistry[row]?.length) {
                nextRow++;
                nextCol = 1;
            }
        } else if (direction === 'ArrowLeft' || direction === 'Shift+Tab') {
            nextCol--;
            if (nextCol <= 0) {
                nextRow--;
                if (cellGridRegistry[nextRow]) {
                    nextCol = cellGridRegistry[nextRow].length - 1;
                }
            }
        } else if (direction === 'ArrowDown') {
            nextRow++;
        } else if (direction === 'ArrowUp') {
            nextRow--;
        }

        if (
            nextRow <= 0 ||
            nextRow >= cellGridRegistry.length ||
            nextCol <= 0 ||
            !cellGridRegistry[nextRow] ||
            nextCol >= cellGridRegistry[nextRow].length
        ) {
            return;
        }

        const el = cellGridRegistry[nextRow]?.[nextCol];

        // skip hidden columns
        if (columns[nextCol]?.hide) {
            const atEnd =
                (direction === 'ArrowRight' || direction === 'Tab') &&
                nextCol >= columns.length - 1;

            const atStart =
                (direction === 'ArrowLeft' || direction === 'Shift+Tab') && nextCol <= 0;

            if (atStart || atEnd) return;

            moveFocus(nextRow, nextCol, direction);
            return;
        }

        if (el) {
            el.focus();

            tick().then(() => {
                requestAnimationFrame(() => {
                    el.scrollIntoView({
                        block: 'center',
                        inline: 'center',
                        behavior: 'smooth'
                    });
                });
            });
        }
    }

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

    function setColumnHeaderHovered(columnId: string | null) {
        currentlyHoveredColumn = columnId;
    }

    function clearNavFocusOnEscape(event: KeyboardEvent) {
        if (event.key !== 'Escape') return;

        currentlyEditingCellId = null;
        (document.activeElement as HTMLElement | null)?.blur();
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
        selectedRows,
        allowSelection,
        keyboardNavigation,
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
        lastColumnBeforeAction: getLastVisibleColumnBeforeActions(columns),
        registerForNavigation,
        unregisterForNavigation,
        moveFocus,
        setColumnHeaderHovered,
        currentlyHoveredColumnHeader: currentlyHoveredColumn
    } as RootProp;

    const virtualizer = createVirtualizer<HTMLDivElement, HTMLDivElement>({
        overscan: 5,
        estimateSize: () => ESTIMATED_ROW_HEIGHT,
        count: rowCount + emptyRowsCount + (loadingMore ? 6 : 0) /* 6 skeleton loaders */,
        getScrollElement: () => sheetContainer
    });

    $: if ($virtualizer) {
        $virtualizer.setOptions({
            /* container is more important */
            getScrollElement: () => sheetContainer,

            /* 6 skeleton loaders */
            count: rowCount + emptyRowsCount + (loadingMore ? 6 : 0)
        });
    }

    $: if (jumpToPageNumber > 0 && goToPage && $virtualizer) {
        const targetPage = jumpToPageNumber;
        const targetIndex = (targetPage - 1) * itemsPerPage;

        if (targetPage >= 1) {
            jumpToPageNumber = 0;
            const pageToLoad = targetPage;

            const waitForVirtualizerUpdate = () => {
                const currentCount = $virtualizer.options.count;

                if (currentCount <= targetIndex) {
                    setTimeout(waitForVirtualizerUpdate, 10);
                    return;
                }

                $virtualizer.measure();

                // targetOffset is far more precise!
                const targetOffset = targetIndex * $virtualizer.options.estimateSize(targetIndex);

                tick().then(() => {
                    $virtualizer.scrollToOffset(targetOffset);
                });
            };

            // not the best way but works!
            setTimeout(waitForVirtualizerUpdate, 10);
            goToPage(pageToLoad);
        } else {
            jumpToPageNumber = 0;
        }
    }

    $: if (!loadingMore && loadingTriggered) {
        loadingTriggered = false;
    }
</script>

<svelte:window on:keydown={clearNavFocusOnEscape} />

<div
    class="root"
    bind:this={rootEl}
    style:height
    style:--sheet-border-radius={resolveBorderRadius()}
>
    <div class="spreadsheet-container" bind:this={sheetContainer} on:scroll={handleScroll}>
        <div
            role="grid"
            class:reordering={!!draggingColumn}
            style:--fixed-columns-width={`${fixedColumnsWidth}px`}
            style:--grid-template-columns={createGridTemplateColumns(columns)}
        >
            {#if $$slots.header}
                <Row type="header" {root} sticky select={selection}>
                    <slot name="header" {root} />
                </Row>
            {/if}

            {#if useVirtualizer}
                <div
                    style="height: {$virtualizer.getTotalSize()}px; position: relative; grid-column: 1 / -1;"
                >
                    {#each $virtualizer.getVirtualItems() as item (item.index)}
                        {@const isEmptyRow = item.index >= rowCount}
                        {@const isLoadingRow =
                            loadingMore && item.index >= rowCount && item.index < rowCount + 6}
                        {@const loadingRoot = isLoadingRow ? { ...root, loading: true } : root}
                        {#if isEmptyRow}
                            <Row
                                root={loadingRoot}
                                virtualItem={item}
                                index={item.index}
                                id={EMPTY_ROW_ID}
                            >
                                {#each columns as col}
                                    <Cell
                                        column={col.id}
                                        root={loadingRoot}
                                        id={EMPTY_ROW_ID}
                                        isEditable={false}
                                    />
                                {/each}
                            </Row>
                        {:else}
                            <slot
                                {root}
                                {item}
                                name="rows"
                                index={item.index}
                                virtualizer={$virtualizer}
                            />
                        {/if}
                    {/each}
                </div>
            {:else}
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
            {/if}
        </div>
    </div>

    {#if $$slots.footer}
        <div class="footer">
            {#if typeof bottomActionClick !== 'undefined'}
                <div class="footer-action-divider">
                    <Tooltip
                        placement={bottomActionTooltip?.placement}
                        disabled={!bottomActionTooltip || !bottomActionTooltip.text}
                    >
                        <Button icon variant="extra-compact" on:click={bottomActionClick}>
                            <Icon icon={IconPlus} color="--fgcolor-neutral-tertiary" />
                        </Button>

                        <span slot="tooltip">
                            {bottomActionTooltip?.text}
                        </span>
                    </Tooltip>
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
            overflow: auto;
            position: relative;
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
