<script lang="ts">
    import Icon from '$lib/Icon.svelte';
    import { Input } from '$lib/index.js';
    import type { Alignment, RootProp } from './index.js';
    import { clickOutside } from '$lib/helpers/helpers.js';
    import { createEventDispatcher, type ComponentType } from 'svelte';

    export let root: RootProp;
    export let value: string | undefined = undefined;
    export let column: string | undefined = undefined;
    export let alignment: Alignment = 'middle-middle';
    export let icon: ComponentType | undefined = undefined;

    let startX = 0;
    let startWidth = 0;
    let resizing = false;
    let cellEl: HTMLElement;
    let resizerEl: HTMLElement;

    let isEditing = false;
    let wasDraggable = false;
    let originalValue = value;
    const dispatch = createEventDispatcher();

    $: isVerticalStart = alignment.startsWith('start');
    $: isVerticalEnd = alignment.startsWith('end');
    $: isHorizontalStart = alignment.endsWith('start');
    $: isHorizontalEnd = alignment.endsWith('end');
    $: options = typeof column !== 'undefined' ? root.columns?.[column] : undefined;
    $: resizable = options?.resizable ?? true;

    $: isEditing = root.currentlyEditing === cellEl;
    $: isSelect = root.allowSelection && column?.includes('__select_');

    function handleKeydown(e: KeyboardEvent) {
        if (e.key === 'Escape') {
            value = originalValue;
            isEditing = false;
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
        startWidth = cellEl.offsetWidth;

        const ghost = root.dragGhostBorder;
        const bounds = ghost.parentElement?.getBoundingClientRect();
        if (ghost && bounds) {
            ghost.style.left = `${startX}px`;
            ghost.style.top = `${bounds.top}px`;
            ghost.style.height = `${bounds.height}px`;
            ghost.style.display = 'block';
        }

        document.body.style.userSelect = 'none';
        document.body.style.cursor = 'col-resize';
        resizerEl.setPointerCapture(e.pointerId);
    }

    function handlePointerMove(e: PointerEvent) {
        if (!resizing) return;
        root.dragGhostBorder.style.left = `${e.clientX}px`;
    }

    function handlePointerUp(e: PointerEvent) {
        if (!resizing || typeof column !== 'string') return;
        resizing = false;
        document.body.style.userSelect = '';
        document.body.style.cursor = '';
        root.dragGhostBorder.style.display = 'none';

        const deltaX = e.clientX - startX;
        const newWidth = Math.max(40, startWidth + deltaX);
        root.updateCells(column, newWidth);

        if (wasDraggable) cellEl.draggable = true;
    }
</script>

{#if !options || options?.hide !== true}
    <div
        role="cell"
        tabindex="-1"
        bind:this={cellEl}
        data-column={column}
        draggable={!!options?.draggable}
        class:space-between={!!icon}
        class:vertical-start={isVerticalStart}
        class:vertical-end={isVerticalEnd}
        class:horizontal-start={isHorizontalStart}
        class:horizontal-end={isHorizontalEnd}
        class:dragging-column={root.draggingColumn === column}
        use:clickOutside={() => {
            if (root.currentlyEditing === cellEl) root.setEditing(null);
        }}
        on:dblclick={() => {
            originalValue = value;
            root.setEditing(cellEl);
        }}
        on:dragstart={(e) => root.startDrag(column, e)}
        on:dragover={(e) => root.overDrag(column, e)}
        on:drop={root.endDrag}
    >
        {#if value}
            {#if isEditing}
                <Input.Textarea bind:value on:keydown={handleKeydown} on:blur={commitChange} />
            {:else}
                {value}
            {/if}
        {:else}
            <slot />
        {/if}

        {#if !isSelect}
            {#if icon}
                <Icon {icon} color="--fgcolor-neutral-weak" />
            {/if}
            <div
                role="presentation"
                aria-label="Resize column"
                bind:this={resizerEl}
                class:column-resizer={resizable}
                on:pointerdown={handlePointerDown}
                on:pointermove={handlePointerMove}
                on:pointerup={handlePointerUp}
            />
        {/if}
    </div>
{/if}

<style lang="scss">
    [role='cell'] {
        position: relative;
        display: flex;
        align-items: center;
        padding-inline: var(--space-6);
        min-height: 40px;
        border-bottom: var(--border-width-s) solid var(--border-neutral);
        overflow: hidden;
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
            width: 1px;
            height: 100%;
            cursor: col-resize;
            z-index: 1;
            background: transparent;
            touch-action: none;
            border-left: var(--border-width-s) solid var(--border-neutral);
        }
        &[draggable='true'] {
            cursor: grab;
        }
        &.dragging-column {
            cursor: grabbing;
            background-color: rgba(237, 237, 240, 5%);
        }
    }
</style>
