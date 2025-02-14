<script lang="ts">
    import type { HTMLAttributes } from 'svelte/elements';

    type $$Props = HTMLAttributes<HTMLImageElement> & {
        src: string;
        alt: string;
        width?: number | undefined;
        height?: number | undefined;
        radius?: 'xxs' | 'xs' | 's' | 'm' | 'l';
        fit?: 'cover' | 'contain' | 'fill' | 'none';
        objectPosition?: 'top' | 'right' | 'bottom' | 'left' | 'center';
        border?: boolean;
        ratio?: string | null;
    };
    export let src: $$Props['src'];
    export let alt: $$Props['alt'];
    export let width: $$Props['width'] = undefined;
    export let height: $$Props['height'] = undefined;
    export let fit: $$Props['fit'] = 'cover';
    export let radius: $$Props['radius'] = 'm';
    export let objectPosition: $$Props['objectPosition'] = 'center';
    export let border = false;
    export let ratio: null | string = null;
</script>

<img
    {src}
    {alt}
    {width}
    {height}
    style:--p-width={width + 'px'}
    style:--p-height={height + 'px'}
    class:border
    class:fit-cover={fit === 'cover'}
    class:fit-contain={fit === 'contain'}
    class:fit-fill={fit === 'fill'}
    class:fit-none={fit === 'none'}
    class:radius-xxs={radius === 'xxs'}
    class:radius-xs={radius === 'xs'}
    class:radius-s={radius === 's'}
    class:radius-m={radius === 'm'}
    class:radius-l={radius === 'l'}
    style:object-position={objectPosition}
    style:--p-aspect-ratio={ratio}
    {...$$restProps}
/>

<style lang="scss">
    img {
        display: block;
        aspect-ratio: var(--p-aspect-ratio);
        width: var(--p-width, 100%);
        height: var(--p-height, auto);
    }
    .border {
        border: 1px solid var(--color-border-neutral);
    }
    .fit- {
        &cover {
            object-fit: cover;
        }
        &contain {
            object-fit: contain;
        }
        &fill {
            object-fit: fill;
        }
        &none {
            object-fit: none;
        }
    }

    .radius- {
        &xxs {
            border-radius: var(--border-radius-xxs);
        }
        &xs {
            border-radius: var(--border-radius-xs);
        }
        &s {
            border-radius: var(--border-radius-s);
        }
        &m {
            border-radius: var(--border-radius-m);
        }
        &l {
            border-radius: var(--border-radius-l);
        }
    }
</style>
