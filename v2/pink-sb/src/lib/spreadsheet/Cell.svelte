<script lang="ts">
    import Icon from '$lib/Icon.svelte';
    import Skeleton from '$lib/Skeleton.svelte';
    import Textarea from '$lib/input/Textarea.svelte';
    import { clickOutside } from '$lib/helpers/helpers.js';
    import { type Alignment, EMPTY_ROW_ID, type RootProp } from './index.js';
    import {
        onMount,
        onDestroy,
        hasContext,
        getContext,
        createEventDispatcher,
        type ComponentType
    } from 'svelte';

    export let root: RootProp;
    export let value: string | undefined = undefined;
    export let column: string | undefined = undefined;
    export let alignment: Alignment = 'middle-middle';
    export let icon: ComponentType | undefined = undefined;
    export let id = `${column}-${Math.random().toString(36).substring(2, 9)}`;

    export let isHeader = false;
    export let isEditable = true;

    let width = 0;
    let startX = 0;
    let resizing = false;
    let cellEl: HTMLElement;
    let resizerEl: HTMLElement;

    let isEditing = false;
    let wasDraggable = false;
    let originalValue = value;
    const dispatch = createEventDispatcher();

    $: isLoading = root.loading;
    $: isVerticalStart = alignment.startsWith('start');
    $: isVerticalEnd = alignment.startsWith('end');
    $: isHorizontalStart = alignment.endsWith('start');
    $: isHorizontalEnd = alignment.endsWith('end');
    $: endsBeforeFixedRight = column === root.lastColumnBeforeAction;
    $: options = typeof column !== 'undefined' ? root.columns?.[column] : undefined;
    $: resizable = (options?.resizable ?? true) && column !== root.lastResizableColumnId;

    $: hasKeyboardNavigation = root.keyboardNavigation ?? false;
    $: columnIndex = Array.isArray(root.columns)
        ? root.columns.findIndex((col) => col.id === column)
        : Object.values(root.columns).findIndex((col) => col.id === column);

    $: isAction = options?.isAction ?? false;
    $: isEditing = root.currentlyEditingCellId === id;
    $: isSelect = (root.allowSelection && column?.includes('__select_')) || false;
    $: isFixed = isSelect || isAction || options?.fixed;
    $: isDraggedOver = root.dragOverColumn === column;
    $: isDragging = root.draggingColumn === column;
    $: isEmptyCell = id?.includes(EMPTY_ROW_ID) || false;
    $: columnWidth =
        typeof options?.width === 'number'
            ? options?.width
            : typeof options?.width === 'object'
              ? options?.width.min
              : 100;

    function handleKeydown(e: KeyboardEvent) {
        if (e.key === 'Escape') {
            value = originalValue;
            root.setEditing(null);
        } else if (e.key === 'Enter' && !e.shiftKey) {
            commitChange();
        }
    }

    function commitChange() {
        if (value !== originalValue) {
            dispatch('change', { value });
            originalValue = value;
        }
        root.setEditing(null);
    }

    function handlePointerDown(e: PointerEvent) {
        if (!cellEl || typeof column !== 'string') return;

        wasDraggable = cellEl.draggable;
        cellEl.draggable = false;

        resizing = true;
        startX = e.clientX;
        width = cellEl.offsetWidth;

        document.body.style.userSelect = 'none';
        resizerEl.setPointerCapture(e.pointerId);
    }

    function handlePointerMove(e: PointerEvent) {
        if (!resizing || typeof column !== 'string') return;
        const deltaX = e.clientX - startX;
        const newWidth = Math.max(40, width + deltaX);
        root.updateCells(column, newWidth);
    }

    function handlePointerUp() {
        if (!resizing) return;
        resizing = false;
        document.body.style.cursor = '';
        document.body.style.userSelect = '';

        if (wasDraggable) cellEl.draggable = true;
    }

    function handleContextMenu(event: MouseEvent) {
        event.preventDefault();
        dispatch('contextmenu', { event, id: isEditable ? id : undefined });
    }

    let rowIndex: number = -1;

    $: if (hasKeyboardNavigation && hasContext('row') && typeof cellEl !== 'undefined') {
        rowIndex = getContext<number>('row');
        root.registerForNavigation(cellEl, rowIndex, columnIndex);
    }

    onDestroy(() => {
        if (rowIndex > -1) {
            root.unregisterForNavigation(rowIndex, columnIndex);
        }
    });

    function handleCellKeydown(e: KeyboardEvent) {
        if (!hasKeyboardNavigation) return;

        if (isEditing) {
            if (e.key === 'Escape') {
                value = originalValue;
                root.setEditing(null);
            } else if (e.key === 'Enter' && !e.shiftKey) {
                commitChange();
            }
            return;
        }

        switch (e.key) {
            case 'ArrowRight':
            case 'ArrowLeft':
            case 'ArrowUp':
            case 'ArrowDown':
                e.preventDefault();
                root.moveFocus(rowIndex, columnIndex, e.key);
                break;

            case 'Enter':
                if (isEditable && !isEditing) {
                    originalValue = value;
                    root.setEditing(id);
                }
                break;
        }
    }
