<script lang="ts">
    import type { HTMLAttributes } from 'svelte/elements';

    type $$Props = HTMLAttributes<HTMLDivElement> & {
        variant: 'circle' | 'square' | 'line';
        width: number | string;
        height?: number | string;
    };

    export let width: $$Props['width'] = 44;
    export let height: $$Props['height'] = 100;
    export let variant: $$Props['variant'] = 'circle';
</script>

<div
    class="skeleton"
    style:width={typeof width === 'number' ? `${width}px` : width}
    style:height={variant === 'line' && typeof height === 'number' ? `${height}px` : height}
    class:circle={variant === 'circle'}
    class:square={variant === 'square'}
    {...$$restProps}
/>

<style>
    .skeleton {
        background-color: var(--bgcolor-neutral-tertiary);
        background-image: linear-gradient(
            90deg,
            var(--bgcolor-neutral-tertiary) 25%,
            var(--overlay-skeleton) 50%,
            var(--bgcolor-neutral-tertiary) 75%
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
