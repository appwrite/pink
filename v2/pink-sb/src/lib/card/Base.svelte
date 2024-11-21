<script context="module" lang="ts">
    export type BaseCardProps = Partial<{
        variant: 'primary' | 'secondary';
        radius: 's' | 'm' | 'l';
        padding: 'none' | 'xxs' | 'xs' | 's' | 'm' | 'l';
        border: 'solid' | 'dashed';
    }>;
</script>

<script lang="ts">
    import type { HTMLAttributes } from 'svelte/elements';

    type $$Props = BaseCardProps & HTMLAttributes<HTMLDivElement>;

    export let variant: $$Props['variant'] = 'primary';
    export let radius: $$Props['radius'] = 'm';
    export let padding: $$Props['padding'] = 'm';
    export let border: $$Props['border'] = 'solid';
</script>

<div
    class:variant-primary={variant === 'primary'}
    class:variant-secondary={variant === 'secondary'}
    class:radius-s={radius === 's'}
    class:radius-m={radius === 'm'}
    class:radius-l={radius === 'l'}
    class:padding-none={padding === 'none'}
    class:padding-xxs={padding === 'xxs'}
    class:padding-xs={padding === 'xs'}
    class:padding-s={padding === 's'}
    class:padding-m={padding === 'm'}
    class:padding-l={padding === 'l'}
    class:border-solid={border === 'solid'}
    class:border-dashed={border === 'dashed'}
    {...$$restProps}
>
    <slot />
</div>

<style lang="scss">
    @use './card';
    @use '../../scss/mixins/transitions';

    div {
        @include transitions.common;
        @include card.base;
        @include card.variant;
        @include card.radius;
        @include card.padding;
        @include card.border;
    }
</style>
