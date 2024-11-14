<script lang="ts">
    type $$Props = { variant: 'circle' | 'square' | 'line'; width: number; height?: number };

    export let variant: $$Props['variant'] = 'circle';
    export let width: $$Props['width'] = 44;
    export let height: $$Props['height'] = 100;
</script>

<div
    class="skeleton"
    style="width: {width}px; {variant === 'line' && `height: ${height}px;`}"
    class:circle={variant === 'circle'}
    class:square={variant === 'square'}
/>

<style>
    .skeleton {
        background-color: var(--color-bgcolor-neutral-tertiary);
        background-image: linear-gradient(
            90deg,
            var(--color-bgcolor-neutral-tertiary) 25%,
            var(--color-overlay-skeleton) 50%,
            var(--color-bgcolor-neutral-tertiary) 75%
        );
        background-size: 200% 100%;
        animation: loading 2s linear infinite;
        border-radius: var(--border-radius-xs, 6px);
    }

    .circle {
        border-radius: 50%;
    }

    .circle,
    .square {
        aspect-ratio: 1/1;
    }

    @keyframes loading {
        0% {
            background-position: 200% 0;
        }
        100% {
            background-position: -200% 0;
        }
    }
</style>
