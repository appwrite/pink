<script lang="ts">
    import type { ResizeHandlePosition } from './index.js';

    export let position: ResizeHandlePosition;
    export let onResizeStart: ((position: ResizeHandlePosition, event: PointerEvent) => void) | undefined = undefined;
    export let onResizeMove: ((event: PointerEvent) => void) | undefined = undefined;
    export let onResizeEnd: (() => void) | undefined = undefined;

    let handleEl: HTMLDivElement;
    let isResizing = false;

    function handlePointerDown(e: PointerEvent) {
        if (!handleEl || !onResizeStart) return;
        e.stopPropagation();
        isResizing = true;
        onResizeStart(position, e);
        handleEl.setPointerCapture(e.pointerId);
        if (handleEl.parentElement) {
            handleEl.parentElement.style.userSelect = 'none';
            handleEl.parentElement.style.cursor = getCursor();
        }
    }

    function handlePointerMove(e: PointerEvent) {
        if (!isResizing || !onResizeMove) return;
        e.preventDefault();
        onResizeMove(e);
    }

    function handlePointerUp() {
        if (!isResizing) return;
        isResizing = false;
        if (handleEl?.parentElement) {
            handleEl.parentElement.style.cursor = '';
            handleEl.parentElement.style.userSelect = '';
        }
        if (onResizeEnd) {
            onResizeEnd();
        }
    }

    function getCursor(): string {
        switch (position) {
            case 'north-west':
            case 'south-east':
                return 'nwse-resize';
            case 'north-east':
            case 'south-west':
                return 'nesw-resize';
            case 'north':
            case 'south':
                return 'ns-resize';
            case 'east':
            case 'west':
                return 'ew-resize';
            default:
                return 'default';
        }
    }

    $: cursor = getCursor();
</script>

<div
    class="resize-handle"
    class:north-west={position === 'north-west'}
    class:north={position === 'north'}
    class:north-east={position === 'north-east'}
    class:east={position === 'east'}
    class:south-east={position === 'south-east'}
    class:south={position === 'south'}
    class:south-west={position === 'south-west'}
    class:west={position === 'west'}
    bind:this={handleEl}
    style="cursor: {cursor};"
    on:pointerdown={handlePointerDown}
    on:pointermove={handlePointerMove}
    on:pointerup={handlePointerUp}
    on:pointercancel={handlePointerUp}
    role="button"
    tabindex="-1"
></div>

<style>
    .resize-handle {
        position: absolute;
        width: 8px;
        height: 8px;
        background: var(--brand-mint-600, #00d9ff);
        border: 1px solid var(--bgcolor-neutral-primary, #ffffff);
        border-radius: 2px;
        touch-action: none;
        z-index: 10;
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
    }

    .resize-handle:hover {
        background: var(--brand-mint-700, #00c4e6);
        transform: scale(1.2);
    }

    /* Corner handles */
    .north-west {
        top: -4px;
        left: -4px;
    }
    .north-east {
        top: -4px;
        right: -4px;
    }
    .south-east {
        bottom: -4px;
        right: -4px;
    }
    .south-west {
        bottom: -4px;
        left: -4px;
    }

    /* Edge handles */
    .north {
        top: -4px;
        left: 50%;
        transform: translateX(-50%);
    }
    .north:hover {
        transform: translateX(-50%) scale(1.2);
    }
    .east {
        right: -4px;
        top: 50%;
        transform: translateY(-50%);
    }
    .east:hover {
        transform: translateY(-50%) scale(1.2);
    }
    .south {
        bottom: -4px;
        left: 50%;
        transform: translateX(-50%);
    }
    .south:hover {
        transform: translateX(-50%) scale(1.2);
    }
    .west {
        left: -4px;
        top: 50%;
        transform: translateY(-50%);
    }
    .west:hover {
        transform: translateY(-50%) scale(1.2);
    }
</style>

