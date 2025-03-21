<script lang="ts">
    import { scaleTime, scaleLinear } from 'd3-scale';
    import { extent, max } from 'd3-array';
    import { line, curveBasis } from 'd3-shape';
    import { draw } from 'svelte/transition';
    import { cubicInOut } from 'svelte/easing';
    import AxisLeft from './AxisLeft.svelte';
    import AxisBottom from './AxisBottom.svelte';
    import Labels from './Labels.svelte';
    import type { DataPoint, Margin } from './index.js';

    export let data: DataPoint[];

    let tooltip: SVGGElement;
    let width = 0;

    const height = 350;
    const margin: Margin = { top: 10, right: 0, bottom: 20, left: 35 };

    $: xScale = scaleTime()
        .domain(extent(data, (d) => new Date(d.date)) as [Date, Date])
        .range([margin.left, width - margin.right]);
    $: yScale = scaleLinear()
        .domain([0, max(data, (d) => d.value) || 0])
        .range([height - margin.bottom, margin.top]);
    $: lineGenerator = line<DataPoint>()
        .x((d) => xScale(new Date(d.date)))
        .y((d) => yScale(d.value))
        .curve(curveBasis);

    const formatDate = (d: Date) => d.getUTCFullYear().toString();
</script>

<div bind:clientWidth={width}>
    {#if data && width && lineGenerator}
        <svg {width} {height}>
            <AxisBottom
                {width}
                {height}
                {margin}
                {xScale}
                format={formatDate}
                ticksNumber={width > 380 ? 10 : 4}
            />
            <AxisLeft {margin} {yScale} />
            <Labels
                {width}
                {height}
                {margin}
                labelForY
                yoffset={-50}
                xoffset={270}
                label="Apple Inc. Stock History"
            />

            <path in:draw={{ duration: 2000, easing: cubicInOut }} d={lineGenerator(data)} />
            <g bind:this={tooltip}><text>asd</text></g>
        </svg>
    {/if}
</div>

<style>
    path {
        fill: none;
        stroke: var(--fgcolor-accent);
        stroke-width: 1.5;
    }
</style>
