<script lang="ts">
    import type { ScaleTime } from 'd3';
    import type { Margin } from './index.js';

    export let xScale: ScaleTime<number, number, never>;
    export let margin: Margin;
    export let height: number;
    export let width: number;
    export let ticksNumber: number = 2;
    export let format: ((s: Date) => string) | null = null;

    const formatter = format ? (tick: Date) => format(tick) : (tick: Date) => tick;
</script>

<g transform="translate(0,{height - margin.bottom})">
    <line stroke="currentColor" x1={margin.left} x2={width - margin.right} />
    {#each xScale.ticks(ticksNumber) as tick}
        <line stroke="currentColor" x1={xScale(tick)} x2={xScale(tick)} y1={0} y2={6} />
    {/each}
    {#each xScale.ticks(ticksNumber) as tick}
        <text font-size="12px" fill="currentColor" text-anchor="middle" x={xScale(tick)} y={16}>
            {formatter(tick)}
        </text>
    {/each}
</g>
