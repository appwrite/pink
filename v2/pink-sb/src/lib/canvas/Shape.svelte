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
        class:circle={isCircle}
        style:box-sizing="border-box"
        style:width="100%"
        style:height="100%"
        style:background={fill}
        style:border="{strokeWidth}px solid {stroke}"
        style:border-radius={borderRadius}
        style:pointer-events="none"
    ></div>
</Object>
