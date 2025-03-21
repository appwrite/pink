<script lang="ts">
    import type { ScaleLinear } from 'd3';
    import type { Margin } from './index.js';

    export let yScale: ScaleLinear<number, number, never>;
    export let margin: Margin;
    export let ticksNumber = 5;
</script>

<g transform="translate({margin.left},0)">
    <line stroke="currentColor" y1={yScale(yScale.domain()[0])} y2={yScale(yScale.domain()[1])} />
    {#each yScale.ticks(ticksNumber) as tick}
        {#if tick !== 0}
            <line stroke="currentColor" x1={0} x2={-6} y1={yScale(tick)} y2={yScale(tick)} />
        {/if}

        <text
            fill="currentColor"
            text-anchor="end"
            font-size="10"
            dominant-baseline="middle"
            x={-9}
            y={yScale(tick)}
        >
            {tick}
        </text>
    {/each}
</g>
