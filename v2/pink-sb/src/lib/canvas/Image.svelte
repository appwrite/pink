<script lang="ts">
    import Object from './Object.svelte';
    import type { CanvasImageObject } from './index.js';

    export let object: CanvasImageObject;
    export let showResizeHandles: boolean = true;
</script>

<Object {object} {showResizeHandles}>
    <img
        src={object.src}
        alt={object.alt ?? ''}
        style="width: 100%; height: 100%; object-fit: contain; pointer-events: none;"
        draggable="false"
    />
</Object>

