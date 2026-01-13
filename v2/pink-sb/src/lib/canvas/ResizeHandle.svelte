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
        document.body.style.userSelect = 'none';
        document.body.style.cursor = getCursor();
    }

    function handlePointerMove(e: PointerEvent) {
        if (!isResizing || !onResizeMove) return;
        e.preventDefault();
        onResizeMove(e);
    }

    function handlePointerUp() {
        if (!isResizing) return;
        isResizing = false;
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
        if (onResizeEnd) {
            onResizeEnd();
        }
    }

    function getCursor(): string {
        switch (position) {
            case 'nw':
            case 'se':
                return 'nwse-resize';
            case 'ne':
            case 'sw':
                return 'nesw-resize';
            case 'n':
            case 's':
                return 'ns-resize';
            case 'e':
            case 'w':
                return 'ew-resize';
            default:
                return 'default';
        }
    }

    $: cursor = getCursor();
</script>

<div
    class="resize-handle"
    class:nw={position === 'nw'}
    class:n={position === 'n'}
    class:ne={position === 'ne'}
    class:e={position === 'e'}
    class:se={position === 'se'}
    class:s={position === 's'}
    class:sw={position === 'sw'}
    class:w={position === 'w'}
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
    .nw {
        top: -4px;
        left: -4px;
    }
    .ne {
        top: -4px;
        right: -4px;
    }
    .se {
        bottom: -4px;
        right: -4px;
    }
    .sw {
        bottom: -4px;
        left: -4px;
    }

    /* Edge handles */
    .n {
        top: -4px;
        left: 50%;
        transform: translateX(-50%);
    }
    .n:hover {
        transform: translateX(-50%) scale(1.2);
    }
    .e {
        right: -4px;
        top: 50%;
        transform: translateY(-50%);
    }
    .e:hover {
        transform: translateY(-50%) scale(1.2);
    }
    .s {
        bottom: -4px;
        left: 50%;
        transform: translateX(-50%);
    }
    .s:hover {
        transform: translateX(-50%) scale(1.2);
    }
    .w {
        left: -4px;
        top: 50%;
        transform: translateY(-50%);
    }
    .w:hover {
        transform: translateY(-50%) scale(1.2);
    }
</style>

