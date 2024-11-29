<script lang="ts">
    type $$Props = {
        progress: number;
        size: 's' | 'm' | 'l';
    };
    export let progress: $$Props['progress'] = 0;
    export let size: $$Props['size'] = 'm';

    function getPixelSize(pixelSize: $$Props['size']) {
        switch (pixelSize) {
            case 's':
                return 24;
            case 'm':
                return 36;
            case 'l':
                return 48;
        }
    }

    $: pixelSize = getPixelSize(size);
</script>

<div>
    {size}{pixelSize}
    <svg
        width={pixelSize}
        height={pixelSize}
        viewBox="0 0 {pixelSize} {pixelSize}"
        class="circular-progress"
        style="--progress-target: {progress}; --circle-size: {pixelSize}px"
    >
        <circle class="bg"></circle>
        <circle class="fg"></circle>
    </svg>
</div>

<style>
    .circular-progress {
        --size: var(--circle-size);
        --half-size: calc(var(--size) / 2);
        --stroke-width: 2px;
        --radius: calc((var(--size) - var(--stroke-width)) / 2);
        --circumference: calc(var(--radius) * pi * 2);
        --dash: calc((var(--progress) * var(--circumference)) / 100);
        animation: progress-animation 1s linear 0s 1 forwards;

        @media (prefers-reduced-motion: reduce) {
            animation: none;
        }
    }

    .circular-progress circle {
        cx: var(--half-size);
        cy: var(--half-size);
        r: var(--radius);
        stroke-width: var(--stroke-width);
        fill: none;
        stroke-linecap: round;
    }

    .circular-progress circle.bg {
        stroke: var(--color-bgcolor-neutral-tertiary);
    }

    .circular-progress circle.fg {
        transform: rotate(-90deg);
        transform-origin: var(--half-size) var(--half-size);
        stroke-dasharray: var(--dash) calc(var(--circumference) - var(--dash));
        transition: stroke-dasharray 0.3s linear 0s;
        stroke: var(--brand-pink-500);
    }

    @property --progress {
        syntax: '<number>';
        inherits: false;
        initial-value: 0;
    }

    @keyframes progress-animation {
        from {
            --progress: 0;
        }
        to {
            --progress: var(--progress-target);
        }
    }
</style>
