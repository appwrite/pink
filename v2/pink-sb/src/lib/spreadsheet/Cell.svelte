<script lang="ts">
    import Icon from '$lib/Icon.svelte';
    import Skeleton from '$lib/Skeleton.svelte';
    import Textarea from '$lib/input/Textarea.svelte';
    import { clickOutside } from '$lib/helpers/helpers.js';
    import { createEventDispatcher, type ComponentType } from 'svelte';
    import { type Alignment, EMPTY_ROW_ID, type RootProp } from './index.js';

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
</script>

{#if !options || options?.hide !== true}
    <div
        role="cell"
        tabindex="-1"
        bind:this={cellEl}
        data-fixed={isFixed}
        data-select={isSelect}
        data-action={isAction}
        data-header={isHeader}
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
    >
        {#if isLoading && !isHeader}
            {@const variant = isSelect || isAction ? 'square' : 'line'}
            <Skeleton height={22} width={columnWidth} {variant} />
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
                        rows={3}
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
            {/if}
        {/if}
    </div>
{/if}

<style lang="scss">
    [role='cell'] {
        display: flex;
        position: relative;
        align-items: center;
        font-size: var(--font-size-s);
        background: var(--bgcolor-neutral-primary);
        padding: var(--space-4, 8px) var(--space-6, 12px);
        border-bottom: var(--border-width-s) solid var(--border-neutral);

        &[data-editing-mode='true'] {
            overflow: visible;
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
            max-height: 5.75rem; /* nearly 2 rows height */
            align-items: stretch;
            background: var(--bgcolor-neutral-primary);
            border-inline: var(--border-width-s) solid var(--border-neutral);

            @media (max-width: 768px) {
              max-height: 5.25rem; /* nearly 2 rows height */
            }
        }

        &[data-header='true'] {
            background: var(--bgcolor-neutral-default);
        }

        &[data-fixed='true'] {
            z-index: 2;
            position: sticky;

            &[data-select='true'] {
                left: 0;
                border-right: var(--border-width-s) solid var(--border-neutral);
            }

            &[data-action='true'] {
                right: 0;
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
                right: 1px;
                width: 1px;
                height: 32px;
                background: var(--brand-mint-600);
                border-radius: 4px;
                opacity: 0;
                transition: opacity 0.2s ease;
                transform: translateY(-50%);
            }
        }

        &.resizing-column > .column-resizer::after {
            opacity: 1;
        }

        &[draggable='true'] {
            cursor: grab;

            &:active {
                cursor: grabbing;
            }
        }

        &.dragging-column {
            opacity: 0.7;
            transition: all 0.2s ease-out;
            background: var(--overlay-neutral-pressed);
        }

        &.drag-over {
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
