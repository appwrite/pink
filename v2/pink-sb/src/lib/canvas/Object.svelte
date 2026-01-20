<script lang="ts">
    import { getCanvasContext } from './context.js';
    import { ObjectDragManager } from './drag/ObjectDragManager.js';
    import { ResizeManager } from './resize/ResizeManager.js';
    import ResizeHandle from './ResizeHandle.svelte';
    import type { CanvasObject, ResizeHandlePosition, Vec2 } from './index.js';
    import { onMount, onDestroy } from 'svelte';

    const { viewOffset, zoom, selectedObjects, selectObject, updateObject } = getCanvasContext();

    export let object: CanvasObject;
    export let showResizeHandles: boolean = true;

    let objectEl: HTMLDivElement;
    let dragManager = new ObjectDragManager();
    let resizeManager = new ResizeManager();
    let isDragging = false;
    let isResizing = false;

    $: selected = $selectedObjects.has(object.id);

    $: transform = `translate3d(${object.x}px, ${object.y}px, 0)`;
    $: style = `transform: ${transform}; width: ${object.width}px; height: ${object.height}px;`;

    function handlePointerDown(e: PointerEvent) {
        if (!objectEl) return;
        
        // Check if clicking on resize handle (handled by ResizeHandle component)
        if ((e.target as HTMLElement).closest('.resize-handle')) {
            return;
        }

        e.stopPropagation();
        
        const rect = objectEl.getBoundingClientRect();
        const startPoint: Vec2 = {
            x: e.clientX,
            y: e.clientY
        };

        // Start drag
        dragManager.startDrag(object, startPoint, $zoom);
        isDragging = true;
        objectEl.setPointerCapture(e.pointerId);
        document.body.style.userSelect = 'none';
        document.body.style.cursor = 'move';

        // Select object if not already selected
        if (!selected) {
            selectObject(object.id, e.shiftKey || e.ctrlKey || e.metaKey);
        }
    }

    function handlePointerMove(e: PointerEvent) {
        if (isDragging) {
            e.preventDefault();
            const currentPoint: Vec2 = {
                x: e.clientX,
                y: e.clientY
            };
            const newPos = dragManager.handleDrag(currentPoint, $zoom);
            if (newPos) {
                updateObject(object.id, { x: newPos.x, y: newPos.y });
            }
        }
    }

    function handlePointerUp() {
        if (isDragging) {
            dragManager.endDrag();
            isDragging = false;
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        }
    }

    function handleResizeStart(position: ResizeHandlePosition, e: PointerEvent) {
        if (!objectEl) return;
        e.stopPropagation();
        
        const rect = objectEl.getBoundingClientRect();
        const startPoint: Vec2 = {
            x: e.clientX,
            y: e.clientY
        };

        resizeManager.startResize(object, position, startPoint, $zoom);
        isResizing = true;
    }

    function handleResizeMove(e: PointerEvent) {
        if (!isResizing) return;
        e.preventDefault();
        
        const currentPoint: Vec2 = {
            x: e.clientX,
            y: e.clientY
        };
        
        const newBounds = resizeManager.handleResize(currentPoint, $zoom);
        if (newBounds) {
            updateObject(object.id, {
                x: newBounds.x,
                y: newBounds.y,
                width: newBounds.width,
                height: newBounds.height
            });
        }
    }

    function handleResizeEnd() {
        if (isResizing) {
            resizeManager.endResize();
            isResizing = false;
        }
    }

    onDestroy(() => {
        if (isDragging) {
            dragManager.cancelDrag();
        }
        if (isResizing) {
            resizeManager.cancelResize();
        }
    });
</script>

<div
    class="canvas-object"
    class:selected={selected}
    bind:this={objectEl}
    style={style}
    on:pointerdown={handlePointerDown}
    on:pointermove={handlePointerMove}
    on:pointerup={handlePointerUp}
    on:pointercancel={handlePointerUp}
    role="button"
    tabindex="0"
>
    <slot {object} {selected} />
    
    {#if selected && showResizeHandles && !object.locked}
        <ResizeHandle position="north-west" onResizeStart={handleResizeStart} onResizeMove={handleResizeMove} onResizeEnd={handleResizeEnd} />
        <ResizeHandle position="north" onResizeStart={handleResizeStart} onResizeMove={handleResizeMove} onResizeEnd={handleResizeEnd} />
        <ResizeHandle position="north-east" onResizeStart={handleResizeStart} onResizeMove={handleResizeMove} onResizeEnd={handleResizeEnd} />
        <ResizeHandle position="east" onResizeStart={handleResizeStart} onResizeMove={handleResizeMove} onResizeEnd={handleResizeEnd} />
        <ResizeHandle position="south-east" onResizeStart={handleResizeStart} onResizeMove={handleResizeMove} onResizeEnd={handleResizeEnd} />
        <ResizeHandle position="south" onResizeStart={handleResizeStart} onResizeMove={handleResizeMove} onResizeEnd={handleResizeEnd} />
        <ResizeHandle position="south-west" onResizeStart={handleResizeStart} onResizeMove={handleResizeMove} onResizeEnd={handleResizeEnd} />
        <ResizeHandle position="west" onResizeStart={handleResizeStart} onResizeMove={handleResizeMove} onResizeEnd={handleResizeEnd} />
    {/if}
</div>

<style>
    .canvas-object {
        position: absolute;
        top: 0;
        left: 0;
        cursor: move;
        touch-action: none;
        outline: none;
    }

    .canvas-object.selected {
        outline: 2px solid var(--brand-mint-600, #00d9ff);
        outline-offset: -2px;
    }

    .canvas-object:focus-visible {
        outline: 2px solid var(--brand-mint-600, #00d9ff);
        outline-offset: -2px;
    }
</style>