</script>

{#if !options || options?.hide !== true}
    <div
        {id}
        role="cell"
        tabindex={isEditing ? -1 : 0}
        bind:this={cellEl}
        data-fixed={isFixed}
        data-select={isSelect}
        data-action={isAction}
        data-header={isHeader}
        data-loading={isLoading}
        data-column-id={column}
        data-editing-mode={isEditing}
        draggable={!!options?.draggable && isHeader}
        class:space-between={!!icon}
        class:resizing-column={resizing}
        class:vertical-end={isVerticalEnd}
        class:vertical-start={isVerticalStart}
        class:horizontal-end={isHorizontalEnd}
        class:horizontal-start={isHorizontalStart}
        class:no-end-border={endsBeforeFixedRight}
        class:dragging-column={isDragging}
        class:drag-over={isDraggedOver && !isDragging}
        style:left={isSelect ? '0' : undefined}
        style:right={isAction ? '0' : undefined}
        on:contextmenu={isEmptyCell ? undefined : handleContextMenu}
        use:clickOutside={() => {
            if (isEditing) root.setEditing(null);
        }}
        on:dblclick={() => {
            if (!isEditable || isEmptyCell) return;
            originalValue = value;
            root.setEditing(id);
        }}
        on:dragstart={(e) => root.startDrag(column, e)}
        on:dragover={(e) => root.overDrag(column, e)}
        on:dragleave={() => {
            // Clear drag over when leaving the element
            root.clearDragOver();
        }}
        on:drop={root.endDrag}
        on:keydown={handleCellKeydown}
    >
        {#if isLoading && !isHeader}
            {@const variant = isSelect || isAction ? 'square' : 'line'}
            <!-- design spec @ 12px -->
            <Skeleton height={12} width={columnWidth} {variant} />
        {:else if value && !isAction}
            {value}
        {:else}
            <slot />
        {/if}

        {#if !isEmptyCell && !isAction && !isHeader && isEditing}
            <div class="floating-editor">
                <slot name="cell-editor">
                    <Textarea
                        bind:value
                        on:keydown={handleKeydown}
                        on:blur={commitChange}
                        rows={5}
                    />
                </slot>
            </div>
        {/if}

        {#if !isSelect}
            {#if icon}
                <Icon {icon} color="--fgcolor-neutral-weak" size="s" />
            {/if}

            {#if resizable}
                <div
                    role="presentation"
                    class="column-resizer"
                    aria-label="Resize column"
                    bind:this={resizerEl}
                    on:pointerup={handlePointerUp}
                    on:pointerdown={handlePointerDown}
                    on:pointermove={handlePointerMove}
                    style:display={endsBeforeFixedRight ? 'none' : undefined}
                />
            {:else}
                <div
                    role="presentation"
                    class="column-resizer-disabled"
                    style:display={endsBeforeFixedRight ? 'none' : undefined}
                />
            {/if}
        {/if}
    </div>
{/if}

<style lang="scss">
    [role='cell'] {
        min-height: 40px;
        position: relative;
        align-items: center;
        font-size: var(--font-size-s);
        padding: var(--space-4) var(--space-6);
        background: var(--bgcolor-neutral-primary);
        border-bottom: var(--border-width-s) solid var(--border-neutral);

        &:not([data-header='true']):focus {
            z-index: 10;
            border: none;
            border-radius: 8px;
            outline-offset: 0.75px;
            outline: var(--border-width-s) solid var(--border-focus);

            & > .column-resizer {
                display: none;
            }

            &[data-editing-mode='true']:focus {
                outline: none;
            }
        }

        &[data-editing-mode='true'] {
            overflow: visible !important;
        }

        &.no-end-border {
            border-right: none;
        }

        .floating-editor {
            top: -2px;
            left: -2px;
            right: auto;
            bottom: auto;
            z-index: 100;
            display: flex;
            min-width: 100%;
            position: absolute;
            max-height: 8.625rem; /* nearly 3 rows height */
            align-items: stretch;
            background: var(--bgcolor-neutral-primary);
            // border-inline: var(--border-width-s) solid var(--border-neutral);

            @media (max-width: 768px) {
                max-height: 7.875rem; /* nearly 3 rows height */
            }
        }

        &[data-header='false'] {
            height: 40px;
            /* if using a `Tooltip` or `Popover` in a cell, use `portal` on it! */
            overflow: hidden;
            white-space: nowrap;
            align-content: center;
            text-overflow: ellipsis;

            &[data-action="true"] {
              overflow: unset;
              text-overflow: unset;
            }

            &[data-loading='true'] {
                display: inline-flex;
            }
        }

        &[data-header='true'] {
            display: flex;
            background: var(--bgcolor-neutral-default);

            &.drag-over {
                border-top: var(--border-width-s) solid var(--brand-mint-600);
            }
        }

        &[data-fixed='true'] {
            z-index: 2;
            position: sticky;

            &:focus {
                z-index: 10;
            }

            &[data-select='true'] {
                left: 0;
                border-right: var(--border-width-s) solid var(--border-neutral);
            }

            &[data-action='true'] {
                right: 0;
                display: inline-flex;
                justify-content: center;
                border-left: var(--border-width-s) solid var(--border-neutral);
            }
        }

        &.space-between {
            justify-content: space-between;
        }

        &.horizontal-start {
            justify-content: flex-start;
        }
        &.horizontal-end {
            justify-content: flex-end;
        }
        &.vertical-start {
            align-items: flex-start;
        }
        &.vertical-end {
            align-items: flex-end;
        }

        & > .column-resizer {
            position: absolute;
            top: 0;
            right: 0;
            width: 2px;
            height: 100%;
            cursor: col-resize;
            touch-action: none;
            background: transparent;
            border-left: var(--border-width-s) solid var(--border-neutral);

            &::after {
                content: '';
                position: absolute;
                top: 50%;
                right: 0.5px;
                width: 2px;
                height: 32px;
                background: var(--brand-mint-600);
                border-radius: 4px;
                opacity: 0;
                transition: opacity 0.2s ease;
                transform: translateY(-50%);
            }
        }

        & > .column-resizer-disabled {
            position: absolute;
            right: 0;
            width: 2px;
            height: 100%;
            border-left: var(--border-width-s) solid var(--border-neutral);
        }

        &:has(.column-resizer),
        &:has(.column-resizer-disabled) {
          &[data-action="true"] [role='presentation'] {
            border-left: unset;
          }
        }

        &.resizing-column {
            background: var(--overlay-neutral-hover);

            // fill an excess gap
            &::before {
                content: '';
                position: absolute;
                top: 0;
                left: -1px;
                width: 1px;
                height: 100%;
                background: var(--overlay-neutral-hover);
                z-index: 1;
            }

            & > .column-resizer::after {
                opacity: 1;
            }
        }

        &[draggable='true'] {
            cursor: grab;

            &:active {
                cursor: grabbing;
            }
        }

        &.dragging-column {
            right: 1.5px;
            opacity: 0.7;
            transition: all 0.2s ease-out;
            background: var(--overlay-neutral-pressed);
        }

        &.drag-over {
            right: 1.5px;
            position: relative;
            background: rgba(0, 191, 165, 0.05);

            &::before,
            &::after {
                content: '';
                position: absolute;
                top: -1px;
                bottom: -1px;
                width: 1px;
                background: var(--brand-mint-600);
                pointer-events: none;
                box-shadow: 0 0 6px rgba(0, 191, 165, 0.3);
            }

            &::before {
                left: 0;
                z-index: 1002;
            }

            &::after {
                right: 0;
                z-index: 1002;
            }
        }
    }
</style>
