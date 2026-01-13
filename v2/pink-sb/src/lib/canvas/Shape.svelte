<script lang="ts">
    import Object from './Object.svelte';
    import type { CanvasShapeObject } from './index.js';

    export let object: CanvasShapeObject;
    export let showResizeHandles: boolean = true;

    $: isCircle = object.shape === 'circle';
    $: borderRadius = isCircle ? '50%' : '0';
    $: fill = object.fill ?? 'var(--brand-mint-100, #e6f9fc)';
    $: stroke = object.stroke ?? 'var(--brand-mint-600, #00d9ff)';
    $: strokeWidth = object.strokeWidth ?? 2;
</script>

<Object {object} {showResizeHandles}>
    <div
        class="shape"
        class:circle={isCircle}
        style="width: 100%; height: 100%; background: {fill}; border: {strokeWidth}px solid {stroke}; border-radius: {borderRadius}; pointer-events: none;"
    ></div>
</Object>

<style>
    .shape {
        box-sizing: border-box;
    }
</style>

