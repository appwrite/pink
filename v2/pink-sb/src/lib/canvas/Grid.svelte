<script lang="ts">
    import { getCanvasContext } from './context.js';

    const { settings, viewOffset, zoom, viewPort } = getCanvasContext();

    export let dotColor: string | undefined = undefined;
    export let dotOpacity: number | undefined = undefined;
    export let dotSize: number | undefined = undefined;

    // Generate a unique ID for this grid instance
    const patternId = `dotGrid-${Math.random().toString(36).substring(2, 9)}`;

    $: gridSize = $settings.gridSize;

    $: finalDotColor = dotColor ?? $settings.grid.dotColor;
    $: finalDotOpacity = dotOpacity ?? $settings.grid.dotOpacity;
    $: finalDotSize = dotSize ?? $settings.grid.dotSize;

    // Make grid infinite by extending far beyond viewport
    $: gridWidth = Math.max(10000, ($viewPort.w / $zoom) * 3);
    $: gridHeight = Math.max(10000, ($viewPort.h / $zoom) * 3);
    $: gridOffsetX = $viewOffset.x - ($viewOffset.x % gridSize) - gridWidth / 2;
    $: gridOffsetY = $viewOffset.y - ($viewOffset.y % gridSize) - gridHeight / 2;

    $: transformCss = `width: ${gridWidth}px; height: ${gridHeight}px; transform: translate3d(-${finalDotSize}px, -${finalDotSize}px, 0) translate3d(${gridOffsetX}px, ${gridOffsetY}px, 0);`;
</script>

<div class="grid" style={transformCss}>
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <pattern
            id={patternId}
            x="0"
            y="0"
            width={gridSize}
            height={gridSize}
            patternUnits="userSpaceOnUse"
        >
            <circle
                cx={finalDotSize}
                cy={finalDotSize}
                r={finalDotSize}
                fill={finalDotColor}
                fill-opacity="{finalDotOpacity}%"
            />
        </pattern>

        <rect x="0" y="0" width="100%" height="100%" fill={'url(#' + patternId + ')'} />
    </svg>
</div>

<style>
    .grid {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        will-change: transform;
        contain: strict;
        pointer-events: none;
    }
    .grid > svg {
        position: absolute;
        top: 0;
        left: 0;
    }
</style>
