<script lang="ts">
    import Object from './Object.svelte';
    import type { CanvasImageObject } from './index.js';

    export let object: CanvasImageObject;
    export let showResizeHandles: boolean = true;

    $: objectFit = object.objectFit ?? 'cover';
    $: objectPosition =
        object.cropX !== undefined && object.cropY !== undefined
            ? `${(object.cropX ?? 0) * 100}% ${(object.cropY ?? 0) * 100}%`
            : 'center';

    $: imageStyle = `width: 100%; height: 100%; object-fit: ${objectFit}; object-position: ${objectPosition}; pointer-events: none;`;
</script>

<Object {object} {showResizeHandles}>
    <img src={object.src} alt={object.alt ?? ''} style={imageStyle} draggable="false" />
</Object>
