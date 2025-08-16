<script lang="ts">
    import Cell from './Cell.svelte';
    import Icon from '$lib/Icon.svelte';
    import Row from './row/Base.svelte';
    import { Button } from '$lib/button/index.js';
    import { DragManager } from './drag/manager.js';
    import { IconPlus } from '@appwrite.io/pink-icons-svelte';
    import { tick, onMount, createEventDispatcher } from 'svelte';
    import { createVirtualizer } from '@tanstack/svelte-virtual';
    import { EMPTY_ROW_ID, ESTIMATED_ROW_HEIGHT, type Column, type RootProp } from './index.js';

    export let loading = false;
    export let columns: Array<Column>;
    export let height: string = '100vh';
    export let allowSelection = false;
    export let keyboardNavigation = false;
    export let selectedRows: string[] = [];
    export let emptyCells: false | number = false;
    export let selection: true | 'hidden' | 'disabled' = true;
    export let borderRadius: 'xs' | 's' | 'm' | undefined = undefined;
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
    export let paginationBufferSpace: number = ESTIMATED_ROW_HEIGHT;

    let lastVisibleIndex = 0;
    let loadingTriggered = false;
    let lastCheckedPages = new Set<number>();
    let debounceTimer: ReturnType<typeof setTimeout> | null = null;

    let rootEl: HTMLDivElement;
    let sheetContainer: HTMLDivElement;

    let fixedColumnsWidth = 0;
    let availableIds = new Set<string>();
    let draggingColumn: string | null = null;
    let dragOverColumn: string | null = null;

    let currentlyEditingCellId: string | null = null;
    let cellGridRegistry: (HTMLElement | undefined)[][] = [];

    let dragManager: DragManager;
    const dispatch = createEventDispatcher();
    const columnCache = new Map<string, number>();

    $: if (columns) {
        // needs to be initialized
        // for the most recent updated columns!
        dragManager = new DragManager(rootEl, columns);
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

        if (!virtualizer || loadingTriggered || loadingMore) return;
        if (!loadPreviousPage && !loadNextPage) return;

        const virtualItems = $virtualizer.getVirtualItems();
        if (virtualItems.length === 0) return;

        // next page loading
        if (loadNextPage) {
            let lastLoadedIndex = -1;
            for (const item of virtualItems) {
                const pageNum = Math.floor(item.index / itemsPerPage) + 1;
                if (pageNum <= Math.ceil(rowCount / itemsPerPage)) {
                    lastLoadedIndex = item.index;
                }
            }

            const triggerIndex = rowCount - nextPageTriggerOffset;

            if (lastLoadedIndex >= triggerIndex) {
                const currentPage = Math.floor(lastLoadedIndex / itemsPerPage) + 1;
                const pageEndIndex = currentPage * itemsPerPage - 1;

                if (lastLoadedIndex >= pageEndIndex - 2) {
                    const lastDataItem = virtualItems.find(
                        (item) => item.index === lastLoadedIndex
                    );

                    if (lastDataItem) {
                        const containerHeight = sheetContainer.clientHeight;
                        const scrollTop = sheetContainer.scrollTop;
                        const itemBottom = lastDataItem.start + lastDataItem.size;
                        const visibleBottom = scrollTop + containerHeight;
                        const bufferSpace = visibleBottom - itemBottom;

                        if (
                            bufferSpace >= paginationBufferSpace &&
                            lastVisibleIndex !== lastLoadedIndex
                        ) {
                            loadingTriggered = true;
                            lastVisibleIndex = lastLoadedIndex;

                            const nextPage = currentPage + 1;
                            loadNextPage(nextPage).then((shouldContinue) => {
                                if (!shouldContinue) {
                                    loadingTriggered = false;
                                }
                            });
                        }
                    }
                }
            }
        }

        if (loadPreviousPage) {
            // previous page with debounce
            if (debounceTimer) clearTimeout(debounceTimer);

            debounceTimer = setTimeout(() => {
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
            }, 500);
        }
    };

    onMount(() => {
        if (Array.isArray(columns)) {
            calculateFixedColumnsWidth(columns);
            dragManager = new DragManager(rootEl, columns);
        }

        return detachAndCleanupPagination;
    });

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

        if (nonActionCols.length === 1) {
            const minWidth =
                (typeof nonActionCols[0].width === 'number'
                    ? nonActionCols[0].width
                    : nonActionCols[0].minimumWidth) || ESTIMATED_ROW_HEIGHT;
            gridTemplate += `minmax(${minWidth}px, 1fr)`;
        } else {
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
            gridTemplate += scrollable.join(' ');
        }

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

        if (direction === 'ArrowRight') col++;
        if (direction === 'ArrowLeft') col--;
        if (direction === 'ArrowDown') row++;
        if (direction === 'ArrowUp') row--;

        if (
            row <= 0 ||
            row >= cellGridRegistry.length ||
            col <= 0 ||
            !cellGridRegistry[row] ||
            col >= cellGridRegistry[row].length
        )
            return;

        const el = cellGridRegistry[row][col];
        if (el) {
            el.focus();

            requestAnimationFrame(() => {
                el.scrollIntoView({
                    block: 'center',
                    inline: 'center',
                    behavior: 'smooth'
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

    function detachAndCleanupPagination() {
        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }
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
        moveFocus
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

        if (targetPage >= 1 && targetPage <= 10) {
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
                                        root={loadingRoot}
                                        column={col.id}
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
