<script lang="ts">
    import type { HTMLAttributes } from 'svelte/elements';

    type $$Props = HTMLAttributes<HTMLImageElement> & {
        src: string;
        alt: string;
        width?: number | undefined;
        height?: number | undefined;
        radius?: 'small' | 'medium' | 'large';
        fit?: 'cover' | 'contain' | 'fill' | 'none';
    };
    export let src: $$Props['src'];
    export let alt: $$Props['alt'];
    export let width: $$Props['width'] = undefined;
    export let height: $$Props['height'] = undefined;
    export let fit: $$Props['fit'] = 'cover';
    export let radius: $$Props['radius'] = 'medium';
</script>

<img
    {src}
    {alt}
    {width}
    {height}
    class:fit-cover={fit === 'cover'}
    class:fit-contain={fit === 'contain'}
    class:fit-fill={fit === 'fill'}
    class:fit-none={fit === 'none'}
    class:radius-small={radius === 'small'}
    class:radius-medium={radius === 'medium'}
    class:radius-large={radius === 'large'}
    {...$$restProps}
/>

<style lang="scss">
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
        &small {
            border-radius: var(--border-radius-s);
        }
        &medium {
            border-radius: var(--border-radius-m);
        }
        &large {
            border-radius: var(--border-radius-l);
        }
    }
</style>
