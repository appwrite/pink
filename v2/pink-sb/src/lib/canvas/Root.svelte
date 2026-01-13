<script lang="ts">
    import Grid from './Grid.svelte';
    import { setCanvasContext } from './context.js';
    import { tweened } from 'svelte/motion';
    import { writable } from 'svelte/store';
    import { cubicOut } from 'svelte/easing';
    import type { CanvasSettings, CanvasObjectUnion, Vec2, Vec4, CanvasRootProps } from './index.js';
    import { onMount, onDestroy } from 'svelte';

    export let width: string = '100%';
    export let height: string = '100vh';
    export let settings: Partial<CanvasSettings> = {};
    export let objects: CanvasObjectUnion[] = [];
    export let showGrid: boolean = true;

    let canvasEl: HTMLDivElement;
    let isPanning = false;
    let panStart: Vec2 = { x: 0, y: 0 };
    let panStartOffset: Vec2 = { x: 0, y: 0 };

    // Default settings
    const defaultSettings: CanvasSettings = {
        canPan: true,
        panDirection: 'xy',
        canZoom: true,
        canSelect: true,
        snapToGrid: false,
        gridSize: 20,
        bounds: {
            minX: -Infinity,
            maxX: Infinity,
            minY: -Infinity,
            maxY: Infinity,
            minZoom: 0.1,
            maxZoom: 3,
            limit: 'soft'
        },
        grid: {
            dotSize: 1,
            dotColor: 'black',
            dotOpacity: 30
        }
    };

    const finalSettings = writable<CanvasSettings>({ ...defaultSettings, ...settings });
    const viewOffset = tweened<Vec2>({ x: 0, y: 0 }, { duration: 0 });
    const zoom = tweened<number>(1, { duration: 0 });
    const viewPort = writable<Vec4>({ x: 0, y: 0, w: 0, h: 0 });
    const selectedObjects = writable<Set<string>>(new Set());
    const objectsStore = writable<CanvasObjectUnion[]>(objects);

    // Update objects store when prop changes
    $: {
        objectsStore.set(objects);
    }

    function panTo(x: number, y: number, opts?: { delay?: number; duration?: number; hard?: boolean }) {
        const current = $viewOffset;
        const newOffset = {
            x: opts?.hard ? x : current.x + x,
            y: opts?.hard ? y : current.y + y
        };
        viewOffset.set(newOffset, {
            duration: opts?.duration ?? 300,
            delay: opts?.delay ?? 0,
            easing: cubicOut
        });
    }

    async function zoomTo(newZoom: number, opts?: { delay?: number; duration?: number }) {
        const bounds = $finalSettings.bounds;
        const clampedZoom = Math.max(bounds.minZoom, Math.min(bounds.maxZoom, newZoom));
        await zoom.set(clampedZoom, {
            duration: opts?.duration ?? 300,
            delay: opts?.delay ?? 0,
            easing: cubicOut
        });
    }

    function selectObject(id: string, multi: boolean = false) {
        if (!$finalSettings.canSelect) return;
        
        selectedObjects.update((selected) => {
            const newSelected = multi ? new Set(selected) : new Set<string>();
            if (newSelected.has(id)) {
                newSelected.delete(id);
            } else {
                newSelected.add(id);
            }
            return newSelected;
        });
    }

    function deselectObject(id: string) {
        selectedObjects.update((selected) => {
            const newSelected = new Set(selected);
            newSelected.delete(id);
            return newSelected;
        });
    }

    function deselectAll() {
        selectedObjects.set(new Set());
    }

    function updateObject(id: string, updates: Partial<CanvasObjectUnion>) {
        objectsStore.update((objs) => {
            const updated = objs.map((obj) => {
                if (obj.id === id) {
                    // Preserve the type property to maintain discriminated union
                    const updatedObj = { ...obj, ...updates };
                    return updatedObj as CanvasObjectUnion;
                }
                return obj;
            });
            // Update parent objects prop if bound
            objects = updated;
            return updated;
        });
    }

    function deleteObject(id: string) {
        objectsStore.update((objs) => {
            const filtered = objs.filter((obj) => obj.id !== id);
            // Update parent objects prop if bound
            objects = filtered;
            return filtered;
        });
        deselectObject(id);
    }

    function handleWheel(e: WheelEvent) {
        if (!$finalSettings.canZoom) return;
        
        e.preventDefault();
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        const currentZoom = $zoom;
        const newZoom = currentZoom * delta;
        zoomTo(newZoom, { duration: 100 });
    }

    function handlePointerDown(e: PointerEvent) {
        if (!canvasEl || !$finalSettings.canPan) return;
        if ((e.target as HTMLElement).closest('.canvas-object')) return;
        
        isPanning = true;
        panStart = { x: e.clientX, y: e.clientY };
        panStartOffset = { ...$viewOffset };
        canvasEl.setPointerCapture(e.pointerId);
        document.body.style.cursor = 'grabbing';
        document.body.style.userSelect = 'none';
        
        // Deselect all if clicking on canvas
        if ($finalSettings.canSelect) {
            deselectAll();
        }
    }

    function handlePointerMove(e: PointerEvent) {
        if (!isPanning) return;
        
        e.preventDefault();
        const deltaX = e.clientX - panStart.x;
        const deltaY = e.clientY - panStart.y;
        
        const panDir = $finalSettings.panDirection;
        const newOffset: Vec2 = {
            x: panDir === 'y' ? panStartOffset.x : panStartOffset.x + deltaX / $zoom,
            y: panDir === 'x' ? panStartOffset.y : panStartOffset.y + deltaY / $zoom
        };
        
        // Apply bounds
        const bounds = $finalSettings.bounds;
        if (bounds.limit === 'hard') {
            newOffset.x = Math.max(bounds.minX, Math.min(bounds.maxX, newOffset.x));
            newOffset.y = Math.max(bounds.minY, Math.min(bounds.maxY, newOffset.y));
        }
        
        viewOffset.set(newOffset, { duration: 0 });
    }

    function handlePointerUp() {
        if (isPanning) {
            isPanning = false;
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        }
    }

    function updateViewport() {
        if (!canvasEl) return;
        const rect = canvasEl.getBoundingClientRect();
        viewPort.set({
            x: 0,
            y: 0,
            w: rect.width,
            h: rect.height
        });
    }

    onMount(() => {
        updateViewport();
        window.addEventListener('resize', updateViewport);
    });

    onDestroy(() => {
        window.removeEventListener('resize', updateViewport);
    });

    // Update settings when prop changes
    $: finalSettings.set({ ...defaultSettings, ...settings });

    // Create context props
    const rootProps: CanvasRootProps = {
        viewOffset,
        viewPort,
        zoom,
        settings: finalSettings,
        selectedObjects,
        objects: objectsStore,
        panTo,
        zoomTo,
        selectObject,
        deselectObject,
        deselectAll,
        updateObject,
        deleteObject
    };

    setCanvasContext(rootProps);

    // Expose API for parent components
    export { panTo, zoomTo, zoom, viewOffset, selectedObjects, updateObject, deleteObject, selectObject, deselectObject, deselectAll };

    $: transform = `translate3d(${$viewOffset.x * $zoom}px, ${$viewOffset.y * $zoom}px, 0) scale(${$zoom})`;
    $: transformStyle = `transform: ${transform};`;
</script>

<div
    class="canvas-root"
    bind:this={canvasEl}
    style="width: {width}; height: {height};"
    on:wheel={handleWheel}
    on:pointerdown={handlePointerDown}
    on:pointermove={handlePointerMove}
    on:pointerup={handlePointerUp}
    on:pointercancel={handlePointerUp}
    role="application"
    tabindex="0"
>
    <div class="canvas-viewport" style={transformStyle}>
        {#if showGrid}
            <Grid />
        {/if}
        <slot {objects} />
    </div>
</div>

<style>
    .canvas-root {
        position: relative;
        overflow: hidden;
        background: var(--bgcolor-neutral-primary, #ffffff);
        cursor: grab;
        touch-action: none;
    }

    .canvas-root:active {
        cursor: grabbing;
    }

    .canvas-viewport {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        will-change: transform;
        transform-origin: 0 0;
    }
</style>

