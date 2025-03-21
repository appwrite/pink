<script lang="ts">
    import type { Margin } from './index.js';

    export let width: number;
    export let height: number;
    export let margin: Margin;
    export let label: string;
    export let yoffset = 0;
    export let xoffset = 0;
    export let labelForX = false;
    export let labelForY = false;
</script>

<g>
    {#if labelForX}
        <text x={+margin.left + width - 66 + xoffset} y={+height + margin.top - 40 + yoffset}>
            {label}
        </text>
    {/if}
    {#if labelForY}
        <text x={+margin.left + xoffset} y={-margin.top + 80 + yoffset}>
            {label}
        </text>
    {/if}
</g>

<style>
    text {
        fill: var(--fgcolor-neutral-primary);
        text-anchor: end;
    }
</style>
